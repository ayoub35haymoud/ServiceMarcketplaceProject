<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function show()
    {
        // Get the authenticated user
        $user = Auth::user();
        // Eager load the profile relationship
        $user->load('profile');
        $profile = $user->profile;
        if ($profile && $profile->profile_picture) {
            // Include the full URL to the image
            $profile->profile_picture = asset('storage/' . $profile->profile_picture);
        }
        // Return the user data with their profile
        return response()->json([
            'userData' => $user
        ]);
    }


}
