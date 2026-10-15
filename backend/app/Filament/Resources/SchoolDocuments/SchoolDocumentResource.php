<?php

namespace App\Filament\Resources\SchoolDocuments;

use App\Filament\Resources\SchoolDocuments\Pages\CreateSchoolDocument;
use App\Filament\Resources\SchoolDocuments\Pages\EditSchoolDocument;
use App\Filament\Resources\SchoolDocuments\Pages\ListSchoolDocuments;
use App\Filament\Resources\SchoolDocuments\Schemas\SchoolDocumentForm;
use App\Filament\Resources\SchoolDocuments\Tables\SchoolDocumentsTable;
use App\Models\SchoolDocument;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SchoolDocumentResource extends Resource
{
    protected static ?string $model = SchoolDocument::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocument;

    protected static ?string $navigationLabel = 'Documents';

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 5;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return SchoolDocumentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SchoolDocumentsTable::configure($table);
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
            'index' => ListSchoolDocuments::route('/'),
            'create' => CreateSchoolDocument::route('/create'),
            'edit' => EditSchoolDocument::route('/{record}/edit'),
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
