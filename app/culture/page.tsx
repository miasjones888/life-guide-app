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

      <WindowPanel title="culture">
        <div className="system-dialog">
          <p className="text-body-sm">This section is not yet built.</p>
          <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>Coming in Phase 2.</p>
        </div>
      </WindowPanel>
    </PageShell>
  );
}
