'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FolderNote, FolderId } from '@/content/types';
import { PROJECT_FOLDERS, MAX_ACTIVE_SLOTS } from '@/content/folders';
import { ProjectFolder } from './ProjectFolder';

interface FolderShelfProps {
  notesForFolder: (id: FolderId) => FolderNote[];
  onOpenAdd: (folderId: FolderId) => void;
  onUpdate: (id: string, changes: Partial<Pick<FolderNote, 'content' | 'isFlagged'>>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, folderId: FolderId) => void;
}

export function FolderShelf({
  notesForFolder,
  onOpenAdd,
  onUpdate,
  onDelete,
  onMove,
}: FolderShelfProps) {
  // Only one folder open at a time
  const [openFolderId, setOpenFolderId] = useState<FolderId | null>(null);
  const [showSlotInfo, setShowSlotInfo] = useState(false);

  const activeSlots = PROJECT_FOLDERS.filter((f) => f.isProject).length;

  function toggleFolder(id: FolderId) {
    setOpenFolderId((current) => (current === id ? null : id));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Slot indicator */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowSlotInfo((s) => !s)}
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_ACTIVE_SLOTS }).map((_, i) => (
              <motion.span
                key={i}
                className="slot-dot"
                style={{ color: '#3D5C3A' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
              >
                {i < activeSlots ? (
                  <span className="slot-dot slot-dot-filled" style={{ color: '#3D5C3A' }} />
                ) : (
                  <span className="slot-dot" style={{ color: '#9E9E9E' }} />
                )}
              </motion.span>
            ))}
          </div>
          <span className="text-micro font-mono text-ink-muted">
            {activeSlots} / {MAX_ACTIVE_SLOTS} slots
          </span>
        </div>
        <button
          className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
          onClick={() => setShowSlotInfo((s) => !s)}
        >
          {showSlotInfo ? '▾' : '▸'} type system
        </button>
      </div>

      {/* Slot type explainer */}
      {showSlotInfo && (
        <div className="border border-ink/15 rounded-[2px] px-3 py-3 flex flex-col gap-2 bg-ink-ghost">
          <p className="text-micro font-mono text-ink leading-relaxed">
            <strong>type 1 — build:</strong> folder + slot + weekly move + deliverable + end state
          </p>
          <p className="text-micro font-mono text-ink leading-relaxed">
            <strong>type 2 — learning:</strong> folder + slot + weekly move + end state
          </p>
          <p className="text-micro font-mono text-ink leading-relaxed">
            <strong>type 3 — practice:</strong> no folder · no slot · no move · no end state
          </p>
          <div className="hairline" />
          <p className="text-micro font-mono text-ink-muted">
            max 3 active slots (type 1 + type 2 combined) · soft limit: 2 structured commitments
          </p>
        </div>
      )}

      {/* Project folders */}
      <div className="flex flex-col gap-3">
        {PROJECT_FOLDERS.map((folder) => (
          <ProjectFolder
            key={folder.id}
            folder={folder}
            notes={notesForFolder(folder.id)}
            isOpen={openFolderId === folder.id}
            onToggle={() => toggleFolder(folder.id)}
            onOpenAdd={() => onOpenAdd(folder.id)}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
}
