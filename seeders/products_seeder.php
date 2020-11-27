<?php
/**
 * The users seeder
 *
 * @see https://github.com/fzaninotto/Faker for all documentation
 */
$faker = \Faker\Factory::create();

$seeds = [];

foreach (range(1, 5) as $key) {
    $seeds[] = [
        'name' => $faker->name,
        'price' => (int)(rand(1, 20) . '000'),
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
    ];
}

return ['products' => $seeds];
