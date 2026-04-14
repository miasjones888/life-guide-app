# Feature & Strategy Review: Field Guide to Yourself
**Date:** 2026-04-07
**Scope:** PRD + product brief + life guide + philosophy → multi-role feature analysis

---

## What This Review Is

A full-project review from every traditional role — user, product, UX, engineering, content, QA, and ops — grounded in what the app currently is (Phase 1 complete, Phase 2 in progress), what it promises, and what it's missing. All recommendations filter through the core principle: *capacity-aware, trust-preserving field operating system*, never a productivity machine.

This supersedes and extends the earlier `role-based-feature-opportunities.md` with current-state awareness (April 2026: §01–04 built, all rhythm views live, AI assistant added, §05–10 outstanding).

---

## Pre-Feature Gaps: Incomplete Deliverables

These are not new feature requests — they are unfinished Phase 1/2 work:

1. **`docs/versions/life-guide-v1.1.md` is empty.** The canonical content source has only a version header. This blocks §05–10 and means the app's "source of truth" file has no truth in it.
2. **Guide sections §05–10 are unbuilt.** The PRD classifies these as must-have Phase 1+2. The app is structurally complete but content-incomplete.
3. **No verbatim copy regression tests.** The 7 protected passages have no automated guard against drift. Content changes can silently break a core trust guarantee.
4. **Modular task note consistency unverified.** The PRD requires it in Today, Daily, and Weekly views with identical phrasing. Not confirmed across all three.
5. **Phase 1 acceptance checklist has unchecked items.** No formal QA closure documented.

---

## Role-by-Role Analysis

### Mia (Primary User)

**What she needs that isn't fully delivered yet:**

**Hard Day Mode** is the most important missing interaction. The PRD documents hard-day versions of every routine, but there's no single-tap way to collapse the entire app to minimum viable content. On a genuinely hard day with depression/ADHD, the full app is still too much — it requires scanning, deciding, navigating. A persistent mode toggle that reduces every view to bare essentials is what the philosophy promises but the interface doesn't yet deliver.

**Data ownership is at risk.** Her notes, reflections, budget edits, flashcards, and anchor tasks live in localStorage only. One device reset loses everything. The flashcard deck already has JSON export — that pattern needs to extend to all persisted data. This isn't a nice-to-have; it's a principle stated in the PRD: "She should be able to back it up, version it, understand it."

**Seamless capture is missing.** When she's in a focus block and has a thought, the path to capture it is: navigate away, go to `/folders`, add a note, navigate back. That's too much. A floating capture widget reachable from any screen eliminates the context-switch cost.

**The content she authored isn't in the app yet.** The guide sections covering her body, home, health, and system practices exist in her head and in draft form but aren't surfaced. The core promise — "everything is written down" — isn't true yet.

**Anti-features that must stay out:**
- Any "overdue" visual state
- Streaks, completion rates, progress bars
- Notifications or system reminders
- Dark mode (explicitly excluded by design direction)

---

### Product / Strategy

**The sequencing in `phase-2-features.md` is wrong.**

It leads with chat-to-calendar before the static content is complete. That's novelty-first, not harm-of-omission-first. A dynamic calendar editing feature is useless if the guide sections covering her health, body, and home practices don't exist yet.

Correct sequencing:
1. Complete static content (life-guide-v1.1.md authored → §05–10 built)
2. Add reliability layer (copy tests, export, safety-critical visuals)
3. Add capacity-aware interaction model (Hard Day Mode)
4. Then add dynamic features (calendar editing, AI context, GCal)

**Prioritization principle:** rank by "harm of omission." Missing Maisie's medication schedule = high harm. Missing GCal sync = low harm. Features that prevent the highest-harm misses go first.

**Scope check:** Desktop sidebar nav is listed in Phase 2. Primary use is mobile-first. This is low urgency and should be deferred to Phase 3 polish.

---

### UX / Design

**Hard Day Mode — the central missing interaction:**

A persistent toggle (small, accessible from any view) that applies a content filter across the app:

- **Today:** only safety-critical time blocks (meds, meals), one anchor task, no AI assistant panel
- **Guide:** only hard-day versions of routines
- **Daily rhythm:** only non-negotiables flagged as `hard_day_minimum: true`
- **Header text (once):** "You only need to do the minimum. That is enough."

