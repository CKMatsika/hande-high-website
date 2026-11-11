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
  image: string | null
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

export interface ApiSitePageSection {
  admin_label?: string
  layout: 'text' | 'image-left' | 'image-right' | 'image' | 'video' | 'callout'
  heading?: string | null
  body?: string | null
  image?: string | null
  video_url?: string | null
  button_label?: string | null
  button_url?: string | null
  background_color?: string | null
  text_color?: string | null
}

export interface ApiSitePage {
  slug: string
  name: string
  meta_title: string | null
  meta_description: string | null
  hero_eyebrow: string | null
  hero_title: string | null
  hero_lead: string | null
  hero_image: string | null
  sections: ApiSitePageSection[]
  use_custom_layout: boolean
}

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
  sitePage: (slug: string, signal?: AbortSignal) =>
    get<ResourceResponse<ApiSitePage>>(`/pages/${encodeURIComponent(slug)}`, signal).then((r) => r.data),
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

export interface AdmissionApplicationPayload {
  idempotency_key: string
  entry_form: 'Form 1' | 'Form 5'
  student_first_name: string
  student_other_names: string
  student_last_name: string
  student_date_of_birth: string
  student_gender: 'male' | 'female' | 'other'
  previous_school: string
  subject_combination: string
  residency: 'day' | 'boarding'
  guardian_first_name: string
  guardian_last_name: string
  guardian_relationship: string
  guardian_phone: string
  guardian_email: string
  guardian_alternate_phone: string
  guardian_address: string
  birth_certificate_number: string
  documents: {
    birth_certificate: File
    previous_school_report: File
    guardian_id?: File
    transfer_letter?: File
    passport_photo?: File
    other?: File
  }
}

export interface AdmissionApplicationResult {
  ok: boolean
  message: string
  applicationNumber?: string
  errors?: Record<string, string[]>
}

export async function submitAdmissionApplication(
  payload: AdmissionApplicationPayload,
): Promise<AdmissionApplicationResult> {
  const body = new FormData()
  const { documents, ...fields } = payload
  Object.entries(fields).forEach(([key, value]) => body.append(key, value))
  Object.entries(documents).forEach(([key, file]) => {
    if (file) body.append(`documents[${key}]`, file)
  })

  try {
    const res = await fetch(`${API_URL}/admissions/applications`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })
    const json = (await res.json().catch(() => ({}))) as {
      message?: string
      application_number?: string
      errors?: Record<string, string[]>
    }

    if (res.status === 201) {
      return {
        ok: true,
        message: json.message ?? 'Your application has been submitted for review.',
        applicationNumber: json.application_number,
      }
    }
    if (res.status === 422) {
      return {
        ok: false,
        message: json.message ?? 'Please check the application details and uploaded files.',
        errors: json.errors,
      }
    }
    if (res.status === 401 || res.status === 403) {
      return {
        ok: false,
        message: json.message ?? 'The admissions service could not authorize this submission. Please contact the school.',
      }
    }
    if (res.status === 429) {
      return {
        ok: false,
        message: json.message ?? 'Too many applications are being submitted. Please wait a moment and retry.',
      }
    }
    return {
      ok: false,
      message: json.message ?? 'The admissions service is temporarily unavailable. Your application was not confirmed; please retry shortly using this same form.',
    }
  } catch {
    return {
      ok: false,
      message: 'We could not reach the admissions service. Your application was not confirmed; please retry shortly using this same form.',
    }
  }
}

// Exposed for tests and diagnostics
export const apiBaseUrl = API_URL
export const adminUrl = ADMIN_URL
