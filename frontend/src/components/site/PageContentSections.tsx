import { Container } from '@/design-system/components/Container'
import { VideoEmbed } from '@/design-system/components/VideoEmbed'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import type { ApiSitePage, ApiSitePageSection } from '@/lib/api'

function safeLink(value?: string | null): string | undefined {
  const url = value?.trim()
  if (!url) return undefined
  if (url.startsWith('/')) return url
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? url : undefined
  } catch {
    return undefined
  }
}

function ContentBlock({ section }: { section: ApiSitePageSection }) {
  const background = /^#[0-9a-f]{6}$/i.test(section.background_color ?? '') ? section.background_color! : undefined
  const color = /^#[0-9a-f]{6}$/i.test(section.text_color ?? '') ? section.text_color! : undefined
  const style = { ...(background ? { backgroundColor: background } : {}), ...(color ? { color } : {}) }
  const link = safeLink(section.button_url)
  const media = section.image ? <img src={section.image} alt={section.heading ?? ''} loading="lazy" className="h-full w-full object-contain" /> : null
  const video = section.video_url?.trim() ? <VideoEmbed url={section.video_url} title={section.heading ?? 'School video'} /> : null
  const copy = <div className="space-y-4">
    {section.heading && <h2 className="font-display text-3xl font-medium">{section.heading}</h2>}
    {section.body && <p className="whitespace-pre-line leading-relaxed">{section.body}</p>}
    {link && section.button_label && <ButtonLink href={link} external={link.startsWith('http')}>{section.button_label}</ButtonLink>}
  </div>

  return <section className="py-12 md:py-16" style={style}>
    <Container>
      {section.layout === 'video' ? <div className="grid gap-8 md:grid-cols-2 md:items-center">{copy}{video}</div>
        : section.layout === 'image' ? <div className="grid gap-8 md:grid-cols-2 md:items-center">{copy}{media && <figure className="aspect-[4/3] overflow-hidden">{media}</figure>}</div>
        : section.layout === 'image-left' ? <div className="grid gap-8 md:grid-cols-2 md:items-center">{media && <figure className="aspect-[4/3] overflow-hidden">{media}</figure>}{copy}</div>
        : section.layout === 'image-right' ? <div className="grid gap-8 md:grid-cols-2 md:items-center">{copy}{media && <figure className="aspect-[4/3] overflow-hidden">{media}</figure>}</div>
        : <div className={section.layout === 'callout' ? 'rounded-lg border border-current/15 p-8 md:p-12' : ''}>{copy}</div>}
    </Container>
  </section>
}

export function PageContentSections({ page }: { page: ApiSitePage }) {
  const sections = page.sections ?? []
  return <>{sections.map((section, index) => <ContentBlock key={`${section.admin_label ?? section.heading ?? 'section'}-${index}`} section={section} />)}</>
}

export function CustomPageCanvas({ page }: { page: ApiSitePage }) {
  return <>
    <section className="bg-brand-950 text-white">
      <Container className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          {page.hero_eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">{page.hero_eyebrow}</p>}
          <h1 className="mt-4 font-display text-5xl font-medium md:text-7xl">{page.hero_title || page.name}</h1>
          {page.hero_lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100">{page.hero_lead}</p>}
        </div>
        {page.hero_image && <figure className="aspect-[4/3] overflow-hidden"><img src={page.hero_image} alt="" className="h-full w-full object-contain" /></figure>}
      </Container>
    </section>
    <PageContentSections page={page} />
  </>
}
