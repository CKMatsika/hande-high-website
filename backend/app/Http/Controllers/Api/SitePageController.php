<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SitePage;
use App\Http\Resources\ResolvesMediaUrl;
use Illuminate\Http\JsonResponse;

class SitePageController extends Controller
{
    use ResolvesMediaUrl;

    public function show(string $slug): JsonResponse
    {
        $page = SitePage::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $sections = collect($page->sections ?? [])
            ->filter(fn (array $section) => filter_var($section['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN))
            ->map(function (array $section): array {
                $section['image'] = $this->mediaUrl($section['image_path'] ?? null);
                unset($section['image_path']);
                unset($section['admin_label']);

                return $section;
            })
            ->values();

        return response()->json([
            'data' => [
                'slug' => $page->slug,
                'name' => $page->name,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'hero_eyebrow' => $page->hero_eyebrow,
                'hero_title' => $page->hero_title,
                'hero_lead' => $page->hero_lead,
                'hero_image' => $this->mediaUrl($page->hero_image),
                'sections' => $sections,
                'use_custom_layout' => $page->use_custom_layout,
            ],
        ]);
    }
}
