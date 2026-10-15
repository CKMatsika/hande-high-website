<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => User::ROLE_ADMIN]);
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_admin_can_view_the_dashboard(): void
    {
        $this->actingAs($this->admin())->get('/admin')->assertOk();
    }

    public function test_admin_can_view_every_resource_index(): void
    {
        $admin = $this->admin();

        $routes = [
            'filament.admin.resources.news-posts.index',
            'filament.admin.resources.school-events.index',
            'filament.admin.resources.gallery-photos.index',
            'filament.admin.resources.leadership-profiles.index',
            'filament.admin.resources.school-documents.index',
            'filament.admin.resources.school-settings.index',
            'filament.admin.resources.enquiries.index',
        ];

        foreach ($routes as $route) {
            $this->actingAs($admin)
                ->get(route($route))
                ->assertOk();
        }
    }

    public function test_editor_can_create_a_news_post(): void
    {
        $editor = User::factory()->create(['role' => User::ROLE_EDITOR]);

        $this->actingAs($editor)
            ->get(route('filament.admin.resources.news-posts.create'))
            ->assertOk();
    }
}
