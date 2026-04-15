# Handoff — life-guide-app

**Status:** Phase 1 Step 1 complete. ANCHOR rename complete. Phase 1 Step 2 is next.
**Source of truth:** `main`. Branch Step 2 work directly from `main`.
**Last updated:** 2026-04-15.

---

## Phase ledger

### Phase 0 — audit and grounding (complete)

Phase 0 was the audit + grounding phase. No feature work, no UI changes. The goal was to strip every piece of Claude-invented content from the repo, put Mia's real voice and real data in, and write the covenant that governs every change from here forward.

**Delivered:**

- **`COVENANT.md`** — 11-section compiled design thinking document. Authored by Mia in a design conversation on April 14, 2026. Claude typed; every word is hers. This is the highest-precedence document in the repo. Every change is measured against it. **Do not edit it.** If a section is ambiguous, ask Mia — do not infer.
- **`content/mia.ts`** — the grounding file. Real specimens, real hard-day minimum, archetypes from the field guide, terrain zones. Mia authored the content; Claude scaffolded the types only.
- **`content/calendar.ts`** — re-audited line by line. Only real events remain: cat meds 9am / 9pm (Maisie + Meeko), April / May / June 2026 one-time events. All Claude-invented timeblocks struck.
- **`content/budget.ts`** — all amounts zeroed. Structure preserved. Mia fills in real numbers in Phase 3.

**Archived (moved to `_archive/`, git history preserved):**

- `_archive/docs/` — 27 Claude-authored design documents. **Do not promote anything from here.** It is not Mia's voice.
- `_archive/app/api/`, `_archive/app/actions/` — assistant infrastructure (OpenAI/Anthropic routes, Google Calendar / Gmail endpoints).
- `_archive/components/ui/` — `AssistantPanel.tsx`.
- `_archive/lib/gmail.ts`, `_archive/lib/google-calendar.ts`.
- `tests/verbatim-copy.test.ts` — deleted. The "grounding phrases" were Claude-authored; the test locked them in.

**Salvage list — untouched, load-bearing, treat as ground truth:**

- `hooks/useBudget.ts`, `hooks/useFolderSystem.ts`, `hooks/useHardDayMode.ts` — **canonical versioned-localStorage pattern.** Copy this shape when building new stores in Phase 1+.
- `context/HardDayContext.tsx` — global hard-day toggle wiring. Reuse, don't rewrite.
- `components/folders/*` (~981 lines: `ProjectFolder`, `NoteCardItem`, `NoteCardStack`, `CaptureStack`, `FolderShelf`, `AddNoteSheet`) — the folder UI. **Re-skin, do not rewrite.**
- `components/ui/{WindowPanel,Tag,Expandable,QuickCapture,TimeBlock}.tsx`.
- `lib/time.ts`, `lib/storage-keys.ts`, `app/parseEventTime.test.ts`, `app/formatDate.test.ts`.
- `app/layout.tsx`, `tailwind.config.ts`, `next.config.js`, `public/manifest.json`, `public/sw.js`, `package.json`.

### Phase 1 Step 1 — visual baseline + covenant enforcement (complete)

Shipped in PRs #24 and #25. What landed:

- **Contrast + typography tokens** applied in `app/globals.css`: raised `--ink-3` / `--ink-4`, stronger border rgba values, higher landscape-opacity range, 11px text-micro. Every text tone audited for ≥4.5:1 contrast on paper (`#F4F1EC`).
- **Typography stack** loaded via `next/font` (no CDN `<link>`s): IBM Plex Mono (chrome/micro), IM Fell English italic (journal body), DM Serif Display (display), VT323 (monospace accents).
- **`tests/covenant-vocab.test.ts`** — greps `.ts` / `.tsx` files under `app/`, `components/`, `hooks/`, `lib/`, `context/`, `content/` for the §10 "Never use" list and fails on any match. Allowlist is a ratchet: every entry is a legacy surface scheduled for rewrite in Step 2 or Step 4, and the allowlist shrinks as those steps land.
- **ANCHOR rename** — `ANCHOR_TASK` → `ANCHOR` across the codebase. The word that used to follow "anchor" is on §10's "Never use" list, so it comes out of every label, variable, storage key, and hook name. `lib/storage-keys.ts` already carries `ANCHOR: 'anchor'`, so Step 2's new hook has its key waiting for it.

