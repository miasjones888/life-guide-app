'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FolderNote, FolderId } from '@/content/types';
import { FORMAT_COLORS, FORMAT_LABELS, FOLDER_DEFINITIONS, getFolderById } from '@/content/folders';

function safeHostname(url: string): string {
  try {
    // Prepend scheme if missing so URL() can parse it
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalized).hostname;
  } catch {
    return url;
  }
}

interface NoteCardItemProps {
  note: FolderNote;
  onUpdate: (id: string, changes: Partial<Pick<FolderNote, 'content' | 'isFlagged'>>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, folderId: FolderId) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
}

export function NoteCardItem({ note, onUpdate, onDelete, onMove }: NoteCardItemProps) {
  const [flipped, setFlipped] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formatColor = FORMAT_COLORS[note.format];
  const formatLabel = FORMAT_LABELS[note.format];
  const folder = getFolderById(note.folderId);

  function handleFlip() {
    if (!showMoveMenu) setFlipped((f) => !f);
  }

  function handleMove(folderId: FolderId) {
    onMove(note.id, folderId);
    setShowMoveMenu(false);
    setFlipped(false);
  }

  function handleDelete() {
    if (confirmDelete) {
      onDelete(note.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  }

  const moveFolders = FOLDER_DEFINITIONS.filter((f) => f.id !== note.folderId);

  return (
    <div
      className="notecard-stack-wrapper"
      style={{ height: '100%' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', height: '100%', position: 'relative' }}
      >
        {/* FRONT */}
        <div
          className="notecard-front cursor-pointer"
          onClick={handleFlip}
          style={{ height: '100%' }}
        >
          <div className="flex flex-col gap-2 h-full">
            {/* Format tag */}
            <div className="flex items-center justify-between">
              <span
                className="format-tag"
                style={{ color: formatColor, borderColor: formatColor }}
              >
                #{formatLabel}
              </span>
              {note.isFlagged && (
                <span className="text-[10px] font-mono text-[#F4511E]">⚑ flagged</span>
              )}
            </div>

            {/* Title if present */}
            {note.title && (
              <p className="text-body-sm font-semibold text-ink leading-snug">{note.title}</p>
            )}

            {/* Content */}
            <p className="text-body-sm text-ink leading-relaxed flex-1 line-clamp-5">
              {note.content}
            </p>

            {/* Source / URL */}
            {(note.source || note.url) && (
              <p className="text-micro text-ink-muted font-mono truncate">
                {note.source || safeHostname(note.url!)} · {formatDate(note.createdAt)}
              </p>
            )}
            {!note.source && !note.url && (
              <p className="text-micro text-ink-muted font-mono">
                {formatDate(note.createdAt)}
              </p>
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          className="notecard-back"
          style={{ height: '100%', transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col gap-3 h-full">
            {/* Metadata */}
            <div className="flex flex-col gap-1">
              <p className="text-micro font-mono text-ink-muted">
                {formatDate(note.createdAt)} · {formatTime(note.createdAt)}
              </p>
              {note.source && (
                <p className="text-micro font-mono text-ink-muted">source: {note.source}</p>
              )}
              {note.url && !note.source && (
                <p className="text-micro font-mono text-ink-muted truncate">
                  {new URL(note.url).hostname}
                </p>
              )}
              {folder && (
                <p className="text-micro font-mono text-ink-muted">folder: {folder.shortLabel}</p>
              )}
              {note.updatedAt && (
                <p className="text-micro font-mono text-ink-muted">
                  edited {formatDate(note.updatedAt)}
                </p>
              )}
            </div>

            <div className="hairline" />

            {/* Move to folder */}
            <div className="flex flex-col gap-1">
              <button
                className="text-micro font-mono text-ink-muted text-left hover:text-ink transition-colors"
                onClick={() => setShowMoveMenu((s) => !s)}
              >
                ↗ move to folder
              </button>
              <AnimatePresence>
                {showMoveMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-wrap gap-1 mt-1"
                  >
                    {moveFolders.map((f) => (
                      <button
                        key={f.id}
                        className="folder-chip"
                        onClick={() => handleMove(f.id)}
                      >
                        {f.shortLabel}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions row */}
            <div className="mt-auto flex items-center gap-4">
              <button
                className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
                onClick={() => onUpdate(note.id, { isFlagged: !note.isFlagged })}
              >
                {note.isFlagged ? '⚑ unflag' : '⚐ flag'}
              </button>
              <button
                className="text-micro font-mono transition-colors"
                style={{ color: confirmDelete ? '#D50000' : undefined }}
                onClick={handleDelete}
              >
                {confirmDelete ? 'confirm delete?' : '✕ delete'}
              </button>
              <button
                className="text-micro font-mono text-ink-muted hover:text-ink transition-colors ml-auto"
                onClick={handleFlip}
              >
                ← back
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
