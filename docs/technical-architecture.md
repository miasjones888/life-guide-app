# Technical Architecture — Field Guide to Yourself

**Project:** Field Guide to Yourself (Personal Life Guide PWA)
**User:** Mia (single user, mobile-first)
**Document Version:** 1.0
**Last Updated:** 2026-03-31

---

## Architecture Overview

Field Guide to Yourself is a **mobile-first Progressive Web App** built with Next.js 14 (App Router, SSG) and TypeScript. It is designed as a personal life guide for a single user with no backend, no authentication, and no external API dependencies in Phases 1–3. All content is typed TypeScript data, statically generated at build time, and served as cached assets. The app has three state layers: static content, computed time state, and ephemeral client-side state managed via localStorage and React hooks. It is deployed to Vercel and is installable on iPhone as a standalone PWA.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     iPhone / Mobile Browser                      │
│  (PWA installed from home screen OR mobile web browser)         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    Service Worker (Workbox)
                  Caching Strategy (offline first)
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                      Next.js 14 App Router                       │
│              (Statically Generated, SSR at build time)           │
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │  app/page.tsx │  │  app/guide/*   │  │  app/week      │     │
│  │  (Today View) │  │  (10 sections) │  │  (Weekly View) │     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
│         │                    │                    │              │
│         └────────┬───────────┴────────────────────┘              │
│                  │                                               │
│         ┌────────▼─────────┐                                    │
│         │  TypeScript      │                                    │
│         │  Content Files   │                                    │
│         │  (content/)      │                                    │
│         └──────────────────┘                                    │
│                  │                                               │
│         ┌────────▼──────────┐                                   │
│         │  React Components │                                   │
│         │  + Tailwind CSS   │                                   │
│         │  + Framer Motion  │                                   │
│         └────────┬──────────┘                                   │
└────────────────────┼────────────────────────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        │                           │
    ┌───▼────────┐         ┌────────▼──┐
    │  Static    │         │ localStorage
    │  HTML+CSS+JS         │ (checklist,
    │  (cached)  │         │  notes)
    └────────────┘         └───────────┘
        │
┌───────▼─────────────────────────────┐
│  Vercel Edge Network                │
│  (Cache invalidation on push)       │
└─────────────────────────────────────┘
```

---

## Technology Decisions

### Next.js 14 (App Router, SSG)

**What it is:**
A React meta-framework providing file-based routing, server components, and build-time static generation via the App Router.

**Why it was chosen:**
- SSG is ideal for content that doesn't change mid-session (all guides, routines, schedules are static)
- App Router supports parallel routes and layouts elegantly
- Zero runtime server cost (Vercel free tier)
- Excellent TypeScript support
- Integrated image optimization, font loading, and meta tags (next/font, next/image)
- Native PWA integration via next-pwa plugin
- Fast deployment cycles on Vercel

**Alternatives considered and rejected:**
- **Remix:** Heavier footprint, more API-heavy; overkill for a static site
- **Astro:** Good for static sites, but weaker React integration; chosen Next.js for component reusability and ecosystem
- **Create React App (CRA):** No built-in SSG; requires manual setup of static export; less flexible routing
- **SvelteKit:** Strong framework, but smaller TypeScript ecosystem for PWA plugins

---

### TypeScript 5.x (Strict Mode)

**What it is:**
Typed superset of JavaScript with strict type checking enabled at compiler level.

**Why it was chosen:**
- Catches data schema errors before runtime (critical for content reliability)
- Interfaces define the "contract" for all content files (RoutineStep, ScheduleBlock, etc.)
- IDE autocomplete and refactoring support accelerate development
- Self-documenting code reduces on-boarding friction
- Strict mode enforces no implicit `any`, exhaustive checks, and strict null checks

**Alternatives considered and rejected:**
- **JavaScript only:** No type safety; content errors would only surface at runtime
- **Flow (Facebook):** Smaller ecosystem; TypeScript is industry standard
- **Untyped content + JSDoc:** Harder to enforce at build time; less IDE support

---

### Tailwind CSS 3.x

**What it is:**
Utility-first CSS framework with a deep plugin system and design token configuration.

**Why it was chosen:**
- Mobile-first utility classes align with design-first approach
- Custom design tokens (colors, spacing, fonts) in tailwind.config.ts make theming simple
- Purgeable: only used CSS is bundled (performance)
- Responsive prefixes (sm:, md:, lg:) handle responsive layout without media query boilerplate
- Strong Framer Motion integration for animations

**Alternatives considered and rejected:**
- **Styled-components:** Runtime overhead; not suited for SSG
- **CSS Modules:** Requires component-level CSS; less discoverable utility approach
- **Sass + BEM:** Manual utility management; less ergonomic than Tailwind
- **Material-UI / Chakra UI:** Heavy component libraries; too prescriptive for a custom design

---

### Framer Motion 11.x

**What it is:**
A production-ready React animation library using transform-optimized keyframes and gesture support.

**Why it was chosen:**
- GPU-accelerated animations (transform, opacity) perform smoothly on mobile devices
- Declarative API fits React component model
- `motion.div` primitives compose well with Tailwind classes
- Built-in layout animations (expand/collapse cards, page transitions)
- Easy to tree-shake: only animate what is used in the build

**Alternatives considered and rejected:**
- **React Spring:** Steeper learning curve; physics-based animations less predictable for UI timing
- **CSS Animations:** No gesture support; harder to orchestrate complex sequences
- **D3 / Three.js:** Overkill for UI motion; designed for data visualization, not interface UX
- **Web Animations API:** Lower-level; requires more boilerplate

---

### JetBrains Mono + Inter (via next/font)

**What it is:**
Two open-source font families loaded via Next.js built-in font optimization, self-hosted at build time.

**Why it was chosen:**
- JetBrains Mono: monospace for code, schedule blocks, checklist display (readable at small sizes)
- Inter: humanist sans-serif for body text and headings (excellent mobile legibility)
- Loaded via `next/font` (not Google Fonts CDN) for offline-first PWA support
- Self-hosted means fonts are cached by service worker; available offline
- Zero cumulative layout shift (CLS): fonts are preloaded and embedded

**Alternatives considered and rejected:**
- **System fonts:** Limited design control; inconsistent across platforms
- **Variable fonts:** Smaller file size, but loader complexity; fixed weights are simpler
- **Google Fonts CDN:** Not available offline; violates PWA principle of offline resilience

---

### next-pwa 5.x (Workbox)

**What it is:**
A Next.js plugin wrapping Workbox (a service worker library) to enable offline-first caching and PWA installation.

**Why it was chosen:**
- Provides automated service worker generation from Next.js build manifest
- Workbox strategies (Cache First, Network First) are battle-tested
- Manifest configuration (name, icons, display mode) is standards-compliant
- Enables standalone app mode on iOS and Android (home screen installation)
- Handles caching of static assets, guide pages, and fonts automatically

**Alternatives considered and rejected:**
- **Manual Service Worker:** More control, but more boilerplate and debugging surface
- **PWA Builder:** Microsoft tool; less integrated with Next.js build pipeline
- **Firebase Hosting:** Not necessary for a static site; Vercel is cheaper and simpler

---

### Vercel Free Tier

**What it is:**
A serverless deployment platform optimized for Next.js with automatic caching and zero-downtime deploys.

**Why it was chosen:**
- Zero cost for Mia's personal project
- Built-in integration with Next.js; one-command deployment
- Automatic cache invalidation on push
- Edge network CDN for fast asset delivery globally
- Generous free tier: unlimited sites, bandwidth, requests
- Built-in HTTPS and environment variable management

**Alternatives considered and rejected:**
- **AWS S3 + CloudFront:** Cheaper at scale, but more operational overhead
- **Netlify:** Good alternative; Vercel has tighter Next.js integration
- **Self-hosted (home server):** No redundancy; requires static IP; Mia's broadband is unreliable
- **GitHub Pages:** No server-side rendering; static export possible but limits features

---

### pnpm ≥8

**What it is:**
A fast, disk-space-efficient package manager with strict dependency resolution.

**Why it was chosen:**
- Faster installs than npm/yarn (uses hardlinks and content-addressable storage)
- Strict dependency resolution prevents "phantom dependencies"
- Lock file (`pnpm-lock.yaml`) is human-readable and compact
- Excellent monorepo support (future-proofing, if needed)
- Wide adoption in React ecosystem

**Alternatives considered and rejected:**
- **npm:** Slower; npm7+ has improved, but pnpm is still faster
- **yarn:** Good choice, but pnpm's disk efficiency is superior for resource-constrained machines
- **Bun:** Emerging; ecosystem maturity not yet proven; Vitest/ESLint support is incomplete

---

### Node.js ≥20 LTS

**What it is:**
The JavaScript runtime used for build-time tooling (Next.js, TypeScript, Vitest, ESLint).

**Why it was chosen:**
- LTS (Long-Term Support) version provides stability for multi-year maintenance
- Node.js 20 includes native ES2024 features (modern async/await, top-level await)
- Excellent TypeScript tooling support via ts-node
- pnpm, Next.js, and Vitest all require Node.js ≥18; version 20 is latest stable LTS

**Alternatives considered and rejected:**
- **Deno:** Emerging; not necessary for a standard Node.js project; ecosystem is smaller
- **Bun:** Runtime is interesting, but tooling ecosystem is incomplete

---

### Vitest (Phase 2+)

**What it is:**
A fast unit test runner with Jest-compatible API and Vite integration.

**Why it was chosen:**
- Drop-in Jest replacement; familiar API for developers
- Faster test execution than Jest (direct TypeScript, no Babel overhead)
- Excellent IDE integration (debugging, code coverage)
- Tests for pure functions: `lib/schedule.ts` (getActiveBlock), `lib/date.ts` (getDayLabel, isToday, etc.)

**Alternatives considered and rejected:**
- **Jest:** Industry standard, but slower; overkill for a small codebase
- **Mocha + Chai:** Older; less integrated with modern tooling
- **No testing:** Risky for utility functions; core scheduling logic needs test coverage

---

### ESLint + Prettier + Husky

**What it is:**
- **ESLint:** Static code analyzer (rules, best practices)
- **Prettier:** Code formatter (consistent style)
- **Husky:** Git hooks manager (lint before commit)

**Why it was chosen:**
- ESLint (with eslint-config-next base) enforces React best practices and accessibility rules
- Prettier removes style debates; 2-space indentation, single quotes, trailing commas
- Husky prevents non-conforming code from being committed
- Together they create a lightweight CI/CD quality gate

**Alternatives considered and rejected:**
- **Prettier alone:** No linting; style only
- **TSLint (deprecated):** Obsolete; ESLint is the modern standard
- **No linting:** Code quality drift; inconsistent style makes refactoring harder

---

## Data Flow Architecture

```
┌──────────────────────────────────┐
│ Content Files (content/*.ts)     │
│ - Typed TypeScript objects       │
│ - Exported as const              │
│ - No imports at runtime          │
└────────────────┬─────────────────┘
                 │
         ┌───────▼──────────┐
         │ Build Time       │
         │ TypeScript       │
         │ Compilation      │
         └───────┬──────────┘
                 │
┌────────────────▼─────────────────┐
│ React Components                  │
│ - Import content as const         │
│ - Content becomes prop            │
│ - No API calls                    │
└────────────────┬─────────────────┘
                 │
         ┌───────▼──────────────┐
         │ Render to HTML       │
         │ (Next.js SSG)        │
         └───────┬──────────────┘
                 │
         ┌───────▼──────────────┐
         │ Static HTML + CSS    │
         │ + JS bundle          │
         └───────┬──────────────┘
                 │
┌────────────────▼─────────────────┐
│ Browser / Service Worker         │
│ - HTML hydrated by React         │
│ - Content is immutable (static)  │
│ - Client hooks drive interactivity
└──────────────────────────────────┘
```

**Key principle:** Content is immutable at runtime. All content decisions are made at build time, embedded in the static HTML. This eliminates API calls, loading states, and cache invalidation complexity.

---

## State Management Architecture

### 1. Static Content State
**Location:** `content/` directory
**Lifetime:** Build time → static HTML → runtime (immutable)
**Examples:** routines, schedule blocks, guide sections, projects
**Update mechanism:** Edit TypeScript file → rebuild → redeploy
**Scope:** App-wide; read-only in components

### 2. Computed Time State
**Location:** `hooks/useCurrentTime.ts`
**Lifetime:** Component mount → component unmount
**Examples:** current hour, day of week, "is it morning routine time?"
**Update mechanism:** setInterval (60-second tick)
**Scope:** Local to components that need it (Today view, schedule display)

### 3. Ephemeral Checklist State
**Location:** `hooks/useCheckList.ts`
**Lifetime:** Session (day-based)
**Examples:** checked routine steps, completed checklist items
**Reset:** When date changes (checked at component mount)
**Scope:** Local to checklist components
**Why ephemeral:** Checklists are action-oriented; new day = reset. No persistence needed.

### 4. Persistent localStorage State
**Location:** Browser `localStorage` (user's device only)
**Lifetime:** Indefinite (survives reload, app close)
**Examples:** AnchorTask (weekly focus item), ReflectionNote (free-form journaling)
**Key schema:**
```typescript
// AnchorTask: single persistent item
localStorage['mia:anchor-task'] = JSON.stringify({
  id: string
  label: string
  createdAt: ISO8601 date string
  completedAt?: ISO8601 date string
})

// ChecklistState: keyed by date, auto-resets
localStorage['mia:checklist:2026-03-31'] = JSON.stringify({
  itemId: boolean // true = checked
})

// ReflectionNote: single persistent note
localStorage['mia:reflection-note'] = string
```

**Safety:** localStorage scope is tied to origin (https://field-guide-to-yourself.vercel.app); not shared with other sites. No sensitive data stored.

---

## Rendering Strategy

### Why SSG is Correct for This App

**Static Site Generation (SSG) means:**
1. At build time, Next.js renders every route (/) to static HTML
2. That HTML is served as-is from Vercel's CDN (no server computation)
3. Service worker caches that HTML for offline access
4. No client-side data fetching; all content is embedded in the HTML

**Why this works:**
- Content (routines, guides, schedule) doesn't change during a user session
- No real-time data: calendar is hardcoded, not live-synced (Phase 1–3)
- Single user: no cross-device sync needed
- Offline requirement: PWA must work without network; SSG + service worker enables this

**What is rendered at build time:**
- All page routes: /, /guide, /guide/routines, /guide/rhythm, etc.
- All components: layouts, cards, headers
- All content: routines, schedule blocks, projects, checklists
- All styles: Tailwind CSS (purgeable; unused styles removed)

**What is client-rendered:**
- Time state: current hour, day label (computed by `useCurrentTime`)
- Checklist state: checked items (stored in `useCheckList`, optionally persisted in localStorage)
- Anchor task form: input and submission (stored in localStorage)
- Reflection notes: input field (stored in localStorage)

**No hydration mismatch** because:
- Static content (guides, routines) is identical on server and client
- Time-dependent content (current hour) is explicitly hydrated via `useEffect` (not rendered on server)
- Checklist state initializes empty, then populates from localStorage

---

## Performance Optimization Strategy

### Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| **FCP** (First Contentful Paint) | < 1.2s | SSG (no server delay); fonts preloaded; Vercel CDN |
| **LCP** (Largest Contentful Paint) | < 1.5s | Images lazy-loaded; CSS inlined for critical path |
| **TTI** (Time to Interactive) | < 2.0s | Minimal JS bundle; async script loading; Framer Motion tree-shaking |
| **JS bundle** (initial, gzipped) | < 150kb | Code splitting per route; unused CSS purged; next/dynamic for heavy components |
| **Total CSS** (all pages) | < 20kb | Tailwind CSS + custom tokens; no unused utilities |
| **Offline load** (cached) | < 0.5s | Service worker Cache First strategy; assets preloaded in manifest |

### Implementation Details

**1. Code Splitting:**
- Next.js App Router automatically splits code per route
- Heavy components (MonthlyChecklist, ProjectCard) use `next/dynamic` with SSR disabled
- Framer Motion is tree-shaken: only animate components are bundled

**2. CSS Optimization:**
- Tailwind CSS purges unused utilities based on component imports
- Custom design tokens (tailwind.config.ts) replace repetitive utility chains
- No runtime CSS-in-JS (styled-components); Tailwind is build-time only
- Critical CSS (above the fold) inlined in `<style>` tags in HTML `<head>`

**3. Font Optimization:**
- JetBrains Mono + Inter loaded via `next/font` (not CDN)
- Fonts are self-hosted (embedded in Next.js build) and cached by service worker
- Preload directives in `<head>` ensure fonts load before rendering
- No FOUT (Flash of Unstyled Text); fonts are guaranteed present

**4. Image Optimization:**
- Use `next/image` for responsive images and automatic format conversion
- Lazy-load below-fold images
- Serve WebP to browsers that support it; fallback to PNG/JPG
- Icons use SVG (inline or via `<img src="">` with caching)

**5. JavaScript Bundle:**
- Entry point is app/layout.tsx (React app bootstrap)
- Next.js automatically code-splits per route
- Hooks (`useCurrentTime`, `useCheckList`) are tree-shaken if unused
- Unused Tailwind utilities are purged at build time

**6. Service Worker Caching:**
- Static assets (JS, CSS, fonts): Cache First (30-day TTL)
- HTML pages: Network First, fallback to cache (always-fresh approach)
- Google Fonts: Cache First (long TTL; rarely updated)
- Index route (/): Cache then Network (hybrid approach)

**7. Measurement & Auditing:**
- Run Lighthouse CI at build time (target: 90+ on Performance, Accessibility)
- Use `next/speed-insights` for real-world Core Web Vitals
- Test on throttled network (4G) and low-end devices (iPhone SE)

---

## PWA Architecture

### Manifest (manifest.json)

```json
{
  "name": "Field Guide to Yourself",
  "short_name": "Field Guide",
  "description": "A personal life guide for organizing routines, goals, and daily reflections.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#F4F1EC",
  "theme_color": "#D4D0C8",
  "categories": ["productivity", "lifestyle"],
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/screenshot-540x720.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Key fields:**
- `display: "standalone"`: Hide browser UI; appear as native app on home screen
- `orientation: "portrait"`: Lock to portrait on mobile
- `theme_color`: Status bar color on Android
- `background_color`: Splash screen color during load
- `icons`: Multiple sizes for various platforms (Android, iOS, desktop)
- `maskable` icons: Safe zone for adaptive icons on modern Android

### Service Worker (Workbox)

**Generated by next-pwa at build time.** Configuration in next.config.ts:

```typescript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    // Static assets: Cache First (30-day TTL)
    {
      urlPattern: /^https:\/\/.*\.(js|css|woff2?)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: { maxAgeSeconds: 30 * 24 * 60 * 60 }
      }
    },
    // HTML pages: Network First with offline fallback
    {
      urlPattern: /^https:\/\/field-guide-to-yourself\.vercel\.app\/.*\.html$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-pages',
        expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 }
      }
    },
    // Google Fonts: Cache First (long TTL)
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxAgeSeconds: 365 * 24 * 60 * 60 }
      }
    }
  ]
});
```

### Caching Strategy Table

| Resource | Strategy | TTL | Rationale |
|----------|----------|-----|-----------|
| HTML pages (routes) | Network First | 7 days | Try fresh first; offline fallback |
| JS/CSS bundles | Cache First | 30 days | Immutable after build; cache long |
| Fonts (self-hosted) | Cache First | 30 days | Embedded in build; never change |
| Google Fonts CDN | Cache First | 365 days | External; rarely updated |
| Images | Cache First | 30 days | Static content; immutable |
| API calls (Phase 4+) | Network First | 5 min | Always try fresh; cache as fallback |

### Offline Behavior

**When offline:**
1. Service worker intercepts all requests
2. Cache is checked for matching resource
3. If found in cache: return cached version
4. If not in cache: show offline fallback (generic offline page or stale content)

**User experience:**
- All guide pages work offline (pre-cached at install)
- Today view works offline (time-based content)
- Schedule display works offline (time computed locally)
- Checklist state persists across reload (localStorage)
- Any page accessed once is cached for future offline use

**Offline page fallback:**
Create an offline.html in public/ that is served for uncached routes:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Field Guide — Offline</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>You're Offline</h1>
  <p>Some pages are available in your cache. Try navigating to a previously viewed page.</p>
  <a href="/">Go Home</a>
</body>
</html>
```

### iOS PWA Considerations

**Apple's PWA limitations (as of iOS 16+):**
- No service worker on iPad (only iPhone)
- Service worker persistence is limited (30 days of non-use → purge)
- Splash screen image must be 1024x1024 (portrait, 8-bit PNG)
- Status bar style via meta tag: `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
- Home screen icon must be 180x180 (non-transparent, no rounded corners; iOS will round them)

**Mitigation:**
- Add iOS-specific meta tags in app/layout.tsx:
```tsx
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Field Guide" />
<link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
```
- Test on real iPhone (simulator service worker behavior differs)
- Ensure offline fallback works (iOS service worker is less reliable)

---

## Repository Structure (Annotated)

```
life-guide/
│
├── app/                                    # Next.js App Router root
│   ├── layout.tsx                          # Root layout: fonts, metadata, PWA meta tags, nav shell
│   ├── page.tsx                            # Today view (route: /)
│   ├── error.tsx                           # Error boundary (client component)
│   ├── not-found.tsx                       # 404 page
│   ├── globals.css                         # Global styles, typography, CSS variables
│   │
│   ├── guide/                              # Guide section routes
│   │   ├── page.tsx                        # Guide index (route: /guide) — shows all 10 sections
│   │   ├── routines/page.tsx               # /guide/routines — morning & evening routines
│   │   ├── rhythm/page.tsx                 # /guide/rhythm — weekly rhythm & recurring events
│   │   ├── focus/page.tsx                  # /guide/focus — projects & creative sessions
│   │   ├── care/page.tsx                   # /guide/care — cat care, self-care routines
│   │   ├── body/page.tsx                   # /guide/body — physical practices (e.g., yoga schedule)
│   │   ├── home/page.tsx                   # /guide/home — home management (room reset, laundry)
│   │   ├── finance/page.tsx                # /guide/finance — monthly budget, bills, reorder checklist
│   │   ├── field/page.tsx                  # /guide/field — outside time, community events
│   │   ├── health/page.tsx                 # /guide/health — mental health check-ins
│   │   └── system/page.tsx                 # /guide/system — weekly reset, monthly review
│   │
│   └── week/page.tsx                       # /week — weekly overview & calendar
│
├── components/                             # React components organized by feature
│   │
│   ├── layout/                             # Layout & shell components
│   │   ├── PageShell.tsx                   # Wraps all pages: header, content, bottom nav
│   │   ├── BottomNav.tsx                   # Mobile bottom navigation (5 routes)
│   │   ├── SectionHeader.tsx               # Reusable page header: emoji, title, description
│   │   └── JournalSpread.tsx               # Desktop 2-column layout (Phase 3, optional)
│   │
│   ├── today/                              # Today view components
│   │   ├── TodayHeader.tsx                 # Day label, date, greeting
│   │   ├── ActiveBlock.tsx                 # Current/next schedule block display
│   │   ├── RoutineChecklist.tsx            # Morning/evening routine steps
│   │   ├── DaySummary.tsx                  # Summary of today's blocks & events
│   │   └── AnchorTask.tsx                  # Weekly focus task input & display
│   │
│   ├── guide/                              # Guide page components
│   │   ├── SectionCard.tsx                 # Card for each guide section on /guide index
│   │   ├── ContentEntry.tsx                # Expandable content entry (title, description, notes)
│   │   ├── CheckItem.tsx                   # Single checklist item (checkbox + label)
│   │   ├── TimeBlock.tsx                   # Schedule block display (time, emoji, title, description)
│   │   ├── WeekRow.tsx                     # Row for weekly recurring event (day + item)
│   │   ├── ProjectCard.tsx                 # Project status card (name, status, priority)
│   │   ├── CatCard.tsx                     # Cat info card (name, medications, care schedule)
│   │   ├── MonthlyChecklist.tsx            # Checklist for monthly admin tasks
│   │   └── NotepadPanel.tsx                # Persistent reflection notes panel
│   │
│   └── ui/                                 # Reusable UI primitives
│       ├── Typography.tsx                  # Text components (H1, H2, Body, Small, Mono)
│       ├── WindowPanel.tsx                 # Card/panel container (primary layout block)
│       ├── Rule.tsx                        # Horizontal divider line
│       ├── Tag.tsx                         # Status/category badge (colored, small)
│       ├── Expandable.tsx                  # Reveal/collapse toggle wrapper
│       ├── StatusBar.tsx                   # Time/date display bar
│       └── VisuallyHidden.tsx              # Screen reader only (a11y)
│
├── content/                                # Typed TypeScript content files
│   │
│   ├── types.ts                            # All TypeScript interfaces & type definitions
│   │
│   ├── daily/                              # Daily content
│   │   ├── morning-routine.ts              # Morning routine steps (RoutineStep[])
│   │   ├── evening-routine.ts              # Evening routine steps (RoutineStep[])
│   │   ├── schedule.ts                     # Daily schedule blocks (ScheduleBlock[])
│   │   └── check-ins.ts                    # Daily check-in prompts
│   │
│   ├── weekly/                             # Weekly content
│   │   ├── rhythm.ts                       # Weekly rhythm object (WeeklyRhythm)
│   │   └── recurring-events.ts             # Recurring weekly events (RecurringEvent[])
│   │
│   ├── monthly/                            # Monthly content
│   │   ├── finance.ts                      # Finance checklist (FinanceItem[])
│   │   └── admin.ts                        # Admin tasks (ChecklistItem[])
│   │
│   ├── care/                               # Care & wellness
│   │   ├── cats.ts                         # Cat info & care schedule (Cat[])
│   │   └── self-care.ts                    # Self-care routines
│   │
│   ├── focus/                              # Creative & focus
│   │   ├── projects.ts                     # Active projects (Project[])
│   │   └── creative-session.ts             # Creative session templates
│   │
│   ├── field/                              # Community & outside
│   │   ├── outside-time.ts                 # Outside activities & scheduling
│   │   └── community.ts                    # Community events & connection
│   │
│   ├── home/                               # Home management
│   │   ├── room-reset.ts                   # Room reset checklist
│   │   └── laundry.ts                      # Laundry schedule & checklist
│   │
│   ├── health/                             # Health & wellness
│   │   └── mental-health.ts                # Mental health check-in prompts
│   │
│   └── system/                             # System & review
│       ├── weekly-reset.ts                 # Weekly reset ritual
│       └── monthly-review.ts               # Monthly review prompts
│
├── styles/                                 # Global styles & design tokens
│   └── tokens.css                          # CSS variables, color palette, typography scale
│
├── hooks/                                  # Custom React hooks
│   ├── useCurrentTime.ts                   # Provides current hour, day label; updates every 60s
│   ├── useActiveBlock.ts                   # Computes active schedule block based on current time
│   ├── useDayOfWeek.ts                     # Returns day index (0=Sun, 1=Mon, etc.)
│   ├── useCheckList.ts                     # Ephemeral checklist state (per-day reset)
│   └── useLocalStorage.ts                  # Generic typed localStorage hook
│
├── lib/                                    # Utility functions (pure, testable)
│   ├── utils.ts                            # Generic utilities (classNameJoin, cn, etc.)
│   ├── date.ts                             # Date functions: getDayLabel, isToday, getMondayOfWeek, formatTime
│   └── schedule.ts                         # Schedule logic: getActiveBlock, isBlockActive, getNextBlock
│
├── animations/                             # Framer Motion animation configs
│   ├── variants.ts                         # Reusable animation variants (fade in, slide, scale)
│   ├── pageTransitions.ts                  # Page enter/exit animations
│   └── cardReveal.ts                       # Card expand/collapse animations
│
├── __tests__/                              # Unit & component tests (Phase 2+)
│   ├── lib/schedule.test.ts                # Tests for getActiveBlock, getNextBlock
│   ├── lib/date.test.ts                    # Tests for getDayLabel, isToday, etc.
│   └── components/CheckItem.test.tsx       # Component snapshot & interaction tests
│
├── public/                                 # Static assets
│   ├── icons/                              # PWA icons (192x192, 512x512, maskable, splash screen)
│   ├── manifest.json                       # PWA manifest
│   ├── og-image.png                        # Open Graph image (1200x630)
│   └── robots.txt                          # SEO
│
├── docs/                                   # Documentation
│   ├── technical-architecture.md           # This file
│   ├── data-schema.md                      # Content schema & TypeScript interfaces
│   ├── build-plan.md                       # Phased build roadmap & tasks
│   └── CONTENT-UPDATE-GUIDE.md             # How to edit content files (Phase 2)
│
├── .env.example                            # Example env vars (empty for Phase 1–3)
├── .eslintrc.json                          # ESLint config (next base rules)
├── .prettierrc                             # Prettier config (single quotes, 2-space indent)
├── .gitignore                              # Git ignore rules
├── tailwind.config.ts                      # Tailwind design tokens, plugins, extensions
├── next.config.ts                          # Next.js config (PWA plugin, image optimization)
├── tsconfig.json                           # TypeScript compiler config (strict mode)
├── vitest.config.ts                        # Vitest config (Phase 2+)
├── pnpm-lock.yaml                          # Locked dependency versions
├── package.json                            # Dependencies, scripts, metadata
├── README.md                               # Project overview & quick start
└── CHANGELOG.md                            # Version history & release notes
```

---

## Component Architecture

### Composition Pattern: WindowPanel Container

All content is wrapped in a `WindowPanel` — a reusable card/panel container providing consistent spacing, borders, and styling.

```tsx
// WindowPanel.tsx — the primary layout block
export function WindowPanel({
  children,
  className,
  aria-labelledby,
}: {
  children: React.ReactNode
  className?: string
  'aria-labelledby'?: string
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-300 bg-white p-4 shadow-sm',
        className
      )}
      aria-labelledby={aria-labelledby}
    >
      {children}
    </div>
  )
}

// Usage:
<WindowPanel>
  <Typography.H2>Morning Routine</Typography.H2>
  <RoutineChecklist items={routineSteps} />
</WindowPanel>
```

### Component Hierarchy

```
PageShell (wrapper for all routes)
├── SectionHeader (emoji, title, description)
├── [Route-specific content]
│   ├── WindowPanel
│   │   ├── ContentEntry / CheckItem / TimeBlock / ProjectCard
│   │   └── [nested children]
│   └── WindowPanel
│       └── NotepadPanel / MonthlyChecklist / [route-specific]
└── BottomNav (mobile navigation)
```

### Reusable Component Patterns

**1. Content Entry (expandable):**
```tsx
<ContentEntry
  emoji="🌅"
  title="Morning Routine"
  description="Start your day with intention"
  content={<RoutineChecklist items={routineSteps} />}
  expanded={false} // Can be toggled
/>
```

**2. Check Item (list item with checkbox):**
```tsx
<CheckItem
  id="step-1"
  label="Make bed"
  description="5 min"
  checked={checkedItems['step-1']}
  onChange={(checked) => handleCheck('step-1', checked)}
/>
```

**3. Time Block (schedule block display):**
```tsx
<TimeBlock
  emoji="📅"
  title="Deep Work"
  time="09:00 – 12:00"
  description="Focus time for projects"
  isActive={true}
/>
```

**4. Project Card (status badge + title + description):**
```tsx
<ProjectCard
  name="Website Redesign"
  status="active"
  priority="primary"
  description="Rebuild the home page with new design system"
/>
```

### Client vs. Server Components

- **Server Components (default):** Page routes, layout shells, static content display
- **Client Components:** Interactive components that need state or effects
  - Marked with `'use client'` directive
  - Examples: RoutineChecklist (useState for checked items), AnchorTask (form input), NotepadPanel (localStorage)

---

## Hook Architecture

### useCurrentTime
**Purpose:** Provides current hour, minute, day label. Updates every 60 seconds.
**Dependencies:** React (useEffect, useState)
**Return:**
```typescript
{
  hour: number        // 0–23
  minute: number      // 0–59
  dayLabel: string    // "Monday", "Today", "Tomorrow"
  dateString: string  // "Mar 31"
  isNow: boolean      // true if within current minute
}
```
**Usage:** Today view header, active block indicator, schedule display

### useActiveBlock
**Purpose:** Computes which schedule block is active now, or upcoming.
**Dependencies:** useCurrentTime, lib/schedule.ts (getActiveBlock function)
**Return:**
```typescript
{
  activeBlock: ScheduleBlock | null
  nextBlock: ScheduleBlock | null
  timeUntilNext: string  // "in 2 hours"
}
```
**Usage:** Today view, ActiveBlock component

### useDayOfWeek
**Purpose:** Returns numeric day of week (0=Sunday, 6=Saturday).
**Dependencies:** React (useState on mount)
**Return:**
```typescript
{
  dayIndex: number  // 0–6
  dayName: string   // "Monday"
}
```
**Usage:** Weekly rhythm display, recurring event filtering

### useCheckList
**Purpose:** Manages ephemeral checklist state (resets when date changes).
**Dependencies:** React (useState, useEffect), lib/date.ts (isToday)
**Return:**
```typescript
{
  checkedItems: Record<string, boolean>
  toggleItem: (id: string) => void
  isChecked: (id: string) => boolean
  reset: () => void  // manual reset (for testing)
}
```
**Usage:** Routine checklist, admin checklist, any interactive checkbox list

### useLocalStorage
**Purpose:** Generic hook for type-safe localStorage access.
**Dependencies:** React (useEffect, useState)
**Generic signature:**
```typescript
function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void]
```
**Usage:**
```typescript
const [anchorTask, setAnchorTask] = useLocalStorage<AnchorTask>(
  'mia:anchor-task',
  { id: '', label: '', createdAt: new Date().toISOString() }
)
```
**Used by:** AnchorTask component, NotepadPanel component

---

## Lib / Utility Architecture

### lib/utils.ts
**classNameJoin / cn (clsx wrapper):**
```typescript
function cn(...classes: (string | false | undefined)[]): string
```
**Purpose:** Conditionally join classNames (Tailwind utilities); replaces repetitive ternary logic.

**Example:**
```typescript
<div className={cn('p-4', isActive && 'bg-blue-100')}>
  Active Block
</div>
```

### lib/date.ts
**getDayLabel(date: Date): string**
- Returns "Today" if date is today
- Returns "Tomorrow" if date is tomorrow
- Returns day name ("Monday") otherwise

**isToday(date: Date): boolean**
- True if date is today

**getMondayOfWeek(date: Date): Date**
- Returns the Monday of the week containing date
- Used for weekly view, week calculations

**formatTime(hour: number, minute: number): string**
- Returns "HH:MM" format (24-hour)
- Example: formatTime(9, 30) → "09:30"

**getDayIndex(date: Date): number**
- Returns 0 (Sunday) to 6 (Saturday)

**addDays(date: Date, days: number): Date**
- Add/subtract days (positive or negative)

### lib/schedule.ts
**getActiveBlock(currentTime: string, blocks: ScheduleBlock[]): ScheduleBlock | null**
- Takes current time ("HH:MM" format) and list of schedule blocks
- Returns the block whose startTime ≤ currentTime < endTime
- Returns null if no block is active
- Tested extensively; critical to Today view logic

**isBlockActive(block: ScheduleBlock, currentTime: string): boolean**
- Helper for getActiveBlock
- Compares time ranges

**getNextBlock(currentTime: string, blocks: ScheduleBlock[]): ScheduleBlock | null**
- Returns the next upcoming block after currentTime
- Used to display "next up" on Today view

**sortBlocksByTime(blocks: ScheduleBlock[]): ScheduleBlock[]**
- Sort blocks chronologically

All functions are **pure, testable, and have TypeScript return types.**

---

## Build Pipeline

```
1. Developer edits code / content
   ↓
2. pnpm lint + pnpm typecheck (pre-commit hook via Husky)
   ↓
3. Git push to GitHub
   ↓
4. Vercel webhook triggered (automatic)
   ↓
5. Next.js build:
   - tsc --noEmit (type check)
   - ESLint (lint)
   - Tailwind CSS (generate utilities from classNames in code)
   - Framer Motion (tree-shake unused animations)
   - next/font (embed fonts)
   - next-pwa (generate service worker + manifest)
   - SSG (render all routes to static HTML)
   ↓
6. Build output:
   - .next/out/ (static HTML)
   - Workbox service worker script
   - manifest.json
   ↓
7. Vercel Edge CDN (cache static assets)
   ↓
8. Live at https://field-guide-to-yourself.vercel.app/
```

**Build time:** ~60 seconds (Next.js SSG for all routes)

**Cache invalidation:** Automatic on push. Service worker respects `Cache-Control` headers from Vercel:
- Static assets: `Cache-Control: public, max-age=31536000, immutable` (1 year)
- HTML pages: `Cache-Control: public, max-age=0, must-revalidate` (no caching, always fresh)

---

## Environment & Configuration

### Environment Variables
**Phase 1–3:** None required.
`.env.example` is present but empty, with comment:
```
# Field Guide to Yourself
# No environment variables are required for Phase 1–3.
# Phase 4 (Google Calendar API) will add NEXT_PUBLIC_GOOGLE_API_KEY.
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom palette (e.g., warm neutrals)
        neutral: {
          50: '#F9F8F6',
          100: '#F4F1EC',
          200: '#E8E5E0',
          // ...
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)'],
        sans: ['var(--font-inter)'],
      },
      spacing: {
        // Custom spacing scale
      },
    },
  },
  plugins: [
    // Custom plugins for card styles, animations, etc.
  ],
}
export default config
```

### next.config.ts
```typescript
import withPWA from 'next-pwa'

const config: NextConfig = {
  reactStrictMode: true,
  typescript: { strict: true },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // ...
}

export default withPWA({
  dest: 'public',
  // ... PWA config
})(config)
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    // ...
  }
}
```

---

## Security Considerations

### No Authentication
- Single user app; no login, no account system
- No user identity; no user data isolation needed
- No cross-user data sharing

### No Data Transmission
- All content is embedded in static HTML at build time
- No API calls at runtime (except Phase 4 Google Calendar API)
- No analytics, tracking, or telemetry (Privacy-first)
- No third-party scripts (fonts are self-hosted)

### localStorage Scope
- Tied to origin: https://field-guide-to-yourself.vercel.app
- Not shared with other sites or subdomains
- User can clear via browser settings

### No External API Keys
- Phase 1–3: Zero API keys needed
- Phase 4: Google Calendar API key stored in NEXT_PUBLIC_* env var (safe for client-side)

### Content Security Policy (CSP)
Add to `app/layout.tsx`:
```tsx
export const metadata = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Framer Motion requires unsafe-inline
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'"],
    },
  },
}
```

### No Sensitive Data Stored
- No passwords, API keys, personal identifiers
- Checklist state is ephemeral (per-day reset)
- Anchor task and notes are optional; user controls persistence

---

## Scalability Considerations

### If Calendar API Adds Real-Time Events (Phase 4)
1. Add NEXT_PUBLIC_GOOGLE_API_KEY to `.env.local`
2. Create new hook: `useGoogleCalendarEvents()`
3. Replace hardcoded schedule blocks with API data
4. Implement caching: fetch events once per session, cache in state + localStorage
5. Add offline fallback: show cached events if network unavailable

### If Content Grows Significantly
1. Split content/ directory by section (already done)
2. Use dynamic imports for guide pages: `next/dynamic` with code splitting
3. Lazy-load guide section content on route navigate

### If Multi-Device Sync Needed (Phase 5)
1. Add backend: simple Node.js + PostgreSQL
2. Sync localStorage state to server (AnchorTask, ReflectionNote, ChecklistState)
3. Fetch synced state on app load
4. Implement conflict resolution (last-write-wins or user-prompted)

### If Multiple Users (Phase 6)
1. Add authentication (OAuth or Passkey via Vercel Auth)
2. Add database (Supabase or similar for PgSQL)
3. Row-level security (users can only access their own data)
4. Duplicate all TypeScript content interfaces as database schemas

### Current Limits (Phase 1–3)
- **Content size:** Max ~10,000 content items before bundle size becomes concern (currently: ~50 items)
- **localStorage:** Browser quota is 5–10MB; current usage is <1MB
- **Build time:** Scales linearly with number of pages; currently ~60 seconds for 15 routes
- **Workbox cache:** Can store ~100MB per site; current is ~5MB

**No scaling concerns for Mia's personal project unless usage grows dramatically.**

---

## Appendix: Technology Versions

| Technology | Version | Install |
|-----------|---------|---------|
| Node.js | ≥20 LTS | `brew install node@20` (macOS) |
| pnpm | ≥8 | `npm install -g pnpm` |
| Next.js | 14.x | `pnpm add next` |
| TypeScript | 5.x | `pnpm add -D typescript` |
| React | 18.x | (peer dep of Next.js) |
| Tailwind CSS | 3.x | `pnpm add -D tailwindcss` |
| Framer Motion | 11.x | `pnpm add framer-motion` |
| next-pwa | 5.x | `pnpm add next-pwa` |
| ESLint | 8.x | `pnpm add -D eslint` |
| Prettier | 3.x | `pnpm add -D prettier` |
| Vitest | latest | `pnpm add -D vitest` (Phase 2+) |

---

**End of Document**
