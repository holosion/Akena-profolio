/**
 * Central place for GitHub, demo URLs, and social profiles.
 * Update these values without touching UI components.
 */
export const socials = {
  githubProfile: 'https://github.com/holosion',
  linkedin: '',
  x: '',
  email: '',
} as const;

export const projectLinks = {
  iles: {
    github: '',
    demo: 'https://final-iles.vercel.app/',
  },
  events: {
    github: '',
    demo: 'https://event-booking-system-szz4.onrender.com/',
  },
  lumora: {
    github: '',
    demo: 'https://guardiangass.yvonnekimera2.workers.dev/auth/signup',
  },
} as const;

export type SocialKey = keyof typeof socials;
