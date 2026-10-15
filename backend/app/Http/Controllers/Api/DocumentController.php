<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SchoolDocumentResource;
use App\Models\SchoolDocument;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DocumentController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $documents = SchoolDocument::query()
            ->where('is_published', true)
            ->latest()
            ->get();

        return SchoolDocumentResource::collection($documents);
    }
}
