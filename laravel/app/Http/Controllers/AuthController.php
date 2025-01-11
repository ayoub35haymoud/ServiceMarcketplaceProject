<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User ;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{

    public function register(Request $request){

        $userData = $request->validate([
             'name'=> 'required|string|max:255',
             'email'=> 'required|string|email|max:255|unique:users',
             'password' => 'required|string|min:8',
             'role' => 'required|in:provider,customer',
             'phone' => 'nullable|string',
        ]);

        $user = User::create($userData);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'success',
        ], 201);
    }

    // login
    public function login(Request $request)
{
    $userData = $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    // Retrieve user by email
    $user = User::where('email', $request->email)->first();

    // If user doesn't exist or password is incorrect
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);// Unauthorized
    }

    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json([
        'user' => $user,
        'token' => $token,
    ], 200);  
}

    public function logout(Request $request){
        
    }
}
