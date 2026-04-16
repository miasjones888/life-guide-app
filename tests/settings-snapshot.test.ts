import { beforeEach, describe, expect, it } from 'vitest';
import {
  SETTINGS_STORES,
  SNAPSHOT_VERSION,
  buildSnapshot,
  restoreSnapshot,
} from '@/lib/settings-snapshot';
import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * Phase 1 Step 4 exit criterion: /settings Export → Import round-trips
 * every versioned store without mutating the on-disk shape.
 *
 * Run under jsdom so localStorage is a real in-memory store. Each test
 * seeds localStorage by hand with representative values for all eight
 * Phase 1 stores — versioned wrappers for anchor / journal / budget /
 * folders / user events / local events, raw arrays for wishlist, and a
 * raw non-JSON string for hard-day mode. Round-trip must leave every
 * key byte-identical to what the hook originally wrote.
 */

// Representative seed values for each store. Shapes match what the
// hooks actually write under each key — verified against useAnchor,
// useJournal, useHardDayMode (live), and the archived hooks whose
// storage keys the snapshot still round-trips (useBudget, useFolderSystem,
// useWishlist, useUserEvents, useLocalEvents).
const SEEDS: Record<string, string> = {
  [STORAGE_KEYS.ANCHOR]: JSON.stringify({
    version: 1,
    state: { date: '2026-04-15', text: 'tend the job search' },
  }),
  [STORAGE_KEYS.JOURNAL]: JSON.stringify({
    version: 1,
    state: { pages: ['first page', 'second page'], currentPageIndex: 1 },
  }),
  [STORAGE_KEYS.BUDGET]: JSON.stringify({
    version: 1,
    state: {
      lines: [{ id: 'rent', label: 'rent', category: 'housing', amount: 0, isFixed: true, isSubscription: false }],
      overrides: [],
      goals: [],
    },
  }),
  [STORAGE_KEYS.FOLDERS]: JSON.stringify({
    version: 1,
    notes: [
      {
        id: 'n1',
        folderId: 'capture',
        format: 'fragment',
        content: 'a fragment',
        createdAt: '2026-04-15T09:00:00Z',
        isFlagged: false,
      },
    ],
  }),
  [STORAGE_KEYS.WISHLIST]: JSON.stringify([
    {
      id: 'w1',
      title: 'book',
      category: 'book',
      addedAt: '2026-04-15T09:00:00Z',
      done: false,
      source: 'manual',
    },
  ]),
  [STORAGE_KEYS.USER_EVENTS]: JSON.stringify({
    version: 1,
    events: [
      {
        id: 'ue-1',
        title: 'vet appointment',
        date: '2026-04-20',
        category: 'tomato',
        createdAt: '2026-04-15T09:00:00Z',
      },
    ],
  }),
  [STORAGE_KEYS.LOCAL_EVENTS]: JSON.stringify({
    version: 1,
    events: [
      {
        id: 'local-1',
        title: 'coffee with friend',
        date: '2026-04-18',
        category: 'sage',
        recurrence: 'one-time',
      },
    ],
  }),
  // The hard-day-mode hook stores a raw "true"/"false" string — not
  // JSON. The round-trip must preserve that raw form exactly.
  [STORAGE_KEYS.HARD_DAY_MODE]: 'true',
};

function seedAll() {
  for (const [key, value] of Object.entries(SEEDS)) {
    localStorage.setItem(key, value);
  }
}

function readAll(): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const s of SETTINGS_STORES) {
    out[s.key] = localStorage.getItem(s.key);
  }
  return out;
}

