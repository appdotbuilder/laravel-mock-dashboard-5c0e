<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class DashboardDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create suppliers
        $suppliers = Supplier::factory(15)->create();

        // Create products with relationships to suppliers
        $products = collect();
        $suppliers->each(function ($supplier) use ($products) {
            $supplierProducts = Product::factory(random_int(3, 8))
                ->for($supplier)
                ->create();
            $products->push(...$supplierProducts);
        });

        // Create additional users (customers)
        $users = User::factory(25)->create();

        // Create orders with order items
        $users->each(function ($user) use ($products) {
            $orderCount = random_int(0, 5); // Some users may have no orders
            
            for ($i = 0; $i < $orderCount; $i++) {
                $order = Order::factory()->for($user)->create();
                
                // Create 1-5 order items per order
                $itemCount = random_int(1, 5);
                $orderProducts = $products->random($itemCount);
                
                $totalAmount = 0;
                
                $orderProducts->each(function ($product) use ($order, &$totalAmount) {
                    $quantity = random_int(1, 3);
                    $unitPrice = $product->price;
                    $lineTotal = $quantity * $unitPrice;
                    $totalAmount += $lineTotal;
                    
                    OrderItem::factory()->create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                        'total_price' => $lineTotal,
                    ]);
                });
                
                // Update order total
                $order->update(['total_amount' => $totalAmount]);
            }
        });
    }
}