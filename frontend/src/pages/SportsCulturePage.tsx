import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

// TODO: CONFIRM actual sports and cultural programmes offered
const sports = [
  'Football',
  'Netball',
  'Basketball',
  'Athletics',
  'Cricket',
  'Tennis',
  'Volleyball',
  '[ADDITIONAL SPORT — TO BE CONFIRMED]',
]

const culture = [
  'Choir & Music',
  'Drama & Theatre',
  'Debate & Public Speaking',
  'Visual Arts',
  'Coding & Technology Club',
  '[ADDITIONAL ACTIVITY — TO BE CONFIRMED]',
]

function ProgrammeList({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div>
      <h2 className={`font-display text-3xl ${accent}`}>{title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 border-b border-brand-100 pb-3 text-brand-700"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SportsCulturePage() {
  usePageMeta({
    title: `Sports & Culture — ${school.name}`,
    description: `Sports and cultural programmes at ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Sports & Culture"
        lead="Room for every talent — on the field, on the stage and in the studio."
        image="/img/photos/landscape-04.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid gap-16 lg:grid-cols-2">
          <ProgrammeList title="Sport" items={sports} accent="text-brand-900" />
          <ProgrammeList title="Arts & Culture" items={culture} accent="text-brand-900" />
        </Container>
      </section>
      <section className="bg-brand-50 py-[var(--spacing-section)]">
        <Container className="max-w-3xl text-center">
          {/* TODO: CONFIRM achievements and fixtures — none are invented here */}
          <Heading level="h2">Teams & fixtures</Heading>
          <p className="mt-4 leading-relaxed text-brand-600">
            [TEAM LISTS, FIXTURES AND ACHIEVEMENTS — TO BE CONFIRMED BY THE SCHOOL.] In the
            meantime, contact the school office for the current season&apos;s information.
          </p>
        </Container>
      </section>
    </>
  )
}
