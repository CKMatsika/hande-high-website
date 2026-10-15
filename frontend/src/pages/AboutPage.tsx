import { Link } from 'react-router-dom'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const subpages = [
  {
    to: '/about/history',
    title: 'History',
    body: 'The story of our school from its founding to the present day.',
  },
  {
    to: '/about/vision-mission-values',
    title: 'Vision, Mission & Values',
    body: 'What we stand for and the principles that guide our community.',
  },
  {
    to: '/about/leadership',
    title: 'School Leadership',
    body: 'Meet the people responsible for the care and direction of the school.',
  },
]

const facts = [
  { label: 'Founded', value: school.founded },
  { label: 'Location', value: 'Nyashanu, Buhera' },
  { label: 'Motto', value: school.motto },
]

export default function AboutPage() {
  usePageMeta({
    title: `About Us — ${school.name}`,
    description: `Learn about ${school.name}, our story, values and leadership.`,
  })

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A school community rooted in Nyashanu"
        lead={`${school.name} is a school in ${school.location}, dedicated to academic rigour, character and opportunity for every learner.`}
        image="/img/photos/landscape-04.jpg"
      />

      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading eyebrow="Who We Are" level="h2">
              Known, challenged and prepared
            </Heading>
            {/* TODO: CONFIRM — replace with the school's official history summary */}
            <p className="mt-6 leading-relaxed text-brand-700">
              [SCHOOL INTRODUCTION — TO BE CONFIRMED BY THE SCHOOL. This section will describe
              the school's founding, its growth and the community it serves.]
            </p>
            <ButtonLink to="/about/history" variant="primary" className="mt-8">
              Our History
            </ButtonLink>
          </div>
          <MediaFrame
            src="/img/photos/landscape-01.jpg"
            alt="Photograph of Hande High School"
            className="shadow-2xl"
          />
        </Container>
      </section>

      <section className="border-y border-brand-100 bg-brand-50">
        <Container className="grid gap-8 py-12 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                {fact.label}
              </p>
              <p className="mt-2 font-display text-2xl text-brand-900">{fact.value}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <Heading eyebrow="Explore" level="h2">
            Discover more about us
          </Heading>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {subpages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="group border-t-2 border-accent-500 bg-brand-50 p-7 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-display text-xl text-brand-900 group-hover:text-brand-700">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{page.body}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
