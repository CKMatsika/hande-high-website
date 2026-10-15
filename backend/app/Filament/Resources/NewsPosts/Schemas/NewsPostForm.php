<?php

namespace App\Filament\Resources\NewsPosts\Schemas;

use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NewsPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Article')
                    ->columns(2)
                    ->components([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Select::make('author_id')
                            ->label('Author')
                            ->options(User::query()->pluck('name', 'id'))
                            ->searchable()
                            ->default(auth()->id()),
                        Textarea::make('excerpt')
                            ->rows(2)
                            ->columnSpanFull(),
                        RichEditor::make('body')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'italic', 'underline', 'strike', 'h2', 'h3',
                                'bulletList', 'orderedList', 'link', 'blockquote',
                            ]),
                    ]),
                Section::make('Publishing')
                    ->columns(2)
                    ->components([
                        FileUpload::make('cover_image')
                            ->label('Cover image')
                            ->image()
                            ->directory('news')
                            ->imageEditor(),
                        Toggle::make('is_published')
                            ->required()
                            ->default(true),
                        DateTimePicker::make('published_at')
                            ->seconds(false),
                    ]),
            ]);
    }
}
