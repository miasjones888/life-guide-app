'use client';

import { useState, useEffect } from 'react';

export type PriorityStatus = 'todo' | 'doing' | 'done';

const STORAGE_KEY = 'priority-status';
const CYCLE: PriorityStatus[] = ['todo', 'doing', 'done'];

function loadFromStorage(): Record<number, PriorityStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<number, PriorityStatus>;
  } catch {
    return {};
  }
}

export function usePriorityStatus() {
  const [statusMap, setStatusMap] = useState<Record<number, PriorityStatus>>({});

  useEffect(() => {
    setStatusMap(loadFromStorage());
  }, []);

  function getStatus(rank: number): PriorityStatus {
    return statusMap[rank] ?? 'todo';
  }

  function cycleStatus(rank: number) {
    setStatusMap((prev) => {
      const current = prev[rank] ?? 'todo';
      const idx = CYCLE.indexOf(current);
      const next = CYCLE[(idx + 1) % CYCLE.length];
      const updated = { ...prev, [rank]: next };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }

  return { getStatus, cycleStatus };
}
