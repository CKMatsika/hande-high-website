import { Container } from '@/design-system/components/Container'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { primaryNav } from '@/content/navigation'
import { school } from '@/content/school'

const socialInitials: Record<string, string> = {
  Facebook: 'f',
  Instagram: 'ig',
  YouTube: 'yt',
  LinkedIn: 'in',
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-950 text-brand-200">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-block rounded bg-white p-2">
            <Logo />
          </span>
          <p className="mt-4 text-sm leading-relaxed italic">{school.motto}</p>
          <div className="mt-6 flex gap-3">
            {school.social.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold uppercase transition-colors hover:bg-accent-500 hover:text-brand-950"
              >
                {socialInitials[label] ?? label.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-display text-lg text-white">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link to={item.to ?? '#'} className="hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg text-white">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{school.contact.address}</p>
            <p>Postal: {school.contact.postal}</p>
            <p>
              <a href={`tel:${school.contact.phone}`} className="hover:text-accent-400">
                {school.contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${school.contact.email}`} className="hover:text-accent-400">
                {school.contact.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/admissions" className="hover:text-accent-400">
                Admissions
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="hover:text-accent-400">
                Prospectus
              </Link>
            </li>
            <li>
              <Link to="/portal" className="hover:text-accent-400">
                Portal Login
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-accent-400">
                School Calendar
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs md:flex-row">
          <p>
            © {year} {school.name}. All rights reserved.
          </p>
          <p className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent-400">
              Terms of Use
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  )
}
