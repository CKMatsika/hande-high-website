import { createContext, useContext } from 'react'
import type { ApiSitePage } from '@/lib/api'

export const SitePageContext = createContext<ApiSitePage | null>(null)

export function useCurrentSitePage(): ApiSitePage | null {
  return useContext(SitePageContext)
}