**Verified:** `npm run test` passes (28/28). `npm run build` succeeds with 15 static routes. The only surfaces still shipping §10 vocabulary are the ones in the ratchet's allowlist — all of them scheduled for Step 2 or Step 4 rewrites.

---

## Phase 1 Step 2 — Guardrails + Today (Anchor) surface (NEXT)

One PR, four files touched, exit criteria below.

### What to build

1. **`lib/guardrails.ts`** — a new ~20-line constants module. Example surface area:

   ```ts
   export const MAX_ACTIVE_CREATIVE_SLOTS = 3;
   export const MAX_ACTIVE_LIFE_SLOTS = 1;
   export const MAX_TOTAL_ACTIVE_SPECIMENS = 4;
   export const ACTIVATION_ONLY_DURING_WEEKLY_REVIEW = true;
   export const DORMANCY_IS_FRICTIONLESS = true;
   export const NO_STREAKS = true;
   export const NO_SESSION_TRACKING = true;
   ```

   Import it from any Step 2 code that could otherwise drift from the covenant. Naming note: no word from §10's "Never use" list appears in any constant name.

2. **`hooks/useAnchor.ts`** — a new versioned-localStorage hook. Copy the shape of `hooks/useBudget.ts` exactly: same migration pattern, same version field, same schema shape. The storage key already exists at `STORAGE_KEYS.ANCHOR` in `lib/storage-keys.ts`.

3. **`app/today/page.tsx`** — the Today Anchor surface. Reads from:
   - `content/calendar.ts` — cat meds (9am / 9pm, Maisie + Meeko), April / May / June 2026 one-time events.
   - `content/mia.ts` — hard-day minimum.
   - `context/HardDayContext` + `hooks/useHardDayMode` — existing.
   - `hooks/useAnchor` — new (item 2 above).

   What it shows:
   - Time + date header.
   - Hard-day toggle.
   - Anchor input — the single sentence Mia sets for the day. Not a list. Not a checklist. One line.
   - Cat meds and any hard-day-minimum items as always-visible rows.
   - Now / Next / Later sections for real calendar events only.
   - **Nothing else.** No "what matters now" panel, no "coming up" panel, no morning/evening checklist (all Claude-invented in the Phase 0 audit and archived).

   Hard-day mode collapses the surface to: cat meds, Mia's meds (if surfaced from `content/mia.ts`), anchor line. Nothing else is visible.

4. **`app/page.tsx`** — replace the legacy implementation with a minimal redirect to `/today`, and remove its entry from the `tests/covenant-vocab.test.ts` allowlist in the same commit.

### What must not happen

- No Garden surface. Phase 2.
- No Notes surface / notecards / folders re-skin. Phase 2.
- No tear-out interaction. Phase 2.
- No slot activation dialogs or weekly review ritual. Phase 2.
- No new routes beyond `/today`. Step 4 handles nav and old routes.
- No assistant, no API routes, no env vars. The archive stays archived.
- No onboarding flow. COVENANT §3.
- No session tracking, last-opened timestamps, or visible elapsed time. COVENANT §8.
- No §10 vocabulary in any string the user will ever see. The ratchet catches it mechanically.

### Exit criteria for Step 2

- `npm run test` passes. The covenant-vocab ratchet passes with `/app/today/page.tsx` and `hooks/useAnchor.ts` and `lib/guardrails.ts` all clean (not added to the allowlist).
- `npm run build` succeeds.
- Opening `/` redirects to `/today`.
- Real events from `content/calendar.ts` render correctly in Now / Next / Later.
- Hard-day mode collapses the surface correctly.
- The surface is usable in under 10 seconds from cold open.
- The PR has one clean commit history and a short description.

