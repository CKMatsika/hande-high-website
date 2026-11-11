<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_title')->nullable();
            $table->text('hero_lead')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('sections')->nullable();
            $table->boolean('use_custom_layout')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        $pages = [
            ['slug' => 'home', 'name' => 'Home'],
            ['slug' => 'about', 'name' => 'About Us'],
            ['slug' => 'about-history', 'name' => 'History'],
            ['slug' => 'about-vision-mission-values', 'name' => 'Vision, Mission & Values'],
            ['slug' => 'about-leadership', 'name' => 'Leadership'],
            ['slug' => 'academics', 'name' => 'Academics'],
            ['slug' => 'academics-curriculum', 'name' => 'Curriculum & Departments'],
            ['slug' => 'admissions', 'name' => 'Admissions'],
            ['slug' => 'admissions-apply', 'name' => 'Admissions Application'],
            ['slug' => 'student-life', 'name' => 'Student Life'],
            ['slug' => 'student-life-boarding', 'name' => 'Boarding Life'],
            ['slug' => 'student-life-sports-culture', 'name' => 'Sports & Culture'],
            ['slug' => 'student-life-welfare', 'name' => 'Student Welfare'],
            ['slug' => 'news', 'name' => 'News'],
            ['slug' => 'news-article', 'name' => 'News Article'],
            ['slug' => 'events', 'name' => 'Events'],
            ['slug' => 'gallery', 'name' => 'Gallery'],
            ['slug' => 'downloads', 'name' => 'Downloads'],
            ['slug' => 'contact', 'name' => 'Contact'],
            ['slug' => 'portal', 'name' => 'Portal Login'],
            ['slug' => 'privacy', 'name' => 'Privacy Policy'],
            ['slug' => 'terms', 'name' => 'Terms of Use'],
        ];

        $now = now();
        DB::table('site_pages')->insert(array_map(fn (array $page) => [
            ...$page,
            'is_published' => true,
            'use_custom_layout' => false,
            'created_at' => $now,
            'updated_at' => $now,
        ], $pages));
    }

    public function down(): void
    {
        Schema::dropIfExists('site_pages');
    }
};
