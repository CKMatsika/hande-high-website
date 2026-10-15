import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '@/design-system/components/Container'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { NotFoundPage } from './NotFoundPage'
import { useJsonLd, usePageMeta } from '@/lib/usePageMeta'
import { useNewsArticle } from '@/lib/useContent'
import { school } from '@/content/school'
import { absoluteUrl } from '@/lib/seo'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsArticlePage() {
  const { slug } = useParams()
  const { article, loading } = useNewsArticle(slug)

  usePageMeta({
    title: article ? `${article.title} — ${school.name}` : `News — ${school.name}`,
    description: article?.excerpt,
    image: article?.image,
    type: 'article',
    path: slug ? `/news/${slug}` : '/news',
  })

  const articleJsonLd = useMemo(() => {
    if (!article) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      datePublished: article.date,
      image: [absoluteUrl(article.image)],
      author: [{ '@type': 'Organization', name: school.name, url: absoluteUrl('/') }],
      publisher: {
        '@type': 'Organization',
        name: school.name,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/img/logo.png') },
      },
      description: article.excerpt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/news/${slug}`) },
    }
  }, [article, slug])

  useJsonLd('news-article', articleJsonLd)

  if (loading) {
    return (
      <article className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl">
          <p className="text-brand-500">Loading article…</p>
        </Container>
      </article>
    )
  }

  if (!article) return <NotFoundPage />

  return (
    <article className="bg-white py-[var(--spacing-section)]">
      <Container className="max-w-3xl">
        <Link
          to="/news"
          className="text-xs font-semibold uppercase tracking-widest text-brand-600 hover:text-accent-600"
        >
          ← All news
        </Link>
        <time
          dateTime={article.date}
          className="mt-8 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-400"
        >
          {formatDate(article.date)}
        </time>
        <h1 className="mt-2 font-display text-4xl leading-tight text-brand-900">
          {article.title}
        </h1>
        <MediaFrame src={article.image} alt="" aspect="video" className="mt-10 shadow-lg" />
        {article.body ? (
          <div
            className="mt-10 space-y-5 text-lg leading-relaxed text-brand-700 [&_a]:text-accent-600 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-brand-900 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-brand-900 [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        ) : (
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-brand-700">
            <p>{article.excerpt}</p>
            <p className="text-brand-500">
              The full article will be published here shortly. News content is managed from the
              school&apos;s administration system.
            </p>
          </div>
        )}
      </Container>
    </article>
  )
}
