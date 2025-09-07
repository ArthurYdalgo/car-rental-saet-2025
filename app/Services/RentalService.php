<?php

namespace App\Services;

use App\Models\Rental;

class RentalService
{

    public function __construct(public ?Rental $rental = null) {}

    public static function updateOrCreate(array $data, ?Rental $rental = null)
    {
        $rental_data = collect($data)
            ->only([
                'customer_id',
                'vehicle_id',
                'vehicle_price_per_day',
                'price',
                'paid_at',
                'start_date',
                'end_date',
                'canceled_at',
            ])->toArray();

        if($rental_data){
            $rental->update($rental_data);
        }else{
            $rental = Rental::create($rental_data);
        }

        if(array_key_exists('payment_methods', $data)){
            $payment_methods = collect($data['payment_methods'])->mapWithKeys(function($item){
                [$item['id'] => ['amount' => $item['amount']]];
            })->toArray();

            $rental->paymentMethods()->sync($payment_methods);
        }

        return $rental;
    }
}
