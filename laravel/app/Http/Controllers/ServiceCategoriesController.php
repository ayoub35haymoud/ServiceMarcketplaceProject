<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use App\Models\SubCategory;
class ServiceCategoriesController extends Controller
{

    public function showCategories()
    {
        $serviceCategories = ServiceCategory::all();
        return (
           response()->json([
             "categories" => $serviceCategories 
           ],200)
        );
    }

    public function showSub_categories(){
        $SubCategories = SubCategory::all();
        return (
            response()->json([
                'subcategories'=>$SubCategories
            ],200)
        );
    }
}
