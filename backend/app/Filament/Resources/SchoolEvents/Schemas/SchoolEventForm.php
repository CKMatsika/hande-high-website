<?php

namespace App\Filament\Resources\SchoolEvents\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SchoolEventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Event')
                    ->columns(2)
                    ->components([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('location')
                            ->maxLength(255),
                        DateTimePicker::make('starts_at')
                            ->required()
                            ->seconds(false),
                        DateTimePicker::make('ends_at')
                            ->seconds(false)
                            ->afterOrEqual('starts_at'),
                        RichEditor::make('description')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'italic', 'underline', 'strike',
                                'bulletList', 'orderedList', 'link',
                            ]),
                        Toggle::make('is_published')
                            ->required()
                            ->default(true),
                    ]),
            ]);
    }
}
