<?php

namespace App\Models;

use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Enquiry extends Model
{
    use HasFactory, LogsActivity, SoftDeletes;

    protected $fillable = [
        'type',
        'name',
        'email',
        'phone',
        'applicant_name',
        'entry_year',
        'message',
        'status',
        'admin_notes',
    ];

    protected static function booted(): void
    {
        static::created(function (Enquiry $enquiry): void {
            $admins = User::query()->where('role', User::ROLE_ADMIN)->get();

            if ($admins->isEmpty()) {
                return;
            }

            $contact = $enquiry->phone ? "{$enquiry->name} ({$enquiry->phone})" : $enquiry->name;

            Notification::make()
                ->title(ucfirst($enquiry->type).' enquiry received')
                ->body("From {$contact} — {$enquiry->email}")
                ->icon('heroicon-o-envelope')
                ->iconColor('warning')
                ->sendToDatabase($admins);
        });
    }

    protected function casts(): array
    {
        return [];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('enquiries')
            ->setDescriptionForEvent(fn (string $eventName) => "{$eventName} enquiry from {$this->name} ({$this->type})");
    }
}
