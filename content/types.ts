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
}

export interface MonthlyRule {
  type: 'day-of-month' | 'first-weekday' | 'last-day' | 'nth-weekday';
  day?: number; // e.g., 2, 15
  weekday?: DayOfWeek; // e.g., 'sunday'
  nth?: number; // 1 = first, -1 = last
  time?: string;
}

export interface Priority {
  rank: number;
  title: string;
  status: string;
  nextAction: string;
  isLocked?: boolean;
  isUrgent?: boolean;
  isOngoing?: boolean;
}

export interface Project {
  title: string;
  status: 'active' | 'locked' | 'in-progress' | 'ongoing' | 'hold';
  description?: string;
  nextAction?: string;
}

export interface WorkLocation {
  name: string;
  address: string;
  hours?: string;
  rating?: string;
  note?: string;
}

export interface Pet {
  name: string;
  gender?: string;
  medications?: string[];
  notes?: string[];
  urgentItems?: string[];
}

export interface VetInfo {
  name: string;
  phone: string;
  address: string;
}

export interface FinanceItem {
  title: string;
  amount?: string;
  note: string;
  isUrgent?: boolean;
  action?: string;
}

export interface MonthlyBudgetStep {
  order: number;
  title: string;
  description: string;
}
