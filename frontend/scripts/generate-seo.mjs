#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function envUrl() {
  const raw = process.env.VITE_SITE_URL || process.env.SITE_URL
  if (raw) return raw.trim().replace(/\/+$/, '')
  try {
    const txt = readFileSync(resolve(root, '.env'), 'utf8')
    const m = txt.match(/^\s*VITE_SITE_URL\s*=\s*(.+)$/m)
    if (m) return m[1].trim().replace(/\/+$/, '')
  } catch {
    /* no .env */
  }
  return 'https://www.handehigh.co.zw'
}

const staticRoutes = [
  '/',
  '/about',
  '/about/history',
  '/about/vision-mission-values',
  '/about/leadership',
  '/academics',
  '/academics/curriculum',
  '/admissions',
  '/admissions/apply',
  '/student-life',
  '/student-life/boarding',
  '/student-life/sports-culture',
  '/student-life/welfare',
  '/news',
  '/events',
  '/gallery',
  '/downloads',
  '/contact',
  '/portal',
  '/privacy',
  '/terms',
]

async function fetchJson(url, timeout = 1500) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function generate() {
  const SITE_URL = envUrl()
  const api = process.env.VITE_API_URL || 'http://localhost:8000/api'
  const now = new Date().toISOString()
  const urls = [...staticRoutes]

  try {
    const news = await fetchJson(`${api}/news`)
    if (news?.data) {
      for (const n of news.data) {
        if (n.slug) urls.push(`/news/${n.slug}`)
      }
    }
  } catch {
    /* API unreachable — static routes only */
  }

  const entries = urls.map((p) => {
    const priority = p === '/' ? '1.0' : '0.8'
    return `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

  await mkdir(resolve(root, 'public'), { recursive: true })
  await writeFile(resolve(root, 'public/sitemap.xml'), xml)
  await writeFile(
    resolve(root, 'public/robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /portal\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  )
  console.log(`OK ${entries.length} URLs`)
}

generate().catch((e) => {
  console.error(e)
  process.exit(0)
})
