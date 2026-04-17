'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CalendarCategory } from '@/content/types';
import { STORAGE_KEYS } from '@/lib/storage-keys';

const STORAGE_VERSION = 1;

export interface UserEvent {
  id: string;
  title: string;
  date: string;      // ISO date string, e.g. "2026-04-20"
  time?: string;     // e.g. "2:00pm"
  category: CalendarCategory;
  note?: string;
  createdAt: string; // ISO datetime string
}

interface StoredUserEventsV1 {
  version: number;
  events: UserEvent[];
}

function parseStoredEvents(raw: string | null): UserEvent[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      (parsed as StoredUserEventsV1).version !== STORAGE_VERSION
    ) {
      return [];
    }
    const { events } = parsed as StoredUserEventsV1;
    if (!Array.isArray(events)) return [];
    return events;
  } catch {
    return [];
  }
}

function generateId(): string {
  return `ue-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useUserEvents() {
  const [events, setEvents] = useState<UserEvent[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER_EVENTS);
      setEvents(parseStoredEvents(raw));
    } catch {
      // localStorage unavailable
    }
  }, []);

  function persist(next: UserEvent[]) {
    try {
      const payload: StoredUserEventsV1 = { version: STORAGE_VERSION, events: next };
      localStorage.setItem(STORAGE_KEYS.USER_EVENTS, JSON.stringify(payload));
    } catch {
      // quota or unavailability — silently skip
    }
    setEvents(next);
  }

  const addEvent = useCallback(
    (draft: Omit<UserEvent, 'id' | 'createdAt'>) => {
      const next: UserEvent = {
        ...draft,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => {
        const updated = [...prev, next];
        try {
          const payload: StoredUserEventsV1 = { version: STORAGE_VERSION, events: updated };
          localStorage.setItem(STORAGE_KEYS.USER_EVENTS, JSON.stringify(payload));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try {
        const payload: StoredUserEventsV1 = { version: STORAGE_VERSION, events: updated };
        localStorage.setItem(STORAGE_KEYS.USER_EVENTS, JSON.stringify(payload));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  return { events, addEvent, deleteEvent };
}
