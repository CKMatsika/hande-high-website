import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

export default function PrivacyPage() {
  usePageMeta({
    title: `Privacy Policy — ${school.name}`,
    description: `Privacy policy of ${school.name}.`,
  })

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" image="/img/photos/landscape-06.jpg" />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl space-y-5 leading-relaxed text-brand-700">
          {/* TODO: CONFIRM — legal text to be supplied by the school before launch */}
          <p className="text-brand-500">
            [PRIVACY POLICY — TO BE CONFIRMED BY THE SCHOOL.] This page will describe how the
            school collects, uses and protects personal information submitted through this
            website, in line with applicable Zimbabwean data protection requirements.
          </p>
          <p>
            For any questions about how your data is handled, contact{' '}
            <a href={`mailto:${school.contact.email}`} className="text-brand-700 underline hover:text-accent-600">
              {school.contact.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  )
}
