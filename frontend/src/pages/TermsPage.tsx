import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

export default function TermsPage() {
  usePageMeta({
    title: `Terms of Use — ${school.name}`,
    description: `Terms of use for the ${school.name} website.`,
  })

  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" image="/img/photos/landscape-06.jpg" />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="max-w-3xl space-y-5 leading-relaxed text-brand-700">
          {/* TODO: CONFIRM — legal text to be supplied by the school before launch */}
          <p className="text-brand-500">
            [TERMS OF USE — TO BE CONFIRMED BY THE SCHOOL.] This page will set out the terms on
            which website content may be used, disclaimers and governing law.
          </p>
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
        </Container>
      </section>
    </>
  )
}
