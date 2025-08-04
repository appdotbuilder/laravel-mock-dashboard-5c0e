<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index()
    {
        // Get overview statistics
        $stats = [
            'total_users' => User::count(),
            'total_suppliers' => Supplier::count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('status', '!=', 'cancelled')->sum('total_amount'),
            'low_stock_products' => Product::where('stock_quantity', '<', 10)->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_suppliers' => Supplier::where('status', 'active')->count(),
        ];

        // Get recent activity
        /** @phpstan-ignore-next-line */
        $recentOrders = Order::with(['user', 'orderItems'])
            ->latest()
            ->take(5)
            ->get();

        /** @phpstan-ignore-next-line */
        $lowStockProducts = Product::with('supplier')
            ->where('stock_quantity', '<', 10)
            ->orderBy('stock_quantity')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}