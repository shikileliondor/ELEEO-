<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDonationRequest;
use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    /**
     * Display the list of declared donations.
     */
    public function index(): Response
    {
        Gate::authorize('view-donations');

        $donations = Donation::query()->latest()->get();

        return Inertia::render('donations/index', [
            'donations' => $donations->map(fn (Donation $donation) => [
                'id' => $donation->id,
                'donorName' => $donation->donor_name,
                'phone' => $donation->phone,
                'amount' => $donation->amount,
                'paymentMethod' => $donation->payment_method->label(),
                'message' => $donation->message,
                'createdAt' => $donation->created_at?->toIso8601String(),
            ]),
            'total' => $donations->sum('amount'),
        ]);
    }

    /**
     * Store a donation declared by a visitor.
     */
    public function store(StoreDonationRequest $request): RedirectResponse
    {
        Donation::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Merci pour votre don ! Que Dieu vous bénisse.']);

        return to_route('home');
    }
}
