<?php

namespace App\Filament\Widgets;

use App\Models\Enquiry;
use App\Models\NewsPost;
use App\Models\SchoolEvent;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ContentOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('New enquiries', Enquiry::where('status', 'new')->count())
                ->description('Awaiting response')
                ->color('info'),
            Stat::make('Published news', NewsPost::where('is_published', true)->count())
                ->description('Live on the website')
                ->color('success'),
            Stat::make('Upcoming events', SchoolEvent::where('is_published', true)
                ->where('starts_at', '>=', now())
                ->count())
                ->description('Scheduled')
                ->color('warning'),
        ];
    }
}
