<?php

namespace App\Filament\Resources\LeadershipProfiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\NumberInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LeadershipProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Profile')
                    ->columns(2)
                    ->components([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('role')
                            ->required()
                            ->maxLength(255)
                            ->helperText('e.g. Headmaster, Deputy Head, Bursar'),
                        Textarea::make('bio')
                            ->rows(4)
                            ->columnSpanFull(),
                        FileUpload::make('portrait_path')
                            ->label('Portrait')
                            ->image()
                            ->directory('leadership')
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
