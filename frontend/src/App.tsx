import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/app/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const HistoryPage = lazy(() => import('@/pages/HistoryPage'))
const VisionMissionPage = lazy(() => import('@/pages/VisionMissionPage'))
const LeadershipPage = lazy(() => import('@/pages/LeadershipPage'))
const AcademicsPage = lazy(() => import('@/pages/AcademicsPage'))
const CurriculumPage = lazy(() => import('@/pages/CurriculumPage'))
const AdmissionsPage = lazy(() => import('@/pages/AdmissionsPage'))
const ApplyPage = lazy(() => import('@/pages/ApplyPage'))
const StudentLifePage = lazy(() => import('@/pages/StudentLifePage'))
const BoardingPage = lazy(() => import('@/pages/BoardingPage'))
const SportsCulturePage = lazy(() => import('@/pages/SportsCulturePage'))
const WelfarePage = lazy(() => import('@/pages/WelfarePage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const NewsArticlePage = lazy(() => import('@/pages/NewsArticlePage'))
const EventsPage = lazy(() => import('@/pages/EventsPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const DownloadsPage = lazy(() => import('@/pages/DownloadsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const PortalPage = lazy(() => import('@/pages/PortalPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const Fallback = (
  <div className="grid min-h-[60vh] place-items-center bg-white">
    <p className="animate-pulse text-sm uppercase tracking-widest text-brand-400">Loading…</p>
  </div>
)

function page(node: React.ReactNode) {
  return <Suspense fallback={Fallback}>{node}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: page(<HomePage />) },
      { path: '/about', element: page(<AboutPage />) },
      { path: '/about/history', element: page(<HistoryPage />) },
      { path: '/about/vision-mission-values', element: page(<VisionMissionPage />) },
      { path: '/about/leadership', element: page(<LeadershipPage />) },
      { path: '/academics', element: page(<AcademicsPage />) },
      { path: '/academics/curriculum', element: page(<CurriculumPage />) },
      { path: '/admissions', element: page(<AdmissionsPage />) },
      { path: '/admissions/apply', element: page(<ApplyPage />) },
      { path: '/student-life', element: page(<StudentLifePage />) },
      { path: '/student-life/boarding', element: page(<BoardingPage />) },
      { path: '/student-life/sports-culture', element: page(<SportsCulturePage />) },
      { path: '/student-life/welfare', element: page(<WelfarePage />) },
      { path: '/news', element: page(<NewsPage />) },
      { path: '/news/:slug', element: page(<NewsArticlePage />) },
      { path: '/events', element: page(<EventsPage />) },
      { path: '/gallery', element: page(<GalleryPage />) },
      { path: '/downloads', element: page(<DownloadsPage />) },
      { path: '/contact', element: page(<ContactPage />) },
      { path: '/portal', element: page(<PortalPage />) },
      { path: '/privacy', element: page(<PrivacyPage />) },
      { path: '/terms', element: page(<TermsPage />) },
      { path: '*', element: page(<NotFoundPage />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
