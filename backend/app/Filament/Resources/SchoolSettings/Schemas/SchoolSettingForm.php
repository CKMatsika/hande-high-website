<?php

namespace App\Filament\Resources\SchoolSettings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SchoolSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->helperText('Machine key, e.g. phone, email, motto'),
                Select::make('group')
                    ->required()
                    ->default('general')
                    ->options([
                        'general' => 'General',
                        'contact' => 'Contact',
                        'links' => 'Links',
                        'homepage' => 'Homepage',
                    ]),
                Textarea::make('value')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }
}