This is not a new page, not a new theme, not a new data set. It's a filter over existing content using metadata that already exists in the PRD's content model. It respects the design system and adds no visual noise in normal mode.

**Emergency Grounding Card:**

A single card, always reachable within one tap (pinned to Today, accessible via a persistent shortcut), containing only user-authored grounding content:
- 3–5 grounding phrases she has written herself
- Calm language: "Right now, you are safe."
- System-dialog visual register (bordered container, no urgency color, no close friction)
- No navigation inside the card, no other content

This fits the existing callout block pattern exactly and requires no new design language.

**Now / Next / Later strip:**

Replace or augment "upcoming events" in Today with a 3-item strip:
- **Now:** current time block label
- **Next:** next time block label
- **Later:** one important upcoming item

No scrolling. No list density. Three lines that answer "where am I?" without requiring scan.

**Interaction debt to address:**
- AI assistant panel in Today is heavy on hard days. Should be collapsed/hidden by default, expandable on demand.
- Bottom nav labels should be visible at all times, not just on the active tab.

---

### Engineering

**Content schema enrichment — prerequisite for all Tier 2 features:**

`content/types.ts` should gain these optional fields on event and routine item types:

```typescript
criticality?: 'safety-critical' | 'high' | 'normal'
capacity_level?: 'all' | 'low-capacity-only' | 'full-capacity-only'
hard_day_minimum?: boolean
time_sensitivity?: 'fixed' | 'flexible'
```

These four fields enable Hard Day Mode, safety-critical visual treatment, Now/Next/Later logic, and capacity-aware ordering — without hardcoding any of that logic inside components.

**Verbatim copy regression tests — non-optional:**

A dedicated test file (`app/verbatim-copy.test.ts`) that imports from content constants and asserts exact string presence for all 7 protected passages:

```
"Protected time. No calls, no notifications, no obligations."
"On a hard day: just those two. Done."
"You don't have to cook. You just have to eat something."
"body + spirituality + feedstock in one block. Don't plan it to death. Just go outside."
"Non-negotiable on whether, flexible on which."
"That is the whole task. Nothing else is required."
"Everything for today is written down."
```

These tests should fail the build if any passage drifts. Content integrity is a trust guarantee, not a nice-to-have.

**localStorage export/import — extend the existing pattern:**

`hooks/useFlashCards.ts` already implements JSON export/import. Apply the same pattern to:
- `hooks/useBudget.ts`
- `hooks/useFolderSystem.ts`
- Reflection content (raw localStorage key → structured export)
- Anchor task + daily priorities state

A single "Backup / Restore" panel in the System section (§08) consolidates all exports in one place.

**Offline audit checklist for every PR:**

Each Phase 2 feature addition risks introducing network dependencies. Add this to the PR template:
> Does this feature degrade gracefully offline? Is the degraded state explicitly tested?

---

### Content / Editorial

**Life guide content gap is the most urgent issue in the entire project.**

`docs/versions/life-guide-v1.1.md` is empty. Before any Phase 2 engineering work on §05–10, this file needs to be authored using the dual-layer writing model:

| § | Section | Core content needed |
|---|---------|---------------------|
| §05 | Body | Skincare routine (full + hard-day), movement, sleep, meals |
| §06 | Home | Room reset phases, laundry rhythm, cleaning cadence |
| §07 | Health | Medications, therapy contact, psychiatry contact, emergency protocol |
| §08 | System | Weekly reset, monthly review, reflection prompts, maintenance ritual |
| §09 | Routines | Morning + evening (full + hard-day) — consolidating PRD appendix content |
| §10 | Rhythm | Weekly focus by day — pull from existing `/weekly` content |

**Dual-layer writing model — apply consistently:**

Every routine item should have:
- Layer 1: immediate executable instruction ("Take Maisie's Prozac. Put it in her food.")
- Layer 2 (expandable, optional): the why ("Consistency is what makes the medication effective.")

Currently applied inconsistently. Needs a consistency pass before §05–10 build begins.

**Tone audit criterion:**

Every content addition should pass: *"Does this sound like Mia wrote it for herself?"*

Mia's voice: "you," concrete verbs (grab, open, take, set), permission-giving ("that's enough," "that counts").
App-voice failure mode: "track," "optimize," "complete," "you should."

---

### QA

**Critical regression suite — required before each release:**

