import portrait from '../assets/portrait.jpg';

export const profile = {
  name: 'AKENA',
  fullName: 'Akena',
  titlePrimary: 'Embedded Systems Engineer',
  titleSecondary: 'AI & Machine Learning Engineer',
  organization: {
    role: 'CEO',
    name: 'Holosion Industries',
  },
  location: '',
  tagline:
    'I build intelligent systems that combine software, hardware, AI/ML, and automation.',
  summary:
    'I work at the intersection of embedded systems, artificial intelligence, and software engineering — designing systems that sense the physical world, process data, and act with intent.',
  about: [
    'I am an engineer focused on building real systems, not just isolated demos. That means connecting sensors and microcontrollers to software, models, and interfaces people can actually use.',
    'As CEO of Holosion Industries, I am building toward products that sit at the meeting point of embedded systems, AI, and cloud-connected software.',
    'My work currently spans application development, intelligent monitoring hardware, and machine learning foundations. The long-term goal is to combine these into reliable intelligent systems.',
  ],
  heroIntro:
    'I design and build systems where firmware, data, and intelligence meet — from IoT monitoring hardware to software platforms that evaluate, book, and operate in the real world.',
  seo: {
    title: 'AKENA | Embedded Systems & AI/ML Engineer',
    description:
      'Portfolio of Akena — Embedded Systems Engineer and AI & Machine Learning Engineer. CEO of Holosion Industries. Projects in IoT monitoring, software systems, and intelligent applications.',
  },
  photo: {
    src: portrait,
    alt: 'Portrait of Akena, Embedded Systems and AI/ML Engineer',
  },
} as const;
