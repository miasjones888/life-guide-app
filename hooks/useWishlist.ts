'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WishlistItem, WishlistCategory } from '@/content/types';
import { STORAGE_KEYS } from '@/lib/storage-keys';

const STORAGE_KEY = STORAGE_KEYS.WISHLIST;

function normalizeItem(candidate: unknown): WishlistItem | null {
  if (!candidate || typeof candidate !== 'object') return null;
  const maybe = candidate as Partial<WishlistItem>;
  if (
    typeof maybe.id !== 'string' ||
    typeof maybe.title !== 'string' ||
    typeof maybe.addedAt !== 'string' ||
    typeof maybe.done !== 'boolean' ||
    (maybe.source !== 'tiktok' && maybe.source !== 'manual')
  ) {
    return null;
  }
  const validCategories: WishlistCategory[] = ['want', 'experience', 'movie', 'show', 'book', 'other'];
  const category: WishlistCategory = validCategories.includes(maybe.category as WishlistCategory)
    ? (maybe.category as WishlistCategory)
    : 'other';

  return {
    id: maybe.id,
    title: maybe.title,
    url: typeof maybe.url === 'string' ? maybe.url : undefined,
    thumbnail: typeof maybe.thumbnail === 'string' ? maybe.thumbnail : undefined,
    author: typeof maybe.author === 'string' ? maybe.author : undefined,
    category,
    addedAt: maybe.addedAt,
    done: maybe.done,
    note: typeof maybe.note === 'string' ? maybe.note : undefined,
    source: maybe.source,
  };
}

function loadItems(): WishlistItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeItem).filter((item): item is WishlistItem => item !== null);
  } catch {
    return [];
  }
}

function saveItems(items: WishlistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write failures (e.g. private browsing quota)
  }
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setItems(loadItems());
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setItems(loadItems());
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addItem = useCallback((data: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>) => {
    const newItem: WishlistItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      addedAt: new Date().toISOString(),
      done: false,
      ...data,
    };
    setItems((prev) => {
      const updated = [newItem, ...prev];
      saveItems(updated);
      return updated;
    });
    return newItem;
  }, []);

  const importItems = useCallback((incoming: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>[]) => {
    const newItems: WishlistItem[] = incoming.map((data) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${Math.random().toString(36).slice(2, 5)}`,
      addedAt: new Date().toISOString(),
      done: false,
      ...data,
    }));
    setItems((prev) => {
      const updated = [...newItems, ...prev];
      saveItems(updated);
      return updated;
    });
    return newItems.length;
  }, []);

  const markDone = useCallback((id: string, done: boolean) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, done } : item
      );
      saveItems(updated);
      return updated;
    });
  }, []);

  const updateCategory = useCallback((id: string, category: WishlistCategory) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, category } : item
      );
      saveItems(updated);
      return updated;
    });
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveItems(updated);
      return updated;
    });
  }, []);

  return { items, addItem, importItems, markDone, updateCategory, deleteItem };
}
