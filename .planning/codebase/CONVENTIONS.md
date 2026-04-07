# Coding Conventions

**Analysis Date:** 2026-04-07

## Naming Patterns

**Files:**
- React components: `PascalCase.jsx` (e.g. `Hero.jsx`, `AnimatedSection.jsx`, `EnrollModal.jsx`)
- SASS modules: `<Component>.module.sass`, co-located with the JSX
- Lib helpers: `camelCase.js` (e.g. `strapi.js`, `submitContact.js`)
- Route segments: lowercase (`courses/`, `privacy/`, `[slug]/`)

**Functions:**
- React components: `PascalCase`, default export per file (`export default function Hero(...)` or arrow assigned to const)
- Helpers / utilities: `camelCase` (`fetchStrapi`, `getCourseBySlug`, `preparePhone`, `escapeMarkdown`)
- Server actions: `camelCase` default export (`submitContact`)

**Variables:**
- `camelCase` for locals, props, and state (`subtitleIdx`, `consultationTypesState`, `formattedPhone`)
- `UPPER_SNAKE_CASE` for module-level constants (`STRAPI_URL`, `STRAPI_PUBLIC_URL`, `BLOCK_MAP`, `DEFAULT_SUBTITLES`, `DEFAULT_BUTTONS`)

**Types:**
- No TypeScript. Component prop "types" are documented implicitly through default values and `data?.field` access.

**SASS classes:**
- `camelCase` class names inside `.module.sass`, accessed via `s.className` (e.g. `s.btnPrimary`, `s.videoBgMedia`, `s.inner`)

## Code Style

**Formatting:**
- No Prettier config detected. Indentation is 2 spaces (JS) and SASS-style indentation in `.sass` files (no braces, no semicolons).
- No trailing semicolons in most JS files (e.g. `src/lib/strapi.js`, `src/app/page.jsx`). Match the surrounding file when editing.
- Single quotes for strings throughout.

**Linting:**
- `.eslintrc.json` extends `next/core-web-vitals`
- Three rules explicitly downgraded from error to **warning**:
  - `react/no-unescaped-entities`
  - `react/jsx-no-comment-textnodes`
  - `@next/next/no-img-element`
