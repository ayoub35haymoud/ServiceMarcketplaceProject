<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade');    
            $table->unsignedBigInteger('subcategories_id');       
            $table->string('title')->unique(); 
            $table->text('description')->nullable(); 
            $table->string('zipcode', 20);
            $table->decimal('price', 10, 2); 
            // Paths to Project Images 
            $table->json('featured_projects')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active'); // Status of the service
            $table->timestamps();
            $table->foreign('subcategories_id')->references('id')->on('sub_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
