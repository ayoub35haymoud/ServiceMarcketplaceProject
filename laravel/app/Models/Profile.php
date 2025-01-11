<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'profiles';

    // The attributes that are mass assignable.
    protected $fillable = [
        'user_id',
        'bio',
        'address',
        'profile_picture',
        'experience',
        'employees_count',
        'social_media_links',
        'business_hours'
    ];

    protected $casts = [
        'social_media_links' => 'array', // JSON to array
        'business_hours' => 'array', // JSON to array
    ];
    // Defining the relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class); // A profile belongs to a user
    }

     //first we doin like this :
     // Fetch the profile and its related services
        // $profile = Profile::find(1);
        // $services = $profile->user->providerServices;
     //but now:
        //  $profile = Profile::find(1);
        // $services = $profile->providerServices; 

    public function Services()
{
    return $this->hasManyThrough(
        Service::class, // Related model
        User::class,             // Through model
        'user_id',               // Foreign key on the User table that links to Profile
        'user_id',               // Foreign key on the ProviderService table that links to User
        'user_id',               // Local key on Profile model that links to User
        'user_id'                // Local key on User model that links to ProviderService
    );
}
  
}