---

## Phase 1 Steps 3 and 4 — unchanged from the Phase 0 plan

### Step 3 — Journal drawer (2–3 days)

- Global keyboard shortcut `n` opens a full-screen drawer.
- Dotted-paper CSS background (radial-gradient pattern — no image asset).
- `<textarea>` body in IM Fell English italic, pagination (pages fill up and a new one starts; no soft scroll).
- Persists to localStorage via a new `useJournal` hook, same versioned pattern as `useBudget`. Register the storage key in `lib/storage-keys.ts`.
- **No tear-out interaction yet.** Tear-out requires the Notes surface to exist as a destination (Phase 2).
- Drawer closes on Escape and on a visible close button. Never traps focus or blocks the rest of the app.
- Covenant audit against the drawer copy before the PR merges.

**Exit criteria:** press `n` anywhere → drawer opens → type → close → reopen → content persists.

### Step 4 — Nav cleanup and "sprouting in Phase N" placeholders (1–2 days)

- Primary nav trimmed to 6 items: `/today`, `/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`. Exact labels to match covenant vocabulary.
- Unbuilt surfaces (`/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`) render a single styled "sprouting in Phase N" card. No functionality, no placeholder data, no faked UI. One line each.
- Old routes from the Phase 0 tree (`/daily`, `/weekly`, `/monthly`, `/deck`, `/folders`, `/reflection`, `/culture`, `/growth`, `/backup`, `/guide`) redirect to their closest Phase 1 equivalent or to `/today` if there isn't one.
- `BottomNav` and `SideNav` updated accordingly. No "more" drawer — if it's not in the 6, it's not in the nav.
- Settings route at `/settings` (not in nav, reached via chrome menu): Export All / Import All JSON backed by the same versioned localStorage pattern. This is the Phase 1 escape hatch — if any store migration ever breaks, Mia can export + reload.
- As legacy routes get deleted, their entries come out of the covenant-vocab allowlist in the same commit.

**Exit criteria:** 6 nav items, redirects work, Export/Import round-trips cleanly, covenant-vocab allowlist shrinks to near-empty.

---

## Out of scope for Phase 1 (explicit)

- Garden surface (Phase 2)
- Notes surface / notecards / folders re-skin (Phase 2)
- Tear-out interaction (Phase 2)
- Phase system, slot activation dialogs, weekly review ritual (Phase 2)
- All 17 archetypes (Phase 2)
- Budget real numbers (Phase 3; Mia fills in when she sits with it)
- Supabase, auth, cross-device sync (Phase 3)
- Web Push for cat meds (Phase 4)
- Assistant, email, calendar write-back (out of scope indefinitely — the archive stays archived)

---

## Decisions already made — my call as the previous agent, override me anywhere

### Stack: keep what's already here. Do not introduce Zustand yet.

Next.js 14 App Router + Tailwind + Vitest + the existing versioned-localStorage hook pattern (`useBudget`, `useFolderSystem`, `useHardDayMode`). `next-pwa` already wired. Vercel deploy already working.

**Why not Zustand:** `useBudget.ts` already does versioned migrations cleanly. `useFolderSystem.ts` does the same. Introducing Zustand adds a dependency, a new mental model, and a migration cost in exchange for almost nothing for a solo-user offline-first app. The hooks pattern scales fine to 6 surfaces. If cross-hook orchestration becomes painful later (concrete, not speculative), revisit.

**Why not a new repo / Astro / Remix:** none of the problems in this repo are framework problems. Migrating is a scope-creep trap.

### Supabase: Phase 3, not before.

Phase 1 must feel instant, private, offline. Auth complicates "open the app, see your day." When Supabase shows up, it shows up as a sync adapter underneath the existing hook API — no component changes.

