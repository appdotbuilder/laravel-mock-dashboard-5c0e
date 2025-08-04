<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Order>
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        $status = $this->faker->randomElement($statuses);
        
        return [
            'order_number' => 'ORD-' . strtoupper($this->faker->unique()->bothify('??###??')),
            'user_id' => User::factory(),
            'total_amount' => $this->faker->randomFloat(2, 10, 2000),
            'status' => $status,
            'notes' => $this->faker->optional(0.3)->sentence(),
            'shipped_at' => $status === 'shipped' || $status === 'delivered' 
                ? $this->faker->dateTimeBetween('-30 days', 'now') 
                : null,
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'shipped_at' => null,
        ]);
    }

    /**
     * Indicate that the order is shipped.
     */
    public function shipped(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'shipped',
            'shipped_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the order is delivered.
     */
    public function delivered(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'delivered',
            'shipped_at' => $this->faker->dateTimeBetween('-60 days', '-7 days'),
        ]);
    }
}