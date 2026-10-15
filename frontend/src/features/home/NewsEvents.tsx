import { CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { useEvents, useNews } from '@/lib/useContent'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsEvents() {
  const { news } = useNews(3)
  const { events } = useEvents(3)

  return (
    <section className="bg-brand-50 py-[var(--spacing-section)]">
      <Container className="grid gap-16 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="News" level="h2">
              Latest Announcements
            </Heading>
            <Link
              to="/news"
              className="text-xs font-semibold uppercase tracking-widest text-brand-700 hover:text-accent-600"
            >
              Browse all news
            </Link>
          </div>
          <ul className="mt-8 space-y-6">
            {news.map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/news/${item.slug}`}
                  className="group grid gap-5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:grid-cols-40-60"
                >
                  <MediaFrame
                    src={item.image}
                    alt=""
                    aspect="video"
                    className="sm:col-span-1"
                  />
                  <div className="sm:col-span-2">
                    <time
                      dateTime={item.date}
                      className="text-xs uppercase tracking-widest text-brand-400"
                    >
                      {formatDate(item.date)}
                    </time>
                    <h3 className="mt-1 font-display text-xl text-brand-900 group-hover:text-brand-700">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-600">{item.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="Calendar" level="h2">
              Upcoming Events
            </Heading>
            <Link
              to="/events"
              className="text-xs font-semibold uppercase tracking-widest text-brand-700 hover:text-accent-600"
            >
              Full calendar
            </Link>
          </div>
          <ul className="mt-8 space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border-l-2 border-accent-500 bg-white p-5 shadow-sm">
                <time
                  dateTime={event.date}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-500"
                >
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                  {formatDate(event.date)}
                </time>
                <h3 className="mt-1 font-display text-lg text-brand-900">{event.title}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-brand-500">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {event.location}
                </p>
                <p className="mt-2 text-sm text-brand-600">{event.description}</p>
              </li>
            ))}
          </ul>
          <ButtonLink to="/events" variant="outline" className="mt-8">
            View All Events
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
