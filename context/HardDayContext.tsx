'use client';

import React, { createContext, useContext } from 'react';
import { useHardDayMode } from '@/hooks/useHardDayMode';

interface HardDayContextValue {
  isHardDay: boolean;
  toggle: () => void;
  setHardDay: (v: boolean) => void;
}

const HardDayContext = createContext<HardDayContextValue>({
  isHardDay: false,
  toggle: () => {},
  setHardDay: () => {},
});

export function HardDayProvider({ children }: { children: React.ReactNode }) {
  const value = useHardDayMode();
  return <HardDayContext.Provider value={value}>{children}</HardDayContext.Provider>;
}

export function useHardDay() {
  return useContext(HardDayContext);
}
