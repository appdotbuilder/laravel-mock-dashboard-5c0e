<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @phpstan-ignore-next-line */
        $orders = Order::with(['user', 'orderItems'])
            ->withCount('orderItems')
            ->latest()
            ->paginate(15);

        return Inertia::render('dashboard/orders', [
            'orders' => $orders,
        ]);
    }
}