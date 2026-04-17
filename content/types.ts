export type CalendarCategory =
  | 'tomato'
  | 'grape'
  | 'blueberry'
  | 'basil'
  | 'banana'
  | 'flamingo'
  | 'graphite'
  | 'tangerine'
  | 'peacock'
  | 'sage';

export type RecurrenceType =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'one-time'
  | 'interval';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type Criticality = 'safety-critical' | 'high' | 'normal';
export type CapacityLevel = 'all' | 'low-capacity-only' | 'full-capacity-only';
export type TimeSensitivity = 'fixed' | 'flexible';

export interface CalendarEvent {
  id: string;
  time?: string; // "7:30am", "9:00pm", etc.
  title: string;
  emoji?: string;
  category: CalendarCategory;
  isNonNegotiable?: boolean;
  doubleAlarm?: boolean;
  note?: string;
  recurrence: RecurrenceType;
  days?: DayOfWeek[];
  intervalDays?: number; // for interval recurrence
  startDate?: string; // ISO date for biweekly/interval start
  monthlyRule?: MonthlyRule;
  date?: string; // for one-time events
  isUrgent?: boolean;
  isOptional?: boolean;
  // Capacity-aware metadata
  criticality?: Criticality;
  capacityLevel?: CapacityLevel;
  hardDayMinimum?: boolean;
  timeSensitivity?: TimeSensitivity;
}

export interface MonthlyRule {
  type: 'day-of-month' | 'first-weekday' | 'last-day' | 'nth-weekday';
  day?: number; // e.g., 2, 15
  weekday?: DayOfWeek; // e.g., 'sunday'
  nth?: number; // 1 = first, -1 = last
  time?: string;
}

// ─── Budget ────────────────────────────────────────────────────────────────
// Consumed by the archived budget subsystem under _archive/. Live code
// doesn't reference these today; they stay so the dormant hook compiles
// cleanly when it's restored in a future phase.

export type BudgetCategory =
  | 'income'
  | 'housing'
  | 'food'
  | 'pets'
  | 'health'
  | 'subscriptions'
  | 'transport'
  | 'misc';

export interface BudgetLine {
  id: string;
  label: string;
  category: BudgetCategory;
  /** Always positive. Direction inferred from category === 'income'. */
  amount: number;
  isFixed: boolean;        // false = variable; drives §02 vs §03 placement
  isSubscription: boolean; // true = also appears in §04 subscription audit
  note?: string;
}

export interface MonthOverride {
  id: string;    // matches BudgetLine.id
  month: string; // "2026-04", "2026-05", etc.
  amount: number;
}

export interface BudgetGoal {
  id: string;
  label: string;
  targetAmount?: number;
  note?: string;
}

export interface BudgetState {
  lines: BudgetLine[];
  overrides: MonthOverride[];
  goals: BudgetGoal[];
}

// ── Folder System ─────────────────────────────────────────────────
// Consumed by the archived folder subsystem under _archive/. Phase 2
// Step 2's notes re-skin is expected to lift those files back out of
// the archive and rebuild them in-place; these types are waiting.

export type NotecardFormat = 'fragment' | 'question' | 'reference' | 'map' | 'research';

export type FolderId = 'portfolio' | 'field-guide' | 'curriculum' | 'capture' | 'archive';

export interface FolderNote {
  id: string;
  folderId: FolderId;
  format: NotecardFormat;
  content: string;
  title?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  isFlagged?: boolean;
}
