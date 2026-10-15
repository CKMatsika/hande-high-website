import { useEffect, useMemo } from 'react'
import { absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME } from './seo'

interface PageMeta {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  path?: string
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({
  title,
  description,
  image,
  type = 'website',
  path,
  noindex,
}: PageMeta): void {
  useEffect(() => {
    const canonicalPath = path ?? window.location.pathname
    const url = absoluteUrl(canonicalPath)
    const desc = description && description.trim().length > 0 ? description : DEFAULT_DESCRIPTION
    const img = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE

    document.title = title
    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)
  }, [title, description, image, type, path, noindex])
}

export function useJsonLd(id: string, data: unknown): void {
  const json = useMemo(() => (data == null ? '' : JSON.stringify(data)), [data])
  useEffect(() => {
    const existing = document.head.querySelector(`#jsonld-${id}`)
    if (existing) {
      existing.remove()
    }
    if (!json) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = `jsonld-${id}`
    script.text = json
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [id, json])
}