describe('/settings snapshot round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('covers every Phase 1 store called out in HANDOFF', () => {
    // Sanity: the eight stores HANDOFF Step 4 lists must be the eight
    // stores the settings page exports. If this ever drifts, the
    // covenant exit criterion drifts with it.
    const labels = SETTINGS_STORES.map((s) => s.label).sort();
    expect(labels).toEqual(
      [
        'anchor',
        'journal',
        'budget',
        'folders',
        'wishlist',
        'user events',
        'local events',
        'hard-day mode',
      ].sort(),
    );
  });

  it('builds a snapshot that contains every seeded store verbatim', () => {
    seedAll();
    const snapshot = buildSnapshot();

    expect(snapshot.version).toBe(SNAPSHOT_VERSION);
    expect(typeof snapshot.exportedAt).toBe('string');

    // Every store that was seeded must be present in the snapshot with
    // a parsed representation equal to what the seed parses to.
    for (const s of SETTINGS_STORES) {
      expect(snapshot.stores, `missing store ${s.key}`).toHaveProperty(s.key);
    }

    // Structured stores round-trip through JSON.parse, so deep-equal
    // the parsed seed. The raw-string store (hard-day-mode) is stored
    // as "true", which JSON.parse accepts as the literal boolean true.
    expect(snapshot.stores[STORAGE_KEYS.ANCHOR]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.ANCHOR]));
    expect(snapshot.stores[STORAGE_KEYS.JOURNAL]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.JOURNAL]));
    expect(snapshot.stores[STORAGE_KEYS.BUDGET]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.BUDGET]));
    expect(snapshot.stores[STORAGE_KEYS.FOLDERS]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.FOLDERS]));
    expect(snapshot.stores[STORAGE_KEYS.WISHLIST]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.WISHLIST]));
    expect(snapshot.stores[STORAGE_KEYS.USER_EVENTS]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.USER_EVENTS]));
    expect(snapshot.stores[STORAGE_KEYS.LOCAL_EVENTS]).toEqual(JSON.parse(SEEDS[STORAGE_KEYS.LOCAL_EVENTS]));
    // Hard-day mode: raw "true" string parses as JSON boolean true.
    expect(snapshot.stores[STORAGE_KEYS.HARD_DAY_MODE]).toBe(true);
  });

  it('restores a snapshot into an empty localStorage', () => {
    seedAll();
    const snapshot = buildSnapshot();

    // Wipe storage. Every key is gone.
    localStorage.clear();
    for (const s of SETTINGS_STORES) {
      expect(localStorage.getItem(s.key)).toBeNull();
    }

    const result = restoreSnapshot(JSON.stringify(snapshot));
    expect(result.ok).toBe(true);
    expect(result.restored).toHaveLength(SETTINGS_STORES.length);

    // Each restored store must parse back to the same structure the
    // seed held. (Serialization is JSON.stringify without formatting,
    // which loses whitespace but not structure.)
    const after = readAll();
    for (const s of SETTINGS_STORES) {
      expect(after[s.key], `store ${s.key} was not restored`).not.toBeNull();
    }
    for (const s of SETTINGS_STORES) {
      const rawAfter = after[s.key];
      const rawSeed = SEEDS[s.key];
      if (s.key === STORAGE_KEYS.HARD_DAY_MODE) {
        // Raw non-JSON seed "true" round-trips as the string "true"
        // (parsed to JSON boolean true on read, restored as
        // JSON.stringify(true) = "true" on write). Verify the restored
        // form still reads as a truthy hard-day-mode value.
        expect(rawAfter).toBe('true');
      } else {
        expect(JSON.parse(rawAfter as string)).toEqual(JSON.parse(rawSeed));
      }
    }
  });

  it('does a full edit → export → re-import round-trip', () => {
    // Seed, export a snapshot, mutate one store, re-import, confirm
    // the mutation is reverted. This is the "export → change your
    // anchor → re-import → old anchor comes back" flow from the PR
    // test plan, exercised without a browser.
    seedAll();
    const snapshot = buildSnapshot();
    const snapshotJson = JSON.stringify(snapshot);

    // Clobber the anchor store with a different v1 value.
    localStorage.setItem(
      STORAGE_KEYS.ANCHOR,
      JSON.stringify({
        version: 1,
        state: { date: '2026-04-15', text: 'something else entirely' },
      }),
    );

    const result = restoreSnapshot(snapshotJson);
    expect(result.ok).toBe(true);

    const restoredAnchor = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANCHOR) as string);
    expect(restoredAnchor.state.text).toBe('tend the job search');
  });

  it('rejects a snapshot with the wrong version', () => {
    const bad = JSON.stringify({ version: 'some-other-version', exportedAt: '', stores: {} });
    const result = restoreSnapshot(bad);
    expect(result.ok).toBe(false);
    expect(result.error).toContain('Unknown snapshot version');
  });

  it('rejects unparseable input', () => {
    const result = restoreSnapshot('{ not json');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Could not parse file.');
  });
});
