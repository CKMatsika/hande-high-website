import { HeartPulse, HeartHandshake, BookHeart } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const services = [
  {
    icon: HeartHandshake,
    title: 'Pastoral Care',
    body: 'Housemasters, tutors and teachers who know each learner and are approachable every day.',
  },
  {
    icon: HeartPulse,
    title: 'Health Services',
    body: '[SCHOOL HEALTH SERVICES — TO BE CONFIRMED. Clinic, nursing staff and medical referral arrangements.]',
  },
  {
    icon: BookHeart,
    title: 'Counselling & Support',
    body: '[COUNSELLING PROVISION — TO BE CONFIRMED. Access to guidance and emotional support for learners.]',
  },
]

export default function WelfarePage() {
  usePageMeta({
    title: `Student Welfare — ${school.name}`,
    description: `Pastoral care and student welfare at ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Student Welfare"
        lead="The wellbeing of every learner comes first."
        image="/img/photos/landscape-01.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="border-t-2 border-accent-500 pt-6">
                <service.icon aria-hidden="true" className="h-8 w-8 text-brand-700" />
                <h2 className="mt-4 font-display text-xl text-brand-900">{service.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-600">{service.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-brand-950 py-[var(--spacing-section)] text-white">
        <Container className="max-w-3xl">
          <Heading level="h2" className="text-white">
            A safe boarding environment
          </Heading>
          <p className="mt-4 leading-relaxed text-brand-200">
            [SAFEGUARDING AND WELFARE POLICY SUMMARY — TO BE CONFIRMED BY THE SCHOOL.] Schools
            publish their safeguarding, anti-bullying and visitation policies for parents.
          </p>
        </Container>
      </section>
    </>
  )
}
