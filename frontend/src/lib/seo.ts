import { primaryNav } from '@/content/navigation'
import { school } from '@/content/school'

const rawUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
export const SITE_URL = (rawUrl && rawUrl.length > 0 ? rawUrl : 'https://www.handehigh.co.zw').replace(/\/+$/, '')
export const SITE_NAME = school.name
export const DEFAULT_DESCRIPTION = `${school.name} is a secondary school in ${school.location}. ${school.motto}.`
export const DEFAULT_OG_IMAGE = `${SITE_URL}/img/photos/landscape-02.jpg`
export const LOGO_URL = `${SITE_URL}/img/logo.png`

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function labelForPath(): Record<string, string> {
  const map: Record<string, string> = { '/': 'Home' }
  for (const item of primaryNav) {
    if (item.to) {
      map[item.to] = item.label
    }
    for (const child of item.children ?? []) {
      map[child.to] = child.label
    }
  }
  map['/news'] = 'Latest News'
  map['/events'] = 'Events & Calendar'
  map['/about/history'] = 'History'
  map['/about/vision-mission-values'] = 'Vision, Mission & Values'
  map['/about/leadership'] = 'School Leadership'
  map['/academics/curriculum'] = 'Curriculum & Departments'
  map['/admissions/apply'] = 'Apply / Enquire'
  map['/student-life/boarding'] = 'Boarding Life'
  map['/student-life/sports-culture'] = 'Sports & Culture'
  map['/student-life/welfare'] = 'Student Welfare'
  map['/downloads'] = 'Downloads & Prospectus'
  return map
}

export function breadcrumbs(pathname: string): Array<{ name: string; path: string }> {
  const map = labelForPath()
  const crumb = [{ name: 'Home', path: '/' }]
  if (!pathname || pathname === '/') {
    return crumb
  }
  const normalized = pathname.replace(/\/+$/, '')
  const segments = normalized.split('/').filter(Boolean)
  let acc = ''
  for (const seg of segments) {
    acc += `/${seg}`
    let name = map[acc]
    if (!name) {
      name = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    }
    crumb.push({ name, path: acc })
  }
  return crumb
}

export function organizationSchema() {
  const sameAs: string[] = []
  for (const s of school.social) {
    if (s.href && s.href !== '#') {
      sameAs.push(s.href)
    }
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: school.name,
    url: SITE_URL,
    logo: LOGO_URL,
    slogan: school.motto,
    email: school.contact.email,
    telephone: school.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nyashanu, Buhera',
      addressRegion: 'Manicaland Province',
      addressCountry: 'Zimbabwe',
      streetAddress: school.contact.address,
    },
  }
  if (sameAs.length > 0) {
    schema.sameAs = sameAs
  }
  if (school.founded && school.founded !== '[YEAR — TO BE CONFIRMED]') {
    schema.foundingDate = school.founded
  }
  return schema
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: school.name,
    url: SITE_URL,
  }
}

export function breadcrumbSchema(pathname: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs(pathname).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}
