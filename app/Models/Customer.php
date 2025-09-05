<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'birthday',
        'cpf',
        'licence_number',
        'license_issuing_state',
    ];

    protected function casts(): array
    {
        return [
            'birthday' => 'datetime'
        ];
    }
    

    #region Relationships
    public function rentals(){
        return $this->hasMany(Rental::class);
    }

    public function vehicles(){
        return $this->belongsToMany(Vehicle::class, 'rentals');
    } 
}
