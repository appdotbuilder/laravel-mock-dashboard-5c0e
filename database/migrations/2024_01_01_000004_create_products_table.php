<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('sku')->unique()->comment('Stock Keeping Unit identifier');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->string('category')->comment('Product category');
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active')->comment('Product status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('sku');
            $table->index('category');
            $table->index('status');
            $table->index('supplier_id');
            $table->index(['category', 'status']);
            $table->index('stock_quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};