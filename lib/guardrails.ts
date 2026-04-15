/**
 * guardrails.ts — covenant-derived constants the rest of Phase 1+ imports
 * to prevent drift. Numbers and flags only. No logic, no UI, no copy.
 *
 * COVENANT §3, §7  — three creative slots, one life slot, hard cap.
 *                    Activation only at the Sunday weekly review.
 *                    Dormancy is frictionless any time.
 * COVENANT §1, §6  — no streaks, no session tracking, no elapsed time.
 *
 * Naming rule: no word from §10's "Never use" list appears in any
 * constant name. Read tests/covenant-vocab.test.ts before adding to
 * this file.
 */

export const MAX_ACTIVE_CREATIVE_SLOTS = 3;
export const MAX_ACTIVE_LIFE_SLOTS = 1;
export const MAX_TOTAL_ACTIVE_SPECIMENS = 4;

export const ACTIVATION_ONLY_DURING_WEEKLY_REVIEW = true;
export const DORMANCY_IS_FRICTIONLESS = true;

export const NO_STREAKS = true;
export const NO_SESSION_TRACKING = true;
