import { useEffect, useMemo, useRef, useState } from 'react'
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
import { api, apiBaseUrl, type ApiSitePage } from '@/lib/api'
import { useSettings } from '@/lib/useContent'
import { SitePageContext } from '@/lib/sitePageContext'
import { SiteSettingsContext } from '@/lib/siteSettingsContext'
import { CustomPageCanvas, PageContentSections } from '@/components/site/PageContentSections'

function hexMix(hex: string, amount: number): string {
  const value = hex.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(value)) return '#1e3a5f'
  const channel = (offset: number) => {
    const number = parseInt(value.slice(offset, offset + 2), 16)
    const mixed = Math.round(number + ((amount > 0 ? 255 : 0) - number) * Math.abs(amount))
    return mixed.toString(16).padStart(2, '0')
  }
  return `#${channel(0)}${channel(2)}${channel(4)}`
}

function themeStyle(settings: ReturnType<typeof useSettings>): React.CSSProperties {
  const primary = settings.appearance?.brand_primary_color || '#1e3a5f'
  const accent = settings.appearance?.brand_accent_color || '#eabf4a'
  return {
    '--color-brand-50': hexMix(primary, 0.96), '--color-brand-100': hexMix(primary, 0.90),
    '--color-brand-200': hexMix(primary, 0.78), '--color-brand-300': hexMix(primary, 0.60),
    '--color-brand-400': hexMix(primary, 0.40), '--color-brand-500': primary,
    '--color-brand-600': hexMix(primary, -0.14), '--color-brand-700': hexMix(primary, -0.28),
    '--color-brand-800': hexMix(primary, -0.44), '--color-brand-900': hexMix(primary, -0.60),
    '--color-brand-950': hexMix(primary, -0.74), '--color-accent-400': hexMix(accent, 0.12),
    '--color-accent-500': accent, '--color-accent-600': hexMix(accent, -0.12),
  } as React.CSSProperties
}

function pageSlug(pathname: string): string {
  if (pathname === '/') return 'home'
  if (/^\/news\/[^/]+/.test(pathname)) return 'news-article'
  return pathname.replace(/^\/+|\/+$/g, '').replaceAll('/', '-')
}

export function Layout() {
  const { pathname, search } = useLocation()
  const isFirst = useRef(true)
  const [page, setPage] = useState<ApiSitePage | null>(null)
  const [draftPage, setDraftPage] = useState<ApiSitePage | null>(null)
  const settings = useSettings()
  const slug = useMemo(() => pageSlug(pathname), [pathname])
  const isDraftPreview = useMemo(() => new URLSearchParams(search).get('cmsPreview') === '1', [search])
  const displayedPage = draftPage ?? page

  useEffect(() => {
    const controller = new AbortController()
    setPage(null)
    api.sitePage(slug, controller.signal).then(setPage).catch(() => setPage(null))
    return () => controller.abort()
  }, [slug])

  useEffect(() => {
    if (!isDraftPreview || window.parent === window) return

    let adminOrigin: string
    try {
      adminOrigin = new URL(apiBaseUrl, window.location.href).origin
    } catch {
      return
    }

    const receiveDraft = (event: MessageEvent) => {
      if (
        event.source !== window.parent ||
        event.origin !== adminOrigin ||
        event.data?.type !== 'hande-cms-page-preview'
      ) return
      const nextPage = event.data.page as ApiSitePage | undefined
      if (!nextPage || !Array.isArray(nextPage.sections)) return
      setDraftPage(nextPage)
    }

    window.addEventListener('message', receiveDraft)
    window.parent.postMessage({ type: 'hande-cms-page-preview-ready' }, adminOrigin)

    return () => window.removeEventListener('message', receiveDraft)
  }, [isDraftPreview])

  useEffect(() => {
    if (page?.meta_title) document.title = page.meta_title
    if (page?.meta_description) {
      let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!description) {
        description = document.createElement('meta')
        description.name = 'description'
        document.head.append(description)
      }
      description.content = page.meta_description
    }
  }, [displayedPage])

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
    <SiteSettingsContext.Provider value={settings}>
      <div className="flex min-h-dvh flex-col" style={themeStyle(settings)}>
        {isDraftPreview && (
          <div className="bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-brand-950">
            Private draft preview — changes are not published until you save in the admin panel.
          </div>
        )}
        <SkipLink />
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
          <SitePageContext.Provider value={displayedPage}>
            {displayedPage?.use_custom_layout && !['admissions-apply', 'contact', 'portal'].includes(slug) ? (
              <CustomPageCanvas page={displayedPage} />
            ) : (
              <>
                <Outlet />
                {displayedPage && <PageContentSections page={displayedPage} />}
              </>
            )}
          </SitePageContext.Provider>
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </div>
    </SiteSettingsContext.Provider>
  )
}
