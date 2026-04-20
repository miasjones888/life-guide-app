'use client';

import { useState } from 'react';
import type {
  AddEntryInput,
  Impression,
  LibraryEntry,
  LibraryLink,
  MediaKind,
} from '@/hooks/useLibrary';

/**
 * EntryForm — add or edit a library entry.
 *
 * Title is the only required field. Everything else (sentence,
 * impression, marks, link) is optional — saving with title alone is
 * fine. The form mirrors the Today anchor input's quiet, paper-feel
 * styling; no required-field gates, no validation banners.
 *
 * Used in two modes:
 *   - add: empty form, "save" creates a new entry
 *   - edit: pre-filled with an existing entry, "save" calls onUpdate
 */

const KIND_LABELS: Record<MediaKind, string> = {
  book: 'book',
  film: 'film',
  series: 'series',
};

const IMPRESSION_LABELS: Record<Impression, string> = {
  'stayed-with-me': 'stayed with me',
  liked: 'liked',
  fine: 'fine',
  'set-down': 'set down',
};

interface EntryFormProps {
  initial?: LibraryEntry;
  onSave: (input: AddEntryInput) => void;
  onCancel: () => void;
}

export default function EntryForm({ initial, onSave, onCancel }: EntryFormProps) {
  const [kind, setKind] = useState<MediaKind>(initial?.kind ?? 'book');
  const [title, setTitle] = useState<string>(initial?.title ?? '');
  const [sentence, setSentence] = useState<string>(initial?.sentence ?? '');
  const [impression, setImpression] = useState<Impression | ''>(initial?.impression ?? '');
  const [movedMe, setMovedMe] = useState<boolean>(initial?.movedMe ?? false);
  const [learnedFrom, setLearnedFrom] = useState<boolean>(initial?.learnedFrom ?? false);
  const [linkKind, setLinkKind] = useState<'none' | 'journal' | 'external'>(
    initial?.link?.kind === 'journal' || initial?.link?.kind === 'external'
      ? initial.link.kind
      : 'none',
  );
  const [linkRef, setLinkRef] = useState<string>(initial?.link?.ref ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return; // no save banner — just no-op
    let link: LibraryLink | undefined;
    if (linkKind !== 'none' && linkRef.trim()) {
      link = { kind: linkKind, ref: linkRef.trim() };
    }
    const input: AddEntryInput = {
      kind,
      title: trimmedTitle,
      movedMe,
      learnedFrom,
    };
    const trimmedSentence = sentence.trim();
    if (trimmedSentence) input.sentence = trimmedSentence;
    if (impression) input.impression = impression;
    if (link) input.link = link;
    onSave(input);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid var(--border-2)',
        borderRadius: '2px',
        backgroundColor: 'var(--color-paper)',
        padding: '12px',
        marginBottom: '12px',
      }}
    >
      {/* Kind */}
      <fieldset
        style={{ border: 'none', padding: 0, margin: '0 0 10px', display: 'flex', gap: '6px' }}
      >
        <legend
          className="text-micro text-ink-muted"
          style={{ marginBottom: '6px', letterSpacing: '0.05em', float: 'left', width: '100%' }}
        >
          kind
        </legend>
        {(Object.keys(KIND_LABELS) as MediaKind[]).map((k) => (
          <label
            key={k}
            style={{
              border: `1px solid ${kind === k ? 'var(--ink-3)' : 'var(--border-3)'}`,
              borderRadius: '2px',
              padding: '6px 10px',
              fontFamily: 'var(--font-chrome)',
              fontSize: '11px',
              color: kind === k ? 'var(--ink-1)' : 'var(--ink-3)',
              backgroundColor: kind === k ? 'var(--color-chrome)' : 'transparent',
              cursor: 'pointer',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <input
              type="radio"
              name="kind"
              value={k}
              checked={kind === k}
              onChange={() => setKind(k)}
              style={{ display: 'none' }}
            />
            {KIND_LABELS[k]}
          </label>
        ))}
      </fieldset>

      {/* Title */}
      <label htmlFor="lib-title" className="text-micro text-ink-muted" style={labelStyle}>
        title
      </label>
      <input
        id="lib-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="what did you read or watch"
        style={inputStyle}
        autoFocus
      />

      {/* Sentence */}
      <label htmlFor="lib-sentence" className="text-micro text-ink-muted" style={labelStyle}>
        a sentence
      </label>
      <textarea
        id="lib-sentence"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="one line, if you have it"
        rows={2}
        style={{
          ...inputStyle,
          fontFamily: 'var(--font-journal)',
          fontStyle: 'italic',
          fontSize: '16px',
          lineHeight: 1.4,
          resize: 'vertical',
          minHeight: '40px',
        }}
      />

      {/* Impression */}
      <div className="text-micro text-ink-muted" style={labelStyle}>
        how it landed
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {(Object.keys(IMPRESSION_LABELS) as Impression[]).map((imp) => {
          const active = impression === imp;
          return (
            <button
              key={imp}
              type="button"
              onClick={() => setImpression(active ? '' : imp)}
              aria-pressed={active}
              style={chipStyle(active)}
            >
              {IMPRESSION_LABELS[imp]}
            </button>
          );
        })}
      </div>

      {/* Marks */}
      <div className="text-micro text-ink-muted" style={labelStyle}>
        marks
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setMovedMe(!movedMe)}
          aria-pressed={movedMe}
          style={chipStyle(movedMe)}
        >
          {movedMe ? '◉' : '○'} moved me
        </button>
        <button
          type="button"
          onClick={() => setLearnedFrom(!learnedFrom)}
          aria-pressed={learnedFrom}
          style={chipStyle(learnedFrom)}
        >
          {learnedFrom ? '◉' : '○'} learned from
        </button>
      </div>

      {/* Link picker */}
      <div className="text-micro text-ink-muted" style={labelStyle}>
        notes live at
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
        {([
          ['none', 'nowhere'],
          ['journal', 'journal page'],
          ['external', 'elsewhere'],
        ] as const).map(([k, label]) => {
          const active = linkKind === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => {
                setLinkKind(k);
                if (k === 'none') setLinkRef('');
              }}
              aria-pressed={active}
              style={chipStyle(active)}
            >
              {label}
            </button>
          );
        })}
      </div>
      {linkKind !== 'none' && (
        <input
          type="text"
          value={linkRef}
          onChange={(e) => setLinkRef(e.target.value)}
          placeholder={
            linkKind === 'journal'
              ? 'page number (e.g. 3)'
              : 'where (e.g. blue notebook, p. 40)'
          }
          style={{ ...inputStyle, marginBottom: '12px' }}
        />
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
        <button type="submit" style={primaryButtonStyle} disabled={!title.trim()}>
          save
        </button>
        <button type="button" onClick={onCancel} style={secondaryButtonStyle}>
          cancel
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  marginTop: '4px',
  letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border-2)',
  padding: '8px 0',
  fontFamily: 'var(--font-display)',
  fontSize: '16px',
  lineHeight: 1.3,
  color: 'var(--ink-1)',
  outline: 'none',
  marginBottom: '12px',
  display: 'block',
};

function chipStyle(active: boolean): React.CSSProperties {
  return {
    border: `1px solid ${active ? 'var(--ink-3)' : 'var(--border-3)'}`,
    borderRadius: '2px',
    padding: '6px 10px',
    fontFamily: 'var(--font-chrome)',
    fontSize: '11px',
    color: active ? 'var(--ink-1)' : 'var(--ink-3)',
    backgroundColor: active ? 'var(--color-chrome)' : 'transparent',
    cursor: 'pointer',
    minHeight: '36px',
  };
}

const primaryButtonStyle: React.CSSProperties = {
  border: '1px solid var(--ink-3)',
  borderRadius: '2px',
  background: 'var(--color-chrome)',
  color: 'var(--ink-1)',
  padding: '8px 16px',
  fontFamily: 'var(--font-chrome)',
  fontSize: '12px',
  cursor: 'pointer',
  minHeight: '44px',
};

const secondaryButtonStyle: React.CSSProperties = {
  border: '1px solid var(--border-2)',
  borderRadius: '2px',
  background: 'transparent',
  color: 'var(--ink-3)',
  padding: '8px 16px',
  fontFamily: 'var(--font-chrome)',
  fontSize: '12px',
  cursor: 'pointer',
  minHeight: '44px',
};
