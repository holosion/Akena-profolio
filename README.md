# AKENA — a spatial engineering portfolio

A colorful, responsive portfolio for Akena Jonathan, focused on AI, machine learning, embedded engineering, and connected software.

## Local preview

```powershell
npm.cmd install
npm.cmd run dev
```

Open the URL Vite prints (normally http://localhost:5173). Changes update automatically.

## Design and interaction

- Real Three.js sculpture with metallic materials, studio reflections, orbiting rings, and pointer response.
- A sticky, three-chapter scroll experience moves between intelligence, a processor board, and a connected network.
- Violet, cyan, pink, and amber backgrounds, original project artwork, perspective card interactions, and scroll reveals.
- Mobile navigation, visible keyboard focus, skip link, and a reduced-motion layout that exposes all chapters without animation.
- Three.js is loaded separately from the main application. Scenes load near the viewport and pause outside it or while the tab is hidden. A generated image remains available when WebGL cannot start.
- Fonts and artwork are served locally; there are no external font or image requests.

## Content locations

| Content | File |
| --- | --- |
| Page copy and project summaries | `src/App.tsx` |
| Scroll chapters | `src/components/ScrollJourney.tsx` |
| 3D geometry, lighting, and camera | `src/components/SpatialScene.tsx` |
| Colors, layouts, and animation | `src/experience.css` |
| Social profiles, email, project links | `src/config/socials.ts` |
| Technology groups | `src/data/tech.ts` |
| Portrait and profile data | `src/data/profile.ts` |
| Original project artwork | `public/images/` |
| Artwork prompts and provenance | `docs/artwork.md` |

Instagram links point to **@holosion**. Project covers are explicitly labeled as concept visuals; they do not represent actual product photos or app screenshots.

## Validation

```powershell
npm.cmd run build
npm.cmd run lint
npx.cmd playwright install chromium
npm.cmd test
```

Browser checks cover real WebGL initialization, scrolling through all chapters, project image loading, Instagram links, mobile navigation, horizontal overflow, and reduced-motion behavior. Screenshots are saved to the ignored `test-results/` folder.

## Deployment

Build with `npm.cmd run build` and publish `dist/` with Vercel, Netlify, or another static host. Use `portfolio-app` as the project root. No backend or API keys are required.
