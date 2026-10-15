export interface NavLink {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavLink[]
}

export const primaryNav: NavItem[] = [
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'History', to: '/about/history' },
      { label: 'Vision, Mission & Values', to: '/about/vision-mission-values' },
      { label: 'School Leadership', to: '/about/leadership' },
    ],
  },
  {
    label: 'Academics',
    to: '/academics',
    children: [
      { label: 'Academics Overview', to: '/academics' },
      { label: 'Curriculum & Departments', to: '/academics/curriculum' },
    ],
  },
  {
    label: 'Admissions',
    to: '/admissions',
    children: [
      { label: 'Admissions Overview', to: '/admissions' },
      { label: 'Apply / Enquire', to: '/admissions/apply' },
      { label: 'Downloads & Prospectus', to: '/downloads' },
    ],
  },
  {
    label: 'Student Life',
    to: '/student-life',
    children: [
      { label: 'Student Life Overview', to: '/student-life' },
      { label: 'Boarding Life', to: '/student-life/boarding' },
      { label: 'Sports & Culture', to: '/student-life/sports-culture' },
      { label: 'Student Welfare', to: '/student-life/welfare' },
    ],
  },
  {
    label: 'News & Events',
    to: '/news',
    children: [
      { label: 'Latest News', to: '/news' },
      { label: 'Events & Calendar', to: '/events' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const quickLinks: NavLink[] = [
  { label: 'Admissions', to: '/admissions' },
  { label: 'Parent Portal', to: '/portal' },
]
