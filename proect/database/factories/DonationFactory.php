<?php

namespace Database\Factories;

use App\Enums\PaymentMethod;
use App\Models\Donation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Donation>
 */
class DonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'donor_name' => fake()->name(),
            'phone' => '07'.fake()->numerify('########'),
            'amount' => fake()->randomElement([1000, 2000, 5000, 10000, 25000]),
            'payment_method' => fake()->randomElement(PaymentMethod::cases()),
            'message' => fake()->optional()->sentence(),
        ];
    }
}
