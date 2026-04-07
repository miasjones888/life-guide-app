// All localStorage keys used across the app.
// Add new keys here before using them in hooks or components.

export const STORAGE_KEYS = {
  // Existing
  DECK: 'life-guide-deck',
  REFLECTION: 'reflection-text',
  ANCHOR_TASK: 'anchor-task',

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
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
