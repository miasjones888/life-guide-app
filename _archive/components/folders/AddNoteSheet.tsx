'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FolderId, NotecardFormat } from '@/content/types';
import {
  FOLDER_DEFINITIONS,
  FORMAT_COLORS,
  FORMAT_LABELS,
  FORMAT_DESCRIPTIONS,
} from '@/content/folders';

interface AddNoteSheetProps {
  open: boolean;
  defaultFolderId?: FolderId;
  onClose: () => void;
  onAdd: (data: {
    folderId: FolderId;
    format: NotecardFormat;
    content: string;
    title?: string;
    url?: string;
    source?: string;
  }) => void;
}

const ALL_FORMATS: NotecardFormat[] = ['fragment', 'question', 'reference', 'map', 'research'];

export function AddNoteSheet({ open, defaultFolderId = 'capture', onClose, onAdd }: AddNoteSheetProps) {
  const [folderId, setFolderId] = useState<FolderId>(defaultFolderId);
  const [format, setFormat] = useState<NotecardFormat>('fragment');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [showUrlFields, setShowUrlFields] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset when defaultFolderId changes or sheet opens
  useEffect(() => {
    if (open) {
      setFolderId(defaultFolderId);
      setContent('');
      setTitle('');
      setUrl('');
      setSource('');
      setShowUrlFields(false);
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [open, defaultFolderId]);

  function handleSubmit() {
    if (!content.trim()) return;
    onAdd({
      folderId,
      format,
      content: content.trim(),
      title: title.trim() || undefined,
      url: url.trim() || undefined,
      source: source.trim() || undefined,
    });
    onClose();
  }

  const selectedFolder = FOLDER_DEFINITIONS.find((f) => f.id === folderId);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-ink/20 rounded-t-[4px]"
            style={{ maxHeight: '85vh', overflowY: 'auto', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-8 h-1 rounded-full bg-ink/20" />
            </div>

            <div className="px-4 pb-4 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-h2 font-mono">add notecard</h2>
                <button
                  className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
                  onClick={onClose}
                >
                  ✕ cancel
                </button>
              </div>

              {/* Format picker */}
              <div className="flex flex-col gap-2">
                <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">format</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_FORMATS.map((f) => {
                    const isSelected = format === f;
                    const color = FORMAT_COLORS[f];
                    return (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className="format-tag transition-all"
                        style={{
                          color: isSelected ? '#fff' : color,
                          borderColor: color,
                          backgroundColor: isSelected ? color : 'transparent',
                        }}
                        title={FORMAT_DESCRIPTIONS[f]}
                      >
                        #{FORMAT_LABELS[f]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-micro font-mono text-ink-muted italic">
                  {FORMAT_DESCRIPTIONS[format]}
                </p>
              </div>

              {/* Folder selector */}
              <div className="flex flex-col gap-2">
                <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">folder</p>
                <div className="flex flex-wrap gap-2">
                  {FOLDER_DEFINITIONS.filter((f) => f.id !== 'archive').map((f) => {
                    const isSelected = folderId === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFolderId(f.id)}
                        className="folder-chip"
                        style={{
                          backgroundColor: isSelected ? f.tabColor : 'transparent',
                          color: isSelected ? '#fff' : undefined,
                          borderColor: isSelected ? f.tabColor : undefined,
                        }}
                      >
                        {f.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content textarea */}
              <div className="flex flex-col gap-2">
                <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">note</p>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    format === 'question'
                      ? 'What is the question?'
                      : format === 'reference'
                      ? 'What should you remember about this?'
                      : format === 'research'
                      ? 'Key points from this source…'
                      : 'Capture it here…'
                  }
                  className="w-full bg-transparent border border-ink/20 rounded-[2px] p-3 text-body font-sans text-ink resize-none focus:outline-none focus:border-ink/40"
                  rows={4}
                />
              </div>

              {/* Optional fields toggle */}
              <button
                className="text-micro font-mono text-ink-muted hover:text-ink transition-colors text-left"
                onClick={() => setShowUrlFields((s) => !s)}
              >
                {showUrlFields ? '▾' : '▸'} add source / url
              </button>

              <AnimatePresence>
                {showUrlFields && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-3 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">title</p>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article or source title"
                        className="w-full bg-transparent border border-ink/20 rounded-[2px] px-3 py-2 text-body-sm font-sans text-ink focus:outline-none focus:border-ink/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">url</p>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://…"
                        className="w-full bg-transparent border border-ink/20 rounded-[2px] px-3 py-2 text-body-sm font-sans text-ink focus:outline-none focus:border-ink/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-micro font-mono text-ink-muted uppercase tracking-wide">source name</p>
                      <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="are.na, nytimes, etc."
                        className="w-full bg-transparent border border-ink/20 rounded-[2px] px-3 py-2 text-body-sm font-sans text-ink focus:outline-none focus:border-ink/40"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="w-full py-3 text-body-sm font-mono text-paper bg-ink rounded-[2px] disabled:opacity-30 transition-opacity"
              >
                add to {selectedFolder?.shortLabel ?? 'folder'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
