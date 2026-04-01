'use client';

import React from 'react';

interface WindowPanelProps {
  title: string;
  active?: boolean;
  statusText?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export default function WindowPanel({
  title,
  active = false,
  statusText,
  children,
  className = '',
  noPadding = false,
  style,
}: WindowPanelProps) {
  return (
    <div className={`window-panel ${className}`} style={style}>
      <div className={`window-title-bar ${active ? 'active' : ''}`}>
        <span>{title}</span>
      </div>
      <div className={`window-content ${noPadding ? '!p-0' : ''}`}>
        {children}
      </div>
      {statusText && (
        <div className="window-status-bar">
          {statusText}
        </div>
      )}
    </div>
  );
}
