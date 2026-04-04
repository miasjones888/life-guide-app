'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageShell from '@/components/layout/PageShell';

export default function ReflectionPage() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('reflection-text');
      if (stored) setText(stored);
    } catch {}
  }, []);

  function handleChange(v: string) {
    setText(v);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem('reflection-text', v); } catch {}
      setSaved(true);
    }, 600);
  }

  function handleClear() {
    if (!text.trim()) return;
    const confirmed = window.confirm('Clear all reflection notes?');
    if (!confirmed) return;
    setText('');
    setSaved(false);
    try { localStorage.removeItem('reflection-text'); } catch {}
  }

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Reflection</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Open space. No structure. Write what is true right now.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="..."
        style={{
          width: '100%',
          minHeight: '320px',
          backgroundColor: 'var(--color-paper)',
          border: '1px solid var(--color-ink-ghost)',
          borderRadius: '2px',
          padding: '16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'var(--color-ink)',
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <span
          className="text-micro text-ink-muted"
          style={{ transition: 'opacity 0.3s', opacity: saved ? 1 : 0 }}
        >
          saved
        </span>
        {text.trim().length > 0 && (
          <button
            onClick={handleClear}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'var(--color-ink-muted)',
              padding: '4px 0',
              minHeight: '44px',
            }}
          >
            clear
          </button>
        )}
      </div>
    </PageShell>
  );
}
