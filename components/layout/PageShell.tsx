'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';
import { systemVersionNote } from '@/content/guide';

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div
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
