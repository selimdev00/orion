# Orion - Space Launches Explorer

A small Next.js 14 web app that lets you browse, search and filter every SpaceX
launch. Animated landing page, a filterable launch list, and a detail view for
each mission with rocket specs, links and a photo gallery.

Built as a portfolio piece focused on the App Router, React Server Components,
and a set of lightweight CSS / SVG animations.

## Stack

- **Next.js 14** (App Router, pinned to `14.2.x`) + **React 18**
- **TypeScript** (strict mode)
- **SCSS modules** (`*.module.scss`) plus a global `src/app/globals.scss` for
  design tokens and reset
- **No Tailwind, no CSS framework, no UI kit** - everything is hand-written
  SCSS using CSS custom properties as the token layer
- ESLint (`eslint-config-next`) + Prettier

## Data source

Public **SpaceX API v4** (`https://api.spacexdata.com/v4`) - no API key
required. Data is fetched in Server Components with Next.js ISR
(`next: { revalidate: 3600 }`), so pages render as static-ish HTML and refresh
hourly. The list page uses the `POST /launches/query` endpoint for server-side
search, filtering and pagination.

Orion is an independent project and is not affiliated with SpaceX.

## Routes

| Route             | Type    | What it does                                                                                |
| ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| `/`               | Static  | Animated landing: SVG starfield + orbit, intro steps, latest launch, count-up stats         |
| `/launches`       | Dynamic | Launch grid; search / status / year filters + pagination, all in the URL                    |
| `/launches/[id]`  | SSG     | Mission detail: patch, rocket, links, failures, Flickr gallery; dynamic metadata, 12 recent ids pre-rendered |

Each route segment ships its own `loading.tsx` (shimmer skeletons) and error /
not-found handling.

## Animations

CSS keyframes and SVG drive all motion - twinkling starfield, rotating orbit
rings with a satellite on an `animateMotion` path, scroll-reveal fade/slide
(custom IntersectionObserver hook), SVG path-draw connector, count-up stats,
card hovers and loading shimmers. Everything is guarded by
`prefers-reduced-motion`.

## Getting started

```bash
npm install      # Node 22
npm run build    # production build (exercises generateStaticParams + RSC fetches)
npm run start    # serve the production build
npm run lint     # eslint
npm run format   # prettier --write
```

> Note: the project is verified with `npm run build`.

## Project structure

```
src/
  app/
    layout.tsx            # root layout: header + footer shell
    page.tsx              # landing page (RSC)
    launches/
      page.tsx            # list (reads searchParams, POST /launches/query)
      loading.tsx         # skeleton grid
      error.tsx           # error boundary with retry
      [id]/
        page.tsx          # detail + generateMetadata + generateStaticParams
        loading.tsx
        not-found.tsx
  components/
    landing/              # Hero, Starfield, Orbit, IntroSteps, LatestLaunch, Stats, CountUp
    launches/             # Filters, Pagination, Gallery
    Header / Footer / LaunchCard / StatusBadge / Reveal
  hooks/useReveal.ts      # IntersectionObserver scroll-reveal
  lib/
    spacex.ts             # typed SpaceX API client + interfaces
    format.ts             # date helpers
```
