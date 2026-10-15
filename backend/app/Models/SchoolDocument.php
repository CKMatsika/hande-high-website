<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class SchoolDocument extends Model
{
    use HasFactory, LogsActivity, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'file_type',
        'file_size',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'file_size' => 'integer',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        $deriveFileType = function (self $doc) {
            if ($doc->file_path) {
                $doc->file_type = strtolower(pathinfo($doc->file_path, PATHINFO_EXTENSION));
            }
        };

        static::creating($deriveFileType);
        static::updating($deriveFileType);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName('content');
    }
}
