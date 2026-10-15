import { useCallback, useEffect, useState } from 'react'
import {
  api,
  type ApiDocument,
  type ApiEvent,
  type ApiGalleryPhoto,
  type ApiLeader,
  type ApiNewsPost,
  type ApiSettings,
} from '@/lib/api'
import { latestNews, upcomingEvents, type NewsItem, type SchoolEvent } from '@/content/news'

/**
 * Generic remote resource loader.
 *
 * Starts from a static fallback so the site always renders (even if the CMS is
 * unreachable) and upgrades to live content when the API responds with data.
 * Falls back to the static content when the API is empty or errors.
 */
function useApiResource<T>(load: (signal: AbortSignal) => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    load(controller.signal)
      .then((result) => {
        if (active) setData(result)
      })
      .catch(() => {
        /* keep the static fallback */
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [load])

  return { data, loading }
}

const placeholderNewsImage = '/img/photos/landscape-02.jpg'

function mapNews(post: ApiNewsPost): NewsItem {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    date: post.date ?? post.published_at ?? '',
    image: post.cover_image ?? placeholderNewsImage,
    body: post.body ?? undefined,
  }
}

function mapEvent(event: ApiEvent): SchoolEvent {
  return {
    id: String(event.id),
    title: event.title,
    date: event.date ?? '',
    location: event.location ?? '',
    description: event.description ?? '',
  }
}

export function useNews(limit?: number): { news: NewsItem[]; loading: boolean } {
  const load = useCallback(
    async (signal: AbortSignal) => {
      const posts = await api.news(signal)
      const mapped = posts.map(mapNews)
      if (mapped.length === 0) return latestNews
      return limit ? mapped.slice(0, limit) : mapped
    },
    [limit],
  )

  const { data, loading } = useApiResource(load, latestNews)
  return { news: data, loading }
}

export function useNewsArticle(slug: string | undefined): {
  article: NewsItem | null
  loading: boolean
} {
  const load = useCallback(
    async (signal: AbortSignal) => {
      if (!slug) return null
      try {
        const post = await api.newsPost(slug, signal)
        return mapNews(post)
      } catch {
        // CMS unreachable or unknown slug — fall back to bundled placeholder news.
        return latestNews.find((item) => item.slug === slug) ?? null
      }
    },
    [slug],
  )

  const { data, loading } = useApiResource<NewsItem | null>(load, null)
  return { article: data, loading }
}

export function useEvents(limit?: number): { events: SchoolEvent[]; loading: boolean } {
  const load = useCallback(
    async (signal: AbortSignal) => {
      const events = await api.events(signal)
      const mapped = events.map(mapEvent)
      if (mapped.length === 0) return upcomingEvents
      return limit ? mapped.slice(0, limit) : mapped
    },
    [limit],
  )

  const { data, loading } = useApiResource(load, upcomingEvents)
  return { events: data, loading }
}

export interface GalleryItem {
  src: string
  alt: string
  album: string
}

const fallbackGallery: GalleryItem[] = [
  { src: '/img/photos/landscape-01.jpg', alt: 'Photograph of Hande High School', album: 'Campus' },
  { src: '/img/photos/landscape-02.jpg', alt: 'Photograph of Hande High School', album: 'Campus' },
  { src: '/img/photos/landscape-03.jpg', alt: 'Photograph of Hande High School', album: 'Campus' },
  { src: '/img/photos/landscape-04.jpg', alt: 'Photograph of the school campus', album: 'Campus' },
  { src: '/img/photos/landscape-05.jpg', alt: 'Photograph of school life', album: 'School Life' },
  { src: '/img/photos/landscape-06.jpg', alt: 'Photograph of school facilities', album: 'Campus' },
  { src: '/img/photos/portrait-01.jpg', alt: 'Photograph of Hande High School', album: 'School Life' },
  { src: '/img/photos/portrait-02.jpg', alt: 'Photograph of Hande High School', album: 'School Life' },
  { src: '/img/photos/portrait-03.jpg', alt: 'Photograph of Hande High School', album: 'School Life' },
  { src: '/img/photos/portrait-04.jpg', alt: 'Photograph of Hande High School', album: 'School Life' },
]

