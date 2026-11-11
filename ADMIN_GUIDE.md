# Website content controls

The Filament admin is available at `/admin` on the backend host.

## Website Pages

Open **Site → Website Pages** to edit the website’s public pages. Each page has:

- SEO title and description
- Hero eyebrow, heading, introduction, and image overrides
- Reorderable blocks for text, image and text layouts, video, callouts, buttons, and block colors
- A publish switch for CMS overrides and a custom layout switch

Leave a hero field blank to keep the built-in page content. Blocks normally appear after the built-in page content. Turn on **Replace built-in page sections with my content blocks** to build a fully custom page from those blocks. The Contact page and Admissions Application page cannot be replaced, preserving their forms.

For each block, use a public YouTube, Vimeo, or direct MP4 URL for video. Use the block color pickers to set an optional background and text color. Images are uploaded to the backend’s public storage.

## Settings and theme

Open **Site → Settings** to update school details, contact information, portal link, and homepage video fields. Use these keys for the theme color pickers:

- `brand_primary_color` — primary brand color
- `brand_accent_color` — highlight color

Enter colors in hex format (for example `#17365D`). Existing groups are available in the group filter; theme values belong to **Appearance & theme**.

## Other content

Use the Content admin group for News Posts, Events, Gallery Photos, Leadership Profiles, and School Documents. Events now support an optional event image. Existing publication controls and ordering fields remain available on their respective forms.

## Deployment

Run the backend migrations during deployment so Website Pages and event images are available:

```sh
cd backend
php artisan migrate --force
```

Ensure the Laravel public storage link exists on the hosted backend so uploaded images can be displayed by the public website.
