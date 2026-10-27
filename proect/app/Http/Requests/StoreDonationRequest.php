<?php

namespace App\Http\Requests;

use App\Enums\PaymentMethod;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDonationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'donor_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^[0-9+ ]{8,20}$/'],
            'amount' => ['required', 'integer', 'min:100', 'max:100000000'],
            'payment_method' => ['required', Rule::enum(PaymentMethod::class)],
            'message' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get the custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'donor_name.required' => 'Indiquez votre nom.',
            'phone.required' => 'Indiquez votre numéro de téléphone.',
            'phone.regex' => 'Ce numéro de téléphone n\'est pas valide.',
            'amount.required' => 'Indiquez le montant envoyé.',
            'amount.integer' => 'Le montant doit être un nombre entier.',
            'amount.min' => 'Le montant minimum est de 100 FCFA.',
            'amount.max' => 'Ce montant est trop élevé.',
            'payment_method.required' => 'Choisissez un moyen de paiement.',
            'payment_method.enum' => 'Ce moyen de paiement n\'est pas valide.',
            'message.max' => 'Le message est trop long (1000 caractères maximum).',
        ];
    }
}
