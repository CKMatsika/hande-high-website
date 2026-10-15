export interface NewsItem {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  body?: string
}

export interface SchoolEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
}

// TODO: CONFIRM — replace with real school news and events before launch
export const latestNews: NewsItem[] = [
  {
    slug: 'welcome-to-our-new-website',
    title: 'Welcome to Our New Website',
    excerpt:
      'We are pleased to introduce our new online home. Explore our campus, programmes and community.',
    date: '2026-01-15',
    image: '/img/photos/landscape-02.jpg',
  },
  {
    slug: 'term-dates-announced',
    title: 'Term Dates Announced',
    excerpt: 'Term dates and the school calendar for the coming academic year have been published.',
    date: '2026-01-10',
    image: '/img/photos/landscape-05.jpg',
  },
  {
    slug: 'admissions-open',
    title: 'Admissions Now Open',
    excerpt:
      'Applications are now being accepted for the next academic year. Visit the Admissions page to begin.',
    date: '2026-01-05',
    image: '/img/photos/landscape-06.jpg',
  },
]

export const upcomingEvents: SchoolEvent[] = [
  {
    id: 'open-day',
    title: 'Open Day',
    date: '2026-03-14',
    location: '[SCHOOL MAIN HALL]',
    description: 'Tour the campus, meet staff and discover life at the school.',
  },
  {
    id: 'term-start',
    title: 'First Term Begins',
    date: '2026-01-13',
    location: '[SCHOOL CAMPUS]',
    description: 'Learners return for the start of the new academic year.',
  },
  {
    id: 'sports-day',
    title: 'Inter-House Sports Day',
    date: '2026-04-11',
    location: '[SCHOOL SPORTS GROUNDS]',
    description: 'A day of friendly competition across all boarding houses.',
  },
]
