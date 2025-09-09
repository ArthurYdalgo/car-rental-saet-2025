<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'brand_id',
        'color_id',
        'type',
        'license_plate',
        'name',
        'year',
        'seats',
        'trunk_capacity',
        'price_per_day',
        'deleted_at',
    ];

    protected function casts(){
        return [
            'price_per_day' => 'decimal:2',
            'trunk_capacity' => 'decimal:2',
            'seats' => 'integer',
            'year' => 'integer',
        ];
    }
}
