<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::withCount(['orders'])
            ->latest()
            ->paginate(15);

        return Inertia::render('dashboard/users', [
            'users' => $users,
        ]);
    }
}