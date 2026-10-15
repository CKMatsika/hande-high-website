import { CalendarDays, MapPin } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { useEvents } from '@/lib/useContent'
import { school } from '@/content/school'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function monthKey(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export default function EventsPage() {
  usePageMeta({
    title: `Events — ${school.name}`,
    description: `School calendar and upcoming events at ${school.name}.`,
  })

  const { events } = useEvents()
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  const months = [...new Set(sorted.map((e) => monthKey(e.date)))]

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Events & Calendar"
        lead="Open days, term dates and the life of the school, month by month."
        image="/img/photos/landscape-02.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl">
          {months.map((month) => (
            <div key={month} className="mb-14 last:mb-0">
              <h2 className="border-b border-brand-200 pb-3 font-display text-2xl text-brand-900">
                {month}
              </h2>
              <ul className="mt-6 space-y-6">
                {sorted
                  .filter((e) => monthKey(e.date) === month)
                  .map((event) => (
                    <li key={event.id} className="grid gap-4 sm:grid-cols-[12rem_1fr]">
                      <time
                        dateTime={event.date}
                        className="inline-flex items-start gap-2 text-sm font-semibold uppercase tracking-wider text-brand-500"
                      >
                        <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4" />
                        {formatDate(event.date)}
                      </time>
                      <div className="border-l-2 border-accent-500 pl-5">
                        <h3 className="font-display text-xl text-brand-900">{event.title}</h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-brand-500">
                          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                          {event.location}
                        </p>
                        <p className="mt-2 leading-relaxed text-brand-600">{event.description}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="mt-16 bg-brand-50 p-8">
            <Heading level="h3">Full school calendar</Heading>
            <p className="mt-3 text-brand-600">
              [TERM DATES AND THE FULL CALENDAR DOCUMENT — TO BE PUBLISHED IN DOWNLOADS.]
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
