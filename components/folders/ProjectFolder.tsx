'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { FolderNote, FolderId } from '@/content/types';
import type { FolderDefinition } from '@/content/folders';
import { NoteCardStack } from './NoteCardStack';

interface ProjectFolderProps {
  folder: FolderDefinition;
  notes: FolderNote[];
  isOpen: boolean;
  onToggle: () => void;
  onOpenAdd: () => void;
  onUpdate: (id: string, changes: Partial<Pick<FolderNote, 'content' | 'isFlagged'>>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, folderId: FolderId) => void;
}

export function ProjectFolder({
  folder,
  notes,
  isOpen,
  onToggle,
  onOpenAdd,
  onUpdate,
  onDelete,
  onMove,
}: ProjectFolderProps) {
  const count = notes.length;

  return (
    <div className="flex flex-col">
      {/* Folder tab + body */}
      <button
        className="flex items-end gap-0 text-left focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {/* Tab */}
        <div
          className="folder-tab"
          style={{ backgroundColor: folder.tabColor }}
        >
          {folder.shortLabel}
        </div>
      </button>

      {/* Folder body — always visible as a container, contents animate */}
      <div
        className="border border-ink/20 rounded-[0_2px_2px_2px]"
        style={{ borderTop: `2px solid ${folder.tabColor}` }}
      >
        {/* Closed state — slim bar */}
        {!isOpen && (
          <button
            className="w-full px-3 py-3 flex items-center justify-between text-left hover:bg-ink-ghost transition-colors"
            onClick={onToggle}
          >
            <div className="flex items-center gap-3">
              {folder.projectTypeLabel && (
                <span className="text-micro font-mono text-ink-muted">
                  {folder.projectTypeLabel}
                </span>
              )}
              {count > 0 && (
                <span className="text-micro font-mono text-ink-muted">
                  {count} card{count !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <span className="text-micro font-mono text-ink-muted">▸ open</span>
          </button>
        )}

        {/* Open state */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-3 py-3 flex flex-col gap-3">
                {/* Project type label */}
                {folder.projectTypeLabel && (
                  <p className="text-micro font-mono text-ink-muted">
                    {folder.projectTypeLabel}
                  </p>
                )}

                {/* Card stack */}
                <NoteCardStack
                  notes={notes}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onMove={onMove}
                />

                {/* Footer row */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-micro font-mono text-ink-muted">
                    {count > 0
                      ? `${count} card${count !== 1 ? 's' : ''}`
                      : 'no cards yet'}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAdd();
                      }}
                    >
                      + add
                    </button>
                    <button
                      className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
                      onClick={onToggle}
                    >
                      ▾ close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
