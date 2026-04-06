import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';

export default function CulturePage() {
  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Culture</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Art, media, and creative inspiration.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <WindowPanel title="Art Discovery" statusText="coming soon">
        <p className="text-body-sm text-ink-muted">
          Surface artworks you may like. Build a personal art history over time.
        </p>
      </WindowPanel>

      <WindowPanel title="Media Log" statusText="coming soon" style={{ marginTop: '12px' }}>
        <p className="text-body-sm text-ink-muted">
          Track books, essays, films, music, and exhibitions.
        </p>
      </WindowPanel>

      <WindowPanel title="Creative Inspiration" statusText="coming soon" style={{ marginTop: '12px' }}>
        <p className="text-body-sm text-ink-muted">
          Artists, essays, ideas, and cultural events that catch your eye.
        </p>
      </WindowPanel>
    </PageShell>
  );
}
