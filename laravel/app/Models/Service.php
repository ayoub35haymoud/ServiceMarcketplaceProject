<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

   /**
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'average_cost',
    ];

    // A service belongs to a user (provider)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A service belongs to a category
    public function category()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
}
