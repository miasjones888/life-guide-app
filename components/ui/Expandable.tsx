'use client';

import React, { useState } from 'react';

interface ExpandableProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
}

export default function Expandable({
  title,
  defaultOpen = false,
  children,
  badge,
}: ExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        className="expandable-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-micro text-ink-muted w-3 flex-shrink-0">{isOpen ? '▾' : '▸'}</span>
        <span className="text-h2 flex-1">{title}</span>
        {badge && (
          <span className="tag ml-auto">{badge}</span>
        )}
      </button>
      {isOpen && (
        <div className="pb-2">
          {children}
        </div>
      )}
    </div>
  );
}
