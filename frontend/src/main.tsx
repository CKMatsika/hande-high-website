import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.tsx'
import { initAnalytics, loadGa4 } from '@/lib/analytics'
import { getStoredConsent } from '@/lib/consent'

initAnalytics()
if (getStoredConsent() === 'accepted') {
  loadGa4()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
