import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'

interface PageHeroProps {
  title: string
  eyebrow?: string
  lead?: string
  image?: string
}

const defaultImage = '/img/photos/campus-classroom-walkway.jpg'

export function PageHero({ title, eyebrow, lead, image = defaultImage }: PageHeroProps) {
  return (
    <section className="bg-brand-950" aria-label={title}>
      <Container className="grid gap-8 py-10 md:grid-cols-2 md:items-center md:gap-12 md:py-12 lg:gap-16">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
              {eyebrow}
            </p>
          )}
          <Heading level="h1" className="mt-4 text-white">
            {title}
          </Heading>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-200">{lead}</p>}
        </div>
        <figure className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-brand-950">
          <img src={image} alt="" aria-hidden="true" className="h-full w-full object-contain" />
        </figure>
      </Container>
    </section>
  )
}
