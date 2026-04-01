import React from 'react';
import type { CalendarCategory } from '@/content/types';

interface TimeBlockProps {
  time?: string;
  title: string;
  emoji?: string;
  category: CalendarCategory;
  isNonNegotiable?: boolean;
  doubleAlarm?: boolean;
  note?: string;
  isOptional?: boolean;
  isUrgent?: boolean;
}

const categoryColorMap: Record<CalendarCategory, string> = {
  tomato: 'border-l-tomato',
  grape: 'border-l-grape',
  blueberry: 'border-l-blueberry',
  basil: 'border-l-basil',
  banana: 'border-l-banana',
  flamingo: 'border-l-flamingo',
  graphite: 'border-l-graphite',
  tangerine: 'border-l-tangerine',
  peacock: 'border-l-peacock',
  sage: 'border-l-sage',
};

const categoryLabelMap: Record<CalendarCategory, string> = {
  tomato: 'Cat care',
  grape: 'System',
  blueberry: 'Deep work',
  basil: 'Outside',
  banana: 'Food/logistics',
  flamingo: 'Self-care',
  graphite: 'Cleaning',
  tangerine: 'Deadline',
  peacock: 'Spirituality',
  sage: 'Learning',
};

export default function TimeBlock({
  time,
  title,
  emoji,
  category,
  isNonNegotiable,
  doubleAlarm,
  note,
  isOptional,
  isUrgent,
}: TimeBlockProps) {
  const borderClass = categoryColorMap[category];

  return (
    <div className={`time-block`}>
      {time && (
        <div className="time-label">{time}</div>
      )}
      <div className={`time-block-content ${borderClass}`} style={{ paddingLeft: '10px' }}>
        <div className="flex items-start gap-2">
          <span className="text-body leading-snug flex-1">
            {emoji && <span className="mr-1">{emoji}</span>}
            <span className={isNonNegotiable ? 'font-medium' : ''}>{title}</span>
            {isOptional && (
              <span className="text-micro text-ink-muted ml-2">(optional)</span>
            )}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {isNonNegotiable && (
              <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>
                !!
              </span>
            )}
            {doubleAlarm && (
              <span className="tag text-micro" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>
                2x alarm
              </span>
            )}
            {isUrgent && !isNonNegotiable && (
              <span className="tag" style={{ borderColor: 'var(--color-tangerine)', color: 'var(--color-tangerine)' }}>
                urgent
              </span>
            )}
          </div>
        </div>
        {note && (
          <p className="text-body-sm text-ink-muted mt-1 italic">{note}</p>
        )}
      </div>
    </div>
  );
}

export { categoryColorMap, categoryLabelMap };
