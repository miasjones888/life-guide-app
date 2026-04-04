'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Expandable from '@/components/ui/Expandable';
import TimeBlock from '@/components/ui/TimeBlock';
import { weeklyEvents, biweeklyEvents } from '@/content/calendar';
import { modularNote, verbatimCopy } from '@/content/guide';
import type { DayOfWeek, CalendarEvent } from '@/content/types';

const WEEKLY_FOCUS: Record<DayOfWeek, string> = {
  sunday: 'life planning reset',
  monday: 'portfolio work',
  tuesday: 'notion R&D + life admin',
  wednesday: 'notion R&D + portfolio work',
  thursday: 'buffer / life admin',
  friday: 'systems work',
  saturday: 'creative exploration',
};

const days: { key: DayOfWeek; label: string; note?: string }[] = [
  { key: 'monday', label: 'monday', note: 'Rest/recovery — no structured work' },
  { key: 'tuesday', label: 'tuesday' },
  { key: 'wednesday', label: 'wednesday' },
  { key: 'thursday', label: 'thursday' },
  { key: 'friday', label: 'friday' },
  { key: 'saturday', label: 'saturday' },
  { key: 'sunday', label: 'sunday' },
];

function getEventsForDay(day: DayOfWeek): CalendarEvent[] {
  return weeklyEvents.filter(
    (e) => e.days && e.days.includes(day)
  ).sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    const parseT = (t: string) => {
      const m = t.match(/^(\d+):(\d+)(am|pm)$/i);
      if (!m) return 0;
      let h = parseInt(m[1]);
      const mer = m[3].toLowerCase();
      if (mer === 'pm' && h !== 12) h += 12;
      if (mer === 'am' && h === 12) h = 0;
      return h * 60 + parseInt(m[2]);
    };
    return parseT(a.time) - parseT(b.time);
  });
}

function getTodayDayOfWeek(): DayOfWeek {
  const dayIndex = new Date().getDay();
  const map: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return map[dayIndex];
}

export default function WeeklyPage() {
  const todayKey = getTodayDayOfWeek();

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Weekly Rhythm</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Seven-day structure. Each day has a focus, a register, a tempo.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <div
        style={{
          borderLeft: '3px solid var(--color-graphite)',
          paddingLeft: '10px',
          marginBottom: '10px',
        }}
      >
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>

      <WindowPanel title="the week" style={{ marginBottom: '10px' }} noPadding>
        <div style={{ padding: '0' }}>
          {days.map((day) => {
            const events = getEventsForDay(day.key);
            const isToday = day.key === todayKey;
            const focusLabel = WEEKLY_FOCUS[day.key];

            return (
              <div
                key={day.key}
                style={{ borderBottom: '1px solid var(--color-ink-ghost)' }}
              >
                <div style={{ padding: '0 20px' }}>
                  <Expandable
                    title={day.label}
                    defaultOpen={isToday}
                    badge={isToday ? 'today' : undefined}
                  >
                    <div className="text-micro text-ink-muted" style={{ paddingTop: '4px', paddingBottom: '8px', paddingLeft: '4px', letterSpacing: '0.04em' }}>
                      {focusLabel}
                    </div>
                    {day.note && (
                      <p className="text-body-sm text-ink-muted" style={{ paddingBottom: '8px', paddingLeft: '4px', fontStyle: 'italic' }}>
                        {day.note}
                      </p>
                    )}
                    {events.length > 0 ? (
                      events.map((event) => (
                        <TimeBlock
                          key={event.id}
                          time={event.time}
                          title={event.title}
                          emoji={event.emoji}
                          category={event.category}
                          isNonNegotiable={event.isNonNegotiable}
                          note={event.note}
                          isOptional={event.isOptional}
                        />
                      ))
                    ) : (
                      <p className="text-body-sm text-ink-muted" style={{ paddingBottom: '8px', paddingLeft: '4px' }}>
                        No structured events — free day.
                      </p>
                    )}
                    {day.key === 'wednesday' && (
                      <div style={{ padding: '6px 4px 8px', borderTop: '1px solid var(--color-ink-ghost)' }}>
                        <p className="text-micro text-ink-muted italic">{verbatimCopy.protectedTime}</p>
                      </div>
                    )}
                    {day.key === 'thursday' && (
                      <div style={{ padding: '6px 4px 8px', borderTop: '1px solid var(--color-ink-ghost)' }}>
                        <p className="text-micro text-ink-muted italic">{verbatimCopy.outsideTime}</p>
                      </div>
                    )}
                    {day.key === 'saturday' && (
                      <div style={{ padding: '6px 4px 8px', borderTop: '1px solid var(--color-ink-ghost)' }}>
                        <p className="text-micro text-ink-muted italic">{verbatimCopy.protectedTime}</p>
                      </div>
                    )}
                  </Expandable>
                </div>
              </div>
            );
          })}
        </div>
      </WindowPanel>

      {/* Biweekly */}
      <WindowPanel title="every two weeks" style={{ marginBottom: '10px' }}>
        {biweeklyEvents.map((event) => (
          <div key={event.id} className="time-block">
            <div
              style={{
                flex: 1,
                paddingLeft: '10px',
                borderLeft: '3px solid var(--color-flamingo)',
              }}
            >
              <div className="text-body">{event.title}</div>
              {event.startDate && (
                <div className="text-micro text-ink-muted">Starting {event.startDate}</div>
              )}
            </div>
          </div>
        ))}
      </WindowPanel>
    </PageShell>
  );
}
