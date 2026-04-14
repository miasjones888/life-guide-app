# Phase 0 Handoff — life-guide-app

**Status:** Phase 0 complete. April 14, 2026.
**Branch:** `claude/merge-guide-systems-UxLng`
**Next:** Phase 1 (contingent on Mia's stack approval — see Open Decisions below).

---

## What Phase 0 was for

Phase 0 was the audit + grounding phase. No feature work, no UI changes. The goal was to strip every piece of Claude-invented content from the repo, put Mia's real voice and real data in, and write the covenant that governs every PR from here forward.

---

## What Phase 0 delivered

### Mia-authored content (the new source of truth)

- **`COVENANT.md`** — an 11-section compiled design thinking document. Authored by Mia in a design conversation on April 14, 2026. Claude typed; every word is hers. This is the highest-precedence document in the repo. Every PR is measured against it. **Do not edit it.** If a covenant section is ambiguous, ask Mia — do not infer.
- **`content/mia.ts`** — the grounding file. Real specimens, real hard-day minimum, archetypes from the field guide, terrain zones. Mia authored the content; Claude scaffolded the types only.
- **`content/calendar.ts`** — re-audited line by line. Only real events remain: cat meds 9am / 9pm (Maisie + Meeko), April / May / June 2026 one-time events. All Claude-invented timeblocks struck (morning routines, evening routines, bedtime meds, skincare, deep focus Wed/Sat, etc.).
- **`content/budget.ts`** — all amounts zeroed. Structure preserved. Mia fills in real numbers in Phase 3.

### Archived (moved to `_archive/`, git history preserved)

- `_archive/docs/` — **27** Claude-authored design documents (manifesto, life-guide v1.1, calendar v1.1, PRDs, acceptance criteria, content maps, etc.). **Do not promote anything from here.** It is not Mia's voice.
- `_archive/app/api/`, `_archive/app/actions/` — assistant infrastructure (OpenAI/Anthropic routes, Google Calendar / Gmail endpoints).
- `_archive/components/ui/` — `AssistantPanel.tsx`.
- `_archive/lib/gmail.ts`, `_archive/lib/google-calendar.ts`.
- `tests/verbatim-copy.test.ts` — deleted. The "grounding phrases" were Claude-authored; the test locked them in.

### Salvage list — untouched, load-bearing, treat as ground truth

- `hooks/useBudget.ts`, `hooks/useFolderSystem.ts`, `hooks/useHardDayMode.ts` — **canonical versioned-localStorage pattern.** Copy this shape when building new stores in Phase 1+.
- `context/HardDayContext.tsx` — global hard-day toggle wiring. Reuse, don't rewrite.
- `components/folders/*` (~981 lines: `ProjectFolder`, `NoteCardItem`, `NoteCardStack`, `CaptureStack`, `FolderShelf`, `AddNoteSheet`) — the folder UI. **Re-skin, do not rewrite.**
- `components/ui/{WindowPanel,Tag,Expandable,QuickCapture,TimeBlock}.tsx`.
- `lib/time.ts`, `lib/storage-keys.ts`, `app/parseEventTime.test.ts`, `app/formatDate.test.ts`.
- `app/layout.tsx`, `tailwind.config.ts`, `next.config.js`, `public/manifest.json`, `public/sw.js`, `package.json`.

---

## What COVENANT.md locks in (pointer, not summary)

**Read the file.** It's short (~230 lines), it's Mia's voice, and any summary here risks distorting it. The eleven sections for orientation:

1. What Should This App Never Do
2. What Should This App Always Do
3. If It Ever Happens, Rip the Feature Out — Absolute Redlines
4. Apps and Systems This App Must Be the Opposite Of
5. What the App Must Protect Against on Your Worst Day
6. Language the App Must Never Echo — Negative Self-Talk Audit
7. The Garden / Field-Guide Metaphor — Why It's the Soul of the App
8. What the App Does Right When You Come Back After a Week Away
9. Prototype Feedback — What Went Wrong and What Must Change
10. Core Vocabulary — Language the App Uses
11. The Single Underlying Principle

§10 is mechanically enforceable: if any source file ships words from the "Never use" list (`overdue`, `incomplete`, `missed`, `behind`, `failed`, `inactive`, `abandoned`, `todo`, `task`, `productivity`, `streak`, `score`, `completion`, `deadline`), that's a covenant violation. **Phase 1 should add a vitest grep test for this.**

---

## Decisions — my call, override me anywhere

Mia asked me to stop punting these back to her. Everything below is my judgment as a coding expert working inside this covenant. She can veto any of it.

### Stack: keep what's already here. Do **not** introduce Zustand yet.

Next.js 14 App Router + Tailwind + Vitest + the existing versioned-localStorage hook pattern (`useBudget`, `useFolderSystem`, `useHardDayMode`). `next-pwa` already wired. Vercel deploy already working.

**Why not Zustand:** `useBudget.ts` already does versioned migrations cleanly. `useFolderSystem.ts` does the same. Introducing Zustand adds a dependency, a new mental model, and a migration cost in exchange for almost nothing for a solo-user offline-first app. The hooks pattern scales fine to 6 surfaces. If cross-hook orchestration becomes painful later (concrete, not speculative), revisit.

**Why not a new repo / Astro / Remix:** none of the problems in this repo are framework problems. Migrating is a scope-creep trap.

### Supabase: Phase 3, not before.

Phase 1 must feel instant, private, offline. Auth complicates "open the app, see your day." When Supabase shows up, it shows up as a sync adapter behind the existing hook API — no component changes.

### Base branch: branch from here.

Phase 1 branches from `claude/merge-guide-systems-UxLng` as `claude/phase-1-chrome-and-today`. Phase 0's commits stay where they are. Phase 1 PRs merge into `main` directly or into `claude/merge-guide-systems-UxLng` and then forward — whichever Mia's review workflow prefers.

### Design tokens: apply the contrast bump, ship as Step 1.

The previous agent's recommended values (raised `--ink-3`, `--ink-4`, stronger borders, higher landscape opacity, 11px micro text instead of 10px) are correct. Ship them on day 1 of Phase 1 in a single commit to `app/globals.css` and verify with a one-time axe-core run. Any text below 4.5:1 on cream or any border below 1.5:1 is a blocker.

### Forest scatter density: Phase 2, not Phase 1.

Density is a Garden-surface concern. Garden isn't in Phase 1 (see scope below). When Phase 2 builds Garden, do the 40 → 80 elements + 5th parallax layer + deterministic PRNG keyed to date. Not earlier.

### `lib/guardrails.ts`: create in Phase 1 Step 2.

20 lines of exported constants (`MAX_ACTIVE_CREATIVE_SLOTS: 3`, `MAX_ACTIVE_LIFE_TASK_SLOTS: 1`, `MAX_TOTAL_ACTIVE_SPECIMENS: 4`, `ACTIVATION_ONLY_DURING_WEEKLY_REVIEW: true`, `DORMANCY_IS_FRICTIONLESS: true`, `NO_STREAKS: true`, etc.) — cheap, high-signal, every future contributor needs to see it on day one. Worth doing before any specimen code exists so the constraints land first.

### Custom ESLint rule `enforce-hard-day-awareness`: Phase 2, not Phase 1.

Custom ESLint rules have a real maintenance cost and they need enough surfaces to enforce against to be worth writing. Phase 1 has one surface (Today) plus a drawer. That's not enough. Write the rule when Phase 2 adds Garden — at that point we have 2+ list-rendering surfaces and the rule earns its keep.

### Covenant §10 vocabulary grep test: Phase 1 Step 1.

Trivially cheap. Add a vitest that greps every `.ts` / `.tsx` file under `app/`, `components/`, `hooks/`, `lib/`, `context/`, `content/` for the §10 "Never use" list and fails on any match. This is the mechanical half of enforcing the covenant and it ships on day one.

---

## Critical files to read first (priority order for a fresh session)

1. **`COVENANT.md`** — everything. Read this first every session.
2. **`content/mia.ts`** — the grounding file. Real specimens, hard-day minimum, archetype system, terrain zones.
3. **`content/calendar.ts`** — what's real on the calendar (spoiler: not much, and that's correct).
4. **`hooks/useBudget.ts`** — canonical versioned-localStorage pattern to copy for new stores.
5. **`hooks/useFolderSystem.ts`** — same pattern, second reference.
6. **`components/folders/ProjectFolder.tsx`** + siblings — the 981 lines to re-skin in Phase 2.
7. **`context/HardDayContext.tsx`** — hard-day wiring to reuse.
8. **`CLAUDE.md`** on branch `claude/init-project-i4FS7` — codebase orientation doc. ⚠️ Written *before* the Phase 0 audit on this branch, so some details about `_archive` and architecture are slightly stale. Useful for shape, not specifics. Porting it onto `claude/merge-guide-systems-UxLng` and refreshing it is a Phase 1 task.

