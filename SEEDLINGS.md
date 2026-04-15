# SEEDLINGS.md — Phase 2 design sketch

**Status:** design sketch only. Not built. Phase 2, alongside the weekly review
ritual and the Garden surface.

**Precedence:** `COVENANT.md` is the highest document in the repo. If anything
in this file conflicts with it, COVENANT wins and this file is wrong.

---

## Why this exists

Mia asked, on 2026-04-15: *"Do we have anything in our plan that helps
introduce new and better habits to me week by week as I'm getting better and
managing more in my life? Like yoga, a morning routine, bedtime routine, less
scrolling on TikTok."*

The honest answer was no. Phase 1 doesn't do this, and a conventional habit
tracker is architecturally forbidden by COVENANT §1 ("never gamify"), §4
(Habitica and "any streak-based habit app" named explicitly as anti-patterns),
and §10 (`streak`, `score`, `completion`, `task`, etc. on the Never-use list).
Phase 0 already struck the aspirational morning-routine / bedtime-routine
calendar block during the audit — see `content/calendar.ts` lines 33–39 for the
strike list. Those exact items are not coming back.

But the underlying question — *how do I introduce a new practice as my
capacity grows?* — is inside the covenant, because §3 "Always" includes *"meets
me where I'm at and grows with me."* The app has to have room for practice
growth without becoming a surveillance or shame machine.

**Seedlings** is the resolution. One new practice per week, chosen during
Sunday weekly setup, held quietly by the app mid-week, reviewed as a single
three-way decision at the next Sunday setup.

---

## The shape

### One seedling per week

At Sunday weekly setup, Mia names a single practice she wants to try rooting
this week. Yoga. A morning stretch. Reading a chapter before bed instead of
scrolling. One thing.

