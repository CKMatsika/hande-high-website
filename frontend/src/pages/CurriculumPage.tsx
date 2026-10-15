import { useState } from 'react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

// TODO: CONFIRM subject lists and examination details with the school
const phases = [
  {
    id: 'junior',
    label: 'Junior School',
    subjects: [
      'English Language & Literature',
      'Mathematics',
      'Integrated Science',
      'Humanities (History & Geography)',
      'Shona / Local Language',
      'Creative & Performing Arts',
      'Physical Education',
      '[ADDITIONAL SUBJECTS — TO BE CONFIRMED]',
    ],
    note: 'Subject offering at junior level to be confirmed by the school.',
  },
  {
    id: 'senior',
    label: 'Senior School',
    subjects: [
      'English Language & Literature',
      'Mathematics',
      'Sciences (Biology, Chemistry, Physics)',
      'Humanities (History, Geography)',
      'Commercial Subjects (Accounts, Business Studies)',
      'Computer Science',
      '[ADDITIONAL SUBJECTS — TO BE CONFIRMED]',
    ],
    note: 'Subject combinations and elective offerings to be confirmed.',
  },
  {
    id: 'sixth',
    label: 'Upper Sixth / A-Level',
    subjects: [
      '[A-LEVEL SUBJECT OFFERING — TO BE CONFIRMED]',
    ],
    note: 'A-Level subject combinations to be confirmed by the school.',
  },
]

export default function CurriculumPage() {
  const [active, setActive] = useState(phases[0].id)
  const phase = phases.find((p) => p.id === active) ?? phases[0]

  usePageMeta({
    title: `Curriculum & Departments — ${school.name}`,
    description: `Curriculum and academic departments at ${school.name}.`,
  })

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Curriculum & Departments"
        image="/img/photos/landscape-02.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <Heading level="h2">Subjects by stage</Heading>
          <div
            role="tablist"
            aria-label="School stages"
            className="mt-8 flex flex-wrap gap-2 border-b border-brand-200"
          >
            {phases.map((p) => (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={active === p.id}
                aria-controls={`panel-${p.id}`}
                onClick={() => setActive(p.id)}
                className={`border-b-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  active === p.id
                    ? 'border-accent-500 text-brand-900'
                    : 'border-transparent text-brand-500 hover:text-brand-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`panel-${phase.id}`}
            aria-labelledby={`tab-${phase.id}`}
            className="mt-10 grid gap-10 lg:grid-cols-2"
          >
            <ul className="grid gap-3">
              {phase.subjects.map((subject) => (
                <li
                  key={subject}
                  className="flex items-start gap-3 border-b border-brand-100 pb-3 text-brand-700"
                >
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-500" />
                  {subject}
                </li>
              ))}
            </ul>
            <div className="bg-brand-50 p-8">
              <h3 className="font-display text-xl text-brand-900">Examinations</h3>
              <p className="mt-3 leading-relaxed text-brand-600">{phase.note}</p>
              <p className="mt-4 leading-relaxed text-brand-600">
                Examination entries, timetables and results procedures are published for parents
                each season. Contact the school office for the current year&apos;s details.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
