<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case OrangeMoney = 'orange_money';
    case Wave = 'wave';
    case Cash = 'cash';

    /**
     * Get the display label for the payment method.
     */
    public function label(): string
    {
        return match ($this) {
            self::OrangeMoney => 'Orange Money',
            self::Wave => 'Wave',
            self::Cash => 'Espèces (sur place)',
        };
    }
}
