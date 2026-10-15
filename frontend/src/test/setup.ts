import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// The content hooks reach out to the CMS API. In tests we disable the network so
// every page deterministically falls back to its static placeholder content.
vi.stubGlobal(
  'fetch',
  vi.fn(() => Promise.reject(new Error('network disabled in tests'))),
)

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver ??= MockIntersectionObserver as unknown as typeof IntersectionObserver
