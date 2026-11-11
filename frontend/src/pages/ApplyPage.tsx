import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { FieldWrapper, SelectField, TextAreaField, TextField } from '@/components/ui/FormFields'
import { Button } from '@/design-system/components/Button'
import { usePageMeta } from '@/lib/usePageMeta'
import { submitAdmissionApplication, type AdmissionApplicationPayload } from '@/lib/api'
import { school } from '@/content/school'
import { featuredSchoolPhotos } from '@/content/photos'

type ApplicationFields = Omit<AdmissionApplicationPayload, 'documents' | 'idempotency_key'>
type DocumentCategory = keyof AdmissionApplicationPayload['documents']
type FieldErrors = Record<string, string>

const empty: ApplicationFields = {
  entry_form: 'Form 1',
  student_first_name: '',
  student_other_names: '',
  student_last_name: '',
  student_date_of_birth: '',
  student_gender: 'male',
  previous_school: '',
  subject_combination: '',
  residency: 'day',
  guardian_first_name: '',
  guardian_last_name: '',
  guardian_relationship: '',
  guardian_phone: '',
  guardian_email: '',
  guardian_alternate_phone: '',
  guardian_address: '',
  birth_certificate_number: '',
}

const uploadTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const maxFileSize = 10 * 1024 * 1024

function newIdempotencyKey() {
  return crypto.randomUUID()
}

function FileField({
  id,
  label,
  required,
  file,
  error,
  onChange,
}: {
  id: DocumentCategory
  label: string
  required?: boolean
  file?: File
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <FieldWrapper label={label} htmlFor={id} required={required} error={error}>
      <input
        id={id}
        type="file"
        accept={uploadTypes}
        required={required}
        aria-invalid={Boolean(error)}
        onChange={onChange}
        className="w-full border border-brand-300 bg-white px-3.5 py-2.5 text-sm text-brand-900 file:mr-3 file:border-0 file:bg-brand-50 file:px-3 file:py-1 file:text-brand-800"
      />
      <p className="mt-1 text-xs text-brand-500">PDF, DOC, DOCX, JPG or PNG; up to 10 MB{file ? ` — ${file.name}` : ''}</p>
    </FieldWrapper>
  )
}

