'use client';

import { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import { FolderShelf } from '@/components/folders/FolderShelf';
import { CaptureStack } from '@/components/folders/CaptureStack';
import { AddNoteSheet } from '@/components/folders/AddNoteSheet';
import { useFolderSystem } from '@/hooks/useFolderSystem';
import type { FolderId } from '@/content/types';

export default function FoldersPage() {
  const { notesForFolder, addNote, updateNote, deleteNote, moveNote } = useFolderSystem();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetFolderId, setSheetFolderId] = useState<FolderId>('capture');

  function openAddSheet(folderId: FolderId) {
    setSheetFolderId(folderId);
    setSheetOpen(true);
  }

  return (
    <PageShell>
      {/* Title bar */}
      <div className="window-title-bar flex items-center justify-between px-3">
        <span className="text-micro font-mono">folders</span>
        <button
          className="text-micro font-mono text-ink-muted hover:text-ink transition-colors"
          onClick={() => openAddSheet('capture')}
        >
          + capture
        </button>
      </div>

      {/* Content */}
      <div className="window-content flex flex-col gap-6">
        {/* Project folders shelf */}
        <FolderShelf
          notesForFolder={notesForFolder}
          onOpenAdd={openAddSheet}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onMove={moveNote}
        />

        <div className="hairline" />

        {/* Capture stack */}
        <CaptureStack
          notes={notesForFolder('capture')}
          onOpenAdd={() => openAddSheet('capture')}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onMove={moveNote}
        />

        <div className="hairline" />

        {/* Archive */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="folder-tab" style={{ backgroundColor: '#ACACAC', fontSize: 10 }}>
              archive
            </span>
            <span className="text-micro font-mono text-ink-muted">
              {notesForFolder('archive').length} items
            </span>
          </div>
          {notesForFolder('archive').length === 0 ? (
            <p className="text-micro font-mono text-ink-muted">
              moved here during monthly reset · processed cards
            </p>
          ) : (
            <p className="text-micro font-mono text-ink-muted">
              {notesForFolder('archive').length} card{notesForFolder('archive').length !== 1 ? 's' : ''} archived
            </p>
          )}
        </div>

        {/* System note */}
        <div className="border border-ink/10 rounded-[2px] px-3 py-3 flex flex-col gap-1">
          <p className="text-micro font-mono text-ink-muted leading-relaxed">
            <strong className="text-ink">notecard formats:</strong> #fragment · #question · #reference · #map · #research
          </p>
          <p className="text-micro font-mono text-ink-muted leading-relaxed">
            <strong className="text-ink">sunday 6:45pm:</strong> review capture stack · triage to project folders
          </p>
          <p className="text-micro font-mono text-ink-muted leading-relaxed">
            <strong className="text-ink">monthly reset:</strong> review all three folders · archive what's resolved
          </p>
        </div>
      </div>

      {/* Add note bottom sheet */}
      <AddNoteSheet
        open={sheetOpen}
        defaultFolderId={sheetFolderId}
        onClose={() => setSheetOpen(false)}
        onAdd={(data) => {
          addNote(data);
        }}
      />
    </PageShell>
  );
}
