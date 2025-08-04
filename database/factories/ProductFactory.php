<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 
            'Toys', 'Automotive', 'Health & Beauty', 'Food & Beverages', 'Office Supplies'
        ];

        $productNames = [
            'Wireless Headphones', 'Cotton T-Shirt', 'Programming Guide', 'Garden Hose',
            'Basketball', 'Puzzle Game', 'Car Phone Mount', 'Face Cream', 'Energy Drink',
            'Notebook Set', 'Bluetooth Speaker', 'Jeans', 'Mystery Novel', 'Plant Pot',
            'Tennis Racket', 'Board Game', 'Tire Pressure Gauge', 'Shampoo', 'Coffee Beans',
            'Desk Organizer'
        ];

        return [
            'name' => $this->faker->randomElement($productNames) . ' - ' . $this->faker->word(),
            'sku' => strtoupper($this->faker->unique()->bothify('??###??')),
            'description' => $this->faker->paragraph(random_int(1, 3)),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'stock_quantity' => $this->faker->numberBetween(0, 1000),
            'supplier_id' => Supplier::factory(),
            'category' => $this->faker->randomElement($categories),
            'status' => $this->faker->randomElement(['active', 'inactive', 'discontinued']),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => 0,
        ]);
    }

    /**
     * Indicate that the product is in a specific category.
     */
    public function category(string $category): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => $category,
        ]);
    }
}