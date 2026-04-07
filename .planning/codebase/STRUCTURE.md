# Codebase Structure

**Analysis Date:** 2026-04-07

## Directory Layout

```
luciaibragimova.ru/
├── .github/
│   └── workflows/ci-cd.yml        # GitHub Actions: lint+build, image push, Coolify deploy
├── public/                        # Static assets served at /
│   ├── assets/                    # Logos, icons, brand SVGs
│   ├── courses/                   # Course imagery
│   ├── directions/                # Direction tile imagery
│   ├── fonts/                     # Self-hosted font files (if any)
│   ├── images/                    # General images
│   └── interrior/                 # Studio interior photos
├── src/
│   ├── app/                       # Next.js App Router (pages, layouts, route groups)
│   │   ├── courses/[slug]/        # Dynamic course detail route
│   │   ├── palette-1..3/          # Design palette preview pages
│   │   ├── privacy/               # Static legal page
│   │   ├── terms/                 # Static legal page
│   │   ├── ClientHome.jsx         # Homepage client component (renders block map or fallback)
│   │   ├── DevTools.jsx           # Dev-only utilities
│   │   ├── globals.css            # Global CSS variables, resets, utility classes
│   │   ├── layout.jsx             # Root layout (fonts, html shell)
│   │   └── page.jsx               # Server entry — fetches Strapi, hands off to ClientHome
│   ├── components/
│   │   ├── atoms/                 # Reusable primitives + animation wrappers
│   │   └── organisms/             # Full sections, one folder per section
│   └── lib/
│       ├── strapi.js              # Strapi REST client + named fetchers
│       └── submitContact.js       # Server action: Telegram + AmoCRM lead pipeline
├── .eslintrc.json
├── .gitignore
├── CLAUDE.md                      # Project guidance for Claude Code
├── Dockerfile                     # Multi-stage Node 22 alpine build
├── jsconfig.json                  # Path alias @/ → src/
├── next.config.js                 # standalone output, image hosts, eslint ignore
├── package.json
└── package-lock.json
```

(Excluded from listing: `node_modules/`, `.next/`, `.git/`, `.planning/`, `.gsd*`, `.artifacts/`, `.bg-shell/`, `.paperclip/`, `.claude/`, `claude-talk-to-figma-mcp/` — the latter is an unrelated vendored MCP server checkout.)

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router routes, layouts, and route-local client wrappers
- Contains: `page.jsx` (server), `ClientHome.jsx` (client), `layout.jsx`, dynamic `courses/[slug]/`, static legal pages, palette preview pages
- Key files: `src/app/page.jsx`, `src/app/ClientHome.jsx`, `src/app/courses/[slug]/page.jsx`, `src/app/courses/[slug]/CoursePageClient.jsx`, `src/app/globals.css`, `src/app/layout.jsx`

**`src/components/organisms/`:**
- Purpose: full page sections — every meaningful "block" of the homepage and course page lives here as `<Name>/<Name>.jsx` + `<Name>.module.sass`
- Contains: `About/`, `ChatWidget/`, `Consultations/`, `ContactBlock/`, `Courses/`, `Cta/`, `Directions/`, `DirectionsGrid/`, `EnrollModal/`, `Faq/`, `FeaturedCourse/`, `Footer/`, `Header/`, `Hero/`, `PinkBanner/`, `Reviews/`, `Team/`, `TopBanner/`, `TrustBlock/`
- Key files: `src/components/organisms/Hero/Hero.jsx` (most complex animation entry), `src/components/organisms/Header/Header.jsx`, `src/components/organisms/Footer/Footer.jsx`

**`src/components/atoms/`:**
- Purpose: small reusable building blocks, mostly framer-motion wrappers and decorative elements
- Contains: `AnimatedSection.jsx`, `Card3D.jsx`, `CharReveal.jsx`, `DecorativeShapes.jsx`, `DecorShapes/` (sub-folder), `FadeSlideUp.jsx`, `GradientPlaceholder.jsx` + `.module.sass`, `MaskReveal.jsx`, `ReviewLightbox.jsx` + `.module.sass`, `ReviewScreenshot.jsx` + `.module.sass`, `ScalePop.jsx`, `SectionReveal.jsx`
- Key files: `src/components/atoms/AnimatedSection.jsx` is the canonical scroll-fade pattern

**`src/lib/`:**
- Purpose: external service access from server components and server actions
- Key files: `src/lib/strapi.js` (all CMS calls), `src/lib/submitContact.js` (`'use server'` action for the contact form)

**`public/`:**
- Purpose: static assets served at site root, no transformation
- Note: `public/videos/` is gitignored (`.gitignore`); only the rest of `public/` ships in git

