<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Événement
    |--------------------------------------------------------------------------
    |
    | Informations publiques de l'œuvre caritative affichées sur le site.
    |
    */

    'date' => env('ELEEO_EVENT_DATE', '2026-12-19'),

    'location' => "N'Dotré, quartier Conteneur",

    'contribution_number' => env('ELEEO_CONTRIBUTION_NUMBER', '07 88 75 86 43'),

    'wave_payment_url' => env(
        'ELEEO_WAVE_PAYMENT_URL',
        'https://pay.wave.com/m/M_ci_cnHGboGrF0AC/c/ci/',
    ),

    'whatsapp_number' => env('ELEEO_WHATSAPP_NUMBER', '2250788758643'),

    'infoline' => ['07 77 39 07 37', '07 79 17 79 48', '07 59 77 68 46'],

];