### Design tokens: shipped in Step 1.

The contrast bump is live: raised `--ink-3` / `--ink-4`, stronger borders, higher landscape opacity range, 11px text-micro. No text below 4.5:1 on cream. No border below 1.5:1. If Step 2 reveals any drift, fix it in-place and re-audit with axe-core.

### Forest scatter density: Phase 2, not Phase 1.

Density is a Garden-surface concern. Garden isn't in Phase 1. When Phase 2 builds Garden, do the 40 → 80 elements + 5th parallax layer + deterministic PRNG keyed to date. Not earlier.

### Custom ESLint rule `enforce-hard-day-awareness`: Phase 2, not Phase 1.

Custom ESLint rules have a real maintenance cost and they need enough surfaces to enforce against to be worth writing. Phase 1 has Today plus a drawer. That's not enough. Write the rule when Phase 2 adds Garden — at that point there are 2+ list-rendering surfaces and the rule earns its keep.

### Covenant §10 vocabulary grep test: shipped in Step 1.

`tests/covenant-vocab.test.ts` is live. The allowlist is a ratchet, not a permanent exemption — every entry has an inline comment explaining when it comes out.

---

## Priority reading list for a fresh session

Read in this order — first the four orientation docs, then the references for Step 2:

1. **`COVENANT.md`** — everything. Read this first every session.
2. **`HANDOFF.md`** — this file. Phase ledger, Step 2 plan, hard don'ts.
3. **`CLAUDE.md`** — hard rules and command reference for every session.
4. **`content/mia.ts`** — the grounding file. Real specimens, hard-day minimum, archetype system, terrain zones.
5. **`content/calendar.ts`** — what's real on the calendar (spoiler: not much, and that's correct).
6. **`hooks/useBudget.ts`** — canonical versioned-localStorage pattern to copy for `useAnchor` and future stores.
7. **`hooks/useFolderSystem.ts`** — same pattern, second reference.
8. **`lib/storage-keys.ts`** — `STORAGE_KEYS.ANCHOR` is already registered for `useAnchor` to reuse.
9. **`tests/covenant-vocab.test.ts`** — the mechanical half of §10 enforcement. Read this before writing any new surface copy; `app/page.tsx` comes out of the allowlist as part of Step 2.
10. **`app/globals.css`** — the Step 1 visual baseline.
11. **`context/HardDayContext.tsx`** — hard-day wiring to reuse on the Today surface.
12. **`components/folders/ProjectFolder.tsx`** + siblings — the 981 lines to re-skin in Phase 2 (not Step 2).

---

## Hard don'ts (still in force)

- **Do not rewrite `components/folders/*`.** Re-skin only.
- **Do not generate `content/mia.ts` entries.** Mia authors, Claude scaffolds types.
- **Do not restore anything from `_archive/docs/`.** Not her voice.
- **Do not add an OpenAI / Anthropic / Google / Gemini assistant, route, or key to Phase 1.** The archive exists; leave it archived. If a branch shows up proposing otherwise, reject it.
- **Do not build LifeOS.** The goal is "the field guide that actually syncs to her phone and reminds her about cat meds." Everything else is scope creep.
- **Do not create onboarding flows.** COVENANT §3 forbids them.
- **Do not use any word from the §10 "Never use" list in source files.** The ratchet will catch you.
- **Three creative slots + one life slot = hard cap.** Not soft warnings. Activation only during weekly review. Dormancy frictionless any time.
- **Do not track sessions, last-opened timestamps, or elapsed time anywhere visible.** COVENANT §8.

---

## What must be true before Step 2 starts

Only one thing: the next agent reads `COVENANT.md` end-to-end with fresh eyes, then this file, then `CLAUDE.md`, then `content/mia.ts`, then opens `hooks/useBudget.ts` as the pattern reference. Everything else above is already decided.

---

*End of handoff. Step 1 shipped. Step 2 is the Anchor surface.*
