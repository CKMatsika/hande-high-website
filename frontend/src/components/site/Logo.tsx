import { useState } from 'react'
import { school } from '@/content/school'

interface LogoProps {
  className?: string
}

/**
 * School logo. Uses the official asset at /img/logo.png;
 * falls back to a placeholder crest if the file is missing.
 */
export function Logo({ className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/img/logo.png"
        alt={`${school.name} logo`}
        className={`h-14 w-auto object-contain ${className}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10 shrink-0" fill="none">
        <path
          d="M24 3 L42 10 V24 C42 35 34 42 24 45 C14 42 6 35 6 24 V10 Z"
          className="fill-brand-700"
        />
        <path
          d="M24 12 C20 16 15 17 13 17 V25 C13 31 18 35 24 37 C30 35 35 31 35 25 V17 C33 17 28 16 24 12 Z"
          className="fill-accent-400"
        />
      </svg>
      <span className="font-display text-xl font-semibold tracking-wide text-brand-900">
        {school.shortName}
      </span>
    </span>
  )
}
