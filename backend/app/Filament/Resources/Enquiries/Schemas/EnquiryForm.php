<?php

namespace App\Filament\Resources\Enquiries\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class EnquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Enquiry')
                    ->columns(2)
                    ->components([
                        Select::make('type')
                            ->options([
                                'contact' => 'Contact',
                                'admission' => 'Admission',
                            ])
                            ->required(),
                        Select::make('status')
                            ->options([
                                'new' => 'New',
                                'in_progress' => 'In progress',
                                'closed' => 'Closed',
                            ])
                            ->required(),
                        TextInput::make('name')
                            ->required(),
                        TextInput::make('email')
                            ->email()
                            ->required(),
                        TextInput::make('phone'),
                        TextInput::make('applicant_name')
                            ->label('Applicant (learner)'),
                        TextInput::make('entry_year'),
                        Textarea::make('message')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),
                Section::make('Internal')
                    ->components([
                        Textarea::make('admin_notes')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('Only visible to staff'),
                    ]),
            ]);
    }
}
