import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { featuredSchoolPhotos } from '@/content/photos'

const gallery = [
  { src: featuredSchoolPhotos.campus, alt: 'Walkway between Hande High School classroom blocks' },
  { src: featuredSchoolPhotos.sports, alt: 'Hande High School netball team on court' },
  { src: featuredSchoolPhotos.arts, alt: 'Hande High School choir performing at an event' },
  { src: featuredSchoolPhotos.bus, alt: 'Front view of the Hande High School bus' },
]

export function CampusLife() {
  return (
    <section className="bg-white py-[var(--spacing-section)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Campus Life" level="h2" className="max-w-xl">
            Our campus and community
          </Heading>
          <ButtonLink to="/gallery" variant="outline">
            View Full Gallery
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item) => (
            <MediaFrame
              key={item.src}
              src={item.src}
              alt={item.alt}
              aspect="photo"
              className="shadow-sm"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