There is no multi-seedling mode. COVENANT §1 ("never show you everything at
once") and §3 (slot caps, weekly-setup-only activation) both point at a hard
cap of one. If last week's seedling is still in the seedling stage, this
week's decision can be *"same seedling, another week"* — the slot does not
free up until the practice either takes root or goes dormant.

### Chosen on Sunday, held silently mid-week

The weekly review surface is where the decision is made. Once made, the app
goes quiet on the subject. **The seedling does not appear on `/today`.** There
is no daily reminder, no check-in, no counter, no visible artifact anywhere
except the weekly review surface.

This is the strictest possible reading of COVENANT §3 *"the decision should
happen during the weekly setup, on paper, in advance. The app should reflect a
decision already made, not prompt you to make one in real time."* Putting the
seedling on `/today` — even as a gentle reminder — turns it into a surface that
can accuse you mid-week. The whole point of seedlings is that they are held in
the weekly cadence, not the daily one.

### Reviewed as a single three-way decision

At the next Sunday setup, the seedling from the prior week appears with
exactly three options:

1. **Rooted.** The practice took. It graduates out of the seedling slot. In
   the Phase 2 data model this probably means it becomes a first-class
   specimen in the Garden with an initial `growing` stage, but that decision
   belongs to the Phase 2 build — see "Open questions" below.
2. **Another week as a seedling.** It's not rooted yet, and Mia wants to try
   another week. The slot stays occupied. No record that it "failed" the
   previous week. The history is just "still a seedling."
3. **Dormant.** The practice goes back to rest. Not a failure. No visible log
   entry anywhere that says *"attempted, not rooted."* It simply returns to
   the candidate pool in `content/mia.ts` (if it came from there) or is
   forgotten (if it was freeform). The slot frees up for next week's choice.

There is no fourth option. No *"postpone"*, no partial credit. The whole
point of the three-way split is that every outcome has dignity — including
the one where the practice didn't stick this time.

**If the weekly setup ends without the block being touched, the carried
seedling rolls forward unchanged** — behaviorally identical to option 2
("another week as a seedling"). This is not a fourth option; it is the
default reading of option 2 when no explicit decision is made. Slot state
stays well-defined: the seedling is still there, carried into the new week,
until Mia explicitly marks it rooted or dormant. COVENANT §1 forbids
required fields that block you from saving, so non-interaction always has a
safe, unambiguous meaning — never a blocked state, never a mid-week
ambiguity about whose slot is whose.

---

## Vocabulary — garden, all the way down

Every surface of this feature uses garden language. The word *"habit"* does
not appear in source files, labels, or copy. The COVENANT §10 banned list
(`streak`, `score`, `completion`, `task`, `todo`, `productivity`, `missed`,
`behind`, `failed`) is forbidden everywhere, and `tests/covenant-vocab.test.ts`
will catch anything that slips.

The vocabulary of the feature:

- **seedling** — a practice in its first week (or still in early weeks) of
  trying to take root. COVENANT §10 Use-list word.
- **rooted** — a seedling that took. Now lives in the Garden as a growing
  specimen. COVENANT §10 Use-list word.
- **dormant** — a seedling that went back to rest. First-class state, no
  negative connotation. COVENANT §10 Use-list word and §7 explicitly makes
  dormancy frictionless.
- **tending** — what you do when you act on a rooted practice. COVENANT §7.

The three-way decision UI copy uses these words directly. No *"mark
complete,"* no *"check in,"* no *"streak broken."*

---

## What this is not — explicit negative list

- **Not a habit tracker.** If it starts to look like one, rip it out per
  COVENANT §1 and the §4 opposition to Habitica.
- **Not a daily surface.** Nothing on `/today` about seedlings. Ever.
- **Not a reduction concept.** "Less TikTok" is reframed as additive: root a
  new practice ("read a chapter before bed") that displaces the thing you
  were doing instead. The data model has no reduction field, no screen-time
  integration, no passive surveillance — see COVENANT §5 on RescueTime and
  §8 on time tracking.
- **Not gamified.** No celebration when a seedling roots. The status change
  is quiet — a single three-way decision on Sunday, noticed only by the
  person making it.
- **Not an AI suggestion engine.** COVENANT §1 forbids AI-generated next
  actions and §3 forbids the app prompting decisions. Mia authors candidate
  practices in `content/mia.ts` by hand; Claude only scaffolds the TypeScript
  shape.
- **Not a hard-day-minimum item.** Seedlings sit *above* the hard-day
  minimum. On hard days the seedling collapses out of view along with
  everything else except the four-item floor (`content/mia.ts` lines
  99–114). The seedling is not a thing you "owe" on any day.
- **Not an onboarding flow.** COVENANT §3 and CLAUDE.md both forbid
  onboarding. When Mia first opens the weekly review surface after this
  ships, the seedling block is empty; she fills it in if and when she wants.
- **Not retroactive.** No "seedling history" timeline, no "practices you
  tried this season" archive. The app holds what is active. Rooted
  practices live in the Garden from then on; dormant seedlings leave no
  trace. COVENANT §8 ("the app has no concept of wasted time").

---

## Data model sketch (plain English only)

*No TypeScript in this file. The type scaffolding lands in Phase 2 next to the
hook that uses it — speculative types ahead of the surface that consumes them
are worse than no types.*

- A **seedling** has: a name (string, author-supplied or pulled from the
  candidate list), the week it was first named, and a status that moves
  through the three-way weekly decision.
- A **candidate practice** lives in `content/mia.ts` as an authored list.
  Mia writes these on a better day, on her own terms. Claude never generates
  entries, per CLAUDE.md. An empty candidate list is a valid state — the
  weekly setup always supports freeform typing as a fallback.
- There is no "seedling history" collection. When a seedling goes dormant, it
  is gone from the active data. When it roots, it migrates into the Garden
  as a growing specimen and stops being "a seedling" at all.

Storage: a new key registered in `lib/storage-keys.ts` (probably
`SEEDLING: 'seedling'`), read through a new versioned-localStorage hook
mirroring `useAnchor` and `useBudget`, with the v0→v1 migration carve-out
wired in from day one per the lesson learned in PR #27 → PR #28.

---

## How it plugs into the weekly review ritual surface

The weekly review surface is Phase 2 work and doesn't exist yet. When it gets
built, it contains a sequence of blocks for the Sunday setup ritual —
reviewing what's alive, naming the non-negotiables, choosing the deep focus,
etc., per COVENANT §3. Seedlings is **one block** inside that sequence.

The block has two states:

1. **Carrying a seedling from last week.** Shows the seedling name in the
   display serif, three buttons for the three-way decision. After the
   decision is made, the block transitions to state 2.
2. **No seedling this week yet.** Shows a chooser: freeform text input,
   plus (if Mia has authored any) a list of candidate practices from
   `content/mia.ts`. Picking one or typing a name sets this week's seedling
   and the block becomes inert until next Sunday.

The block is skippable, and skipping has a well-defined meaning in both
states — it never leaves slot state ambiguous:

- **State 1 (carrying a seedling from last week):** leaving the block
  untouched is the implicit default for option 2 ("another week as a
  seedling") — see the three-way-decision section above. The carried
  seedling stays carried, the slot stays occupied, and nothing changes
  until Mia explicitly marks it rooted or dormant at a future Sunday. No
  "you skipped the decision" accusation, no required-field block on the
  weekly setup flow.
- **State 2 (no seedling this week yet):** leaving the block untouched
  means this week has no seedling. The slot sits empty until the next
  Sunday setup. That is a legitimate choice, not a failure, and the app
  never flags it as one.

There is no "you haven't chosen a seedling" warning in either state —
COVENANT §1 forbids moralizing about consistency and forbids required
fields that block you from saving.

---

## Covenant cross-reference

Every design decision above points at a specific covenant section. Listed
here so a future agent can audit the sketch without re-reading all eleven
sections:

- **§1 "Never do"** — no gamification, no streaks, no AI suggestions, no
  real-time decision prompting. Drives: one-per-week cap, no daily surface,
  no celebration on rooting, Mia-authored candidates.
- **§3 "Always do"** — weekly-setup-only activation, decision reflected not
  prompted, support the weekly ritual, grow with Mia's capacity. Drives:
  the entire surface placement decision (weekly review only) and the
  three-way Sunday review.
- **§5 "Apps to be the opposite of"** — no RescueTime-style passive
  surveillance, no Habitica-style punishment for sick days. Drives: no
  reduction concept, no daily check-ins, no timestamps on seedling history.
- **§7 "Garden metaphor"** — tending, dormancy as first-class state, organic
  life cycles. Drives: the entire vocabulary and the three-way review
  structure (rooted / another week / dormant — no "failed").
- **§8 "Worst day"** — no accumulation read as debt, no pressure to perform
  recovery, rest is structurally invisible. Drives: hard-day mode collapses
  the seedling block along with everything above the floor, no seedling
  history archive.
- **§10 "Vocabulary"** — banned list mechanically enforced by
  `tests/covenant-vocab.test.ts`. Drives every word choice in the feature.

---

## Open questions for Phase 2 build time

Things not worth solving in the sketch because they depend on how the Phase 2
Garden surface actually lands. Listed so the Phase 2 agent can decide them in
context rather than re-litigating them:

1. **Do rooted seedlings become first-class Garden specimens?** Most likely
   yes — a rooted yoga practice is exactly the kind of thing the Garden
   holds. But the specimen type system in `content/mia.ts` may or may not
   accommodate practices as-is; the Phase 2 agent will decide whether
   "practice" is a new specimen kind or folds into an existing one.
2. **Flat candidate list, or grouped by terrain zone?** Mia's terrain-zone
   taxonomy in `content/mia.ts` could group candidate practices by zone
   (body, mind, relational, environmental, etc.) if that matches how she
   thinks about them. Decide when Mia authors the first candidates — if she
   groups them naturally, mirror it; if she doesn't, flat is fine.
3. **Is there a way to pause a seedling mid-week?** Probably not. The whole
   point of the weekly cadence is that decisions happen on Sunday, not in
   the middle of a hard Tuesday. A mid-week pause button would reintroduce
   the "prompted decision at entry" anti-pattern §3 forbids. But if Mia
   specifically asks for it, revisit.
4. **Does a seedling have any kind of text field beyond the name?** A single
   "why this practice, why this week" sentence might be useful context when
   the three-way review comes around. But it's also a required field risk
   per the §1 redline on required fields. Default: name only, revisit if
   Mia asks.

---

## Cross-references for the Phase 2 agent

When this gets built, read first (in order):

1. `COVENANT.md` — all eleven sections. Especially §1, §3, §5, §7, §8, §10.
2. `HANDOFF.md` — current phase status and Phase 2 scope notes.
3. `CLAUDE.md` — hard rules.
4. `content/mia.ts` — the grounding file, including the hard-day minimum
   (lines 99–114) that seedlings sit above, and the archetype / terrain-zone
   system that candidate practices may (or may not) want to align with.
5. `content/calendar.ts` lines 33–39 — the strike list of Phase 0
   rejections. The purpose of referencing this is specifically to make sure
   the Seedlings build doesn't reintroduce any of the struck items as
   automatic calendar blocks. Seedlings are weekly-chosen, not pre-scheduled.
6. `hooks/useAnchor.ts` + `hooks/useBudget.ts` — the canonical
   versioned-localStorage pattern to mirror. `useAnchor` in particular for
   the v0→v1 migration carve-out shape.
7. `lib/storage-keys.ts` — register the new key in the same commit as the
   hook.
8. `tests/covenant-vocab.test.ts` — run before every commit while building
   this. The vocabulary is the architecture.

---

*End of sketch. Nothing ships from this file. The next move on Seedlings
happens when Phase 2 starts building the weekly review ritual surface and
this document becomes the brief.*
