<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $whatsappMessage = 'Bonjour, je souhaite faire un don par Orange Money ou un autre moyen de paiement.';

        return Inertia::render('welcome', [
            'event' => [
                'date' => config('eleeo.date'),
                'location' => config('eleeo.location'),
                'contributionNumber' => config('eleeo.contribution_number'),
                'infoline' => config('eleeo.infoline'),
            ],
            'paymentLinks' => [
                'wave' => config('eleeo.wave_payment_url'),
                'whatsapp' => sprintf(
                    'https://wa.me/%s?text=%s',
                    config('eleeo.whatsapp_number'),
                    rawurlencode($whatsappMessage),
                ),
            ],
        ]);
    }
}
