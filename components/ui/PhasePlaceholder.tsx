'use client';

import PageShell from '@/components/layout/PageShell';

/**
 * PhasePlaceholder — the shared "sprouting in Phase N" card.
 *
 * Used by the five unbuilt Phase 1 surfaces (/garden, /calendar, /notes,
 * /budget, /field-report). One styled card. One line of copy. No
 * functionality, no placeholder data, no faked UI. The whole point is
 * that the nav is honest about what exists now and what doesn't.
 */
interface PhasePlaceholderProps {
  /** The surface title, lowercase, matching the nav label. */
  readonly title: string;
  /** Which phase the surface is sprouting in. */
  readonly phase: 2 | 3 | 4;
}

export default function PhasePlaceholder({ title, phase }: PhasePlaceholderProps) {
  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">{title}</h1>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <div
        style={{
          marginTop: '12px',
          padding: '28px 20px',
          border: '1px solid var(--border-2)',
          borderRadius: '2px',
          backgroundColor: 'var(--color-paper)',
          textAlign: 'center',
        }}
      >
        <div
          className="text-display"
          style={{
            fontSize: '22px',
            lineHeight: 1.3,
            color: 'var(--ink-2)',
          }}
        >
          sprouting in Phase {phase}
        </div>
      </div>
    </PageShell>
  );
}
