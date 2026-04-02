'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { dailyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { priorities, financeUrgentItems, verbatimCopy, modularNote } from '@/content/guide';
import type { CalendarEvent, CalendarCategory } from '@/content/types';
import type { GCalEvent } from '@/lib/google';

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

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

function getStaticUpcomingEvents(currentMinutes: number): CalendarEvent[] {
  const withTime = dailyEvents.filter((e) => e.time);
  const upcoming = withTime.filter((e) => parseEventTime(e.time!) >= currentMinutes);
  upcoming.sort((a, b) => parseEventTime(a.time!) - parseEventTime(b.time!));
  return upcoming.slice(0, 5);
}

function getStaticTodayEvents(): CalendarEvent[] {
  const todayStr = new Date().toISOString().split('T')[0];
  return aprilOneTimeEvents.filter((e) => e.date === todayStr);
}

// ---------------------------------------------------------------------------
// GCal helpers
// ---------------------------------------------------------------------------

/** Map GCal colorId to app CalendarCategory */
const COLOR_TO_CATEGORY: Record<string, CalendarCategory> = {
  '2':  'sage',
  '3':  'grape',
  '4':  'flamingo',
  '5':  'banana',
  '6':  'tangerine',
  '7':  'peacock',
  '8':  'graphite',
  '9':  'blueberry',
  '10': 'basil',
  '11': 'tomato',
};

function gcalCategory(colorId?: string): CalendarCategory {
  if (!colorId) return 'graphite';
  return COLOR_TO_CATEGORY[colorId] ?? 'graphite';
}

function formatGcalTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles',
    });
  } catch {
    return '';
  }
}

