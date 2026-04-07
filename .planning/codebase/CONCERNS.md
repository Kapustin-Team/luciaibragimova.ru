# Codebase Concerns

**Analysis Date:** 2026-04-07

## Tech Debt

**No caching despite docs claiming ISR:**
- Issue: `CLAUDE.md` documents "60s ISR revalidation", but `src/lib/strapi.js` calls `fetch(..., { cache: 'no-store' })` and both `src/app/page.jsx` and `src/app/courses/[slug]/page.jsx` set `export const dynamic = 'force-dynamic'`. Every request hits Strapi.
- Files: `src/lib/strapi.js`, `src/app/page.jsx`, `src/app/courses/[slug]/page.jsx`, `CLAUDE.md`
- Impact: Higher CMS load, slower TTFB, no edge caching wins. Strapi outage = site outage.
- Fix approach: Decide intentionally — either restore `next: { revalidate: 60 }` on `fetchStrapi` and drop `force-dynamic`, or update `CLAUDE.md` to reflect the current SSR-on-every-request reality.

**Double fetch of every CMS endpoint on the homepage:**
- Issue: `src/app/page.jsx` (server) fetches all 7 endpoints in parallel, then `src/app/ClientHome.jsx` re-fetches the exact same 7 endpoints in a `useEffect` after mount as a "fallback" (`fetchPublic`).
- Files: `src/app/ClientHome.jsx` (lines ~25–91)
- Impact: 2× the requests per page view, doubled Strapi load, brief content flash if the second fetch returns slightly different data, wasted bandwidth on every visitor.
- Fix approach: Either remove the client refetch entirely (server fetch is already authoritative) or only run it when the SSR pass returned `null` for that specific endpoint.

**ESLint silenced everywhere:**
- Issue: `next.config.js` sets `eslint.ignoreDuringBuilds: true`, and CI runs `npm run lint || true`, so lint errors never block anything. Three rules are also explicitly downgraded to warnings in `.eslintrc.json` (`react/no-unescaped-entities`, `react/jsx-no-comment-textnodes`, `@next/next/no-img-element`).
- Files: `next.config.js`, `.github/workflows/ci-cd.yml`, `.eslintrc.json`
- Impact: Quality regressions accumulate silently. Image best-practice warnings (raw `<img>` instead of `next/image`) get ignored.
- Fix approach: Remove `|| true` from CI lint, fix the existing warnings, then enable `ignoreDuringBuilds: false`.

**Strapi response shape is trusted everywhere:**
- Issue: Components reach into deeply nested Strapi payloads (`data?.list`, `data?.ctaPrimaryLink`, `course.shortDescription`) without any validation. A schema rename in Strapi silently produces empty UI sections.
- Files: `src/components/organisms/Hero/Hero.jsx`, `src/app/courses/[slug]/CoursePageClient.jsx`, most organisms
- Impact: Editorial breakage is invisible until someone notices a blank section in production.
- Fix approach: Introduce a thin Zod (or hand-rolled) validator in `src/lib/strapi.js` per endpoint and `console.warn` on shape mismatches.

**TODO marker in production code:**
- Issue: `EnrollModal.jsx:60` contains `// TODO: send to API / email / CRM`.
- Files: `src/components/organisms/EnrollModal/EnrollModal.jsx`
- Impact: Enroll-modal submissions may be silently dropped, depending on what the surrounding code does. Needs verification.
- Fix approach: Either wire it to `submitContact()` (the existing server action) or remove the form if it's unused.

## Known Bugs

None confirmed during this pass. Worth verifying:
- Whether `EnrollModal` actually persists submissions (see TODO above).
- Whether `STRAPI_TOKEN` is supposed to be wired into `fetchStrapi()` — `CLAUDE.md` mentions it but `src/lib/strapi.js` ignores it.

## Security Considerations

**Unchecked outbound calls in a server action with user input:**
- Risk: `src/lib/submitContact.js` accepts `name`, `phone`, `message`, `quizAnswers` from the client and forwards them to Telegram and AmoCRM. There is no length cap, no rate limit, no CAPTCHA, no honeypot.
- Files: `src/lib/submitContact.js`, all forms calling it (`ContactBlock`, `EnrollModal`, `Hero`, etc.)
- Current mitigation: Markdown escaping for Telegram (`escapeMarkdown`), phone normalization (`preparePhone`). That's it.
- Recommendations: Add server-side input length limits, a honeypot field, basic rate limiting (per-IP), and ideally a hCaptcha/Turnstile check before the action runs. Also drop or truncate `quizAnswers` to a reasonable size.

