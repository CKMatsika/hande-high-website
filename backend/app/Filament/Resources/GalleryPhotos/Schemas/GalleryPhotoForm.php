<?php

namespace App\Filament\Resources\GalleryPhotos\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\NumberInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GalleryPhotoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Photo')
                    ->columns(2)
                    ->components([
                        TextInput::make('title')
                            ->maxLength(255),
                        TextInput::make('album')
                            ->required()
                            ->default('general')
                            ->helperText('Grouping used by the website, e.g. campus, sport, academics'),
                        FileUpload::make('image_path')
                            ->label('Image')
                            ->image()
                            ->required()
                            ->directory('gallery')
                            ->imageEditor(),
                        NumberInput::make('sort_order')
                            ->default(0)
                            ->minValue(0),
                        Toggle::make('is_published')
                            ->required()
                            ->default(true),
                    ]),
            ]);
    }
}
