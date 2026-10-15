import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { adminUrl } from '@/lib/api'
import { analyticsEnabled, initAnalytics, trackPageview } from '@/lib/analytics'
import { getStoredConsent, setStoredConsent } from '@/lib/consent'
import { CookieConsent } from '@/components/site/CookieConsent'
import { TopBar } from '@/components/site/TopBar'

vi.mock('@/lib/useScrolled', () => ({ useScrolled: () => false }))

afterEach(() => {
  localStorage.clear()
})

describe('adminUrl', () => {
  it('points at the CMS admin panel', () => {
    expect(adminUrl).toMatch(/\/admin$/)
  })
})

describe('analytics', () => {
  it('is disabled when no GA4 id is configured', () => {
    expect(analyticsEnabled).toBe(false)
  })

  it('does not inject tracking when disabled', () => {
    initAnalytics()
    expect(document.querySelector('script[data-ga4="1"]')).toBeNull()
    expect(() => trackPageview('/about')).not.toThrow()
  })
})

describe('cookie consent', () => {
  it('stores and reads the visitor choice', () => {
    expect(getStoredConsent()).toBeNull()
    setStoredConsent('declined')
    expect(getStoredConsent()).toBe('declined')
    setStoredConsent('accepted')
    expect(getStoredConsent()).toBe('accepted')
  })

  it('renders nothing when analytics is not configured', () => {
    const { container } = render(<CookieConsent />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('TopBar', () => {
  it('renders an Admin link to the CMS', () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    )
    const admin = screen.getByRole('link', { name: /admin/i })
    expect(admin).toHaveAttribute('href', adminUrl)
  })
})
