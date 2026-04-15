'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FolderNote, FolderId } from '@/content/types';
import { NoteCardStack } from './NoteCardStack';

interface CaptureStackProps {
  notes: FolderNote[];
  onOpenAdd: () => void;
  onUpdate: (id: string, changes: Partial<Pick<FolderNote, 'content' | 'isFlagged'>>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, folderId: FolderId) => void;
}

const FAN_LAYERS = [
  { rotate: '-2deg', translateX: '-4px', translateY: '3px', zIndex: 1 },
  { rotate: '1.5deg', translateX: '3px', translateY: '5px', zIndex: 2 },
  { rotate: '-0.8deg', translateX: '-1px', translateY: '2px', zIndex: 3 },
];

export function CaptureStack({ notes, onOpenAdd, onUpdate, onDelete, onMove }: CaptureStackProps) {
  const [expanded, setExpanded] = useState(false);
  const count = notes.length;

  return (
    <div className="flex flex-col gap-2">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="folder-tab"
            style={{ backgroundColor: '#616161', fontSize: 10 }}
          >
            capture stack
          </span>
          {count > 0 && (
            <span className="text-micro font-mono text-ink-muted">{count} item{count !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
            onClick={onOpenAdd}
          >
            + capture
          </button>
          {count > 0 && (
            <button
              className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? '▾ close' : '▸ review'}
            </button>
          )}
        </div>
      </div>

      {/* Visual fan stack (when collapsed and has items) */}
      {!expanded && count > 0 && (
        <button
          className="relative text-left"
          style={{ height: 72 }}
          onClick={() => setExpanded(true)}
          aria-label="Review capture stack"
        >
          {/* Fan layers */}
          {FAN_LAYERS.slice(0, Math.min(count - 1, 3)).map((layer, i) => (
            <div
              key={i}
              className="capture-fan-layer"
              style={{
                transform: `rotate(${layer.rotate}) translateX(${layer.translateX}) translateY(${layer.translateY})`,
                zIndex: layer.zIndex,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          ))}
          {/* Top card preview */}
          <div
            className="absolute inset-0 bg-paper border border-ink/25 rounded-[2px] px-3 py-2 flex flex-col justify-between"
            style={{ zIndex: 4 }}
          >
            <p className="text-micro font-mono text-ink-muted">
              #{notes[0]?.format}
            </p>
            <p className="text-body-sm text-ink line-clamp-2 leading-snug">
              {notes[0]?.content}
            </p>
            <p className="text-micro font-mono text-ink-muted">
              tap to review →
            </p>
          </div>
        </button>
      )}

      {/* Empty state */}
      {!expanded && count === 0 && (
        <div
          className="flex flex-col items-center justify-center gap-1 border border-dashed border-ink/15 rounded-[2px] py-4"
        >
          <p className="text-micro font-mono text-ink-muted">stack is empty</p>
          <p className="text-micro font-mono text-ink-muted opacity-60">
            capture anything → triage sunday
          </p>
        </div>
      )}

      {/* Expanded review mode */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              <NoteCardStack
                notes={notes}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onMove={onMove}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sunday review prompt */}
      <p className="text-micro font-mono text-ink-muted">
        → review sunday 6:45pm · triage to project folders
      </p>
    </div>
  );
}
