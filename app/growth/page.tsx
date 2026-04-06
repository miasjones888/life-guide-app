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

      <WindowPanel title="Community Discovery" statusText="coming soon">
        <p className="text-body-sm text-ink-muted">
          Events, salons, creative meetups, and volunteer opportunities near you.
        </p>
      </WindowPanel>

      <WindowPanel title="Philosophy & Reflection" statusText="coming soon" style={{ marginTop: '12px' }}>
        <p className="text-body-sm text-ink-muted">
          Prompts on meaning, ethics, creativity, and nature.
        </p>
      </WindowPanel>

      <WindowPanel title="Journaling Catalyst" statusText="coming soon" style={{ marginTop: '12px' }}>
        <p className="text-body-sm text-ink-muted">
          Writing prompts and periodic reflection summaries.
        </p>
      </WindowPanel>
    </PageShell>
  );
}
