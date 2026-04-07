# Architecture

**Analysis Date:** 2026-04-07

## Pattern Overview

**Overall:** Next.js App Router site (server components for data fetching → client components for rendering and interactivity), backed by a headless Strapi 5 CMS, with a Strapi-driven dynamic block system for the homepage.

**Key Characteristics:**
- Server components are thin data-fetch shells (`src/app/page.jsx`, `src/app/courses/[slug]/page.jsx`) — they call `src/lib/strapi.js` and forward props to a single client component
- All rendering logic and animations live in client components under `src/components/`
- Homepage layout is data-driven: an ordered `blocks` array from Strapi is mapped to React components via `BLOCK_MAP` in `src/app/ClientHome.jsx`
- Atomic design split: `src/components/atoms/` (primitives, animation wrappers) and `src/components/organisms/` (full sections)
- No API routes; the Next app only renders. Mutations (form submit) go through a Server Action in `src/lib/submitContact.js`

## Layers

**Route layer (`src/app/`):**
- Purpose: define URLs, fetch initial data, render layout
- Location: `src/app/`
- Contains: `layout.jsx`, `page.jsx`, `ClientHome.jsx`, `courses/[slug]/page.jsx`, `courses/[slug]/CoursePageClient.jsx`, `privacy/`, `terms/`, `palette-1..3/` (palette preview pages)
- Depends on: `@/lib/strapi`, `@/components/organisms/*`
- Used by: Next.js runtime

**Data access layer (`src/lib/`):**
- Purpose: talk to Strapi and external services
- Location: `src/lib/strapi.js`, `src/lib/submitContact.js`
- Contains: typed-by-convention async functions returning Strapi `data` payloads or `null` on error; Telegram + AmoCRM lead pipeline
- Depends on: `fetch`, `process.env`
- Used by: server components in `src/app/` and the client-side fallback fetch in `ClientHome.jsx`

**Presentation — organisms (`src/components/organisms/`):**
- Purpose: full page sections, each owning its layout, animations, and SASS module
- Location: `src/components/organisms/<Name>/<Name>.jsx` + `<Name>.module.sass`
- Contains: Hero, Header, Footer, Directions, DirectionsGrid, About, FeaturedCourse, Courses, Reviews, Cta, Faq, PinkBanner, TopBanner, TrustBlock, Consultations, ContactBlock, EnrollModal, ChatWidget, Team
- Depends on: framer-motion, atoms, react-icons, SASS modules
- Used by: `ClientHome.jsx` (homepage), `CoursePageClient.jsx` (course pages), other route pages

**Presentation — atoms (`src/components/atoms/`):**
- Purpose: reusable primitives, animation wrappers, decorative elements
- Location: `src/components/atoms/`
- Contains: `AnimatedSection.jsx`, `Card3D.jsx`, `CharReveal.jsx`, `DecorativeShapes.jsx`, `DecorShapes/`, `FadeSlideUp.jsx`, `GradientPlaceholder.jsx`, `MaskReveal.jsx`, `ReviewLightbox.jsx`, `ReviewScreenshot.jsx`, `ScalePop.jsx`, `SectionReveal.jsx`
- Depends on: framer-motion, React
- Used by: organisms

## Data Flow

**Homepage render:**
1. Request hits `src/app/page.jsx` (server component, `dynamic = 'force-dynamic'`)
2. `Promise.all([getHomepage, getDirections, getCourses, getFaqs, getReviews, getTeamMembers, getConsultationTypes])` runs against Strapi via `src/lib/strapi.js`
3. Each helper returns `json.data` or `null` on failure (no thrown errors)
4. Props are forwarded to `ClientHome` which marks `'use client'`
5. `ClientHome` keeps a `useState` mirror of every prop and, on mount, refetches the same endpoints from the public Strapi URL as a fallback (`fetchPublic`) so the static-rendered HTML can re-hydrate with fresh data even when the SSR fetch returned null
6. `ClientHome` reads `homepageState.blocks`. If non-empty, it renders the `Hero` block first, then walks the remaining blocks and looks each `__component` up in `BLOCK_MAP`; unknown blocks log `console.warn` and render nothing. If `blocks` is empty, it falls back to a hard-coded layout sequence
7. Each organism receives `data` (its block payload) plus the shared `{ directions, courses, faqs, reviews, team, consultationTypes }` context

