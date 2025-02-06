<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\SubCategory;
class SearchController extends Controller
{
    public function showSuggestions(Request $request)
    {
        $query = $request->input('query');
        if (!$query) {
            return response()->json([
                'message' => $query,
            ]);
        }
        $services = Service::select('title')
            ->where('title' , 'LIKE' ,"%{$query}%")
            ->take(8)
            ->get(); 

        $subCategories = SubCategory::select('name')
            ->where('name' , 'LIKE' , "%{$query}%")
            ->take(8)
            ->get();   
    
        return response()->json([
            'subCategories' => $subCategories,
            'services' => $services
        ]);
    }
    
    public function searchServices(Request $request)
{
    // Extract query and zipcode from the request
    $query = $request->input('query');
    $zipcode = $request->input('zipcode');
    $minPrice = $request->input('minPrice');
    // Fetch services that match both the query and the zip code
    $services = Service::with(['user.profile', 'subCategory'])
        ->where(function ($q) use ($query) {
            $q->where('title', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%");
        })
        ->where('zipcode', $zipcode) // Ensure the zip code matches 
        ->paginate(5);
    if ($minPrice) {
        $services->where('price', '>=', $minPrice);
    }
    foreach ($services as $service) {
        if ($service->user && $service->user->profile && $service->user->profile->profile_picture) {
            $service->user->profile->profile_picture = asset('storage/' . $service->user->profile->profile_picture);
        }
    }
    // Return the results as JSON
    return response()->json($services);
}




}
