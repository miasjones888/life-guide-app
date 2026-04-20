'use client';

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * useLibrary — books, films, and series Mia is reading or watching.
 *
 * Each entry is a small structured record: title, kind, one-sentence
 * impression, two independent marks (movedMe, learnedFrom), an optional
 * categorical impression, and an optional pointer to where the longer
 * notes live (a journal page, a future folder note, a garden specimen,
 * or a free-text "elsewhere" location).
 *
 * No numeric ratings, no stars, no out-of-five. COVENANT §10 forbids
 * ratings of one's own output; rating external work is categorically
 * different, but the surface still avoids the single-scalar feel.
 * The categorical `impression` reads as care language, not a grade.
 *
 * Versioned-localStorage shape mirrors hooks/useJournal.ts exactly.
 * v0 → v1 migration carve-out is wired from day one (no legacy data
 * exists, but the pattern stays consistent across every store the
 * /settings snapshot round-trips).
 */

const STORAGE_KEY = STORAGE_KEYS.LIBRARY;
const STORAGE_VERSION = 1;

export type MediaKind = 'book' | 'film' | 'series';

export type Impression = 'stayed-with-me' | 'liked' | 'fine' | 'set-down';

export type LibraryLinkKind = 'journal' | 'specimen' | 'note' | 'external';

export interface LibraryLink {
  /** Which in-app surface this points at (or 'external' for elsewhere). */
  kind: LibraryLinkKind;
  /**
   * Resolves against the linked surface:
   * - journal: page index as a string
   * - specimen: specimen id from content/mia.ts (resolves once Garden ships)
   * - note: folder/note id (resolves once notes re-skin ships)
   * - external: free-text location (e.g. "blue notebook, p.40")
   */
  ref: string;
}

export interface LibraryEntry {
  id: string;
  kind: MediaKind;
  title: string;
  /** One-sentence impression. Optional — title alone is enough to save. */
  sentence?: string;
  /** Categorical impression. Undefined while still tending. */
  impression?: Impression;
  movedMe: boolean;
  learnedFrom: boolean;
  link?: LibraryLink;
  /** ISO date — used for sort and month grouping. Never displayed as elapsed time. */
  loggedAt: string;
}

export interface LibraryState {
  entries: LibraryEntry[];
}

interface StoredLibraryV1 {
  version: number;
  state: LibraryState;
}

function emptyState(): LibraryState {
  return { entries: [] };
}

const KINDS: readonly MediaKind[] = ['book', 'film', 'series'];
const IMPRESSIONS: readonly Impression[] = ['stayed-with-me', 'liked', 'fine', 'set-down'];
const LINK_KINDS: readonly LibraryLinkKind[] = ['journal', 'specimen', 'note', 'external'];

function isMediaKind(v: unknown): v is MediaKind {
  return typeof v === 'string' && (KINDS as readonly string[]).includes(v);
}

function isImpression(v: unknown): v is Impression {
  return typeof v === 'string' && (IMPRESSIONS as readonly string[]).includes(v);
}

function isLinkKind(v: unknown): v is LibraryLinkKind {
  return typeof v === 'string' && (LINK_KINDS as readonly string[]).includes(v);
}

function sanitizeLink(raw: unknown): LibraryLink | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Partial<LibraryLink>;
  if (!isLinkKind(r.kind) || typeof r.ref !== 'string') return undefined;
  return { kind: r.kind, ref: r.ref };
}

function sanitizeEntry(raw: unknown): LibraryEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Partial<LibraryEntry>;
  if (typeof r.id !== 'string' || !r.id) return null;
  if (!isMediaKind(r.kind)) return null;
  if (typeof r.title !== 'string' || !r.title.trim()) return null;
  if (typeof r.loggedAt !== 'string' || !r.loggedAt) return null;
  const entry: LibraryEntry = {
    id: r.id,
    kind: r.kind,
    title: r.title,
    movedMe: r.movedMe === true,
    learnedFrom: r.learnedFrom === true,
    loggedAt: r.loggedAt,
  };
  if (typeof r.sentence === 'string' && r.sentence.length > 0) entry.sentence = r.sentence;
  if (isImpression(r.impression)) entry.impression = r.impression;
  const link = sanitizeLink(r.link);
  if (link) entry.link = link;
  return entry;
}

