import { Lock, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/design-system/components/Container'
import { quickLinks } from '@/content/navigation'
import { school } from '@/content/school'
import { adminUrl } from '@/lib/api'

export function TopBar() {
  return (
    <div className="bg-brand-950 text-brand-100">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            href={`mailto:${school.contact.email}`}
            className="inline-flex items-center gap-1.5 hover:text-accent-400"
          >
            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
            {school.contact.email}
          </a>
          <a
            href={`tel:${school.contact.phone}`}
            className="inline-flex items-center gap-1.5 hover:text-accent-400"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            {school.contact.phone}
          </a>
        </div>
        <nav aria-label="Quick links" className="flex items-center gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold uppercase tracking-wider hover:text-accent-400"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={adminUrl}
            className="inline-flex items-center gap-1.5 border-l border-white/15 pl-4 font-semibold uppercase tracking-wider hover:text-accent-400"
          >
            <Lock aria-hidden="true" className="h-3.5 w-3.5" />
            Admin
          </a>
        </nav>
      </Container>
    </div>
  )
}
