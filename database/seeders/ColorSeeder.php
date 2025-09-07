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
                'hex' => '#FF0000',
                'name' => 'Vermelho',
            ],
            [
                'tag' => 'blue',
                'hex' => '#0000FF',
                'name' => 'Azul',
            ],
            [
                'tag' => 'green',
                'hex' => '#00FF00',
                'name' => 'Verde',
            ],
            [
                'tag' => 'black',
                'hex' => '#000000',
                'name' => 'Preto',
            ],
            [
                'tag' => 'white',
                'hex' => '#FFFFFF',
                'name' => 'Branco',
            ],
            [
                'tag' => 'silver',
                'hex' => '#C0C0C0',
                'name' => 'Prata',
            ],
            [
                'tag' => 'gray',
                'hex' => '#808080',
                'name' => 'Cinza',
            ],
            [
                'tag' => 'yellow',
                'hex' => '#FFFF00',
                'name' => 'Amarelo',
            ],
            [
                'tag' => 'orange',
                'hex' => '#FFA500',
                'name' => 'Laranja',
            ],
            [
                'tag' => 'brown',
                'hex' => '#A52A2A',
                'name' => 'Marrom',
            ],
            [
                'tag' => 'purple',
                'hex' => '#800080',
                'name' => 'Roxo',
            ],
            [
                'tag' => 'pink',
                'hex' => '#FFC0CB',
                'name' => 'Rosa',
            ]
        ];

        foreach ($colors as $color) {
            Color::updateOrCreate(
                ['tag' => $color['tag']],
                ['name' => $color['name'], 'hex' => $color['hex']]
            );
        }
    }
}
