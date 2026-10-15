import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

// TODO: CONFIRM — all statements below are placeholders for the school's official text
const values = [
  {
    title: 'Integrity',
    body: '[Value statement — to be confirmed.]',
  },
  {
    title: 'Respect',
    body: '[Value statement — to be confirmed.]',
  },
  {
    title: 'Excellence',
    body: '[Value statement — to be confirmed.]',
  },
  {
    title: 'Service',
    body: '[Value statement — to be confirmed.]',
  },
]

export default function VisionMissionPage() {
  usePageMeta({
    title: `Vision, Mission & Values — ${school.name}`,
    description: `The vision, mission and values of ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Vision, Mission & Values"
        image="/img/photos/landscape-05.jpg"
      />
      <section className="bg-brand-950 py-[var(--spacing-section)] text-white">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div className="border-l-2 border-accent-500 pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
              Our Vision
            </p>
            {/* TODO: CONFIRM official vision statement */}
            <p className="mt-4 font-display text-3xl leading-snug">
              [VISION STATEMENT — TO BE CONFIRMED BY THE SCHOOL]
            </p>
          </div>
          <div className="border-l-2 border-accent-500 pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
              Our Mission
            </p>
            {/* TODO: CONFIRM official mission statement */}
            <p className="mt-4 font-display text-3xl leading-snug">
              [MISSION STATEMENT — TO BE CONFIRMED BY THE SCHOOL]
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <Heading eyebrow="Values" level="h2">
            The principles we live by
          </Heading>
          <ol className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((value, i) => (
              <li key={value.title} className="border-t border-brand-200 pt-5">
                <span className="font-display text-3xl text-accent-500">{i + 1}</span>
                <h3 className="mt-2 font-display text-xl text-brand-900">{value.title}</h3>
                <p className="mt-2 text-brand-600">{value.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 font-display text-xl italic text-brand-600">“{school.motto}”</p>
        </Container>
      </section>
    </>
  )
}