**Forwarded `ip: '127.0.0.1'` to AmoCRM:**
- Risk: The AmoCRM unsorted-form payload hard-codes `ip: '127.0.0.1'` instead of the real client IP. Cosmetic for now, but AmoCRM anti-spam tooling will be useless and analytics will be wrong.
- Files: `src/lib/submitContact.js` (`createAmoCRMLead`)
- Current mitigation: None.
- Recommendations: Read the request IP from `headers()` (Next 16 server action) and pass it through.

**Public env var exposure:**
- Risk: `NEXT_PUBLIC_STRAPI_URL` is intentionally public, but it discloses the CMS host (`luciastrapi.kpstn.ru`) in the client bundle. The Strapi instance is therefore directly addressable from the browser.
- Files: `src/lib/strapi.js`, `src/app/ClientHome.jsx`
- Current mitigation: Strapi presumably enforces its own auth/rate-limit on public endpoints.
- Recommendations: Confirm Strapi has rate limiting and that no private collections are reachable without an API token.

**Server logs include full request URLs:**
- Risk: `[strapi] fetching: <full URL with all query params>` (`src/lib/strapi.js`) ends up in container stdout. Any future filter param containing PII would leak.
- Mitigation today: filter params are static (no PII).
- Recommendation: drop the URL log to `[strapi] fetching: <path>` and keep query params behind a debug flag.

**`.env` file present in working tree:**
- Risk: A `.env` file exists in the repo root (and `.env.local`). They are gitignored (`.gitignore`), but the repo working copy has them. Be careful with `git add -A`.
- Mitigation: `.gitignore` covers `.env` and `.env.*`. `.mcp.json` is also gitignored.
- Recommendation: Never run `git add -A` from root; add specific files. Periodically `git ls-files | grep -i env` to confirm nothing snuck in.

## Performance Bottlenecks

**Doubled CMS round-trip on every homepage load:**
- Problem: See "Double fetch" under tech debt.
- Files: `src/app/ClientHome.jsx`
- Cause: SSR fetch + post-mount client refetch of the same 7 endpoints.
- Improvement path: Eliminate the fallback fetch unless the SSR response was null.

**`force-dynamic` everywhere:**
- Problem: Every page render hits Strapi. No edge cache, no Next data cache.
- Files: `src/app/page.jsx`, `src/app/courses/[slug]/page.jsx`
- Cause: Explicit `dynamic = 'force-dynamic'` plus `cache: 'no-store'` in `fetchStrapi`.
- Improvement path: Use `revalidate` (e.g. `next: { revalidate: 60 }`) and `generateStaticParams` for `/courses/[slug]` to pre-render the catalog at build time as `CLAUDE.md` claims is already done.

**Raw `<img>` instead of `next/image`:**
- Problem: `@next/next/no-img-element` is downgraded to a warning. Some components likely use raw `<img>`, missing automatic resizing/lazy loading.
- Files: anywhere `eslint-disable` for that rule isn't set — needs a `grep -rn '<img ' src/` audit.
- Improvement path: Migrate to `next/image` (`next.config.js` already lists Strapi/CDN hosts in `remotePatterns`).

**Self-hosted Google Fonts via runtime `@import`:**
- Problem: `src/app/globals.css` starts with `@import url('https://fonts.googleapis.com/...')`. This is a render-blocking external request and skips the Next.js font optimization pipeline.
- Files: `src/app/globals.css`
- Cause: Manual CSS import.
- Improvement path: Switch to `next/font/google` in `src/app/layout.jsx` (already imports `globals.css`) so fonts are self-hosted, preloaded, and CLS-free.

## Fragile Areas

**`BLOCK_MAP` silently drops unknown components:**
- Files: `src/app/ClientHome.jsx` (lines ~32–48 and the `if (!Component)` branch)
- Why fragile: Any Strapi block with a `__component` value not in `BLOCK_MAP` renders nothing and only emits `console.warn`. Editors get a "missing section" with no surface signal.
- Safe modification: When adding a new Strapi block, update `BLOCK_MAP` in the same PR. When renaming a block in Strapi, grep for the old key in `src/app/ClientHome.jsx` first.
- Test coverage: None.

