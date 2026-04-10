'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CalendarCategory } from '@/content/types';

interface AddEventDraft {
  title: string;
  date: string;
  time?: string;
  category: CalendarCategory;
  note?: string;
}

interface AddEventSheetProps {
  open: boolean;
  onClose: () => void;
  onAdd: (draft: AddEventDraft) => void;
}

const CATEGORIES: { value: CalendarCategory; label: string; color: string }[] = [
  { value: 'tomato', label: 'cat care', color: 'var(--color-tomato)' },
  { value: 'tangerine', label: 'deadline', color: 'var(--color-tangerine)' },
  { value: 'banana', label: 'food', color: 'var(--color-banana)' },
  { value: 'basil', label: 'outside', color: 'var(--color-basil)' },
  { value: 'sage', label: 'learning', color: 'var(--color-sage)' },
  { value: 'flamingo', label: 'self-care', color: 'var(--color-flamingo)' },
  { value: 'blueberry', label: 'deep work', color: 'var(--color-blueberry)' },
  { value: 'grape', label: 'system', color: 'var(--color-grape)' },
  { value: 'peacock', label: 'spirituality', color: 'var(--color-peacock)' },
  { value: 'graphite', label: 'cleaning', color: 'var(--color-graphite)' },
];

/** Returns today's date as "YYYY-MM-DD" in the user's local timezone. */
function getLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AddEventSheet({ open, onClose, onAdd }: AddEventSheetProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getLocalDateString);
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<CalendarCategory>('tangerine');
  const [note, setNote] = useState('');

  // Reset form when sheet opens
  useEffect(() => {
    if (open) {
      setTitle('');
      setDate(getLocalDateString());
      setTime('');
      setCategory('tangerine');
      setNote('');
    }
  }, [open]);

  function handleSubmit() {
    if (!title.trim() || !date) return;

    // Convert HTML time input (HH:MM 24h) to display format (e.g. "2:30pm")
    let displayTime: string | undefined;
    if (time) {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'pm' : 'am';
      const hour = h % 12 || 12;
      displayTime = `${hour}:${String(m).padStart(2, '0')}${period}`;
    }

    onAdd({
      title: title.trim(),
      date,
      time: displayTime,
      category,
      note: note.trim() || undefined,
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 111,
              backgroundColor: 'var(--color-paper)',
              borderTop: '1px solid var(--color-ink-ghost)',
              borderRadius: '4px 4px 0 0',
              maxHeight: '85vh',
              overflowY: 'auto',
              paddingBottom: 'env(safe-area-inset-bottom, 16px)',
            }}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '9999px', backgroundColor: 'var(--color-ink-ghost)' }} />
            </div>

            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontFamily: 'Courier New, monospace', fontSize: '13px', fontWeight: 600 }}>
                  add event
                </h2>
                <button
                  onClick={onClose}
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '11px',
                    color: 'var(--color-ink-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ✕ cancel
                </button>
              </div>

              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="event-title"
                  style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  title *
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What is this event?"
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--color-ink-ghost)',
                    borderRadius: '2px',
                    padding: '8px 10px',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--color-ink)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Date + Time row */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="event-date"
                    style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    date *
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid var(--color-ink-ghost)',
                      borderRadius: '2px',
                      padding: '8px 10px',
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '13px',
                      color: 'var(--color-ink)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="event-time"
                    style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    time
                  </label>
                  <input
                    id="event-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid var(--color-ink-ghost)',
                      borderRadius: '2px',
                      padding: '8px 10px',
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '13px',
                      color: 'var(--color-ink)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  category
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '10px',
                          padding: '4px 8px',
                          border: `1px solid ${cat.color}`,
                          borderRadius: '2px',
                          cursor: 'pointer',
                          color: isSelected ? '#fff' : cat.color,
                          backgroundColor: isSelected ? cat.color : 'transparent',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="event-note"
                  style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  note
                </label>
                <textarea
                  id="event-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional details…"
                  rows={2}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--color-ink-ghost)',
                    borderRadius: '2px',
                    padding: '8px 10px',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'var(--color-ink)',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!title.trim() || !date}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '12px',
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-paper)',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  opacity: !title.trim() || !date ? 0.3 : 1,
                  transition: 'opacity 0.15s ease',
                }}
              >
                add event
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
