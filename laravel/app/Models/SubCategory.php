<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    // difine custom table 
    protected $table = 'sub_categories';

    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
