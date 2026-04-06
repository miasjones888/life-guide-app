'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FolderNote, FolderId, NotecardFormat } from '@/content/types';

const STORAGE_KEY = 'life-guide-folders';
const STORAGE_VERSION = 1;

interface StoredFolders {
  version: number;
  notes: FolderNote[];
}

const VALID_FOLDER_IDS: FolderId[] = ['portfolio', 'field-guide', 'curriculum', 'capture', 'archive'];
const VALID_FORMATS: NotecardFormat[] = ['fragment', 'question', 'reference', 'map', 'research'];

function isValidFolderId(id: unknown): id is FolderId {
  return typeof id === 'string' && VALID_FOLDER_IDS.includes(id as FolderId);
}

function isValidFormat(format: unknown): format is NotecardFormat {
  return typeof format === 'string' && VALID_FORMATS.includes(format as NotecardFormat);
}

function normalizeNote(candidate: unknown): FolderNote | null {
  if (!candidate || typeof candidate !== 'object') return null;
  const maybe = candidate as Partial<FolderNote>;
  if (
    typeof maybe.id !== 'string' ||
    typeof maybe.content !== 'string' ||
    !isValidFolderId(maybe.folderId) ||
    !isValidFormat(maybe.format) ||
    typeof maybe.createdAt !== 'string'
  ) {
    return null;
  }
  return {
    id: maybe.id,
    folderId: maybe.folderId,
    format: maybe.format,
    content: maybe.content,
    title: typeof maybe.title === 'string' ? maybe.title : undefined,
    url: typeof maybe.url === 'string' ? maybe.url : undefined,
    source: typeof maybe.source === 'string' ? maybe.source : undefined,
    imageUrl: typeof maybe.imageUrl === 'string' ? maybe.imageUrl : undefined,
    createdAt: maybe.createdAt,
    updatedAt: typeof maybe.updatedAt === 'string' ? maybe.updatedAt : undefined,
    isFlagged: typeof maybe.isFlagged === 'boolean' ? maybe.isFlagged : false,
  };
}

function parseStored(raw: string | null): FolderNote[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      'notes' in parsed &&
      Array.isArray((parsed as StoredFolders).notes)
    ) {
      return (parsed as StoredFolders).notes
        .map(normalizeNote)
        .filter((n): n is FolderNote => n !== null);
    }
  } catch {
    // corrupted storage — start fresh
  }
  return [];
}

function persist(notes: FolderNote[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, notes } satisfies StoredFolders)
    );
  } catch {
    // ignore quota / private browsing failures
  }
}

export function useFolderSystem() {
  const [notes, setNotes] = useState<FolderNote[]>([]);

  useEffect(() => {
    try {
      setNotes(parseStored(localStorage.getItem(STORAGE_KEY)));
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        try {
          setNotes(parseStored(event.newValue));
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addNote = useCallback(
    (data: Omit<FolderNote, 'id' | 'createdAt'>) => {
      const newNote: FolderNote = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        ...data,
      };
      setNotes((prev) => {
        const updated = [newNote, ...prev];
        persist(updated);
        return updated;
      });
    },
    []
  );

  const updateNote = useCallback(
    (
      id: string,
      changes: Partial<Pick<FolderNote, 'content' | 'title' | 'url' | 'source' | 'format' | 'isFlagged'>>
    ) => {
      setNotes((prev) => {
        const updated = prev.map((n) =>
          n.id === id ? { ...n, ...changes, updatedAt: new Date().toISOString() } : n
        );
        persist(updated);
        return updated;
      });
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const moveNote = useCallback((id: string, newFolderId: FolderId) => {
    setNotes((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, folderId: newFolderId, updatedAt: new Date().toISOString() } : n
      );
      persist(updated);
      return updated;
    });
  }, []);

  const notesForFolder = useCallback(
    (folderId: FolderId) => notes.filter((n) => n.folderId === folderId),
    [notes]
  );

  const notesByFormat = useCallback(
    (format: NotecardFormat) => notes.filter((n) => n.format === format),
    [notes]
  );

  const flaggedNotes = notes.filter((n) => n.isFlagged);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    moveNote,
    notesForFolder,
    notesByFormat,
    flaggedNotes,
  };
}
