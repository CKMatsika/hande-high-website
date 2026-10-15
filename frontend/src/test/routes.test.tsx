import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import AboutPage from '@/pages/AboutPage'
import AcademicsPage from '@/pages/AcademicsPage'
import AdmissionsPage from '@/pages/AdmissionsPage'
import ApplyPage from '@/pages/ApplyPage'
import BoardingPage from '@/pages/BoardingPage'
import ContactPage from '@/pages/ContactPage'
import CurriculumPage from '@/pages/CurriculumPage'
import DownloadsPage from '@/pages/DownloadsPage'
import EventsPage from '@/pages/EventsPage'
import GalleryPage from '@/pages/GalleryPage'
import HistoryPage from '@/pages/HistoryPage'
import LeadershipPage from '@/pages/LeadershipPage'
import NewsArticlePage from '@/pages/NewsArticlePage'
import NewsPage from '@/pages/NewsPage'
import NotFoundPage from '@/pages/NotFoundPage'
import PortalPage from '@/pages/PortalPage'
import SportsCulturePage from '@/pages/SportsCulturePage'
import StudentLifePage from '@/pages/StudentLifePage'
import TermsPage from '@/pages/TermsPage'
import VisionMissionPage from '@/pages/VisionMissionPage'
import PrivacyPage from '@/pages/PrivacyPage'
import WelfarePage from '@/pages/WelfarePage'

function renderPage(ui: React.ReactElement, route = '/') {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

const cases: [string, React.ReactElement, string][] = [
  ['AboutPage', <AboutPage />, 'A school community rooted'],
  ['HistoryPage', <HistoryPage />, 'Our History'],
  ['VisionMissionPage', <VisionMissionPage />, 'Vision, Mission & Values'],
  ['LeadershipPage', <LeadershipPage />, 'School Leadership'],
  ['AcademicsPage', <AcademicsPage />, 'Serious learning'],
  ['CurriculumPage', <CurriculumPage />, 'Curriculum & Departments'],
  ['AdmissionsPage', <AdmissionsPage />, 'Joining Hande High School'],
  ['ApplyPage', <ApplyPage />, 'Apply / Enquire'],
  ['StudentLifePage', <StudentLifePage />, 'Life beyond the classroom'],
  ['BoardingPage', <BoardingPage />, 'Boarding Life'],
  ['SportsCulturePage', <SportsCulturePage />, 'Sports & Culture'],
  ['WelfarePage', <WelfarePage />, 'Student Welfare'],
  ['NewsPage', <NewsPage />, 'Latest News'],
  ['EventsPage', <EventsPage />, 'Events & Calendar'],
  ['GalleryPage', <GalleryPage />, 'School Gallery'],
  ['DownloadsPage', <DownloadsPage />, 'Downloads & Prospectus'],
  ['ContactPage', <ContactPage />, 'Get in Touch'],
  ['PortalPage', <PortalPage />, 'Portal Login'],
  ['PrivacyPage', <PrivacyPage />, 'Privacy Policy'],
  ['TermsPage', <TermsPage />, 'Terms of Use'],
  ['NotFoundPage', <NotFoundPage />, 'Page not found'],
]

describe('pages', () => {
  it.each(cases)('%s renders its heading', (_name, ui, heading) => {
    renderPage(ui)
    expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument()
  })

  it('NewsArticlePage renders a known article', async () => {
    render(
      <MemoryRouter initialEntries={['/news/welcome-to-our-new-website']}>
        <Routes>
          <Route path="/news/:slug" element={<NewsArticlePage />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(
      await screen.findByRole('heading', { name: /welcome to our new website/i }),
    ).toBeInTheDocument()
  })

  it('NewsArticlePage falls back to 404 for unknown slugs', async () => {
    render(
      <MemoryRouter initialEntries={['/news/does-not-exist']}>
        <Routes>
          <Route path="/news/:slug" element={<NewsArticlePage />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })

  it('ApplyPage shows validation errors on empty submit', async () => {
    const user = (await import('@testing-library/user-event')).default.setup()
    renderPage(<ApplyPage />)
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
  })
})
