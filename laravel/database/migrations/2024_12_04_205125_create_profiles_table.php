<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->text('bio')->nullable(); 
            $table->string('address')->nullable();
            $table->string('profile_picture')->nullable(); 
            $table->string('experience')->nullable(); // Years of experience
            // a person can work with him a lot of peaple but he is not a company that hy I add that .
            $table->integer('employees_count')->nullable(); 
            $table->json('social_media_links')->nullable();
            $table->json('business_hours')->nullable(); // Working Hours
            $table->timestamps(); 
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
