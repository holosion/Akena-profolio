# AKENA Portfolio

Personal site for **AKENA** — Embedded Systems Engineer | AI & Machine Learning Engineer, CEO of Holosion Industries.

## Run locally

```bash
cd portfolio-app
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Where to edit content

| What | File |
| --- | --- |
| Name, bio, photo path, SEO | `src/data/profile.ts` |
| Photo file | `src/assets/portrait.jpg` |
| GitHub / email / LinkedIn / X | `src/config/socials.ts` |
| Project GitHub + demo URLs | `src/config/socials.ts` (`projectLinks`) |
| Project copy, features, details | `src/data/projects.ts` |
| Engineering domains | `src/data/engineering.ts` |
| Tech stack | `src/data/tech.ts` |
| AI/ML knowledge map | `src/data/aiml.ts` |
| Journey timeline | `src/data/timeline.ts` |

## React Bits

Backgrounds live in `src/react-bits/` (Threads, Galaxy, Aero Shards, Ballpit). Swap in official CLI copies later if you want the exact upstream shaders.

Future 3D slots:

- `src/components/Hero3D.tsx`
- `src/components/InteractiveSystem.tsx`

## Deploy

Build with `npm run build`, then host `dist/` on Vercel, Netlify, or GitHub Pages. For Vercel: import the `portfolio-app` folder as the project root.
