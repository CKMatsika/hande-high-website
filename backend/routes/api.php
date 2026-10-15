<?php

use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\LeadershipController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public content API
|--------------------------------------------------------------------------
|
| Read-only endpoints for the marketing website. Only published content is
| ever exposed. Enquiry submission is rate limited.
|
*/

Route::get('/settings', [SettingController::class, 'index'])->name('api.settings.index');

Route::get('/news', [NewsController::class, 'index'])->name('api.news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('api.news.show');

Route::get('/events', [EventController::class, 'index'])->name('api.events.index');
Route::get('/gallery', [GalleryController::class, 'index'])->name('api.gallery.index');
Route::get('/downloads', [DocumentController::class, 'index'])->name('api.downloads.index');
Route::get('/leadership', [LeadershipController::class, 'index'])->name('api.leadership.index');

Route::post('/enquiries', [EnquiryController::class, 'store'])
    ->middleware('throttle:enquiries')
    ->name('api.enquiries.store');
