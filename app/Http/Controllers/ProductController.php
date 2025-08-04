<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @phpstan-ignore-next-line */
        $products = Product::with(['supplier'])
            ->latest()
            ->paginate(15);

        return Inertia::render('dashboard/products', [
            'products' => $products,
        ]);
    }
}