**`Hero.jsx` is the most complex client component:**
- Files: `src/components/organisms/Hero/Hero.jsx` (~250 lines, Strapi data + scroll choreography + rotating subtitle interval)
- Why fragile: Multiple interacting effects (subtitle timer, framer-motion `useScroll`/`useTransform`, conditional CTA selection). Easy to break by tweaking one branch.
- Safe modification: Edit one concern at a time (data shape, animation, copy fallback). Leave the `DEFAULT_*` constants in place — they are the only fallback when Strapi is down.
- Test coverage: None.

**Server action fire-and-forget submissions:**
- Files: `src/lib/submitContact.js`
- Why fragile: Returns `true` immediately. If Telegram and AmoCRM both fail, the user sees a success state and the lead is gone.
- Safe modification: Don't change the return type to a Promise of the upstream calls without also updating every form's UI (currently they assume "success ⇒ thank-you state").
- Test coverage: None.

## Scaling Limits

**Strapi single point of failure:**
- Current capacity: One Strapi instance at `luciastrapi.kpstn.ru`. With `force-dynamic`, every request is a synchronous round-trip.
- Limit: When Strapi is slow or down, the entire site slows or breaks (no caching layer to absorb).
- Scaling path: Reintroduce Next data cache + revalidate, add a CDN in front of Coolify, and consider a static export of the content tree at build time for the marketing pages.

## Dependencies at Risk

**`next` 16.1.x + `react` 19.2.x:**
- Risk: Both are bleeding-edge majors. Some libraries (especially older third-parties) may not yet ship React 19-compatible types or peer ranges.
- Files: `package.json`
- Impact: Future `npm install` may surface peer warnings; some optimizations (Server Actions, async params) require care.
- Migration plan: Already on the latest — keep an eye on changelogs before bumping further. Pin minor versions in CI if reproducibility matters.

**`eslint-config-next@14.0.3` lagging behind Next 16:**
- Risk: ESLint config is locked to the Next 14 release line while the framework is on 16. Rule definitions may diverge.
- Files: `package.json`
- Impact: Lint coverage drift; missing new rules.
- Migration plan: Bump to a `15.x`/`16.x`-compatible release and re-run lint (will surface real issues currently masked by `|| true`).

**`agentation@^2.3.3`:**
- Risk: Listed in devDependencies with no source references. Unclear what it does or whether it's still needed.
- Files: `package.json`
- Migration plan: Confirm whether it's used by any tooling. If not, remove it.

## Missing Critical Features

**No automated tests of any kind:**
- Problem: Zero test coverage. Regressions are only caught by manual smoke or by a broken `next build`.
- Blocks: Confident refactors of `BLOCK_MAP`, `fetchStrapi`, `submitContact`, and any rename in Strapi schemas.
- See `TESTING.md` for the recommended starting point.

**No error monitoring:**
- Problem: Errors only land in Coolify container logs.
- Blocks: Knowing when prod is broken without watching the site manually.
- Recommendation: Add a lightweight client + server error tracker (Sentry or similar) and gate it on `NODE_ENV=production`.

**No analytics:**
- Problem: No GA, Plausible, Yandex.Metrica, or PostHog detected in `src/`. The site is a marketing/lead-capture funnel with no funnel data.
- Recommendation: Wire one in (Yandex.Metrica is the conventional choice for `.ru` audiences) and pipe key events (form submit, course click) through it.

## Test Coverage Gaps

**Everything:**
- What's not tested: All of `src/`. Highest-priority gaps are the modules where logic, not just markup, lives.
- Files: `src/lib/strapi.js`, `src/lib/submitContact.js`, `src/app/ClientHome.jsx` (BLOCK_MAP dispatch), `src/app/courses/[slug]/page.jsx`
- Risk: Any change to Strapi shapes, server-action signatures, or block keys can ship to production undetected.
- Priority: High for `src/lib/`; medium for the homepage dispatcher; low for individual organism markup.

---

*Concerns audit: 2026-04-07*
