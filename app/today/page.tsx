'use client';

import { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import { dailyEvents, weeklyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { hardDayMinimum } from '@/content/mia';
import type { CalendarEvent, DayOfWeek } from '@/content/types';
import { parseEventTime } from '@/lib/time';
import { useHardDay } from '@/context/HardDayContext';
import { useAnchor } from '@/hooks/useAnchor';

/**
 * /today — the Anchor surface.
 *
 * One screen. One sentence. The hard-day minimum always visible. Now /
 * Next / Later pulled from real calendar data only.
 *
 * On a hard day this collapses to the minimum + the anchor sentence,
 * per COVENANT §5.
 */

const WEEKDAY_NAMES: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

interface Clock {
  hours: number;
  minutes: number;
  display: string;
}

function readClock(): Clock {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    display: now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  };
}

function localIsoDate(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getTodaysEvents(now: Date): CalendarEvent[] {
  const weekday = WEEKDAY_NAMES[now.getDay()];
  const isoDate = localIsoDate(now);
  const todaysWeekly = weeklyEvents.filter((e) => e.days?.includes(weekday));
  const todaysOneTime = aprilOneTimeEvents.filter((e) => e.date === isoDate);
  return [...dailyEvents, ...todaysWeekly, ...todaysOneTime];
}

interface TimedEvent {
  event: CalendarEvent;
  mins: number;
}

function getNowNextLater(currentMinutes: number, events: CalendarEvent[]) {
  const timed: TimedEvent[] = events
    .filter((e): e is CalendarEvent & { time: string } => Boolean(e.time))
    .map((e) => ({ event: e, mins: parseEventTime(e.time) }))
    .sort((a, b) => a.mins - b.mins);

  const past = timed.filter((t) => t.mins <= currentMinutes);
  const future = timed.filter((t) => t.mins > currentMinutes);

  return {
    now: past.length > 0 ? past[past.length - 1].event : null,
    next: future[0]?.event ?? null,
    later: future[1]?.event ?? null,
  };
}

function todayDisplay(now: Date): string {
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export default function TodayPage() {
  const [clock, setClock] = useState<Clock>(readClock);
  const { isHardDay, toggle: toggleHardDay } = useHardDay();
  const { anchor, setAnchorText } = useAnchor();

  useEffect(() => {
    const interval = setInterval(() => setClock(readClock()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const todaysEvents = getTodaysEvents(now);
  const currentMinutes = clock.hours * 60 + clock.minutes;
  const { now: nowEvent, next: nextEvent, later: laterEvent } = getNowNextLater(
    currentMinutes,
    todaysEvents
  );

  return (
    <PageShell>
      {/* Header — time, date, hard-day toggle */}
      <div
        style={{
          padding: '8px 0 4px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          <div className="text-display" style={{ lineHeight: 1.1 }}>
            {clock.display}
          </div>
          <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>
            {todayDisplay(now)}
          </div>
        </div>
        <button
          type="button"
          onClick={toggleHardDay}
          aria-pressed={isHardDay}
          style={{
            border: `1px solid ${isHardDay ? 'var(--ink-3)' : 'var(--border-2)'}`,
            borderRadius: '2px',
            background: isHardDay ? 'var(--color-chrome)' : 'transparent',
            color: isHardDay ? 'var(--ink-1)' : 'var(--ink-3)',
            padding: '6px 10px',
            fontFamily: 'var(--font-chrome)',
            fontSize: '11px',
            cursor: 'pointer',
            minHeight: '36px',
            alignSelf: 'flex-start',
          }}
        >
          {isHardDay ? '◉ hard day' : '○ hard day'}
        </button>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Anchor — the single sentence Mia sets for today */}
      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="anchor-input"
          className="text-micro text-ink-muted"
          style={{
            display: 'block',
            marginBottom: '6px',
            letterSpacing: '0.05em',
          }}
        >
          anchor
        </label>
        <input
          id="anchor-input"
          type="text"
          value={anchor.text}
          onChange={(e) => setAnchorText(e.target.value)}
          placeholder="what you're tending today"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--border-2)',
            padding: '8px 0',
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            lineHeight: 1.3,
            color: 'var(--ink-1)',
            outline: 'none',
          }}
        />
      </div>

      {/* Hard-day minimum — always visible, both modes */}
      <div style={{ marginBottom: '16px' }}>
        <div
          className="text-micro text-ink-muted"
          style={{ marginBottom: '6px', letterSpacing: '0.05em' }}
        >
          hard-day minimum
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--border-2)',
            borderRadius: '2px',
            backgroundColor: 'var(--color-paper)',
          }}
        >
          {hardDayMinimum.map((item, i) => (
            <div
              key={i}
              className="text-body"
              style={{
                padding: '10px 12px',
                borderBottom:
                  i < hardDayMinimum.length - 1 ? '1px solid var(--border-3)' : 'none',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Now / Next / Later — only outside hard-day mode */}
      {!isHardDay && (
        <div style={{ marginBottom: '16px' }}>
          <div
            className="text-micro text-ink-muted"
            style={{ marginBottom: '6px', letterSpacing: '0.05em' }}
          >
            now · next · later
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px',
            }}
          >
            {[
              { label: 'now', event: nowEvent, isPrimary: true },
              { label: 'next', event: nextEvent, isPrimary: false },
              { label: 'later', event: laterEvent, isPrimary: false },
            ].map(({ label, event, isPrimary }) => (
              <div
                key={label}
                style={{
                  border: '1px solid var(--border-2)',
                  borderRadius: '2px',
                  padding: '10px',
                  backgroundColor: isPrimary ? 'var(--color-paper)' : 'transparent',
                }}
              >
                <div
                  className="text-micro text-ink-muted"
                  style={{ marginBottom: '4px', letterSpacing: '0.05em' }}
                >
                  {label}
                </div>
                {event ? (
                  <>
                    <div
                      className="text-body-sm"
                      style={{
                        lineHeight: 1.3,
                        fontWeight: isPrimary ? 500 : 400,
                      }}
                    >
                      {event.emoji ? `${event.emoji} ` : ''}
                      {event.title}
                    </div>
                    {event.time && (
                      <div
                        className="text-micro text-ink-muted"
                        style={{
                          marginTop: '2px',
                          fontFamily: 'var(--font-chrome)',
                        }}
                      >
                        {event.time}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-micro text-ink-muted">—</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
