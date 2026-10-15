import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

const steps = [
  { title: 'Enquire', body: 'Submit an enquiry or download the prospectus.' },
  { title: 'Apply', body: 'Complete the application form with supporting documents.' },
  { title: 'Assessment', body: 'Shortlisted applicants are invited for assessment and interview.' },
  { title: 'Offer', body: 'Successful families receive an offer and next-step guidance.' },
]

// TODO: CONFIRM entry requirements and fee structure
const requirements = [
  { stage: 'Form 1', detail: '[ENTRY REQUIREMENTS — TO BE CONFIRMED]' },
  { stage: 'Lower Sixth', detail: '[ENTRY REQUIREMENTS — TO BE CONFIRMED]' },
  { stage: 'Mid-year transfers', detail: '[POLICY — TO BE CONFIRMED]' },
]

export default function AdmissionsPage() {
  usePageMeta({
    title: `Admissions — ${school.name}`,
    description: `How to apply to ${school.name}, Nyashanu, Buhera.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Joining Hande High School"
        lead="Applications for the coming academic year are open. We will guide your family through every step."
        image="/img/photos/landscape-05.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <Heading eyebrow="Process" level="h2">
            How admission works
          </Heading>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-accent-500 pt-5">
                <span className="font-display text-4xl text-brand-300">{i + 1}</span>
                <h3 className="mt-2 font-display text-xl text-brand-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-brand-50 py-[var(--spacing-section)]">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Entry" level="h2">
              Entry requirements
            </Heading>
            <table className="mt-8 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-300 text-xs uppercase tracking-widest text-brand-500">
                  <th scope="col" className="py-3 pr-4">
                    Stage
                  </th>
                  <th scope="col" className="py-3">
                    Requirements
                  </th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((row) => (
                  <tr key={row.stage} className="border-b border-brand-200">
                    <th scope="row" className="py-4 pr-4 font-semibold text-brand-900">
                      {row.stage}
                    </th>
                    <td className="py-4 text-brand-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-brand-950 p-10 text-white">
            <Heading eyebrow="Fees" level="h3" className="text-white">
              Fees & payment
            </Heading>
            <p className="mt-4 leading-relaxed text-brand-200">
              [FEE STRUCTURE — TO BE CONFIRMED BY THE SCHOOL. Fees, levies and payment terms will
              be published here and in the prospectus.]
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={school.admissions.applyUrl} variant="accent">
                Apply Now
              </ButtonLink>
              <ButtonLink to="/admissions/apply" variant="outlineLight">
                Make an Enquiry
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
