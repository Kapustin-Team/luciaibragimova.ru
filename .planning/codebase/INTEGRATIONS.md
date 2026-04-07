# External Integrations

**Analysis Date:** 2026-04-07

## APIs & External Services

**Headless CMS:**
- Strapi 5 — primary content source for homepage blocks, courses, directions, FAQs, reviews, team, consultation types
  - Base URL: `NEXT_PUBLIC_STRAPI_URL` (default `https://luciastrapi.kpstn.ru`)
  - Client: native `fetch` wrapped by `fetchStrapi()` in `src/lib/strapi.js`
  - Auth: none required for current public endpoints; `STRAPI_TOKEN` is documented in `CLAUDE.md` but not wired in code
  - Cache mode: `cache: 'no-store'` on every call (no ISR despite the comment in `CLAUDE.md` claiming 60s revalidation)
  - Populate convention: Strapi 5 indexed format (`populate[0]=...&populate[1]=...`) — see `getCourseBySlug` in `src/lib/strapi.js`

**CRM:**
- AmoCRM — lead capture from contact form
  - Endpoint: `${AMOCRM_URL}/leads/unsorted/forms`
  - Auth: Bearer token via `AMOCRM_KEY`
  - Server action: `src/lib/submitContact.js` → `createAmoCRMLead()`
  - Source label sent to AmoCRM: `Сайт luciaibragimova.ru`

**Messaging:**
- Telegram Bot API — operator notification on form submit
  - Endpoint: `https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage`
  - Markdown formatted notification with name, phone, message, quiz answers
  - Server action: `src/lib/submitContact.js` → `sendTelegram()`

**Image hosts (Next/Image remotePatterns):**
- `images.unsplash.com`
- `via.placeholder.com`
- `luciastrapi.kpstn.ru` (Strapi uploads)
- `cdn.kpstn.ru`
- `s3.kpstn.ru`

## Data Storage

**Databases:**
- None directly. All persistent data lives in the external Strapi instance.

**File Storage:**
- Local `public/` for static assets (logos, course images, fonts, video stills)
- Strapi-served media via the image hosts above

**Caching:**
- None. Both server (`src/lib/strapi.js`) and client fallback (`src/app/ClientHome.jsx`) use `cache: 'no-store'`.
- Page routes set `export const dynamic = 'force-dynamic'` (`src/app/page.jsx`, `src/app/courses/[slug]/page.jsx`).

## Authentication & Identity

**Auth Provider:**
- None. The site is fully public; no user accounts, sessions, or login flows in `src/`.

## Monitoring & Observability

**Error Tracking:**
- None. Errors are caught and `console.error`'d in `src/lib/strapi.js` and `src/lib/submitContact.js`.

**Logs:**
- `console.log` / `console.error` only. In production these surface in the Coolify container logs.

## CI/CD & Deployment

**Hosting:**
- Coolify (self-hosted PaaS). Image pulled from `ghcr.io`.

**CI Pipeline:**
- GitHub Actions — `.github/workflows/ci-cd.yml`
  - `lint-and-build` job: `npm ci` → `npm run lint || true` → `npm run build` (Node 22)
  - `build-and-push` job (only on push to `main`): builds linux/amd64 image, pushes to `ghcr.io/${{ github.repository }}` with tags `latest`, branch, and `branch-sha`
  - Final step (per `CLAUDE.md`): triggers Coolify deployment webhook

**Container Registry:**
- GitHub Container Registry (`ghcr.io`), authenticated via `GITHUB_TOKEN`

## Environment Configuration

**Required env vars in production:**
- `NEXT_PUBLIC_STRAPI_URL` — public, baked into client bundle
- `TG_BOT_TOKEN`, `TG_BOT_CHAT_ID` — for `submitContact.js`
- `AMOCRM_URL`, `AMOCRM_KEY` — for `submitContact.js`
- `NODE_ENV=production` — set by Dockerfile runner stage

**Optional / documented but unused in code:**
- `STRAPI_TOKEN` — referenced in `CLAUDE.md` only

**Secrets location:**
- GitHub Actions secrets for the deploy webhook (`COOLIFY_WEBHOOK` etc., per `.github/workflows/ci-cd.yml`)
- `.env` and `.env.local` for local dev (gitignored via `.gitignore`)
- Production env vars injected by Coolify

## Webhooks & Callbacks

**Incoming:**
- None — the Next.js app exposes no API routes (no `src/app/api/`).

**Outgoing:**
- Telegram `sendMessage` from `submitContact.js`
- AmoCRM `leads/unsorted/forms` and `leads/{id}/notes` from `submitContact.js`
- Coolify deploy webhook from CI

---

*Integration audit: 2026-04-07*
