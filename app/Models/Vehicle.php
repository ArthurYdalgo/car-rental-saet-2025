<?php

namespace App\Models;

use App\Services\VehicleService;
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

    protected function casts()
    {
        return [
            'price_per_day' => 'decimal:2',
            'trunk_capacity' => 'decimal:2',
            'seats' => 'integer',
            'year' => 'integer',
        ];
    }

    #region Relationships
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'rentals');
    }
    
    public function rentalsBetween($start_date, $end_date)
    {
        return $this->rentals()->between($start_date, $end_date);
    }

    #region Scopes
    public function scopeAvailableBetween($query, $start_date, $end_date) {
        return $query->whereDoesntHave('rentals', function($query) use ($start_date, $end_date){
            $query->between($start_date, $end_date)->whereNull('canceled_at');
        });
    }

    #region Methods
    public function vehicleService()
    {
        return new VehicleService($this);
    }
}
