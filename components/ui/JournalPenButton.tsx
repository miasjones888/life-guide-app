'use client';

/**
 * JournalPenButton — the fixed bottom-right pen affordance that opens
 * the journal drawer on every Phase 1 surface.
 *
 * Deliberately mobile-first: the visible button is the primary (and
 * only) entry point. No keyboard shortcut in Step 3. A keyboard
 * shortcut would either collide with typing in an input (anchor field,
 * future capture field) or make the journal desktop-only by design.
 *
 * 44×44px touch target, paper background, ink-3 border. Sits just
 * above BottomNav. Parent controls open state so the drawer can also
 * own close-on-Escape wiring.
 */

interface JournalPenButtonProps {
  onOpen: () => void;
}

export default function JournalPenButton({ onOpen }: JournalPenButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open journal"
      style={{
        position: 'fixed',
        bottom: '68px',
        right: '16px',
        width: '44px',
        height: '44px',
        borderRadius: '2px',
        border: '1px solid var(--ink-3)',
        backgroundColor: 'var(--color-paper)',
        color: 'var(--ink-1)',
        fontFamily: 'var(--font-journal)',
        fontSize: '22px',
        lineHeight: 1,
        fontStyle: 'italic',
        cursor: 'pointer',
        zIndex: 101,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        boxShadow: '0 2px 8px rgba(26,25,23,0.10)',
      }}
    >
      {/* Pen glyph — Unicode lower-right pencil. No image asset. */}
      <span aria-hidden="true" style={{ transform: 'translateY(-1px)' }}>
        ✎
      </span>
    </button>
  );
}
