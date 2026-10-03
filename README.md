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

The Node/Express server serves the built React frontend and API together. PostgreSQL stores contact name, email, subject, message, submission time, and status. Email/social links still open their respective apps; only form submissions are recorded. No email notifications are sent.

### Render

1. Push this project to your GitHub repository. The existing Git root is `portfolio-app`, so `render.yaml` belongs at the repository root.
2. In Render, choose **New → Blueprint**, connect the repository, and use `render.yaml`.
3. Set `PUBLIC_ORIGIN` to the exact public site origin, such as `https://akena-portfolio.onrender.com`, without a trailing slash. Update it if you attach a custom domain. If left unset, the server uses Render's `RENDER_EXTERNAL_URL`.
4. Review Render's charges before creating resources: the Blueprint selects paid web and PostgreSQL plans. Render supplies `DATABASE_URL` and generates `ADMIN_TOKEN`. The contact table is created automatically on startup, idempotently.
5. After deployment, check `/api/health`, send a test contact, then open `/admin`. Copy `ADMIN_TOKEN` from the web service's Render environment settings into the inbox login. It is a secret: never put it in frontend environment variables or commit it. The inbox holds it in memory only; reload or **Lock inbox** clears it. Rotate it in Render to revoke access.

The Blueprint restricts the database to internal connections. Configure database backups/retention in Render and test restoring them. Keep one web instance with the current in-memory rate limiter; use a shared rate-limit store before scaling to multiple instances. `TRUST_PROXY_HOPS=1` is intended for Render's reverse proxy; review it if adding another proxy.

See [Render's Blueprint reference](https://render.com/docs/blueprint-spec) for provisioning settings. This repository is prepared for deployment; no resources have been created or published by this change.

### Local full-stack development

Use Node 22.12+ or Node 24. Copy `.env.example` to `.env`, set a random `ADMIN_TOKEN` of at least 32 characters and provide a PostgreSQL `DATABASE_URL`. Generate a token with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

```powershell
npm.cmd ci
npm.cmd run dev:server
# In a second terminal:
npm.cmd run dev
```

Vite forwards `/api` to port 3000. Open `http://localhost:5173`; the inbox is `/admin`. For the production server, run `npm.cmd run build` then `npm.cmd start` and set `PUBLIC_ORIGIN=http://localhost:3000`.

Alternatively, with Docker Desktop running, set `POSTGRES_PASSWORD`, `ADMIN_TOKEN`, and `PUBLIC_ORIGIN=http://localhost:3000` in `.env`, then run `docker compose up --build -d`. The database uses a persistent volume and exposes no public database port. Removing that volume deletes contacts; retain and back up the volume.

### Backend verification

`npm.cmd run test:server` exercises SQL persistence, protected access, status updates, validation, honeypot handling, rate limits, and safe error responses using an in-memory PostgreSQL emulator (`pg-mem`). `npm.cmd test` includes browser tests for form success/failure and inbox interactions. A real PostgreSQL smoke test is still needed before production if Docker/PostgreSQL is unavailable locally.
