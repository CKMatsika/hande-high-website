import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { TextField, TextAreaField, SelectField } from '@/components/ui/FormFields'
import { Button } from '@/design-system/components/Button'
import { usePageMeta } from '@/lib/usePageMeta'
import { submitEnquiry } from '@/lib/api'
import { school } from '@/content/school'

interface FormState {
  parentName: string
  email: string
  phone: string
  applicantName: string
  entryYear: string
  message: string
}

const empty: FormState = {
  parentName: '',
  email: '',
  phone: '',
  applicantName: '',
  entryYear: '',
  message: '',
}

function validate(form: FormState, consent: boolean) {
  const errors: Partial<Record<keyof FormState | 'consent', string>> = {}
  if (!form.parentName.trim()) errors.parentName = 'Please enter your name.'
  if (!form.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.applicantName.trim()) errors.applicantName = "Please enter the applicant's name."
  if (!form.entryYear) errors.entryYear = 'Please select an entry year.'
  if (!consent) errors.consent = 'Please confirm the declaration before submitting.'
  return errors
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(empty)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'consent', string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  usePageMeta({
    title: `Apply / Enquire — ${school.name}`,
    description: `Submit an admissions enquiry to ${school.name}.`,
  })

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next = validate(form, consent)
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    const result = await submitEnquiry({
      type: 'admission',
      name: form.parentName,
      email: form.email,
      phone: form.phone || undefined,
      applicant_name: form.applicantName,
      entry_year: form.entryYear,
      message: form.message || 'Admissions enquiry.',
      consent: true,
      honeypot: '',
    })
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
      return
    }

    if (result.errors) {
      setErrors({
        parentName: result.errors.name?.[0],
        email: result.errors.email?.[0],
        applicantName: result.errors.applicant_name?.[0],
        entryYear: result.errors.entry_year?.[0],
        consent: result.errors.consent?.[0],
      })
    }
    setFormError(result.message)
  }

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Apply / Enquire"
        lead="Tell us about your family and our admissions team will be in touch."
        image="/img/photos/landscape-02.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                role="status"
                className="flex items-start gap-4 border border-green-300 bg-green-50 p-8"
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-green-700" />
                <div>
                  <h2 className="font-display text-xl text-green-900">Enquiry received</h2>
                  <p className="mt-2 text-green-800">
                    Thank you, {form.parentName}. Our admissions team will contact you at{' '}
                    {form.email}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <TextField
                  id="parentName"
                  label="Parent / Guardian name"
                  required
                  value={form.parentName}
                  onChange={set('parentName')}
                  error={errors.parentName}
                  autoComplete="name"
                />
                <TextField
                  id="email"
                  label="Email address"
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <TextField
                  id="phone"
                  label="Contact number"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
                <TextField
                  id="applicantName"
                  label="Applicant's name"
                  required
                  value={form.applicantName}
                  onChange={set('applicantName')}
                  error={errors.applicantName}
                />
                <SelectField
                  id="entryYear"
                  label="Entry year"
                  required
                  value={form.entryYear}
                  onChange={set('entryYear')}
                  error={errors.entryYear}
                  options={[
                    { value: '', label: 'Select a year' },
                    { value: '2027', label: '2027' },
                    { value: '2028', label: '2028' },
                    { value: '2029', label: '2029' },
                  ]}
                />
                <div className="sm:col-span-2">
                  <TextAreaField
                    id="message"
                    label="Message"
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Entry level, current school, or any questions…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-brand-700">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      className="mt-1 h-4 w-4 accent-brand-700"
                    />
                    <span>
                      I confirm the information above is accurate and consent to the school
                      contacting me about this enquiry.
                    </span>
                  </label>
                  {errors.consent && (
                    <p role="alert" className="mt-1.5 text-sm text-red-700">
                      {errors.consent}
                    </p>
                  )}
                </div>
                {formError && (
                  <p role="alert" className="sm:col-span-2 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {formError}
                  </p>
                )}
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Enquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>
          <aside className="lg:col-span-2">
            <div className="bg-brand-50 p-8">
              <h2 className="font-display text-xl text-brand-900">Admissions Office</h2>
              <address className="mt-4 space-y-2 text-sm not-italic text-brand-700">
                <p>{school.contact.address}</p>
                <p>Postal: {school.contact.postal}</p>
                <p>{school.contact.phone}</p>
                <p>{school.contact.email}</p>
              </address>
              <p className="mt-6 text-sm leading-relaxed text-brand-600">
                Prefer to apply directly? Use the official application portal.
              </p>
              <a
                href={school.admissions.applyUrl}
                className="mt-4 inline-flex items-center text-sm font-semibold uppercase tracking-wider text-brand-700 hover:text-accent-600"
              >
                Open application portal →
              </a>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