**`.github/workflows/`:**
- Purpose: CI/CD pipeline definitions
- Key files: `.github/workflows/ci-cd.yml`

## Key File Locations

**Entry Points:**
- `src/app/layout.jsx` — root HTML shell
- `src/app/page.jsx` — homepage server component
- `src/app/courses/[slug]/page.jsx` — course detail server component

**Configuration:**
- `next.config.js` — standalone output, image hosts, ESLint ignore
- `jsconfig.json` — `@/*` → `./src/*` alias
- `.eslintrc.json` — `next/core-web-vitals` extends with three rules downgraded to warnings
- `Dockerfile` — multi-stage build
- `.github/workflows/ci-cd.yml` — pipeline

**Core Logic:**
- `src/lib/strapi.js` — every Strapi REST call lives here
- `src/lib/submitContact.js` — the only mutation in the app
- `src/app/ClientHome.jsx` — homepage block dispatcher (`BLOCK_MAP`)
- `src/app/courses/[slug]/CoursePageClient.jsx` — course page rendering

**Styles:**
- `src/app/globals.css` — CSS custom properties (design tokens), resets, palette
- `src/components/**/*.module.sass` — per-component scoped styles (indented SASS syntax)

**Testing:**
- Not present.

## Naming Conventions

**Files:**
- React components: `PascalCase.jsx` (e.g. `Hero.jsx`, `AnimatedSection.jsx`)
- SASS modules: `<Component>.module.sass` co-located with the JSX
- Lib helpers: `camelCase.js` (e.g. `strapi.js`, `submitContact.js`)
- Route segments: lowercase folder names (`courses/`, `privacy/`); dynamic segments use Next bracket syntax (`[slug]`)

**Directories:**
- Organisms / atoms: each component lives in its own PascalCase folder containing the `.jsx` and `.module.sass` (e.g. `src/components/organisms/Hero/`)
- Exception: small atoms may live as flat `.jsx` files directly under `src/components/atoms/` (e.g. `AnimatedSection.jsx`)

**Imports:**
- Always use the `@/` alias for cross-folder imports: `import Hero from '@/components/organisms/Hero/Hero'`
- Co-located SASS imported as the alias `s`: `import s from './Hero.module.sass'`

**Strapi block components:**
- Strings of the form `blocks.<kebab-name>` map to React components via `BLOCK_MAP` in `src/app/ClientHome.jsx`

## Where to Add New Code

**New homepage section:**
1. Create `src/components/organisms/<Name>/<Name>.jsx` and `<Name>.module.sass`
2. Accept `data` (Strapi block payload) and any of the shared props (`directions`, `courses`, `faqs`, `reviews`, `team`, `consultationTypes`)
3. Import in `src/app/ClientHome.jsx` and register in `BLOCK_MAP` keyed by `blocks.<kebab-name>`
4. Add the matching component to the Strapi homepage dynamic zone so editors can place it

**New atom / animation primitive:**
- Single-file: `src/components/atoms/<Name>.jsx` (follow `AnimatedSection.jsx` shape)
- Needs styles: `src/components/atoms/<Name>/<Name>.jsx` + `<Name>.module.sass`

**New top-level page:**
- Create `src/app/<route>/page.jsx` (server) plus a `*.jsx` client wrapper if interactivity is needed
- For static pages, follow `src/app/privacy/` and `src/app/terms/`

**New Strapi endpoint helper:**
- Add a named export to `src/lib/strapi.js` using the `fetchStrapi(path, params)` wrapper and Strapi 5 indexed populate syntax

**New external integration:**
- Create a new file under `src/lib/` mirroring `submitContact.js` (server action with `'use server'`)
- Read credentials from `process.env.*` only — never inline them

**Static asset:**
- Drop into the appropriate `public/` subfolder. Reference as `/<subfolder>/file.ext`.

## Special Directories

**`.planning/`:**
- Purpose: GSD planning artifacts (this directory)
- Generated: Yes (by GSD commands)
- Committed: Yes (per `.planning/config.json` once `/gsd-new-project` runs)

**`.gsd/` and `.gsd-id`:**
- Purpose: GSD per-project state symlink
- Generated: Yes
- Committed: No (`.gitignore`)

**`claude-talk-to-figma-mcp/`:**
- Purpose: Vendored MCP server source — unrelated to the website application
- Note: do NOT modify when working on the site; treat as external

**`.artifacts/`, `.bg-shell/`, `.paperclip/`, `.claude/`:**
- Purpose: Tooling caches (browser sessions, Claude Code state, etc.)
- Committed: No

---

*Structure analysis: 2026-04-07*
