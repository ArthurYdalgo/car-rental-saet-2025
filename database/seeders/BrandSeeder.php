<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Toyota',
                'tag' => 'toyota',
            ],
            [
                'name' => 'Honda',
                'tag' => 'honda',
            ],
            [
                'name' => 'Ford',
                'tag' => 'ford',
            ],
            [
                'name' => 'Chevrolet',
                'tag' => 'chevrolet',
            ],
            [
                'name' => 'Nissan',
                'tag' => 'nissan',
            ],
            [
                'name' => 'Volkswagen',
                'tag' => 'volkswagen',
            ],
            [
                'name' => 'Hyundai',
                'tag' => 'hyundai',
            ],
            [
                'name' => 'Kia',
                'tag' => 'kia',
            ],
            [
                'name' => 'Mazda',
                'tag' => 'mazda',
            ],
            [
                'name' => 'Subaru',
                'tag' => 'subaru',
            ],
        ];

        foreach ($brands as $brand) {
            Brand::firstOrCreate(
                ['tag' => $brand['tag']],
                ['name' => $brand['name']]
            );
        }
    }
}