- ESLint is **disabled during builds** via `next.config.js` (`eslint.ignoreDuringBuilds: true`). CI runs `npm run lint || true` (failures don't block the pipeline).

## Import Organization

**Order observed across `src/app/ClientHome.jsx`, `src/components/organisms/Hero/Hero.jsx`:**
1. React / Next built-ins (`'use client'` directive first when present)
2. Third-party libraries (`framer-motion`, `react-icons`)
3. Internal modules via `@/` alias (`@/components/atoms/...`, `@/components/organisms/...`, `@/lib/strapi`)
4. Co-located styles imported as `s` (`import s from './Hero.module.sass'`)

**Path Aliases:**
- `@/*` → `./src/*` (defined in `jsconfig.json`)
- Always prefer the alias over relative paths that climb out of the current folder

## Error Handling

**Patterns:**
- External calls return sentinel values, never throw. See `src/lib/strapi.js`: `try { ... return json.data } catch { return null }`.
- Page-level: `if (!course) notFound()` (`src/app/courses/[slug]/page.jsx`)
- Page props default to empty arrays at the boundary: `directions={directions || []}` (`src/app/page.jsx`)
- Client components defensively coerce: `Array.isArray(data?.list) && data.list.length > 0`
- Server actions catch internally and return `true`/`false` or `0` (`src/lib/submitContact.js` — Telegram and AmoCRM are fire-and-forget)

**Rule of thumb when adding code:** never let a Strapi or third-party failure break rendering. Always provide a fallback shape.

## Logging

**Framework:** `console` only. No logger library.

**Patterns:**
- Structured prefixes for traceability: `console.log('[strapi] fetching: ...')`, `console.error('[strapi] error: ...')` in `src/lib/strapi.js`
- Server-action errors: `console.error('AmoCRM lead error:', err)` in `src/lib/submitContact.js`
- Client-side fallback failures: `console.error('ClientHome public fallback failed', error)` in `src/app/ClientHome.jsx`
- Unknown block types in `BLOCK_MAP`: `console.warn('Unknown homepage block: ...')`

When adding new logs in `src/lib/`, prefix with `[<module>]` and keep them short.

## Comments

**When to comment:**
- Section dividers using `// ─── Telegram ─────` style in `src/lib/submitContact.js`
- Clarifying intent next to non-obvious branches (`// Rotating subtitles — only when no description and no tags`, `Hero.jsx`)
- TODO markers for known unfinished work (currently only one — `EnrollModal.jsx:60`)

**JSDoc/TSDoc:**
- Not used in `src/`. The only `@type` annotation is the `/** @type {import('next').NextConfig} */` line in `next.config.js`.

## Function Design

**Size:** Most helpers in `src/lib/strapi.js` are 3–5 lines. Components run 50–250 lines and are kept in a single file with their `.module.sass`.

**Parameters:**
- React components take a single `props` object, frequently destructured with defaults: `function Hero({ data } = {}) { ... }` (`Hero.jsx`)
- Lib helpers take an options object for >2 params (e.g. `submitContact({ name, phone, message, quizAnswers })`)

**Return values:**
- Strapi helpers: the unwrapped `data` field, or `null`
- Server actions: `boolean` indicating "accepted" (not "succeeded" — see `submitContact.js`)
- Components: JSX

## Module Design

**Exports:**
- Components: default export per file (`export default function ComponentName`)
- Lib modules: named exports for helpers (`export async function getHomepage(...)`), with the occasional `export { STRAPI_URL }` for shared constants
- Server actions: default export with the `'use server'` directive at the top of the file

**Barrel files:**
- None. Every import targets the concrete file (`@/components/organisms/Hero/Hero`).

## Styling Conventions

**SASS modules:**
- Indented `.sass` syntax (no braces / no semicolons)
- One module per component, co-located
- Class names are `camelCase` and consumed as `s.className`
- Free to use raw CSS variables from `globals.css` (`color: var(--text-dark)`) — these are the design tokens

**Design tokens (`src/app/globals.css`):**
- All colors, spacing, radii, and font stacks are exposed as CSS custom properties on `:root`
- Token categories: `--font-*`, `--bg-*`, `--text-*`, `--accent-*`, `--btn-*`, `--badge-*`, `--tag-*`, `--tab-*`
- Current core palette is brown/cream — `--bg-body: #F7E7DE`, `--text-dark: #25140C`, `--accent-orange: #744C32`, `--accent-primary: #744C32`
- Fonts: `--font-sans: 'Onest'`, `--font-heading: 'Bona Nova'` (loaded from Google Fonts in `globals.css`)
- When adding new colors or sizes, **add a token first**, then reference it in the SASS module — never hard-code hex values in component styles

**Animation conventions:**
- Use `AnimatedSection` (`src/components/atoms/AnimatedSection.jsx`) for plain scroll-fade entrances
- For richer choreography, import `motion` directly from `framer-motion` in the organism (see `Hero.jsx`)
- Standard fade-in: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-50px' }}`, `transition={{ duration: 0.6, ease: 'easeOut' }}`
- Always set `viewport={{ once: true }}` so animations don't replay on scroll back

## Server vs Client Components

- Route files (`page.jsx`, `layout.jsx`) are **server** by default — fetch data, no `'use client'`
- Anything that uses state, effects, framer-motion, or browser APIs declares `'use client'` at the top
- Pattern: server `page.jsx` does the data fetch and forwards everything to a sibling client component (`ClientHome.jsx`, `CoursePageClient.jsx`)

---

*Convention analysis: 2026-04-07*
