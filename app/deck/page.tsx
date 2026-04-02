'use client';

import { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Tag from '@/components/ui/Tag';
import { useFlashCards } from '@/hooks/useFlashCards';
import type { CalendarCategory } from '@/content/types';

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DeckPage() {
  const { cards, addCard, deleteCard } = useFlashCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CalendarCategory | 'all'>('all');

  // Add form state
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalendarCategory>('blueberry');

  const filteredCards =
    activeFilter === 'all'
      ? cards
      : cards.filter((c) => c.category === activeFilter);

  // Reset to first card whenever filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Clamp index after a card is deleted
  useEffect(() => {
    if (currentIndex > 0 && currentIndex >= filteredCards.length) {
      setCurrentIndex(filteredCards.length - 1);
    }
  }, [filteredCards.length, currentIndex]);

  // Categories that currently have at least one card (for filter chips)
  const activeCategories = allCategories.filter((cat) =>
    cards.some((c) => c.category === cat)
  );

  const currentCard = filteredCards[currentIndex] ?? null;
  const total = filteredCards.length;

  const statusText =
    total === 0
      ? activeFilter === 'all'
        ? 'No cards yet'
        : `No ${activeFilter} cards`
      : `Card ${currentIndex + 1} of ${total}${activeFilter !== 'all' ? ` · ${activeFilter}` : ''}`;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addCard({
      content: content.trim(),
      category: selectedCategory,
      note: note.trim() || undefined,
    });
    setContent('');
    setNote('');
    // Navigate to first card; if a category filter is active and doesn't match
    // the new card's category, clear the filter so the new card is visible
    setCurrentIndex(0);
    if (activeFilter !== 'all' && activeFilter !== selectedCategory) {
      setActiveFilter('all');
    }
  }

  function handleDelete() {
    if (!currentCard) return;
    deleteCard(currentCard.id);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* ── Add form ── */}
        <WindowPanel title="New Idea">
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

            {/* Category selector */}
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
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: isSelected
                          ? `3px solid var(--color-ink)`
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

        {/* ── Card viewer ── */}
        <WindowPanel title="Idea Deck" active statusText={statusText}>
          {cards.length === 0 ? (
            <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
              No ideas yet. Add your first below.
            </p>
          ) : currentCard ? (
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
                {formatDate(currentCard.createdAt)}
              </p>
            </div>
          ) : (
            <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
              No {activeFilter} cards. Switch filter or add a new card.
            </p>
          )}
        </WindowPanel>

        {/* ── Filter chips ── */}
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

        {/* ── Prev / Next navigation ── */}
        {filteredCards.length > 1 && (
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
        )}

        {/* ── Delete ── */}
        {currentCard && (
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
