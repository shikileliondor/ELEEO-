<?php

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

test('an unknown appearance cookie is ignored', function () {
    $response = $this
        ->withUnencryptedCookie('appearance', "x';alert(1);//")
        ->get(route('home'));

    $response->assertOk();
    $response->assertDontSee('alert(1)', escape: false);
});

test('the donation form endpoint no longer exists', function () {
    $this->post('/dons', [
        'donor_name' => 'Test',
        'phone' => '0701020304',
        'amount' => 1000,
    ])->assertNotFound();
});
