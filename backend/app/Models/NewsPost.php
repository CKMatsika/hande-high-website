<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class NewsPost extends Model
{
    use HasFactory, LogsActivity, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_image',
        'is_published',
        'published_at',
        'author_id',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public static function boot(): void
    {
        parent::boot();

        static::saving(function (self $post) {
            $post->slug = Str::slug($post->title).'-'.Str::lower(Str::random(4));

            if ($post->is_published && ! $post->published_at) {
                $post->published_at = now();
            }
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('content')
            ->setDescriptionForEvent(fn (string $eventName) => "{$eventName} news post {$this->title}");
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