function mapGallery(photo: ApiGalleryPhoto): GalleryItem {
  return {
    src: photo.image,
    alt: photo.title ?? 'Photograph of Hande High School',
    album: photo.album,
  }
}

export function useGallery(): { photos: GalleryItem[]; loading: boolean } {
  const load = useCallback(async (signal: AbortSignal) => {
    const photos = await api.gallery(signal)
    const mapped = photos.map(mapGallery)
    return mapped.length === 0 ? fallbackGallery : mapped
  }, [])

  const { data, loading } = useApiResource(load, fallbackGallery)
  return { photos: data, loading }
}

export interface DownloadItem {
  title: string
  detail: string
  meta: string
  href: string
}

const fallbackDownloads: DownloadItem[] = [
  {
    title: 'School Prospectus',
    detail: 'The full guide to school life, programmes and admissions.',
    meta: 'PDF — [SIZE TO BE CONFIRMED]',
    href: '#',
  },
  {
    title: 'Term Dates',
    detail: 'Academic calendar and term dates for the current year.',
    meta: 'PDF — [TO BE CONFIRMED]',
    href: '#',
  },
  {
    title: 'Fee Structure',
    detail: 'Fees, levies and payment terms.',
    meta: 'PDF — [TO BE CONFIRMED]',
    href: '#',
  },
  {
    title: 'School Policies',
    detail: 'Safeguarding, anti-bullying and general school policies.',
    meta: 'PDF — [TO BE CONFIRMED]',
    href: '#',
  },
]

function humanSize(bytes: number | null): string {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value.toFixed(value < 10 && unit > 0 ? 1 : 0)} ${units[unit]}`
}

function mapDocument(doc: ApiDocument): DownloadItem {
  const type = (doc.file_type ?? 'file').toUpperCase()
  const size = humanSize(doc.file_size)
  return {
    title: doc.title,
    detail: doc.description ?? '',
    meta: size ? `${type} — ${size}` : type,
    href: doc.file ?? '#',
  }
}

export function useDownloads(): { documents: DownloadItem[]; loading: boolean } {
  const load = useCallback(async (signal: AbortSignal) => {
    const documents = await api.downloads(signal)
    const mapped = documents.map(mapDocument)
    return mapped.length === 0 ? fallbackDownloads : mapped
  }, [])

  const { data, loading } = useApiResource(load, fallbackDownloads)
  return { documents: data, loading }
}

export interface LeaderItem {
  name: string
  role: string
  portrait: string
  bio?: string
}

const fallbackLeaders: LeaderItem[] = [
  { role: 'Headmaster', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-02.jpg' },
  { role: 'Deputy Headmaster', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-03.jpg' },
  { role: 'Head of Academics', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-04.jpg' },
  { role: 'Head of Boarding', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-01.jpg' },
  { role: 'Head of Student Welfare', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-02.jpg' },
  { role: 'School Bursar', name: '[NAME — TO BE CONFIRMED]', portrait: '/img/photos/portrait-03.jpg' },
]

function mapLeader(leader: ApiLeader): LeaderItem {
  return {
    name: leader.name,
    role: leader.role,
    portrait: leader.portrait ?? '/img/photos/portrait-01.jpg',
    bio: leader.bio ?? undefined,
  }
}

export function useLeadership(): { leaders: LeaderItem[]; loading: boolean } {
  const load = useCallback(async (signal: AbortSignal) => {
    const leaders = await api.leadership(signal)
    const mapped = leaders.map(mapLeader)
    return mapped.length === 0 ? fallbackLeaders : mapped
  }, [])

  const { data, loading } = useApiResource(load, fallbackLeaders)
  return { leaders: data, loading }
}

export function useSettings(): ApiSettings {
  const load = useCallback(async (signal: AbortSignal) => {
    return api.settings(signal)
  }, [])

  return useApiResource<ApiSettings>(load, {}).data
}
