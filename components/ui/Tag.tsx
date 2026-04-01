import React from 'react';
import type { CalendarCategory } from '@/content/types';

const categoryColorHex: Record<CalendarCategory, string> = {
  tomato: '#D50000',
  grape: '#8E24AA',
  blueberry: '#3F51B5',
  basil: '#0B8043',
  banana: '#F6BF26',
  flamingo: '#E67C73',
  graphite: '#616161',
  tangerine: '#F4511E',
  peacock: '#039BE5',
  sage: '#33B679',
};

interface TagProps {
  label: string;
  category?: CalendarCategory;
  variant?: 'default' | 'urgent' | 'locked' | 'active';
}

export default function Tag({ label, category, variant = 'default' }: TagProps) {
  const style: React.CSSProperties = {};

  if (category) {
    style.borderColor = categoryColorHex[category];
    style.color = categoryColorHex[category];
  } else if (variant === 'urgent') {
    style.borderColor = 'var(--color-tangerine)';
    style.color = 'var(--color-tangerine)';
  } else if (variant === 'locked') {
    style.borderColor = 'var(--color-ink-muted)';
    style.color = 'var(--color-ink-muted)';
  } else if (variant === 'active') {
    style.borderColor = 'var(--color-forest)';
    style.color = 'var(--color-forest)';
  }

  return (
    <span className="tag" style={style}>
      {label}
    </span>
  );
}
