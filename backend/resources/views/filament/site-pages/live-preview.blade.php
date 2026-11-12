@php
    $draftJson = json_encode($draftPage, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    $draftPreviewUrl = $currentPageUrl . (str_contains($currentPageUrl, '?') ? '&' : '?') . 'cmsPreview=1';
@endphp

<div
    data-cms-page-preview
    data-draft="{{ $draftJson }}"
    class="grid gap-5 xl:grid-cols-2"
>
    <section class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900">
        <div class="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-white/10">
            <div>
                <h3 class="text-sm font-semibold text-gray-950 dark:text-white">Current published page</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">What visitors see before you save</p>
            </div>
            <a href="{{ $currentPageUrl }}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
                Open page ↗
            </a>
        </div>
        <iframe
            src="{{ $currentPageUrl }}"
            title="Current published page"
            loading="lazy"
            class="h-[32rem] w-full bg-white"
        ></iframe>
        <p class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">If the preview area is blank, the website host may block embedding. Use “Open page” to view it in a new tab.</p>
    </section>

    <section class="overflow-hidden rounded-xl border border-primary-300 bg-white shadow-sm dark:border-primary-500/40 dark:bg-gray-900">
        <div class="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-white/10">
            <div>
                <h3 class="text-sm font-semibold text-gray-950 dark:text-white">Unsaved draft preview</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Updates as you edit. Saving is still required to publish.</p>
            </div>
            <span class="text-xs font-medium text-primary-600 dark:text-primary-400">Live draft</span>
        </div>
        <iframe
            data-draft-preview-frame
            src="{{ $draftPreviewUrl }}"
            title="Unsaved draft page preview"
            loading="lazy"
            class="h-[32rem] w-full bg-white"
        ></iframe>
        <p class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">The draft preview is private to this editor and does not change the published page.</p>
    </section>
</div>

<script>
    (() => {
        const root = document.currentScript?.previousElementSibling;
        if (!root?.matches('[data-cms-page-preview]')) return;

        const frame = root.querySelector('[data-draft-preview-frame]');
        if (!frame) return;

        const sendDraft = () => {
            if (!frame.contentWindow) return;
            try {
                const draft = JSON.parse(root.dataset.draft || '{}');
                frame.contentWindow.postMessage(
                    { type: 'hande-cms-page-preview', page: draft },
                    new URL(frame.src, window.location.href).origin,
                );
            } catch (error) {
                console.error('Could not update the page preview.', error);
            }
        };

        frame.addEventListener('load', sendDraft);
        window.addEventListener('message', (event) => {
            if (event.source === frame.contentWindow && event.data?.type === 'hande-cms-page-preview-ready') {
                sendDraft();
            }
        });

        const observer = new MutationObserver(sendDraft);
        observer.observe(root, { attributes: true, attributeFilter: ['data-draft'] });
        sendDraft();
    })();
</script>
