import { Link } from 'react-router-dom'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const strands = [
  {
    title: 'Junior School',
    body: 'A broad foundation in core subjects, building skills, curiosity and good study habits.',
  },
  {
    title: 'Senior School',
    body: 'Subject specialisation and preparation for public examinations.',
  },
  {
    title: 'Examinations',
    // TODO: CONFIRM examination board(s) — ZIMSEC, Cambridge or other
    body: 'Public examination entries follow the board approved by the school. [EXAMINATION BOARD — TO BE CONFIRMED].',
  },
]

export default function AcademicsPage() {
  usePageMeta({
    title: `Academics — ${school.name}`,
    description: `Academic programmes and examinations at ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Serious learning, wide horizons"
        lead="A structured curriculum, specialist teaching and a culture that takes learning seriously."
        image="/img/photos/landscape-03.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <MediaFrame
            src="/img/photos/landscape-01.jpg"
            alt="Learning at Hande High School"
            className="shadow-2xl"
          />
          <div>
            <Heading eyebrow="Approach" level="h2">
              Every learner, known and stretched
            </Heading>
            {/* TODO: CONFIRM academic approach copy */}
            <p className="mt-6 leading-relaxed text-brand-700">
              [ACADEMIC APPROACH — TO BE CONFIRMED. Describe teaching philosophy, class sizes,
              support for individual learners and academic outcomes.]
            </p>
            <ButtonLink to="/academics/curriculum" variant="primary" className="mt-8">
              Curriculum & Departments
            </ButtonLink>
          </div>
        </Container>
      </section>
      <section className="bg-brand-950 py-[var(--spacing-section)] text-white">
        <Container>
          <Heading eyebrow="Stages" level="h2" className="text-white">
            The academic journey
          </Heading>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {strands.map((item) => (
              <div key={item.title} className="border-t border-white/20 pt-5">
                <h3 className="font-display text-xl text-accent-400">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-brand-200">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-brand-50 py-[var(--spacing-section)]">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <Heading level="h3">Considering {school.shortName} for your child?</Heading>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to="/admissions">Admissions</ButtonLink>
            <Link
              to="/downloads"
              className="inline-flex items-center px-6 py-3 text-sm font-medium uppercase tracking-wider text-brand-700 hover:text-accent-600"
            >
              Prospectus
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
