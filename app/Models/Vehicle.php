<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'brand_id',
        'color_id',
        'type',
        'license_place',
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

    #region Relationships
    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function color(){
        return $this->belongsTo(Color::class); 
    }

    public function rentals(){
        return $this->hasMany(Rental::class);
    }

    public function customers(){
        return $this->belongsToMany(Customer::class, 'rentals');
    }   
}