function parseLibraryState(stored: string | null): LibraryState {
  if (!stored) return emptyState();

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    // v0 legacy — no real legacy data exists for this key (the historical
    // MEDIA_LOG key was distinct and removed in Phase 1 Step 5), but the
    // catch branch stays consistent with every other versioned store so
    // a stray non-JSON write under this key never silently drops content.
    return emptyState();
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    (parsed as StoredLibraryV1).version !== STORAGE_VERSION
  ) {
    return emptyState();
  }
  const { state } = parsed as StoredLibraryV1;
  if (!state || !Array.isArray(state.entries)) return emptyState();

  const entries = state.entries
    .map(sanitizeEntry)
    .filter((e): e is LibraryEntry => e !== null);

  return { entries };
}

function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `lib-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isoNow(): string {
  return new Date().toISOString();
}

export interface AddEntryInput {
  kind: MediaKind;
  title: string;
  sentence?: string;
  impression?: Impression;
  movedMe?: boolean;
  learnedFrom?: boolean;
  link?: LibraryLink;
}

export type UpdateEntryInput = Partial<Omit<LibraryEntry, 'id' | 'loggedAt'>>;

export function useLibrary() {
  const [state, setState] = useState<LibraryState>(emptyState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setState(parseLibraryState(stored));
    } catch {
      // localStorage unavailable; start with defaults
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        try {
          setState(parseLibraryState(event.newValue));
        } catch {
          // ignore parse errors from external tab writes
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persist = useCallback((next: LibraryState) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state: next } satisfies StoredLibraryV1),
      );
    } catch {
      // ignore write failures (private browsing quota, etc.)
    }
  }, []);

  const addEntry = useCallback(
    (input: AddEntryInput): LibraryEntry => {
      const entry: LibraryEntry = {
        id: newId(),
        kind: input.kind,
        title: input.title,
        movedMe: input.movedMe === true,
        learnedFrom: input.learnedFrom === true,
        loggedAt: isoNow(),
      };
      if (input.sentence && input.sentence.length > 0) entry.sentence = input.sentence;
      if (input.impression) entry.impression = input.impression;
      if (input.link) entry.link = input.link;
      setState((prev) => {
        const next: LibraryState = { entries: [entry, ...prev.entries] };
        persist(next);
        return next;
      });
      return entry;
    },
    [persist],
  );

  const updateEntry = useCallback(
    (id: string, patch: UpdateEntryInput) => {
      setState((prev) => {
        const idx = prev.entries.findIndex((e) => e.id === id);
        if (idx === -1) return prev;
        const current = prev.entries[idx];
        const merged: LibraryEntry = {
          ...current,
          ...patch,
          movedMe: patch.movedMe === undefined ? current.movedMe : patch.movedMe === true,
          learnedFrom:
            patch.learnedFrom === undefined ? current.learnedFrom : patch.learnedFrom === true,
        };
        // Patch may explicitly clear optionals by passing undefined.
        if ('sentence' in patch && !patch.sentence) delete merged.sentence;
        if ('impression' in patch && !patch.impression) delete merged.impression;
        if ('link' in patch && !patch.link) delete merged.link;
        const nextEntries = prev.entries.slice();
        nextEntries[idx] = merged;
        const next: LibraryState = { entries: nextEntries };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const removeEntry = useCallback(
    (id: string) => {
      setState((prev) => {
        const next: LibraryState = { entries: prev.entries.filter((e) => e.id !== id) };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const exportData = useCallback((): string => {
    try {
      return (
        localStorage.getItem(STORAGE_KEY) ??
        JSON.stringify({ version: STORAGE_VERSION, state } satisfies StoredLibraryV1)
      );
    } catch {
      return JSON.stringify({ version: STORAGE_VERSION, state } satisfies StoredLibraryV1);
    }
  }, [state]);

  const importData = useCallback(
    (json: string): { ok: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(json) as unknown;
        if (!parsed || typeof parsed !== 'object') {
          return { ok: false, error: 'Invalid library data.' };
        }
        const { state: imported } = parsed as StoredLibraryV1;
        if (!imported || !Array.isArray(imported.entries)) {
          return { ok: false, error: 'Missing library entries.' };
        }
        const next = parseLibraryState(json);
        setState(next);
        persist(next);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Could not parse library data.' };
      }
    },
    [persist],
  );

  return {
    entries: state.entries,
    addEntry,
    updateEntry,
    removeEntry,
    exportData,
    importData,
  };
}
