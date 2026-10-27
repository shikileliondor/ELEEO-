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
        ->has('paymentMethods', 3),
    );
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
