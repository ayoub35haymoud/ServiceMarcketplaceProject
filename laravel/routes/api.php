<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceCategoriesController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SearchController;
use App\Models\User;

{/*authentication Routes*/}
Route::post('/register',[AuthController::class , 'register']) ;
Route::post('/login',[AuthController::class , 'login']) ;
Route::post('/logout',[AuthController::class , 'logout'])->middleware('auth:sanctum');

 {/*Dashboard Routes*/} 
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/provider-dashboard', [DashboardController::class, 'providerDashboard'])
        ->can('provider', User::class);

    Route::get('/customer-dashboard', [DashboardController::class, 'customerDashboard'])
        ->can('customer', User::class);
    // user routes
    Route::get('/user' , [UserController::class, 'show']) ;
    // profile routes
    Route::get('/user/profile' , [ProfileController::class, 'show']) ;
    Route::post('/user/profile' , [ProfileController::class, 'store']) ;
    Route::put('/user/profile' , [ProfileController::class, 'update']) ;
});

 {/*userservices Routes*/} 
 Route::middleware(['auth:sanctum'])->group(function () {
    // routes of services
    Route::post('user/services' ,[ServiceController::class , 'store']);
});
//  fetch categories and subCategorie
Route::get('services/categories' ,[ServiceCategoriesController::class , 'showCategories']);
Route::get('services/sub_categories' ,[ServiceCategoriesController::class , 'showSub_categories']);

// routes related to services 
Route::middleware(['auth:sanctum'])->group(function () {
    // fetch provider services
    Route::get('/user/services' , [ServiceController::class , 'showUserServices'] );
});


 {/*search Routes*/} 
 Route::get('search/suggestions', [SearchController::class , 'showSuggestions']);
