import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * Settings snapshot — Phase 1 Step 4 escape hatch.
 *
 * Pure functions that read every Phase 1 store from localStorage, build
 * one JSON snapshot, and restore one back. Kept out of the React
 * component so a round-trip test can exercise the exact same code path
 * the /settings page uses.
 *
 * The snapshot shape mirrors the stored shape of each hook exactly —
 * useBudget's / useAnchor's / useJournal's versioned `{ version, state }`
 * wrappers pass through unchanged. Simple per-value stores
 * (hard-day-mode, user events, local events, wishlist) also round-trip
 * as their raw stored value.
 */

export interface StoreConfig {
  readonly key: string;
  readonly label: string;
}

// The eight Phase 1 data stores called out in HANDOFF Step 4:
// anchor, journal, budget, folders, wishlist, user events, local events,
// hard-day mode.
export const SETTINGS_STORES: readonly StoreConfig[] = [
  { key: STORAGE_KEYS.ANCHOR, label: 'anchor' },
  { key: STORAGE_KEYS.JOURNAL, label: 'journal' },
  { key: STORAGE_KEYS.BUDGET, label: 'budget' },
  { key: STORAGE_KEYS.FOLDERS, label: 'folders' },
  { key: STORAGE_KEYS.WISHLIST, label: 'wishlist' },
  { key: STORAGE_KEYS.USER_EVENTS, label: 'user events' },
  { key: STORAGE_KEYS.LOCAL_EVENTS, label: 'local events' },
  { key: STORAGE_KEYS.HARD_DAY_MODE, label: 'hard-day mode' },
];

export const SNAPSHOT_VERSION = 'life-guide-snapshot-v1';

export interface Snapshot {
  readonly version: typeof SNAPSHOT_VERSION;
  readonly exportedAt: string;
  readonly stores: Record<string, unknown>;
}

export interface ImportResult {
  readonly ok: boolean;
  readonly restored: readonly string[];
  readonly error?: string;
}

function readStore(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      // Raw non-JSON value (e.g. hard-day-mode stores "true"/"false").
      return raw;
    }
  } catch {
    return null;
  }
}

function writeStore(key: string, value: unknown): boolean {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch {
    return false;
  }
}

export function buildSnapshot(): Snapshot {
  const stores: Record<string, unknown> = {};
  for (const s of SETTINGS_STORES) {
    const value = readStore(s.key);
    if (value !== null) stores[s.key] = value;
  }
  return {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    stores,
  };
}

export function restoreSnapshot(json: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, restored: [], error: 'Could not parse file.' };
  }
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, restored: [], error: 'Not a valid snapshot file.' };
  }
  const candidate = parsed as Partial<Snapshot>;
  if (candidate.version !== SNAPSHOT_VERSION) {
    return {
      ok: false,
      restored: [],
      error: `Unknown snapshot version: ${String(candidate.version ?? 'none')}.`,
    };
  }
  if (!candidate.stores || typeof candidate.stores !== 'object') {
    return { ok: false, restored: [], error: 'Snapshot has no stores.' };
  }
  const restored: string[] = [];
  for (const s of SETTINGS_STORES) {
    if (!(s.key in candidate.stores)) continue;
    const value = candidate.stores[s.key];
    if (writeStore(s.key, value)) {
      restored.push(s.label);
    }
  }
  return { ok: true, restored };
}
