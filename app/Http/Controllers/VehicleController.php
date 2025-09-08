<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Color;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        $colors = Color::all();

        return nexus(props: compact('colors'));
    }

    public function show(Vehicle $vehicle)
    {
        return nexus(props: [
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    public function edit(Vehicle $vehicle)
    {
        $colors = Color::all();

        return nexus(props: [
            'vehicle' => new VehicleResource($vehicle),
            'colors' => $colors,
        ]);
    }

    public function create()
    {
        $colors = Color::all();

        return nexus(props: compact('colors'));
    }
}
