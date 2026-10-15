<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('contact'); // contact | admission
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('applicant_name')->nullable();
            $table->string('entry_year')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('new'); // new | in_progress | closed
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
