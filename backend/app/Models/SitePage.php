<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class SitePage extends Model
{
    use LogsActivity;

    protected $fillable = [
        'slug',
        'name',
        'meta_title',
        'meta_description',
        'hero_eyebrow',
        'hero_title',
        'hero_lead',
        'hero_image',
        'sections',
        'use_custom_layout',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'sections' => 'array',
            'use_custom_layout' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('content')
            ->setDescriptionForEvent(fn (string $eventName) => "{$eventName} website page {$this->name}");
    }
}
