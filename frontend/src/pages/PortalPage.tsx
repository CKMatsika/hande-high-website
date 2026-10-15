import { ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const portals = [
  {
    key: 'parents' as const,
    title: 'Parent Portal',
    body: 'Results, reports, fees and school communications for parents.',
  },
  {
    key: 'students' as const,
    title: 'Student Portal',
    body: 'Assignments, resources and timetables for learners.',
  },
  {
    key: 'staff' as const,
    title: 'Staff Portal',
    body: 'Teaching and administrative systems for staff members.',
  },
]

export default function PortalPage() {
  usePageMeta({
    title: `Portal Login — ${school.name}`,
    description: `Login to the ${school.name} school portal.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Portals"
        title="Portal Login"
        lead="Access the school's online systems. Accounts are issued by the school office."
        image="/img/photos/landscape-03.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <ul className="grid gap-8 md:grid-cols-3">
            {portals.map((portal) => {
              const href = school.portals[portal.key]
              return (
                <li key={portal.key} className="border-t-2 border-accent-500 bg-brand-50 p-8">
                  <h2 className="font-display text-2xl text-brand-900">{portal.title}</h2>
                  <p className="mt-3 leading-relaxed text-brand-600">{portal.body}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-brand-700 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  >
                    Login
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              )
            })}
          </ul>
          <p className="mt-10 text-sm text-brand-500">
            Trouble logging in? Contact the school office to reset your account.
          </p>
        </Container>
      </section>
    </>
  )
}
