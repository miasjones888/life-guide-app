# Role-Based Feature & Change Opportunities

**Date:** 2026-04-07  
**Prepared for:** Field Guide to Yourself team  
**Context reviewed:** PRD, product brief, interaction model, design direction, content-source fidelity requirements, planning docs

---

## 1) What this review is optimizing for

This review assumes the app should remain:
- **Reference-first, not engagement-first**
- **Shame-free and low-friction for ADHD/depression/CPTSD realities**
- **Offline-first and personally owned**
- **Editorially faithful to Mia's exact wording and care logic**

All suggestions below are intended to strengthen those principles, not dilute them.

---

## 2) Top opportunities (cross-role consensus)

### A. Introduce a **"Now / Next / Later" strip** on Today
- **User value:** reduces startup paralysis by narrowing attention to one actionable moment.
- **Design value:** preserves glanceability and scan-first behavior.
- **Engineering value:** low-medium complexity using existing schedule/content structures.
- **Risk:** can drift into task-manager behavior if phrasing becomes compliance-heavy.
- **Guardrail:** no completion scores, no streak language, no overdue states.

### B. Add a **"Low Capacity Mode" content lens** (not a new theme)
- **User value:** explicit hard-day language surfaced first when needed.
- **Content value:** operationalizes existing protected copy (minimum viable routines).
- **Engineering value:** medium complexity (content toggles + persisted preference).
- **Risk:** duplicative maintenance if copy forks too much.
- **Guardrail:** one source of truth per routine; lens only changes ordering/emphasis.

### C. Build a **"Safety-Critical Checks" layer** for meds + hard-date finance
- **User value:** protects against the highest-cost misses (cat meds, personal meds, deadlines).
- **QA value:** introduces testable reliability boundaries around non-negotiables.
- **Engineering value:** medium complexity, high confidence payoff.
- **Risk:** sounding alarmist or punitive.
- **Guardrail:** neutral wording, visible but calm visual treatment.

### D. Create a **"Change Log + Version Compare" for content updates**
- **User value:** preserves trust and environmental control (nothing changes silently).
- **Product value:** supports iterative updates without destabilizing experience.
- **Engineering value:** medium complexity (diff metadata + render).
- **Risk:** adds meta overhead if too technical.
- **Guardrail:** human-readable summary first, technical diff optional.

### E. Add an **"Emergency Grounding Card" pinned in Today and Guide**
- **User value:** immediate stabilizing script during freeze/overwhelm moments.
- **Clinical safety value:** supports regulation without pretending to be therapy.
- **Design value:** natural fit with system-dialog visual language.
- **Risk:** overreach into medical advice.
- **Guardrail:** only user-authored grounding steps and pre-agreed phrases.

---

## 3) Role-by-role recommendations

## Mia (primary user)
1. **First 90 Seconds flow**
   - Show: date, anchor task, morning hard-day minimum, meds block, one nourishment prompt.
   - Why: supports task initiation before cognitive load expands.
2. **"If/Then" rescue prompts**
   - Example structure: "If stuck for 10+ minutes -> do minimum viable shower OR eat shelf option."
   - Why: converts intention into executable fallback logic.
3. **Frictionless capture widget**
   - One-tap note capture from Today, auto-filed into system/reflection inbox.
   - Why: protects focus blocks and avoids context switching.

## Product / Strategy
1. **Reliability-first roadmap slices**
   - Prioritize features by "harm of omission," not novelty.
2. **Principle checks at PRD acceptance level**
   - Add pass/fail gates: no gamification, no shame language, no hidden data flows.
3. **Phase 2 scope trim**
   - Sequence by frequency-of-use + emotional criticality before full section parity.

## Design / UX
1. **Capacity-aware hierarchy**
   - Hard-day essential actions always in first viewport.
2. **System-dialog urgency pattern library**
   - Standardize one calm urgent container for meds/financial deadlines.
3. **Motion budget policy**
   - Keep transitions ≤240ms and optional reduced motion profile.

## Engineering
1. **Content schema with priority + criticality flags**
   - Add metadata fields for: `capacity_level`, `criticality`, `time_sensitivity`, `fallback_available`.
2. **Deterministic offline boot path**
   - Ensure first meaningful render from local cache without network assumptions.
3. **Guardrail tests for canonical copy**
   - Snapshot or assertion tests for verbatim-protected lines to prevent accidental drift.

## Content / Editorial
1. **Dual-layer writing model**
   - Layer 1: instant instruction; Layer 2: context/why.
2. **Consistency pass for cognitive verbs**
   - Prefer concrete verbs (grab, open, start, take, set timer).
3. **Change review rubric**
   - Every copy edit reviewed for tone: non-judgmental, executable, specific.

## QA
1. **Critical routine regression suite**
   - Mornings, evenings, meds, hard-date finance as mandatory release checks.
2. **Low-capacity usability scripts**
   - Test with intentional constraints (one hand, low battery, interrupted flow).
3. **Offline + install reliability matrix**
   - Validate iOS/Android PWA install + airplane mode behavior each release.

## Operations / Personal System Stewardship
1. **Weekly 10-minute content maintenance ritual**
   - Lightweight review: meds, deadlines, routine deltas.
2. **Monthly archive/export check**
   - Verify portability and backup integrity.
3. **Quarterly philosophy alignment review**
   - Remove any drift toward dashboard/productivity pressure.

---

## 4) Proposed feature backlog (ranked)

### Tier 1 — Build next (high impact, manageable lift)
1. Now / Next / Later strip
2. Safety-Critical Checks layer (meds + hard dates)
3. Low Capacity Mode lens
4. Verbatim copy regression tests

### Tier 2 — Build after Tier 1 stabilizes
5. Change Log + Version Compare
6. Emergency Grounding Card
7. Quick Capture widget

### Tier 3 — Validate via small experiments
8. If/Then rescue prompt engine
9. Capacity-aware section ordering
10. Contextual suggestion cards driven by day/rhythm metadata

---

## 5) Anti-features to explicitly avoid

- Streaks, scores, completion percentages
- Push notifications as default behavior
- "Overdue" punishment metaphors
- Social comparison or sharing metrics
- Any UI that obscures core routines behind configuration complexity

---

## 6) Suggested acceptance criteria for the next planning cycle

1. **First-view clarity:** user can identify one immediate action in <5 seconds.
2. **Hard-day parity:** every major routine has visible minimum viable path.
3. **Critical accuracy:** meds/deadline content passes deterministic checks.
4. **Offline confidence:** key screens fully usable in airplane mode.
5. **Philosophy integrity:** no introduced feature conflicts with non-gamified, non-shaming design principles.

---

## 7) One-sentence strategic direction

Evolve the app from a static life guide into a **capacity-aware, trust-preserving field operating system**—without ever becoming a productivity machine.
