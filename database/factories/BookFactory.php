<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
               'name' => fake()->name(),
               'status' => $this->faker->randomElement([0,1]),
               'release_date' => $this->faker->dateTimeBetween($startDate = '-10 years',$endDate = 'now')
        ];
    }
}