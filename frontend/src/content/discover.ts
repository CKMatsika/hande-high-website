export interface DiscoverCard {
  title: string
  description: string
  to: string
  image: string
}

// TODO: CONFIRM copy with the school before launch
export const discoverCards: DiscoverCard[] = [
  {
    title: 'Academic Excellence',
    description:
      'A rigorous curriculum delivered by dedicated teachers, preparing every learner for further study and life beyond the classroom.',
    to: '/academics',
    image: '/img/photos/landscape-01.jpg',
  },
  {
    title: 'Sports',
    description:
      'A wide programme of team and individual sports that builds fitness, character and lifelong sporting habits.',
    to: '/student-life/sports-culture',
    image: '/img/photos/landscape-04.jpg',
  },
  {
    title: 'Arts & Culture',
    description:
      'Music, drama, debate and the visual arts give every learner a stage on which to discover and refine their talents.',
    to: '/student-life/sports-culture',
    image: '/img/photos/landscape-05.jpg',
  },
  {
    title: 'Boarding',
    description:
      'A structured, supportive boarding environment where housemasters and peers become a second family.',
    to: '/student-life/boarding',
    image: '/img/photos/landscape-06.jpg',
  },
  {
    title: 'Student Welfare',
    description:
      'Pastoral care, counselling and health services that put the wellbeing of every learner first.',
    to: '/student-life/welfare',
    image: '/img/photos/landscape-03.jpg',
  },
  {
    title: 'Leadership',
    description:
      'Prefects, captains and mentors learn responsibility through example, service and accountability.',
    to: '/about/leadership',
    image: '/img/photos/landscape-02.jpg',
  },
]

