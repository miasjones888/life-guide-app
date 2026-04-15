'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import { STORAGE_KEYS } from '@/lib/storage-keys';

/**
 * /settings — the Phase 1 escape hatch.
 *
 * Not on the primary nav. Single purpose: export every versioned
 * localStorage store as one JSON snapshot, and import one back. If a
 * future store migration ever breaks, Mia can export, reload, and keep
 * her data.
 *
 * The snapshot shape mirrors the stored shape of each hook exactly —
 * useBudget's / useAnchor's / useJournal's versioned `{ version, state }`
 * wrappers pass through unchanged. Simple per-value stores
 * (hard-day-mode, user events, local events, wishlist) also round-trip
 * as their raw stored value.
 */

interface StoreConfig {
  readonly key: string;
  readonly label: string;
}

// The eight Phase 1 data stores called out in HANDOFF Step 4:
// anchor, journal, budget, folders, wishlist, user events, local events,
// hard-day mode. Exporting reads them from localStorage verbatim; no
// transformation of the on-disk format happens anywhere in this file.
const STORES: readonly StoreConfig[] = [
  { key: STORAGE_KEYS.ANCHOR, label: 'anchor' },
  { key: STORAGE_KEYS.JOURNAL, label: 'journal' },
  { key: STORAGE_KEYS.BUDGET, label: 'budget' },
  { key: STORAGE_KEYS.FOLDERS, label: 'folders' },
  { key: STORAGE_KEYS.WISHLIST, label: 'wishlist' },
  { key: STORAGE_KEYS.USER_EVENTS, label: 'user events' },
  { key: STORAGE_KEYS.LOCAL_EVENTS, label: 'local events' },
  { key: STORAGE_KEYS.HARD_DAY_MODE, label: 'hard-day mode' },
];

const SNAPSHOT_VERSION = 'life-guide-snapshot-v1';

interface Snapshot {
  readonly version: typeof SNAPSHOT_VERSION;
  readonly exportedAt: string;
  readonly stores: Record<string, unknown>;
}

function readStore(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      // Raw non-JSON value (e.g. hard-day-mode stores "true"/"false").
      return raw;
    }
  } catch {
    return null;
  }
}

function writeStore(key: string, value: unknown): boolean {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch {
    return false;
  }
}

function buildSnapshot(): Snapshot {
  const stores: Record<string, unknown> = {};
  for (const s of STORES) {
    const value = readStore(s.key);
    if (value !== null) stores[s.key] = value;
  }
  return {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    stores,
  };
}

interface ImportResult {
  readonly ok: boolean;
  readonly restored: readonly string[];
  readonly error?: string;
}

function restoreSnapshot(json: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, restored: [], error: 'Could not parse file.' };
  }
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, restored: [], error: 'Not a valid snapshot file.' };
  }
  const candidate = parsed as Partial<Snapshot>;
  if (candidate.version !== SNAPSHOT_VERSION) {
    return {
      ok: false,
      restored: [],
      error: `Unknown snapshot version: ${String(candidate.version ?? 'none')}.`,
    };
  }
  if (!candidate.stores || typeof candidate.stores !== 'object') {
    return { ok: false, restored: [], error: 'Snapshot has no stores.' };
  }
  const restored: string[] = [];
  for (const s of STORES) {
    if (!(s.key in candidate.stores)) continue;
    const value = candidate.stores[s.key];
    if (writeStore(s.key, value)) {
      restored.push(s.label);
    }
  }
  return { ok: true, restored };
}

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
          Download one JSON file containing every store: {STORES.map((s) => s.label).join(', ')}.
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
                  {importResult.restored.length > 0 ? importResult.restored.join(', ') : 'nothing to restore'}
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
