import { useState } from 'react'
import { analyticsEnabled } from '@/lib/analytics'
import { getStoredConsent, setStoredConsent, type ConsentChoice } from '@/lib/consent'

const COOKIE_TEXT = `We use cookies (including Google Analytics) to help improve our site. They are only activated if you accept. By continuing to use the site, you can accept or decline. See our privacy policy for details.`

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => getStoredConsent())

  if (!analyticsEnabled || choice !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-md border border-brand-200 bg-white shadow-lg"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-brand-700">{COOKIE_TEXT}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              setStoredConsent('declined')
              setChoice('declined')
            }}
            className="border border-brand-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-800 hover:bg-brand-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              setStoredConsent('accepted')
              setChoice('accepted')
            }}
            className="bg-brand-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
