# Testing Patterns

**Analysis Date:** 2026-04-07

## Test Framework

**Runner:**
- Not detected. There is no Jest, Vitest, Playwright, Cypress, or Testing Library installation.
- `package.json` has no `test` script. Only `dev`, `build`, `start`, `lint`.

**Assertion Library:**
- Not applicable.

**Run Commands:**
```bash
# No tests exist. The closest "verification" steps are:
npm run lint    # ESLint via next/core-web-vitals (warnings only, never blocks)
npm run build   # Type-of-truth: a successful Next build is the de-facto smoke test
```

## Test File Organization

**Location:**
- None. There are no `*.test.*`, `*.spec.*`, `__tests__/`, `tests/`, or `cypress/` directories anywhere under `src/`.

**Naming:**
- Not applicable.

## Test Structure

Not applicable — no tests in the repository.

## Mocking

Not applicable.

## Fixtures and Factories

**Test Data:**
- No fixture files. The closest analogues are the inline `DEFAULT_*` constants used as fallbacks when Strapi data is missing — see `DEFAULT_SUBTITLES` and `DEFAULT_BUTTONS` in `src/components/organisms/Hero/Hero.jsx`.

## Coverage

**Requirements:** None enforced. CI does not measure coverage.

**View Coverage:**
- Not available.

## Test Types

**Unit Tests:** Not present.

**Integration Tests:** Not present.

**E2E Tests:** Not present. (The unrelated `claude-talk-to-figma-mcp/` vendored directory has its own `tests/` folder, but it is not part of the Next.js application and should be ignored when assessing this project's test posture.)

## What "Verification" Looks Like Today

In the absence of automated tests, regressions are caught by:

1. **Local manual smoke** — `npm run dev` and click through the homepage and a course page (`/courses/<slug>`) against the live Strapi.
2. **`npm run build`** — exercises the App Router data fetching for every static-eligible route. Runtime exceptions during `getCourseBySlug` or `BLOCK_MAP` resolution will surface here. Note: ESLint is silenced during build (`next.config.js`).
3. **Coolify deploy** — production sanity check after CI pushes the image.

## Recommended Conventions if Tests Are Introduced

These are not in place yet — they are guidance for any future phase that adds testing:

- **Runner:** Vitest (lighter, ESM-native, plays well with Next 16 + JSX)
- **Component tests:** React Testing Library, co-locate as `<Component>.test.jsx` next to the component
- **Strapi mocking:** stub `src/lib/strapi.js` with `vi.mock('@/lib/strapi', ...)` returning fixture payloads — never hit the real CMS in tests
- **E2E:** Playwright against `npm run build && npm start` for the homepage block dispatcher (`ClientHome.jsx`) and the course detail route
- **Coverage target:** focus on `src/lib/` (pure logic) first; presentation organisms can rely on visual review

---

*Testing analysis: 2026-04-07*
