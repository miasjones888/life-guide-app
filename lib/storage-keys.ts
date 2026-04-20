// All localStorage keys used across the app.
// Add new keys here before using them in hooks or components.
//
// Phase 1 Step 5 trimmed this module to the eight keys covered by the
// /settings snapshot contract (see lib/settings-snapshot.ts + HANDOFF
// Step 4). Historical legacy keys (deck, reflection, assistant, media
// log, art history, creative feed, growth journal, reflection summaries,
// community saved) were removed alongside their consumers — nothing
// live reads them and the snapshot never exported them.

export const STORAGE_KEYS = {
  // The Phase 1 anchor sentence, per-day scoped.
  ANCHOR: 'anchor',
  // The Phase 1 journal drawer — pages of free-form writing. Distinct
  // from any future structured entries store.
  JOURNAL: 'journal',
  // The Phase 2 library — books, films, series Mia is reading or
  // watching. Each entry is a small structured record (title, kind,
  // one-sentence impression, two-axis marks, optional in-app link).
  LIBRARY: 'library',
  // Budget — consumers archived under _archive/; key stays so the
  // /settings snapshot keeps round-tripping any legacy data on device.
  BUDGET: 'life-guide-budget',
  // Folders — consumers archived under _archive/; same rationale as BUDGET.
  FOLDERS: 'life-guide-folders',
  // Hard-day toggle. Raw "true"/"false" string, not JSON.
  HARD_DAY_MODE: 'hard-day-mode',
  // Wishlist — consumers deleted in Phase 1 Step 5; key stays so the
  // /settings snapshot keeps round-tripping any legacy data on device.
  WISHLIST: 'life-guide-wishlist',
  // Local-only calendar events — consumers archived under _archive/.
  LOCAL_EVENTS: 'local-calendar-events',
  // User-added calendar events — consumers archived under _archive/.
  USER_EVENTS: 'life-guide-user-events',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
