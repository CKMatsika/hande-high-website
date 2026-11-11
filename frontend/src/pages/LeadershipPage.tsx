import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { usePageMeta } from '@/lib/usePageMeta'
import { useLeadership } from '@/lib/useContent'
import { school } from '@/content/school'
import { featuredSchoolPhotos } from '@/content/photos'

export default function LeadershipPage() {
  const { leaders } = useLeadership()

  usePageMeta({
    title: `School Leadership — ${school.name}`,
    description: `The leadership team of ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="School Leadership"
        lead="The staff who lead, care for and guide our school community."
        image={featuredSchoolPhotos.students}
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <Heading level="h2">Our team</Heading>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, i) => (
              <li key={`${leader.role}-${i}`} className="bg-brand-50 shadow-sm">
                {leader.portrait && (
                  <MediaFrame src={leader.portrait} alt={`${leader.name}, ${leader.role}`} aspect="photo" />
                )}
                <div className={`p-6 ${leader.portrait ? '' : 'border-t-2 border-accent-500'}`}>
                  <h3 className="font-display text-xl text-brand-900">{leader.name || leader.role}</h3>
                  {leader.name && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                      {leader.role}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
