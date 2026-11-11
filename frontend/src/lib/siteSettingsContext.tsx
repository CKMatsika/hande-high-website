import { createContext, useContext } from 'react'
import type { ApiSettings } from '@/lib/api'

export const SiteSettingsContext = createContext<ApiSettings>({})

export function useCurrentSettings(): ApiSettings {
  return useContext(SiteSettingsContext)
}
