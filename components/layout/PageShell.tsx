import React from 'react';
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
      <main
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
      </main>
      <BottomNav />
    </div>
  );
}
