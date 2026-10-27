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

    'infoline' => ['07 77 39 07 37', '07 79 17 79 48', '07 59 77 68 46'],

    /*
    |--------------------------------------------------------------------------
    | Administrateurs
    |--------------------------------------------------------------------------
    |
    | Adresses email (séparées par des virgules) autorisées à voir les dons.
    |
    */

    'admin_emails' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('ELEEO_ADMIN_EMAILS', '')),
    ))),

];
