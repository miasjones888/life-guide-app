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

export interface FlashCard {
  id: string;
  content: string;
  category: CalendarCategory;
  createdAt: string; // ISO date string
  note?: string;
  updatedAt?: string; // ISO date string
  isFlagged?: boolean;
}

// ─── Budget ────────────────────────────────────────────────────────────────

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

// ── Cultural Discovery ──────────────────────────────────────────

export type MediaType = 'book' | 'essay' | 'film' | 'music' | 'exhibition';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  creator?: string;         // author, director, artist, etc.
  year?: string;
  status: 'want' | 'in-progress' | 'done';
  rating?: 1 | 2 | 3 | 4 | 5;
  note?: string;
  addedAt: string;          // ISO date
  completedAt?: string;     // ISO date
  tags?: string[];
}

export interface ArtworkEntry {
  id: string;
  title: string;
  artist?: string;
  imageUrl?: string;        // optional — for future API-sourced artworks
  feeling?: string;         // response to "How does this make you feel?"
  reflection?: string;      // longer reflection
  encounteredAt: string;    // ISO date
  source?: string;          // 'met' | 'rijksmuseum' | 'manual' | etc.
}

export type InspirationItemType = 'artist' | 'essay' | 'idea' | 'event';

export interface CreativeInspirationItem {
  id: string;
  type: InspirationItemType;
  title: string;
  body?: string;
  url?: string;
  savedAt: string;          // ISO date
  tags?: string[];
}

// ── Personal Growth (life exploration, not self-improvement) ────

export type PhilosophyTheme = 'meaning' | 'ethics' | 'creativity' | 'nature' | 'identity';

export interface PhilosophyPrompt {
  id: string;
  theme: PhilosophyTheme;
  prompt: string;
  source?: string;          // thinker, text, or tradition it draws from
}

export interface JournalEntry {
  id: string;
  prompt?: string;          // optional — free-form entries won't have one
  body: string;
  createdAt: string;        // ISO date
  tags?: string[];
}

export interface ReflectionSummary {
  id: string;
  period: 'week' | 'month';
  startDate: string;        // ISO date
  endDate: string;          // ISO date
  themes: string[];         // recurring themes found across entries
  body: string;             // narrative summary (AI-generated or manual)
  generatedAt: string;      // ISO date
}

export type CommunityEventType = 'salon' | 'meetup' | 'volunteer' | 'exhibition' | 'class' | 'other';

export interface CommunityEvent {
  id: string;
  type: CommunityEventType;
  title: string;
  date?: string;            // ISO date
  location?: string;
  url?: string;
  note?: string;
  saved: boolean;
}

// ── Wishlist (TikTok-sourced + manual) ───────────────────────────

export type WishlistCategory = 'want' | 'experience' | 'movie' | 'show' | 'book' | 'other';

export interface WishlistItem {
  id: string;
  title: string;
  url?: string;
  thumbnail?: string;
  author?: string;         // TikTok creator handle or manual source
  category: WishlistCategory;
  addedAt: string;         // ISO date
  done: boolean;
  note?: string;
  source: 'tiktok' | 'manual';
}

// ── Integrations ─────────────────────────────────────────────────

export type IntegrationService =
  | 'spotify'           // music playback + discovery
  | 'notion'            // notes / knowledge base sync
  | 'google-calendar'   // calendar read/write
  | 'apple-calendar'    // calendar read (iOS)
  | 'email'             // draft + send via assistant
  | 'custom-web-app'    // Mia's own web apps (Notion R&D, etc.)
  | 'financial'         // budgeting tools / bank read
  | 'goodreads'         // reading tracker
  | 'letterboxd'        // film tracker
  | 'last-fm'           // music discovery / scrobbling
  | 'musicbrainz';      // open music metadata

export type IntegrationStatus = 'planned' | 'connected' | 'disabled';

export interface IntegrationConfig {
  service: IntegrationService;
  label: string;
  status: IntegrationStatus;
  description: string;      // what this integration enables
}

// ── Folder System ─────────────────────────────────────────────────

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
