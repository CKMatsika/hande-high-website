<?php

namespace App\Filament\Resources\SitePages\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\View;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class SitePageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Page')
                    ->columns(2)
                    ->components([
                        TextInput::make('name')
                            ->label('Page name')
                            ->required()
                            ->live(onBlur: true)
                            ->maxLength(120),
                        TextInput::make('slug')
                            ->required()
                            ->live()
                            ->unique(ignoreRecord: true)
                            ->regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
                            ->helperText('Internal route key, such as about-history. Do not change after setup.'),
                        Toggle::make('is_published')
                            ->label('Page content enabled')
                            ->default(true)
                            ->live()
                            ->helperText('When off, this editor’s changes are not sent to the public website.'),
                        Toggle::make('use_custom_layout')
                            ->label('Replace built-in page sections with my content blocks')
                            ->default(false)
                            ->live()
                            ->disabled(fn (Get $get): bool => in_array($get('slug'), ['admissions-apply', 'contact', 'portal'], true))
                            ->helperText('For regular pages this hides the built-in page body and displays only the blocks below. Application, contact and portal pages are protected.'),
                    ]),
                Section::make('Search preview')
                    ->columns(2)
                    ->components([
                        TextInput::make('meta_title')->maxLength(255)->live(onBlur: true),
                        Textarea::make('meta_description')->rows(2)->maxLength(320)->live(onBlur: true)->columnSpanFull(),
                    ]),
                Section::make('Hero banner')
                    ->description('Override the heading, introduction and image at the top of this page. Leave a field blank to keep the website’s current wording or picture.')
                    ->columns(2)
                    ->components([
                        TextInput::make('hero_eyebrow')->label('Small heading')->maxLength(100)->live(onBlur: true),
                        TextInput::make('hero_title')->label('Main heading')->maxLength(255)->live(onBlur: true),
                        Textarea::make('hero_lead')->label('Introduction')->rows(3)->live(onBlur: true)->columnSpanFull(),
                        FileUpload::make('hero_image')
                            ->label('Hero image')
                            ->image()
                            ->disk('public')
                            ->directory('site-pages/heroes')
                            ->live()
                            ->imageEditor()
                            ->columnSpanFull(),
                    ]),
                Section::make('Page content blocks')
                    ->description('Add, edit and reorder text, images, videos, callouts and buttons. These appear below the built-in page content unless you enable the custom layout above.')
                    ->schema([
                        Repeater::make('sections')
                            ->label('Content blocks')
                            ->schema([
                                TextInput::make('admin_label')
                                    ->label('Block label (admin only)')
                                    ->required()
                                    ->maxLength(100)
                                    ->columnSpanFull(),
                                Select::make('layout')
                                    ->required()
                                    ->default('text')
                                    ->live()
                                    ->options([
                                        'text' => 'Text section',
                                        'image-left' => 'Text with image on the left',
                                        'image-right' => 'Text with image on the right',
                                        'image' => 'Image feature',
                                        'video' => 'Video feature',
                                        'callout' => 'Highlight / callout',
                                    ]),
                                TextInput::make('heading')->label('Heading')->maxLength(255)->live(onBlur: true),
                                Textarea::make('body')
                                    ->label('Text')
                                    ->rows(5)
                                    ->live(onBlur: true)
                                    ->helperText('Plain text is displayed safely. Use a blank line to separate paragraphs.')
                                    ->columnSpanFull(),
                                FileUpload::make('image_path')
                                    ->label('Image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('site-pages/sections')
                                    ->live()
                                    ->imageEditor(),
                                TextInput::make('video_url')
                                    ->label('Video URL')
                                    ->url()
                                    ->live(onBlur: true)
                                    ->placeholder('YouTube, Vimeo or a direct MP4 URL')
                                    ->helperText('Paste a public video link. YouTube, Vimeo and direct MP4 URLs are supported.'),
                                TextInput::make('button_label')->label('Button text')->maxLength(80)->live(onBlur: true),
                                TextInput::make('button_url')->label('Button link')->maxLength(500)->live(onBlur: true),
                                ColorPicker::make('background_color')->label('Block background')->hex()->live(),
                                ColorPicker::make('text_color')->label('Block text')->hex()->live(),
                                Toggle::make('is_published')->label('Show block')->default(true)->live(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->cloneable()
                            ->reorderable()
                            ->addActionLabel('Add content block')
                            ->itemLabel(fn (array $state): ?string => $state['admin_label'] ?? $state['heading'] ?? 'Content block')
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),
                Section::make('Preview before saving')
                    ->description('Compare the current published page with your unsaved draft. Changes go live only after you save the page.')
                    ->schema([
                        View::make('filament.site-pages.live-preview')
                            ->viewData(fn (Get $get): array => [
                                'currentPageUrl' => static::currentPageUrl((string) $get('slug')),
                                'draftPage' => static::draftPage($get),
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    private static function currentPageUrl(string $slug): string
    {
        $routes = [
            'home' => '/',
            'about' => '/about',
            'about-history' => '/about/history',
            'about-vision-mission-values' => '/about/vision-mission-values',
            'about-leadership' => '/about/leadership',
            'academics' => '/academics',
            'academics-curriculum' => '/academics/curriculum',
            'admissions' => '/admissions',
            'admissions-apply' => '/admissions/apply',
            'student-life' => '/student-life',
            'student-life-boarding' => '/student-life/boarding',
            'student-life-sports-culture' => '/student-life/sports-culture',
            'student-life-welfare' => '/student-life/welfare',
            'news' => '/news',
            'news-article' => '/news/welcome-to-our-new-website',
            'events' => '/events',
            'gallery' => '/gallery',
            'downloads' => '/downloads',
            'contact' => '/contact',
            'portal' => '/portal',
            'privacy' => '/privacy',
            'terms' => '/terms',
        ];

        $baseUrl = rtrim((string) config('services.website.public_url'), '/');
        $path = $routes[$slug] ?? '/' . str_replace('-', '/', $slug);

        return $baseUrl . $path;
    }

    private static function draftPage(Get $get): array
    {
        $sections = $get('sections') ?? [];
        if (! is_array($sections)) {
            $sections = [];
        }

        return [
            'slug' => (string) $get('slug'),
            'name' => (string) ($get('name') ?: 'Website page'),
            'meta_title' => $get('meta_title'),
            'meta_description' => $get('meta_description'),
            'hero_eyebrow' => $get('hero_eyebrow'),
            'hero_title' => $get('hero_title'),
            'hero_lead' => $get('hero_lead'),
            'hero_image' => static::previewImageUrl($get('hero_image')),
            'sections' => array_values(array_map(static function (array $section): array {
                $section['image'] = static::previewImageUrl($section['image_path'] ?? null);
                unset($section['image_path']);

                return $section;
            }, array_filter($sections, 'is_array'))),
            'use_custom_layout' => (bool) $get('use_custom_layout'),
        ];
    }

    private static function previewImageUrl(mixed $file): ?string
    {
        if ($file instanceof TemporaryUploadedFile) {
            return $file->temporaryUrl();
        }

        if (! is_string($file) || $file === '') {
            return null;
        }

        if (str_starts_with($file, 'https://') || str_starts_with($file, 'http://')) {
            return $file;
        }

        return url(Storage::disk('public')->url($file));
    }
}
