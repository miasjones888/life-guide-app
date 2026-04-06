'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { BudgetLine, MonthOverride, BudgetGoal, BudgetState } from '@/content/types';
import { defaultBudgetState } from '@/content/budget';

const STORAGE_KEY = 'life-guide-budget';
const STORAGE_VERSION = 1;

interface StoredBudgetV1 {
  version: number;
  state: BudgetState;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getAmountForMonth(line: BudgetLine, overrides: MonthOverride[], month: string): number {
  const override = overrides.find((o) => o.id === line.id && o.month === month);
  return override !== undefined ? override.amount : line.amount;
}

function parseBudgetState(stored: string | null): BudgetState {
  if (!stored) return defaultBudgetState;
  try {
    const parsed = JSON.parse(stored) as unknown;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      (parsed as StoredBudgetV1).version !== STORAGE_VERSION
    ) {
      return defaultBudgetState;
    }
    const { state } = parsed as StoredBudgetV1;
    if (!state || !Array.isArray(state.lines)) return defaultBudgetState;

    // Merge: seed lines not present in stored lines are added back automatically
    const storedIds = new Set(state.lines.map((l) => l.id));
    const missingFromSeed = defaultBudgetState.lines.filter((l) => !storedIds.has(l.id));

    return {
      lines: [...state.lines, ...missingFromSeed],
      overrides: Array.isArray(state.overrides) ? state.overrides : [],
      goals: Array.isArray(state.goals) ? state.goals : defaultBudgetState.goals,
    };
  } catch {
    return defaultBudgetState;
  }
}

export function useBudget() {
  const [state, setState] = useState<BudgetState>(defaultBudgetState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setState(parseBudgetState(stored));
    } catch {
      // localStorage unavailable; start with defaults
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        try {
          setState(parseBudgetState(event.newValue));
        } catch {
          // ignore parse errors from external tab writes
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persist = useCallback((next: BudgetState) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state: next } satisfies StoredBudgetV1)
      );
    } catch {
      // ignore write failures (private browsing quota, etc.)
    }
  }, []);

  const updateLineAmount = useCallback(
    (id: string, amount: number) => {
      setState((prev) => {
        const next = {
          ...prev,
          lines: prev.lines.map((l) => (l.id === id ? { ...l, amount } : l)),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const updateLineNote = useCallback(
    (id: string, note: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          lines: prev.lines.map((l) => (l.id === id ? { ...l, note } : l)),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setMonthOverride = useCallback(
    (id: string, month: string, amount: number) => {
      setState((prev) => {
        const filtered = prev.overrides.filter((o) => !(o.id === id && o.month === month));
        const next = {
          ...prev,
          overrides: [...filtered, { id, month, amount }],
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearMonthOverride = useCallback(
    (id: string, month: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          overrides: prev.overrides.filter((o) => !(o.id === id && o.month === month)),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const updateGoal = useCallback(
    (id: string, changes: Partial<Pick<BudgetGoal, 'label' | 'note' | 'targetAmount'>>) => {
      setState((prev) => {
        const next = {
          ...prev,
          goals: prev.goals.map((g) => (g.id === id ? { ...g, ...changes } : g)),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const calculations = useMemo(() => {
    const now = new Date();
    const currentMonth = getMonthKey(now);

    function getMonthData(month: string) {
      const income = state.lines
        .filter((l) => l.category === 'income')
        .reduce((sum, l) => sum + getAmountForMonth(l, state.overrides, month), 0);
      const expenses = state.lines
        .filter((l) => l.category !== 'income')
        .reduce((sum, l) => sum + getAmountForMonth(l, state.overrides, month), 0);
      return { month, income, expenses, net: income - expenses };
    }

    const months: string[] = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return getMonthKey(d);
    });

    return {
      currentMonth,
      thisMonth: getMonthData(currentMonth),
      projections: months.map(getMonthData),
    };
  }, [state]);

  return {
    state,
    calculations,
    updateLineAmount,
    updateLineNote,
    setMonthOverride,
    clearMonthOverride,
    updateGoal,
  };
}
