<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceCategoriesFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

     // A category has many services
    public function services()
    {
        return $this->hasMany(Service::class);
    }
    
    public function SubCategory()
    {
        return $this->hasMany(SubCategory::class);
    }
     
}
