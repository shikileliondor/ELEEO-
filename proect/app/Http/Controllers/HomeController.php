<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMethod;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'event' => [
                'date' => config('eleeo.date'),
                'location' => config('eleeo.location'),
                'contributionNumber' => config('eleeo.contribution_number'),
                'infoline' => config('eleeo.infoline'),
            ],
            'paymentMethods' => collect(PaymentMethod::cases())->map(fn (PaymentMethod $method) => [
                'value' => $method->value,
                'label' => $method->label(),
            ]),
        ]);
    }
}