/** Filter live GCal events to those starting at or after currentMinutes today */
function filterUpcomingLive(events: GCalEvent[], currentMinutes: number): GCalEvent[] {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
  return events
    .filter((e) => {
      if (e.allDay) return false;
      const eventDate = new Date(e.start).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
      if (eventDate !== today) return false;
      const d = new Date(e.start);
      const mins = d.getHours() * 60 + d.getMinutes();
      return mins >= currentMinutes;
    })
    .slice(0, 5);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TodayPage() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // --- live data ---
  const [liveEvents, setLiveEvents] = useState<GCalEvent[] | null>(null);
  const [liveError, setLiveError] = useState(false);
  const [digest, setDigest] = useState<string>('');
  const [digestUpdatedAt, setDigestUpdatedAt] = useState<string>('');
  const [digestLoading, setDigestLoading] = useState(true);

  // --- quick-add form ---
  const [addOpen, setAddOpen] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [addDate, setAddDate] = useState('');
  const [addTime, setAddTime] = useState('');
  const [addStatus, setAddStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live calendar
  useEffect(() => {
    fetch('/api/calendar')
      .then((r) => r.json())
      .then((data) => setLiveEvents(data.events ?? null))
      .catch(() => setLiveError(true));
  }, []);

  // Fetch digest
  const fetchDigest = useCallback((bust = false) => {
    setDigestLoading(true);
    const req = bust
      ? fetch('/api/digest', { method: 'DELETE' }).then(() => fetch('/api/digest'))
      : fetch('/api/digest');
    req
      .then((r) => r.json())
      .then((data) => {
        setDigest(data.digest ?? '');
        if (data.generatedAt) {
          const d = new Date(data.generatedAt);
          setDigestUpdatedAt(
            d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
          );
        }
      })
      .catch(() => setDigest(''))
      .finally(() => setDigestLoading(false));
  }, []);

  useEffect(() => { fetchDigest(); }, [fetchDigest]);

  // Derived
  const currentTotalMinutes = currentTime.hours * 60 + currentTime.minutes;
  const today = new Date();
  const dateDisplay = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  const usingLive = liveEvents !== null && !liveError;
  const upcomingEvents = usingLive
    ? filterUpcomingLive(liveEvents, currentTotalMinutes)
    : getStaticUpcomingEvents(currentTotalMinutes);
  const todayStaticEvents = getStaticTodayEvents();

  const topPriorities = priorities.slice(0, 3);
  const urgentFinance = financeUrgentItems.filter((f) => f.isUrgent);

  // Quick-add today's default date
  const todayISO = today.toISOString().split('T')[0];

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!addTitle.trim() || !addTime.trim()) return;
    setAddStatus('saving');

    const dateStr = addDate || todayISO;
    const [hhmm, meridiem] = addTime.trim().split(' ');
    let [hh, mm] = hhmm.split(':').map(Number);
    if (meridiem?.toLowerCase() === 'pm' && hh !== 12) hh += 12;
    if (meridiem?.toLowerCase() === 'am' && hh === 12) hh = 0;
    const pad = (n: number) => String(n).padStart(2, '0');
    const startDateTime = `${dateStr}T${pad(hh)}:${pad(mm || 0)}:00`;
    const endDateTime = `${dateStr}T${pad(hh + 1)}:${pad(mm || 0)}:00`;

    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: addTitle.trim(), startDateTime, endDateTime }),
      });
      if (!res.ok) throw new Error();
      setAddStatus('saved');
      setAddTitle('');
      setAddDate('');
      setAddTime('');
      // Refresh live events
      fetch('/api/calendar')
        .then((r) => r.json())
        .then((data) => setLiveEvents(data.events ?? null));
      setTimeout(() => { setAddStatus('idle'); setAddOpen(false); }, 1500);
    } catch {
      setAddStatus('error');
      setTimeout(() => setAddStatus('idle'), 2000);
    }
  }

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

      {/* Morning Brief */}
      <WindowPanel
        title="MORNING BRIEF"
        statusText={digestUpdatedAt ? `updated ${digestUpdatedAt}` : undefined}
        style={{ marginBottom: '10px' }}
      >
        {digestLoading ? (
          <p className="text-micro text-ink-muted" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            loading...
          </p>
        ) : digest ? (
          <>
            <p className="text-body" style={{ lineHeight: '1.6' }}>{digest}</p>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => fetchDigest(true)}
                style={{
                  background: 'var(--color-chrome)',
                  border: '1px solid var(--color-ink-ghost)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--color-ink)',
                  padding: '3px 8px',
                  cursor: 'pointer',
                }}
              >
                refresh
              </button>
            </div>
          </>
        ) : (
          <p className="text-micro text-ink-muted">
            No digest available.{' '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Set ANTHROPIC_API_KEY to enable.
            </span>
          </p>
        )}
      </WindowPanel>

      {/* Urgent Finance Callout */}
      {urgentFinance.length > 0 && (
        <div className="urgent-callout" style={{ marginBottom: '10px' }}>
          <div className="text-micro" style={{ color: 'var(--color-tomato)', marginBottom: '6px', fontWeight: 700 }}>
            ⚠ URGENT FINANCIAL ITEMS
          </div>
          {urgentFinance.map((item, i) => (
            <div
              key={i}
              style={{
                paddingBottom: i < urgentFinance.length - 1 ? '6px' : 0,
                borderBottom: i < urgentFinance.length - 1 ? '1px solid var(--color-ink-ghost)' : 'none',
              }}
            >
              <div className="text-body-sm font-medium" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title}</span>
                {item.amount && (
                  <span style={{ color: 'var(--color-tomato)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                    {item.amount}
                  </span>
                )}
              </div>
              <div className="text-micro text-ink-muted">{item.note}</div>
              {item.action && (
                <div className="text-micro" style={{ color: 'var(--color-tangerine)', marginTop: '2px' }}>
                  → {item.action}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Today's one-time events (static — from content/calendar.ts) */}
      {todayStaticEvents.length > 0 && (
        <WindowPanel title="TODAY'S EVENTS" active style={{ marginBottom: '10px' }}>
          {todayStaticEvents.map((event) => (
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

      {/* Upcoming Events — live or static fallback */}
      <WindowPanel
        title="NEXT UP TODAY"
        active
        statusText={liveError || (!usingLive && liveEvents === null && !liveError) ? undefined : usingLive ? 'live' : 'offline — showing saved data'}
        style={{ marginBottom: '10px' }}
      >
        {liveEvents === null && !liveError ? (
          <p className="text-micro text-ink-muted" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            loading...
          </p>
        ) : usingLive && upcomingEvents.length > 0 ? (
          (upcomingEvents as GCalEvent[]).map((event) => (
            <TimeBlock
              key={event.id}
              time={formatGcalTime(event.start)}
              title={event.summary}
              category={gcalCategory(event.colorId)}
            />
          ))
        ) : !usingLive && (upcomingEvents as CalendarEvent[]).length > 0 ? (
          (upcomingEvents as CalendarEvent[]).map((event) => (
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
            style={{
              borderLeft: p.isUrgent
                ? '3px solid var(--color-tomato)'
                : '3px solid var(--color-ink-ghost)',
              paddingLeft: '8px',
            }}
          >
            <span className="priority-number">{p.rank}.</span>
            <div style={{ flex: 1 }}>
              <div className="text-body">
                {p.title}
                {p.isLocked && <span className="tag ml-2">locked</span>}
                {p.isUrgent && (
                  <span
                    className="tag ml-2"
                    style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}
                  >
                    urgent
                  </span>
                )}
              </div>
              <div className="text-body-sm text-ink-muted">
                {p.status} — {p.nextAction}
              </div>
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* Quick-Add to Calendar */}
      <WindowPanel title={addOpen ? '+ ADD TO CALENDAR ▴' : '+ ADD TO CALENDAR ▾'} style={{ marginBottom: '10px' }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setAddOpen((o) => !o)}
          onKeyDown={(e) => e.key === 'Enter' && setAddOpen((o) => !o)}
          style={{ cursor: 'pointer', marginBottom: addOpen ? '12px' : 0 }}
          aria-expanded={addOpen}
        >
          <span className="text-micro text-ink-muted">
            {addOpen ? 'tap to close' : 'tap to add an event to Google Calendar'}
          </span>
        </div>
        {addOpen && (
          <form onSubmit={handleAddEvent}>
            {[
              { label: 'Title', value: addTitle, setter: setAddTitle, placeholder: 'Event title', required: true },
              { label: 'Date', value: addDate, setter: setAddDate, placeholder: todayISO + ' (leave blank for today)', required: false },
              { label: 'Time', value: addTime, setter: setAddTime, placeholder: '9:00am', required: true },
            ].map(({ label, value, setter, placeholder, required }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                <label
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--color-ink-muted)',
                    width: '40px',
                    flexShrink: 0,
                  }}
                >
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  style={{
                    flex: 1,
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-ink-ghost)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-ink)',
                    padding: '4px 8px',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-forest)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-ink-ghost)')}
                />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={addStatus === 'saving'}
                style={{
                  background: 'var(--color-chrome)',
                  border: '1px solid var(--color-ink-ghost)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: addStatus === 'saved' ? 'var(--color-forest)' : addStatus === 'error' ? 'var(--color-tomato)' : 'var(--color-ink)',
                  padding: '5px 14px',
                  cursor: addStatus === 'saving' ? 'wait' : 'pointer',
                  minHeight: '32px',
                }}
              >
                {addStatus === 'saving' ? 'saving...' : addStatus === 'saved' ? 'added ✓' : addStatus === 'error' ? 'error' : 'Add'}
              </button>
            </div>
          </form>
        )}
      </WindowPanel>

      {/* Modular task note */}
      <div style={{ padding: '8px 0' }}>
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>
    </PageShell>
  );
}