---

## Hard don'ts (still in force)

- **Do not rewrite `components/folders/*`.** Re-skin only.
- **Do not generate `content/mia.ts` entries.** Mia authors, Claude scaffolds types.
- **Do not restore anything from `_archive/docs/`.** Not her voice.
- **Do not add an OpenAI / Anthropic assistant to Phase 1.** The archive exists; leave it archived.
- **Do not build LifeOS.** The goal is "the field guide that actually syncs to her phone and reminds her about cat meds." Everything else is scope creep.
- **Do not create onboarding flows.** COVENANT §3 forbids them.
- **Do not use any word from the §10 "Never use" list in source files.**
- **Three creative slots + one life task slot = hard cap.** Not soft warnings. Activation only during weekly review. Dormancy frictionless any time.
- **Do not track sessions, last-opened timestamps, or elapsed time anywhere visible.** COVENANT §8.

---

## Phase 1 scope — my version (narrower than the previous agent's)

The previous agent's Phase 1 scope tried to ship the Garden surface. I'm cutting Garden to Phase 2. My reason: Phase 1 should prove the visual/interaction pattern on **one** working surface (Today) with the capture drawer wired up, *before* committing that pattern to the biggest, most design-sensitive surface in the app. If Today feels right after Phase 1, Garden inherits the pattern in Phase 2. If Today feels wrong, we fix the pattern before it gets cemented into Garden and we avoid a rewrite.