**Course detail render:**
1. `src/app/courses/[slug]/page.jsx` reads `params.slug` (awaited — Next 16 params are async)
2. `getCourseBySlug(slug)` issues a single Strapi `GET /api/courses?filters[slug][$eq]=...` with 14 indexed populate params
3. Returns the first item or `null`; `null` triggers `notFound()`
4. `generateMetadata` runs the same fetch to build `<title>` and meta description
5. `CoursePageClient` (client component) renders the page

**Form submission flow:**
1. A client form (e.g. inside `EnrollModal`, `ContactBlock`, `Hero`) calls the server action exported from `src/lib/submitContact.js`
2. In `NODE_ENV=development` the action just `console.log`s and returns `true`
3. In production it fires Telegram and AmoCRM requests in parallel (fire-and-forget) and returns `true` immediately

**State Management:**
- No global store. Each client component owns its `useState`. Cross-component data is passed through props (`sharedData` spread in `ClientHome.jsx`).
- The CMS is the single source of truth; client state is just a mirror that the post-mount refetch updates.

## Key Abstractions

**`fetchStrapi(path, params)`** — `src/lib/strapi.js`
- Purpose: single point of contact with Strapi REST
- Behavior: builds URL, logs the request, returns `json.data` on `res.ok` or `null` (and logs) on any failure
- Pattern: every named export (`getHomepage`, `getCourses`, etc.) is a thin wrapper that supplies the path and populate params
- Important: never throws — callers must check for `null`

**`BLOCK_MAP`** — `src/app/ClientHome.jsx`
- Purpose: maps Strapi `__component` strings to React components, enabling editorial reordering of homepage sections from the CMS
- Current entries: `blocks.top-banner`, `blocks.hero`, `blocks.directions-grid`, `blocks.directions`, `blocks.pink-banner`, `blocks.about`, `blocks.featured-course`, `blocks.courses-catalog`, `blocks.reviews-section`, `blocks.cta-section`, `blocks.faq-section`, `blocks.trust-block`, `blocks.consultations-section`, `blocks.contact-section`, `blocks.team-section`
- To add a new block: create the organism, import it in `ClientHome.jsx`, add a `BLOCK_MAP` entry, and create the matching Strapi component

**`AnimatedSection`** — `src/components/atoms/AnimatedSection.jsx`
- Purpose: scroll-fade wrapper used by sections that don't roll their own framer-motion animation
- Pattern: `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` and 0.6s ease-out

## Entry Points

**`src/app/layout.jsx`:**
- Location: `src/app/layout.jsx`
- Triggers: every request (root layout)
- Responsibilities: HTML shell, font loading, global CSS import (`./globals.css`)

**`src/app/page.jsx`:**
- Location: `src/app/page.jsx`
- Triggers: GET `/`
- Responsibilities: parallel CMS fetch, hand off to `ClientHome`

**`src/app/courses/[slug]/page.jsx`:**
- Location: `src/app/courses/[slug]/page.jsx`
- Triggers: GET `/courses/<slug>`
- Responsibilities: fetch course by slug, 404 on miss, generate metadata, render `CoursePageClient`

**Server entrypoint (production):**
- `node server.js` (the Next standalone build artifact, run from the runner stage of `Dockerfile`)

## Error Handling

**Strategy:** Defensive nulls instead of exceptions. Every external call returns `null`/`false`/`0` on failure and logs to `console.error`. Callers default to empty arrays (`directions || []`).

**Patterns:**
- `fetchStrapi` swallows non-2xx and network errors, returns `null`
- Page components: `if (!course) notFound()`
- `ClientHome.jsx` post-mount refetch wraps everything in a single try/catch and only updates state on success
- `submitContact.js` returns `true` even when Telegram or AmoCRM fail (fire-and-forget, with internal try/catches)

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` only. Strapi calls log `[strapi] fetching:`, `[strapi] ok:`, `[strapi] error:`, `[strapi] exception:`.

**Validation:** None on incoming Strapi data. The client trusts the CMS shape and uses optional chaining (`data?.title`, `Array.isArray(data?.list)`) and `||` defaults to absorb missing fields.

**Authentication:** None — public marketing site.

---

*Architecture analysis: 2026-04-07*
