# Handoff — life-guide-app

**Status:** Phase 1 Step 2 complete (PR #27 merged). Phase 1 Step 3 (journal drawer) is next.
**Source of truth:** `main`. Branch Step 3 work directly from `main`.
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

### Phase 1 Step 2 — Guardrails + Today (Anchor) surface (complete)

Shipped in PR #27. Four files, one PR, exactly the scoped plan:

- **`lib/guardrails.ts`** — covenant-derived constants module: slot caps (3 creative + 1 life), `ACTIVATION_ONLY_DURING_WEEKLY_REVIEW`, `DORMANCY_IS_FRICTIONLESS`, `NO_STREAKS`, `NO_SESSION_TRACKING`. No §10 vocabulary in any constant name.
- **`hooks/useAnchor.ts`** — versioned-localStorage hook mirroring `useBudget`'s shape exactly. Date-scoped: yesterday's anchor reads as empty so it never lands as today's decision. Reuses `STORAGE_KEYS.ANCHOR`.
- **`app/today/page.tsx`** — the Anchor surface. Header (time + date + hard-day toggle), single-sentence anchor input in the display serif, hard-day-minimum rows from `content/mia.ts` always visible, and Now / Next / Later built only from `content/calendar.ts` (`dailyEvents` + this weekday's `weeklyEvents` + today's one-time events). Hard-day mode collapses to anchor + minimum.
- **`app/page.tsx`** — replaced with a `next/navigation` redirect to `/today`. The `app/page.tsx` entry came out of the `tests/covenant-vocab.test.ts` ratchet in the same commit. The ratchet shrank by one.

**Verified:** `npm run test` passes (28/28). `npm run build` succeeds; `/today` ships at 5.03 kB, `/` collapses to a 137 B redirect stub.

**Codex follow-ups from PR #27 — known issues to resolve in Step 3 or as a hotfix.** Codex flagged two real bugs after the merge. Both are small and tractable; both should be fixed before they bite.

1. **P1 — `/today` hides date-only events.** `getNowNextLater` in `app/today/page.tsx` filters out every event without a `time` field, and the page has no alternate path for date-only items. That means safety-critical one-time external events like `apr15-tax-day` and `may22-contract-end` never render on `/today` even on the correct date. Fix: render a small "today" section above Now / Next / Later that lists date-only events for `localIsoDate(now)`. Show outside hard-day mode only (per HANDOFF Step 2's "collapse to minimum" rule). Mark safety-critical rows with the existing tomato left border.
2. **P2 — `useAnchor` silently drops legacy anchor strings on first read.** The previous `app/page.tsx` wrote `localStorage.setItem('anchor', v)` as a raw string under the same key the new hook claims. The new `parseAnchorState` calls `JSON.parse`, throws on the raw string, hits the catch, and returns `emptyState()` — Mia's existing anchor is silently lost. Fix: in the JSON.parse catch branch, treat the raw stored value as a v0 legacy string and adopt it as today's sentence (`{ date: todayKey(), text: stored }`). The next `setAnchorText` call will rewrite it in the v1 shape.

   Same v0 → v1 migration carve-out belongs in `useJournal` from day one — see Step 3 below.

---

## Phase 1 Step 3 — Journal drawer (NEXT)

- **Entry point:** a small fixed pen / corner button (~44×44px, paper background, ink-3 border) in the bottom-right of every screen, positioned just above `BottomNav` so it doesn't collide with it. **Mobile-first:** the visible affordance is the primary path on every device. **No global `n` keyboard shortcut** — the previous draft of this step proposed one and it was rejected: `n` collides with typing in any input (anchor field, future capture box) and mobile has no keyboard, so a keyboard-only entry would make the journal desktop-only by design. If a desktop power-user shortcut is added later it must be modifier-gated (`⌘J` / `Ctrl+J`) so it can't fire while typing — but Step 3 ships with the button only.
- Tapping the pen button opens a full-screen drawer.
- Dotted-paper CSS background (radial-gradient pattern — no image asset).
- `<textarea>` body in IM Fell English italic, pagination (pages fill up and a new one starts; no soft scroll).
- Persists to localStorage via a new `useJournal` hook, same versioned pattern as `useBudget` / `useAnchor`. Register the storage key in `lib/storage-keys.ts` first. **Include the v0 → v1 migration carve-out** that `useAnchor` was missing on first ship (see Codex follow-ups below) — if any prior surface ever wrote a raw string under the same key, fold it into the new shape on first read instead of dropping it.
- **No tear-out interaction yet.** Tear-out requires the Notes surface to exist as a destination (Phase 2).
- Drawer closes on Escape and on a visible close button. Never traps focus or blocks the rest of the app.
- Covenant audit against the drawer copy before the PR merges.

**Exit criteria:** tap the pen button on `/today` (and any other Phase 1 surface) → drawer opens → type → close → reopen → content persists. Works on touch and mouse. No keyboard shortcut required for any path.

---

## Phase 1 Step 4 — Nav cleanup and "sprouting in Phase N" placeholders

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

## What must be true before Step 3 starts

Only one thing: the next agent reads `COVENANT.md` end-to-end with fresh eyes, then this file, then `CLAUDE.md`, then `content/mia.ts`, then opens `hooks/useAnchor.ts` (and `hooks/useBudget.ts` for the deeper pattern) as the reference for the new `useJournal` hook. Everything else above is already decided.

---

*End of handoff. Steps 1 and 2 shipped. Step 3 is the journal drawer with a bottom-right pen-button entry point.*
