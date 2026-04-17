'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CalendarEvent, CalendarCategory } from '@/content/types';
import { STORAGE_KEYS } from '@/lib/storage-keys';

const STORAGE_VERSION = 1;

interface StoredLocalEvents {
  version: number;
  events: CalendarEvent[];
}

function parseStored(raw: string | null): CalendarEvent[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      'events' in parsed &&
      Array.isArray((parsed as StoredLocalEvents).events)
    ) {
      return (parsed as StoredLocalEvents).events;
    }
  } catch {}
  return [];
}

function persist(events: CalendarEvent[]) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_EVENTS,
      JSON.stringify({ version: STORAGE_VERSION, events } satisfies StoredLocalEvents)
    );
  } catch {}
}

export function useLocalEvents() {
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    try {
      setLocalEvents(parseStored(localStorage.getItem(STORAGE_KEYS.LOCAL_EVENTS)));
    } catch {}
  }, []);

  const addEvent = useCallback((data: {
    title: string;
    date: string;
    time?: string;
    category: CalendarCategory;
    note?: string;
    isUrgent?: boolean;
  }) => {
    const event: CalendarEvent = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      recurrence: 'one-time',
      ...data,
    };
    setLocalEvents((prev) => {
      const updated = [...prev, event];
      persist(updated);
      return updated;
    });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setLocalEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const getTodayLocalEvents = useCallback(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return localEvents.filter((e) => e.date === todayStr);
  }, [localEvents]);

  const exportData = useCallback((): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LOCAL_EVENTS) ?? JSON.stringify({ version: STORAGE_VERSION, events: localEvents });
    } catch {
      return JSON.stringify({ version: STORAGE_VERSION, events: localEvents });
    }
  }, [localEvents]);

  return { localEvents, addEvent, deleteEvent, getTodayLocalEvents, exportData };
}