export default function ApplyPage() {
  const [form, setForm] = useState<ApplicationFields>(empty)
  const [documents, setDocuments] = useState<Partial<Record<DocumentCategory, File>>>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [confirmation, setConfirmation] = useState({ message: '', applicationNumber: '' })
  // Retain the same key across failed attempts so a retry cannot create a duplicate ERP record.
  const idempotencyKey = useRef<string | null>(null)
  if (!idempotencyKey.current) idempotencyKey.current = newIdempotencyKey()

  usePageMeta({
    title: `2027 Admissions Application — ${school.name}`,
    description: `Apply for Form 1 or Form 5 admission at ${school.name} for 2027.`,
  })

  const set = (key: keyof ApplicationFields) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const setFile = (category: DocumentCategory) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setDocuments((current) => ({ ...current, [category]: file }))
    setErrors((current) => ({ ...current, [`documents.${category}`]: '' }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const next: FieldErrors = {}
    const requiredFields: (keyof ApplicationFields)[] = [
      'entry_form', 'student_first_name', 'student_last_name', 'student_date_of_birth',
      'student_gender', 'previous_school', 'residency', 'guardian_first_name',
      'guardian_last_name', 'guardian_relationship', 'guardian_phone', 'guardian_address',
    ]
    requiredFields.forEach((key) => {
      if (!String(form[key]).trim()) next[key] = 'This field is required.'
    })
    if (form.entry_form === 'Form 5' && !form.subject_combination.trim()) {
      next.subject_combination = 'Enter a subject combination or “To be confirmed”.'
    }
    if (form.guardian_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guardian_email)) {
      next.guardian_email = 'Enter a valid email address.'
    }
    ;(['birth_certificate', 'previous_school_report'] as const).forEach((category) => {
      if (!documents[category]) next[`documents.${category}`] = 'Please select this required document.'
    })
    Object.entries(documents).forEach(([category, file]) => {
      if (file && file.size > maxFileSize) {
        next[`documents.${category}`] = 'Each upload must be 10 MB or smaller.'
      }
    })
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length) return

    setSubmitting(true)
    const result = await submitAdmissionApplication({
      ...form,
      subject_combination: form.entry_form === 'Form 5' ? form.subject_combination : '',
      idempotency_key: idempotencyKey.current!,
      documents: documents as AdmissionApplicationPayload['documents'],
    })
    setSubmitting(false)

    if (result.ok) {
      setConfirmation({
        message: result.message,
        applicationNumber: result.applicationNumber ?? '',
      })
      setSubmitted(true)
      return
    }

    const serverErrors = result.errors ?? {}
    const mappedErrors: FieldErrors = {}
    Object.entries(serverErrors).forEach(([key, messages]) => {
      if (messages[0]) mappedErrors[key] = messages[0]
    })
    setErrors(mappedErrors)
    setFormError(result.message)
  }

  return (
    <>
      <PageHero
        eyebrow="2027 Admissions"
        title="Application Form"
        lead="Apply for Form 1 or Form 5. Your application will be sent to the school for review."
        image={featuredSchoolPhotos.students}
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {submitted ? (
              <div role="status" className="flex items-start gap-4 border border-green-300 bg-green-50 p-8">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-green-700" />
                <div>
                  <h2 className="font-display text-xl text-green-900">Application submitted</h2>
                  <p className="mt-2 text-green-800">{confirmation.message}</p>
                  {confirmation.applicationNumber && (
                    <p className="mt-3 font-semibold text-green-900">Application number: {confirmation.applicationNumber}</p>
                  )}
                  <p className="mt-2 text-sm text-green-800">Your application has been sent for review. This does not confirm admission.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <h2 className="font-display text-xl text-brand-900">Student details</h2>
                </div>
                <SelectField
                  id="entry_form" label="Entry form" required value={form.entry_form} onChange={set('entry_form')}
                  error={errors.entry_form}
                  options={[{ value: 'Form 1', label: 'Form 1' }, { value: 'Form 5', label: 'Form 5' }]}
                />
                <TextField id="student_first_name" label="Student first name" required value={form.student_first_name} onChange={set('student_first_name')} error={errors.student_first_name} autoComplete="given-name" />
                <TextField id="student_other_names" label="Other names (optional)" value={form.student_other_names} onChange={set('student_other_names')} error={errors.student_other_names} />
                <TextField id="student_last_name" label="Student last name" required value={form.student_last_name} onChange={set('student_last_name')} error={errors.student_last_name} autoComplete="family-name" />
                <TextField id="student_date_of_birth" label="Date of birth" type="date" required value={form.student_date_of_birth} onChange={set('student_date_of_birth')} error={errors.student_date_of_birth} />
                <SelectField
                  id="student_gender" label="Gender" required value={form.student_gender} onChange={set('student_gender')}
                  error={errors.student_gender}
                  options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]}
                />
                <TextField id="previous_school" label="Previous school" required value={form.previous_school} onChange={set('previous_school')} error={errors.previous_school} />
                {form.entry_form === 'Form 5' && (
                  <TextField id="subject_combination" label="Subject combination" required value={form.subject_combination} onChange={set('subject_combination')} error={errors.subject_combination} placeholder="Enter combination or To be confirmed" />
                )}
                <SelectField
                  id="residency" label="Residency" required value={form.residency} onChange={set('residency')}
                  error={errors.residency}
                  options={[{ value: 'day', label: 'Day' }, { value: 'boarding', label: 'Boarding' }]}
                />
                <TextField id="birth_certificate_number" label="Birth-certificate number (optional)" value={form.birth_certificate_number} onChange={set('birth_certificate_number')} error={errors.birth_certificate_number} />

                <div className="sm:col-span-2 mt-3">
                  <h2 className="font-display text-xl text-brand-900">Parent / guardian details</h2>
                </div>
                <TextField id="guardian_first_name" label="Guardian first name" required value={form.guardian_first_name} onChange={set('guardian_first_name')} error={errors.guardian_first_name} />
                <TextField id="guardian_last_name" label="Guardian last name" required value={form.guardian_last_name} onChange={set('guardian_last_name')} error={errors.guardian_last_name} />
                <TextField id="guardian_relationship" label="Relationship to student" required value={form.guardian_relationship} onChange={set('guardian_relationship')} error={errors.guardian_relationship} />
                <TextField id="guardian_phone" label="Phone number" type="tel" required value={form.guardian_phone} onChange={set('guardian_phone')} error={errors.guardian_phone} autoComplete="tel" />
                <TextField id="guardian_email" label="Email (optional)" type="email" value={form.guardian_email} onChange={set('guardian_email')} error={errors.guardian_email} autoComplete="email" />
                <TextField id="guardian_alternate_phone" label="Alternate phone (optional)" type="tel" value={form.guardian_alternate_phone} onChange={set('guardian_alternate_phone')} error={errors.guardian_alternate_phone} />
                <div className="sm:col-span-2">
                  <TextAreaField id="guardian_address" label="Residential address" required value={form.guardian_address} onChange={set('guardian_address')} error={errors.guardian_address} />
                </div>

                <div className="sm:col-span-2 mt-3">
                  <h2 className="font-display text-xl text-brand-900">Supporting documents</h2>
                  <p className="mt-1 text-sm text-brand-600">Birth certificate and previous-school report are required. Other documents are optional.</p>
                </div>
                <FileField id="birth_certificate" label="Birth certificate" required file={documents.birth_certificate} error={errors['documents.birth_certificate']} onChange={setFile('birth_certificate')} />
                <FileField id="previous_school_report" label="Previous-school report" required file={documents.previous_school_report} error={errors['documents.previous_school_report']} onChange={setFile('previous_school_report')} />
                <FileField id="guardian_id" label="Guardian ID (optional)" file={documents.guardian_id} error={errors['documents.guardian_id']} onChange={setFile('guardian_id')} />
                <FileField id="transfer_letter" label="Transfer letter (optional)" file={documents.transfer_letter} error={errors['documents.transfer_letter']} onChange={setFile('transfer_letter')} />
                <FileField id="passport_photo" label="Passport photo (optional)" file={documents.passport_photo} error={errors['documents.passport_photo']} onChange={setFile('passport_photo')} />
                <FileField id="other" label="Other supporting document (optional)" file={documents.other} error={errors['documents.other']} onChange={setFile('other')} />

                {formError && (
                  <p role="alert" className="sm:col-span-2 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{formError}</p>
                )}
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Submitting application…' : 'Submit 2027 Application'}
                  </Button>
                </div>
                <p className="sm:col-span-2 text-xs leading-relaxed text-brand-500">
                  Submission sends this application to the Hande High admissions review queue. It does not approve admission or create an enrolment, invoice or payment.
                </p>
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
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
