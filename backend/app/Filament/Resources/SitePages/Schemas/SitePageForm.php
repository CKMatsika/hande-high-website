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
use Filament\Forms\Get;

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
                            ->helperText('When off, this editor’s changes are not sent to the public website.'),
                        Toggle::make('use_custom_layout')
                            ->label('Replace built-in page sections with my content blocks')
                            ->default(false)
                            ->disabled(fn (Get $get): bool => in_array($get('slug'), ['admissions-apply', 'contact', 'portal'], true))
                            ->helperText('For regular pages this hides the built-in page body and displays only the blocks below. Application, contact and portal pages are protected.'),
                    ]),
                Section::make('Search preview')
                    ->columns(2)
                    ->components([
                        TextInput::make('meta_title')->maxLength(255),
                        Textarea::make('meta_description')->rows(2)->maxLength(320)->columnSpanFull(),
                    ]),
                Section::make('Hero banner')
                    ->description('Override the heading, introduction and image at the top of this page. Leave a field blank to keep the website’s current wording or picture.')
                    ->columns(2)
                    ->components([
                        TextInput::make('hero_eyebrow')->label('Small heading')->maxLength(100),
                        TextInput::make('hero_title')->label('Main heading')->maxLength(255),
                        Textarea::make('hero_lead')->label('Introduction')->rows(3)->columnSpanFull(),
                        FileUpload::make('hero_image')
                            ->label('Hero image')
                            ->image()
                            ->disk('public')
                            ->directory('site-pages/heroes')
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
                                    ->options([
                                        'text' => 'Text section',
                                        'image-left' => 'Text with image on the left',
                                        'image-right' => 'Text with image on the right',
                                        'image' => 'Image feature',
                                        'video' => 'Video feature',
                                        'callout' => 'Highlight / callout',
                                    ]),
                                TextInput::make('heading')->label('Heading')->maxLength(255),
                                Textarea::make('body')
                                    ->label('Text')
                                    ->rows(5)
                                    ->helperText('Plain text is displayed safely. Use a blank line to separate paragraphs.')
                                    ->columnSpanFull(),
                                FileUpload::make('image_path')
                                    ->label('Image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('site-pages/sections')
                                    ->imageEditor(),
                                TextInput::make('video_url')
                                    ->label('Video URL')
                                    ->url()
                                    ->placeholder('YouTube, Vimeo or a direct MP4 URL')
                                    ->helperText('Paste a public video link. YouTube, Vimeo and direct MP4 URLs are supported.'),
                                TextInput::make('button_label')->label('Button text')->maxLength(80),
                                TextInput::make('button_url')->label('Button link')->maxLength(500),
                                ColorPicker::make('background_color')->label('Block background')->hex(),
                                ColorPicker::make('text_color')->label('Block text')->hex(),
                                Toggle::make('is_published')->label('Show block')->default(true),
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
            ]);
    }
}
