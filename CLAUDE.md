# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) website for a psychology school, featuring:
- **Headless CMS**: Strapi 5 backend for content management
- **Dynamic Zones**: Homepage layout defined via Strapi "blocks" system
- **Static Generation**: Course detail pages use `generateStaticParams`
- **Docker Deployment**: Standalone build deployed via GitHub Actions to Coolify

## Development Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Build & Production
npm run build            # Production build (creates standalone output)
npm start               # Run production build locally

# Linting
npm run lint            # Run ESLint (ignored during builds in CI)
```

## Architecture

### Pages & Routing

**Homepage** (`src/app/page.jsx`):
- Server component that fetches all data in parallel from Strapi
- Passes data to `ClientHome.jsx` for rendering
- Fetches: homepage blocks, directions, courses, FAQs, reviews, team

**Course Detail Pages** (`src/app/courses/[slug]/page.jsx`):
- Dynamic route with static generation via `generateStaticParams`
- Fetches single course with all relations populated
- Returns 404 if course not found

### Strapi Integration (`src/lib/strapi.js`)

All API calls go through `fetchStrapi()`:
- Base URL: `NEXT_PUBLIC_STRAPI_URL` (default: https://luciastrapi.kpstn.ru)
- Auth: `STRAPI_TOKEN` env var (optional, only needed for private content)
- Caching: 60s ISR revalidation
- **Strapi 5 populate format**: Uses indexed array params like `populate[0]=seo&populate[1]=blocks`

Available API functions:
- `getHomepage()` - Homepage with SEO and blocks
- `getDirections()` - All directions, sorted by order
- `getCourses()` - All courses with direction, tariffs, image, author
- `getCourseBySlug(slug)` - Single course with full relations
- `getFaqs()`, `getReviews()`, `getTeamMembers()` - Supporting content

### Dynamic Blocks System (`src/app/ClientHome.jsx`)

The homepage can be rendered two ways:

1. **Dynamic (Strapi-driven)**: When `homepage.blocks` exists, maps Strapi components to React components via `BLOCK_MAP`
2. **Fallback (Static)**: Hardcoded layout when no Strapi data

Block mapping (`__component` → React component):
- `blocks.top-banner` → `TopBanner`
- `blocks.hero` → `Hero`
- `blocks.directions-grid` → `Directions`
- `blocks.pink-banner` → `PinkBanner`
- `blocks.about` → `About`
- `blocks.featured-course` → `FeaturedCourse`
- `blocks.courses-catalog` → `Courses`
- `blocks.reviews-section` → `Reviews`
- `blocks.cta-section` → `Cta`
- `blocks.faq-section` → `Faq`

Shared data context (`directions`, `courses`, `faqs`, `reviews`, `team`) is passed to all blocks.

### Component Structure

**Atomic Design Pattern**:
- `src/components/atoms/` - Reusable primitives (AnimatedSection, DecorativeShapes)
- `src/components/organisms/` - Complex sections (Hero, Header, Footer, etc.)

**Styling**:
- SASS modules (`.module.sass`) per component
- Global styles in `src/app/globals.css`

**Animations**:
- Framer Motion for scroll animations
- `AnimatedSection` wrapper provides fade-in on scroll with viewport detection

## Environment Variables

Required:
- `NEXT_PUBLIC_STRAPI_URL` - Strapi API base URL (public, client-side accessible)

Optional:
- `STRAPI_TOKEN` - Auth token for private Strapi content

## Docker & Deployment

**Build Configuration** (`next.config.js`):
- `output: 'standalone'` - Required for Docker deployment
- ESLint disabled during builds
- Image domains: unsplash.com, placeholder.com, luciastrapi.kpstn.ru, cdn.kpstn.ru, s3.kpstn.ru

**CI/CD Pipeline** (`.github/workflows/ci-cd.yml`):
1. Lint and build check on all PRs
2. On push to `main`: Build Docker image → Push to ghcr.io → Trigger Coolify deployment
3. Uses Node 22, GitHub Container Registry, and Coolify webhook

**Dockerfile**:
- Multi-stage build (deps → builder → runner)
- Production-only dependencies
- Runs as non-root user (nextjs:nodejs)
- Serves on port 3000 via `node server.js`

## Key Implementation Notes

**Strapi 5 Migration**:
- Populate syntax changed from nested objects to indexed array params
- Example: `populate[0]=field1&populate[1]=field2` instead of `populate=*`

**Server vs Client Components**:
- Page routes are server components for data fetching
- `ClientHome` and organisms use `'use client'` for interactivity/animations
- Data flows from server → client components via props

**Static Generation**:
- Course pages use `generateStaticParams` to pre-render all courses at build time
- Metadata generated dynamically via `generateMetadata` function
