'use client';

import React, { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import { useHardDay } from '@/context/HardDayContext';
import JournalPenButton from '@/components/ui/JournalPenButton';
import JournalDrawer from '@/components/ui/JournalDrawer';

// Inlined version string. Previously lived in content/guide.ts, which
// was removed in Phase 1 Step 4 along with the rest of the legacy /guide
// surface. This footer is the only surviving use site, so keeping a
// separate module for one string is dead weight.
const systemVersionNote = 'Life Guide v1 — Phase 1.';

// Primary tab order for swipe navigation. Mirrors the seven-item nav:
// edge-swipes move between primary surfaces in the same left-to-right
// order as the bottom nav.
const PRIMARY_TABS = [
  '/today',
  '/garden',
  '/calendar',
  '/library',
  '/notes',
  '/budget',
  '/field-report',
];

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isHardDay, toggle: toggleHardDay } = useHardDay();
  const [journalOpen, setJournalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);

    // Require horizontal displacement ≥ 60px and less vertical than horizontal
    if (Math.abs(deltaX) < 60 || deltaY > Math.abs(deltaX)) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    const currentIdx = PRIMARY_TABS.indexOf(pathname);
    if (currentIdx === -1) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    if (deltaX < 0 && currentIdx < PRIMARY_TABS.length - 1) {
      // Swipe left → next tab
      router.push(PRIMARY_TABS[currentIdx + 1]);
    } else if (deltaX > 0 && currentIdx > 0) {
      // Swipe right → previous tab
      router.push(PRIMARY_TABS[currentIdx - 1]);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ minHeight: '100dvh', backgroundColor: 'var(--color-chrome)' }}
    >
      {/* Hard Day Mode banner */}
      {isHardDay && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 90,
            backgroundColor: 'var(--color-paper)',
            borderBottom: '1px solid var(--color-ink-ghost)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="text-micro text-ink-muted" style={{ fontStyle: 'italic' }}>
            Hard day mode — minimum view active. You only need to do the minimum. That is enough.
          </span>
          <button
            type="button"
            onClick={toggleHardDay}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: 'var(--color-ink-muted)',
              padding: '4px 6px',
              minHeight: '44px',
            }}
          >
            clear
          </button>
        </div>
      )}

      {/* Desktop layout wrapper */}
      <div className="desktop-layout">
        <SideNav />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
          className="main-content"
          style={{ padding: '8px', paddingBottom: '0' }}
        >
          {children}
          <footer className="version-footer" style={{ marginTop: '16px' }}>
            {systemVersionNote}
          </footer>
        </motion.main>
      </div>

      <JournalPenButton onOpen={() => setJournalOpen(true)} />
      <JournalDrawer open={journalOpen} onClose={() => setJournalOpen(false)} />
      <BottomNav />
    </div>
  );
}
