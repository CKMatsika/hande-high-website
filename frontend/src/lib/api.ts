const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000/api'

// CMS admin panel (Filament). Defaults to the API origin + /admin; override with VITE_ADMIN_URL.
const ADMIN_URL =
  (import.meta.env.VITE_ADMIN_URL as string | undefined)?.trim() ||
  `${API_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '')}/admin`

export interface ApiNewsPost {
  id: number
  slug: string
  title: string
  excerpt: string | null
  body?: string | null
  cover_image: string | null
  author: string | null
  date: string | null
  published_at: string | null
}

export interface ApiEvent {
  id: number
  title: string
  date: string | null
  time: string | null
  location: string | null
  description: string | null
  is_upcoming: boolean
}

export interface ApiGalleryPhoto {
  id: number
  title: string | null
  image: string
  album: string
  sort_order: number
}

export interface ApiDocument {
  id: number
  title: string
  description: string | null
  file: string | null
  file_type: string | null
  file_size: number | null
}

export interface ApiLeader {
  id: number
  name: string
  role: string
  bio: string | null
  portrait: string | null
}

export type ApiSettings = Record<string, Record<string, string>>

interface ResourceResponse<T> {
  data: T
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return (await res.json()) as T
}

export const api = {
  news: (signal?: AbortSignal) =>
    get<ResourceResponse<ApiNewsPost[]>>('/news', signal).then((r) => r.data),
  newsPost: (slug: string, signal?: AbortSignal) =>
    get<ResourceResponse<ApiNewsPost>>(`/news/${slug}`, signal).then((r) => r.data),
  events: (signal?: AbortSignal) =>
    get<ResourceResponse<ApiEvent[]>>('/events', signal).then((r) => r.data),
  gallery: (signal?: AbortSignal) =>
    get<ResourceResponse<ApiGalleryPhoto[]>>('/gallery', signal).then((r) => r.data),
  downloads: (signal?: AbortSignal) =>
    get<ResourceResponse<ApiDocument[]>>('/downloads', signal).then((r) => r.data),
  leadership: (signal?: AbortSignal) =>
    get<ResourceResponse<ApiLeader[]>>('/leadership', signal).then((r) => r.data),
  settings: (signal?: AbortSignal) =>
    get<{ data: ApiSettings }>('/settings', signal).then((r) => r.data),
}

export interface EnquiryPayload {
  type: 'contact' | 'admission'
  name: string
  email: string
  phone?: string
  applicant_name?: string
  entry_year?: string
  message: string
  consent?: boolean
  honeypot?: string
}

export interface EnquiryResult {
  ok: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    const res = await fetch(`${API_URL}/enquiries`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const json = (await res.json().catch(() => ({}))) as {
      message?: string
      errors?: Record<string, string[]>
    }

    if (res.ok) {
      return { ok: true, message: json.message ?? 'Thank you. Your enquiry has been received.' }
    }

    if (res.status === 422) {
      return { ok: false, message: 'Please check the highlighted fields.', errors: json.errors }
    }

    if (res.status === 429) {
      return {
        ok: false,
        message: 'Too many submissions. Please wait a moment and try again.',
      }
    }

    return { ok: false, message: 'Something went wrong. Please try again or contact us directly.' }
  } catch {
    return {
      ok: false,
      message:
        'We could not reach the school at the moment. Please try again shortly or contact us directly.',
    }
  }
}

// Exposed for tests and diagnostics
export const apiBaseUrl = API_URL
export const adminUrl = ADMIN_URL
