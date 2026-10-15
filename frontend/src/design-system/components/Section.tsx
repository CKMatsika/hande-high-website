import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  as?: 'section' | 'div' | 'article'
  tone?: 'default' | 'muted' | 'dark'
}

const tones = {
  default: 'bg-white text-brand-900',
  muted: 'bg-brand-50 text-brand-900',
  dark: 'bg-brand-950 text-white',
}

export function Section({
  children,
  className = '',
  as: Tag = 'section',
  tone = 'default',
}: SectionProps) {
  return (
    <Tag className={`py-[var(--spacing-section)] ${tones[tone]} ${className}`}>{children}</Tag>
  )
}
