<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'vehicle_price_per_day',
        'price',
        'days',
        'paid_at',
        'start_date',
        'end_date',
        'canceled_at',
    ];

    protected function casts(){
        return [
            'vehicle_price_per_day' => 'decimal:2',
            'price' => 'decimal:2',
            'days' => 'integer',
            'start_date' => 'date',
            'end_date' => 'date',
            'paid_at' => 'datetime',
            'canceled_at' => 'datetime',
        ];
    }

    #region Relationships
    public function paymentMethods(){
        return $this->belongsToMany(PaymentMethod::class, 'payment_method_rental');
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function vehicle(){
        return $this->belongsTo(Vehicle::class);
    }
}
