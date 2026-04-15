'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useJournal } from '@/hooks/useJournal';

/**
 * JournalDrawer — the full-screen journal surface.
 *
 * Opens over the current page. Dotted-paper CSS background (radial
 * gradient, no image asset). Body is an IM Fell English italic
 * textarea. Pages fill and a new one starts — no soft scroll inside a
 * page. Closes on Escape and on the visible close button. Focus is
 * never trapped: Tab flows out of the drawer normally.
 *
 * Covenant vocabulary audited: surface copy uses none of the §10
 * words. No elapsed-time indicators. No "last visited" language. The
 * drawer is a room the user walks back into — same as they left it.
 */

interface JournalDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Approximate character budget per page. The textarea is visually
 * overflow-hidden and resize-none, so this is a pragmatic soft cap
 * rather than a DOM-measured one: when a page crosses it, we split
 * at the nearest word boundary and overflow into the next page.
 * Tuned for roughly a mobile-height IM Fell English italic column.
 */
const CHARS_PER_PAGE = 1200;

function splitAtWordBoundary(value: string, limit: number): { kept: string; overflow: string } {
  if (value.length <= limit) return { kept: value, overflow: '' };
  const lastSpace = value.lastIndexOf(' ', limit);
  const splitAt = lastSpace > 0 ? lastSpace + 1 : limit;
  return {
    kept: value.slice(0, splitAt).replace(/\s+$/, ''),
    overflow: value.slice(splitAt),
  };
}

export default function JournalDrawer({ open, onClose }: JournalDrawerProps) {
  const { state, setPageText, addPage, goToPage } = useJournal();
  const { pages, currentPageIndex } = state;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close on Escape. Registered only while open so the shortcut never
  // fires when the drawer is shut.
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Focus the textarea when the drawer opens, so typing just works.
  // No focus trap — Tab still flows out of the drawer normally.
  useEffect(() => {
    if (!open) return;
    const ta = textareaRef.current;
    if (ta) {
      ta.focus();
      // Place caret at end of current page content.
      const end = ta.value.length;
      ta.setSelectionRange(end, end);
    }
  }, [open, currentPageIndex]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= CHARS_PER_PAGE) {
        setPageText(currentPageIndex, value);
        return;
      }
      // Overflow — peel the tail off at a word boundary and push to
      // the next page. If no next page exists yet, a new one starts.
      const { kept, overflow } = splitAtWordBoundary(value, CHARS_PER_PAGE);
      setPageText(currentPageIndex, kept);
      const nextIndex = currentPageIndex + 1;
      if (nextIndex < pages.length) {
        setPageText(nextIndex, overflow + pages[nextIndex]);
        goToPage(nextIndex);
      } else {
        addPage(overflow);
      }
    },
    [addPage, currentPageIndex, goToPage, pages, setPageText]
  );

  if (!open) return null;

  const currentPage = pages[currentPageIndex] ?? '';
  const hasPrev = currentPageIndex > 0;
  const hasNext = currentPageIndex < pages.length - 1;

  return (
    <div
      role="dialog"
      aria-label="Journal"
      aria-modal="false"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'var(--color-paper)',
        // Dotted paper — radial-gradient, no image asset.
        backgroundImage:
          'radial-gradient(circle, rgba(26,25,23,0.14) 1px, transparent 1.4px)',
        backgroundSize: '18px 18px',
        backgroundPosition: '0 0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header — close button left, page indicator + nav right. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-3)',
          backgroundColor: 'var(--color-paper)',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close journal"
          style={{
            background: 'none',
            border: '1px solid var(--border-2)',
            borderRadius: '2px',
            padding: '6px 12px',
            fontFamily: 'var(--font-chrome)',
            fontSize: '11px',
            letterSpacing: '0.02em',
            color: 'var(--ink-2)',
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          close
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => goToPage(currentPageIndex - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-chrome)',
              fontSize: '16px',
              color: hasPrev ? 'var(--ink-2)' : 'var(--ink-4)',
              cursor: hasPrev ? 'pointer' : 'default',
              minHeight: '44px',
              minWidth: '44px',
              opacity: hasPrev ? 1 : 0.4,
            }}
          >
            ←
          </button>
          <span
            className="text-micro text-ink-muted"
            style={{ minWidth: '48px', textAlign: 'center', letterSpacing: '0.05em' }}
          >
            {currentPageIndex + 1} / {pages.length}
          </span>
          <button
            type="button"
            onClick={() => {
              if (hasNext) {
                goToPage(currentPageIndex + 1);
              } else {
                addPage('');
              }
            }}
            aria-label="Next page"
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-chrome)',
              fontSize: '16px',
              color: 'var(--ink-2)',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: '44px',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Page body — textarea fills. No soft scroll, no resize. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          padding: '20px 18px 24px',
        }}
      >
        <textarea
          ref={textareaRef}
          value={currentPage}
          onChange={handleChange}
          spellCheck={false}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'var(--font-journal)',
            fontStyle: 'italic',
            fontSize: '20px',
            lineHeight: 1.55,
            color: 'var(--ink-1)',
            caretColor: 'var(--ink-1)',
          }}
        />
      </div>
    </div>
  );
}
