'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { dailyEvents, everyTwoDaysEvents } from '@/content/calendar';
import { modularNote, verbatimCopy, priorities } from '@/content/guide';

function parseTime(t: string): number {
  const m = t.match(/^(\d+):(\d+)(am|pm)$/i);
  if (!m) return 0;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const mer = m[3].toLowerCase();
  if (mer === 'pm' && h !== 12) h += 12;
  if (mer === 'am' && h === 12) h = 0;
  return h * 60 + min;
}

export default function DailyPage() {
  const [anchorMode, setAnchorMode] = useState(false);

  const sortedDaily = [...dailyEvents].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    return parseTime(a.time) - parseTime(b.time);
  });

  const morningEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const h = parseTime(e.time);
    return h < 12 * 60;
  });

  const afternoonEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const h = parseTime(e.time);
    return h >= 12 * 60 && h < 18 * 60;
  });

  const eveningEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const h = parseTime(e.time);
    return h >= 18 * 60;
  });

  const nonNegotiables = sortedDaily.filter((e) => e.isNonNegotiable);
  const topPriority = priorities.find((p) => !p.isLocked) ?? priorities[0];

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="text-h1">Daily Rhythm</h1>
          <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
            Your full daily schedule — every recurring event.
          </p>
        </div>
        <button
          onClick={() => setAnchorMode((v) => !v)}
          style={{
            marginTop: '4px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            padding: '4px 10px',
            border: '1px solid',
            borderRadius: '2px',
            cursor: 'pointer',
            minHeight: '32px',
            flexShrink: 0,
            backgroundColor: anchorMode ? 'var(--color-ink)' : 'transparent',
            borderColor: anchorMode ? 'var(--color-ink)' : 'var(--color-ink-ghost)',
            color: anchorMode ? '#fff' : 'var(--color-ink-muted)',
          }}
        >
          {anchorMode ? 'anchor mode' : 'full view'}
        </button>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {anchorMode ? (
        /* Anchor mode — non-negotiables + top priority only */
        <>
          <div className="system-dialog" style={{ marginBottom: '10px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '8px', fontWeight: 700 }}>
              anchor points
            </div>
            {nonNegotiables.map((e) => (
              <div key={e.id} style={{ display: 'flex', gap: '10px', padding: '4px 0' }}>
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

          <div className="system-dialog" style={{ marginBottom: '10px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '6px', fontWeight: 700 }}>
              priority
            </div>
            <div className="text-body-sm">→ {topPriority.title}</div>
          </div>

          <p className="text-micro text-ink-muted" style={{ padding: '8px 0' }}>
            {verbatimCopy.hardDay}
          </p>
        </>
      ) : (
        /* Full view */
        <>
          <div
            style={{
              borderLeft: '3px solid var(--color-graphite)',
              paddingLeft: '10px',
              marginBottom: '10px',
            }}
          >
            <p className="text-micro text-ink-muted">{modularNote}</p>
          </div>

          <WindowPanel title="morning" style={{ marginBottom: '10px' }}>
            {morningEvents.map((event) => (
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
            ))}
          </WindowPanel>

          <WindowPanel title="afternoon" style={{ marginBottom: '10px' }}>
            {afternoonEvents.map((event) => (
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
            ))}
          </WindowPanel>

          <WindowPanel title="evening" style={{ marginBottom: '10px' }}>
            {eveningEvents.map((event) => (
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
            ))}
          </WindowPanel>

          <WindowPanel title="every 2 days" style={{ marginBottom: '10px' }}>
            {everyTwoDaysEvents.map((event) => (
              <TimeBlock
                key={event.id}
                title={event.title}
                emoji={event.emoji}
                category={event.category}
                note={event.note}
              />
            ))}
          </WindowPanel>

          {/* Non-negotiables reference — system dialog register */}
          <div className="system-dialog" style={{ marginBottom: '10px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '6px', fontWeight: 700 }}>
              anchor points (double alarm)
            </div>
            <div className="text-body-sm" style={{ marginBottom: '4px' }}>
              🐱 9:00am — Cat Morning Meds
            </div>
            <div className="text-body-sm" style={{ marginBottom: '4px' }}>
              🐱 9:00pm — Cat Evening Meds + Dinner + Litter
            </div>
            <div className="text-body-sm" style={{ marginBottom: '8px' }}>
              💊 9:30pm — Your Bedtime Meds
            </div>
            <p className="text-micro text-ink-muted">{verbatimCopy.hardDay}</p>
          </div>
        </>
      )}
    </PageShell>
  );
}
