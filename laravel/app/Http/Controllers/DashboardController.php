<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function providerDashboard(){
        return response()->json(['message' => 'Welcome to the Provider Dashboard']);
    }

    public function customerDashboard(){
        return response()->json(['message' => 'Welcome to the Customer Dashboard']);
    }
}
