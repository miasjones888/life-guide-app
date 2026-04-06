'use client';

import React, { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import AssistantPanel from '@/components/ui/AssistantPanel';
import { dailyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { priorities, financeUrgentItems, verbatimCopy, modularNote } from '@/content/guide';
import type { CalendarEvent } from '@/content/types';

const MORNING_STEPS = [
  { id: 'morning-journal', label: 'Morning pages / journal (20 min)' },
  { id: 'morning-read', label: 'Reading before screens (even 10 min)' },
  { id: 'morning-skincare', label: 'Morning skincare (cleanser + SPF) — on a hard day: just those two. Done.' },
  { id: 'morning-catmeds', label: 'Cat morning meds (Maisie + Meeko) + wet food by 10am' },
  { id: 'morning-breakfast', label: 'Breakfast — no appetite is okay, grab something small from the shelf' },
];

const EVENING_STEPS = [
  { id: 'evening-dinner', label: 'Dinner — no cooking required. Delivery, fridge, frozen, or shelf snacks. You just need to eat something.' },
  { id: 'evening-catplay', label: 'PM cat playtime (10–15 min). Check on water fountain while you\'re in the zone.' },
  { id: 'evening-shower', label: 'Shower check-in — get in, warm water, body wash, get out. That is the whole task.' },
  { id: 'evening-catmeds', label: 'Cat evening meds + dinner + scoop litter (Maisie + Meeko)' },
  { id: 'evening-meds', label: 'Your bedtime meds (9:30pm). PRN anxiety meds accessible.' },
  { id: 'evening-skincare', label: 'Night skincare — two steps minimum: cleanser + moisturiser.' },
  { id: 'evening-anchor', label: 'Write tomorrow\'s anchor task in your notebook' },
];

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
  const [anchorTask, setAnchorTask] = useState('');
  const [dimmedSteps, setDimmedSteps] = useState<Set<string>>(new Set());
  const todayEvents = getTodayAprilEvents();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('anchor-task');
      if (stored) setAnchorTask(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const key = 'checklist-' + new Date().toDateString();
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        setDimmedSteps(new Set(ids));
      }
    } catch {}
  }, []);

  function toggleStep(id: string) {
    const key = 'checklist-' + new Date().toDateString();
    setDimmedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(key, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  }

  function handleAnchorChange(v: string) {
    setAnchorTask(v);
    try { localStorage.setItem('anchor-task', v); } catch {}
  }

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

  const isMorning = currentTime.hours >= 7 && currentTime.hours < 12;
  const isEvening = currentTime.hours >= 18 && currentTime.hours <= 22;
  const checklistSteps = isMorning ? MORNING_STEPS : isEvening ? EVENING_STEPS : null;
  const checklistTitle = isMorning ? 'morning' : 'evening';

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

      {/* Anchor task */}
      <div style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>
          anchor task
        </div>
        <input
          type="text"
          value={anchorTask}
          onChange={(e) => handleAnchorChange(e.target.value)}
          placeholder="The one thing you're doing today."
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--color-ink-ghost)',
            padding: '6px 0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'var(--color-ink)',
            outline: 'none',
          }}
        />
      </div>

      {/* Morning / Evening position tracking */}
      {checklistSteps && (
        <WindowPanel title={checklistTitle} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {checklistSteps.map((step) => {
              const isDimmed = dimmedSteps.has(step.id);
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--color-ink-ghost)',
                    padding: '8px 0',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-ink)',
                    cursor: 'pointer',
                    opacity: isDimmed ? 0.4 : 1,
                    lineHeight: 1.5,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {step.label}
                </button>
              );
            })}
          </div>
        </WindowPanel>
      )}

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

      {/* GPT assistant */}
      <WindowPanel title="assistant" style={{ marginBottom: '10px' }}>
        <AssistantPanel />
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
