'use client';

import React from 'react';
import type { WishlistItem, WishlistCategory } from '@/content/types';

const CATEGORY_LABELS: Record<WishlistCategory, string> = {
  want: 'want',
  experience: 'experience',
  movie: 'movie',
  show: 'show',
  book: 'book',
  other: 'other',
};

const CATEGORY_COLORS: Record<WishlistCategory, string> = {
  want: '#E67C73',     // flamingo — purchases
  experience: '#33B679', // sage — experiences
  movie: '#3F51B5',    // blueberry — movies
  show: '#8E24AA',     // grape — shows
  book: '#F4511E',     // tangerine — books
  other: '#616161',    // graphite — misc
};

interface WishlistCardProps {
  item: WishlistItem;
  onDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onCategoryChange: (id: string, category: WishlistCategory) => void;
}

const allCategories: WishlistCategory[] = ['want', 'experience', 'movie', 'show', 'book', 'other'];

export default function WishlistCard({ item, onDone, onDelete, onCategoryChange }: WishlistCardProps) {
  const color = CATEGORY_COLORS[item.category];

  return (
    <div
      style={{
        border: '1px solid var(--color-ink-ghost)',
        borderRadius: '2px',
        overflow: 'hidden',
        backgroundColor: item.done ? 'var(--color-chrome)' : 'var(--color-paper)',
        opacity: item.done ? 0.6 : 1,
      }}
    >
      {/* Thumbnail strip */}
      {item.thumbnail && !item.done && (
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: 'var(--color-chrome)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.thumbnail}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div style={{ padding: '10px' }}>
        {/* Category + done toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
          <span style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            color,
            letterSpacing: '0.05em',
          }}>
            {CATEGORY_LABELS[item.category]}
          </span>
          <button
            type="button"
            onClick={() => onDone(item.id, !item.done)}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              border: '1px solid',
              borderRadius: '2px',
              padding: '2px 8px',
              cursor: 'pointer',
              background: item.done ? 'var(--color-ink)' : 'transparent',
              borderColor: item.done ? 'var(--color-ink)' : 'var(--color-ink-ghost)',
              color: item.done ? '#fff' : 'var(--color-ink-muted)',
              minHeight: '28px',
            }}
            aria-label={item.done ? 'mark as not done' : 'mark as done'}
          >
            {item.done ? 'done ✓' : 'mark done'}
          </button>
        </div>

        {/* Title */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          lineHeight: 1.4,
          color: 'var(--color-ink)',
          margin: '0 0 4px',
          textDecoration: item.done ? 'line-through' : 'none',
        }}>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--color-ink-ghost)' }}
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </p>

        {/* Author/source */}
        {item.author && (
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            color: 'var(--color-ink-muted)',
            margin: '0 0 4px',
          }}>
            {item.source === 'tiktok' ? `@${item.author.replace(/^@/, '')}` : item.author}
          </p>
        )}

        {/* Note */}
        {item.note && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--color-ink-muted)',
            margin: '4px 0 0',
            borderLeft: `2px solid ${color}`,
            paddingLeft: '6px',
          }}>
            {item.note}
          </p>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          <select
            value={item.category}
            onChange={(e) => onCategoryChange(item.id, e.target.value as WishlistCategory)}
            style={{
              flex: 1,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: 'var(--color-ink-muted)',
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              padding: '4px 6px',
              height: '28px',
              cursor: 'pointer',
            }}
            aria-label="change category"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              padding: '4px 8px',
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--color-ink-muted)',
              height: '28px',
            }}
            aria-label="remove item"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
}
