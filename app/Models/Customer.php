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
}
