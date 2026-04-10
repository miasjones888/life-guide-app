import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';

export default function GrowthPage() {
  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Life Navigation</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Exploration, not improvement.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <WindowPanel title="life navigation">
        <div className="system-dialog">
          <p className="text-body-sm">This section is not yet built.</p>
          <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>Coming in Phase 2.</p>
        </div>
      </WindowPanel>
    </PageShell>
  );
}
