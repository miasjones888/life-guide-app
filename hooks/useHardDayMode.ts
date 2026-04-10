'use client';

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/lib/storage-keys';

export function useHardDayMode() {
  const [isHardDay, setIsHardDay] = useState(false);

  useEffect(() => {
    try {
      setIsHardDay(localStorage.getItem(STORAGE_KEYS.HARD_DAY_MODE) === 'true');
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setIsHardDay((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEYS.HARD_DAY_MODE, String(next)); } catch {}
      return next;
    });
  }, []);

  const setHardDay = useCallback((value: boolean) => {
    setIsHardDay(value);
    try { localStorage.setItem(STORAGE_KEYS.HARD_DAY_MODE, String(value)); } catch {}
  }, []);

  return { isHardDay, toggle, setHardDay };
}
