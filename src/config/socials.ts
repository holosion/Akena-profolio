/**
 * Central place for GitHub, demo URLs, and social profiles.
 * Update these values without touching UI components.
 */
export const socials = {
  githubProfile: 'https://github.com/holosion',
  linkedin: '',
  x: 'https://x.com/AkenaJonat2240',
  email: 'akenajonathan24@gmail.com',
  instagram: 'https://instagram.com/holo.sion',
} as const;

export const projectLinks = {
  iles: {
    github: 'https://github.com/holosion/FINAL_ILES',
    demo: 'https://final-iles.vercel.app/',
  },
  events: {
    github: 'https://github.com/holosion/event-booking-system',
    demo: 'https://event-booking-system-szz4.onrender.com/',
  },
  lumora: {
    github: 'https://github.com/holosion/embedded_systems',
    demo: 'https://guardiangass.yvonnekimera2.workers.dev/dashboard',
  },
} as const;

export type SocialKey = keyof typeof socials;
