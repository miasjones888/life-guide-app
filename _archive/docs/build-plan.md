# Build Plan — Field Guide to Yourself

**Project:** Field Guide to Yourself (Personal Life Guide PWA)
**User:** Mia (single user, mobile-first)
**Document Version:** 1.0
**Last Updated:** 2026-03-31

---

## Build Philosophy

Field Guide to Yourself is built in **four sequential phases**, each delivering measurable value:

1. **Phase 1 — Foundation (Weeks 1–2):** Core infrastructure, layout shell, Today view, PWA setup
2. **Phase 2 — Content & Features (Weeks 3–4):** All 10 guide sections, interactive components, localStorage persistence
3. **Phase 3 — Refinement & Polish (Week 5):** Animations, accessibility, responsive design, design system compliance
4. **Phase 4 — Future Scope:** Google Calendar API integration, real-time events, advanced features

**Phase boundaries are determined by:**
- Technical dependencies (one phase must complete before the next can start)
- Feature completeness (each phase delivers a working, deployable increment)
- Testing readiness (Phase 1 must be solid before Phase 2 begins)

---

## Phase Overview Table

| Phase | Objective | Key Deliverables | Definition of Done |
|-------|-----------|-----------------|-------------------|
| **Phase 1** | Foundation & PWA setup | Repo scaffolding, layout shell, Today view, PWA manifest, service worker | App is deployable to Vercel; Today view renders; offline caching works |
| **Phase 2** | Content & interactivity | All 10 guide sections, content files, interactive components, localStorage | All routes work; checklists persist per-day; anchor task saves; Lighthouse >90 |
| **Phase 3** | Refinement & UX | Animations, accessible colors, responsive desktop layout, final copy | Framer Motion transitions smooth; WCAG AA passes; manual QA on iPhone + desktop |
| **Phase 4** | Advanced features | Google Calendar API, live event sync, cloud backup | (Future; out of scope for initial launch) |

---

## Phase 1 — Foundation (Weeks 1–2)

**Objective:** Build the core infrastructure, layout shell, Today view, and PWA setup. By end of Phase 1, the app is deployable and the Today view is fully functional.

### Phase 1 Tasks (Ordered by Dependency)

#### BUILD-001: Repository Scaffolding
- **Description:** Initialize Next.js 14 project with TypeScript, Tailwind CSS, ESLint, Prettier, Husky
- **Files affected:** Root config files (tsconfig.json, next.config.ts, tailwind.config.ts, .eslintrc.json, package.json)
- **Complexity:** M
- **Dependencies:** None (first task)
- **Actions:**
  - Run `npx create-next-app@14 --typescript --tailwind life-guide`
  - Install additional deps: `pnpm add framer-motion next-pwa`
  - Install dev deps: `pnpm add -D vitest @testing-library/react eslint-config-next prettier husky`
  - Configure Husky for pre-commit linting
  - Create `.env.example` (empty, with comment)
- **Verification:**
  - `pnpm lint` runs without errors
  - `pnpm typecheck` passes
  - `pnpm dev` starts local server on port 3000

#### BUILD-002: Design Tokens & CSS Variables
- **Description:** Define custom color palette, typography scale, and spacing in Tailwind config and global CSS
- **Files affected:** `tailwind.config.ts`, `styles/tokens.css`, `app/globals.css`
- **Complexity:** M
- **Dependencies:** BUILD-001
- **Actions:**
  - Define custom color palette in tailwind.config.ts (warm neutrals: F9F8F6, F4F1EC, E8E5DE, etc.)
  - Define typography scale: H1 (2rem, bold), H2 (1.5rem, bold), Body (1rem, regular), Small (0.875rem, regular)
  - Define spacing scale: base unit = 0.25rem; use 4, 8, 12, 16, 24, 32, etc.
  - Export CSS variables in styles/tokens.css for runtime access
  - Set globals.css (font-family, line-height, -webkit-font-smoothing)
- **Verification:**
  - Tailwind class `bg-neutral-100` renders correct color
  - Typography components use design tokens
  - No hardcoded colors in Tailwind utilities

#### BUILD-003: TypeScript Content Interfaces
- **Description:** Define all TypeScript interfaces for content (RoutineStep, ScheduleBlock, Project, etc.)
- **Files affected:** `content/types.ts`
- **Complexity:** M
- **Dependencies:** BUILD-001
- **Actions:**
  - Create `content/types.ts` with all interfaces (RoutineStep, ScheduleBlock, Cat, Project, ChecklistItem, etc.)
  - Add comprehensive JSDoc comments to each interface and field
  - Export all types
  - Create stub `content/index.ts` exporting types
- **Verification:**
  - `pnpm typecheck` validates interfaces
  - All interfaces have JSDoc comments
  - No circular type dependencies

#### BUILD-004: Layout Shell & PageShell Component
- **Description:** Create root layout and reusable PageShell wrapper for all page routes
- **Files affected:** `app/layout.tsx`, `components/layout/PageShell.tsx`, `app/globals.css`
- **Complexity:** M
- **Dependencies:** BUILD-002, BUILD-003
- **Actions:**
  - Set up `app/layout.tsx` with:
    - Font loading (JetBrains Mono, Inter via next/font)
    - Metadata (title, description, Open Graph)
    - PWA meta tags (apple-mobile-web-app-capable, viewport, theme-color)
    - Global layout structure (body > children)
  - Create `PageShell.tsx` component:
    - Wraps page content with consistent padding, background, spacing
    - Includes SectionHeader (emoji, title, description) as reusable header
    - Includes BottomNav (mobile navigation)
  - Style with Tailwind + design tokens
- **Verification:**
  - Layout has proper padding on mobile and desktop
  - Fonts are loading correctly (check network tab, CSS font-family)
  - Page renders without layout shift

