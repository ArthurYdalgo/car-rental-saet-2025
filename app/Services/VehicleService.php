<?php

namespace App\Services;

use App\Models\Vehicle;

class VehicleService
{
    public static $types = [
        'sedan',
        'hatch',
        'pickup',
        'truck',
        'van',
        ''
    ];

    public function __construct(public ?Vehicle $customer = null) {}

    public static function updateOrCreate(array $data, ?Vehicle $vehicle = null)
    {
        $vehicle_data = collect($data)
            ->only([
                
            ])->toArray();

        if($vehicle){
            $vehicle->update($vehicle_data);
        }else{
            $vehicle = Vehicle::create($vehicle_data);
        }

        return $vehicle;
    }
}
