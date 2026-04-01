'use client';

import React, { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { dailyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { priorities, financeUrgentItems, verbatimCopy, modularNote } from '@/content/guide';
import type { CalendarEvent } from '@/content/types';

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
  return upcoming.slice(0, 5);
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

  const topPriorities = priorities.slice(0, 3);
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

      <div style={{ marginTop: '8px' }}>
        <p className="text-micro text-ink-muted">{verbatimCopy.writtenDown}</p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Urgent Finance Callout */}
      {urgentFinance.length > 0 && (
        <div className="urgent-callout" style={{ marginBottom: '10px' }}>
          <div className="text-micro" style={{ color: 'var(--color-tomato)', marginBottom: '6px', fontWeight: 700 }}>
            ⚠ URGENT FINANCIAL ITEMS
          </div>
          {urgentFinance.map((item, i) => (
            <div key={i} style={{ paddingBottom: i < urgentFinance.length - 1 ? '6px' : 0, borderBottom: i < urgentFinance.length - 1 ? '1px solid var(--color-ink-ghost)' : 'none' }}>
              <div className="text-body-sm font-medium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span>{item.title}</span>
                {item.amount && <span style={{ color: 'var(--color-tomato)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{item.amount}</span>}
              </div>
              <div className="text-micro text-ink-muted">{item.note}</div>
              {item.action && (
                <div className="text-micro" style={{ color: 'var(--color-tangerine)', marginTop: '2px' }}>→ {item.action}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Today's special events */}
      {todayEvents.length > 0 && (
        <WindowPanel title="TODAY'S EVENTS" active style={{ marginBottom: '10px' }}>
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

      {/* Upcoming Events */}
      <WindowPanel title="NEXT UP TODAY" active style={{ marginBottom: '10px' }}>
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
          <p className="text-body-sm text-ink-muted">No more scheduled events today.</p>
        )}
      </WindowPanel>

      {/* Top Priorities */}
      <WindowPanel title="CURRENT FOCUS" style={{ marginBottom: '10px' }}>
        {topPriorities.map((p) => (
          <div
            key={p.rank}
            className="priority-item"
            style={{ borderLeft: p.isUrgent ? '3px solid var(--color-tomato)' : '3px solid var(--color-ink-ghost)', paddingLeft: '8px' }}
          >
            <span className="priority-number">{p.rank}.</span>
            <div style={{ flex: 1 }}>
              <div className="text-body">
                {p.title}
                {p.isLocked && <span className="tag ml-2">locked</span>}
                {p.isUrgent && <span className="tag ml-2" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>}
              </div>
              <div className="text-body-sm text-ink-muted">{p.status} — {p.nextAction}</div>
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* Modular task note */}
      <div style={{ padding: '8px 0' }}>
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>
    </PageShell>
  );
}
