<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeadershipProfileResource;
use App\Models\LeadershipProfile;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LeadershipController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $profiles = LeadershipProfile::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return LeadershipProfileResource::collection($profiles);
    }
}
