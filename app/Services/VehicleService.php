<?php

namespace App\Services;

use App\Models\Vehicle;

class VehicleService
{
    public static $types = [
        'sedan' => 'Sedan',
        'hatchback' => 'Hatchback',
        'pickup' => 'Pickup',
        'truck' => 'Caminhão',
        'van' => 'Van',
    ];

    public function __construct(public ?Vehicle $vehicle = null) {}

    public static function updateOrCreate(array $data, ?Vehicle $vehicle = null)
    {
        $vehicle_data = collect($data)
            ->only([
                'brand_id',
                'color_id',
                'type',
                'license_plate',
                'name',
                'year',
                'seats',
                'trunk_capacity',
                'price_per_day',
            ])->toArray();

        if ($vehicle) {
            $vehicle->update($vehicle_data);
        } else {
            $vehicle = Vehicle::create($vehicle_data);
        }

        return $vehicle;
    }

    public function isVehicleAvailableBetween($start_date, $end_date, ?Vehicle $vehicle = null)
    {
        $vehicle ??= $this->vehicle;

        return $vehicle->rentalsBetween($start_date, $end_date)
            ->whereNull('canceled_at')
            ->doesntExist();
    }

    public static function types($as_associative_array = false)
    {
        if ($as_associative_array) {
            return self::$types;
        }

        return collect(self::$types)
            ->map(fn($name, $value) => (object) compact('name', 'value'))
            ->values()
            ->toArray();
    }
}
