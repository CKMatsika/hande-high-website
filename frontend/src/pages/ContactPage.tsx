import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { TextField, TextAreaField } from '@/components/ui/FormFields'
import { Button } from '@/design-system/components/Button'
import { usePageMeta } from '@/lib/usePageMeta'
import { submitEnquiry } from '@/lib/api'
import { whatsappAvailable, whatsappLink } from '@/lib/contact'
import { school } from '@/content/school'

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  usePageMeta({
    title: `Contact Us — ${school.name}`,
    description: `Contact ${school.name}, Nyashanu, Buhera, Manicaland Province.`,
  })

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    const result = await submitEnquiry({
      type: 'contact',
      name: form.name,
      email: form.email,
      message: form.message,
      honeypot: '',
    })
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
      return
    }

    if (result.errors) {
      setErrors({
        name: result.errors.name?.[0],
        email: result.errors.email?.[0],
        message: result.errors.message?.[0],
      })
    }
    setFormError(result.message)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        image="/img/photos/landscape-02.jpg"
      />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <Heading level="h2">Contact details</Heading>
            <address className="mt-8 space-y-6 not-italic">
              <p className="flex items-start gap-4">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-brand-700">
                  {school.contact.address}
                  <br />
                  <span className="text-brand-500">Postal: {school.contact.postal}</span>
                </span>
              </p>
              <p className="flex items-center gap-4">
                <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600" />
                <a href={`tel:${school.contact.phone}`} className="text-brand-700 hover:text-accent-600">
                  {school.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-4">
                <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600" />
                <a href={`mailto:${school.contact.email}`} className="text-brand-700 hover:text-accent-600">
                  {school.contact.email}
                </a>
              </p>
            </address>
            {whatsappAvailable && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            )}
            <div className="mt-10 bg-brand-50 p-6">
              <h3 className="font-display text-lg text-brand-900">Finding us</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-600">
                [DIRECTIONS AND A MAP — TO BE CONFIRMED. Nyashanu, Buhera, Manicaland Province.]
              </p>
            </div>
          </div>
          <div>
            <Heading level="h2">Send a message</Heading>
            {submitted ? (
              <div
                role="status"
                className="mt-8 flex items-start gap-4 border border-green-300 bg-green-50 p-8"
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-green-700" />
                <div>
                  <h3 className="font-display text-xl text-green-900">Message sent</h3>
                  <p className="mt-2 text-green-800">
                    Thank you, {form.name}. We will respond at {form.email} as soon as we can.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <TextField
                  id="contact-name"
                  label="Your name"
                  required
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <TextField
                  id="contact-email"
                  label="Email address"
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <TextAreaField
                  id="contact-message"
                  label="Message"
                  required
                  value={form.message}
                  onChange={set('message')}
                  error={errors.message}
                />
                {formError && (
                  <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {formError}
                  </p>
                )}
                <div>
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
