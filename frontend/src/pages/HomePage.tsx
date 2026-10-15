import { Hero } from '@/features/home/Hero'
import { Welcome } from '@/features/home/Welcome'
import { Discover } from '@/features/home/Discover'
import { AcademicHighlights } from '@/features/home/AcademicHighlights'
import { CampusLife } from '@/features/home/CampusLife'
import { VideoSection } from '@/features/home/VideoSection'
import { NewsEvents } from '@/features/home/NewsEvents'
import { AdmissionsCta } from '@/features/home/AdmissionsCta'
import { usePageMeta } from '@/lib/usePageMeta'
import { school } from '@/content/school'

export default function HomePage() {
  usePageMeta({
    title: `${school.name} — ${school.location}`,
    description: `${school.name} is a premium educational institution in ${school.location}. Discover our academics, boarding, sports and community.`,
  })

  return (
    <>
      <Hero />
      <Welcome />
      <Discover />
      <AcademicHighlights />
      <CampusLife />
      <VideoSection />
      <NewsEvents />
      <AdmissionsCta />
    </>
  )
}
