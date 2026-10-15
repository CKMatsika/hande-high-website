import { loadGa4 } from '@/lib/analytics'

const STORAGE_KEY = 'hhs-cookie-consent'

export type ConsentChoice = 'accepted' | 'declined'

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

export function setStoredConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    /* storage unavailable — session-only decision */
  }
  if (choice === 'accepted') {
    loadGa4()
  }
}
