<?php

namespace App\Filament\Resources\SchoolSettings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ColorPicker;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
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
                    ->live()
                    ->afterStateUpdated(function (?string $state, Set $set): void {
                        if (in_array($state, ['brand_primary_color', 'brand_accent_color'], true)) {
                            $set('group', 'appearance');
                        }
                    })
                    ->helperText('Use a short unique key. Appearance colors use brand_primary_color and brand_accent_color.'),
                Select::make('group')
                    ->required()
                    ->live()
                    ->default('general')
                    ->options([
                        'general' => 'General',
                        'contact' => 'Contact',
                        'links' => 'Links',
                        'homepage' => 'Homepage',
                        'appearance' => 'Appearance & theme',
                    ]),
                ColorPicker::make('value')
                    ->label('Theme color')
                    ->hex()
                    ->visible(fn (Get $get): bool => in_array($get('key'), ['brand_primary_color', 'brand_accent_color'], true))
                    ->helperText('Choose a color with the picker or enter a hex value such as #17365D.'),
                Textarea::make('value')
                    ->label('Setting value')
                    ->rows(3)
                    ->visible(fn (Get $get): bool => ! in_array($get('key'), ['brand_primary_color', 'brand_accent_color'], true))
                    ->columnSpanFull(),
            ]);
    }
}
