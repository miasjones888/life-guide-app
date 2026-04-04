'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Tag from '@/components/ui/Tag';
import { useFlashCards } from '@/hooks/useFlashCards';
import type { CalendarCategory, FlashCard } from '@/content/types';

const categoryColorHex: Record<CalendarCategory, string> = {
  tomato: '#D50000',
  grape: '#8E24AA',
  blueberry: '#3F51B5',
  basil: '#0B8043',
  banana: '#F6BF26',
  flamingo: '#E67C73',
  graphite: '#616161',
  tangerine: '#F4511E',
  peacock: '#039BE5',
  sage: '#33B679',
};

const allCategories: CalendarCategory[] = [
  'tomato', 'grape', 'blueberry', 'basil', 'banana',
  'flamingo', 'graphite', 'tangerine', 'peacock', 'sage',
];

type SortMode = 'newest' | 'oldest' | 'category';
type ReviewMode = 'sequential' | 'random' | 'flagged';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DeckPage() {
  const { cards, addCard, deleteCard, updateCard, restoreCard } = useFlashCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CalendarCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [reviewMode, setReviewMode] = useState<ReviewMode>('sequential');

  // Add form state
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalendarCategory>('blueberry');

  // Edit form state
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editCategory, setEditCategory] = useState<CalendarCategory>('blueberry');

  // Undo state
  const [recentlyDeleted, setRecentlyDeleted] = useState<FlashCard | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    const byReviewMode =
      reviewMode === 'flagged'
        ? cards.filter((c) => c.isFlagged)
        : cards;

    const byCategory =
      activeFilter === 'all'
        ? byReviewMode
        : byReviewMode.filter((c) => c.category === activeFilter);

    const bySearch = query
      ? byCategory.filter((c) => {
          const inContent = c.content.toLowerCase().includes(query);
          const inNote = c.note?.toLowerCase().includes(query) ?? false;
          return inContent || inNote;
        })
      : byCategory;

    const sorted = [...bySearch].sort((a, b) => {
      if (sortMode === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortMode === 'category') {
        const byCategoryName = a.category.localeCompare(b.category);
        if (byCategoryName !== 0) return byCategoryName;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sorted;
  }, [activeFilter, cards, reviewMode, search, sortMode]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter, reviewMode, search, sortMode]);

  useEffect(() => {
    if (currentIndex > 0 && currentIndex >= filteredCards.length) {
      setCurrentIndex(filteredCards.length - 1);
    }
  }, [filteredCards.length, currentIndex]);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  const activeCategories = allCategories.filter((cat) =>
    cards.some((c) => c.category === cat)
  );

  const currentCard = filteredCards[currentIndex] ?? null;
  const total = filteredCards.length;

  const statusText =
    total === 0
      ? reviewMode === 'flagged'
        ? 'No flagged cards'
        : activeFilter === 'all'
          ? 'No cards found'
          : `No ${activeFilter} cards`
      : `Card ${currentIndex + 1} of ${total}`;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addCard({
      content: content.trim(),
      category: selectedCategory,
      note: note.trim() || undefined,
      isFlagged: false,
    });
    setContent('');
    setNote('');
    setSearch('');
    setCurrentIndex(0);
    if (activeFilter !== 'all' && activeFilter !== selectedCategory) {
      setActiveFilter('all');
    }
  }

  function startEdit(card: FlashCard) {
    setEditingCardId(card.id);
    setEditContent(card.content);
    setEditNote(card.note ?? '');
    setEditCategory(card.category);
  }

  function cancelEdit() {
    setEditingCardId(null);
    setEditContent('');
    setEditNote('');
    setEditCategory('blueberry');
  }

  function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCardId || !editContent.trim()) return;
    updateCard(editingCardId, {
      content: editContent.trim(),
      note: editNote.trim() || undefined,
      category: editCategory,
    });
    cancelEdit();
  }

  function handleDelete() {
    if (!currentCard) return;
    const shouldDelete = window.confirm('Remove this card? You can undo for 5 seconds.');
    if (!shouldDelete) return;

    deleteCard(currentCard.id);
    setRecentlyDeleted(currentCard);

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    undoTimerRef.current = setTimeout(() => {
      setRecentlyDeleted(null);
    }, 5000);
  }

  function undoDelete() {
    if (!recentlyDeleted) return;
    restoreCard(recentlyDeleted);
    setRecentlyDeleted(null);
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }
  }

  function shuffleCard() {
    if (filteredCards.length < 2) return;
    setCurrentIndex((prev) => {
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * filteredCards.length);
      }
      return next;
    });
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-paper)',
    border: '1px solid var(--color-ink-ghost)',
    borderRadius: '2px',
    padding: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Idea Deck</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Capture ideas quickly, then search, sort, and review them.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {recentlyDeleted && (
          <div style={{
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '2px',
            padding: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-chrome)',
          }}>
            <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: 'var(--color-ink-muted)' }}>
              Card removed.
            </span>
            <button
              type="button"
              onClick={undoDelete}
              style={{
                border: '1px solid var(--color-ink-ghost)',
                background: '#fff',
                padding: '6px 10px',
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
              }}
            >
              undo
            </button>
          </div>
        )}

        <WindowPanel title="new idea">
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the idea..."
              required
              rows={3}
              style={{
                ...inputStyle,
                fontSize: '15px',
                lineHeight: 1.5,
                resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: 'var(--color-ink-muted)',
              }}>
                category
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {allCategories.map((cat) => {
                  const color = categoryColorHex[cat];
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      title={cat}
                      aria-label={`select category ${cat}`}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: isSelected
                          ? '3px solid var(--color-ink)'
                          : `2px solid ${color}`,
                        backgroundColor: isSelected ? color : 'transparent',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                  );
                })}
              </div>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: categoryColorHex[selectedCategory],
              }}>
                {selectedCategory}
              </span>
            </div>

            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional context..."
              style={{
                ...inputStyle,
                fontSize: '13px',
                lineHeight: 1.4,
              }}
            />

            <button
              type="submit"
              style={{
                minHeight: '44px',
                backgroundColor: 'var(--color-chrome-dark)',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              add to deck
            </button>
          </form>
        </WindowPanel>

        <WindowPanel title="deck controls">
          <div style={{ display: 'grid', gap: '8px' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content or note..."
              style={{ ...inputStyle, fontSize: '13px' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                style={{ ...inputStyle, height: '36px', fontSize: '12px' }}
              >
                <option value="newest">sort: newest</option>
                <option value="oldest">sort: oldest</option>
                <option value="category">sort: category</option>
              </select>
              <select
                value={reviewMode}
                onChange={(e) => setReviewMode(e.target.value as ReviewMode)}
                style={{ ...inputStyle, height: '36px', fontSize: '12px' }}
              >
                <option value="sequential">review: sequential</option>
                <option value="random">review: random</option>
                <option value="flagged">review: flagged queue</option>
              </select>
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title="idea deck" active statusText={statusText}>
          {cards.length === 0 ? (
            <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
              No ideas yet. Use the form above to add your first card.
            </p>
          ) : currentCard ? (
            editingCardId === currentCard.id ? (
              <form onSubmit={saveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  required
                  style={{ ...inputStyle, fontSize: '14px', resize: 'vertical' }}
                />
                <input
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="Optional context..."
                  style={{ ...inputStyle, fontSize: '13px' }}
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as CalendarCategory)}
                  style={{ ...inputStyle, height: '36px', fontSize: '12px' }}
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" style={{ flex: 1, minHeight: '40px', border: 'none', borderRadius: '2px', background: 'var(--color-chrome-dark)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer' }}>save</button>
                  <button type="button" onClick={cancelEdit} style={{ flex: 1, minHeight: '40px', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', background: 'transparent', fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer' }}>cancel</button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <p style={{
                    color: 'var(--color-ink)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    lineHeight: 1.5,
                    margin: 0,
                    flex: 1,
                  }}>
                    {currentCard.content}
                  </p>
                  <Tag label={currentCard.category} category={currentCard.category} />
                </div>
                {currentCard.note && (
                  <p style={{
                    color: 'var(--color-ink-muted)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.4,
                    margin: 0,
                    borderLeft: `3px solid ${categoryColorHex[currentCard.category]}`,
                    paddingLeft: '8px',
                  }}>
                    {currentCard.note}
                  </p>
                )}
                <p style={{
                  color: 'var(--color-ink-muted)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  created {formatDate(currentCard.createdAt)}{currentCard.updatedAt ? ` · edited ${formatDate(currentCard.updatedAt)}` : ''}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => startEdit(currentCard)}
                    style={{
                      flex: 1,
                      minHeight: '40px',
                      border: '1px solid var(--color-ink-ghost)',
                      borderRadius: '2px',
                      background: 'transparent',
                      fontFamily: 'JetBrains Mono, monospace',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCard(currentCard.id, { isFlagged: !currentCard.isFlagged })}
                    style={{
                      flex: 1,
                      minHeight: '40px',
                      border: `1px solid ${currentCard.isFlagged ? '#b26a00' : 'var(--color-ink-ghost)'}`,
                      borderRadius: '2px',
                      background: currentCard.isFlagged ? '#fff5e6' : 'transparent',
                      fontFamily: 'JetBrains Mono, monospace',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    {currentCard.isFlagged ? 'unflag' : 'flag'}
                  </button>
                </div>
              </div>
            )
          ) : (
            <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
              No cards match the current filters.
            </p>
          )}
        </WindowPanel>

        {cards.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            padding: '2px 0',
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
          }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                flexShrink: 0,
                padding: '4px 10px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                lineHeight: 1.3,
                border: '1px solid',
                borderRadius: '2px',
                cursor: 'pointer',
                minHeight: '28px',
                backgroundColor: activeFilter === 'all' ? 'var(--color-ink)' : 'transparent',
                borderColor: activeFilter === 'all' ? 'var(--color-ink)' : 'var(--color-ink-ghost)',
                color: activeFilter === 'all' ? '#fff' : 'var(--color-ink-muted)',
              }}
            >
              all ({cards.length})
            </button>
            {activeCategories.map((cat) => {
              const count = cards.filter((c) => c.category === cat).length;
              const isActive = activeFilter === cat;
              const color = categoryColorHex[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    flexShrink: 0,
                    padding: '4px 10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    lineHeight: 1.3,
                    border: '1px solid',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    minHeight: '28px',
                    backgroundColor: isActive ? color : 'transparent',
                    borderColor: color,
                    color: isActive ? '#fff' : color,
                  }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {reviewMode === 'random' ? (
          <button
            onClick={shuffleCard}
            disabled={filteredCards.length < 2}
            style={{
              minHeight: '44px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
              backgroundColor: 'var(--color-chrome)',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              cursor: filteredCards.length < 2 ? 'default' : 'pointer',
              opacity: filteredCards.length < 2 ? 0.4 : 1,
            }}
          >
            shuffle card
          </button>
        ) : (
          filteredCards.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  backgroundColor: 'var(--color-chrome)',
                  border: '1px solid var(--color-ink-ghost)',
                  borderRadius: '2px',
                  cursor: currentIndex === 0 ? 'default' : 'pointer',
                  color: currentIndex === 0 ? 'var(--color-ink-muted)' : 'var(--color-ink)',
                  opacity: currentIndex === 0 ? 0.4 : 1,
                }}
              >
                ← prev
              </button>
              <button
                onClick={() => setCurrentIndex((i) => Math.min(filteredCards.length - 1, i + 1))}
                disabled={currentIndex === filteredCards.length - 1}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  backgroundColor: 'var(--color-chrome)',
                  border: '1px solid var(--color-ink-ghost)',
                  borderRadius: '2px',
                  cursor: currentIndex === filteredCards.length - 1 ? 'default' : 'pointer',
                  color: currentIndex === filteredCards.length - 1 ? 'var(--color-ink-muted)' : 'var(--color-ink)',
                  opacity: currentIndex === filteredCards.length - 1 ? 0.4 : 1,
                }}
              >
                next →
              </button>
            </div>
          )
        )}

        {currentCard && editingCardId !== currentCard.id && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleDelete}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: 'var(--color-ink-muted)',
                minHeight: '44px',
                minWidth: '44px',
                padding: '0',
              }}
            >
              remove this card
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
