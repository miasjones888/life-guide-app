'use client';

import { useState } from 'react';
import EntryForm from './EntryForm';
import type { AddEntryInput, LibraryEntry } from '@/hooks/useLibrary';

/**
 * EntryRow — one library entry row.
 *
 * Closed: kind label + title + sentence + chips.
 * Open: same content plus the link affordance and edit/remove actions.
 * Tap the row body to open. Edit replaces the row body with EntryForm.
 *
 * Mirrors the quiet, paper-feel styling of /today's date-only events
 * section. No elapsed-time language anywhere — loggedAt is for sort
 * only and never displayed to the surface.
 */

const KIND_LABELS: Record<LibraryEntry['kind'], string> = {
  book: 'book',
  film: 'film',
  series: 'series',
};

const IMPRESSION_LABELS: Record<NonNullable<LibraryEntry['impression']>, string> = {
  'stayed-with-me': 'stayed with me',
  liked: 'liked',
  fine: 'fine',
  'set-down': 'set down',
};

interface EntryRowProps {
  entry: LibraryEntry;
  onUpdate: (input: AddEntryInput) => void;
  onRemove: () => void;
}

export default function EntryRow({ entry, onUpdate, onRemove }: EntryRowProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div style={{ marginBottom: '8px' }}>
        <EntryForm
          initial={entry}
          onSave={(input) => {
            onUpdate(input);
            setEditing(false);
            setOpen(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  const linkLabel = entry.link
    ? entry.link.kind === 'journal'
      ? `journal page ${entry.link.ref}`
      : entry.link.kind === 'specimen'
        ? `specimen: ${entry.link.ref}`
        : entry.link.kind === 'note'
          ? `note: ${entry.link.ref}`
          : entry.link.ref
    : null;

  return (
    <div
      style={{
        border: '1px solid var(--border-2)',
        borderRadius: '2px',
        backgroundColor: 'var(--color-paper)',
        marginBottom: '8px',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '12px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          color: 'inherit',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            justifyContent: 'space-between',
          }}
        >
          <div className="text-display" style={{ lineHeight: 1.2, fontSize: '18px' }}>
            {entry.title}
          </div>
          <div
            className="text-micro text-ink-muted"
            style={{ letterSpacing: '0.05em', flexShrink: 0 }}
          >
            {KIND_LABELS[entry.kind]}
          </div>
        </div>

        {entry.sentence && (
          <div
            className="text-body-sm"
            style={{
              fontFamily: 'var(--font-journal)',
              fontStyle: 'italic',
              fontSize: '15px',
              lineHeight: 1.4,
              color: 'var(--ink-2)',
            }}
          >
            {entry.sentence}
          </div>
        )}

        {(entry.impression || entry.movedMe || entry.learnedFrom || linkLabel) && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
            {entry.impression && (
              <span style={readChipStyle}>{IMPRESSION_LABELS[entry.impression]}</span>
            )}
            {entry.movedMe && <span style={readChipStyle}>◉ moved me</span>}
            {entry.learnedFrom && <span style={readChipStyle}>◉ learned from</span>}
            {linkLabel && (
              <span style={{ ...readChipStyle, fontStyle: 'italic' }}>↳ {linkLabel}</span>
            )}
          </div>
        )}
      </button>

      {open && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '0 12px 12px',
            borderTop: '1px solid var(--border-3)',
            paddingTop: '10px',
          }}
        >
          <button
            type="button"
            onClick={() => setEditing(true)}
            style={actionButtonStyle}
          >
            edit
          </button>
          <button
            type="button"
            onClick={onRemove}
            style={{ ...actionButtonStyle, color: 'var(--color-tomato)' }}
            aria-label={`Remove ${entry.title}`}
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
}

const readChipStyle: React.CSSProperties = {
  border: '1px solid var(--border-3)',
  borderRadius: '2px',
  padding: '3px 7px',
  fontFamily: 'var(--font-chrome)',
  fontSize: '10px',
  color: 'var(--ink-3)',
  letterSpacing: '0.03em',
  whiteSpace: 'nowrap',
};

const actionButtonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--border-2)',
  borderRadius: '2px',
  padding: '6px 12px',
  fontFamily: 'var(--font-chrome)',
  fontSize: '11px',
  color: 'var(--ink-2)',
  cursor: 'pointer',
  minHeight: '36px',
};
