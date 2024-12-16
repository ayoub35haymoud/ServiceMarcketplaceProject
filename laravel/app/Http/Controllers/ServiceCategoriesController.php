<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use App\Http\Requests\Storeservice_categoriesRequest;
use App\Http\Requests\Updateservice_categoriesRequest;

class ServiceCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storeservice_categoriesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(service_categories $service_categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateservice_categoriesRequest $request, service_categories $service_categories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(service_categories $service_categories)
    {
        //
    }
}
