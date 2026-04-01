'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Expandable from '@/components/ui/Expandable';
import TimeBlock from '@/components/ui/TimeBlock';
import { weeklyEvents, biweeklyEvents } from '@/content/calendar';
import { modularNote, verbatimCopy } from '@/content/guide';
import type { DayOfWeek, CalendarEvent } from '@/content/types';

const days: { key: DayOfWeek; label: string; note?: string }[] = [
  { key: 'monday', label: 'Monday', note: 'Rest/recovery — no structured work' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
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
        <h1 className="text-h1">Weekly System</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Day-by-day structure. Tap a day to expand.
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

      <WindowPanel title="WEEKLY SCHEDULE" style={{ marginBottom: '10px' }} noPadding>
        <div style={{ padding: '0' }}>
          {days.map((day) => {
            const events = getEventsForDay(day.key);
            const isToday = day.key === todayKey;

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
      <WindowPanel title="EVERY 2 WEEKS" style={{ marginBottom: '10px' }}>
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
