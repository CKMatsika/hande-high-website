/**
 * Central school configuration.
 * Every value marked TODO: CONFIRM is a placeholder supplied by the school later.
 * No achievements, staff, statistics or contact details are invented —
 * placeholders render as visible "[...]" tokens until replaced.
 */
export const school = {
  name: 'Hande High School',
  shortName: 'Hande High',
  location: 'Nyashanu, Buhera, Manicaland Province, Zimbabwe',
  motto: 'Strive to Achieve',
  founded: '[YEAR — TO BE CONFIRMED]',
  // TODO: CONFIRM contact details
  contact: {
    address: 'Nyashanu, Buhera, Zimbabwe',
    postal: 'P Bag 1014, Dorowa, Zimbabwe',
    phone: '+263 774 862 592',
    email: 'info@handehigh.co.zw',
  },
  // TODO: CONFIRM social media profiles (href "#" disables the link)
  social: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  // WhatsApp quick enquiry. Number = international format, digits only.
  // TODO: CONFIRM this is the school's WhatsApp number.
  whatsapp: {
    number: '263774862592',
    enabled: true,
    message: 'Hello Hande High School, I would like to make an enquiry.',
  },
  // Portal URLs — school ERP (Cloud School / Laravel Cloud)
  portals: {
    parents: 'https://handehigh-production-mbxi6c.laravel.cloud/',
    students: 'https://handehigh-production-mbxi6c.laravel.cloud/',
    staff: 'https://handehigh-production-mbxi6c.laravel.cloud/',
  },
  admissions: {
    prospectusUrl: '#', // TODO: CONFIRM supply prospectus PDF
    applyUrl: '#', // TODO: CONFIRM online application URL
  },
} as const

export type School = typeof school
