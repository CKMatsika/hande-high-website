import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { VideoEmbed } from '@/design-system/components/VideoEmbed'
import { useSettings } from '@/lib/useContent'

/**
 * Optional homepage video. Appears only when a URL is set in the CMS under
 * Settings → Homepage (key `video_url`). Accepts a YouTube/Vimeo link or a
 * direct video file URL.
 */
export function VideoSection() {
  const settings = useSettings()
  const url = settings.homepage?.video_url?.trim()
  if (!url) return null

  const heading = settings.homepage?.video_heading?.trim() || 'A closer look'
  const intro = settings.homepage?.video_intro?.trim()

  return (
    <section className="bg-brand-50 py-[var(--spacing-section)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading eyebrow="Video" level="h2">
            {heading}
          </Heading>
          {intro && <p className="mt-4 text-lg leading-relaxed text-brand-600">{intro}</p>}
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <VideoEmbed url={url} title={heading} className="shadow-xl" />
        </div>
      </Container>
    </section>
  )
}
