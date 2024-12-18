<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Models\User;

// authentication Routes
Route::post('/register',[AuthController::class , 'register']) ;
Route::post('/login',[AuthController::class , 'login']) ;
Route::post('/logout',[AuthController::class , 'logout'])->middleware('auth:sanctum');


// Dashboard Routes 
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/provider-dashboard', [DashboardController::class, 'providerDashboard'])
        ->can('provider', User::class);

    Route::get('/customer-dashboard', [DashboardController::class, 'customerDashboard'])
        ->can('customer', User::class);
});

