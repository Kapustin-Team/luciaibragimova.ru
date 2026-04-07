# Technology Stack

**Analysis Date:** 2026-04-07

## Languages

**Primary:**
- JavaScript (ESM, JSX) — all application source under `src/`
- SASS (indented `.sass` syntax) — component styles via CSS Modules

**Secondary:**
- CSS — global tokens and resets in `src/app/globals.css`
- Dockerfile — multi-stage build at `Dockerfile`
- YAML — CI workflow at `.github/workflows/ci-cd.yml`

No TypeScript. The project uses `jsconfig.json` for path aliases only (`@/*` → `./src/*`).

## Runtime

**Environment:**
- Node.js 22 (enforced in CI and Dockerfile base image `node:22-alpine`)

**Package Manager:**
- npm (lockfile `package-lock.json` is present and committed)
- `npm ci` is used in CI and Docker `deps` stage

## Frameworks

**Core:**
- Next.js `^16.1.6` — App Router, server components, `output: 'standalone'` (`next.config.js`)
- React `^19.2.4` / React DOM `^19.2.4`
- SASS `^1.97.3` — compiled by Next via built-in support; `.module.sass` files

**Animation / UI:**
- Framer Motion `^12.34.3` — used in `src/components/atoms/AnimatedSection.jsx`, `Hero.jsx`, and many organisms
- react-icons `^5.6.0` — icon set used across organisms

**Testing:**
- Not detected. No test runner, no `*.test.*` / `*.spec.*` files, no Jest/Vitest config.

**Build / Dev:**
- Next.js compiler (`npm run dev`, `npm run build`, `npm start`)
- ESLint `^8` with `eslint-config-next@14.0.3` (`.eslintrc.json`)
- `agentation@^2.3.3` (devDependency, present in `package.json` — purpose unclear, no source references)

## Key Dependencies

**Critical:**
- `next@^16.1.6` — entire app routing, SSR, image optimization
- `react@^19.2.4` — UI runtime
- `framer-motion@^12.34.3` — relied on by every animated organism; removing it breaks the homepage entrance choreography
- `sass@^1.97.3` — required for the `.module.sass` style modules

**Infrastructure:**
- `eslint`, `eslint-config-next` — lint only (disabled during builds; see `next.config.js`)

## Configuration

**Environment files:**
- `.env` — present (committed file in working tree, but `.env*` is gitignored)
- `.env.local` — present (gitignored)
- `.mcp.json` — MCP server config (gitignored)

**Required env vars (from source):**
- `NEXT_PUBLIC_STRAPI_URL` — Strapi base URL, used in `src/lib/strapi.js` and `src/app/ClientHome.jsx`. Falls back to `https://luciastrapi.kpstn.ru`.
- `STRAPI_TOKEN` — referenced in `CLAUDE.md` as optional auth, not currently consumed by `strapi.js`.
- `TG_BOT_TOKEN` / `TG_BOT_CHAT_ID` — Telegram notification bot, used in `src/lib/submitContact.js`
- `AMOCRM_URL` / `AMOCRM_KEY` — AmoCRM lead creation, used in `src/lib/submitContact.js`
- `NODE_ENV` — branches dev/prod behavior in `submitContact.js`

**Build:**
- `next.config.js` — `output: 'standalone'`, ESLint ignored during builds, image `remotePatterns` for `images.unsplash.com`, `via.placeholder.com`, `luciastrapi.kpstn.ru`, `cdn.kpstn.ru`, `s3.kpstn.ru`
- `jsconfig.json` — `@/*` alias → `./src/*`
- `.eslintrc.json` — extends `next/core-web-vitals`; downgrades `react/no-unescaped-entities`, `react/jsx-no-comment-textnodes`, `@next/next/no-img-element` to warnings

## Platform Requirements

**Development:**
- Node 22 (use `nvm use 22` if multiple versions installed)
- `npm install` then `npm run dev` → http://localhost:3000
- Live Strapi at `NEXT_PUBLIC_STRAPI_URL` (default points at production CMS)

**Production:**
- Docker image built via `Dockerfile` (multi-stage `deps` → `builder` → `runner`)
- Pushed to `ghcr.io/<owner>/<repo>` by `.github/workflows/ci-cd.yml`
- Deployed via Coolify webhook (triggered after image push)
- Container runs as non-root `nextjs:nodejs` (uid/gid 1001) on port 3000 via `node server.js`

---

*Stack analysis: 2026-04-07*
