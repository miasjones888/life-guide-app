'use client';

import React, { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { dailyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { priorities, financeUrgentItems, verbatimCopy, modularNote } from '@/content/guide';
import type { CalendarEvent } from '@/content/types';

const WEEKLY_FOCUS: Record<number, string> = {
  0: 'life planning reset',
  1: 'portfolio work',
  2: 'notion R&D + life admin',
  3: 'notion R&D + portfolio work',
  4: 'buffer / life admin',
  5: 'systems work',
  6: 'creative exploration',
};

function getCurrentTime(): { hours: number; minutes: number; display: string } {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    display: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
}

function parseEventTime(time: string): number {
  const match = time.match(/^(\d+):(\d+)(am|pm)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const meridiem = match[3].toLowerCase();
  if (meridiem === 'pm' && hours !== 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function getUpcomingEvents(currentMinutes: number): CalendarEvent[] {
  const withTime = dailyEvents.filter((e) => e.time);
  const upcoming = withTime.filter((e) => {
    const eventMinutes = parseEventTime(e.time!);
    return eventMinutes >= currentMinutes;
  });
  upcoming.sort((a, b) => parseEventTime(a.time!) - parseEventTime(b.time!));
  return upcoming.slice(0, 3);
}

function getTodayAprilEvents(): CalendarEvent[] {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return aprilOneTimeEvents.filter((e) => e.date === todayStr);
}

export default function TodayPage() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const todayEvents = getTodayAprilEvents();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentTotalMinutes = currentTime.hours * 60 + currentTime.minutes;
  const upcomingEvents = getUpcomingEvents(currentTotalMinutes);

  const today = new Date();
  const dateDisplay = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const weekday = today.getDay();
  const dailyFocus = WEEKLY_FOCUS[weekday];
  const nonNegotiables = dailyEvents.filter((e) => e.isNonNegotiable && e.time);
  const topPriority = priorities.find((p) => !p.isLocked) ?? priorities[0];
  const groundingPhrase =
    currentTime.hours < 12
      ? verbatimCopy.nonNegotiable
      : currentTime.hours < 18
      ? verbatimCopy.writtenDown
      : verbatimCopy.wholeTask;

  const urgentFinance = financeUrgentItems.filter((f) => f.isUrgent);

  return (
    <PageShell>
      {/* Header */}
      <div style={{ padding: '8px 0 4px' }}>
        <div className="text-display" style={{ lineHeight: 1.1 }}>
          {currentTime.display}
        </div>
        <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>
          {dateDisplay}
        </div>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Your brief */}
      <WindowPanel
        title="your brief"
        active
        statusText={`${today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()} · ${dailyFocus}`}
        style={{ marginBottom: '10px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Anchor points */}
          <div>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>
              anchor points
            </div>
            {nonNegotiables.map((e) => (
              <div key={e.id} style={{ display: 'flex', gap: '10px', padding: '2px 0' }}>
                <span
                  className="text-micro text-ink-muted"
                  style={{ fontFamily: 'JetBrains Mono, monospace', minWidth: '52px' }}
                >
                  {e.time}
                </span>
                <span className="text-body-sm">{e.emoji} {e.title}</span>
              </div>
            ))}
          </div>

          {/* Priority */}
          <div>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>
              priority
            </div>
            <div className="text-body-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>→ {topPriority.title}</span>
              {topPriority.isUrgent && (
                <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>
                  urgent
                </span>
              )}
            </div>
          </div>

          {/* Grounding phrase */}
          <p
            className="text-micro text-ink-muted"
            style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '8px', margin: 0 }}
          >
            {groundingPhrase}
          </p>
        </div>
      </WindowPanel>

      {/* Today's special events */}
      {todayEvents.length > 0 && (
        <WindowPanel title="today" style={{ marginBottom: '10px' }}>
          {todayEvents.map((event) => (
            <TimeBlock
              key={event.id}
              time={event.time}
              title={event.title}
              emoji={event.emoji}
              category={event.category}
              isUrgent={event.isUrgent}
            />
          ))}
        </WindowPanel>
      )}

      {/* Coming up */}
      <WindowPanel title="coming up" style={{ marginBottom: '10px' }}>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <TimeBlock
              key={event.id}
              time={event.time}
              title={event.title}
              emoji={event.emoji}
              category={event.category}
              isNonNegotiable={event.isNonNegotiable}
              doubleAlarm={event.doubleAlarm}
              note={event.note}
            />
          ))
        ) : (
          <p className="text-body-sm text-ink-muted">That's everything for today.</p>
        )}
      </WindowPanel>

      {/* What matters now */}
      <WindowPanel title="what matters now" style={{ marginBottom: '10px' }}>
        {priorities.slice(0, 3).map((p) => (
          <div
            key={p.rank}
            className="priority-item"
            style={{ borderLeft: p.isUrgent ? '3px solid var(--color-tomato)' : '3px solid var(--color-ink-ghost)', paddingLeft: '8px' }}
          >
            <span className="priority-number">{p.rank}.</span>
            <div style={{ flex: 1 }}>
              <div className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span>{p.title}</span>
                {p.isLocked && <span className="tag">locked</span>}
                {p.isUrgent && <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>}
              </div>
              <div className="text-body-sm text-ink-muted">{p.status} — {p.nextAction}</div>
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* Finance — system dialog register, bottom */}
      {urgentFinance.length > 0 && (
        <div className="system-dialog" style={{ marginBottom: '10px' }}>
          <div className="text-micro text-ink-muted" style={{ marginBottom: '6px' }}>
            finance
          </div>
          {urgentFinance.map((item, i) => (
            <div key={i} style={{ paddingBottom: i < urgentFinance.length - 1 ? '6px' : 0, borderBottom: i < urgentFinance.length - 1 ? '1px solid var(--color-ink-ghost)' : 'none' }}>
              <div className="text-body-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span>{item.title}</span>
                {item.amount && <span style={{ color: 'var(--color-ink-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{item.amount}</span>}
              </div>
              <div className="text-micro text-ink-muted">{item.note}</div>
              {item.action && (
                <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>→ {item.action}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Closing phrase */}
      <div style={{ padding: '8px 0' }}>
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>
    </PageShell>
  );
}
