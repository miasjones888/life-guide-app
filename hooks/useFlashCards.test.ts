import { describe, it, expect, beforeEach, vi } from 'vitest';

// Inline localStorage mock
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
};

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Minimal re-implementation of the storage logic to test in isolation
const STORAGE_KEY = 'life-guide-deck';
const STORAGE_VERSION = 2;

type FlashCard = {
  id: string;
  content: string;
  category: string;
  createdAt: string;
  note?: string;
  updatedAt?: string;
  isFlagged: boolean;
};

function makeCard(overrides: Partial<FlashCard> = {}): FlashCard {
  return {
    id: `test-${Math.random().toString(36).slice(2)}`,
    content: 'Test card content',
    category: 'blueberry',
    createdAt: new Date().toISOString(),
    isFlagged: false,
    ...overrides,
  };
}

function writeCards(cards: FlashCard[]) {
  localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, cards }));
}

function readCards(): FlashCard[] {
  const raw = localStorageMock.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as { cards: FlashCard[] };
  return parsed.cards;
}

beforeEach(() => {
  localStorageMock.clear();
});

describe('deck localStorage — basic CRUD', () => {
  it('starts with an empty deck', () => {
    expect(readCards()).toEqual([]);
  });

  it('writes and reads a card', () => {
    const card = makeCard({ id: 'card-1', content: 'Hello world' });
    writeCards([card]);
    const cards = readCards();
    expect(cards).toHaveLength(1);
    expect(cards[0].content).toBe('Hello world');
  });

  it('adds a second card without losing the first', () => {
    const card1 = makeCard({ id: 'card-1' });
    const card2 = makeCard({ id: 'card-2' });
    writeCards([card1]);
    const existing = readCards();
    writeCards([card2, ...existing]);
    expect(readCards()).toHaveLength(2);
  });

  it('deletes a card by id', () => {
    const card1 = makeCard({ id: 'card-1' });
    const card2 = makeCard({ id: 'card-2' });
    writeCards([card1, card2]);
    const filtered = readCards().filter((c) => c.id !== 'card-1');
    writeCards(filtered);
    const result = readCards();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('card-2');
  });

  it('updates card content', () => {
    const card = makeCard({ id: 'card-1', content: 'Original' });
    writeCards([card]);
    const updated = readCards().map((c) =>
      c.id === 'card-1' ? { ...c, content: 'Updated', updatedAt: new Date().toISOString() } : c
    );
    writeCards(updated);
    expect(readCards()[0].content).toBe('Updated');
    expect(readCards()[0].updatedAt).toBeDefined();
  });

  it('toggles isFlagged', () => {
    const card = makeCard({ id: 'card-1', isFlagged: false });
    writeCards([card]);
    const toggled = readCards().map((c) =>
      c.id === 'card-1' ? { ...c, isFlagged: true } : c
    );
    writeCards(toggled);
    expect(readCards()[0].isFlagged).toBe(true);
  });

  it('restores a card by prepending it (skip if already exists)', () => {
    const card = makeCard({ id: 'card-1' });
    writeCards([card]);
    // Attempt to restore the same card — should not duplicate
    const current = readCards();
    const alreadyExists = current.some((c) => c.id === card.id);
    if (!alreadyExists) writeCards([card, ...current]);
    expect(readCards()).toHaveLength(1);
  });
});

describe('deck localStorage — corruption fallback', () => {
  it('returns empty array when stored value is not valid JSON', () => {
    localStorageMock.setItem(STORAGE_KEY, 'not-json{{{{');
    let result: FlashCard[] = [];
    try {
      const raw = localStorageMock.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw!) as unknown;
      if (parsed && typeof parsed === 'object' && 'cards' in parsed && Array.isArray((parsed as { cards: unknown[] }).cards)) {
        result = (parsed as { cards: FlashCard[] }).cards;
      }
    } catch {
      result = [];
    }
    expect(result).toEqual([]);
  });

  it('returns empty array when stored value is an unexpected shape', () => {
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
    const raw = localStorageMock.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw!) as unknown;
    let result: FlashCard[] = [];
    if (parsed && typeof parsed === 'object' && 'cards' in parsed && Array.isArray((parsed as { cards: unknown[] }).cards)) {
      result = (parsed as { cards: FlashCard[] }).cards;
    }
    expect(result).toEqual([]);
  });

  it('handles V1 array format (legacy migration)', () => {
    // V1 stored a plain array, not { version, cards }
    const card = makeCard({ id: 'legacy-card' });
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify([card]));
    const raw = localStorageMock.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw!) as unknown;
    let result: FlashCard[] = [];
    if (Array.isArray(parsed)) {
      result = parsed as FlashCard[];
    } else if (parsed && typeof parsed === 'object' && 'cards' in parsed && Array.isArray((parsed as { cards: FlashCard[] }).cards)) {
      result = (parsed as { cards: FlashCard[] }).cards;
    }
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('legacy-card');
  });
});

describe('import — merge without duplicates', () => {
  it('skips cards that already exist by id', () => {
    const existing = makeCard({ id: 'card-1' });
    writeCards([existing]);
    const incoming = [existing, makeCard({ id: 'card-2' })];
    const current = readCards();
    const existingIds = new Set(current.map((c) => c.id));
    const newCards = incoming.filter((c) => !existingIds.has(c.id));
    writeCards([...newCards, ...current]);
    expect(readCards()).toHaveLength(2);
    expect(readCards().filter((c) => c.id === 'card-1')).toHaveLength(1);
  });
});
