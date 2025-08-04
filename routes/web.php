<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/users', [App\Http\Controllers\UserController::class, 'index'])->name('dashboard.users');
    Route::get('dashboard/suppliers', [App\Http\Controllers\SupplierController::class, 'index'])->name('dashboard.suppliers');
    Route::get('dashboard/products', [App\Http\Controllers\ProductController::class, 'index'])->name('dashboard.products');
    Route::get('dashboard/orders', [App\Http\Controllers\OrderController::class, 'index'])->name('dashboard.orders');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
