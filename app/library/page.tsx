'use client';

import { useMemo, useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import EntryForm from '@/components/library/EntryForm';
import EntryRow from '@/components/library/EntryRow';
import { useHardDay } from '@/context/HardDayContext';
import { useLibrary, type LibraryEntry } from '@/hooks/useLibrary';

/**
 * /library — books, films, series Mia is reading or watching.
 *
 * Reverse-chronological list grouped by month. The add affordance is a
 * simple inline button on the page body — no floating FAB; the journal
 * pen owns the bottom-right corner.
 *
 * Hard-day mode collapses the surface to a single line. The list and
 * the add button hide. The library is resting too — no count, no
 * elapsed-time language, nothing to act on.
 */

const MONTH_LABEL = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

interface MonthBucket {
  key: string; // YYYY-MM, used for stable sort
  label: string;
  entries: LibraryEntry[];
}

function groupByMonth(entries: LibraryEntry[]): MonthBucket[] {
  const buckets = new Map<string, MonthBucket>();
  // Already sorted by addEntry (newest first); keep insertion order
  // within each bucket so the per-month list reads newest-first too.
  const sorted = entries.slice().sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));
  for (const entry of sorted) {
    const date = new Date(entry.loggedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.entries.push(entry);
    } else {
      buckets.set(key, {
        key,
        label: MONTH_LABEL.format(date).toLowerCase(),
        entries: [entry],
      });
    }
  }
  return Array.from(buckets.values()).sort((a, b) => b.key.localeCompare(a.key));
}

export default function LibraryPage() {
  const { isHardDay } = useHardDay();
  const { entries, addEntry, updateEntry, removeEntry } = useLibrary();
  const [adding, setAdding] = useState(false);

  const buckets = useMemo(() => groupByMonth(entries), [entries]);

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">library</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Books, films, series. A title and a sentence is enough.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {isHardDay ? (
        <div
          className="text-body"
          style={{
            padding: '16px 12px',
            border: '1px solid var(--border-2)',
            borderRadius: '2px',
            backgroundColor: 'var(--color-paper)',
            fontStyle: 'italic',
            color: 'var(--ink-3)',
          }}
        >
          library, resting.
        </div>
      ) : (
        <>
          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              style={{
                width: '100%',
                border: '1px dashed var(--border-2)',
                borderRadius: '2px',
                background: 'transparent',
                color: 'var(--ink-3)',
                padding: '10px 12px',
                fontFamily: 'var(--font-chrome)',
                fontSize: '12px',
                cursor: 'pointer',
                minHeight: '44px',
                marginBottom: '12px',
              }}
            >
              + add a book, film, or series
            </button>
          )}

          {adding && (
            <EntryForm
              onSave={(input) => {
                addEntry(input);
                setAdding(false);
              }}
              onCancel={() => setAdding(false)}
            />
          )}

          {buckets.length === 0 && !adding && (
            <div
              className="text-body-sm text-ink-muted"
              style={{
                padding: '16px 12px',
                border: '1px solid var(--border-3)',
                borderRadius: '2px',
                backgroundColor: 'var(--color-paper)',
                fontStyle: 'italic',
              }}
            >
              nothing here yet.
            </div>
          )}

          {buckets.map((bucket) => (
            <section key={bucket.key} style={{ marginBottom: '20px' }}>
              <div
                className="text-micro text-ink-muted"
                style={{ marginBottom: '6px', letterSpacing: '0.05em' }}
              >
                {bucket.label}
              </div>
              {bucket.entries.map((entry) => (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  onUpdate={(input) => updateEntry(entry.id, input)}
                  onRemove={() => removeEntry(entry.id)}
                />
              ))}
            </section>
          ))}
        </>
      )}
    </PageShell>
  );
}
