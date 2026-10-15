import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from '@/components/site/TopBar'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SkipLink } from '@/design-system/components/SkipLink'
import { WhatsAppButton } from '@/components/site/WhatsAppButton'
import { CookieConsent } from '@/components/site/CookieConsent'
import { useJsonLd } from '@/lib/usePageMeta'
import { breadcrumbSchema, organizationSchema, websiteSchema } from '@/lib/seo'
import { trackPageview } from '@/lib/analytics'

export function Layout() {
  const { pathname } = useLocation()
  const isFirst = useRef(true)

  useJsonLd('organization', organizationSchema())
  useJsonLd('website', websiteSchema())
  useJsonLd('breadcrumbs', breadcrumbSchema(pathname))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    trackPageview(pathname)
    const main = document.getElementById('main-content')
    if (main) {
      main.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <TopBar />
      <Header />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  )
}
