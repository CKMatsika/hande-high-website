<?php

namespace App\Filament\Resources\SchoolEvents;

use App\Filament\Resources\SchoolEvents\Pages\CreateSchoolEvent;
use App\Filament\Resources\SchoolEvents\Pages\EditSchoolEvent;
use App\Filament\Resources\SchoolEvents\Pages\ListSchoolEvents;
use App\Filament\Resources\SchoolEvents\Schemas\SchoolEventForm;
use App\Filament\Resources\SchoolEvents\Tables\SchoolEventsTable;
use App\Models\SchoolEvent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SchoolEventResource extends Resource
{
    protected static ?string $model = SchoolEvent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendarDays;

    protected static ?string $navigationLabel = 'Events';

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return SchoolEventForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SchoolEventsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSchoolEvents::route('/'),
            'create' => CreateSchoolEvent::route('/create'),
            'edit' => EditSchoolEvent::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
