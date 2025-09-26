<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Vehicle\StoreRequest;
use App\Http\Requests\Api\Vehicle\UpdateRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vehicles = QueryBuilder::for(Vehicle::class)
            ->allowedFilters([
                AllowedFilter::exact('brand_id'),
                AllowedFilter::exact('color_id'),
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->whereLike('name', "%{$value}%")
                            ->orWhereLike('license_plate', "{$value}%")
                            ->orWhere('year', $value);
                    });
                }),
            ])
            ->allowedSorts([
                'id',
                'year',
                'seats',
                'trunk_capacity',
                'price_per_day',
            ])
            ->allowedIncludes([
                'color',
                'brand',
            ])
            ->paginate(min($request->query('per_page', 15), 100));

        return VehicleResource::collection($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $vehicle = VehicleService::updateOrCreate($data);

        return new VehicleResource($vehicle);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return new VehicleResource($vehicle);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();

        $vehicle = VehicleService::updateOrCreate($data, $vehicle);

        return new VehicleResource($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return response()->noContent();
    }
}
