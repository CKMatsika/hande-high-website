import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { school } from '@/content/school'

const steps = [
  { title: 'Enquire', body: 'Submit an enquiry or download the prospectus to learn more about the school.' },
  { title: 'Apply', body: 'Complete the application form with the required supporting documents.' },
  { title: 'Assessment', body: 'Shortlisted applicants are invited for assessment and an interview.' },
  { title: 'Offer', body: 'Successful families receive an offer and guidance on next steps.' },
]

export function AdmissionsCta() {
  return (
    <section className="bg-brand-900 py-[var(--spacing-section)] text-white">
      <Container>
        <div className="max-w-2xl">
          <Heading eyebrow="Admissions" level="h2" className="text-white">
            Begin your family&apos;s journey with us
          </Heading>
          <p className="mt-4 leading-relaxed text-brand-200">
            Applications for the coming academic year are now open. Our admissions team will
            guide you through every step.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-white/20 pt-5">
              <span className="font-display text-3xl text-accent-400">{i + 1}</span>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-200">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href={school.admissions.applyUrl} variant="accent" size="lg">
            Apply for Admission
          </ButtonLink>
          <ButtonLink href={school.admissions.prospectusUrl} variant="outlineLight" size="lg">
            Download Prospectus
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
