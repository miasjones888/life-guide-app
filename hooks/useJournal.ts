'use client';

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * useJournal — the pen-button drawer's notebook.
 *
 * The drawer opens to a single long notebook, paged like a real one:
 * each page fills, then a new one starts. No soft scroll inside a page.
 * Pages persist across sessions. The hook is the single source of
 * truth for the notebook body — the drawer is a view over it.
 *
 * Versioned-localStorage shape mirrors hooks/useAnchor.ts and
 * hooks/useBudget.ts exactly. v0 → v1 migration carve-out is wired from
 * day one: if any prior surface ever wrote a raw string under the same
 * key, adopt it as page 0 of the notebook instead of dropping it on
 * first read.
 *
 * The hook is deliberately date-agnostic. Unlike useAnchor, the journal
 * is not date-scoped — it is one continuous notebook and returning to
 * it after a gap should feel like opening the same book to the same
 * page (COVENANT §8).
 */

const STORAGE_KEY = STORAGE_KEYS.JOURNAL;
const STORAGE_VERSION = 1;

export interface JournalState {
  /** Each page is a free-form string. Always at least one page. */
  pages: string[];
  /** Index of the page the drawer should open on. */
  currentPageIndex: number;
}

interface StoredJournalV1 {
  version: number;
  state: JournalState;
}

function emptyState(): JournalState {
  return { pages: [''], currentPageIndex: 0 };
}

function clampIndex(idx: number, pages: string[]): number {
  if (pages.length === 0) return 0;
  if (idx < 0) return 0;
  if (idx >= pages.length) return pages.length - 1;
  return idx;
}

function parseJournalState(stored: string | null): JournalState {
  if (!stored) return emptyState();

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    // v0 legacy — a raw non-JSON string written by some earlier surface
    // under this same key. Adopt it as page 0 of the notebook instead
    // of silently dropping it on first upgrade. The next write will
    // rewrite in the v1 shape.
    return { pages: [stored], currentPageIndex: 0 };
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    (parsed as StoredJournalV1).version !== STORAGE_VERSION
  ) {
    return emptyState();
  }
  const { state } = parsed as StoredJournalV1;
  if (!state || !Array.isArray(state.pages)) return emptyState();

  const pages = state.pages.filter((p): p is string => typeof p === 'string');
  if (pages.length === 0) return emptyState();

  const currentPageIndex =
    typeof state.currentPageIndex === 'number'
      ? clampIndex(state.currentPageIndex, pages)
      : 0;

  return { pages, currentPageIndex };
}

export function useJournal() {
  const [state, setState] = useState<JournalState>(emptyState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setState(parseJournalState(stored));
    } catch {
      // localStorage unavailable; start with defaults
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        try {
          setState(parseJournalState(event.newValue));
        } catch {
          // ignore parse errors from external tab writes
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persist = useCallback((next: JournalState) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state: next } satisfies StoredJournalV1)
      );
    } catch {
      // ignore write failures (private browsing quota, etc.)
    }
  }, []);

  const setPageText = useCallback(
    (index: number, text: string) => {
      setState((prev) => {
        if (index < 0 || index >= prev.pages.length) return prev;
        const nextPages = prev.pages.slice();
        nextPages[index] = text;
        const next: JournalState = { ...prev, pages: nextPages };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const addPage = useCallback(
    (initialText = '') => {
      setState((prev) => {
        const nextPages = [...prev.pages, initialText];
        const next: JournalState = {
          pages: nextPages,
          currentPageIndex: nextPages.length - 1,
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const goToPage = useCallback(
    (index: number) => {
      setState((prev) => {
        const clamped = clampIndex(index, prev.pages);
        if (clamped === prev.currentPageIndex) return prev;
        const next: JournalState = { ...prev, currentPageIndex: clamped };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const exportData = useCallback((): string => {
    try {
      return (
        localStorage.getItem(STORAGE_KEY) ??
        JSON.stringify({ version: STORAGE_VERSION, state } satisfies StoredJournalV1)
      );
    } catch {
      return JSON.stringify({ version: STORAGE_VERSION, state } satisfies StoredJournalV1);
    }
  }, [state]);

  const importData = useCallback(
    (json: string): { ok: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(json) as unknown;
        if (!parsed || typeof parsed !== 'object') {
          return { ok: false, error: 'Invalid journal data.' };
        }
        const { state: imported } = parsed as StoredJournalV1;
        if (!imported || !Array.isArray(imported.pages)) {
          return { ok: false, error: 'Missing journal pages.' };
        }
        const next = parseJournalState(json);
        setState(next);
        persist(next);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Could not parse journal data.' };
      }
    },
    [persist]
  );

  return {
    state,
    setPageText,
    addPage,
    goToPage,
    exportData,
    importData,
  };
}
