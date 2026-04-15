'use client';

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * useAnchor — the single sentence Mia sets for the day.
 *
 * Date-scoped: each new day, the input is fresh and waiting. Yesterday's
 * sentence does not carry forward, because seeing it tomorrow morning
 * creates a "do I keep this or replace it" decision at the wrong moment
 * (COVENANT §1).
 *
 * Versioned-localStorage shape mirrors hooks/useBudget.ts exactly so
 * future migrations follow the same pattern.
 */

const STORAGE_KEY = STORAGE_KEYS.ANCHOR;
const STORAGE_VERSION = 1;

export interface AnchorState {
  /** Local YYYY-MM-DD the sentence was written for. */
  date: string;
  /** The single sentence. Empty string when unset. */
  text: string;
}

interface StoredAnchorV1 {
  version: number;
  state: AnchorState;
}

function todayKey(now: Date = new Date()): string {
  // Local wall clock — anchor follows the day Mia is actually living in,
  // not UTC.
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function emptyState(): AnchorState {
  return { date: todayKey(), text: '' };
}

function parseAnchorState(stored: string | null): AnchorState {
  if (!stored) return emptyState();

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    // Legacy v0 — pre-versioning, the previous /page.tsx wrote the anchor
    // as a raw (non-JSON) string under this same localStorage key. Adopt
    // it as today's sentence instead of silently dropping it on first
    // upgrade. The next setAnchorText call will rewrite in the v1 shape.
    return { date: todayKey(), text: stored };
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    (parsed as StoredAnchorV1).version !== STORAGE_VERSION
  ) {
    return emptyState();
  }
  const { state } = parsed as StoredAnchorV1;
  if (!state || typeof state.date !== 'string' || typeof state.text !== 'string') {
    return emptyState();
  }
  // Date-scoped: a stored sentence from a previous day reads as empty.
  if (state.date !== todayKey()) return emptyState();
  return state;
}

export function useAnchor() {
  const [state, setState] = useState<AnchorState>(emptyState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setState(parseAnchorState(stored));
    } catch {
      // localStorage unavailable; start with defaults
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        try {
          setState(parseAnchorState(event.newValue));
        } catch {
          // ignore parse errors from external tab writes
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persist = useCallback((next: AnchorState) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state: next } satisfies StoredAnchorV1)
      );
    } catch {
      // ignore write failures (private browsing quota, etc.)
    }
  }, []);

  const setAnchorText = useCallback(
    (text: string) => {
      setState(() => {
        const next: AnchorState = { date: todayKey(), text };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearAnchor = useCallback(() => {
    setState(() => {
      const next: AnchorState = { date: todayKey(), text: '' };
      persist(next);
      return next;
    });
  }, [persist]);

  return {
    anchor: state,
    setAnchorText,
    clearAnchor,
  };
}
