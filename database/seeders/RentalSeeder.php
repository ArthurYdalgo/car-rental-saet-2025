<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Rental;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Lottery;

class RentalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = Customer::all();

        for($i = 0; $i < 300; $i++) {
            do {
                $start_date = fake()->dateTimeBetween('-3 years', '+12 months');
                $end_date = (clone $start_date)->modify('+'.fake()->numberBetween(1, 30).' days');
                
                $vehicle = Vehicle::availableBetween($start_date, $end_date)->inRandomOrder()->first();
                $vehicle_id = $vehicle?->id;

            } while (!$vehicle_id);

            $customer_id = $customers->random()->id;

            $vehicle_price_per_day = $vehicle->price_per_day;
            $days = (int) $end_date->diff($start_date)->format('%a') + 1;
            $price = $vehicle_price_per_day * $days;
            $paid_at = (clone $start_date)->modify('+'.fake()->numberBetween(0, 2).' days');

            $canceled_at = Lottery::odds(1, 100)->choose() ? (clone $start_date)->modify('+'.fake()->numberBetween(0, 2).' days') : null;

            Rental::create(compact('customer_id', 'vehicle_id', 'days', 'vehicle_price_per_day', 'price', 'paid_at', 'start_date', 'end_date', 'canceled_at'));
        }
    }
}
