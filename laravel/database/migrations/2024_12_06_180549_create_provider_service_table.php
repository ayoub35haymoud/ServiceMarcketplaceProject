<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{ 
    public function up(): void
    {
        Schema::create('provider_service', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2); 
            // Paths to Project Images 
            $table->json('featured_projects')->nullable(); 
        });
        
    }

    
    public function down(): void
    {
        Schema::dropIfExists('provider_service');
    }
};