Phase 1 is **four steps**, sequenced. Each step ships on its own PR so Mia can stop us at any point.

### Step 1 — Visual baseline and covenant enforcement (1–2 days)

- Contrast + typography tokens applied in `app/globals.css`: raised `--ink-3` / `--ink-4`, stronger border rgba values, higher landscape-opacity range, 11px text-micro.
- Typography stack loaded: IBM Plex Mono (chrome/micro), IM Fell English italic (journal body), DM Serif Display (display), VT323 (monospace accents). Self-host via `next/font/google` or `next/font/local` — no CDN `<link>`s.
- Vitest: `tests/covenant-vocab.test.ts` — greps source files for the §10 "Never use" list, fails on match. Carve out `_archive/` and this file itself via an allowlist.
- axe-core: one-time run against `/` (the current Today page). No text below 4.5:1 on cream, no border below 1.5:1. Blockers fixed before the PR merges.
- No new routes, no new surfaces, no new components. Visual-only + one test.

**Exit criteria:** `npm run test` passes, axe-core run is clean, `/` still renders at least as well as it did before.

### Step 2 — Guardrails file and Today Anchor surface (3–4 days)

- Create `lib/guardrails.ts` with the 20-line constants export. Import it in Step 2 code that could otherwise drift (anywhere the slot system or `NO_STREAKS` would apply).
- Rebuild `/` → `/today` as the **Today Anchor** surface.
  - Reads from: `content/calendar.ts` (cat meds, April/May/June one-time events), `content/mia.ts` (hard-day minimum), existing `useHardDayMode` / `HardDayContext`, new `useAnchorTask` hook (localStorage, follows the `useBudget` versioned pattern).
  - Shows: time + date header, hard-day toggle, anchor-task input, cat meds and any hard-day-minimum items as always-visible rows, Now / Next / Later for real events only, nothing else. No "what matters now" panel, no "coming up" panel, no morning/evening checklist (all Claude-invented).
  - Hard-day mode collapses the surface to: cat meds, your meds (if surfaced from mia.ts), anchor task. Nothing else is visible.
- Old `/` route redirects to `/today`. Other old routes (`/daily`, `/weekly`, etc.) stay as-is temporarily — Step 4 handles them.
- No Garden. No notes. No budget surface changes. No assistant.

**Exit criteria:** opening the app goes to `/today`; real events from `calendar.ts` render; hard-day mode collapses correctly; the surface is usable in under 10 seconds from cold open.

