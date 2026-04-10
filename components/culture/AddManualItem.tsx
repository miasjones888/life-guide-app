'use client';

import React, { useState } from 'react';
import type { WishlistItem, WishlistCategory } from '@/content/types';

interface AddManualItemProps {
  onAdd: (item: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>) => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS: { value: WishlistCategory; label: string; hint: string }[] = [
  { value: 'movie', label: 'movie', hint: 'film, documentary' },
  { value: 'show', label: 'show', hint: 'TV, series, anime' },
  { value: 'book', label: 'book', hint: 'novel, memoir, comic' },
  { value: 'experience', label: 'experience', hint: 'place, activity, event' },
  { value: 'want', label: 'want', hint: 'product, item to buy' },
  { value: 'other', label: 'other', hint: 'anything else' },
];

export default function AddManualItem({ onAdd, onClose }: AddManualItemProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<WishlistCategory>('movie');
  const [note, setNote] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-paper)',
    border: '1px solid var(--color-ink-ghost)',
    borderRadius: '2px',
    padding: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      url: url.trim() || undefined,
      category,
      note: note.trim() || undefined,
      source: 'manual',
    });
    onClose();
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'var(--color-paper)',
        borderRadius: '4px 4px 0 0',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-ink-ghost)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: 'var(--color-ink)' }}>
            add item
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              color: 'var(--color-ink-muted)',
              minWidth: '44px',
              minHeight: '44px',
            }}
            aria-label="close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)' }}>
              title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Severance, Dune, Parable of the Sower..."
              required
              autoFocus
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)' }}>
              category *
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {CATEGORY_OPTIONS.map(({ value, label, hint }) => {
                const isSelected = category === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    title={hint}
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '11px',
                      padding: '5px 10px',
                      border: '1px solid',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--color-ink)' : 'var(--color-ink-ghost)',
                      backgroundColor: isSelected ? 'var(--color-ink)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--color-ink-muted)',
                      minHeight: '32px',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--color-ink-muted)' }}>
              {CATEGORY_OPTIONS.find((o) => o.value === category)?.hint}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)' }}>
              link (optional)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)' }}>
              note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any context or reminder..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                minHeight: '44px',
                fontFamily: 'Courier New, monospace',
                fontSize: '13px',
                border: '1px solid var(--color-ink-ghost)',
                borderRadius: '2px',
                cursor: 'pointer',
                background: 'transparent',
                color: 'var(--color-ink)',
              }}
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              style={{
                flex: 2,
                minHeight: '44px',
                fontFamily: 'Courier New, monospace',
                fontSize: '13px',
                border: 'none',
                borderRadius: '2px',
                cursor: !title.trim() ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--color-chrome-dark)',
                color: '#fff',
                opacity: !title.trim() ? 0.4 : 1,
              }}
            >
              add to list
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
