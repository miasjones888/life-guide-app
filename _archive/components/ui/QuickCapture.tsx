'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFolderSystem } from '@/hooks/useFolderSystem';

export default function QuickCapture() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const { addNote } = useFolderSystem();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) return;
    addNote({
      folderId: 'capture',
      format: 'fragment',
      content: trimmed,
    });
    setText('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 900);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setText('');
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => { setOpen(false); setText(''); }}
          className="sheet-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Capture sheet */}
      {open && (
        <div
          role="dialog"
          aria-label="Quick capture"
          style={{
            position: 'fixed',
            bottom: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(480px, calc(100vw - 16px))',
            backgroundColor: 'var(--color-paper)',
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '2px',
            padding: '16px',
            zIndex: 150,
            boxShadow: '0 4px 24px rgba(26,25,23,0.12)',
          }}
        >
          <div className="text-micro text-ink-muted" style={{ marginBottom: '8px', letterSpacing: '0.05em' }}>
            capture → folders / capture stack
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? (⌘↵ to save)"
            rows={3}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              padding: '8px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '15px',
              color: 'var(--color-ink)',
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <span className="text-micro text-ink-muted" style={{ opacity: saved ? 1 : 0, transition: 'opacity 0.2s', color: 'var(--color-forest)' }}>
              saved to capture stack
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => { setOpen(false); setText(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '11px',
                  color: 'var(--color-ink-muted)',
                  padding: '6px 0',
                  minHeight: '44px',
                }}
              >
                cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!text.trim()}
                style={{
                  border: '1px solid var(--color-ink-ghost)',
                  borderRadius: '2px',
                  background: 'transparent',
                  color: text.trim() ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                  padding: '6px 14px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '12px',
                  cursor: text.trim() ? 'pointer' : 'not-allowed',
                  minHeight: '44px',
                  opacity: text.trim() ? 1 : 0.5,
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick capture"
        aria-expanded={open}
        style={{
          // Stacked above JournalPenButton so the pen owns the
          // bottom-right corner on every Phase 1 surface.
          position: 'fixed',
          bottom: '124px',
          right: '16px',
          width: '44px',
          height: '44px',
          borderRadius: '2px',
          border: '1px solid var(--color-ink-ghost)',
          backgroundColor: 'var(--color-chrome)',
          color: 'var(--color-ink)',
          fontFamily: 'Courier New, monospace',
          fontSize: '18px',
          cursor: 'pointer',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(26,25,23,0.10)',
        }}
      >
        +
      </button>
    </>
  );
}
