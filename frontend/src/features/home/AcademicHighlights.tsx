import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'

const highlights = [
  {
    title: 'Academic Programmes',
    // TODO: CONFIRM examination boards (ZIMSEC / Cambridge / other)
    body: 'A broad curriculum from lower school through to public examinations, with specialist teaching and small classes. Examination entries follow the board approved by the school.',
  },
  {
    title: 'Examinations',
    body: 'Examination timetables, entry information and results procedures are published for parents each season. Contact the school office for the current year’s details.',
  },
  {
    title: 'Academic Achievements',
    // Placeholder — no results or statistics are invented
    body: '[ACADEMIC ACHIEVEMENTS — TO BE CONFIRMED BY THE SCHOOL]',
  },
]

export function AcademicHighlights() {
  return (
    <section className="bg-brand-950 py-[var(--spacing-section)] text-white">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <MediaFrame
          src="/img/photos/landscape-03.jpg"
          alt="Photograph of learning at Hande High School"
          aspect="photo"
        />
        <div>
          <Heading eyebrow="Academics" level="h2" className="text-white">
            Serious learning, wide horizons
          </Heading>
          <dl className="mt-10 space-y-8">
            {highlights.map((item) => (
              <div key={item.title} className="border-l-2 border-accent-500 pl-5">
                <dt className="font-display text-xl text-accent-400">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-brand-200">{item.body}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/academics" variant="outlineLight" className="mt-10">
            Explore Academics
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
