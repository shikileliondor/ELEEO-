<?php

use App\Models\Donation;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('home page shows the event details', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->where('event.contributionNumber', config('eleeo.contribution_number'))
        ->missing('paymentMethods'),
    );
});

test('home page provides direct Wave payment and WhatsApp contact links', function () {
    $this->withoutVite();

    config([
        'eleeo.wave_payment_url' => 'https://pay.wave.com/m/test/c/ci/',
        'eleeo.whatsapp_number' => '2250788758643',
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('paymentLinks.wave', 'https://pay.wave.com/m/test/c/ci/')
        ->where('paymentLinks.whatsapp', fn (string $url) => str_starts_with($url, 'https://wa.me/2250788758643?text=')
            && str_contains(urldecode($url), 'Orange Money')
        ),
    );
});

test('Wave payment logo is available locally', function () {
    expect(public_path('images/wave-logo.svg'))->toBeFile();
});

test('WhatsApp contact logo is available locally', function () {
    expect(public_path('images/whatsapp-logo.svg'))->toBeFile();
});

test('visitors can declare a donation', function () {
    $response = $this->post(route('donations.store'), [
        'donor_name' => 'Awa Koné',
        'phone' => '07 01 02 03 04',
        'amount' => 5000,
        'payment_method' => 'wave',
        'message' => 'Courage aux enfants',
    ]);

    $response->assertRedirect(route('home'));

    $this->assertDatabaseHas('donations', [
        'donor_name' => 'Awa Koné',
        'amount' => 5000,
        'payment_method' => 'wave',
    ]);
});

test('html in donations is never rendered as markup', function () {
    $payload = '<script>alert(1)</script>';

    $this->post(route('donations.store'), [
        'donor_name' => $payload,
        'phone' => '0701020304',
        'amount' => 1000,
        'payment_method' => 'wave',
        'message' => $payload,
    ])->assertRedirect(route('home'));

    config(['eleeo.admin_emails' => ['admin@example.com']]);
    $user = User::factory()->create(['email' => 'admin@example.com']);

    $response = $this
        ->actingAs($user)
        ->get(route('donations.index', ['current_team' => $user->currentTeam->slug]));

    $response->assertOk();
    $response->assertDontSee($payload, escape: false);
});

test('phone numbers cannot carry a javascript url', function () {
    $this->post(route('donations.store'), [
        'donor_name' => 'Test',
        'phone' => 'javascript:alert(1)',
        'amount' => 1000,
        'payment_method' => 'wave',
    ])->assertSessionHasErrors('phone');
});

test('an unknown appearance cookie is ignored', function () {
    $response = $this
        ->withUnencryptedCookie('appearance', "x';alert(1);//")
        ->get(route('home'));

    $response->assertOk();
    $response->assertDontSee('alert(1)', escape: false);
});

test('donation requires valid data', function () {
    $response = $this->post(route('donations.store'), [
        'donor_name' => '',
        'phone' => 'abc',
        'amount' => 10,
        'payment_method' => 'bitcoin',
    ]);

    $response->assertSessionHasErrors(['donor_name', 'phone', 'amount', 'payment_method']);
    $this->assertDatabaseCount('donations', 0);
});

test('admins can view donations', function () {
    config(['eleeo.admin_emails' => ['admin@example.com']]);

    $user = User::factory()->create(['email' => 'admin@example.com']);
    Donation::factory()->count(2)->create();

    $response = $this
        ->actingAs($user)
        ->get(route('donations.index', ['current_team' => $user->currentTeam->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('donations/index')
        ->has('donations', 2),
    );
});

test('other users cannot view donations', function () {
    config(['eleeo.admin_emails' => ['admin@example.com']]);

    $user = User::factory()->create(['email' => 'someone@example.com']);

    $response = $this
        ->actingAs($user)
        ->get(route('donations.index', ['current_team' => $user->currentTeam->slug]));

    $response->assertForbidden();
});
