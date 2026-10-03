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

The production stack is **Vercel frontend → Render Express API → Neon PostgreSQL**. PostgreSQL stores contact name, email, subject, message, submission time, and status. Email/social links still open their respective apps; only form submissions are recorded. Contact notifications are sent through Resend when configured on Render.

### Gmail notifications

Set `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `NOTIFICATION_FROM`, and `NOTIFICATION_INBOX_URL` on Render only. Never place the API key in Vercel or a `VITE_` variable. The notification includes the contact details and full message as plain text, and Reply goes to the visitor's email address.

The default sender is `AKENA Portfolio <onboarding@resend.dev>`. Resend permits this sender only when the recipient is the email address of the Resend account. For other recipients or a custom sender, verify a domain in Resend first.

Messages are saved before sending. Temporary email failures are retried twice with an idempotency key to prevent duplicate notifications. If delivery still fails, the contact remains in the admin inbox and Render logs the contact reference; there is no background retry queue. An empty API key disables notifications for local development.

### 1. Neon database

Create a Neon project and database, then copy the pooled PostgreSQL connection string from **Connect**. Preserve its TLS query parameters (including `sslmode=require`). Store it only as `DATABASE_URL` on Render. The server uses `pg.Pool` and creates the contact table/index automatically on startup. Choose Neon and Render regions close to each other.

See [Neon's connection guide](https://neon.com/docs/connect/connect-from-any-app). No database password belongs in Vercel or a `VITE_` variable.

### 2. Render backend

1. Push this project to your GitHub repository. The existing Git root is `portfolio-app`, so `render.yaml` belongs at the repository root.
2. In Render, choose **New → Blueprint**, connect the repository, and use `render.yaml`.
3. Set `DATABASE_URL` to the Neon pooled connection string. Set `PUBLIC_ORIGIN` to your exact Vercel frontend origin, such as `https://akena-portfolio.vercel.app`, without a trailing slash. You can allow additional custom domains or specific preview URLs with a comma-separated list. Unlisted browser origins are rejected; previews are not automatically trusted.
4. The Blueprint creates only a paid Render web service, generates `ADMIN_TOKEN`, and sets `SERVE_FRONTEND=false` and `TRUST_PROXY_HOPS=1`. It does not provision a Render database. Review the selected plan before creating it.
5. Render runs `npm ci --omit=dev` and `npm start`. For a manual Web Service setup, use those commands, Node 24, and the same environment variables. Leave `PORT` managed by Render. After deployment, open `https://YOUR-API.onrender.com/api/health` and verify `{"status":"ok"}`.

Configure database backups/retention in Neon and test restoring them. Keep one Render web instance with the current in-memory rate limiter; use a shared rate-limit store before scaling to multiple instances. `TRUST_PROXY_HOPS=1` is intended for Render's reverse proxy; review it if adding another proxy.

See [Render's Blueprint reference](https://render.com/docs/blueprint-spec) for provisioning settings. This repository is prepared for deployment; no resources have been created or published by this change.

### 3. Vercel frontend

Import the same GitHub repository into Vercel. The Git repository root is already `portfolio-app`, so leave **Root Directory** at the repository root. Choose **Vite**, build command `npm run build`, output directory `dist`.

Set the public environment variable `VITE_API_URL=https://YOUR-API.onrender.com` (no `/api` suffix). Deploy or redeploy after setting it: Vite embeds this value at build time. `vercel.json` preserves direct `/admin` navigation. See [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

Update Render's `PUBLIC_ORIGIN` to the resulting Vercel production URL. If you attach a custom domain, add its exact origin too. Then submit a contact from the deployed frontend and confirm it appears in `/admin`.

### Environment variables by host

| Host | Variable | Value |
| --- | --- | --- |
| Render | `DATABASE_URL` | Secret Neon pooled PostgreSQL URL with TLS parameters |
| Render | `ADMIN_TOKEN` | Secret random token, at least 32 characters; generated by Blueprint |
| Render | `PUBLIC_ORIGIN` | Exact Vercel/custom-domain origin(s), comma-separated |
| Render | `SERVE_FRONTEND` | `false` |
| Render | `TRUST_PROXY_HOPS` | `1` |
| Render | `NODE_ENV` | `production` |
| Render | `NODE_VERSION` | `24` |
| Vercel | `VITE_API_URL` | Public Render origin, no trailing `/api` |

### Contact inbox

Open `https://YOUR-FRONTEND.vercel.app/admin`. Copy `ADMIN_TOKEN` from Render's environment settings into the inbox login. Never commit it or configure it as a frontend environment variable. The inbox holds it in memory only; reload or **Lock inbox** clears it. Rotate it on Render to revoke access. The API requires it even if somebody knows the inbox URL.

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

`npm.cmd run test:server` exercises SQL persistence, protected access, status updates, validation, honeypot handling, rate limits, safe error responses, and cross-origin preflight/access using an in-memory PostgreSQL emulator (`pg-mem`). `npm.cmd test` includes browser tests for form success/failure and inbox interactions. Verify `/api/health` and a complete contact submission against the real Neon database after configuring the hosts.
