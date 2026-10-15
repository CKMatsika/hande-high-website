<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsPostResource;
use App\Models\NewsPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $posts = NewsPost::query()
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->with('author')
            ->orderByDesc('published_at')
            ->paginate(perPage: min((int) $request->integer('per_page', 9), 50));

        return NewsPostResource::collection($posts);
    }

    public function show(string $slug): NewsPostResource
    {
        $post = NewsPost::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->with('author')
            ->firstOrFail();

        return new NewsPostResource($post);
    }
}
