import { school } from '@/content/school'

/**
 * Builds a WhatsApp click-to-chat link (https://wa.me) with an optional
 * pre-filled message. The number must be in international format, digits only.
 */
export function whatsappLink(
  number: string = school.whatsapp.number,
  message: string = school.whatsapp.message,
): string {
  const digits = number.replace(/\D/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

export const whatsappAvailable = Boolean(
  school.whatsapp.enabled && school.whatsapp.number.replace(/\D/g, ''),
)
