import { Link } from 'react-router-dom'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { usePageMeta } from '@/lib/usePageMeta'
import { useNews } from '@/lib/useContent'
import { school } from '@/content/school'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsPage() {
  usePageMeta({
    title: `News — ${school.name}`,
    description: `Latest news and announcements from ${school.name}.`,
  })

  const { news } = useNews()
  const [featured, ...rest] = news

  return (
    <>
      <PageHero eyebrow="News & Events" title="Latest News" image="/img/photos/landscape-05.jpg" />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="space-y-14">
          {featured && (
            <Link
              to={`/news/${featured.slug}`}
              className="group grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <MediaFrame src={featured.image} alt="" aspect="video" className="shadow-lg" />
              <div>
                <time
                  dateTime={featured.date}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400"
                >
                  {formatDate(featured.date)}
                </time>
                <h2 className="mt-2 font-display text-3xl text-brand-900 group-hover:text-brand-700">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-brand-600">{featured.excerpt}</p>
                <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
                  Read article →
                </span>
              </div>
            </Link>
          )}

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <li key={item.slug}>
                <Link to={`/news/${item.slug}`} className="group block bg-brand-50 shadow-sm transition-shadow hover:shadow-lg">
                  <MediaFrame src={item.image} alt="" aspect="video" />
                  <div className="p-6">
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
        </Container>
      </section>
    </>
  )
}
