<?php

namespace Database\Seeders;

use App\Models\SchoolSetting;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@handehigh.co.zw'],
            [
                'name' => 'Site Administrator',
                'password' => 'password', // hashed by model cast; change after first login
                'role' => User::ROLE_ADMIN,
            ],
        );

        User::updateOrCreate(
            ['email' => 'editor@handehigh.co.zw'],
            [
                'name' => 'Content Editor',
                'password' => 'password',
                'role' => User::ROLE_EDITOR,
            ],
        );

        // Seed settings from the values confirmed by the school
        $settings = [
            ['key' => 'school_name', 'value' => 'Hande High School', 'group' => 'general'],
            ['key' => 'motto', 'value' => 'Strive to Achieve', 'group' => 'general'],
            ['key' => 'location', 'value' => 'Nyashanu, Buhera, Manicaland Province, Zimbabwe', 'group' => 'general'],
            ['key' => 'physical_address', 'value' => 'Nyashanu, Buhera, Zimbabwe', 'group' => 'contact'],
            ['key' => 'postal_address', 'value' => 'P Bag 1014, Dorowa, Zimbabwe', 'group' => 'contact'],
            ['key' => 'phone', 'value' => '+263 774 862 592', 'group' => 'contact'],
            ['key' => 'email', 'value' => 'info@handehigh.co.zw', 'group' => 'contact'],
            ['key' => 'portal_url', 'value' => 'https://handehigh-production-mbxi6c.laravel.cloud/', 'group' => 'links'],
            // Homepage video (optional). Set video_url to a YouTube/Vimeo link or an MP4 to show the section.
            ['key' => 'video_url', 'value' => '', 'group' => 'homepage'],
            ['key' => 'video_heading', 'value' => '', 'group' => 'homepage'],
            ['key' => 'video_intro', 'value' => '', 'group' => 'homepage'],
        ];

        foreach ($settings as $setting) {
            SchoolSetting::setValue($setting['key'], $setting['value'], $setting['group']);
        }
    }
}
