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

## Open decisions Mia has not made yet

Do **not** decide these on her behalf. Ask before proceeding.

- **Stack approval.** The recommended Phase 1 stack is Next.js 14 App Router + Zustand (persist → localStorage) + Tailwind + Vitest, with Supabase added in Phase 3 for auth + cross-device sync. Mia has not explicitly approved this yet.
- **Base branch for Phase 1.** Phase 0 landed on `claude/merge-guide-systems-UxLng`. Phase 1 may want a fresh branch — ask before cutting one.
- **Design tokens.** The earlier agent proposed concrete contrast + density values (see the "Aesthetic fixes" section of the original compiled handoff, not in this file). Not applied. Needs axe-core verification as a QA gate before Phase 1 ships.
- **Forest scatter density.** Earlier recommendation: 40 → 80 scatter elements across 5100px terrain, add a 5th parallax layer, deterministic PRNG keyed to date. Not implemented.
- **`lib/guardrails.ts` constants file.** Proposed but not created.
- **Custom ESLint rule `enforce-hard-day-awareness`.** Proposed but not created.

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

## Proposed Phase 1 scope (from the original agent's plan — needs Mia's re-approval)

1. Root chrome (WindowFrame + MenuStrip + StatusBar) at final contrast + density
2. Typography stack loaded (IBM Plex Mono + IM Fell English italic + DM Serif Display + VT323)
3. Journal drawer (global, keyboard `n`, dotted paper, typed input, pagination; no tear-out yet)
4. Surface 1: **Today Anchor** (reads audited `calendar.ts` + `dayStore` + `mia.ts`)
5. Surface 2: **Garden** (read-only, ferns only, 6 growth stages, slot system enforced, 1 demo specimen from `mia.ts`)
6. Settings → Export / Import JSON
7. All 6 nav items present; unbuilt ones show styled "sprouting in Phase N" placeholder cards
8. Old routes 301-redirect to `/today`

**Do not start Phase 1 without:**
- Mia's approval on the stack recommendation
- Mia's confirmation that `claude/merge-guide-systems-UxLng` is the right base branch
- A fresh read of the final COVENANT.md

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

*End of Phase 0 handoff. Mia: next move is yours — approve stack + branch and we start Phase 1.*
