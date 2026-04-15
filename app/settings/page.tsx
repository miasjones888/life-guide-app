'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import {
  SETTINGS_STORES,
  buildSnapshot,
  restoreSnapshot,
  type ImportResult,
} from '@/lib/settings-snapshot';

/**
 * /settings — the Phase 1 escape hatch.
 *
 * Not on the primary nav. Single purpose: export every versioned
 * localStorage store as one JSON snapshot, and import one back. If a
 * future store migration ever breaks, Mia can export, reload, and keep
 * her data. All snapshot logic lives in lib/settings-snapshot so the
 * round-trip can be tested without a browser.
 */

function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SettingsPage() {
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);

  function handleExportAll() {
    const snapshot = buildSnapshot();
    const json = JSON.stringify(snapshot, null, 2);
    const date = new Date().toISOString().split('T')[0];
    downloadJson(`life-guide-${date}.json`, json);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result;
      if (typeof json !== 'string') {
        setImportResult({ ok: false, restored: [], error: 'Could not read file.' });
        setImporting(false);
        return;
      }
      const result = restoreSnapshot(json);
      setImportResult(result);
      setImporting(false);
      if (result.ok && result.restored.length > 0) {
        // Reload so every hook re-reads its store fresh.
        setTimeout(() => window.location.reload(), 1000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">settings</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Your data lives on this device. Export a snapshot whenever you want a copy.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <section style={{ marginBottom: '20px' }}>
        <div
          className="text-micro text-ink-muted"
          style={{ marginBottom: '6px', letterSpacing: '0.05em' }}
        >
          export
        </div>
        <p className="text-body-sm" style={{ marginBottom: '10px' }}>
          Download one JSON file containing every store:{' '}
          {SETTINGS_STORES.map((s) => s.label).join(', ')}.
        </p>
        <button
          type="button"
          onClick={handleExportAll}
          style={{
            border: '1px solid var(--border-2)',
            borderRadius: '2px',
            background: 'transparent',
            color: 'var(--ink-1)',
            padding: '10px 16px',
            fontFamily: 'var(--font-chrome)',
            fontSize: '12px',
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          export snapshot → JSON
        </button>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <div
          className="text-micro text-ink-muted"
          style={{ marginBottom: '6px', letterSpacing: '0.05em' }}
        >
          import
        </div>
        <p className="text-body-sm" style={{ marginBottom: '10px' }}>
          Upload a snapshot exported from this surface. Existing values in each store will be
          overwritten. The page reloads once restore is done.
        </p>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid var(--border-2)',
            borderRadius: '2px',
            background: 'transparent',
            color: 'var(--ink-1)',
            padding: '10px 16px',
            fontFamily: 'var(--font-chrome)',
            fontSize: '12px',
            cursor: 'pointer',
            minHeight: '44px',
            opacity: importing ? 0.6 : 1,
          }}
        >
          {importing ? 'restoring…' : 'choose snapshot file →'}
          <input
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            disabled={importing}
            style={{ display: 'none' }}
          />
        </label>

        {importResult && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 12px',
              border: `1px solid ${
                importResult.ok ? 'var(--color-forest)' : 'var(--color-tomato)'
              }`,
              borderRadius: '2px',
              backgroundColor: 'var(--color-paper)',
            }}
          >
            {importResult.ok ? (
              <>
                <div
                  className="text-body-sm"
                  style={{ color: 'var(--color-forest)', marginBottom: '4px' }}
                >
                  restored.
                </div>
                <div className="text-micro text-ink-muted">
                  {importResult.restored.length > 0
                    ? importResult.restored.join(', ')
                    : 'nothing to restore'}
                </div>
              </>
            ) : (
              <div className="text-body-sm" style={{ color: 'var(--color-tomato)' }}>
                {importResult.error ?? 'restore did not complete.'}
              </div>
            )}
          </div>
        )}
      </section>

      <div
        style={{
          padding: '10px 12px',
          border: '1px solid var(--border-3)',
          borderRadius: '2px',
          backgroundColor: 'var(--color-paper)',
        }}
      >
        <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
          Snapshots are plain JSON. No passwords, no keys. Store them wherever you keep important
          files.
        </p>
      </div>
    </PageShell>
  );
}