### Step 3 — Journal drawer (2–3 days)

- Global keyboard shortcut `n` opens a full-screen drawer.
- Dotted-paper CSS background (radial-gradient pattern — no image asset).
- `<textarea>` body in IM Fell English italic, pagination (pages fill up and a new one starts; no soft scroll).
- Persists to localStorage via a new `useJournal` hook, same versioned pattern as `useBudget`. Register the storage key in `lib/storage-keys.ts`.
- **No tear-out interaction yet.** Tear-out requires Notes surface to exist as a destination (Phase 2).
- Drawer closes on Escape and on a visible close button. Never traps focus or blocks the rest of the app.
- Covenant audit against the drawer copy before the PR merges.

**Exit criteria:** press `n` anywhere → drawer opens → type → close → reopen → content persists.

### Step 4 — Nav cleanup and "sprouting in Phase N" placeholders (1–2 days)

- Primary nav trimmed to 6 items: `/today`, `/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`. Exact labels to match covenant vocab.
- Unbuilt surfaces (`/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`) render a single styled "sprouting in Phase N" card. No functionality, no placeholder data, no faked UI. One line each.
- Old routes from the Phase 0 tree (`/daily`, `/weekly`, `/monthly`, `/deck`, `/folders`, `/reflection`, `/culture`, `/growth`, `/backup`) redirect to their closest Phase 1 equivalent or to `/today` if there isn't one.
- `BottomNav` and `SideNav` updated accordingly. No "more" drawer — if it's not in the 6, it's not in the nav.
- Settings route at `/settings` (not in nav, reached via chrome menu): Export All / Import All JSON backed by the same versioned localStorage pattern. This is the Phase 1 escape hatch — if any store migration ever breaks, Mia can export + reload.

**Exit criteria:** 6 nav items, redirects work, Export/Import round-trips cleanly.

### Out of scope for Phase 1 (explicit)

- Garden surface (Phase 2)
- Notes surface / notecards / folders re-skin (Phase 2)
- Tear-out interaction (Phase 2)
- Phase system, slot activation dialogs, weekly review ritual (Phase 2)
- All 17 archetypes (Phase 2)
- Budget real numbers (Phase 3; Mia fills in when she sits with it)
- Supabase, auth, cross-device sync (Phase 3)
- Web Push for cat meds (Phase 4)
- Assistant, email, calendar write-back (out of scope indefinitely — the archive stays archived)

### What must be true before Phase 1 starts

Only one thing: Mia has read COVENANT.md end-to-end once with fresh eyes and is satisfied it says what she meant it to say. Everything else above is already decided.

---

## Commit log for Phase 0 (this branch)

Most recent first:

```
7c87c62  Phase 0: COVENANT.md — append §10 Core Vocabulary + §11 Single Principle
8282ff9  Phase 0: COVENANT.md — append §9 Prototype Feedback
191da84  Phase 0: COVENANT.md — append §8 Coming Back After a Week Away
349e799  Phase 0: COVENANT.md — append §7 Garden / Field-Guide Metaphor
bf3d86a  Phase 0: COVENANT.md — append §6 Negative Self-Talk Audit
592e0c9  Phase 0: COVENANT.md — append §5 Worst Day Protections
3d269f8  Phase 0: COVENANT.md — append §4 Apps This Must Be the Opposite Of
b532c60  Phase 0: COVENANT.md — append §3 Absolute Redlines
0357d75  Phase 0: COVENANT.md — append §2 What Should This App Always Do
84ed4fa  Phase 0: start COVENANT.md — §1 What Should This App Never Do
19d0268  Phase 0: re-audit calendar.ts — restore confirmed real events, add May/June
8db49d8  Phase 0: complete invented-content archive + mia.ts revisions
0ca6056  Phase 0: fill in mia.ts with real specimens from brain dump
25e9289  Phase 0: scaffold typed stubs for mia.ts and COVENANT.md
61a5005  Phase 0 audit: strip invented content, archive docs
```

Every commit message prefixed with `Phase 0:` is part of this audit.

---

*End of Phase 0 handoff. Decisions made. Mia: read COVENANT.md once with fresh eyes, then tell me to start Phase 1 Step 1.*
