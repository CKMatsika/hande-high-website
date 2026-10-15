import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const day = [
  { time: '06:00', item: 'Wake-up and morning routine' },
  { time: '07:30', item: 'Breakfast in the dining hall' },
  { time: '08:00', item: 'Academic day' },
  { time: '16:00', item: 'Sport, clubs and activities' },
  { time: '18:30', item: 'Supper' },
  { time: '19:30', item: 'Prep and evening study' },
  { time: '21:00', item: 'House time and lights out by house schedule' },
]

export default function BoardingPage() {
  usePageMeta({
    title: `Boarding Life — ${school.name}`,
    description: `Boarding life at ${school.name}, Nyashanu, Buhera.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Boarding Life"
        lead="A structured, supportive boarding environment — a second home for our learners."
        image="/img/photos/landscape-06.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading eyebrow="Our Houses" level="h2">
              Community by house
            </Heading>
            {/* TODO: CONFIRM house names and details */}
            <p className="mt-6 leading-relaxed text-brand-700">
              [BOARDING HOUSE INFORMATION — TO BE CONFIRMED. House names, housemasters and house
              identities will be described here.]
            </p>
            <p className="mt-4 leading-relaxed text-brand-600">
              Housemasters and house staff know every learner in their care, supported by a clear
              routine and an open-door policy.
            </p>
          </div>
          <MediaFrame
            src="/img/photos/landscape-01.jpg"
            alt="Boarding at Hande High School"
            className="shadow-2xl"
          />
        </Container>
      </section>
      <section className="bg-brand-950 py-[var(--spacing-section)] text-white">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading eyebrow="A Day in the Life" level="h2" className="text-white">
              The boarding routine
            </Heading>
            <p className="mt-4 leading-relaxed text-brand-200">
              A typical day balances academics, activity and rest. Times are indicative and
              confirmed each term.
            </p>
          </div>
          <ol className="space-y-4">
            {day.map((slot) => (
              <li
                key={slot.time}
                className="flex items-baseline gap-6 border-b border-white/15 pb-3"
              >
                <time className="w-16 shrink-0 font-display text-lg text-accent-400">
                  {slot.time}
                </time>
                <span className="text-brand-100">{slot.item}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
