'use client';

import React, { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import TimeBlock from '@/components/ui/TimeBlock';
import AssistantPanel from '@/components/ui/AssistantPanel';
import { dailyEvents, aprilOneTimeEvents } from '@/content/calendar';
import { priorities, financeUrgentItems, verbatimCopy, modularNote, groundingPhrases, groundingBreathing } from '@/content/guide';
import type { CalendarEvent } from '@/content/types';
import { parseEventTime } from '@/lib/time';
import { usePriorityStatus } from '@/hooks/usePriorityStatus';
import { useHardDay } from '@/context/HardDayContext';
import { useLocalEvents } from '@/hooks/useLocalEvents';

type ChecklistStep = { id: string; label: string; note?: string; isCritical?: boolean };

const MORNING_STEPS: ChecklistStep[] = [
  { id: 'morning-journal', label: 'Morning pages / journal (20 min)', note: verbatimCopy.protectedTime },
  { id: 'morning-read', label: 'Reading before screens (even 10 min)' },
  { id: 'morning-skincare', label: 'Morning skincare — cleanser + SPF', note: verbatimCopy.hardDay },
  { id: 'morning-catmeds', label: 'Cat morning meds (Maisie + Meeko) + wet food by 10am', isCritical: true },
  { id: 'morning-breakfast', label: 'Breakfast — no appetite is okay, grab something small' },
];

const MORNING_STEPS_HARD: ChecklistStep[] = [
  { id: 'morning-catmeds', label: 'Cat morning meds (Maisie + Meeko) + wet food by 10am', isCritical: true },
  { id: 'morning-breakfast', label: 'Eat something — anything — before noon' },
];

const EVENING_STEPS: ChecklistStep[] = [
  { id: 'evening-dinner', label: 'Dinner — delivery, fridge, frozen, or shelf.', note: verbatimCopy.eatSomething },
  { id: 'evening-catplay', label: 'PM cat playtime (10–15 min). Check water fountain.' },
  { id: 'evening-shower', label: 'Shower check-in — get in, warm water, get out.', note: verbatimCopy.wholeTask },
  { id: 'evening-catmeds', label: 'Cat evening meds + dinner + scoop litter', isCritical: true },
  { id: 'evening-meds', label: 'Your bedtime meds (9:30pm). PRN anxiety meds accessible.', isCritical: true },
  { id: 'evening-skincare', label: 'Night skincare — cleanser + moisturiser.' },
  { id: 'evening-anchor', label: "Write tomorrow's anchor task in your notebook" },
];

const EVENING_STEPS_HARD: ChecklistStep[] = [
  { id: 'evening-catmeds', label: 'Cat evening meds + litter', isCritical: true },
  { id: 'evening-meds', label: 'Your bedtime meds (9:30pm)', isCritical: true },
];

const MORNING_IFTHEN = [
  "If you can't journal → sit with your coffee. That counts.",
  "If you can't do skincare → just SPF. One step is not zero steps.",
  "If you're frozen → cat meds first. That's enough to start.",
];

const EVENING_IFTHEN = [
  "If it's a hard evening → cat meds + your meds. Done. Tomorrow is a new day.",
  "If you can't sleep → PRN meds exist for this. Use them. No guilt.",
  "If you forgot dinner → eat something now. It doesn't have to be a meal.",
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

function getCurrentTime() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    display: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
}

function getUpcomingEvents(currentMinutes: number, events: CalendarEvent[]) {
  const withTime = events.filter((e) => e.time);
  const upcoming = withTime
    .filter((e) => parseEventTime(e.time!) >= currentMinutes)
    .sort((a, b) => parseEventTime(a.time!) - parseEventTime(b.time!));
  return upcoming.slice(0, 3);
}

function getNowNextLater(currentMinutes: number, events: CalendarEvent[]) {
  const withTime = dailyEvents.filter((e) => e.time).sort((a, b) => parseEventTime(a.time!) - parseEventTime(b.time!));
  const pastIdx = withTime.filter((e) => parseEventTime(e.time!) <= currentMinutes);
  const now = pastIdx.length > 0 ? pastIdx[pastIdx.length - 1] : withTime[0];
  const future = withTime.filter((e) => parseEventTime(e.time!) > currentMinutes);
  const next = future[0] ?? null;
  const later = future.find((e) => e.criticality === 'safety-critical' || e.isNonNegotiable) ?? future[1] ?? null;
  return { now, next, later };
}

function getTodayAprilEvents() {
  const todayStr = new Date().toISOString().split('T')[0];
  return aprilOneTimeEvents.filter((e) => e.date === todayStr);
}

export default function TodayPage() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [anchorTask, setAnchorTask] = useState('');
  const [dimmedSteps, setDimmedSteps] = useState<Set<string>>(new Set());
  const [showAssistant, setShowAssistant] = useState(false);
  const [showGrounding, setShowGrounding] = useState(false);
  const { getStatus, cycleStatus } = usePriorityStatus();
  const { isHardDay, toggle: toggleHardDay } = useHardDay();
  const { localEvents } = useLocalEvents();
  const todayEvents = getTodayAprilEvents();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getCurrentTime()), 60000);
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
      if (stored) setDimmedSteps(new Set(JSON.parse(stored) as string[]));
    } catch {}
  }, []);

  function toggleStep(id: string) {
    const key = 'checklist-' + new Date().toDateString();
    setDimmedSteps((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(key, JSON.stringify(Array.from(next))); } catch {}
      return next;
    });
  }

  function handleAnchorChange(v: string) {
    setAnchorTask(v);
    try { localStorage.setItem('anchor-task', v); } catch {}
  }

  const currentTotalMinutes = currentTime.hours * 60 + currentTime.minutes;
  const allTodayEvents = [...dailyEvents, ...localEvents];
  const upcomingEvents = getUpcomingEvents(currentTotalMinutes, allTodayEvents);
  const { now: nowEvent, next: nextEvent, later: laterEvent } = getNowNextLater(currentTotalMinutes, allTodayEvents);

  const today = new Date();
  const dateDisplay = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const weekday = today.getDay();
  const dailyFocus = WEEKLY_FOCUS[weekday];
  const nonNegotiables = dailyEvents.filter((e) => e.isNonNegotiable && e.time);
  const topPriority = priorities.find((p) => !p.isLocked) ?? priorities[0];

  const groundingPhrase = currentTime.hours < 12
    ? verbatimCopy.nonNegotiable
    : currentTime.hours < 18
    ? verbatimCopy.writtenDown
    : verbatimCopy.wholeTask;

  const urgentFinance = financeUrgentItems.filter((f) => f.isUrgent);
  const safetyCriticalFinance = urgentFinance.filter((f) => f.criticality === 'safety-critical');

  const isMorning = currentTime.hours >= 7 && currentTime.hours < 12;
  const isEvening = currentTime.hours >= 18 && currentTime.hours <= 22;
  const baseSteps = isMorning ? MORNING_STEPS : isEvening ? EVENING_STEPS : null;
  const hardSteps = isMorning ? MORNING_STEPS_HARD : isEvening ? EVENING_STEPS_HARD : null;
  const ifThenPrompts = isMorning ? MORNING_IFTHEN : EVENING_IFTHEN;
  const checklistSteps = isHardDay ? hardSteps : baseSteps;
  const checklistTitle = isMorning ? 'morning' : 'evening';

  return (
    <PageShell>
      {/* Emergency Grounding Card — full-screen overlay */}
      {showGrounding && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: 'var(--color-paper)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '32px 24px',
            gap: '16px',
          }}
        >
          <div style={{ borderLeft: '3px solid var(--color-forest)', paddingLeft: '16px', marginBottom: '8px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '8px', letterSpacing: '0.08em' }}>grounding</div>
            {groundingPhrases.map((phrase, i) => (
              <p key={i} className="text-body" style={{ margin: '0 0 10px', lineHeight: 1.6 }}>{phrase}</p>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '16px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '8px', letterSpacing: '0.08em' }}>{groundingBreathing.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {groundingBreathing.steps.map((step, i) => (
                <div key={i} className="text-body-sm" style={{ padding: '8px 12px', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px' }}>
                  {step}
                </div>
              ))}
            </div>
            <p className="text-micro text-ink-muted" style={{ marginTop: '8px', fontStyle: 'italic' }}>{groundingBreathing.note}</p>
          </div>

          <button
            type="button"
            onClick={() => setShowGrounding(false)}
            style={{
              marginTop: '16px',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              background: 'transparent',
              color: 'var(--color-ink-muted)',
              padding: '12px',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            back to today
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '8px 0 4px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="text-display" style={{ lineHeight: 1.1 }}>{currentTime.display}</div>
          <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>{dateDisplay}</div>
        </div>
        <div style={{ display: 'flex', gap: '6px', paddingTop: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => setShowGrounding(true)}
            aria-label="Open grounding card"
            style={{
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              background: 'transparent',
              color: 'var(--color-ink-muted)',
              padding: '4px 8px',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              cursor: 'pointer',
              minHeight: '32px',
            }}
          >
            ground
          </button>
          <button
            type="button"
            onClick={toggleHardDay}
            aria-pressed={isHardDay}
            style={{
              border: `1px solid ${isHardDay ? 'var(--color-ink-muted)' : 'var(--color-ink-ghost)'}`,
              borderRadius: '2px',
              background: isHardDay ? 'var(--color-chrome)' : 'transparent',
              color: isHardDay ? 'var(--color-ink)' : 'var(--color-ink-muted)',
              padding: '4px 8px',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              cursor: 'pointer',
              minHeight: '32px',
            }}
          >
            {isHardDay ? '◉ hard day' : '○ hard day'}
          </button>
        </div>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Now / Next / Later strip */}
      <div style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {[
          { label: 'now', event: nowEvent },
          { label: 'next', event: nextEvent },
          { label: 'later', event: laterEvent },
        ].map(({ label, event }) => (
          <div
            key={label}
            style={{
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              padding: '8px',
              backgroundColor: label === 'now' ? 'var(--color-paper)' : 'transparent',
            }}
          >
            <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>{label}</div>
            {event ? (
              <>
                <div className="text-body-sm" style={{ lineHeight: 1.3, fontWeight: label === 'now' ? 500 : 400 }}>
                  {event.emoji ? `${event.emoji} ` : ''}{event.title}
                </div>
                <div className="text-micro text-ink-muted" style={{ marginTop: '2px', fontFamily: 'Courier New, monospace' }}>{event.time}</div>
              </>
            ) : (
              <div className="text-micro text-ink-muted">—</div>
            )}
          </div>
        ))}
      </div>

      {/* Your brief */}
      {!isHardDay && (
        <WindowPanel
          title="your brief"
          active
          statusText={`${today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()} · ${dailyFocus}`}
          style={{ marginBottom: '10px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>anchor points</div>
              {nonNegotiables.map((e) => (
                <div key={e.id} style={{ display: 'flex', gap: '10px', padding: '2px 0' }}>
                  <span className="text-micro text-ink-muted" style={{ fontFamily: 'Courier New, monospace', minWidth: '52px' }}>{e.time}</span>
                  <span className="text-body-sm">{e.emoji} {e.title}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>priority</div>
              <div className="text-body-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>→ {topPriority.title}</span>
                {topPriority.isUrgent && (
                  <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>
                )}
              </div>
            </div>
            <p className="text-micro text-ink-muted" style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '8px', margin: 0 }}>
              {groundingPhrase}
            </p>
          </div>
        </WindowPanel>
      )}

      {/* Hard day brief (simplified) */}
      {isHardDay && (
        <div className="system-dialog" style={{ marginBottom: '10px' }}>
          <div className="text-micro text-ink-muted" style={{ marginBottom: '6px', letterSpacing: '0.05em' }}>today</div>
          <div className="text-body-sm" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>💊 Cat meds by 10am</div>
            <div>💊 Your bedtime meds at 9:30pm</div>
            <div>🍽️ Eat something before noon</div>
            {anchorTask && <div>→ {anchorTask}</div>}
          </div>
          <p className="text-micro text-ink-muted" style={{ marginTop: '8px', fontStyle: 'italic' }}>
            You only need to do the minimum. That is enough.
          </p>
        </div>
      )}

      {/* Anchor task */}
      <div style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ marginBottom: '5px', letterSpacing: '0.05em' }}>anchor task</div>
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
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '15px',
            color: 'var(--color-ink)',
            outline: 'none',
          }}
        />
      </div>

      {/* Fold signal */}
      <div style={{ borderTop: '1px solid var(--color-ink-ghost)', padding: '8px 0 12px 0' }}>
        <p className="text-micro text-ink-muted" style={{ margin: 0 }}>{verbatimCopy.writtenDown}</p>
      </div>

      {/* Morning / Evening checklist */}
      {checklistSteps && (
        <WindowPanel title={isHardDay ? `${checklistTitle} — minimum` : checklistTitle} style={{ marginBottom: '10px' }}>
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
                    borderLeft: step.isCritical ? '3px solid var(--color-tomato)' : '3px solid transparent',
                    paddingLeft: step.isCritical ? '10px' : '0',
                    padding: '8px 0',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-ink)',
                    cursor: 'pointer',
                    opacity: isDimmed ? 0.4 : 1,
                    lineHeight: 1.5,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {step.label}
                  {step.note && (
                    <span style={{ display: 'block', fontSize: '13px', color: 'var(--color-ink-muted)', marginTop: '2px', fontStyle: 'italic' }}>
                      {step.note}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* If/Then prompts */}
          {!isHardDay && (
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)' }}>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '6px', letterSpacing: '0.05em' }}>if / then</div>
              {ifThenPrompts.map((p, i) => (
                <div key={i} className="text-body-sm text-ink-muted" style={{ paddingBottom: '4px' }}>— {p}</div>
              ))}
            </div>
          )}
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
      {!isHardDay && (
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
                isSafetyCritical={event.criticality === 'safety-critical'}
              />
            ))
          ) : (
            <p className="text-body-sm text-ink-muted">That's everything for today.</p>
          )}
        </WindowPanel>
      )}

      {/* What matters now — hidden on hard day */}
      {!isHardDay && (
        <WindowPanel title="what matters now" style={{ marginBottom: '10px' }}>
          {priorities.slice(0, 3).map((p) => {
            const status = getStatus(p.rank);
            const isDone = status === 'done';
            const isDoing = status === 'doing';
            return (
              <button
                key={p.rank}
                type="button"
                onClick={() => cycleStatus(p.rank)}
                className="priority-item"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderLeft: isDone ? '3px solid var(--color-ink-ghost)' : isDoing ? '3px solid var(--color-moss)' : p.isUrgent ? '3px solid var(--color-tomato)' : '3px solid var(--color-ink-ghost)',
                  paddingLeft: '8px',
                  opacity: isDone ? 0.4 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <span className="priority-number">{p.rank}.</span>
                <div style={{ flex: 1 }}>
                  <div className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{p.title}</span>
                    {p.isLocked && <span className="tag">locked</span>}
                    {p.isUrgent && <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>}
                    {isDoing && <span className="tag" style={{ borderColor: 'var(--color-moss)', color: 'var(--color-moss)' }}>◉ doing</span>}
                    {isDone && <span className="tag" style={{ borderColor: 'var(--color-ink-ghost)', color: 'var(--color-ink-muted)' }}>✓ done</span>}
                  </div>
                  <div className="text-body-sm text-ink-muted">{p.status} — {p.nextAction}</div>
                </div>
              </button>
            );
          })}
        </WindowPanel>
      )}

      {/* Safety-critical finance — always visible */}
      {safetyCriticalFinance.length > 0 && (
        <div
          style={{
            border: '2px solid var(--color-tangerine)',
            borderRadius: '2px',
            padding: '10px 12px',
            marginBottom: '10px',
            backgroundColor: 'var(--color-paper)',
          }}
        >
          <div className="text-micro" style={{ color: 'var(--color-tangerine)', marginBottom: '6px', letterSpacing: '0.05em' }}>
            finance — requires action
          </div>
          {safetyCriticalFinance.map((item, i) => (
            <div key={i} style={{ paddingBottom: i < safetyCriticalFinance.length - 1 ? '6px' : 0, borderBottom: i < safetyCriticalFinance.length - 1 ? '1px solid var(--color-ink-ghost)' : 'none' }}>
              <div className="text-body-sm" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>{item.title}</span>
                {item.amount && <span style={{ color: 'var(--color-ink-muted)', fontFamily: 'Courier New, monospace', fontSize: '11px' }}>{item.amount}</span>}
              </div>
              <div className="text-micro text-ink-muted">{item.note}</div>
              {item.action && <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>→ {item.action}</div>}
            </div>
          ))}
        </div>
      )}

      {/* AI Assistant — collapsible */}
      <WindowPanel title="assistant" style={{ marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => setShowAssistant((v) => !v)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            minHeight: '32px',
          }}
        >
          <span className="text-body-sm text-ink-muted">One thing at a time. One step at a time.</span>
          <span className="text-micro text-ink-muted" style={{ fontFamily: 'Courier New, monospace' }}>
            {showAssistant ? '▾ hide' : '▸ open'}
          </span>
        </button>
        {showAssistant && (
          <div style={{ marginTop: '10px', borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '10px' }}>
            <AssistantPanel />
          </div>
        )}
      </WindowPanel>

      {/* Closing phrase */}
      <div style={{ padding: '8px 0 20px 0' }}>
        <p className="text-micro text-ink-muted">{modularNote}</p>
      </div>
    </PageShell>
  );
}
