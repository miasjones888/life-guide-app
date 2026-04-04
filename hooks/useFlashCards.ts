'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FlashCard, CalendarCategory } from '@/content/types';

const STORAGE_KEY = 'life-guide-deck';
const STORAGE_VERSION = 2;

const validCategories: CalendarCategory[] = [
  'tomato',
  'grape',
  'blueberry',
  'basil',
  'banana',
  'flamingo',
  'graphite',
  'tangerine',
  'peacock',
  'sage',
];

interface StoredDeckV2 {
  version: number;
  cards: FlashCard[];
}

function isValidCategory(category: unknown): category is CalendarCategory {
  return typeof category === 'string' && validCategories.includes(category as CalendarCategory);
}

function normalizeCard(candidate: unknown): FlashCard | null {
  if (!candidate || typeof candidate !== 'object') return null;
  const maybe = candidate as Partial<FlashCard>;
  if (
    typeof maybe.id !== 'string' ||
    typeof maybe.content !== 'string' ||
    !isValidCategory(maybe.category) ||
    typeof maybe.createdAt !== 'string'
  ) {
    return null;
  }

  return {
    id: maybe.id,
    content: maybe.content,
    category: maybe.category,
    createdAt: maybe.createdAt,
    note: typeof maybe.note === 'string' ? maybe.note : undefined,
    updatedAt: typeof maybe.updatedAt === 'string' ? maybe.updatedAt : undefined,
    isFlagged: typeof maybe.isFlagged === 'boolean' ? maybe.isFlagged : false,
  };
}

function parseStoredDeck(stored: string | null): FlashCard[] {
  if (!stored) return [];
  const parsed = JSON.parse(stored) as unknown;

  // V1 shape: array of cards
  if (Array.isArray(parsed)) {
    return parsed.map(normalizeCard).filter((card): card is FlashCard => card !== null);
  }

  // V2 shape: { version, cards }
  if (
    parsed &&
    typeof parsed === 'object' &&
    'cards' in parsed &&
    Array.isArray((parsed as StoredDeckV2).cards)
  ) {
    return (parsed as StoredDeckV2).cards
      .map(normalizeCard)
      .filter((card): card is FlashCard => card !== null);
  }

  return [];
}

export function useFlashCards() {
  const [cards, setCards] = useState<FlashCard[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setCards(parseStoredDeck(stored));
    } catch {
      // localStorage unavailable or corrupted; start fresh
    }
  }, []);

  const syncFromStorage = useCallback((next: string | null) => {
    try {
      setCards(parseStoredDeck(next));
    } catch {
      // ignore parse errors from external tab writes
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        syncFromStorage(event.newValue);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [syncFromStorage]);

  const addCard = useCallback(
    (data: Omit<FlashCard, 'id' | 'createdAt'>) => {
      const newCard: FlashCard = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        ...data,
      };
      setCards((prev) => {
        const updated = [newCard, ...prev];
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ version: STORAGE_VERSION, cards: updated } satisfies StoredDeckV2)
          );
        } catch {
          // ignore write failures (e.g. private browsing quota)
        }
        return updated;
      });
    },
    []
  );

  const deleteCard = useCallback(
    (id: string) => {
      setCards((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ version: STORAGE_VERSION, cards: updated } satisfies StoredDeckV2)
          );
        } catch {
          // ignore write failures (e.g. private browsing quota)
        }
        return updated;
      });
    },
    []
  );

  const updateCard = useCallback((id: string, changes: Partial<Pick<FlashCard, 'content' | 'note' | 'category' | 'isFlagged'>>) => {
    setCards((prev) => {
      const updated = prev.map((card) =>
        card.id === id
          ? {
              ...card,
              ...changes,
              updatedAt: new Date().toISOString(),
            }
          : card
      );
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ version: STORAGE_VERSION, cards: updated } satisfies StoredDeckV2)
        );
      } catch {
        // ignore write failures (e.g. private browsing quota)
      }
      return updated;
    });
  }, []);

  const restoreCard = useCallback((card: FlashCard) => {
    setCards((prev) => {
      const alreadyExists = prev.some((item) => item.id === card.id);
      if (alreadyExists) return prev;
      const updated = [card, ...prev];
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ version: STORAGE_VERSION, cards: updated } satisfies StoredDeckV2)
        );
      } catch {
        // ignore write failures (e.g. private browsing quota)
      }
      return updated;
    });
  }, []);

  return { cards, addCard, deleteCard, updateCard, restoreCard };
}
