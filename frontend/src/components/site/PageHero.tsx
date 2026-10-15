import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'

interface PageHeroProps {
  title: string
  eyebrow?: string
  lead?: string
  image?: string
}

const defaultImage = '/img/photos/landscape-02.jpg'

export function PageHero({ title, eyebrow, lead, image = defaultImage }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 md:py-28" aria-label={title}>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/40" />
      <Container className="relative">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
            {eyebrow}
          </p>
        )}
        <Heading level="h1" className="mt-4 text-white">
          {title}
        </Heading>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-200">{lead}</p>}
      </Container>
    </section>
  )
}
