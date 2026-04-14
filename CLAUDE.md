# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A mobile-first **personal** reference web app ("Field Guide to Yourself") for one specific user (Mia Jones). It is a **digital handbook, not a productivity dashboard** — the goal is "open it, find what you need in under 10 seconds, close it, and go do the thing." Content is static and bundled in the repo; there is no backend database. State that does change (checklists, anchor task, deck cards, budget, folders, user-added calendar events) lives in `localStorage`.

**Before making design or content changes, read `README.md` and `COVENANT.md`.** `COVENANT.md` is Mia's list of things the app must never do — PRs that violate it do not ship regardless of how clever the feature is. Do not edit `COVENANT.md` — it is the one file Claude does not author.

## Commands

```bash
npm run dev          # next dev (http://localhost:3000)
npm run build        # production build
npm run start        # run built app
npm run lint         # next lint
npm run test         # vitest run (jsdom env)
npx vitest run path/to/file.test.ts   # run a single test file
npx vitest           # watch mode
```

TypeScript is strict; `@/*` resolves to the repo root (see `tsconfig.json`). `_archive/` is excluded from type-checking and should be treated as read-only historical code (it contains a previous version of the app, including old `app/api/*` routes that are not part of the current build).

## Architecture

**Framework:** Next.js 14 App Router + React 18 + Tailwind + framer-motion. Single `RootLayout` (`app/layout.tsx`) wraps every page in `HardDayProvider`. Currently there are **no API routes** in `app/` — despite what `.env.local.example` and `README.md` suggest about OpenAI/Google integrations, those endpoints only exist in `_archive/app/api/` and are not wired up. Treat the app as fully client-side until an `app/api/*/route.ts` is reintroduced.

**Route layout (all under `app/`):**
- `/` (Today) — `app/page.tsx`, the main entry point
- `/guide`, `/weekly`, `/monthly`, `/daily` — reference content
- `/deck` — flashcard deck
- `/folders` — note/capture filing system
- `/budget`, `/reflection`, `/culture`, `/growth`, `/backup`

Primary navigation is `/`, `/guide`, `/weekly` (the "primary tabs" — horizontal swipe on mobile moves between them, see `PRIMARY_TABS` in `components/layout/PageShell.tsx`). Everything else is behind the "more" drawer in `BottomNav.tsx`. On desktop, `SideNav` is shown instead and `BottomNav` is hidden via CSS.

Every page renders inside `<PageShell>`, which provides:
- Hard-day banner
- Swipe navigation between primary tabs
- `QuickCapture` floating action
- `BottomNav` / `SideNav`
- Version footer from `content/guide.ts` `systemVersionNote`

**Content layer (`content/`):** The "source of truth" text, calendar events, priorities, budget defaults, folders, and Mia-specific data live as typed TypeScript objects in `content/*.ts`. `content/types.ts` is the canonical type registry for `CalendarEvent`, `Priority`, `FinanceItem`, `FolderNote`, `FlashCard`, budget types, media/journal types, etc. When extending the domain, add the type here first.

**State / hooks (`hooks/` and `context/`):** Client state is split between React context (cross-cutting concerns) and per-feature hooks backed by localStorage:
- `context/HardDayContext.tsx` + `hooks/useHardDayMode.ts` — "hard day" toggle that collapses the UI to the bare minimum across every page. Most pages branch on `isHardDay` to hide non-essential panels and switch checklists to a shorter variant.
- `hooks/useLocalEvents.ts`, `useUserEvents.ts` — user-added calendar events merged into the static `dailyEvents`/`aprilOneTimeEvents` from `content/calendar.ts`.
- `hooks/useBudget.ts`, `useFolderSystem.ts`, `useFlashCards.ts`, `useWishlist.ts`, `usePriorityStatus.ts` — each owns one localStorage-backed slice.

**All localStorage keys must be declared in `lib/storage-keys.ts`** before being read/written from a hook or component. This is the single registry — do not scatter string keys across the codebase.

**Time handling:** Event times in content are strings like `"7:30am"`. `lib/time.ts` (`parseEventTime`) converts them to minutes-since-midnight for sorting and "now/next/later" logic. `app/parseEventTime.test.ts` and `app/formatDate.test.ts` are the co-located unit tests for these utilities; colocated tests are the convention.

**UI primitives (`components/ui/`):** `WindowPanel` (titled bordered panel — the main layout unit), `TimeBlock` (one event row), `Expandable`, `Tag`, `QuickCapture`. Styling leans on CSS custom properties defined in `app/globals.css` (`--color-paper`, `--color-chrome`, `--color-ink`, `--color-ink-muted`, `--color-ink-ghost`, `--color-forest`, `--color-moss`, `--color-tomato`, `--color-tangerine`, etc.) plus text utility classes (`text-display`, `text-body`, `text-body-sm`, `text-micro`). Most existing pages use inline `style={{ ... }}` with these CSS vars rather than Tailwind classes — match that style when editing existing pages rather than converting them.

## Design constraints that affect code

These come from `README.md` and the app's philosophy — they shape non-obvious code decisions:
- **Cat meds and personal meds must be visually prominent** (red left-border via `--color-tomato`, `isCritical`/`criticality: 'safety-critical'` on events). These items must remain visible even in hard-day mode.
- **Calendar categories must match the Google Calendar color palette exactly** — see the `CalendarCategory` union in `content/types.ts` (`tomato`, `grape`, `blueberry`, `basil`, `banana`, `flamingo`, `graphite`, `tangerine`, `peacock`, `sage`). Do not invent new colors.
- **Hard-day mode is first-class**, not a cosmetic toggle. When adding a new page or panel, check `useHardDay()` and decide explicitly whether it shows, hides, or collapses in hard-day mode — the default should be "hide unless safety-critical."
- **Design for scanning, not reading.** Prefer adding a new `WindowPanel` with tight copy to adding a modal or a new route. Don't add streaks, mood-rating scales, guilt-inducing copy, or push notifications for non-critical items.
- **Version footer** (`systemVersionNote` in `content/guide.ts`) must remain visible on every page — `PageShell` handles this.

## Git workflow for this environment

The repository's working branch in web-session mode is `claude/init-project-i4FS7` — develop, commit, and push there unless the user explicitly says otherwise. Do not open a pull request unless asked.
