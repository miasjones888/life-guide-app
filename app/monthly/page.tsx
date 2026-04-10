'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import { monthlyEvents, aprilOneTimeEvents, monthlyBudgetSteps } from '@/content/calendar';
import { useLocalEvents } from '@/hooks/useLocalEvents';
import type { CalendarCategory } from '@/content/types';

const CATEGORIES: CalendarCategory[] = ['flamingo', 'banana', 'tomato', 'blueberry', 'basil', 'grape', 'tangerine', 'graphite', 'peacock', 'sage'];

export default function MonthlyPage() {
  const { localEvents, addEvent, deleteEvent } = useLocalEvents();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '', category: 'flamingo' as CalendarCategory, note: '', isUrgent: false });

  function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    addEvent({ title: form.title.trim(), date: form.date, time: form.time || undefined, category: form.category, note: form.note.trim() || undefined, isUrgent: form.isUrgent });
    setForm({ title: '', date: '', time: '', category: 'flamingo', note: '', isUrgent: false });
    setShowForm(false);
  }
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

      {/* April 2026 One-Time Events */}
      <WindowPanel title="april 2026" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          One-time events. Dates with flags require action.
        </div>
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
                  color: hasUrgent ? 'var(--color-tangerine)' : 'var(--color-ink-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{dateLabel}</span>
                {hasUrgent && <span style={{ color: 'var(--color-tangerine)' }}>flag</span>}
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

      {/* User-added events */}
      <WindowPanel title="add event" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          One-time events saved on this device. No redeploy needed.
        </div>

        {localEvents.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            {localEvents.sort((a, b) => (a.date ?? '') < (b.date ?? '') ? -1 : 1).map((ev) => (
              <div key={ev.id} className="time-block" style={{ alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div className="text-body-sm" style={{ fontWeight: 500 }}>{ev.title}</div>
                  <div className="text-micro text-ink-muted">{ev.date}{ev.time ? ` · ${ev.time}` : ''}</div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteEvent(ev.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)', padding: '4px 8px', minHeight: '44px' }}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        )}

        {!showForm ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            style={{ border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', background: 'transparent', color: 'var(--color-ink-muted)', padding: '8px 14px', fontFamily: 'Courier New, monospace', fontSize: '12px', cursor: 'pointer', minHeight: '44px' }}
          >
            + Add event
          </button>
        ) : (
          <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'title', type: 'text', key: 'title', placeholder: 'Event title', required: true },
              { label: 'date', type: 'date', key: 'date', placeholder: '', required: true },
              { label: 'time', type: 'time', key: 'time', placeholder: '', required: false },
              { label: 'note', type: 'text', key: 'note', placeholder: 'Optional note', required: false },
            ].map(({ label, type, key, placeholder, required }) => (
              <div key={key}>
                <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>{label}</div>
                <input
                  type={type}
                  required={required}
                  placeholder={placeholder}
                  value={String((form as Record<string, unknown>)[key] ?? '')}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', padding: '6px 8px', fontFamily: 'system-ui', fontSize: '14px', color: 'var(--color-ink)', outline: 'none' }}
                />
              </div>
            ))}
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>category</div>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as CalendarCategory }))}
                style={{ width: '100%', backgroundColor: 'var(--color-chrome)', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', padding: '6px 8px', fontFamily: 'Courier New, monospace', fontSize: '12px', color: 'var(--color-ink)', outline: 'none' }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', minHeight: '44px' }}>
              <input type="checkbox" checked={form.isUrgent} onChange={(e) => setForm((f) => ({ ...f, isUrgent: e.target.checked }))} />
              <span className="text-body-sm text-ink-muted">Mark as urgent</span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', background: 'transparent', color: 'var(--color-ink)', padding: '8px 16px', fontFamily: 'Courier New, monospace', fontSize: '12px', cursor: 'pointer', minHeight: '44px' }}>
                save event
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)', padding: '8px', minHeight: '44px' }}>
                cancel
              </button>
            </div>
          </form>
        )}
      </WindowPanel>
    </PageShell>
  );
}
