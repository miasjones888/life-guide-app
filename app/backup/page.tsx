'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import { STORAGE_KEYS } from '@/lib/storage-keys';

interface StoreConfig {
  key: string;
  label: string;
  description: string;
}

const STORES: StoreConfig[] = [
  { key: STORAGE_KEYS.DECK, label: 'Flashcard Deck', description: 'All cards, categories, and flags.' },
  { key: STORAGE_KEYS.FOLDERS, label: 'Folders & Notes', description: 'All notecards across all folders.' },
  { key: STORAGE_KEYS.BUDGET, label: 'Budget', description: 'All budget lines, overrides, and goals.' },
  { key: STORAGE_KEYS.REFLECTION, label: 'Reflection', description: 'Current freeform reflection text.' },
  { key: STORAGE_KEYS.ANCHOR, label: 'Anchor', description: 'Current anchor.' },
  { key: STORAGE_KEYS.ASSISTANT_HISTORY, label: 'Assistant History', description: 'Conversation history.' },
];

function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportAll(): string {
  const snapshot: Record<string, unknown> = {
    exportedAt: new Date().toISOString(),
    version: 'life-guide-backup-v1',
  };
  for (const store of STORES) {
    try {
      const raw = localStorage.getItem(store.key);
      if (raw) {
        try {
          snapshot[store.key] = JSON.parse(raw) as unknown;
        } catch {
          snapshot[store.key] = raw;
        }
      }
    } catch {
      // skip unavailable keys
    }
  }
  return JSON.stringify(snapshot, null, 2);
}

function importAll(json: string): { ok: boolean; restored: string[]; error?: string } {
  try {
    const data = JSON.parse(json) as Record<string, unknown>;
    if (!data || typeof data !== 'object') {
      return { ok: false, restored: [], error: 'Not a valid backup file.' };
    }
    const restored: string[] = [];
    for (const store of STORES) {
      if (store.key in data) {
        try {
          const value = data[store.key];
          localStorage.setItem(store.key, typeof value === 'string' ? value : JSON.stringify(value));
          restored.push(store.label);
        } catch {
          // skip write failures
        }
      }
    }
    return { ok: true, restored };
  } catch {
    return { ok: false, restored: [], error: 'Could not parse backup file.' };
  }
}

export default function BackupPage() {
  const [importResult, setImportResult] = useState<{ ok: boolean; restored: string[]; error?: string } | null>(null);
  const [importing, setImporting] = useState(false);

  function handleExportAll() {
    const json = exportAll();
    const date = new Date().toISOString().split('T')[0];
    downloadJson(`life-guide-backup-${date}.json`, json);
  }

  function handleExportStore(store: StoreConfig) {
    try {
      const raw = localStorage.getItem(store.key);
      if (!raw) { alert(`No data found for ${store.label}.`); return; }
      const date = new Date().toISOString().split('T')[0];
      downloadJson(`life-guide-${store.key}-${date}.json`, raw);
    } catch {
      alert('Could not export this store.');
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      const result = importAll(json);
      setImportResult(result);
      setImporting(false);
      if (result.ok && result.restored.length > 0) {
        // reload page to reflect restored state
        setTimeout(() => window.location.reload(), 1200);
      }
    };
    reader.readAsText(file);
    // reset file input
    e.target.value = '';
  }

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Backup &amp; Restore</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Your data lives on this device. Export it regularly so you own a copy.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Export all */}
      <WindowPanel title="export all" active style={{ marginBottom: '10px' }}>
        <p className="text-body-sm" style={{ marginBottom: '12px' }}>
          Download a single JSON file with all your guide data: notes, budget, deck, reflection, and anchor task.
        </p>
        <button
          type="button"
          onClick={handleExportAll}
          style={{
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '2px',
            background: 'transparent',
            color: 'var(--color-ink)',
            padding: '8px 16px',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          Export full backup → JSON
        </button>
      </WindowPanel>

      {/* Individual stores */}
      <WindowPanel title="individual stores" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Export a single data store.
        </div>
        {STORES.map((store) => (
          <div
            key={store.key}
            className="time-block"
            style={{ alignItems: 'center' }}
          >
            <div style={{ flex: 1 }}>
              <div className="text-body-sm" style={{ fontWeight: 500 }}>{store.label}</div>
              <div className="text-micro text-ink-muted">{store.description}</div>
            </div>
            <button
              type="button"
              onClick={() => handleExportStore(store)}
              style={{
                border: '1px solid var(--color-ink-ghost)',
                borderRadius: '2px',
                background: 'transparent',
                color: 'var(--color-ink-muted)',
                padding: '4px 10px',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px',
                cursor: 'pointer',
                flexShrink: 0,
                minHeight: '44px',
              }}
            >
              export
            </button>
          </div>
        ))}
      </WindowPanel>

      {/* Restore */}
      <WindowPanel title="restore from backup" style={{ marginBottom: '10px' }}>
        <p className="text-body-sm" style={{ marginBottom: '10px' }}>
          Upload a previously exported backup file. Existing data will be overwritten. Page reloads after restore.
        </p>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '2px',
            background: 'transparent',
            color: 'var(--color-ink)',
            padding: '8px 16px',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            cursor: 'pointer',
            minHeight: '44px',
            opacity: importing ? 0.6 : 1,
          }}
        >
          {importing ? 'Restoring…' : 'Choose backup file →'}
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
              marginTop: '10px',
              padding: '10px 12px',
              border: `1px solid ${importResult.ok ? 'var(--color-forest)' : 'var(--color-tomato)'}`,
              borderRadius: '2px',
              backgroundColor: 'var(--color-paper)',
            }}
          >
            {importResult.ok ? (
              <>
                <div className="text-body-sm" style={{ color: 'var(--color-forest)', marginBottom: '4px' }}>
                  Restored successfully.
                </div>
                <div className="text-micro text-ink-muted">
                  {importResult.restored.join(', ')}
                </div>
              </>
            ) : (
              <div className="text-body-sm" style={{ color: 'var(--color-tomato)' }}>
                {importResult.error ?? 'Restore failed.'}
              </div>
            )}
          </div>
        )}
      </WindowPanel>

      {/* Note */}
      <div className="system-dialog" style={{ marginBottom: '10px' }}>
        <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
          Backups are plain JSON files. They contain no passwords or API keys. Store them wherever you keep important files.
        </p>
      </div>
    </PageShell>
  );
}
