<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'tag' => 'red',
                'name' => 'Vermelho',
            ],
            [
                'tag' => 'blue',
                'name' => 'Azul',
            ],
            [
                'tag' => 'green',
                'name' => 'Verde',
            ],
            [
                'tag' => 'black',
                'name' => 'Preto',
            ],
            [
                'tag' => 'white',
                'name' => 'Branco',
            ],
            [
                'tag' => 'silver',
                'name' => 'Prata',
            ],
            [
                'tag' => 'gray',
                'name' => 'Cinza',
            ],
            [
                'tag' => 'yellow',
                'name' => 'Amarelo',
            ],
            [
                'tag' => 'orange',
                'name' => 'Laranja',
            ],
            [
                'tag' => 'brown',
                'name' => 'Marrom',
            ],
            [
                'tag' => 'purple',
                'name' => 'Roxo',
            ],
            [
                'tag' => 'pink',
                'name' => 'Rosa',
            ]
        ];

        foreach ($colors as $color) {
            Color::updateOrCreate(
                ['tag' => $color['tag']],
                ['name' => $color['name']]
            );
        }
    }
}
