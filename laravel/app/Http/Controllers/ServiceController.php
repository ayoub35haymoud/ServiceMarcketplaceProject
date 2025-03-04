<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function store(Request $request){
    // Validate incoming data
    $validatedData = $request->validate([
        'subcategories_id' => 'required|exists:sub_categories,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'zipcode' => 'required|string|max:10',
        'price' => 'required|numeric|min:0',
        'featured_projects.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validating multiple images
    ]);

    // Prepare the service data for storage
    $service = new Service();
    $service->subcategories_id = $validatedData['subcategories_id'];
    $service->title = $validatedData['title'];
    $service->description = $validatedData['description'];
    $service->zipcode = $validatedData['zipcode'];
    $service->price = $validatedData['price'];
    $service->user_id = auth()->id(); // Assuming you are associating the service with the logged-in user

    // Save the service to generate its ID
    $service->save();

    // Handle image uploads if provided
    if ($request->hasFile('featured_projects')) {
        $uploadedFiles = $request->file('featured_projects');
        $imagePaths = [];

        foreach ($uploadedFiles as $file) {
            $path = $file->store('featured_projects', 'public'); // Store in 'public/featured_projects' directory
            $imagePaths[] = $path;
        }

        // Save the image paths as a JSON column or in a related table
        $service->featured_projects = json_encode($imagePaths);
        $service->save();
    }

    // Return a success response
    return response()->json([
        'message' => 'Service created successfully!',
        'service' => $service,
    ], 201);
}

    

    /**
     * Display the specified resource.
     */
    public function showUserServices()
    {
        $user = Auth::user();

        $services = $user->service;
        foreach ($services as $service) {
            if ($service->featured_projects) {
                // Decode the JSON field to get an array of picture paths
                $pictures = json_decode($service->featured_projects, true);
                
                // Map each picture path to its full URL
                $picturesWithUrls = array_map(function ($picture) {
                    return asset('storage/' . $picture);
                }, $pictures);
    
                // Update the featured_projects field with the full URLs
                $service->featured_projects = $picturesWithUrls;
            }
        }
        

        return response()->json([
                'services' => $services
            ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function show(Request $request , $id)
    {
        $service = Service::with('user.profile')->find($id);

            if($service->featured_projects){
                // Decode the JSON field to get an array of picture paths
                $pictures = json_decode($service->featured_projects, true);
                
                // Map each picture path to its full URL
                $picturesWithUrls = array_map(function ($picture) {
                    return asset('storage/' . $picture);
                }, $pictures);
    
                // Update the featured_projects field with the full URLs
                $service->featured_projects = $picturesWithUrls;
            };
            // for the profile picture
            if ($service->user && $service->user->profile && $service->user->profile->profile_picture) {
                $service->user->profile->profile_picture = asset('storage/' . $service->user->profile->profile_picture);
            }
            return response()->json($service);

    }
}
