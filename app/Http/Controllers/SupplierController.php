<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::withCount(['products'])
            ->latest()
            ->paginate(15);

        return Inertia::render('dashboard/suppliers', [
            'suppliers' => $suppliers,
        ]);
    }
}