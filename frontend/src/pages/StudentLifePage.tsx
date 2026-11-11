import { Link } from 'react-router-dom'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'
import { featuredSchoolPhotos } from '@/content/photos'

const areas = [
  {
    to: '/student-life/boarding',
    title: 'Boarding Life',
    body: 'A structured home away from home, with houses, mentors and routines that support every learner.',
    image: featuredSchoolPhotos.campus,
  },
  {
    to: '/student-life/sports-culture',
    title: 'Sports & Culture',
    body: 'Team and individual sport, music, drama and the arts — something for every interest.',
    image: featuredSchoolPhotos.sports,
  },
  {
    to: '/student-life/welfare',
    title: 'Student Welfare',
    body: 'Pastoral care, counselling and health services that put wellbeing first.',
    image: featuredSchoolPhotos.students,
  },
]

export default function StudentLifePage() {
  usePageMeta({
    title: `Student Life — ${school.name}`,
    description: `Boarding, sport, culture and welfare at ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Life beyond the classroom"
        lead="Boarding, sport, culture and care — the wider experience of a Hande High education."
        image={featuredSchoolPhotos.students}
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="space-y-16">
          {areas.map((area, i) => (
            <div
              key={area.to}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>figure]:order-last' : ''
              }`}
            >
              <MediaFrame src={area.image} alt="" aspect="video" className="shadow-lg" />
              <div>
                <Heading level="h2">{area.title}</Heading>
                <p className="mt-4 leading-relaxed text-brand-600">{area.body}</p>
                <Link
                  to={area.to}
                  className="mt-6 inline-flex text-sm font-semibold uppercase tracking-widest text-brand-700 hover:text-accent-600"
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}
