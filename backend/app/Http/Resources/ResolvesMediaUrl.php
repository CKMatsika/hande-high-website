<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;

trait ResolvesMediaUrl
{
    protected function mediaUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return url(Storage::disk('public')->url($path));
    }
}
