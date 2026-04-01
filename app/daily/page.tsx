import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { dailyEvents, everyTwoDaysEvents } from '@/content/calendar';
import { modularNote, verbatimCopy } from '@/content/guide';

export default function DailyPage() {
  // Sort daily events by time
  const sortedDaily = [...dailyEvents].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    const parseTime = (t: string) => {
      const m = t.match(/^(\d+):(\d+)(am|pm)$/i);
      if (!m) return 0;
      let h = parseInt(m[1]);
      const min = parseInt(m[2]);
      const mer = m[3].toLowerCase();
      if (mer === 'pm' && h !== 12) h += 12;
      if (mer === 'am' && h === 12) h = 0;
      return h * 60 + min;
    };
    return parseTime(a.time) - parseTime(b.time);
  });

  const morningEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const h = parseInt(e.time.split(':')[0]);
    const isPM = e.time.toLowerCase().includes('pm');
    const hour24 = isPM && h !== 12 ? h + 12 : (!isPM && h === 12 ? 0 : h);
    return hour24 < 12;
  });

  const afternoonEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const m = e.time.match(/^(\d+):(\d+)(am|pm)$/i);
    if (!m) return false;
    let h = parseInt(m[1]);
    const mer = m[3].toLowerCase();
    if (mer === 'pm' && h !== 12) h += 12;
    if (mer === 'am' && h === 12) h = 0;
    return h >= 12 && h < 18;
  });

  const eveningEvents = sortedDaily.filter((e) => {
    if (!e.time) return false;
    const m = e.time.match(/^(\d+):(\d+)(am|pm)$/i);
    if (!m) return false;
    let h = parseInt(m[1]);
    const mer = m[3].toLowerCase();
    if (mer === 'pm' && h !== 12) h += 12;
    if (mer === 'am' && h === 12) h = 0;
    return h >= 18;
  });

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Daily Rhythm</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Your full daily schedule — every recurring event.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Modular note */}
      <div
        style={{
          borderLeft: '3px solid var(--color-graphite)',
          paddingLeft: '10px',
          marginBottom: '10px',
        }}
      >
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>

      {/* Morning */}
      <WindowPanel title="MORNING" style={{ marginBottom: '10px' }}>
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

      {/* Afternoon */}
      <WindowPanel title="AFTERNOON" style={{ marginBottom: '10px' }}>
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

      {/* Evening */}
      <WindowPanel title="EVENING" style={{ marginBottom: '10px' }}>
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

      {/* Every 2 days */}
      <WindowPanel title="EVERY 2 DAYS" style={{ marginBottom: '10px' }}>
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

      {/* Non-negotiables callout */}
      <div
        style={{
          border: '1px solid var(--color-tomato)',
          borderRadius: '2px',
          padding: '12px',
          marginBottom: '10px',
        }}
      >
        <div className="text-micro" style={{ color: 'var(--color-tomato)', marginBottom: '6px', fontWeight: 700 }}>
          NON-NEGOTIABLES (DOUBLE ALARM)
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
        <p className="text-micro text-ink-muted italic">{verbatimCopy.hardDay}</p>
      </div>
    </PageShell>
  );
}
