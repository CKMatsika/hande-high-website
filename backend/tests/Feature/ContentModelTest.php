<?php

namespace Tests\Feature;

use App\Models\NewsPost;
use App\Models\SchoolDocument;
use App\Models\SchoolSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_news_post_generates_a_slug_and_publish_timestamp(): void
    {
        $post = NewsPost::create([
            'title' => 'ZIMSEC Results Released',
            'is_published' => true,
        ]);

        $this->assertStringStartsWith('zimsec-results-released', $post->slug);
        $this->assertNotNull($post->published_at);
    }

    public function test_unpublished_news_post_has_no_publish_timestamp(): void
    {
        $post = NewsPost::create([
            'title' => 'Draft Article',
            'is_published' => false,
        ]);

        $this->assertNull($post->published_at);
    }

    public function test_school_document_derives_the_file_type(): void
    {
        $document = SchoolDocument::create([
            'title' => 'Prospectus',
            'file_path' => 'documents/prospectus-2026.pdf',
        ]);

        $this->assertSame('pdf', $document->file_type);
    }

    public function test_settings_are_cached_and_updated(): void
    {
        SchoolSetting::setValue('phone', '+263 774 862 592', 'contact');

        $this->assertSame('+263 774 862 592', SchoolSetting::getValue('phone'));

        SchoolSetting::setValue('phone', '+263 771 000 000', 'contact');

        $this->assertSame('+263 771 000 000', SchoolSetting::getValue('phone'));
    }

    public function test_admin_can_be_created_with_the_expected_role(): void
    {
        $user = User::factory()->create(['role' => User::ROLE_ADMIN]);

        $this->assertTrue($user->isAdmin());
        $this->assertTrue($user->canDeleteContent());
    }
}
