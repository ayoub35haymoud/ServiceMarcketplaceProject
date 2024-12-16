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
            $table->unsignedBigInteger('category_id');          
            $table->string('name')->unique(); 
            $table->string('description')->nullable(); 
            $table->decimal('average_cost', 10, 2)->nullable();
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('service_categories') ->onDelete('cascade'); 
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
