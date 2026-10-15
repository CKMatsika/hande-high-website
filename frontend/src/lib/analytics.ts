/**
 * Runtime analytics injection (GA4 + Google Search Console).
 *
 * - The Search Console verification meta tag is always injected (no cookies).
 * - Google Analytics 4 is only loaded once the visitor grants consent
 *   (see lib/consent.ts), so no tracking happens before the user opts in.
 */

const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim()
const GSC_VERIFICATION = (import.meta.env.VITE_GSC_VERIFICATION as string | undefined)?.trim()

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const analyticsEnabled = Boolean(GA4_ID)

let ga4Loaded = false

export function initAnalytics(): void {
  if (typeof document === 'undefined') return

  if (GSC_VERIFICATION && !document.querySelector('meta[name="google-site-verification"]')) {
    const meta = document.createElement('meta')
    meta.name = 'google-site-verification'
    meta.content = GSC_VERIFICATION
    document.head.appendChild(meta)
  }
}

export function loadGa4(): void {
  if (!GA4_ID || ga4Loaded || typeof document === 'undefined') return
  ga4Loaded = true

  const loader = document.createElement('script')
  loader.async = true
  loader.dataset.ga4 = '1'
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(loader)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { send_page_view: true })
}

/** Fires a page_view for SPA route changes. */
export function trackPageview(path: string): void {
  if (!ga4Loaded || typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', { page_path: path })
}
