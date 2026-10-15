<?php

namespace Tests\Feature;

use App\Models\Enquiry;
use App\Models\GalleryPhoto;
use App\Models\LeadershipProfile;
use App\Models\NewsPost;
use App\Models\SchoolDocument;
use App\Models\SchoolEvent;
use App\Models\SchoolSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_settings_endpoint_groups_values(): void
    {
        SchoolSetting::setValue('phone', '+263 774 862 592', 'contact');

        $this->getJson('/api/settings')
            ->assertOk()
            ->assertJsonPath('data.contact.phone', '+263 774 862 592');
    }

    public function test_news_index_only_returns_published_posts(): void
    {
        NewsPost::create(['title' => 'Published Story', 'is_published' => true]);
        NewsPost::create(['title' => 'Hidden Story', 'is_published' => false]);

        $response = $this->getJson('/api/news')->assertOk();

        $titles = collect($response->json('data'))->pluck('title');

        $this->assertTrue($titles->contains('Published Story'));
        $this->assertFalse($titles->contains('Hidden Story'));
    }

    public function test_news_show_returns_a_published_post_with_body(): void
    {
        $post = NewsPost::create([
            'title' => 'Sports Day Recap',
            'body' => '<p>What a day.</p>',
            'is_published' => true,
        ]);

        $this->getJson("/api/news/{$post->slug}")
            ->assertOk()
            ->assertJsonPath('data.title', 'Sports Day Recap')
            ->assertJsonPath('data.body', '<p>What a day.</p>');
    }

    public function test_news_show_returns_404_for_unknown_slug(): void
    {
        $this->getJson('/api/news/does-not-exist')->assertNotFound();
    }

    public function test_events_gallery_downloads_and_leadership_are_listed(): void
    {
        SchoolEvent::create([
            'title' => 'Open Day',
            'starts_at' => now()->addWeek(),
            'is_published' => true,
        ]);
        GalleryPhoto::create(['image_path' => 'gallery/a.jpg', 'album' => 'campus']);
        SchoolDocument::create(['title' => 'Prospectus', 'file_path' => 'documents/p.pdf']);
        LeadershipProfile::create(['name' => 'A. Headmaster', 'role' => 'Headmaster']);

        $this->getJson('/api/events')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/gallery')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/downloads')->assertOk()->assertJsonPath('data.0.file_type', 'pdf');
        $this->getJson('/api/leadership')->assertOk()->assertJsonPath('data.0.name', 'A. Headmaster');
    }

    public function test_contact_enquiry_can_be_submitted(): void
    {
        $this->postJson('/api/enquiries', [
            'name' => 'Tendai Moyo',
            'email' => 'tendai@example.com',
            'phone' => '+263 771 000 000',
            'message' => 'I would like more information about fees.',
        ])->assertCreated();

        $this->assertDatabaseHas('enquiries', [
            'email' => 'tendai@example.com',
            'type' => 'contact',
            'status' => 'new',
        ]);
    }

    public function test_admission_enquiry_requires_an_applicant_name(): void
    {
        $this->postJson('/api/enquiries', [
            'type' => 'admission',
            'name' => 'Parent Name',
            'email' => 'parent@example.com',
            'message' => 'Applying for Form 1.',
        ])->assertStatus(422)->assertJsonValidationErrors('applicant_name');
    }

    public function test_honeypot_field_rejects_spam(): void
    {
        $this->postJson('/api/enquiries', [
            'name' => 'Bot',
            'email' => 'bot@example.com',
            'message' => 'spam',
            'honeypot' => 'filled',
        ])->assertStatus(422)->assertJsonValidationErrors('honeypot');

        $this->assertSame(0, Enquiry::count());
    }

    public function test_new_enquiry_notifies_admins_in_the_database(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);
        User::factory()->create(['role' => User::ROLE_EDITOR]);

        $this->postJson('/api/enquiries', [
            'name' => 'Tendai Moyo',
            'email' => 'tendai@example.com',
            'message' => 'Please send enrolment details.',
        ])->assertCreated();

        $this->assertDatabaseCount('notifications', 1);
        $this->assertDatabaseHas('notifications', [
            'notifiable_type' => User::class,
            'notifiable_id' => $admin->id,
        ]);
    }

    public function test_enquiry_does_not_notify_when_there_are_no_admins(): void
    {
        User::factory()->create(['role' => User::ROLE_EDITOR]);

        $this->postJson('/api/enquiries', [
            'name' => 'Tendai Moyo',
            'email' => 'tendai@example.com',
            'message' => 'Hello.',
        ])->assertCreated();

        $this->assertDatabaseCount('notifications', 0);
    }
}
