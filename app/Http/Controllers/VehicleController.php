<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        $colors = Color::all();
        $brands = Brand::all();

        return nexus(props: compact('colors', 'brands'));
    }

    public function show(Vehicle $vehicle)
    {   
        $vehicle->loadMissing(['brand', 'color']);

        return nexus(props: [
            'vehicle' => $vehicle->toResource(),
        ])->render();
    }

    public function edit(Vehicle $vehicle)
    {
        $colors = Color::all();
        $brands = Brand::all();

        $vehicle->loadMissing(['brand', 'color']);

        return nexus(props: [
            'vehicle' => $vehicle->toResource(),
            'colors' => $colors,
            'brands' => $brands,
        ])->render();
    }

    public function create()
    {
        $colors = Color::all();
        $brands = Brand::all();

        return nexus(props: compact('colors', 'brands'))->render();
    }
}
