import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { Container } from '@/design-system/components/Container'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { Logo } from './Logo'
import { primaryNav } from '@/content/navigation'
import { school } from '@/content/school'
import { useScrolled } from '@/lib/useScrolled'

export function Header() {
  const scrolled = useScrolled(8)
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  const closeAll = () => {
    setOpenItem(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenItem(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
      onMouseLeave={() => setOpenItem(null)}
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur' : 'bg-white'
        }`}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenItem(null)
            }}
          >
            {primaryNav.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const isOpen = openItem === item.label
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenItem(hasChildren ? item.label : null)}
                >
                  <div className="flex items-center">
                    <NavLink
                      to={item.to ?? '#'}
                      onClick={() => setOpenItem(null)}
                      className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'text-brand-700'
                            : 'text-brand-800 hover:text-brand-600'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${item.label} menu`}
                        className="rounded p-1 text-brand-400 hover:text-brand-700"
                        onClick={() => setOpenItem(isOpen ? null : item.label)}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && isOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-64 border-t-2 border-accent-500 bg-white py-2 shadow-xl">
                      {item.children?.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={closeAll}
                          className="block px-5 py-2.5 text-sm text-brand-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <ButtonLink
              href={school.portals.parents}
              external
              variant="accent"
              size="sm"
              className="ml-4"
            >
              Portal Login
            </ButtonLink>
          </nav>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded p-2 text-brand-800 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </Container>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-brand-100 bg-white lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Mobile">
              {primaryNav.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const expanded = mobileExpanded === item.label
                return (
                  <div key={item.label} className="border-b border-brand-100">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={item.to ?? '#'}
                        onClick={closeAll}
                        className="flex-1 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-800"
                      >
                        {item.label}
                      </NavLink>
                      {hasChildren && (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`Expand ${item.label}`}
                          className="p-2 text-brand-500"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <div className="pb-2 pl-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeAll}
                            className="block py-2 text-sm text-brand-600 hover:text-brand-800"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
            <ButtonLink
              href={school.portals.parents}
              external
              variant="accent"
              className="mt-6 w-full"
            >
              Portal Login
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  )
}
