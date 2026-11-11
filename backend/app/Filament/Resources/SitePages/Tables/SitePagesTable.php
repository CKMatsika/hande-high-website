<?php

namespace App\Filament\Resources\SitePages\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class SitePagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('Page')->searchable()->sortable(),
                TextColumn::make('slug')->badge()->searchable(),
                IconColumn::make('is_published')->label('Content enabled')->boolean(),
                IconColumn::make('use_custom_layout')->label('Custom layout')->boolean(),
                TextColumn::make('updated_at')->since()->label('Last edited')->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_published')->label('Content enabled'),
                TernaryFilter::make('use_custom_layout')->label('Custom layout'),
            ])
            ->defaultSort('name')
            ->recordActions([EditAction::make()]);
    }
}
