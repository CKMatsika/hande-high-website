import { Download, FileText } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { usePageMeta } from '@/lib/usePageMeta'
import { useDownloads } from '@/lib/useContent'
import { school } from '@/content/school'

export default function DownloadsPage() {
  const { documents } = useDownloads()
  usePageMeta({
    title: `Downloads & Prospectus — ${school.name}`,
    description: `Prospectus and downloadable documents from ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Downloads & Prospectus"
        lead="Documents and resources for current and prospective families."
        image="/img/photos/landscape-06.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl">
          <ul className="divide-y divide-brand-200 border-y border-brand-200">
            {documents.map((doc) => {
              const disabled = doc.href === '#'
              return (
                <li key={doc.title} className="flex flex-wrap items-center justify-between gap-4 py-6">
                  <div className="flex items-start gap-4">
                    <FileText aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-brand-500" />
                    <div>
                      <h2 className="font-display text-xl text-brand-900">{doc.title}</h2>
                      <p className="mt-1 text-sm text-brand-600">{doc.detail}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-brand-400">
                        {doc.meta}
                      </p>
                    </div>
                  </div>
                  {disabled ? (
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Coming soon
                    </span>
                  ) : (
                    <a
                      href={doc.href}
                      className="inline-flex items-center gap-2 border border-brand-300 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50"
                    >
                      <Download aria-hidden="true" className="h-4 w-4" />
                      Download
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </>
  )
}
