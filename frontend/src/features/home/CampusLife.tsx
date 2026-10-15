import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'

const gallery = [
  { src: '/img/photos/portrait-01.jpg', alt: 'Photograph of Hande High School' },
  { src: '/img/photos/landscape-04.jpg', alt: 'Photograph of the school campus' },
  { src: '/img/photos/landscape-05.jpg', alt: 'Photograph of school life' },
  { src: '/img/photos/landscape-06.jpg', alt: 'Photograph of school facilities' },
]

export function CampusLife() {
  return (
    <section className="bg-white py-[var(--spacing-section)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Campus Life" level="h2" className="max-w-xl">
            Grounds and facilities to grow into
          </Heading>
          <ButtonLink to="/gallery" variant="outline">
            View Full Gallery
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <MediaFrame
              key={item.src}
              src={item.src}
              alt={item.alt}
              aspect={i === 0 ? 'portrait' : 'square'}
              className={`shadow-sm ${i === 0 ? 'sm:row-span-2 sm:aspect-auto sm:h-full' : ''}`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
