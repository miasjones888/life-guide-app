'use client';

import React, { useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';
import { systemVersionNote } from '@/content/guide';

// Primary tab order for swipe navigation
const PRIMARY_TABS = ['/', '/guide', '/weekly'];

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const router = useRouter();
  const pathname = usePathname();
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
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-chrome)',
        paddingBottom: '56px',
      }}
    >
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '8px',
          paddingBottom: '0',
        }}
      >
        {children}
        <footer className="version-footer" style={{ marginTop: '16px' }}>
          {systemVersionNote}
        </footer>
      </motion.main>
      <BottomNav />
    </div>
  );
}
