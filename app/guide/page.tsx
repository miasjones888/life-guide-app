'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Expandable from '@/components/ui/Expandable';
import { priorities, workLocations, pets, vetInfo, financeUrgentItems, verbatimCopy, groundingPhrases, changeLog } from '@/content/guide';
import { usePriorityStatus } from '@/hooks/usePriorityStatus';

export default function GuidePage() {
  const { getStatus, cycleStatus } = usePriorityStatus();

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Field Guide</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          A personal reference system. Read it like a field manual.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* §01 Priorities */}
      <div style={{ marginBottom: '6px', marginTop: '4px' }}>
        <span className="text-micro text-ink-muted">§01</span>
      </div>
      <WindowPanel title="priorities" active style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Ranked by urgency and sequencing. Locked items depend on earlier items.
        </div>
        {priorities.map((p) => {
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
                borderLeft: isDone
                  ? '3px solid var(--color-ink-ghost)'
                  : isDoing
                  ? '3px solid var(--color-moss)'
                  : p.isUrgent
                  ? '3px solid var(--color-tomato)'
                  : p.isLocked
                  ? '3px solid var(--color-graphite)'
                  : p.isOngoing
                  ? '3px solid var(--color-basil)'
                  : '3px solid var(--color-forest)',
                paddingLeft: '10px',
                opacity: isDone ? 0.4 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              <span className="priority-number">{p.rank}.</span>
              <div style={{ flex: 1 }}>
                <div
                  className="text-body"
                  style={{
                    color: p.isLocked ? 'var(--color-ink-muted)' : 'var(--color-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{p.title}</span>
                  {p.isLocked && <span className="tag">locked</span>}
                  {p.isUrgent && (
                    <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>
                  )}
                  {p.isOngoing && (
                    <span className="tag" style={{ borderColor: 'var(--color-basil)', color: 'var(--color-basil)' }}>ongoing</span>
                  )}
                  {isDoing && (
                    <span className="tag" style={{ borderColor: 'var(--color-moss)', color: 'var(--color-moss)' }}>◉ doing</span>
                  )}
                  {isDone && (
                    <span className="tag" style={{ borderColor: 'var(--color-ink-ghost)', color: 'var(--color-ink-muted)' }}>✓ done</span>
                  )}
                </div>
                <div className="text-body-sm" style={{ color: 'var(--color-ink-muted)', marginTop: '1px' }}>
                  {p.status} — {p.nextAction}
                </div>
              </div>
            </button>
          );
        })}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '4px' }}>
          <p className="text-micro text-ink-muted">{verbatimCopy.wholeTask}</p>
        </div>
      </WindowPanel>

      {/* §02 Finance */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§02</span>
      </div>
      <WindowPanel title="finance" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Active items requiring action or monitoring.
        </div>
        {financeUrgentItems.map((item, i) => (
          <div
            key={i}
            className="time-block"
            style={{ borderLeft: '3px solid #BBBBBB', paddingLeft: '10px' }}
          >
            <div style={{ flex: 1 }}>
              <div
                className="text-body"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <span>{item.title}</span>
                {item.amount && (
                  <span
                    className="text-micro"
                    style={{ color: 'var(--color-ink-muted)', fontFamily: 'Courier New, monospace' }}
                  >
                    {item.amount}
                  </span>
                )}
              </div>
              <div className="text-body-sm text-ink-muted">{item.note}</div>
              {item.action && (
                <div className="text-micro text-ink-muted" style={{ marginTop: '2px' }}>
                  → {item.action}
                </div>
              )}
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* §03 Care */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§03</span>
      </div>
      <WindowPanel title="care" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Maisie · Meeko · Jinshi
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div className="text-h2" style={{ marginBottom: '6px' }}>Vet</div>
          <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-graphite)', paddingLeft: '10px' }}>
            <div style={{ fontWeight: 500 }}>{vetInfo.name}</div>
            <div className="text-body-sm text-ink-muted">{vetInfo.address}</div>
            <div>
              <a
                href={`tel:${vetInfo.phone.replace(/\D/g, '')}`}
                style={{ color: 'var(--color-forest)', fontFamily: 'Courier New, monospace', fontSize: '13px' }}
              >
                {vetInfo.phone}
              </a>
            </div>
          </div>
        </div>

        <hr className="hairline" style={{ margin: '10px 0' }} />

        {pets.map((pet, i) => (
          <div
            key={pet.name}
            style={{
              paddingBottom: i < pets.length - 1 ? '10px' : 0,
              borderBottom: i < pets.length - 1 ? '1px solid var(--color-ink-ghost)' : 'none',
              marginBottom: i < pets.length - 1 ? '10px' : 0,
            }}
          >
            <div
              className="text-h2"
              style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              🐱 {pet.name}
              {pet.gender && <span className="tag">{pet.gender}</span>}
            </div>
            {pet.medications && pet.medications.length > 0 && (
              <div className="text-body-sm" style={{ marginBottom: '4px' }}>
                <span className="text-micro text-ink-muted">Meds: </span>
                {pet.medications.join(', ')}
              </div>
            )}
            {pet.urgentItems && pet.urgentItems.length > 0 && (
              <div>
                {pet.urgentItems.map((item, j) => (
                  <div key={j} className="text-body-sm text-ink-muted">
                    {item}
                  </div>
                ))}
              </div>
            )}
            {pet.notes && pet.notes.length > 0 && (
              <div>
                {pet.notes.map((note, j) => (
                  <div key={j} className="text-body-sm text-ink-muted">{note}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </WindowPanel>

      {/* §04 Field */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§04</span>
      </div>
      <WindowPanel title="field" statusText="Within 25 min of 92115" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Work locations, San Diego. Key phrases for low-energy days.
        </div>
        {workLocations.map((loc) => (
          <div
            key={loc.name}
            className="time-block"
            style={{ borderLeft: '3px solid var(--color-forest)', paddingLeft: '10px' }}
          >
            <div style={{ flex: 1 }}>
              <div className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 500 }}>{loc.name}</span>
                {loc.rating && <span className="text-micro" style={{ color: 'var(--color-basil)' }}>{loc.rating}</span>}
              </div>
              <div className="text-body-sm text-ink-muted">{loc.address}</div>
              <div className="text-micro text-ink-muted">{[loc.hours, loc.note].filter(Boolean).join(' · ')}</div>
            </div>
          </div>
        ))}
        <hr className="hairline" style={{ margin: '14px 0 10px' }} />
        <div className="text-micro text-ink-muted" style={{ marginBottom: '12px', letterSpacing: '0.05em' }}>key phrases</div>
        {Object.entries(verbatimCopy).map(([key, value]) => (
          <div key={key} style={{ padding: '10px 0', borderBottom: '1px solid var(--color-ink-ghost)' }}>
            <p className="text-body" style={{ fontStyle: 'italic', color: 'var(--color-ink-muted)', lineHeight: 1.5, paddingLeft: '12px', borderLeft: '2px solid var(--color-ink-ghost)' }}>
              {value}
            </p>
          </div>
        ))}
      </WindowPanel>

      {/* §05 Body */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§05</span>
      </div>
      <WindowPanel title="body" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Skincare · Movement · Meals · Sleep
        </div>

        <Expandable title="Skincare" defaultOpen>
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>morning · 8:00am</div>
              <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-flamingo)', paddingLeft: '10px' }}>
                <div>Cleanser → Toner (if available) → SPF 30+</div>
                <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>{verbatimCopy.hardDay}</div>
              </div>
            </div>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>evening · 9:45pm</div>
              <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-flamingo)', paddingLeft: '10px' }}>
                <div>Cleanser → Toner → Treatment → Moisturiser</div>
                <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>Hard day: cleanser + moisturiser. Two steps minimum.</div>
              </div>
            </div>
          </div>
        </Expandable>

        <Expandable title="Movement">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-basil)', paddingLeft: '10px' }}>
              <div style={{ fontWeight: 500 }}>Outside Time — Thursday 2:00pm</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>{verbatimCopy.outsideTime}</div>
            </div>
            <div className="text-body-sm text-ink-muted">
              What counts: hiking (Cowles Mountain, Mission Trails), paddleboarding (Mission Bay), long walk, birdwatching.
            </div>
            <div className="text-micro text-ink-muted" style={{ fontStyle: 'italic' }}>{verbatimCopy.nonNegotiable}</div>
          </div>
        </Expandable>

        <Expandable title="Shower">
          <div style={{ paddingTop: '8px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-flamingo)', paddingLeft: '10px' }}>
              <div>Every 2 days (interval — not daily by design).</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>{verbatimCopy.wholeTask}</div>
            </div>
          </div>
        </Expandable>

        <Expandable title="Meals">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { time: 'Breakfast 9:15am', note: 'No appetite is okay — grab something small from the shelf.' },
              { time: 'Midday check-in 1:00pm', note: 'Eaten today? If no: eat something right now. Shelf snack counts.' },
              { time: 'Dinner 6:30pm', note: verbatimCopy.eatSomething },
            ].map(({ time, note }) => (
              <div key={time} className="text-body-sm" style={{ borderLeft: '3px solid var(--color-banana)', paddingLeft: '10px' }}>
                <div style={{ fontWeight: 500 }}>{time}</div>
                <div className="text-micro text-ink-muted" style={{ marginTop: '2px', fontStyle: 'italic' }}>{note}</div>
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="Sleep">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-graphite)', paddingLeft: '10px' }}>
              <div>Lights out: 11:00pm. No TikTok or Instagram in bed.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>Bedtime meds (9:30pm) are a prerequisite. They are non-negotiable.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>PRN anxiety meds are physically accessible. Use when needed. No guilt.</div>
            </div>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §06 Home */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§06</span>
      </div>
      <WindowPanel title="home" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Room reset · Laundry · Cat spaces
        </div>

        <Expandable title="Room Reset" defaultOpen>
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="text-body-sm text-ink-muted">Tuesday + Saturday at 5:30pm · 20 minutes · Rotating phase.</div>
            {['Bedroom surfaces (desk, nightstand, floor)', 'Living room (couch area, surfaces, floor sweep)', 'Kitchen (counters, dishes, basic wipe-down)', 'Bathroom (sink, toilet, floor)', 'Entry + hall'].map((phase, i) => (
              <div key={i} className="time-block" style={{ borderLeft: '3px solid var(--color-graphite)', paddingLeft: '10px' }}>
                <span className="text-micro text-ink-muted" style={{ minWidth: '20px', paddingTop: '2px' }}>{i + 1}.</span>
                <span className="text-body-sm">{phase}</span>
              </div>
            ))}
            <div className="text-micro text-ink-muted" style={{ fontStyle: 'italic' }}>This is surface order, not deep cleaning. Pick up where you left off.</div>
          </div>
        </Expandable>

        <Expandable title="Laundry">
          <div style={{ paddingTop: '8px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-graphite)', paddingLeft: '10px' }}>
              <div>Saturday 2:00pm — start one load. Folding is optional same-day.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>If missed: next available day is the new laundry day. No catch-up required.</div>
            </div>
          </div>
        </Expandable>

        <Expandable title="Cat Spaces">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { item: 'Litter', note: 'Scooped during evening routine (9:00pm) alongside cat evening meds.' },
              { item: 'Water fountain', note: 'Check during PM cat playtime (7:30pm).' },
              { item: 'Scratching posts', note: 'Check and replace every 60 days (tracked in monthly rhythm).' },
            ].map(({ item, note }) => (
              <div key={item} className="text-body-sm" style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
                <span style={{ fontWeight: 500 }}>{item}:</span>{' '}
                <span className="text-ink-muted">{note}</span>
              </div>
            ))}
          </div>
        </Expandable>
      </WindowPanel>

      {/* §07 Health */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§07</span>
      </div>
      <WindowPanel title="health" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Medications · Therapy · Psychiatry
        </div>

        {/* Safety-critical callout */}
        <div style={{ border: '2px solid var(--color-tomato)', borderRadius: '2px', padding: '10px 12px', marginBottom: '12px', backgroundColor: 'var(--color-paper)' }}>
          <div className="text-micro" style={{ color: 'var(--color-tomato)', marginBottom: '6px', letterSpacing: '0.05em' }}>safety-critical · daily</div>
          <div className="text-body-sm" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>💊 <strong>Bedtime meds</strong> — 9:30pm, every night. Non-negotiable.</div>
            <div>🐱 <strong>Cat morning meds</strong> (Maisie + Meeko) — 9:00am, every day.</div>
            <div>🐱 <strong>Cat evening meds</strong> — 9:00pm, every night.</div>
          </div>
          <div className="text-micro text-ink-muted" style={{ marginTop: '6px', fontStyle: 'italic' }}>PRN anxiety meds accessible at all times. Use when needed. No guilt.</div>
        </div>

        <Expandable title="Therapy" defaultOpen>
          <div style={{ paddingTop: '8px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
              <div style={{ fontWeight: 500 }}>Status: Priority #1 — contact one therapist today.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>
                Therapy is not a luxury. It runs in parallel with everything else. Finding a therapist is itself a task, and it is the top task.
              </div>
            </div>
          </div>
        </Expandable>

        <Expandable title="Psychiatry">
          <div style={{ paddingTop: '8px' }}>
            <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
              <div style={{ fontWeight: 500 }}>Status: Priority #2 — no appointment. Schedule this week.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>
                Contact for any prescription questions or PRN refills.
              </div>
            </div>
          </div>
        </Expandable>

        <Expandable title="Cat Health">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pets.map((pet) => (
              <div key={pet.name} style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
                <div className="text-body-sm" style={{ fontWeight: 500 }}>🐱 {pet.name}{pet.gender ? ` (${pet.gender})` : ''}</div>
                {pet.medications && <div className="text-micro text-ink-muted">Meds: {pet.medications.join(', ')}</div>}
                {pet.notes && pet.notes.map((n, i) => <div key={i} className="text-micro text-ink-muted">{n}</div>)}
                {pet.urgentItems && pet.urgentItems.map((u, i) => <div key={i} className="text-micro" style={{ color: 'var(--color-tomato)' }}>⚠ {u}</div>)}
              </div>
            ))}
            <div style={{ borderLeft: '3px solid var(--color-graphite)', paddingLeft: '10px' }}>
              <div className="text-body-sm" style={{ fontWeight: 500 }}>{vetInfo.name}</div>
              <div className="text-micro text-ink-muted">{vetInfo.address}</div>
              <a href={`tel:${vetInfo.phone.replace(/\D/g, '')}`} style={{ color: 'var(--color-forest)', fontFamily: 'Courier New, monospace', fontSize: '13px' }}>{vetInfo.phone}</a>
            </div>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §08 System */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§08</span>
      </div>
      <WindowPanel title="system" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Weekly reset · Monthly review · Reflection
        </div>

        <Expandable title="Weekly Reset" defaultOpen>
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="text-micro text-ink-muted">Sunday 7:00pm · 30–45 min</div>
            {['Transfer notes → notecards (6:45pm)', 'Review the week: what happened, what shifted, what worked', 'Set the anchor task for Monday', 'Check upcoming deadlines and events', 'Instacart order (6:30pm) — stock for the week'].map((step, i) => (
              <div key={i} className="time-block" style={{ borderLeft: '3px solid var(--color-grape)', paddingLeft: '10px' }}>
                <span className="text-micro text-ink-muted" style={{ minWidth: '20px', paddingTop: '2px' }}>{i + 1}.</span>
                <span className="text-body-sm">{step}</span>
              </div>
            ))}
            <div className="text-micro text-ink-muted" style={{ fontStyle: 'italic' }}>This is a clearing session, not a planning session. You are writing down what is already decided.</div>
          </div>
        </Expandable>

        <Expandable title="Monthly Review">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="text-micro text-ink-muted">First Sunday · 9:00am · 90 min</div>
            <div>
              <div className="text-body-sm" style={{ fontWeight: 500, marginBottom: '4px' }}>Part 1 — Life Review (30 min)</div>
              {['What changed this month?', 'What was harder than expected?', 'What worked?'].map((q, i) => (
                <div key={i} className="text-body-sm text-ink-muted" style={{ paddingLeft: '8px' }}>— {q}</div>
              ))}
            </div>
            <div>
              <div className="text-body-sm" style={{ fontWeight: 500, marginBottom: '4px' }}>Part 2 — Budget Hour (60 min)</div>
              {['Review last month', 'Subscription audit — cancel unused in 30 days', 'Upcoming obligations — next 30 days', 'Monthly intention — one financial goal', 'Buffer check — 2-week buffer? If not, pause discretionary'].map((step, i) => (
                <div key={i} className="text-body-sm text-ink-muted" style={{ paddingLeft: '8px' }}>{i + 1}. {step}</div>
              ))}
            </div>
          </div>
        </Expandable>

        <Expandable title="Reflection Prompts">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>Use when stuck. These are doors, not assignments.</div>
            {["What am I carrying right now that isn't mine to carry?", "What worked this week that I didn't give myself credit for?", "What does the system need that it isn't getting?", "What am I avoiding and what is underneath that?", "Where did I show up for myself this week?"].map((prompt, i) => (
              <div key={i} style={{ padding: '8px 12px', borderLeft: '2px solid var(--color-ink-ghost)', backgroundColor: 'var(--color-chrome-light)' }}>
                <p className="text-body-sm" style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-ink-muted)' }}>{prompt}</p>
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="Maintenance Ritual">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="text-micro text-ink-muted">Weekly · 10 minutes · During Sunday reset</div>
            {['Cat medication accuracy (any vet changes?)', 'Financial deadline dates (any new or shifted?)', 'Anchor priorities (still current order?)', 'Routine changes needed based on how the week felt'].map((item, i) => (
              <div key={i} className="text-body-sm" style={{ paddingLeft: '10px', borderLeft: '3px solid var(--color-ink-ghost)' }}>{item}</div>
            ))}
          </div>
        </Expandable>
      </WindowPanel>

      {/* §09 Routines */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§09</span>
      </div>
      <WindowPanel title="routines" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Morning · Evening
        </div>

        <Expandable title="Morning Routine" defaultOpen>
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { time: '7:30am', task: 'Coffee, journal, read, plan, ground', note: verbatimCopy.protectedTime },
              { time: '8:00am', task: 'Morning skincare (cleanser + SPF)', note: verbatimCopy.hardDay },
              { time: '9:00am', task: 'Cat morning meds (Maisie + Meeko) + wet food by 10am', note: null, critical: true },
              { time: '9:15am', task: 'Breakfast', note: 'No appetite is okay — grab something small.' },
              { time: '9:30am', task: 'AM cat playtime (10–15 min)', note: null },
            ].map(({ time, task, note, critical }) => (
              <div key={time} className="time-block" style={{ borderLeft: `3px solid ${critical ? 'var(--color-tomato)' : 'var(--color-sage)'}`, paddingLeft: '10px' }}>
                <span className="text-micro text-ink-muted" style={{ minWidth: '52px', paddingTop: '2px', fontFamily: 'Courier New, monospace' }}>{time}</span>
                <div style={{ flex: 1 }}>
                  <div className="text-body-sm">{task}</div>
                  {note && <div className="text-micro text-ink-muted" style={{ marginTop: '2px', fontStyle: 'italic' }}>{note}</div>}
                </div>
              </div>
            ))}
            <div style={{ marginTop: '8px', padding: '8px 10px', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', backgroundColor: 'var(--color-chrome-light)' }}>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>hard-day version</div>
              <div className="text-body-sm">Get up → Cat meds by 10am → Eat something before noon.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>That is enough. You have done enough.</div>
            </div>
            <div style={{ marginTop: '6px', padding: '8px 10px', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px' }}>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>if/then rescue</div>
              {["If you can't journal → sit with your coffee. That counts.", "If you can't do skincare → just SPF. One step is not zero steps.", "If you're frozen → cat meds first. They need you. That's enough to start."].map((p, i) => (
                <div key={i} className="text-body-sm text-ink-muted" style={{ paddingBottom: i < 2 ? '4px' : 0 }}>— {p}</div>
              ))}
            </div>
          </div>
        </Expandable>

        <Expandable title="Evening Routine">
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { time: '7:30pm', task: 'PM cat playtime + shower check-in', note: 'Check water fountain while in the zone.' },
              { time: '9:00pm', task: 'Cat evening meds + dinner + litter', note: null, critical: true },
              { time: '9:00pm', task: 'Evening routine: skincare, meds, anchor task', note: null },
              { time: '9:30pm', task: 'Your bedtime meds', note: verbatimCopy.hardDay, critical: true },
              { time: '9:45pm', task: 'Night skincare (cleanser + moisturiser)', note: null },
              { time: '9:50pm', task: "Write tomorrow's anchor task", note: 'Sets up tomorrow before sleep.' },
              { time: '11:00pm', task: 'Lights out. No TikTok or Instagram.', note: null },
            ].map(({ time, task, note, critical }) => (
              <div key={`${time}-${task.slice(0, 10)}`} className="time-block" style={{ borderLeft: `3px solid ${critical ? 'var(--color-tomato)' : 'var(--color-sage)'}`, paddingLeft: '10px' }}>
                <span className="text-micro text-ink-muted" style={{ minWidth: '52px', paddingTop: '2px', fontFamily: 'Courier New, monospace' }}>{time}</span>
                <div style={{ flex: 1 }}>
                  <div className="text-body-sm">{task}</div>
                  {note && <div className="text-micro text-ink-muted" style={{ marginTop: '2px', fontStyle: 'italic' }}>{note}</div>}
                </div>
              </div>
            ))}
            <div style={{ marginTop: '8px', padding: '8px 10px', border: '1px solid var(--color-ink-ghost)', borderRadius: '2px', backgroundColor: 'var(--color-chrome-light)' }}>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px', letterSpacing: '0.05em' }}>hard-day version</div>
              <div className="text-body-sm">Cat evening meds + litter (9pm) → Your bedtime meds (9:30pm) → Lights out by 11pm.</div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '4px', fontStyle: 'italic' }}>Everything else is optional tonight.</div>
            </div>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §10 Rhythm */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§10</span>
      </div>
      <WindowPanel title="rhythm" statusText="A map, not a schedule" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Weekly focus by day. The focus is a lens, not a requirement.
        </div>
        {[
          { day: 'Monday', focus: 'Portfolio work', anchor: 'Deep work block' },
          { day: 'Tuesday', focus: 'Notion R&D + life admin', anchor: 'Dual-mode day' },
          { day: 'Wednesday', focus: 'Notion R&D + portfolio work', anchor: 'Dual creative day' },
          { day: 'Thursday', focus: 'Buffer / life admin', anchor: 'Outside time at 2pm is protected' },
          { day: 'Friday', focus: 'Systems work', anchor: 'Digital garden, task board, creative curriculum' },
          { day: 'Saturday', focus: 'Creative exploration', anchor: 'Sculpting, moodboards, galleries, writing, films. Optional Buddhism class 9am.' },
          { day: 'Sunday', focus: 'Life planning reset', anchor: 'Weekly setup 7pm. Monthly review first Sunday.' },
        ].map(({ day, focus, anchor }) => {
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
          return (
            <div key={day} className="time-block" style={{ borderLeft: `3px solid ${isToday ? 'var(--color-forest)' : 'var(--color-ink-ghost)'}`, paddingLeft: '10px' }}>
              <div style={{ flex: 1 }}>
                <div className="text-body-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: isToday ? 700 : 400 }}>{day}</span>
                  {isToday && <span className="tag" style={{ borderColor: 'var(--color-forest)', color: 'var(--color-forest)' }}>today</span>}
                </div>
                <div className="text-body-sm text-ink-muted">{focus}</div>
                <div className="text-micro text-ink-muted">{anchor}</div>
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: '10px', padding: '8px', borderTop: '1px solid var(--color-ink-ghost)' }}>
          <p className="text-micro text-ink-muted" style={{ fontStyle: 'italic' }}>
            Tasks are modular. Everything except cat meds, your meds, and financial deadlines can be rescheduled.
          </p>
        </div>
      </WindowPanel>

      {/* Change Log */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">changelog</span>
      </div>
      <WindowPanel title="system updates" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Nothing changes silently.
        </div>
        {changeLog.map((entry) => (
          <div key={entry.version} className="time-block" style={{ borderLeft: '3px solid var(--color-ink-ghost)', paddingLeft: '10px' }}>
            <div style={{ flex: 1 }}>
              <div className="text-body-sm" style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-forest)' }}>{entry.version}</span>
                <span className="text-micro text-ink-muted">{entry.date}</span>
              </div>
              <div className="text-micro text-ink-muted" style={{ marginTop: '3px' }}>{entry.summary}</div>
            </div>
          </div>
        ))}
      </WindowPanel>
    </PageShell>
  );
}
