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



}
