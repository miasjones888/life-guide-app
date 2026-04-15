# Handoff — life-guide-app

**Status:** Phase 1 Step 3 complete (PR #30 merged). Phase 1 Step 4 (nav cleanup + "sprouting in Phase N" placeholders + `/settings` export/import) is next.
**Source of truth:** `main`. Branch Step 4 work directly from `main`.
**Last updated:** 2026-04-15 (after Step 3 shipped).

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

   Same v0 → v1 migration carve-out belongs in `useJournal` from day one — see Step 3 below. (Both follow-ups were resolved: P1 and P2 landed as a hotfix in PR #28, and `useJournal` shipped with the v0 migration wired in from the first commit — see Step 3 ledger entry.)

### Phase 1 Step 3 — Journal drawer (complete)

Shipped in PR #30. Six files, one PR, exactly the scoped plan:

- **`lib/storage-keys.ts`** — registered `STORAGE_KEYS.JOURNAL = 'journal'`, a fresh key for the drawer's paged notebook. Deliberately distinct from the future `growth-journal` entries store.
- **`hooks/useJournal.ts`** — versioned-localStorage hook mirroring `useAnchor` / `useBudget` exactly. State shape: `{ pages: string[], currentPageIndex: number }`. **v0 → v1 migration carve-out wired from day one** (the thing `useAnchor` was missing on first ship): any raw non-JSON string ever written under this key is adopted as page 0 of the notebook instead of being silently dropped. Lesson learned from the PR #27 → PR #28 hotfix cycle, folded in up front.
- **`components/ui/JournalPenButton.tsx`** — 44×44 fixed bottom-right affordance. Paper background, 1px ink-3 border, Unicode pen glyph (`✎`), no image asset. No keyboard shortcut — mobile-first per the prior draft's rejected `n` shortcut. A future desktop power-user shortcut remains acceptable if modifier-gated (`⌘J` / `Ctrl+J`); Step 3 shipped with the button only.
- **`components/ui/JournalDrawer.tsx`** — full-screen drawer. Dotted-paper CSS background via `radial-gradient(circle, rgba(26,25,23,0.14) 1px, transparent 1.4px)` at 18×18px (no image asset). IM Fell English italic `<textarea>` body with `overflow:hidden` + `resize:none` so no soft scroll inside a page. Character-budget pagination (~1200/page) that splits overflow at the nearest word boundary and flows it into the next page (creating one if needed). Closes on `Escape` and on a visible `close` button. Focus never trapped — Tab flows out of the drawer normally.
- **`components/layout/PageShell.tsx`** — mounts `JournalPenButton` + `JournalDrawer` globally so every Phase 1 surface inherits the entry point for free. Journal open state lifted here.
- **`components/ui/QuickCapture.tsx`** — shifted the legacy floating `+` button up to `bottom:124px` so the pen owns the bottom-right corner. (See Step 4 notes below — `QuickCapture` comes out of `PageShell` in Step 4 anyway.)

**Verified:** `npm run test` passes (28/28). `npm run build` succeeds; 16 static routes, `/today` at 5.16 kB. Covenant §10 vocab audit clean across all new surface copy, aria labels, placeholders, and file comments. The mechanical ratchet test caught one doc-comment slip on the first run (`score` / `completion` inside a JSDoc); rewritten clean in the same commit.

**No PR #30 follow-ups logged.** The merge happened immediately after exit criteria were verified, with no review feedback queued. If Codex or another reviewer flags anything post-merge, log it here and resolve it in Step 4 or a dedicated hotfix.

---

## Phase 1 Step 4 — Nav cleanup and "sprouting in Phase N" placeholders (NEXT)

Primary scope:

- **Trim primary nav to 6 items:** `/today`, `/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`. Exact labels match covenant vocabulary.
- **Placeholder routes** for the 5 unbuilt surfaces (`/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`): each renders a single styled "sprouting in Phase N" card. One line each. No functionality, no placeholder data, no faked UI.
- **Redirect legacy routes** from the Phase 0 tree (`/daily`, `/weekly`, `/monthly`, `/deck`, `/folders`, `/reflection`, `/culture`, `/growth`, `/backup`, `/guide`) to their closest Phase 1 equivalent, or `/today` if there isn't one. `next/navigation` redirect stubs, same pattern as `app/page.tsx` already uses.
- **`BottomNav` and `SideNav` updated accordingly.** No "more" drawer — if it's not in the 6, it's not in the nav.
- **`/settings`** (not in nav, reached via a chrome menu): Export All / Import All JSON backed by the same versioned-localStorage pattern. This is the Phase 1 escape hatch — if any store migration ever breaks, Mia can export + reload. Reuse `useBudget`'s `exportData` / `importData` shape across `useAnchor`, `useJournal`, and any other versioned store. Round-trip every store before shipping.
- **As legacy routes get deleted, their entries come out of the `tests/covenant-vocab.test.ts` allowlist in the same commit.** End state for Phase 1 is an empty (or near-empty) allowlist.

**Folded into Step 4 (added 2026-04-15 after Step 3 shipped — flagged during the Step 3 completion report):**

1. **Unmount `QuickCapture` from `PageShell`.** It's a Phase 0 legacy component whose only save path runs into `useFolderSystem`, which lives at `/folders`. Once Step 4 redirects `/folders` away, `QuickCapture` has nothing to capture into, and the journal drawer is now the Phase 1 freeform capture path. Cleanest move: delete the `<QuickCapture />` render from `components/layout/PageShell.tsx` in the same commit that redirects `/folders`. The component file itself can stay (it's on the salvage list and will be re-used if/when the Phase 2 Notes surface wants it) — it just stops being rendered globally. As a side effect, the `bottom:124px` slot that Step 3 opened up goes back to being free space.

2. **Handle the `content/guide.ts` → `PageShell` import chain.** `PageShell.tsx` currently imports `systemVersionNote` from `content/guide.ts` for the footer, and `content/guide.ts` is in the covenant-vocab ratchet allowlist because `/guide` is on its way out. Two options, pick one before writing code:
   - **(a) Relocate.** Move `systemVersionNote` (and only that export) to a tiny standalone module — e.g. `content/version.ts` — and update the import in `PageShell.tsx`. Then delete `content/guide.ts` and `app/guide/page.tsx` and their covenant-vocab allowlist entries in the same commit.
   - **(b) Inline.** Hard-code the version string directly in `PageShell.tsx` and delete `content/guide.ts` + `app/guide/page.tsx` + both allowlist entries in the same commit.
   Recommendation: (a) if the version string is likely to be referenced again elsewhere (settings screen, about surface); (b) if it's genuinely single-use. Either way, `content/guide.ts` and `app/guide/page.tsx` both leave the covenant-vocab allowlist in Step 4.

**Exit criteria:** 6 nav items visible, every legacy route redirects cleanly, `/settings` Export → Import round-trips every versioned store (anchor, journal, budget, folders, wishlist, user events, local events, hard-day mode), covenant-vocab allowlist shrinks to near-empty, `QuickCapture` no longer renders on `/today`, `content/guide.ts` and `app/guide/page.tsx` no longer exist. `npm run test` and `npm run build` both green.

---

## Out of scope for Phase 1 (explicit)

- Garden surface (Phase 2)
- Notes surface / notecards / folders re-skin (Phase 2)
- Tear-out interaction (Phase 2)
- Phase system, slot activation dialogs, weekly review ritual (Phase 2)
- Seedlings — week-by-week practice introduction, inside the weekly review ritual (Phase 2, see `SEEDLINGS.md`)
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

Read in this order — first the four orientation docs, then the references for Step 4:

1. **`COVENANT.md`** — everything. Read this first every session.
2. **`HANDOFF.md`** — this file. Phase ledger, Step 4 plan, hard don'ts.
3. **`CLAUDE.md`** — hard rules and command reference for every session.
4. **`content/mia.ts`** — the grounding file. Real specimens, hard-day minimum, archetype system, terrain zones.
5. **`hooks/useBudget.ts`** — canonical versioned-localStorage pattern. `exportData` / `importData` here are the shape to mirror across every versioned store for the `/settings` escape hatch.
6. **`hooks/useAnchor.ts`** + **`hooks/useJournal.ts`** — the two Phase 1 stores that need `exportData` / `importData` added in Step 4 to match the `useBudget` shape.
7. **`lib/storage-keys.ts`** — the full key registry. Every key in here needs to round-trip through `/settings` export/import.
8. **`tests/covenant-vocab.test.ts`** — the mechanical half of §10 enforcement. The allowlist is the Step 4 shopping list: every legacy file in it comes out in the same commit that deletes or rewrites the file.
9. **`components/layout/PageShell.tsx`** — where `QuickCapture` gets unmounted and where the `content/guide.ts` import needs to be relocated or inlined.
10. **`components/layout/BottomNav.tsx`** + **`components/layout/SideNav.tsx`** — the two nav surfaces being trimmed to 6 items.
11. **`app/page.tsx`** — canonical `next/navigation` redirect stub; copy this shape for every legacy route redirect.
12. **`content/calendar.ts`** — what's real on the calendar. Stays as-is in Step 4; relevant because `/calendar` becomes a placeholder surface and the real content continues to flow through `/today`.
13. **`components/folders/ProjectFolder.tsx`** + siblings — the 981 lines to re-skin in Phase 2. Do not touch in Step 4 — just unmount the `QuickCapture` entry point and redirect `/folders`.

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

## What must be true before Step 4 starts

Only one thing: the next agent reads `COVENANT.md` end-to-end with fresh eyes, then this file, then `CLAUDE.md`, then `content/mia.ts`, then opens `hooks/useBudget.ts` (for the `exportData` / `importData` shape to mirror across every versioned store) and `tests/covenant-vocab.test.ts` (to see which legacy files leave the allowlist in the same commit they're deleted). Everything else above is already decided.

---

*End of handoff. Steps 1, 2, and 3 shipped. Step 4 is nav cleanup + "sprouting in Phase N" placeholders + the `/settings` export/import escape hatch, with the `QuickCapture` unmount and `content/guide.ts` import cleanup folded in.*
