<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Models\Rental;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    public function show(Rental $rental) {
        $rental->loadMissing(['paymentMethods', 'customer', 'vehicle' => function($query){
            $query->with(['color', 'brand']);
        }]);

        return nexus(props: compact('rental'))->render();
    }

    public function edit(Rental $rental) {
        $payment_methods = PaymentMethod::all();

        $rental->load(['paymentMethods', 'customer', 'vehicle' => function($query){
            $query->with(['color', 'brand']);
        }]);

        return nexus(props: compact('payment_methods', 'rental'))->render();
    }

    public function create() {
        $payment_methods = PaymentMethod::all();

        return nexus(props: compact('payment_methods'))->render();
    }
}
