import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { monthlyEvents, aprilOneTimeEvents, monthlyBudgetSteps } from '@/content/calendar';

export default function MonthlyPage() {
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
  const sortedDates = Object.keys(aprilByDate).sort();

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Monthly System</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Recurring monthly events, budget process, and April 2026 one-time items.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Monthly recurring */}
      <WindowPanel title="MONTHLY RECURRING" style={{ marginBottom: '10px' }}>
        {firstSundayEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              First Sunday
            </div>
            {firstSundayEvents.map((e) => (
              <TimeBlock key={e.id} time={e.time} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {dayOfMonthEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              Fixed Dates
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
                <div className="time-label">Last day</div>
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
              First Friday
            </div>
            {firstFridayEvents.map((e) => (
              <TimeBlock key={e.id} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {noRuleMonthly.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              Monthly (no fixed date)
            </div>
            {noRuleMonthly.map((e) => (
              <TimeBlock key={e.id} title={e.title} emoji={e.emoji} category={e.category} />
            ))}
          </>
        )}

        {intervalEvents.length > 0 && (
          <>
            <div className="text-micro text-ink-muted" style={{ paddingTop: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
              Recurring Intervals
            </div>
            {intervalEvents.map((e) => (
              <div key={e.id} className="time-block">
                <div className="time-label text-micro text-ink-muted">
                  Every {e.intervalDays}d
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

      {/* Budget Hour Steps */}
      <WindowPanel title="MONTHLY RESET — BUDGET HOUR STEPS" style={{ marginBottom: '10px' }}>
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

      {/* April 2026 One-Time Events */}
      <WindowPanel title="APRIL 2026 — ONE-TIME EVENTS" style={{ marginBottom: '10px' }}>
        {sortedDates.map((dateStr) => {
          const events = aprilByDate[dateStr];
          const dateObj = new Date(dateStr + 'T12:00:00');
          const dateLabel = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          });
          const hasUrgent = events.some((e) => e.isUrgent);

          return (
            <div key={dateStr} style={{ marginBottom: '8px' }}>
              <div
                className="text-micro"
                style={{
                  paddingBottom: '4px',
                  borderBottom: '1px solid var(--color-ink-ghost)',
                  marginBottom: '4px',
                  color: hasUrgent ? 'var(--color-tomato)' : 'var(--color-ink-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{dateLabel}</span>
                {hasUrgent && <span style={{ color: 'var(--color-tomato)' }}>URGENT</span>}
              </div>
              {events.map((event) => (
                <TimeBlock
                  key={event.id}
                  time={event.time}
                  title={event.title}
                  emoji={event.emoji}
                  category={event.category}
                  isUrgent={event.isUrgent}
                />
              ))}
            </div>
          );
        })}
      </WindowPanel>
    </PageShell>
  );
}
