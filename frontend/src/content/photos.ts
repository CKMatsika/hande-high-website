export interface SchoolPhoto {
  src: string
  alt: string
  album: string
}

export const schoolPhotos: SchoolPhoto[] = [
  { src: '/img/photos/campus-classroom-walkway.jpg', alt: 'Walkway between Hande High School classroom blocks', album: 'Campus' },
  { src: '/img/photos/campus-classroom-courtyard.jpg', alt: 'Classroom blocks and gardens at Hande High School', album: 'Campus' },
  { src: '/img/photos/campus-shade-tree.jpg', alt: 'Shaded courtyard and classroom block on campus', album: 'Campus' },
  { src: '/img/photos/campus-classroom-garden.jpg', alt: 'Classroom block beside a landscaped campus path', album: 'Campus' },
  { src: '/img/photos/campus-classroom-garden-wide.jpg', alt: 'Wide view of the classroom garden and campus path', album: 'Campus' },
  { src: '/img/photos/campus-main-gate.jpg', alt: 'Main entrance gate to Hande High School', album: 'Campus' },
  { src: '/img/photos/campus-gate-path.jpg', alt: 'Path leading through the school grounds', album: 'Campus' },
  { src: '/img/photos/campus-garden-path.jpg', alt: 'Garden path beside a Hande High School classroom block', album: 'Campus' },
  { src: '/img/photos/campus-boundary-fence.jpg', alt: 'School grounds and boundary fence beneath campus trees', album: 'Campus' },
  { src: '/img/photos/campus-classroom-entry.jpg', alt: 'Classroom buildings around the central campus walkway', album: 'Campus' },
  { src: '/img/photos/campus-boundary-trees.jpg', alt: 'Trees and boundary fence along the school grounds', album: 'Campus' },
  { src: '/img/photos/school-event-speaker.jpg', alt: 'Deputy Headmaster addressing the school community', album: 'Leadership' },
  { src: '/img/photos/school-community-lunch.jpg', alt: 'Members of the school community sharing a meal at an event', album: 'Events' },
  { src: '/img/photos/students-group-blue-uniform.jpg', alt: 'Hande High School learners gathered in blue uniforms', album: 'School Life' },
  { src: '/img/photos/school-bus-students.jpg', alt: 'Learners and staff beside the Hande High School bus', album: 'Transport' },
  { src: '/img/photos/students-in-uniform-evening.jpg', alt: 'Learners standing together outdoors in school uniform', album: 'School Life' },
  { src: '/img/photos/school-bus-front.jpg', alt: 'Front view of the Hande High School bus', album: 'Transport' },
  { src: '/img/photos/school-bus-campus.jpg', alt: 'Hande High School bus on the school grounds', album: 'Transport' },
  { src: '/img/photos/netball-team.jpg', alt: 'Hande High School netball team on court', album: 'Sport' },
  { src: '/img/photos/students-sports-event.jpg', alt: 'Learners taking part in a school sports event', album: 'Sport' },
  { src: '/img/photos/school-bus-near-classrooms.jpg', alt: 'Hande High School bus beside the classroom buildings', album: 'Transport' },
  { src: '/img/photos/students-in-school-sportswear.jpg', alt: 'Learners gathered in school sportswear', album: 'School Life' },
  { src: '/img/photos/student-cleanliness-campaign.jpg', alt: 'Learners promoting a clean school environment', album: 'School Life' },
  { src: '/img/photos/science-practical.jpg', alt: 'Learner working on a practical in the science laboratory', album: 'Academics' },
  { src: '/img/photos/school-awards-ceremony.jpg', alt: 'School community celebrating an achievement at a ceremony', album: 'Events' },
  { src: '/img/photos/school-trip-outing.jpg', alt: 'Hande High School learners and staff on an educational outing', album: 'Trips' },
  { src: '/img/photos/choir-performance.jpg', alt: 'Hande High School choir performing at an event', album: 'Arts & Culture' },
  { src: '/img/photos/student-community-selfie.jpg', alt: 'Hande High School learners sharing a group selfie', album: 'School Life' },
  { src: '/img/photos/students-group-blue-campus.jpg', alt: 'Learners gathered outside a school building', album: 'School Life' },
  { src: '/img/photos/students-on-sports-court.jpg', alt: 'Learners enjoying an activity on the sports court', album: 'Sport' },
  { src: '/img/photos/students-sports-court-group.jpg', alt: 'Learners together beside the school sports court', album: 'Sport' },
  { src: '/img/photos/students-group-school-uniform.jpg', alt: 'A large group of Hande High School learners', album: 'School Life' },
  { src: '/img/photos/cultural-dance.jpg', alt: 'Learners performing a cultural dance at school', album: 'Arts & Culture' },
]

export const featuredSchoolPhotos = {
  hero: '/img/photos/school-bus-campus.jpg',
  campus: '/img/photos/campus-classroom-walkway.jpg',
  classrooms: '/img/photos/campus-classroom-entry.jpg',
  academics: '/img/photos/science-practical.jpg',
  students: '/img/photos/students-group-blue-uniform.jpg',
  sports: '/img/photos/netball-team.jpg',
  arts: '/img/photos/choir-performance.jpg',
  event: '/img/photos/school-awards-ceremony.jpg',
  trip: '/img/photos/school-trip-outing.jpg',
  entrance: '/img/photos/campus-main-gate.jpg',
  dance: '/img/photos/cultural-dance.jpg',
  bus: '/img/photos/school-bus-front.jpg',
  deputyHeadmaster: '/img/photos/school-event-speaker.jpg',
} as const
