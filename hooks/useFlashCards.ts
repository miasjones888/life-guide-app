'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FlashCard } from '@/content/types';

const STORAGE_KEY = 'life-guide-deck';

export function useFlashCards() {
  const [cards, setCards] = useState<FlashCard[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCards(JSON.parse(stored) as FlashCard[]);
    } catch {
      // localStorage unavailable or corrupted; start fresh
    }
  }, []);

  const save = useCallback((updated: FlashCard[]) => {
    setCards(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore write failures (e.g. private browsing quota)
    }
  }, []);

  const addCard = useCallback(
    (data: Omit<FlashCard, 'id' | 'createdAt'>) => {
      const newCard: FlashCard = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        ...data,
      };
      save([newCard, ...cards]);
    },
    [cards, save]
  );

  const deleteCard = useCallback(
    (id: string) => {
      save(cards.filter((c) => c.id !== id));
    },
    [cards, save]
  );

  return { cards, addCard, deleteCard };
}
