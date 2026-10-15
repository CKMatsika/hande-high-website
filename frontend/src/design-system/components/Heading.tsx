import type { ReactNode } from 'react'

type Level = 'display' | 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  level?: Level
  children: ReactNode
  className?: string
  eyebrow?: string
}

const tagByLevel: Record<Level, 'h1' | 'h2' | 'h3' | 'h4'> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
}

const styles: Record<Level, string> = {
  display: 'font-display text-5xl md:text-7xl leading-[1.05] font-medium',
  h1: 'font-display text-4xl md:text-5xl leading-tight font-medium',
  h2: 'font-display text-3xl md:text-4xl leading-tight font-medium',
  h3: 'font-display text-2xl md:text-3xl leading-snug',
  h4: 'font-sans text-lg font-semibold tracking-wide',
}

export function Heading({ level = 'h2', children, className = '', eyebrow }: HeadingProps) {
  const Tag = tagByLevel[level]
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
          {eyebrow}
        </p>
      )}
      <Tag className={`${styles[level]} text-balance`}>{children}</Tag>
    </div>
  )
}
