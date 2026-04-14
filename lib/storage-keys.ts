// All localStorage keys used across the app.
// Add new keys here before using them in hooks or components.

export const STORAGE_KEYS = {
  // Core data stores
  DECK: 'life-guide-deck',
  REFLECTION: 'reflection-text',
  ANCHOR: 'anchor',
  BUDGET: 'life-guide-budget',
  FOLDERS: 'life-guide-folders',

  // UI state
  HARD_DAY_MODE: 'hard-day-mode',
  ASSISTANT_HISTORY: 'assistant-history',
  ASSISTANT_PROVIDER: 'assistant-provider',

  // Local calendar events (Phase 2 - user-added events)
  LOCAL_EVENTS: 'local-calendar-events',

  // Wishlist
  WISHLIST: 'life-guide-wishlist',           // WishlistItem[]

  // Cultural Discovery (future)
  MEDIA_LOG: 'culture-media-log',         // MediaItem[]
  ART_HISTORY: 'culture-art-history',     // ArtworkEntry[]
  CREATIVE_FEED: 'culture-creative-feed', // CreativeInspirationItem[]

  // Personal Growth (future)
  JOURNAL_ENTRIES: 'growth-journal',      // JournalEntry[]
  REFLECTION_SUMMARIES: 'growth-summaries', // ReflectionSummary[]
  COMMUNITY_SAVED: 'growth-community',    // CommunityEvent[]

  // Calendar write-path
  USER_EVENTS: 'life-guide-user-events',  // UserEvent[]
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