#### BUILD-005: Bottom Navigation Component
- **Description:** Create reusable bottom navigation bar for mobile (5 main routes)
- **Files affected:** `components/layout/BottomNav.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-004
- **Actions:**
  - Create `BottomNav.tsx` with 5 nav items:
    - / (Today)
    - /guide (Guide)
    - /week (Week)
    - (Placeholder for future features)
    - (Placeholder for future features)
  - Use Next.js `usePathname()` to highlight current route
  - Style with Tailwind: sticky bottom, 5 icons + labels, touch-friendly (min 48px height)
  - Icons: use emojis or simple SVG
- **Verification:**
  - Nav appears at bottom of all pages
  - Active link is highlighted
  - Touch targets are ≥48px
  - Responsive: hides on desktop (use Tailwind hidden md:block)

#### BUILD-006: Reusable UI Components (Phase 1 Set)
- **Description:** Create fundamental UI primitives (Typography, WindowPanel, Rule, Tag, Expandable)
- **Files affected:** `components/ui/*.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-002, BUILD-003
- **Actions:**
  - `components/ui/Typography.tsx`: H1, H2, Body, Small, Mono text components (using design tokens)
  - `components/ui/WindowPanel.tsx`: Card/panel container (border, shadow, padding, rounded corners)
  - `components/ui/Rule.tsx`: Horizontal divider line
  - `components/ui/Tag.tsx`: Small badge (status: active/resolved; urgent: yes/no)
  - `components/ui/Expandable.tsx`: Reveal/collapse toggle wrapper (state controlled)
  - `components/ui/StatusBar.tsx`: Time/date display bar (sticky header on today view)
  - `components/ui/VisuallyHidden.tsx`: Screen-reader-only text (a11y)
- **Verification:**
  - All components render with design tokens
  - No hardcoded sizes/colors
  - Expandable toggle works (expand/collapse)
  - Responsive (mobile-first)

#### BUILD-007: Utility Functions (lib/)
- **Description:** Create pure utility functions for date/time/schedule logic
- **Files affected:** `lib/utils.ts`, `lib/date.ts`, `lib/schedule.ts`
- **Complexity:** M
- **Dependencies:** BUILD-003
- **Actions:**
  - `lib/utils.ts`: cn() classNameJoin utility, basic helpers
  - `lib/date.ts`: getDayLabel(), isToday(), getMondayOfWeek(), formatTime(), getDayIndex(), addDays()
  - `lib/schedule.ts`: getActiveBlock(), isBlockActive(), getNextBlock(), sortBlocksByTime()
  - Add TypeScript return types; make all functions pure (no side effects)
  - Write JSDoc comments
- **Verification:**
  - All functions have TypeScript return types
  - `pnpm typecheck` passes
  - Functions are pure (no mutations)

#### BUILD-008: Custom Hooks (Phase 1 Set)
- **Description:** Create hooks for time state, day of week, and localStorage
- **Files affected:** `hooks/*.ts`
- **Complexity:** M
- **Dependencies:** BUILD-007
- **Actions:**
  - `hooks/useCurrentTime.ts`: Provides current hour, minute, day label; updates every 60s
  - `hooks/useDayOfWeek.ts`: Returns day index and name
  - `hooks/useLocalStorage.ts`: Generic typed hook for localStorage access
  - All hooks use React best practices (useEffect cleanup, dependency arrays)
- **Verification:**
  - useCurrentTime updates every 60s (test with fake timers in Phase 2)
  - useLocalStorage persists across reloads (manual test)
  - No memory leaks (check React DevTools Profiler)

#### BUILD-009: Daily Content Files Scaffolding
- **Description:** Create content data files for daily routines and schedule
- **Files affected:** `content/daily/*.ts`
- **Complexity:** M
- **Dependencies:** BUILD-003
- **Actions:**
  - Create `content/daily/morning-routine.ts`: export morningRoutineSteps (RoutineStep[])
  - Create `content/daily/evening-routine.ts`: export eveningRoutineSteps (RoutineStep[])
  - Create `content/daily/schedule.ts`: export dailySchedule (ScheduleBlock[])
  - Create `content/daily/check-ins.ts`: export dailyCheckIns (string[] prompts)
  - Populate with realistic Mia data (based on user interviews or provided content)
  - Validate types with `pnpm typecheck`
- **Verification:**
  - No TypeScript errors
  - Each export matches expected type
  - Data looks reasonable (realistic times, sensible descriptions)

#### BUILD-010: Today View Page
- **Description:** Create the main / route with Today view components
- **Files affected:** `app/page.tsx`, `components/today/*.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-004, BUILD-008, BUILD-009
- **Actions:**
  - Create `app/page.tsx` (route /)
  - Create `components/today/TodayHeader.tsx`: Day label, date, greeting
  - Create `components/today/ActiveBlock.tsx`: Current/next schedule block display
  - Create `components/today/RoutineChecklist.tsx`: Morning/evening routine steps with checkboxes
  - Create `components/today/DaySummary.tsx`: Summary of today's schedule blocks
  - Compose in app/page.tsx using PageShell
  - Use useCurrentTime and useActiveBlock hooks
  - Use design tokens and UI components
- **Verification:**
  - / route renders without errors
  - TodayHeader shows correct date and time
  - ActiveBlock shows current or next schedule block
  - RoutineChecklist displays steps; checkboxes are interactive (state only, not persisted yet)
  - Responsive on mobile (375px width)

#### BUILD-011: PWA Manifest & Service Worker
- **Description:** Configure PWA manifest and next-pwa plugin for offline support
- **Files affected:** `public/manifest.json`, `next.config.ts`
- **Complexity:** M
- **Dependencies:** BUILD-001, BUILD-010
- **Actions:**
  - Create `public/manifest.json`:
    - name: "Field Guide to Yourself"
    - short_name: "Field Guide"
    - display: "standalone"
    - orientation: "portrait"
    - theme_color: "#D4D0C8"
    - background_color: "#F4F1EC"
    - start_url: "/"
    - icons (192x192, 512x512, maskable variants)
  - Configure next-pwa in next.config.ts:
    - dest: 'public'
    - register: true
    - skipWaiting: true
    - runtimeCaching strategies (Cache First for static assets, Network First for pages)
  - Create icon files (192x192, 512x512) as PNG
  - Test service worker installation (manual test: open DevTools > Application > Service Workers)
- **Verification:**
  - manifest.json is valid (test with manifest validator)
  - Service worker registers (check DevTools)
  - Icons display correctly on home screen (test on iPhone)
  - App appears in "Add to Home Screen" prompt

#### BUILD-012: Guide Index Scaffolding
- **Description:** Create /guide route structure and guide section index page
- **Files affected:** `app/guide/page.tsx`, `content/types.ts` (ContentSection interface)
- **Complexity:** S
- **Dependencies:** BUILD-004, BUILD-003
- **Actions:**
  - Create content files for guide sections (stub data):
    - `content/system/sections.ts`: export all 10 ContentSection objects
  - Create `app/guide/page.tsx`: Guide index route
  - Create `components/guide/SectionCard.tsx`: Card for each guide section
  - Compose guide index showing all 10 sections as cards with emoji, number, name, description
  - Add links to /guide/[section] routes (will be created in Phase 2)
- **Verification:**
  - /guide route renders 10 guide cards
  - Cards display emoji, number, name, description
  - Links point to correct routes (even if pages don't exist yet; will be "not found")
  - Responsive grid layout (1 column mobile, 2 columns tablet, etc.)

#### BUILD-013: Lighthouse Audit & Performance Baseline
- **Description:** Run Lighthouse audit and establish performance baseline
- **Files affected:** None (audit only)
- **Complexity:** S
- **Dependencies:** BUILD-001 through BUILD-012
- **Actions:**
  - Deploy Phase 1 build to Vercel
  - Run Lighthouse audit (mobile): pnpm build && check local metrics
  - Record baseline metrics: FCP, LCP, TTI, JS bundle size, CSS size
  - Identify any major issues (unused dependencies, unoptimized images, etc.)
  - Create GitHub issue for Phase 3 if Performance < 90
- **Verification:**
  - FCP: < 1.2s (target met or identified for optimization)
  - LCP: < 1.5s
  - TTI: < 2.0s
  - JS bundle: < 150kb (gzipped)
  - CSS: < 20kb
  - Accessibility: > 85 (will improve in Phase 3)

### Phase 1 Definition of Done

- [ ] Repository is scaffolded and all dependencies installed
- [ ] Design tokens (colors, typography, spacing) defined in Tailwind config
- [ ] All TypeScript interfaces defined in content/types.ts
- [ ] Layout shell (PageShell, BottomNav) renders on all pages
- [ ] Today view (/app/page.tsx) is fully functional:
  - [ ] Shows current date, day, greeting
  - [ ] Displays active/next schedule block
  - [ ] Morning/evening routine checklist is interactive
  - [ ] Day summary is visible
- [ ] PWA manifest is valid and service worker installs
- [ ] Offline caching strategy is configured
- [ ] Content data files are scaffolded and type-checked
- [ ] Guide index (/guide) displays all 10 sections
- [ ] `pnpm lint` and `pnpm typecheck` pass without errors
- [ ] Lighthouse Performance > 85 (baseline established)
- [ ] App is deployable to Vercel
- [ ] Manual QA: app renders on iPhone 12 & iPad

---

## Phase 2 — Content & Interactivity (Weeks 3–4)

**Objective:** Populate all 10 guide sections with full content, create interactive components, and add localStorage persistence. By end of Phase 2, all routes are functional and checklists/notes persist.

### Phase 2 Overview

| Task | Component | Purpose |
|------|-----------|---------|
| BUILD-201 | Content files (all sections) | Populate all content data for all 10 guide sections |
| BUILD-202 | Guide section pages | Create /guide/[section] routes for all 10 sections |
| BUILD-203 | ContentEntry component | Expandable content display (title, description, details) |
| BUILD-204 | CheckItem component | Single checklist item with checkbox |
| BUILD-205 | TimeBlock component | Schedule block display component |
| BUILD-206 | WeekRow component | Weekly recurring event row |
| BUILD-207 | ProjectCard component | Project status card |
| BUILD-208 | CatCard component | Cat info and medication schedule card |
| BUILD-209 | MonthlyChecklist component | Monthly checklist display |
| BUILD-210 | NotepadPanel component | Persistent reflection notes |
| BUILD-211 | AnchorTask component | Weekly focus task input and display |
| BUILD-212 | useCheckList hook | Ephemeral checklist state (per-day reset) |
| BUILD-213 | Week view (/week) | Weekly overview and calendar |
| BUILD-214 | Test suite setup | Vitest config and unit tests for lib/ functions |
| BUILD-215 | CONTENT-UPDATE-GUIDE.md | Documentation for editing content files |

### Phase 2 Detailed Tasks

#### BUILD-201: Populate All Content Files
- **Description:** Write realistic, comprehensive content for all 10 guide sections
- **Files affected:** All files in `content/` directory
- **Complexity:** L (most time-consuming; requires writing content)
- **Dependencies:** BUILD-003 (interfaces must be defined first)
- **Actions:**
  - For each section (routines, rhythm, focus, care, body, home, finance, field, health, system):
    - Create TypeScript files exporting content arrays/objects
    - Populate with realistic Mia data (based on interviews, provided content, etc.)
    - Ensure all required fields are present
    - Validate types: `pnpm typecheck`
  - Example files:
    - `content/weekly/rhythm.ts`: WeeklyRhythm object with 7 WeekDay entries
    - `content/focus/projects.ts`: 3–5 active/upcoming Project objects
    - `content/care/cats.ts`: All Cat objects with medications
    - `content/monthly/finance.ts`: All FinanceItem objects
- **Verification:**
  - `pnpm typecheck` passes for all content files
  - No console warnings when importing content
  - Sample data looks reasonable (realistic times, amounts, descriptions)

#### BUILD-202: Create Guide Section Pages (10 routes)
- **Description:** Create /guide/[section] pages for all 10 sections
- **Files affected:**
  - `app/guide/routines/page.tsx`
  - `app/guide/rhythm/page.tsx`
  - `app/guide/focus/page.tsx`
  - `app/guide/care/page.tsx`
  - `app/guide/body/page.tsx`
  - `app/guide/home/page.tsx`
  - `app/guide/finance/page.tsx`
  - `app/guide/field/page.tsx`
  - `app/guide/health/page.tsx`
  - `app/guide/system/page.tsx`
- **Complexity:** M (10 pages, mostly boilerplate with different content)
- **Dependencies:** BUILD-201, BUILD-202 (components from earlier tasks)
- **Actions:**
  - For each section, create page.tsx that:
    - Imports relevant content from content/ files
    - Uses PageShell wrapper
    - Uses SectionHeader with emoji, title, description
    - Imports section-specific components (ProjectCard, CatCard, etc.)
    - Renders content in WindowPanel containers
  - Example: `/guide/routines` page
    - Shows morning routine (RoutineChecklist)
    - Shows evening routine (RoutineChecklist)
    - Shows daily schedule (list of TimeBlock components)
- **Verification:**
  - All 10 /guide/[section] routes render
  - Content displays correctly
  - Responsive on mobile and desktop

#### BUILD-203: ContentEntry Component
- **Description:** Reusable expandable content entry (title, description, expandable details)
- **Files affected:** `components/guide/ContentEntry.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-006 (Expandable UI component)
- **Actions:**
  - Create ContentEntry.tsx:
    - Props: emoji, title, description, content (ReactNode), expanded (boolean)
    - Uses Expandable component to show/hide content
    - Styling with WindowPanel, Typography components
  - Example usage: Show a project, expand to see details
- **Verification:**
  - Component renders with title, description, emoji
  - Expandable toggle works (click to expand/collapse)
  - Content is hidden until expanded

#### BUILD-204: CheckItem Component
- **Description:** Single checklist item with checkbox, label, description
- **Files affected:** `components/guide/CheckItem.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-006 (UI components)
- **Actions:**
  - Create CheckItem.tsx:
    - Props: id, label, description, checked (boolean), onChange callback
    - Render checkbox + label + optional description
    - Accessible: use <input type="checkbox"> with <label>
    - Style with Tailwind
  - Touch-friendly: min 48px height
- **Verification:**
  - Checkbox is clickable
  - onChange callback fires correctly
  - Accessible (can tab to and toggle with spacebar)

#### BUILD-205: TimeBlock Component
- **Description:** Schedule block display (emoji, title, time, description, active indicator)
- **Files affected:** `components/guide/TimeBlock.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-006
- **Actions:**
  - Create TimeBlock.tsx:
    - Props: emoji, title, time (e.g., "09:00 – 12:00"), description, isActive (boolean)
    - Render in WindowPanel with emoji, title, time
    - If isActive, add visual indicator (border, background color)
    - Responsive
- **Verification:**
  - TimeBlock displays time range correctly
  - Active blocks are visually distinct
  - Responsive layout

#### BUILD-206: WeekRow Component
- **Description:** Row for weekly recurring event (day + event label + time)
- **Files affected:** `components/guide/WeekRow.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-006
- **Actions:**
  - Create WeekRow.tsx:
    - Props: dayName (e.g., "Monday"), emoji, event label, time
    - Render as table row or flex row
    - Responsive: stack on mobile, horizontal on desktop
- **Verification:**
  - WeekRow displays day, emoji, label, time
  - Responsive layout

#### BUILD-207: ProjectCard Component
- **Description:** Project status card (name, status badge, priority, description)
- **Files affected:** `components/guide/ProjectCard.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-006 (Tag component for status)
- **Actions:**
  - Create ProjectCard.tsx:
    - Props: name, status (active/upcoming/paused), priority (primary/secondary), description
    - Render in WindowPanel with project info
    - Use Tag component for status badge (colored by status)
    - Use small accent color for priority
- **Verification:**
  - Card displays all project info
  - Status badge is colored correctly (active=green, paused=gray, upcoming=yellow)
  - Priority is visually indicated

#### BUILD-208: CatCard Component
- **Description:** Cat info card (name, sex, medications, notes)
- **Files affected:** `components/guide/CatCard.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-006, BUILD-204 (CheckItem for medication times)
- **Actions:**
  - Create CatCard.tsx:
    - Props: cat (Cat object)
    - Render in WindowPanel
    - Show: name, sex, notes
    - Show medications: name, dose times (as list), monthly reorder flag
    - If insurancePending, show warning badge
- **Verification:**
  - Card displays cat info correctly
  - Medications display with dose times
  - Insurance pending flag is visible

#### BUILD-209: MonthlyChecklist Component
- **Description:** Monthly checklist display (list of CheckItem components)
- **Files affected:** `components/guide/MonthlyChecklist.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-204, BUILD-212 (useCheckList hook)
- **Actions:**
  - Create MonthlyChecklist.tsx:
    - Props: items (ChecklistItem[])
    - Render as list of CheckItem components
    - Use useCheckList hook for checked state
    - Show urgent items first (sorted)
- **Verification:**
  - Checklist items render with checkboxes
  - Checked state is managed by hook
  - Urgent items are visually distinct

#### BUILD-210: NotepadPanel Component
- **Description:** Persistent reflection notes area (textarea, localStorage integration)
- **Files affected:** `components/guide/NotepadPanel.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-006, `hooks/useLocalStorage.ts`
- **Actions:**
  - Create NotepadPanel.tsx:
    - Props: optional title
    - Render WindowPanel with textarea
    - Use useLocalStorage hook to persist notes in key 'mia:reflection-note'
    - Auto-save on change (debounced, 500ms)
    - Show unsaved indicator (optional)
- **Verification:**
  - Textarea is editable
  - Notes persist across page reload (manual test)
  - Auto-save works (no explicit save button needed)

#### BUILD-211: AnchorTask Component
- **Description:** Weekly focus task input, display, and completion tracking
- **Files affected:** `components/today/AnchorTask.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-006, `hooks/useLocalStorage.ts`
- **Actions:**
  - Create AnchorTask.tsx:
    - Show current anchor task (if exists)
    - Input to set/change anchor task
    - Button to mark as completed (shows completedAt timestamp)
    - Button to clear and set new task
    - Use useLocalStorage hook with key 'mia:anchor-task'
    - Store as: { id, label, createdAt, completedAt? }
- **Verification:**
  - Can input and save task
  - Task persists across reloads
  - Can mark as complete
  - Can clear and set new task

#### BUILD-212: useCheckList Hook
- **Description:** Ephemeral checklist state hook (resets per day)
- **Files affected:** `hooks/useCheckList.ts`
- **Complexity:** M
- **Dependencies:** BUILD-008 (other hooks), BUILD-007 (date utilities)
- **Actions:**
  - Create useCheckList.ts hook:
    - Returns: { checkedItems, toggleItem, isChecked, reset }
    - checkedItems is Record<id, boolean>
    - Uses localStorage key: 'mia:checklist:YYYY-MM-DD'
    - Auto-resets when date changes (check on mount)
    - toggleItem() updates state and localStorage
  - Handle edge cases:
    - localStorage not available (private mode): fallback to in-memory state
    - Invalid JSON in localStorage: clear and start fresh
- **Verification:**
  - Checklist state persists within same day
  - State resets at midnight (manual test: change system date)
  - Private mode fallback works

#### BUILD-213: Week View Page
- **Description:** Create /week route with weekly overview and calendar
- **Files affected:** `app/week/page.tsx`, `components/guide/WeekView.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-006, BUILD-206 (WeekRow component), content/weekly files
- **Actions:**
  - Create app/week/page.tsx
  - Create WeekView component:
    - Show weekly rhythm (7 days with themes and events)
    - Show recurring events (table of events by day/time)
    - Show upcoming projects (summary)
  - Use PageShell, SectionHeader
- **Verification:**
  - /week route renders
  - Weekly rhythm displays all 7 days
  - Recurring events display by day
  - Responsive layout

#### BUILD-214: Test Suite Setup & lib/ Tests
- **Description:** Configure Vitest and write unit tests for lib/schedule.ts and lib/date.ts
- **Files affected:** `vitest.config.ts`, `__tests__/lib/*.test.ts`
- **Complexity:** M
- **Dependencies:** BUILD-007 (lib functions)
- **Actions:**
  - Create vitest.config.ts with Next.js configuration
  - Write tests for `lib/schedule.ts`:
    - getActiveBlock(): test time ranges, boundary conditions, no match
    - getNextBlock(): test next upcoming block, no next block
    - isBlockActive(): test time comparisons
  - Write tests for `lib/date.ts`:
    - getDayLabel(): test today, tomorrow, other days
    - isToday(): test same day, different days
    - getMondayOfWeek(): test all days of week
    - formatTime(): test hour/minute formatting
  - Run tests: `pnpm test`
  - Target: > 80% code coverage for lib/ functions
- **Verification:**
  - `pnpm test` runs and all tests pass
  - Coverage report shows > 80% for lib/
  - Tests validate edge cases (boundary times, date transitions)

#### BUILD-215: CONTENT-UPDATE-GUIDE.md
- **Description:** Write documentation for content authors on how to edit content files
- **Files affected:** `docs/CONTENT-UPDATE-GUIDE.md`
- **Complexity:** S
- **Dependencies:** BUILD-201 (content files exist)
- **Actions:**
  - Document:
    - How to locate a content file
    - How to add/edit/remove items
    - TypeScript strict mode validation
    - Testing content changes locally (pnpm dev)
    - Example: adding a new schedule block, project, finance item
    - Common errors and how to fix them
- **Verification:**
  - Document is clear and actionable
  - Examples are realistic
  - Troubleshooting section covers common mistakes

### Phase 2 Definition of Done

- [ ] All content files populated with realistic data
- [ ] All 10 /guide/[section] pages render and display content
- [ ] Interactive components created and integrated:
  - [ ] ContentEntry, CheckItem, TimeBlock, WeekRow, ProjectCard, CatCard, MonthlyChecklist
  - [ ] NotepadPanel (persists to localStorage)
  - [ ] AnchorTask (weekly focus task, persists)
- [ ] useCheckList hook working (per-day reset, localStorage)
- [ ] /week route displays weekly overview
- [ ] Unit tests written for lib/schedule.ts and lib/date.ts
- [ ] CONTENT-UPDATE-GUIDE.md written
- [ ] `pnpm test` passes all tests (> 80% coverage for lib/)
- [ ] `pnpm lint` and `pnpm typecheck` pass
- [ ] Lighthouse Performance > 85, Accessibility > 85
- [ ] Manual QA: all routes work on iPhone, iPad, desktop
- [ ] localStorage persistence verified (manual test)

---

## Phase 3 — Refinement & Polish (Week 5)

**Objective:** Add animations, accessibility improvements, responsive design refinement, and final visual polish. By end of Phase 3, the app is production-ready.

### Phase 3 Overview

| Task | Purpose |
|------|---------|
| BUILD-301 | Framer Motion animation setup |
| BUILD-302 | Page transition animations |
| BUILD-303 | Card expand/collapse animations |
| BUILD-304 | Checklist item animations |
| BUILD-305 | Color contrast audit (WCAG AA) |
| BUILD-306 | Accessibility review (keyboard nav, screen readers) |
| BUILD-307 | Desktop responsive layout (JournalSpread 2-column) |
| BUILD-308 | Typography refinement (sizing, line-height, weight hierarchy) |
| BUILD-309 | Mobile responsive testing & adjustments |
| BUILD-310 | Open Graph image generation |
| BUILD-311 | Final QA & polish |
| BUILD-312 | Vercel deployment & final audit |

### Phase 3 Detailed Tasks

#### BUILD-301: Framer Motion Animation Config
- **Description:** Set up Framer Motion animation variants and configuration
- **Files affected:** `animations/variants.ts`, `animations/pageTransitions.ts`, `animations/cardReveal.ts`
- **Complexity:** M
- **Dependencies:** BUILD-001 (Framer Motion installed)
- **Actions:**
  - Create animation variants for reuse across components:
    - Fade in/out
    - Slide up/down
    - Scale in/out
  - Create page transition variants
  - Create card expand/collapse variants
  - Document motion principles (timing, easing)
- **Verification:**
  - Animation variants export successfully
  - TypeScript types are correct
  - No unused animations (tree-shake unused variants)

#### BUILD-302: Page Transition Animations
- **Description:** Add Framer Motion transitions between route changes
- **Files affected:** `app/layout.tsx`, `components/layout/PageShell.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-301, BUILD-004
- **Actions:**
  - Wrap route content with motion.div
  - Apply page transition variants (fade in, slide up)
  - 300–500ms duration, easing: easeInOut
  - Test on all route transitions
- **Verification:**
  - Page transitions are smooth (no jank)
  - 60fps performance (check DevTools Performance tab)
  - Transitions don't break accessibility (keyboard navigation still works)

#### BUILD-303: Card Expand/Collapse Animations
- **Description:** Add smooth expand/collapse animations to expandable content
- **Files affected:** `components/ui/Expandable.tsx`, `animations/cardReveal.ts`
- **Complexity:** M
- **Dependencies:** BUILD-301
- **Actions:**
  - Implement layoutId for shared layout animation (optional, advanced)
  - Use AnimatePresence for conditional rendering
  - Animate height, opacity on expand/collapse
  - 200–300ms duration
- **Verification:**
  - Expand/collapse is smooth
  - No layout shift
  - Accessible (keyboard still works)

#### BUILD-304: Checklist Item Animations
- **Description:** Add subtle animations to checklist items when checked
- **Files affected:** `components/guide/CheckItem.tsx`
- **Complexity:** S
- **Dependencies:** BUILD-301, BUILD-204
- **Actions:**
  - Animate checkmark appearance (fade in)
  - Optionally: subtle scale on checked state
  - 150–200ms duration
  - Don't block user interaction
- **Verification:**
  - Check animation is subtle but satisfying
  - Responsive (immediate visual feedback)

#### BUILD-305: Color Contrast Audit (WCAG AA)
- **Description:** Audit all text/background color combinations for WCAG AA compliance
- **Files affected:** `styles/tokens.css`, `tailwind.config.ts` (colors), all components
- **Complexity:** M
- **Dependencies:** BUILD-002 (design tokens)
- **Actions:**
  - Use contrast checker (WebAIM, polished.js)
  - Check all color combinations:
    - Text on background
    - Text on button background
    - Tags, badges, status indicators
  - Target: 4.5:1 for normal text, 3:1 for large text
  - Adjust colors if needed (darken text or lighten background)
  - Document final color palette with contrast ratios
- **Verification:**
  - All text meets WCAG AA (4.5:1 contrast for normal text)
  - Lighthouse Accessibility scores 95+

#### BUILD-306: Accessibility Review (Keyboard Navigation, Screen Readers)
- **Description:** Full a11y audit: keyboard nav, screen reader support, ARIA labels
- **Files affected:** All interactive components
- **Complexity:** L
- **Dependencies:** BUILD-002 through BUILD-210
- **Actions:**
  - Test keyboard navigation:
    - Tab through all interactive elements (buttons, inputs, links)
    - Focus order is logical (left to right, top to bottom)
    - Skip links for long pages (optional)
  - Test with screen reader (VoiceOver on Mac/iOS, NVDA on Windows)
    - All buttons have accessible labels
    - Form labels associated with inputs
    - ARIA roles explicit where needed (role="navigation", etc.)
  - Fix issues:
    - Add aria-label where text label is missing
    - Add VisuallyHidden text for screen readers
    - Ensure focus visible (outline or focus-ring)
    - Use semantic HTML (<button>, <nav>, <main>, <article>)
- **Verification:**
  - Tab order is logical (test all pages)
  - Screen reader announces all content correctly
  - Lighthouse Accessibility > 95

#### BUILD-307: Desktop Responsive Layout (JournalSpread)
- **Description:** Create optional 2-column "journal spread" layout for desktop
- **Files affected:** `components/layout/JournalSpread.tsx`
- **Complexity:** M
- **Dependencies:** BUILD-004
- **Actions:**
  - Create JournalSpread component (optional, for Phase 3 polish)
  - On desktop (md breakpoint): show 2-column layout
    - Left column: main content
    - Right column: sidebar (recent notes, upcoming events, etc.)
  - On mobile: single column (revert to PageShell)
  - Use CSS grid or Tailwind grid utilities
- **Verification:**
  - Layout adapts to desktop width
  - Content is readable in both columns
  - Mobile layout is unchanged

#### BUILD-308: Typography Refinement
- **Description:** Fine-tune typography: sizing, line-height, weight, letter-spacing
- **Files affected:** `components/ui/Typography.tsx`, `styles/tokens.css`
- **Complexity:** S
- **Dependencies:** BUILD-002, BUILD-006
- **Actions:**
  - Audit typography across the app:
    - H1: 2rem, bold, 1.1 line-height
    - H2: 1.5rem, bold, 1.2 line-height
    - Body: 1rem, regular, 1.6 line-height
    - Small: 0.875rem, regular, 1.5 line-height
  - Add letter-spacing if needed (titles benefit from tighter spacing)
  - Ensure readable line-lengths (max 65 characters for body text)
  - Test on small screens (iPhone SE)
- **Verification:**
  - Typography is consistent across app
  - Text is readable at all sizes
  - Line-height/spacing is comfortable

#### BUILD-309: Mobile Responsive Testing & Adjustments
- **Description:** Test on various mobile devices and adjust responsive breakpoints
- **Files affected:** Tailwind config, component styles
- **Complexity:** M
- **Dependencies:** All Phase 1–2 components
- **Actions:**
  - Test on real devices:
    - iPhone SE (375px)
    - iPhone 12 (390px)
    - iPhone 12 Pro Max (430px)
    - iPad (768px)
    - iPad Pro (1024px)
    - Desktop (1440px)
  - Check:
    - Touch targets are ≥48px
    - Padding/margins scale appropriately
    - Text sizes are readable
    - Images scale correctly
  - Adjust Tailwind breakpoints if needed
- **Verification:**
  - App renders correctly on all breakpoints
  - Touch targets are large enough
  - No horizontal scrolling (except intentional)

#### BUILD-310: Open Graph Image
- **Description:** Create Open Graph image for social sharing (1200x630px)
- **Files affected:** `public/og-image.png`, `app/layout.tsx` (metadata)
- **Complexity:** S
- **Dependencies:** Design tokens (colors, typography)
- **Actions:**
  - Design og-image.png:
    - Use design tokens (colors, fonts)
    - Title: "Field Guide to Yourself"
    - Subtitle: "A personal life guide PWA"
    - Logo/emoji
    - 1200x630px
  - Update metadata in app/layout.tsx:
    - og:image: /og-image.png
    - og:type: website
    - og:title, og:description
- **Verification:**
  - Image displays when link is shared on social media (test with OG debug tool)
  - Aspect ratio is correct (1200x630)

#### BUILD-311: Final QA & Polish
- **Description:** Manual testing, bug fixes, final adjustments
- **Files affected:** All files (QA only)
- **Complexity:** M
- **Dependencies:** BUILD-301 through BUILD-310
- **Actions:**
  - Test on real iPhone (ask Mia to test with her device)
  - Test offline: remove network, verify app still works
  - Test checklist reset: change date, verify checklist resets
  - Test localStorage: verify notes persist across reloads
  - Fix any remaining bugs or visual issues
  - Gather user feedback
- **Verification:**
  - No bugs reported
  - Offline mode works
  - localStorage persists correctly
  - User is satisfied with UX

#### BUILD-312: Vercel Deployment & Final Audit
- **Description:** Final deployment and Lighthouse audit
- **Files affected:** None (deployment only)
- **Complexity:** S
- **Dependencies:** BUILD-301 through BUILD-311
- **Actions:**
  - Run final build: `pnpm build`
  - Deploy to Vercel: `git push`
  - Run Lighthouse audit (mobile):
    - Performance: > 90
    - Accessibility: > 95
    - Best Practices: > 90
    - SEO: > 90
  - If any score < target, debug and fix
  - Enable caching headers, compression, etc. on Vercel
- **Verification:**
  - Lighthouse scores all > 90
  - App is live on https://field-guide-to-yourself.vercel.app
  - Service worker caches properly (offline test)

### Phase 3 Definition of Done

- [ ] Framer Motion animations configured and applied
  - [ ] Page transitions smooth (300–500ms)
  - [ ] Card expand/collapse animated
  - [ ] Checklist item check animation
- [ ] Accessibility audit complete
  - [ ] WCAG AA color contrast verified
  - [ ] Keyboard navigation tested on all pages
  - [ ] Screen reader tested (VoiceOver/NVDA)
  - [ ] Lighthouse Accessibility > 95
- [ ] Responsive design refined
  - [ ] Desktop 2-column layout (JournalSpread) implemented
  - [ ] Typography finalized
  - [ ] Tested on iPhone SE, 12, 12 Pro Max, iPad, desktop
- [ ] Open Graph image created and configured
- [ ] Final QA complete: offline mode, localStorage, user feedback
- [ ] Lighthouse audit: Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 90
- [ ] App is live on Vercel and fully functional

---

## Phase 4 — Future Scope (Outline)

### Phase 4 Overview

Phase 4 is intentionally excluded from the initial launch. It includes advanced features that require backend integration or complex synchronization.

#### BUILD-401: Google Calendar API Integration
- Fetch live events from Mia's Google Calendar
- Sync with hardcoded schedule blocks
- Cache events locally (Phase 2 pattern)
- Add NEXT_PUBLIC_GOOGLE_API_KEY to `.env.local`

#### BUILD-402: Real-Time Event Sync
- Update Today view when calendar events change
- Notify user of upcoming events
- Handle conflicts between calendar and hardcoded schedule

#### BUILD-403: Cloud Backup
- Sync localStorage data (AnchorTask, ReflectionNote, ChecklistState) to cloud
- Multi-device sync (iPhone, iPad, web)
- Offline-first conflict resolution

#### BUILD-404: User Settings
- Timezone selection
- Routine mode preference (full vs. minimum)
- Color theme (light/dark mode)

---

## Build Verification Steps

### Phase 1 Verification Checklist
```bash
# Code quality
pnpm lint      # No errors
pnpm typecheck # No errors

# Build
pnpm build     # Succeeds

# Performance
pnpm build && npx lighthouse https://localhost:3000 --mobile
# FCP < 1.2s, LCP < 1.5s, JS < 150kb gzipped

# PWA
# Open DevTools > Application > Manifest
# Verify manifest.json is valid and icons display

# Manual testing
pnpm dev
# Test on iPhone: Today view, BottomNav, offline (disable network in DevTools)
```

### Phase 2 Verification Checklist
```bash
# Content
pnpm typecheck # No errors in content/ files

# Routes
# Manually navigate to all 10 /guide/[section] routes
# Verify content displays

# Interactivity
# Check: RoutineChecklist, AnchorTask, NotepadPanel, MonthlyChecklist
# Verify: checkboxes work, localStorage persists across reload, date-based reset works

# Tests
pnpm test      # All tests pass, > 80% coverage

# Performance
# Run Lighthouse again; should be > 85
```

### Phase 3 Verification Checklist
```bash
# Accessibility
# Keyboard: Tab through all pages, focus is visible
# Screen reader: Test with VoiceOver (Mac) or NVDA (Windows)
# Colors: All text has 4.5:1 contrast (WCAG AA)

# Animations
# Page transitions smooth (no jank)
# Card expand/collapse smooth
# 60fps (check DevTools Performance tab)

# Responsive
# Test on real devices: iPhone SE, 12, iPad
# No horizontal scrolling
# Touch targets ≥ 48px

# Final Lighthouse
pnpm build && npx lighthouse https://field-guide-to-yourself.vercel.app --mobile
# Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 90
```

---

## Risk Items & Mitigation

### Risk 1: next-pwa Compatibility with Next.js 14 App Router
**Impact:** High (PWA is critical for offline support)
**Mitigation:**
- Test service worker generation early (Phase 1, BUILD-011)
- Use latest version of next-pwa (5.x)
- Monitor GitHub issues for reported problems
- Plan fallback: manual service worker if next-pwa fails

### Risk 2: Safari PWA Service Worker Behavior
**Impact:** Medium (iOS users might not get offline support)
**Mitigation:**
- Test on real iPhone (iOS 16+) in Phase 1
- Verify service worker persists (iOS limits to 30 days of non-use)
- Add fallback UI message if service worker unavailable
- Document iOS PWA limitations in README

### Risk 3: Framer Motion Tree-Shaking & Bundle Size
**Impact:** Medium (animations could bloat bundle)
**Mitigation:**
- Monitor bundle size after Phase 3 (should stay < 150kb gzipped)
- Use dynamic imports for animation-heavy pages if needed
- Only animate what's necessary (prioritize UX over motion)

### Risk 4: localStorage in Private Mode
**Impact:** Low (only affects Safari private browsing)
**Mitigation:**
- Test localStorage availability before writing (try/catch)
- Fallback to in-memory state if localStorage unavailable
- Warn user that data won't persist in private mode (optional)

### Risk 5: Content Writing Takes Longer Than Expected
**Impact:** High (most time-consuming task in Phase 2)
**Mitigation:**
- Draft content outline before Phase 2 starts
- Break content writing into smaller subtasks
- Prioritize: must-haves vs. nice-to-haves
- Get Mia's input early to avoid rework

### Risk 6: Responsive Design Issues on Older Devices
**Impact:** Medium (but unlikely for target user)
**Mitigation:**
- Test on iPhone SE (smallest modern device)
- Use mobile-first CSS approach
- Fallback: ensure content is at least readable (even if not perfect)

---

## Timeline & Estimation

| Phase | Duration | Start | End | Complexity |
|-------|----------|-------|-----|-----------|
| Phase 1 | 2 weeks | Week 1 | Week 2 | Medium |
| Phase 2 | 2 weeks | Week 3 | Week 4 | High (content writing) |
| Phase 3 | 1 week | Week 5 | Week 5 | Medium |
| Phase 4 | TBD | Deferred | Deferred | High |

**Total:** 5 weeks to production-ready launch.

**Optimizations:**
- Parallel work: Content writing (Phase 2) can start while Phase 1 infrastructure is finishing
- Automation: Use scripts for repetitive tasks (e.g., generate test fixtures)

---

## Success Criteria

### By End of Phase 1
- [ ] App is live on Vercel
- [ ] Today view is fully functional
- [ ] Service worker caches assets
- [ ] Lighthouse Performance > 85

### By End of Phase 2
- [ ] All 10 guide sections are populated and routable
- [ ] Checklists persist per-day; reset at midnight
- [ ] Anchor task and notes persist indefinitely
- [ ] > 80% test coverage for lib/ functions

### By End of Phase 3
- [ ] Animations are smooth (60fps)
- [ ] WCAG AA color contrast and a11y passed
- [ ] Responsive layout tested on 4+ device sizes
- [ ] Lighthouse Performance > 90, Accessibility > 95

### User Experience
- Mia opens app on home screen and sees Today view
- Can check off routine steps; state persists until next day
- Can browse all 10 guide sections
- Can set weekly anchor task (focus goal)
- Can write and save reflection notes
- App works offline (service worker caching)
- No authentication or signup needed

---

**End of Document**
