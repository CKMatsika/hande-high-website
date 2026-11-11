<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolEventResource extends JsonResource
{
    use ResolvesMediaUrl;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'starts_at' => $this->starts_at?->toIso8601String(),
            'ends_at' => $this->ends_at?->toIso8601String(),
            'date' => $this->starts_at?->toDateString(),
            'time' => $this->starts_at?->format('H:i'),
            'location' => $this->location,
            'description' => $this->description,
            'image' => $this->mediaUrl($this->image_path),
            'is_upcoming' => $this->starts_at?->isFuture() ?? false,
        ];
    }
}
