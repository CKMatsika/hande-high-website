<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SchoolEventResource;
use App\Models\SchoolEvent;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $events = SchoolEvent::query()
            ->where('is_published', true)
            ->orderBy('starts_at')
            ->get();

        return SchoolEventResource::collection($events);
    }
}
