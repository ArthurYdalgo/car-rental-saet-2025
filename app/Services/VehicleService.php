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

        if($vehicle){
            $vehicle->update($vehicle_data);
        }else{
            $vehicle = Vehicle::create($vehicle_data);
        }

        return $vehicle;
    }

    public function isVehicleAvailableBetween($start_date, $end_date, ?Vehicle $vehicle = null){
        $vehicle ??= $this->vehicle;

        return $vehicle->rentals()
            ->where(function($query) use ($start_date, $end_date){
                $query->whereBetween('start_date', [$start_date, $end_date])
                    ->orWhereBetween('end_date', [$start_date, $end_date])
                    ->orWhere(function($query) use ($start_date, $end_date){
                        $query->where('start_date', '<=', $start_date)
                            ->where('end_date', '>=', $end_date);
                    });
            })
            ->whereNull('canceled_at')
            ->doesntExist();
    }
}   
