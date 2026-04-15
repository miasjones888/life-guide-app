'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FolderNote, FolderId } from '@/content/types';
import { NoteCardItem } from './NoteCardItem';

interface NoteCardStackProps {
  notes: FolderNote[];
  onUpdate: (id: string, changes: Partial<Pick<FolderNote, 'content' | 'isFlagged'>>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, folderId: FolderId) => void;
}

const CARD_HEIGHT = 180;
const DEPTH_OFFSET = 5; // px per layer
const MAX_DEPTH_LAYERS = 3;

export function NoteCardStack({ notes, onUpdate, onDelete, onMove }: NoteCardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  if (notes.length === 0) {
    return (
      <div
        className="flex items-center justify-center border border-dashed border-ink/20 rounded-[2px]"
        style={{ height: CARD_HEIGHT }}
      >
        <p className="text-micro font-mono text-ink-muted">no cards yet</p>
      </div>
    );
  }

  // Clamp activeIndex so deleting/moving the last card never yields undefined
  const safeIndex = Math.min(activeIndex, notes.length - 1);
  const visibleNote = notes[safeIndex];
  const depthCount = Math.min(notes.length - 1, MAX_DEPTH_LAYERS);

  function goNext() {
    if (activeIndex < notes.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
    }
  }

  function goPrev() {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((i) => i - 1);
    }
  }

  function handleDragStart(x: number) {
    setDragStartX(x);
  }

  function handleDragEnd(x: number) {
    if (dragStartX === null) return;
    const delta = dragStartX - x;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setDragStartX(null);
  }

  const depthLayers = Array.from({ length: depthCount }, (_, i) => i + 1).reverse();

  return (
    <div className="flex flex-col gap-2">
      {/* Stack with depth layers */}
      <div
        className="notecard-stack-wrapper"
        style={{ height: CARD_HEIGHT + depthCount * DEPTH_OFFSET }}
      >
        {/* Ghost depth layers behind the top card */}
        {depthLayers.map((depth) => (
          <div
            key={depth}
            className="capture-fan-layer"
            style={{
              bottom: depth * DEPTH_OFFSET,
              left: depth * 2,
              right: depth * 2,
              transform: `rotate(${depth * 0.8}deg)`,
              zIndex: MAX_DEPTH_LAYERS - depth,
            }}
          />
        ))}

        {/* Top card — animated on index change */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={visibleNote.id}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              bottom: 0,
              zIndex: MAX_DEPTH_LAYERS + 1,
              height: CARD_HEIGHT,
            }}
            onPointerDown={(e) => handleDragStart(e.clientX)}
            onPointerUp={(e) => handleDragEnd(e.clientX)}
          >
            <NoteCardItem
              note={visibleNote}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      {notes.length > 1 && (
        <div className="flex items-center justify-between px-1 mt-1">
          <button
            className="text-micro font-mono text-ink-muted disabled:opacity-30 hover:text-ink transition-colors"
            onClick={goPrev}
            disabled={activeIndex === 0}
          >
            ← prev
          </button>
          <span className="text-micro font-mono text-ink-muted">
            {activeIndex + 1} / {notes.length}
          </span>
          <button
            className="text-micro font-mono text-ink-muted disabled:opacity-30 hover:text-ink transition-colors"
            onClick={goNext}
            disabled={activeIndex === notes.length - 1}
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
