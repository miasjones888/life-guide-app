'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import AddEventSheet from '@/components/calendar/AddEventSheet';
import { monthlyEvents, aprilOneTimeEvents, monthlyBudgetSteps } from '@/content/calendar';
import { useLocalEvents } from '@/hooks/useLocalEvents';
import type { CalendarCategory } from '@/content/types';

// Map CalendarCategory → CSS variable color
const CATEGORY_COLORS: Record<CalendarCategory, string> = {
  tomato: 'var(--color-tomato)',
  grape: 'var(--color-grape)',
  blueberry: 'var(--color-blueberry)',
  basil: 'var(--color-basil)',
  banana: 'var(--color-banana)',
  flamingo: 'var(--color-flamingo)',
  graphite: 'var(--color-graphite)',
  tangerine: 'var(--color-tangerine)',
  peacock: 'var(--color-peacock)',
  sage: 'var(--color-sage)',
};

/** Parse an ISO date string (YYYY-MM-DD) as local time to avoid UTC offset issues. */
function formatLocalDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
}

export default function MonthlyPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { localEvents, addEvent, deleteEvent } = useLocalEvents();

  const firstSundayEvents = monthlyEvents.filter(
    (e) => e.monthlyRule?.type === 'nth-weekday' && e.monthlyRule.weekday === 'sunday' && e.monthlyRule.nth === 1
  );
  const firstFridayEvents = monthlyEvents.filter(
    (e) => e.monthlyRule?.type === 'nth-weekday' && e.monthlyRule.weekday === 'friday'
  );
  const dayOfMonthEvents = monthlyEvents.filter((e) => e.monthlyRule?.type === 'day-of-month');
  const lastDayEvents = monthlyEvents.filter((e) => e.monthlyRule?.type === 'last-day');
  const intervalEvents = monthlyEvents.filter((e) => e.recurrence === 'interval');
  const noRuleMonthly = monthlyEvents.filter((e) => !e.monthlyRule && e.recurrence !== 'interval');

  // April one-time events grouped by date
  const aprilByDate: Record<string, typeof aprilOneTimeEvents> = {};
  aprilOneTimeEvents.forEach((event) => {
    const d = event.date || 'unknown';
    if (!aprilByDate[d]) aprilByDate[d] = [];
    aprilByDate[d].push(event);
  });

  // User events grouped by date
  const userByDate: Record<string, typeof localEvents> = {};
  localEvents.forEach((event) => {
    const d = event.date || 'unknown';
    if (!userByDate[d]) userByDate[d] = [];
    userByDate[d].push(event);
  });

  // Combined sorted dates
  const allDates = Array.from(
    new Set([...Object.keys(aprilByDate), ...Object.keys(userByDate)])
  ).sort();

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Monthly Rhythm</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Recurring structure, budget reset, and the month's one-time items.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Monthly recurring */}
      <WindowPanel title="monthly recurring" style={{ marginBottom: '10px' }}>
        {firstSundayEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              first sunday
            </div>
            {firstSundayEvents.map((e) => (
              <TimeBlock key={e.id} time={e.time} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {dayOfMonthEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              fixed dates
            </div>
            {dayOfMonthEvents.map((e) => (
              <div key={e.id} className="time-block">
                <div className="time-label">
                  {e.monthlyRule?.day ? `${e.monthlyRule.day}th` : ''}
                </div>
                <div style={{ flex: 1, paddingLeft: '10px', borderLeft: '3px solid var(--color-banana)' }}>
                  <div className="text-body">
                    {e.emoji && <span className="mr-1">{e.emoji}</span>}
                    {e.title}
                  </div>
                </div>
              </div>
            ))}
            {lastDayEvents.map((e) => (
              <div key={e.id} className="time-block">
                <div className="time-label">last day</div>
                <div style={{ flex: 1, paddingLeft: '10px', borderLeft: '3px solid var(--color-banana)' }}>
                  <div className="text-body">
                    {e.emoji && <span className="mr-1">{e.emoji}</span>}
                    {e.title}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {firstFridayEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              first friday
            </div>
            {firstFridayEvents.map((e) => (
              <TimeBlock key={e.id} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {noRuleMonthly.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              monthly (no fixed date)
            </div>
            {noRuleMonthly.map((e) => (
              <TimeBlock key={e.id} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {intervalEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              recurring intervals
            </div>
            {intervalEvents.map((e) => (
              <div key={e.id} className="time-block">
                <div className="time-label text-micro text-ink-muted">
                  every {e.intervalDays}d
                </div>
                <div style={{ flex: 1, paddingLeft: '10px', borderLeft: '3px solid var(--color-tomato)' }}>
                  <div className="text-body">
                    {e.emoji && <span className="mr-1">{e.emoji}</span>}
                    {e.title}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </WindowPanel>

      {/* Budget Reset Steps */}
      <WindowPanel title="monthly reset" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Budget hour. First Sunday of the month.
        </div>
        {monthlyBudgetSteps.map((step) => (
          <div key={step.order} className="priority-item">
            <span className="priority-number">{step.order}.</span>
            <div>
              <div className="text-body">{step.title}</div>
              <div className="text-body-sm text-ink-muted">{step.description}</div>
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* One-Time Events (static + user-created) */}
      <WindowPanel title="one-time events" style={{ marginBottom: '10px' }}>
        <div
          style={{
            paddingBottom: '6px',
            borderBottom: '1px solid var(--color-ink-ghost)',
            marginBottom: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="text-micro text-ink-muted">Dates with flags require action.</span>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: 'var(--color-forest)',
              background: 'none',
              border: '1px solid var(--color-forest)',
              borderRadius: '2px',
              padding: '3px 8px',
              cursor: 'pointer',
            }}
          >
            + add event
          </button>
        </div>

        {allDates.length === 0 && (
          <p className="text-body-sm text-ink-muted">No one-time events.</p>
        )}

        {allDates.map((dateStr) => {
          const staticEvents = aprilByDate[dateStr] ?? [];
          const customEvents = userByDate[dateStr] ?? [];
          const dateLabel = formatLocalDateLabel(dateStr);
          const hasUrgent = staticEvents.some((e) => e.isUrgent);

          return (
            <div key={dateStr} style={{ marginBottom: '8px' }}>
              <div
                className="text-micro"
                style={{
                  paddingBottom: '4px',
                  borderBottom: '1px solid var(--color-ink-ghost)',
                  marginBottom: '4px',
                  color: hasUrgent ? 'var(--color-tangerine)' : 'var(--color-ink-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{dateLabel}</span>
                {hasUrgent && <span style={{ color: 'var(--color-tangerine)' }}>flag</span>}
              </div>

              {staticEvents.map((event) => (
                <TimeBlock
                  key={event.id}
                  time={event.time}
                  title={event.title}
                  emoji={event.emoji}
                  category={event.category}
                  isUrgent={event.isUrgent}
                />
              ))}

              {customEvents.map((event) => (
                <div
                  key={event.id}
                  className="time-block"
                  style={{ borderLeft: `3px solid ${CATEGORY_COLORS[event.category]}`, paddingLeft: '10px' }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      className="text-body"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}
                    >
                      {event.time && (
                        <span className="time-label" style={{ marginRight: '4px' }}>{event.time}</span>
                      )}
                      <span>{event.title}</span>
                      <span className="tag" style={{ borderColor: 'var(--color-ink-ghost)', color: 'var(--color-ink-muted)' }}>
                        custom
                      </span>
                    </div>
                    {event.note && (
                      <div className="text-body-sm text-ink-muted">{event.note}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteEvent(event.id)}
                    aria-label={`Delete ${event.title}`}
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '10px',
                      color: 'var(--color-ink-ghost)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </WindowPanel>

      <AddEventSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addEvent}
      />
    </PageShell>
  );
}
