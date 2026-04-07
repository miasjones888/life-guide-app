'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import Expandable from '@/components/ui/Expandable';
import {
  priorities,
  workLocations,
  pets,
  vetInfo,
  financeUrgentItems,
  verbatimCopy,
  bodySection,
  homeSection,
  healthSection,
  systemSection,
  routinesSection,
} from '@/content/guide';
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
            style={{
              borderLeft: '3px solid var(--color-forest)',
              paddingLeft: '10px',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                className="text-body"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}
              >
                <span style={{ fontWeight: 500 }}>{loc.name}</span>
                {loc.rating && (
                  <span className="text-micro" style={{ color: 'var(--color-basil)' }}>{loc.rating}</span>
                )}
              </div>
              <div className="text-body-sm text-ink-muted">{loc.address}</div>
              <div className="text-micro text-ink-muted">
                {[loc.hours, loc.note].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>
        ))}

        <hr className="hairline" style={{ margin: '14px 0 10px' }} />

        <div className="text-micro text-ink-muted" style={{ marginBottom: '12px', letterSpacing: '0.05em' }}>key phrases</div>
        {Object.entries(verbatimCopy).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid var(--color-ink-ghost)',
            }}
          >
            <p
              className="text-body"
              style={{
                fontStyle: 'italic',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.5,
                paddingLeft: '12px',
                borderLeft: '2px solid var(--color-ink-ghost)',
              }}
            >
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
          Skincare · shower · movement · sleep · meals.
        </div>

        <Expandable title="morning skincare">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {bodySection.morningSkincare.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '2px' }}>{s}</div>
            ))}
            <p className="text-body-sm text-ink-muted" style={{ marginTop: '6px', fontStyle: 'italic' }}>
              {bodySection.morningSkincare.fallback}
            </p>
            <p className="text-micro text-ink-muted" style={{ marginTop: '4px' }}>
              {bodySection.morningSkincare.timing}
            </p>
          </div>
        </Expandable>

        <Expandable title="night skincare">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {bodySection.nightSkincare.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '2px' }}>{s}</div>
            ))}
            <p className="text-body-sm text-ink-muted" style={{ marginTop: '6px', fontStyle: 'italic' }}>
              {bodySection.nightSkincare.fallback}
            </p>
          </div>
        </Expandable>

        <Expandable title="shower">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>{bodySection.shower.frequency}</p>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic' }}>
              {bodySection.shower.minimumViable}
            </p>
          </div>
        </Expandable>

        <Expandable title="movement + outside time">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginBottom: '8px' }}>
              {bodySection.movement.framing}
            </p>
            {bodySection.movement.options.map((o, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '2px' }}>→ {o}</div>
            ))}
          </div>
        </Expandable>

        <Expandable title="sleep">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <div className="text-body-sm" style={{ marginBottom: '4px' }}>
              Target: {bodySection.sleep.target} · Lights out: {bodySection.sleep.lightsOut}
            </div>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic' }}>
              {bodySection.sleep.note}
            </p>
          </div>
        </Expandable>

        <Expandable title="meals">
          <div style={{ paddingLeft: '12px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '2px' }}>breakfast</div>
              <p className="text-body-sm" style={{ fontStyle: 'italic' }}>{bodySection.meals.breakfast}</p>
            </div>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '2px' }}>midday check-in</div>
              <p className="text-body-sm" style={{ fontStyle: 'italic' }}>{bodySection.meals.midday}</p>
            </div>
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '2px' }}>dinner</div>
              <p className="text-body-sm" style={{ fontStyle: 'italic' }}>{bodySection.meals.dinner}</p>
            </div>
          </div>
        </Expandable>

        <Expandable title="grounding">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <div className="text-body-sm" style={{ fontWeight: 500, marginBottom: '6px' }}>{bodySection.grounding.technique}</div>
            {bodySection.grounding.steps.map((s, i) => (
              <div key={i} className="text-body-sm text-ink-muted" style={{ paddingBottom: '2px' }}>{s}</div>
            ))}
            <p className="text-micro text-ink-muted" style={{ marginTop: '6px' }}>
              Alternative: {bodySection.grounding.alternative}
            </p>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §06 Home */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§06</span>
      </div>
      <WindowPanel title="home" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Room reset · laundry.
        </div>

        <Expandable title="room reset" defaultOpen>
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginBottom: '10px' }}>
              {homeSection.roomReset.instruction}
            </p>
            {homeSection.roomReset.phases.map((phase, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div className="text-body-sm" style={{ fontWeight: 500, marginBottom: '2px' }}>{phase.label}</div>
                <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>{phase.note}</div>
                {phase.steps.map((s, j) => (
                  <div key={j} className="text-body-sm text-ink-muted" style={{ paddingBottom: '2px' }}>→ {s}</div>
                ))}
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="laundry">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>{homeSection.laundry.frequency}</p>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic' }}>
              {homeSection.laundry.minimumViable}
            </p>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §07 Health */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§07</span>
      </div>
      <WindowPanel title="health" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Medications · therapy · psychiatry.
        </div>

        <div style={{ marginBottom: '10px', borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
          <div className="text-body-sm" style={{ fontWeight: 500 }}>Bedtime Meds</div>
          <div className="text-body-sm text-ink-muted">{healthSection.medications.bedtimeMeds.timing}</div>
          <div className="text-micro text-ink-muted">{healthSection.medications.bedtimeMeds.note}</div>
        </div>

        <div style={{ marginBottom: '10px', borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
          <div className="text-body-sm" style={{ fontWeight: 500 }}>PRN Anxiety Meds</div>
          <div className="text-micro text-ink-muted">{healthSection.medications.prnAnxiety.storage}</div>
          <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginTop: '4px' }}>
            {healthSection.medications.prnAnxiety.guidance}
          </p>
        </div>

        <hr className="hairline" style={{ margin: '8px 0' }} />

        <div style={{ marginBottom: '10px' }}>
          <div className="text-body-sm" style={{ fontWeight: 500, marginBottom: '4px' }}>Therapy Outreach</div>
          <div className="text-micro text-ink-muted">{healthSection.therapy.frequency} · {healthSection.therapy.framing}</div>
          <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginTop: '4px' }}>
            {healthSection.therapy.minimumViable}
          </p>
        </div>

        <div style={{ borderLeft: '3px solid var(--color-tangerine)', paddingLeft: '10px' }}>
          <div className="text-body-sm" style={{ fontWeight: 500 }}>Psychiatry</div>
          <div className="text-body-sm text-ink-muted">{healthSection.psychiatry.status}</div>
          <div className="text-micro text-ink-muted">{healthSection.psychiatry.action}</div>
        </div>

        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'var(--color-chrome)', borderRadius: '2px' }}>
          <p className="text-micro text-ink-muted">{healthSection.framingNote}</p>
        </div>
      </WindowPanel>

      {/* §08 System */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§08</span>
      </div>
      <WindowPanel title="system" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Sunday reset · monthly review · 4-week rule.
        </div>

        <Expandable title="sunday reset" defaultOpen>
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {systemSection.sundayReset.steps.map((step, i) => (
              <div key={i} className="priority-item">
                <span className="priority-number">{i + 1}.</span>
                <div>
                  <div className="text-body-sm" style={{ fontWeight: 500 }}>{step.title}</div>
                  <div className="text-micro text-ink-muted">{step.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="monthly review">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {systemSection.monthlyReview.questions.map((q, i) => (
              <div key={i} className="text-body-sm text-ink-muted" style={{ paddingBottom: '4px' }}>
                □ {q}
              </div>
            ))}
          </div>
        </Expandable>

        <Expandable title="4-week rule">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-body-sm" style={{ fontWeight: 500, marginBottom: '4px' }}>{systemSection.fourWeekRule.rule}</p>
            <p className="text-micro text-ink-muted" style={{ marginBottom: '8px' }}>{systemSection.fourWeekRule.lockNote}</p>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '6px', letterSpacing: '0.04em' }}>update protocol</div>
            {systemSection.fourWeekRule.updateProtocol.map((step, i) => (
              <div key={i} className="text-body-sm text-ink-muted" style={{ paddingBottom: '2px' }}>
                {i + 1}. {step}
              </div>
            ))}
            <p className="text-micro text-ink-muted" style={{ marginTop: '6px', fontStyle: 'italic' }}>
              {systemSection.fourWeekRule.warning}
            </p>
          </div>
        </Expandable>
      </WindowPanel>

      {/* §09 Routines */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§09</span>
      </div>
      <WindowPanel title="routines" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Morning · evening. Full and hard-day versions.
        </div>

        <Expandable title="morning — full" defaultOpen>
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginBottom: '8px' }}>
              {routinesSection.morning.full.descriptor}
            </p>
            {routinesSection.morning.full.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '3px' }}>→ {s}</div>
            ))}
            <p className="text-micro text-ink-muted" style={{ marginTop: '6px' }}>
              {routinesSection.morning.full.guard}
            </p>
          </div>
        </Expandable>

        <Expandable title="morning — hard day">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            <p className="text-body-sm text-ink-muted" style={{ fontStyle: 'italic', marginBottom: '8px' }}>
              {routinesSection.morning.hardDay.note}
            </p>
            {routinesSection.morning.hardDay.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '3px' }}>→ {s}</div>
            ))}
          </div>
        </Expandable>

        <Expandable title="evening — full">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {routinesSection.evening.full.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '3px' }}>→ {s}</div>
            ))}
          </div>
        </Expandable>

        <Expandable title="evening — creative dashboard">
          <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
            {routinesSection.evening.creative.steps.map((s, i) => (
              <div key={i} className="text-body-sm" style={{ paddingBottom: '3px' }}>→ {s}</div>
            ))}
          </div>
        </Expandable>
      </WindowPanel>

      {/* §10 Rhythm */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§10</span>
      </div>
      <WindowPanel title="rhythm" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '10px' }}>
          Weekly focus by day. Already in the week view.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className="text-body-sm text-ink-muted">
            Daily and weekly rhythm lives in the week view.
          </p>
          <Link
            href="/weekly"
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: 'var(--color-forest)',
              textDecoration: 'none',
              border: '1px solid var(--color-forest)',
              borderRadius: '2px',
              padding: '4px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            → week view
          </Link>
        </div>
      </WindowPanel>
    </PageShell>
  );
}
