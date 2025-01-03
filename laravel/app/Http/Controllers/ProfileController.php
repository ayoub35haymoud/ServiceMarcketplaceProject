<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * create a profile .
     */
    public function store(Request $request)
    {

        // Validate the incoming data
        $validator = Validator::make($request->all(), [
            'bio' => 'nullable|string',
            'address' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'experience' => 'nullable|string',
            'employees_count' => 'nullable|integer',
            'social_media_links' => 'nullable|json',
            'business_hours' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $data =$request->all();
        
        // handling the profile picture
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $path = $file->store('profile_pictures', 'public');
            $data['profile_picture'] = $path;
        }

        // store the data of profile in the database
        $profile = $request->user()->profile()->create($data);
        
        // Return a success response
        return response()->json([
            'profileData' => $profile
        ], 201);
    }

    /**
     * show the profile of user
     */
    public function show()
    {
        $user = Auth::user();
        $profile = $user->profile; 
        if ($profile && $profile->profile_picture) {
            // Include the full URL to the image
            $profile->profile_picture = asset('storage/' . $profile->profile_picture);
        }
        if(!$profile){
           return response()->json([
            'message'=> 'user profile not found',
           ],404);
        }
        return response()->json([
            'profile' => $profile
        ]);
    }

    /**
     * update the profile .
     */
    public function update(Request $request)
{
    $user = Auth::user();
    $profile = $user->profile;

    $data = $request->all();

    if ($request->hasFile('profile_picture')) {
        // Delete old picture if exists
        if ($profile->profile_picture) {
            \Storage::disk('public')->delete($profile->profile_picture);
        }

        // Store the new image
        $file = $request->file('profile_picture');
        $path = $file->store('profile_pictures', 'public');
        $data['profile_picture'] = $path;
    } else {
        // Keep the existing profile picture if no new file is uploaded
        $data['profile_picture'] = $profile->profile_picture;
    }

    // Update the profile
    $profile->update($data);

    // Fetch the updated profile data
    $profile = $user->profile;

    return response()->json([
        'profileData' => $profile
    ], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(profile $profile)
    {
        //
    }
}