1. Morning routine — all steps present, hard-day version present, verbatim passages intact
2. Evening routine — same
3. Cat medication schedule — all three cats, all medications, all times accurate
4. Financial deadlines — dates accurate, urgency visual treatment present
5. PWA install + airplane mode — full offline functionality after initial install
6. Hard Day Mode (once built) — only minimum content visible, no scores or prompts

**Low-capacity usability testing script:**

Every major interaction should be tested under:
- One-handed thumb-only navigation (no two-handed gestures)
- 3-second glance test: can you identify one action to take?
- Interrupted flow: navigate away mid-task, return — is state preserved?
- Simulated post-wakeup cognitive state: low-scan, high-friction conditions

**Performance budget — enforce on every Phase 2 PR:**

- Lighthouse score ≥90
- FCP < 1s, LCP < 1.5s
- No new network-required interactions without offline fallback
- No new localStorage writes without corresponding export path

---

### Operations / System Stewardship

**Maintenance ritual — document in §08 System:**

Weekly 10-minute review:
- Cat medication accuracy (any vet changes?)
- Financial deadline dates (any new or changed?)
- Anchor priorities (still current?)
- Any routine adjustments to note for next code update

Monthly:
- Export all guide data as JSON, store in personal backup folder
- Verify PWA installs and offline mode still work after any updates

**Quarterly philosophy alignment review:**

Once per quarter, review the app against its core principles:
- Has any new feature introduced a metric, score, or completion rate?
- Does any current wording imply "you should have done this"?
- Has any content drifted from Mia's original voice?
- Are any interactions now engagement-optimized rather than friction-reducing?

This review should produce a short written note (not a dashboard) and be stored in §08.

---

## Recommended Feature Backlog

### Tier 1 — Complete before building anything new

| # | Feature | Role Driver | Rationale |
|---|---------|-------------|-----------|
| 1 | Author `life-guide-v1.1.md` fully | Content | Blocks §05–10; app is content-incomplete |
| 2 | Build guide §05–10 | Engineering + Content | Phase 1+2 deliverable, highest daily use value |
| 3 | Verbatim copy regression tests | Engineering + QA | Content drift is a trust failure |
| 4 | Content schema: `criticality`, `capacity_level`, `hard_day_minimum` | Engineering | Prerequisite for all Tier 2 features |
| 5 | localStorage export/import for all data stores | Engineering | User data ownership is a stated core principle |

### Tier 2 — Interaction model enhancements

| # | Feature | Role Driver | Rationale |
|---|---------|-------------|-----------|
| 6 | Hard Day Mode / Low Capacity Lens | UX + User | Most important missing interaction in the app |
| 7 | Now / Next / Later strip on Today | UX + User | Reduces cognitive scanning to 3 lines |
| 8 | Emergency Grounding Card | UX + User | CPTSD/anxiety safety layer; user-authored content only |
| 9 | Safety-critical visual layer (meds + deadlines) | Design + QA | Calm urgency treatment for non-negotiables |
| 10 | Collapsible AI assistant panel in Today | UX | Reduces Today visual weight on hard days |

### Tier 3 — Dynamic and contextual features

| # | Feature | Role Driver | When |
|---|---------|-------------|------|
| 11 | Quick Capture widget (floating, all screens) | User + Engineering | After Hard Day Mode is stable |
| 12 | Calendar localStorage form (one-time event add) | User + Engineering | Phase 2 Option 3 as documented |
| 13 | Change Log for content updates | Ops + User | Before GCal or any external sync |
| 14 | If/Then rescue prompts | Content + User | Experimental; validate with 3–5 prompts first |
| 15 | Desktop sidebar nav (768px+) | Engineering | Low urgency; defer to Phase 3 |
| 16 | GCal API integration | Engineering | Phase 4; requires backend infrastructure |

---

## Anti-Features: Reject at Planning Level

Any proposal that introduces the following should be declined before design or engineering begins:

- Completion percentages, streaks, scores, or rates on any view
- "Overdue" language or visual state
- Default-on notifications or reminders
- Social sharing or multi-user comparison
- "You haven't done X" or "You're behind on Y" phrasing
- Any UI treatment that makes the hard-day version feel like a lesser or failed path

---

## One-Sentence Strategic Direction

Evolve the app from a *static life guide* into a *capacity-aware, personally-owned field operating system* — but only by completing what was promised before adding what's new.
