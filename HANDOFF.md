# Handoff — life-guide-app

**Status:** Phase 1 complete (Steps 1–4 shipped, follow-up snapshot round-trip test in PR #33, Step 5 cleanup pass shipped in PRs #36 + #37 + Step 5c on this branch). Phase 2 Step 1 (Garden surface — read-only render of `content/mia.ts` specimens with deterministic forest scatter layout) is next.
**Source of truth:** `main`. Branch Phase 2 Step 1 work directly from `main` *after* Step 5c lands — the salvage tree is materially different post-Step-5a, and Garden assumptions written before April 16 may be stale.
**Last updated:** 2026-04-17 (after Step 5c covenant + doc hygiene shipped).

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

**Salvage list — untouched, load-bearing, treat as ground truth.** Step 5a moved most of the original Phase 0 salvage list into `_archive/` because no Phase 1 surface read from it. The list below reflects what is actually live in the tree right now (post-Step-5c). For the archived-but-importable shapes, see the Step 5a entry.

- `hooks/useHardDayMode.ts` — **canonical versioned-localStorage pattern.** The Phase 1 hooks (`useAnchor`, `useJournal`) mirror this shape; copy it when building new stores in Phase 2+. The other Phase 0 hooks that pioneered the pattern (`useBudget`, `useFolderSystem`, `useLocalEvents`, `useUserEvents`) live at `_archive/hooks/` for reference.
- `context/HardDayContext.tsx` — global hard-day toggle wiring. Reuse, don't rewrite.
- `lib/time.ts`, `lib/storage-keys.ts`, `lib/guardrails.ts`, `lib/settings-snapshot.ts`, `app/parseEventTime.test.ts`, `app/formatDate.test.ts`.
- `app/layout.tsx`, `tailwind.config.ts`, `next.config.js`, `public/manifest.json`, `package.json`. (`public/sw.js` and `public/workbox-*.js` are no longer tracked — `next-pwa` regenerates them at build time per Step 5b.)

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

### Phase 1 Step 4 — Nav cleanup, placeholders, and `/settings` escape hatch (complete)

Shipped in PR #32. Twenty-eight files, one PR, exactly the scoped plan:

- **Primary nav trimmed to six** — `BottomNav.tsx` and `SideNav.tsx` rewritten. Nav items: `/today`, `/garden`, `/calendar`, `/notes`, `/budget`, `/field-report`. No "more" drawer. `PageShell`'s edge-swipe order mirrors the same six. `/settings` is reachable by URL, never from the nav.
- **Five "sprouting in Phase N" placeholder surfaces** via a shared `components/ui/PhasePlaceholder.tsx` component. `/garden`, `/calendar`, `/notes`, `/field-report` → Phase 2; `/budget` → Phase 3 (the Phase 0 budget page is replaced).
- **Nine legacy routes redirect** via `next/navigation` stubs (same pattern as `app/page.tsx`): `/daily`, `/weekly`, `/monthly`, `/growth`, `/culture` → `/today`; `/deck`, `/folders`, `/reflection` → `/notes`; `/backup` → `/settings`. `/guide` is **deleted outright** — `app/guide/` and `content/guide.ts` no longer exist. The only surviving use of `systemVersionNote` was the `PageShell` footer, so it inlines there (option (b) from the fold-in note). *(All nine route folders were collapsed into a single `app/[legacy]/page.tsx` catch-all in Step 5c — see ledger entry below.)*
- **`/settings`** — new page, not on the nav, reached by URL. One JSON snapshot round-trips every Phase 1 store: anchor, journal, budget, folders, wishlist, user events, local events, hard-day mode. Reads/writes localStorage verbatim, so every hook's on-disk shape passes through unchanged. `useAnchor` and `useJournal` gained matching `exportData` / `importData` methods mirroring `useBudget`.
- **`QuickCapture` unmounted from `PageShell`** — its only save path led into `useFolderSystem`, which lives at `/folders`, which now redirects. The journal drawer is the Phase 1 freeform capture path. `components/ui/QuickCapture.tsx` itself stays on the salvage list for a potential Phase 2 `/notes` re-skin.
- **Covenant §10 ratchet allowlist shrunk from 10 entries to 4** (`content/mia.ts`, `content/calendar.ts`, `components/ui/TimeBlock.tsx`, `components/folders/NoteCardStack.tsx`). Removed allowlist entries for `app/guide/page.tsx`, `content/guide.ts`, `hooks/usePriorityStatus.ts`, `app/backup/page.tsx`, `components/calendar/AddEventSheet.tsx`, and `content/types.ts`. Deleted `hooks/usePriorityStatus.ts`, `content/guide.ts`, `components/calendar/AddEventSheet.tsx`, and the unused `Priority` / `WorkLocation` / `Pet` / `VetInfo` / `FinanceItem` / `MonthlyBudgetStep` types in `content/types.ts`.

**Verified:** `npm run test` passes (28/28 at PR #32 ship). `npm run build` succeeds; 20 static routes, `/today` at 4.87 kB, placeholders 520 B, redirect stubs 162 B, `/settings` 2.08 kB.

**Follow-up shipped same day in PR #33** — extract `/settings` snapshot logic into `lib/settings-snapshot.ts` and add `tests/settings-snapshot.test.ts` (six cases) so the round-trip is exercised mechanically every CI run, not just by hand in a browser. The follow-up was driven by post-merge verification: the test plan had a manual "edit → export → re-import" check that couldn't be done without a browser, and the cleanest way to verify it was to extract the pure functions and write a jsdom test against them. No behavior change to the live `/settings` page. `npm run test` now passes 34/34. The extracted module also covers the hard-day-mode raw-string edge case: that store writes `"true"`/`"false"` (not JSON), and the round-trip preserves the raw form.

**No PR #32 or #33 review feedback queued.** Both merged immediately after exit criteria were verified. If Codex or another reviewer flags anything post-merge, log it here and resolve as a hotfix or fold into Phase 2 Step 1.

---

### Phase 1 Step 5 — Cleanup pass before Phase 2 opens (complete)

Three concerns, three sub-steps. The point of this step is to make sure the next agent starts Phase 2 Step 1 against a tree that matches the doc — Steps 5a/5b changed the tree materially after Step 4 shipped, and Step 5c reconciles the doc with what's actually present.

**Step 5a — Archive sweep (PR #36).** Pulled every Phase 0 store, hook, component, and content file that no Phase 1 surface read from out of the live tree.

- **Moved to `_archive/` (still importable if Phase 2 chooses to restore the salvage line):** `hooks/useBudget.ts`, `hooks/useFolderSystem.ts`, `hooks/useLocalEvents.ts`, `hooks/useUserEvents.ts`, `components/folders/*` (six files: `ProjectFolder`, `NoteCardItem`, `NoteCardStack`, `CaptureStack`, `FolderShelf`, `AddNoteSheet`), `components/ui/QuickCapture.tsx`, `content/budget.ts`, `content/folders.ts`.
- **Deleted outright (no Phase 1+ owner, not on the salvage line):** `components/culture/{AddManualItem,TikTokImporter,WishlistCard}.tsx`, `components/ui/{Expandable,Tag,TimeBlock,WindowPanel}.tsx`, `hooks/useFlashCards.ts` (+ its test, removing 5 cases from the suite), `hooks/useWishlist.ts`.
- **`content/types.ts`** trimmed from 267 → 133 lines. Kept Calendar (live), Budget (consumed by `_archive/content/budget.ts`), FolderSystem (consumed by `_archive/components/folders/*`). Removed 17 speculative interfaces (`Project`, `FlashCard`, `MediaType`, `MediaItem`, `ArtworkEntry`, `InspirationItemType`, `CreativeInspirationItem`, `PhilosophyTheme`, `PhilosophyPrompt`, `JournalEntry` — speculative shape, not the live `useJournal` state — `ReflectionSummary`, `CommunityEventType`, `CommunityEvent`, `WishlistCategory`, `WishlistItem`, `IntegrationService`, `IntegrationStatus`, `IntegrationConfig`).
- **`lib/storage-keys.ts`** trimmed to the eight keys the `/settings` snapshot contract round-trips: `ANCHOR`, `JOURNAL`, `BUDGET`, `FOLDERS`, `HARD_DAY_MODE`, `WISHLIST`, `LOCAL_EVENTS`, `USER_EVENTS`. Removed ten zombie keys (`DECK`, `REFLECTION`, `ASSISTANT_HISTORY`, `ASSISTANT_PROVIDER`, `MEDIA_LOG`, `ART_HISTORY`, `CREATIVE_FEED`, `JOURNAL_ENTRIES`, `REFLECTION_SUMMARIES`, `COMMUNITY_SAVED`) — none had a live reader; the assistant keys were tied to the archived Phase 0 surface.
- **Covenant §10 ratchet allowlist shrunk from 4 entries to 2.** `TimeBlock.tsx` came out via deletion; `NoteCardStack.tsx` came out via the move into `_archive/` (outside the scan dirs). End state: `content/mia.ts` and `content/calendar.ts` only — both Mia-authored, both permanent carve-outs per §10's parenthetical exception for real external deadlines.

**Step 5b — PWA surface fix (PR #37).** Generated real `public/icon-192.png` and `public/icon-512.png` (seedling mark, ink on paper) so `manifest.json` icon refs stop 404ing on install. Stopped tracking generated `public/sw.js` and `public/workbox-*.js`; added them to `.gitignore` so `next-pwa` owns regeneration at build time and the file no longer churns under each PR.

**Step 5c — Covenant + doc hygiene (this branch).** What landed:

- **Bramble added as the 17th archetype** in `content/mia.ts`. The existing `Archetype` type was annotated "17 archetypes" but the union had 16 members. Mia's call: an archetype was missing rather than the comment being a typo. `bramble` fills the hardy/thorny gap (untended, it wins with thorns; tended, it gives berries) — no other archetype carried that note. **No new specimens.** Mia authors entries; this commit only widens the type so a future specimen can be `archetype: 'bramble'`.
- **Stale type-relocation comment removed** from `content/mia.ts:12`. The "will move to `content/types.ts` in Phase 2" note conflicted with the Phase 2 Step 1 hard rule that type defs do not move in this step. The comment now states the types stay inlined through Phase 2 Step 1.
- **Nine redirect stub directories collapsed** into a single `app/[legacy]/page.tsx` catch-all. `app/{daily,weekly,monthly,growth,culture,reflection,deck,folders,backup}/page.tsx` are gone; the catch-all uses `generateStaticParams` + `dynamicParams = false` to map known legacy slugs to their Phase 1 destinations (`/today`, `/notes`, `/settings`) and 404 anything else. A typo'd URL like `/calandar` no longer silently lands on `/today`. `app/page.tsx` stays as the root `/` redirect because the catch-all cannot match the empty path.
- **Stale comments refreshed.** `content/calendar.ts` had three comments referencing the now-deleted `app/daily`, `app/weekly`, `app/monthly` directories; they now describe the actual reason the empty exports stay (aggregator stability + Phase 3 budget structure deferral). `app/formatDate.test.ts` had a comment naming `app/deck/page.tsx` as its source — that surface is now archived; the comment now describes the test as a regression check on locale formatting.
- **Allowlist confirmed at end state.** `tests/covenant-vocab.test.ts` carries only `content/mia.ts` and `content/calendar.ts` (Step 5a got it there; Step 5c adds nothing). The remaining allowlist entries are permanent — Mia's grounding content and the §10 parenthetical for real external deadlines.

**Verified (real numbers from a clean re-baseline — `rm -rf node_modules && npm install && npm run test && npm run build`, run on this branch on 2026-04-17, not quoted from earlier ledger entries):**

- `npm install`: 600 packages, 29s, no install errors. (`npm audit` reports 6 high + 1 critical vulnerability in transitive deps; out of scope for this step — file as a separate concern if needed.)
- `npm run test`: **23 / 23** passed across 4 test files (`tests/covenant-vocab.test.ts`, `tests/settings-snapshot.test.ts`, `app/formatDate.test.ts`, `app/parseEventTime.test.ts`). Duration 5.23s. The 28-then-34 numbers from the Step-1-through-Step-3 ledger entries are dead — Step 4's `/settings` follow-up added 6 (got us to 34), and Step 5a's deletion of `useFlashCards.test.ts` removed 11 (got us to 23). 23 is the live floor.
- `npm run build`: succeeds with **20 routes** (1 root redirect + 1 `[legacy]` SSG catch-all covering 9 paths + 7 real Phase 1 surfaces + `_not-found` + `/`). Sizes: `/today` 4.87 kB, `/settings` 2.08 kB, placeholders (`/budget`, `/calendar`, `/field-report`, `/garden`, `/notes`) 520 B each, `/` and `[legacy]` redirects 141 B each. First Load JS shared 87 kB.

---

## Phase 2 Step 1 — Garden surface (NEXT)

**The scope: the garden becomes real.** The `/garden` placeholder ships its real implementation — a read-only render of the specimens already authored in `content/mia.ts`, laid out as a forest scatter on a multi-zone terrain. This is the surface COVENANT §6 calls "the soul of the app," and it's the first Phase 2 surface to land because it unblocks every later Phase 2 step (notes re-skin borrows garden's visual language; the weekly review ritual mutates garden state; the custom hard-day-awareness ESLint rule needs garden-shaped lists to enforce against).

**Why Garden first, not Notes:** notes re-skin (Phase 2 Step 2) is mostly a visual refresh of the salvage-list `components/folders/*`. It doesn't shift the metaphor. Garden does. Garden is the surface that proves the covenant — tending instead of completing, dormant instead of paused, archetypes instead of categories. Building it first means every later Phase 2 surface gets to borrow garden's vocabulary, color palette, and component shapes. Building it second would mean the notes surface ships with placeholder language that has to be replaced again.

**What's in scope:**

- **`app/garden/page.tsx`** — replaces the `PhasePlaceholder` with the real surface. Reads `specimens` from `content/mia.ts`. **Read-only.** No mutation paths land in this step. Mia still authors content; Claude still scaffolds types.
- **Forest scatter layout** in `lib/garden-layout.ts` — deterministic PRNG keyed to a date string, so the scatter is stable across reloads on a given day but evolves day-to-day. **40 → 80 element targets** (the count budget HANDOFF locked in pre-Phase-2). Five parallax layers (background → midground → foreground), each with its own scatter density and motion factor. PRNG must be seedable by `localIsoDate(now)` so two surfaces opening on the same day see the same scatter. The PRNG and the placement function get their own unit tests — same shape as `lib/settings-snapshot` and `tests/settings-snapshot.test.ts`.
- **Specimen sprites** — one component per archetype, picking from the 17 archetypes defined in `content/mia.ts` (`fern`, `moss`, `succulent`, `tree`, `wildflower`, `mushroom`, `shell`, `rock`, `lichen`, `cactus`, `coral`, `sedge`, `vine`, `crystal`, `spore`, `driftwood`, `bramble`). Sprites are CSS / Unicode / inline SVG — no image assets, mirroring the journal drawer's all-CSS approach. Each archetype has its own visual signature *and* a distinct visual treatment for each growth stage (`seed`, `sprout`, `growing`, `flourishing`, `blooming`, `dormant`, `harvested`). The treatment must read covenant-compliant: dormant looks resting, not failed. Harvested looks shipped, not closed.
- **Terrain zones** — four zones from the type system (`forest-edge`, `upper-field`, `lower-field`, `underground`), rendered as soft horizontal bands with a paper-on-paper feel. Each specimen lives in its declared terrain. The `underground` zone deserves a tone all its own — that's where roots, mushrooms, and the buried crystals live.
- **Hard-day mode behavior** — garden honors the existing `useHardDay` context. On a hard day the garden collapses to a reduced view: terrain bands stay, but specimen detail dims and only the active-stage specimens (`sprout` / `growing` / `flourishing` / `blooming`) render. Seeds, dormant, and harvested specimens hide. The collapse is structural, not "you can't see them" — it's "they're resting too." No language about hiding.
- **Tap a specimen → see its detail** — opens a small inline panel (or modal sized like the journal drawer) showing the specimen's name, archetype, terrain, stage, description, and full notes. **Read-only.** Close on Escape and on a visible close affordance, same shape as the journal drawer.

**What's out of scope for Step 1, even though it's tempting:**

- **Slot activation dialogs.** Three creative + one life slot is a hard cap (COVENANT §3 + `lib/guardrails.ts`), but activation only happens during weekly review. Step 1 ships read-only — Mia activates by editing `content/mia.ts`. The interactive activation dialog is its own step.
- **The weekly review ritual surface** — separate Phase 2 step. Garden Step 1 is render-only.
- **Mutation of any kind.** No "tend this specimen" buttons, no stage-change UI, no notes edit-in-place. All of that is a Phase 2 mutation step that comes later.
- **The custom `enforce-hard-day-awareness` ESLint rule.** HANDOFF flagged this as Phase 2 work; deferring to Phase 2 Step 2 (alongside the notes re-skin) gives the rule two genuine list-rendering surfaces to enforce against.
- **Web Push for cat meds** — Phase 4. Not now.
- **Real budget numbers** — Phase 3. Not now.

**Exit criteria:**

- `/garden` renders real specimens from `content/mia.ts`, deterministically scattered, in their declared terrain zones, with archetype-specific visuals and stage-specific treatment.
- Tap a specimen → detail panel opens with name + description + notes.
- Hard-day mode collapses garden to active-stage specimens only.
- No mutation. No edit affordances. No new stores. No new entries in `content/mia.ts`.
- Forest scatter layout is unit-tested: same date string → same placement, different date string → different placement, element count stays inside the 40 → 80 budget across a year of seeds.
- Covenant §10 vocab clean across all new files. Allowlist does not grow.
- `npm run test` and `npm run build` both green.

---

## Phase 2 Step 2 — Library surface (ready on `claude/media-tracking-app-WGNnD`)

The library is the first user-mutation surface in the app. Built and pushed to `claude/media-tracking-app-WGNnD` ahead of Garden, positioned to merge *after* Phase 2 Step 1 (Garden) lands on `main`. Mia's call: "Next after Garden." The branch exists so the work is ready when Garden ships; nothing in it conflicts with Garden's scope.

**What shipped on this branch:**

- **`app/library/page.tsx`** — the surface. Reverse-chronological list grouped by month, inline add form, per-entry edit and remove. Hard-day mode collapses the whole page to a single resting line ("library, resting.") — list and add button both hide. No elapsed-time language, no count of anything.
- **`hooks/useLibrary.ts`** — versioned-localStorage hook mirroring `useAnchor` / `useJournal` exactly. `v0 → v1` migration carve-out wired from day one (no real legacy data under this key, but the pattern stays consistent). `exportData` / `importData` implemented the same shape every Phase 1 store uses. Entries are sanitized on read — malformed entries (missing title, unknown kind, bad link shape) are dropped silently rather than throwing.
- **Entry shape:** `{ id, kind (book|film|series), title, sentence?, impression? (stayed-with-me|liked|fine|set-down), movedMe, learnedFrom, link?, loggedAt }`. Only title and kind are required to save. Impression is categorical care-language per COVENANT §10 (no numeric ratings, no stars, no out-of-five). `movedMe` / `learnedFrom` are two independent marks — they do not compose into a score.
- **Link model:** optional pointer to where the longer notes live. Kinds: `journal` (page index), `specimen` (garden id — wires up once Garden ships), `note` (folder note id — wires up once notes re-skin ships), `external` (free-text, e.g. "blue notebook, p. 40"). Only `journal` and `external` are pickable from the form today; `specimen` and `note` are accepted on read so future surfaces can back-fill them without a schema bump.
- **`components/library/EntryForm.tsx`** and **`components/library/EntryRow.tsx`** — the inline add/edit form and the per-entry row. Quiet paper-feel styling, IM Fell English italic for the sentence, chrome monospace for the chips. No floating FAB (the journal pen owns the bottom-right); the add affordance is a dashed button on the page body.
- **`lib/storage-keys.ts`** — registered `STORAGE_KEYS.LIBRARY = 'library'`. Distinct from the historical `MEDIA_LOG` key removed in Phase 1 Step 5.
- **`lib/settings-snapshot.ts`** — library added to `SETTINGS_STORES` so `/settings` export/import round-trips it alongside the Phase 1 eight. Label: `'library'`.
- **`tests/settings-snapshot.test.ts`** — seeds four representative library entries (every kind, every impression, both link shapes, empty and full marks) and verifies the round-trip. The "Phase 1 eight" assertion became a "Phase 1 eight plus Phase 2 library" assertion.
- **Nav wired:** `BottomNav.tsx`, `SideNav.tsx`, and `PageShell.tsx` edge-swipe order all updated from the six-item nav to the seven-item nav. `/library` sits between `/calendar` and `/notes` so the related-surfaces ordering (calendar → library → notes) reads left-to-right as "what I'm holding this week → what I read → what I'm writing." `/settings` stays off the nav.

**Covenant-aware decisions (if you touch this surface, hold these):**

- **No numeric ratings, no stars, no out-of-five.** COVENANT §10 forbids quality indicators and self-assessments. Mia's call was to resolve the rating question with option 1 (categorical care-language) + option 4 (two-axis loved/learned-from). Both shipped. If a future version adds a numeric score, that is a covenant breach and must not land.
- **No elapsed time.** `loggedAt` exists for sort and month grouping only. It is never rendered as "X days ago" or "X ago" anywhere. Month labels come from `Intl.DateTimeFormat`, lowercased.
- **No count of the library.** No "you have N books" anywhere. No badge on the nav. No summary line.
- **Hard-day collapse is structural.** On a hard day the list is not hidden-to-protect-you; it is resting. Copy says so: "library, resting." — no "coming back later," no "try again tomorrow."
- **Word audit.** The covenant §10 ratchet passes across the new surface. `impression` is not on the §10 list; `rating` is not used anywhere; no `score` / `completion` / `task` / `deadline` / `streak` in any file.

**Verified on this branch (clean run, 2026-04-20):**

- `npm run test`: **23 / 23** passed. Library round-trip coverage added to `tests/settings-snapshot.test.ts`; no new test files.
- `npm run build`: succeeds with **21 routes**. `/library` ships at **4.15 kB** (First Load 137 kB). All Phase 1 surfaces unchanged in size.

**Out of scope on this branch, deliberately:**

- **No Garden coupling.** The `specimen` link-kind is accepted on read but not pickable from the form. The Garden step can light it up without changing the library store.
- **No notes coupling.** Same story for the `note` link-kind. Notes re-skin step wires it up.
- **No journal page validation.** If Mia enters a journal page number that doesn't exist yet, the link renders as "journal page 99" and clicking does nothing visible in this step. The journal drawer doesn't take a deep-link today; wiring that up is a small follow-up (Phase 2 Step 2a or part of the journal tear-out work).
- **No wishlist integration.** The archived wishlist shape is distinct from library entries and stays archived.

---

## Out of scope for Phase 2 Step 1 (feedstock for later steps)

- **Notes surface / folder re-skin** → Phase 2 Step 2. The folder UI (~981 lines: `ProjectFolder`, `NoteCardItem`, `NoteCardStack`, `CaptureStack`, `FolderShelf`, `AddNoteSheet`) lives at **`_archive/components/folders/*`** post-Step-5a. Step 2's choice: restore from `_archive/` and re-skin (the salvage-line option), or rebuild against the garden's visual vocabulary from scratch. Either is acceptable — Step 5a archived rather than deleted specifically to preserve the option. The matching hooks (`useFolderSystem`, `useLocalEvents`, `useUserEvents`) and content shape (`content/folders.ts`) are also at `_archive/` ready to come back. (Library landed on `claude/media-tracking-app-WGNnD` as a parallel Phase 2 Step 2 — notes re-skin slides to Phase 2 Step 3.)
- **Custom ESLint rule `enforce-hard-day-awareness`** → Phase 2 Step 2 or 3. Earns its keep once garden + notes both ship. (The original handoff note said this would replace the `NoteCardStack.tsx` allowlist entry — that entry came out in Step 5a. The rule still earns its keep on garden + notes; the trigger is just no longer "shrinking the ratchet.")
- **Slot activation dialogs + weekly review ritual** → Phase 2 Step 3 or 4. First mutation surface. Interacts with `lib/guardrails.ts` constants. **The weekly review surface is also where the Seedlings block lives** (see `SEEDLINGS.md`) — one new practice per week, chosen Sunday, held silently mid-week, reviewed as a three-way decision (`rooted` / `another week as a seedling` / `dormant`) at the next Sunday setup. Seedlings ship as one block inside the weekly review surface, never on `/today`, never with a mid-week nudge. Mia authors candidate practices in `content/mia.ts` when that step lands; Claude scaffolds types only.
- **Tear-out interaction for the journal drawer** → Phase 2 Step 4 or later.
- **Real budget numbers** → Phase 3. Mia fills in when she sits with it.
- **Supabase, auth, cross-device sync** → Phase 3. Lands as a sync adapter under the existing hook API — no component changes.
- **Web Push for cat meds** → Phase 4.
- **Assistant, email, calendar write-back** → out of scope indefinitely. The archive stays archived.

---

## Decisions already made — my call as the previous agent, override me anywhere

### Stack: keep what's already here. Do not introduce Zustand yet.

Next.js 14 App Router + Tailwind + Vitest + the existing versioned-localStorage hook pattern (`useBudget`, `useFolderSystem`, `useHardDayMode`). `next-pwa` already wired. Vercel deploy already working.

**Why not Zustand:** `useHardDayMode`, `useAnchor`, and `useJournal` already do versioned migrations cleanly (and the archived `useBudget` / `useFolderSystem` were the original templates for the pattern). Introducing Zustand adds a dependency, a new mental model, and a migration cost in exchange for almost nothing for a solo-user offline-first app. The hooks pattern scales fine to 6 surfaces. If cross-hook orchestration becomes painful later (concrete, not speculative), revisit.

**Why not a new repo / Astro / Remix:** none of the problems in this repo are framework problems. Migrating is a scope-creep trap.

### Supabase: Phase 3, not before.

Phase 1 must feel instant, private, offline. Auth complicates "open the app, see your day." When Supabase shows up, it shows up as a sync adapter underneath the existing hook API — no component changes.

### Design tokens: shipped in Step 1.

The contrast bump is live: raised `--ink-3` / `--ink-4`, stronger borders, higher landscape opacity range, 11px text-micro. No text below 4.5:1 on cream. No border below 1.5:1. If Step 2 reveals any drift, fix it in-place and re-audit with axe-core.

### Forest scatter density: scoped into Phase 2 Step 1.

The 40 → 80 element budget + 5th parallax layer + deterministic PRNG keyed to date is the Phase 2 Step 1 layout work. Don't do it earlier; don't do it differently. The PRNG seed is `localIsoDate(now)` so two surfaces opening on the same day see the same scatter; tomorrow it shifts on its own.

### Custom ESLint rule `enforce-hard-day-awareness`: Phase 2 Step 2, not Step 1.

Custom ESLint rules have a real maintenance cost and they need enough surfaces to enforce against to be worth writing. Phase 1 had Today plus a drawer. Phase 2 Step 1 adds Garden — that's two list-rendering surfaces, which is enough to *write* the rule, but writing it alongside garden makes the garden PR fight two hard problems at once. Defer to Step 2 (alongside notes re-skin), at which point three surfaces use the rule and the cost is amortized properly.

### Covenant §10 vocabulary grep test: shipped in Step 1.

`tests/covenant-vocab.test.ts` is live. The allowlist is a ratchet, not a permanent exemption — every entry has an inline comment explaining when it comes out.

---

## Priority reading list for a fresh session

Read in this order — first the four orientation docs, then the references for Phase 2 Step 1:

1. **`COVENANT.md`** — everything. **§6 ("The Garden / Field-Guide Metaphor — Why It's the Soul of the App") is the spec for this step.** Read it twice. Every visual decision is measured against it. §10 ("Core Vocabulary") still applies — `dormant`, `harvested`, `tending`, `seasonal`. Never `inactive`, never `failed`, never `score`.
2. **`HANDOFF.md`** — this file. Phase ledger, Step 1 plan, hard don'ts.
3. **`CLAUDE.md`** — hard rules and command reference for every session.
4. **`content/mia.ts`** — the grounding file. Real specimens, the 17-archetype enum (Step 5c added `bramble`), the four-terrain enum, the seven-stage growth enum. **Garden is a read-only view over this file.** Do not add entries; do not change the type definitions in this step.
5. **`lib/guardrails.ts`** — the slot caps (3 creative + 1 life), the activation invariants, `DORMANCY_IS_FRICTIONLESS`, `NO_STREAKS`, `NO_SESSION_TRACKING`. Garden Step 1 is read-only, but the layout has to honor these: active-stage specimens stand out, dormant + harvested do not feel like failure modes.
6. **`context/HardDayContext.tsx`** — hard-day toggle wiring. Garden honors `useHardDay()` the same way `/today` does — collapse to active-stage specimens only.
7. **`app/today/page.tsx`** — reference for the surface shape (header + sections + hard-day collapse). `/today` is the model `/garden` should follow for layout shell, header, and hard-day branching.
8. **`components/ui/JournalDrawer.tsx`** — reference for the all-CSS, no-asset approach. Garden's specimen sprites should follow the same pattern: Unicode glyphs, inline SVG, CSS gradients. No image files.
9. **`lib/settings-snapshot.ts`** + **`tests/settings-snapshot.test.ts`** — reference for "extract pure logic, then unit-test it." The `/garden` PRNG layout function should ship with the same pattern: pure module + jsdom test.
10. **`tests/covenant-vocab.test.ts`** — the §10 mechanical enforcement. New garden code must not add allowlist entries. **End state already reached in Step 5a: 2 entries (`content/mia.ts`, `content/calendar.ts`), both permanent carve-outs.** Garden lands at "no allowlist growth," not "shrink further" — the further shrinks already happened.
11. **`components/ui/PhasePlaceholder.tsx`** — what `/garden` currently renders. Step 1 replaces this with the real surface; the PhasePlaceholder component itself stays for `/calendar`, `/notes`, `/budget`, `/field-report`.
12. **`SEEDLINGS.md`** — the Phase 2 design sketch for the Seedlings block inside the weekly review surface. Not relevant to Step 1 (Garden is read-only), but the agent picking up the weekly review ritual step reads this *first*. Covers: one practice per week, Sunday-only surface, three-way decision (`rooted` / `another week as a seedling` / `dormant`), carry-forward default when the block is left untouched, negative list (*not* a habit tracker, no mid-week surface, no reduction concept in the data model), and the §§1/3/5/7/8/10 covenant cross-reference that anchors the design.

---

## Hard don'ts (still in force)

- **Do not rewrite `_archive/components/folders/*`.** Step 5a archived these, but they remain the salvage line for Phase 2 Step 2 — restore-and-re-skin is the path, not rebuild.
- **Do not generate `content/mia.ts` entries.** Mia authors, Claude scaffolds types.
- **Do not restore anything from `_archive/docs/`.** Not her voice.
- **Do not add an OpenAI / Anthropic / Google / Gemini assistant, route, or key to Phase 1.** The archive exists; leave it archived. If a branch shows up proposing otherwise, reject it.
- **Do not build LifeOS.** The goal is "the field guide that actually syncs to her phone and reminds her about cat meds." Everything else is scope creep.
- **Do not create onboarding flows.** COVENANT §3 forbids them.
- **Do not use any word from the §10 "Never use" list in source files.** The ratchet will catch you.
- **Three creative slots + one life slot = hard cap.** Not soft warnings. Activation only during weekly review. Dormancy frictionless any time.
- **Do not track sessions, last-opened timestamps, or elapsed time anywhere visible.** COVENANT §8.

---

## What must be true before Phase 2 Step 1 starts

The next agent reads `COVENANT.md` end-to-end with fresh eyes — **§6 twice, that's the spec for this step** — then this file, then `CLAUDE.md`, then `content/mia.ts` (for the actual specimens to render and the type system already in place), then opens `app/today/page.tsx` (for the surface shape to mirror) and `lib/guardrails.ts` (for the invariants the garden has to honor without violating). Everything else above is already decided.

---

*End of handoff. Phase 1 is complete (Steps 1–4 shipped; Step 5 cleanup pass shipped in PRs #36 + #37 + Step 5c on this branch). Phase 2 Step 1 is the Garden surface: read-only render of `content/mia.ts` specimens, deterministic forest scatter layout keyed to the day, terrain zones, archetype visuals, hard-day collapse to active-stage specimens. No mutation, no slot dialogs, no ESLint rule yet.*
