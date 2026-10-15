import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

export function NotFoundPage() {
  usePageMeta({
    title: `Page not found — ${school.name}`,
    description: 'The page you are looking for does not exist or has been moved.',
    noindex: true,
  })

  return (
    <section className="grid min-h-[60vh] place-items-center bg-white py-[var(--spacing-section)]">
      <Container className="text-center">
        <Heading level="h1">Page not found</Heading>
        <p className="mt-4 text-brand-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <ButtonLink to="/" className="mt-8">
          Return Home
        </ButtonLink>
      </Container>
    </section>
  )
}

export default NotFoundPage
