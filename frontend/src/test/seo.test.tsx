import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { usePageMeta, useJsonLd } from '@/lib/usePageMeta'
import { absoluteUrl, breadcrumbSchema, breadcrumbs, organizationSchema, SITE_URL } from '@/lib/seo'
import NotFoundPage from '@/pages/NotFoundPage'

function MetaProbe() {
  usePageMeta({
    title: 'Test Page — Hande High School',
    description: 'A test description',
    path: '/about',
    type: 'article',
    image: '/img/photos/landscape-01.jpg',
  })
  return null
}

function JsonLdProbe() {
  useJsonLd('probe', { '@context': 'https://schema.org', '@type': 'School', name: 'Hande' })
  return null
}

describe('absoluteUrl', () => {
  it('joins relative paths to the site origin', () => {
    expect(absoluteUrl('/about')).toBe(`${SITE_URL}/about`)
    expect(absoluteUrl()).toBe(`${SITE_URL}/`)
  })

  it('returns absolute URLs unchanged', () => {
    expect(absoluteUrl('https://example.com/x')).toBe('https://example.com/x')
  })
})

describe('usePageMeta', () => {
  it('sets title, description, canonical, OG and Twitter tags', () => {
    render(<MetaProbe />)
    expect(document.title).toBe('Test Page — Hande High School')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'A test description',
    )
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE_URL}/about`,
    )
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      'Test Page — Hande High School',
    )
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(
      'article',
    )
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      `${SITE_URL}/img/photos/landscape-01.jpg`,
    )
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    )
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    )
  })
})

describe('useJsonLd', () => {
  it('injects a structured data script and removes it on unmount', () => {
    const { unmount } = render(<JsonLdProbe />)
    const script = document.head.querySelector('#jsonld-probe')
    expect(script).not.toBeNull()
    expect(script?.getAttribute('type')).toBe('application/ld+json')
    expect(JSON.parse(script?.textContent ?? '{}').name).toBe('Hande')
    unmount()
    expect(document.head.querySelector('#jsonld-probe')).toBeNull()
  })
})

describe('breadcrumbs', () => {
  it('builds a trail from the home page down', () => {
    const trail = breadcrumbs('/academics/curriculum')
    expect(trail[0]).toEqual({ name: 'Home', path: '/' })
    expect(trail.at(-1)).toEqual({ name: 'Curriculum & Departments', path: '/academics/curriculum' })
  })

  it('title-cases unknown dynamic segments', () => {
    expect(breadcrumbs('/news/my-post').at(-1)?.name).toBe('My Post')
  })
})

describe('schemas', () => {
  it('organizes the school schema', () => {
    const schema = organizationSchema()
    expect(schema['@type']).toBe('School')
    expect(schema.name).toBe('Hande High School')
    expect(schema.slogan).toBe('Strive to Achieve')
  })

  it('builds a breadcrumb list schema', () => {
    const schema = breadcrumbSchema('/about')
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement.length).toBeGreaterThanOrEqual(2)
  })
})

describe('NotFoundPage', () => {
  it('marks itself noindex', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, nofollow',
    )
    expect(document.title).toContain('Page not found')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})
