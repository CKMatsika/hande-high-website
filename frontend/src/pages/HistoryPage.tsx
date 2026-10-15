import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

// TODO: CONFIRM — replace with the school's real milestones and dates
const milestones = [
  {
    period: '[YEAR — TO BE CONFIRMED]',
    title: 'Founding',
    body: '[Founding story of the school — to be supplied by the school.]',
  },
  {
    period: '[YEAR — TO BE CONFIRMED]',
    title: 'Growth',
    body: '[Key developments in the school’s history — to be supplied.]',
  },
  {
    period: '[YEAR — TO BE CONFIRMED]',
    title: 'Present Day',
    body: '[The school as it stands today — to be supplied.]',
  },
]

export default function HistoryPage() {
  usePageMeta({
    title: `History — ${school.name}`,
    description: `The history of ${school.name}, Nyashanu, Buhera.`,
  })

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our History"
        lead="A story still being written — from our founding to the school of today."
        image="/img/photos/landscape-06.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl">
          <Heading level="h2">Milestones</Heading>
          <ol className="mt-12 border-l-2 border-brand-200 pl-8">
            {milestones.map((item) => (
              <li key={item.title} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.4rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent-500"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-2xl text-brand-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
