import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import { priorities, workLocations, pets, vetInfo, financeUrgentItems, verbatimCopy } from '@/content/guide';

export default function GuidePage() {
  const urgentPriorities = priorities.filter((p) => p.isUrgent);
  const lockedPriorities = priorities.filter((p) => p.isLocked);
  const activePriorities = priorities.filter((p) => !p.isLocked && !p.isOngoing);
  const ongoingPriorities = priorities.filter((p) => p.isOngoing);

  return (
    <PageShell>
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Field Guide</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Projects, priorities, reference information.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Priorities */}
      <WindowPanel title="PRIORITY STACK" active style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Ranked by urgency and sequencing. Locked items depend on earlier items.
        </div>
        {priorities.map((p) => (
          <div
            key={p.rank}
            className="priority-item"
            style={{
              borderLeft: p.isUrgent
                ? '3px solid var(--color-tomato)'
                : p.isLocked
                ? '3px solid var(--color-graphite)'
                : p.isOngoing
                ? '3px solid var(--color-basil)'
                : '3px solid var(--color-forest)',
              paddingLeft: '10px',
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
                <span>{p.title}</span>
                {p.isLocked && (
                  <span className="tag">locked</span>
                )}
                {p.isUrgent && (
                  <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>urgent</span>
                )}
                {p.isOngoing && (
                  <span className="tag" style={{ borderColor: 'var(--color-basil)', color: 'var(--color-basil)' }}>ongoing</span>
                )}
              </div>
              <div className="text-body-sm" style={{ color: 'var(--color-ink-muted)', marginTop: '1px' }}>
                {p.status} — {p.nextAction}
              </div>
            </div>
          </div>
        ))}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '4px' }}>
          <p className="text-micro text-ink-muted italic">{verbatimCopy.wholeTask}</p>
        </div>
      </WindowPanel>

      {/* Finance */}
      <WindowPanel title="FINANCE — URGENT" style={{ marginBottom: '10px' }}>
        {financeUrgentItems.map((item, i) => (
          <div
            key={i}
            className="time-block"
            style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}
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
                    style={{ color: 'var(--color-tomato)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {item.amount}
                  </span>
                )}
              </div>
              <div className="text-body-sm text-ink-muted">{item.note}</div>
              {item.action && (
                <div className="text-micro" style={{ color: 'var(--color-tangerine)', marginTop: '2px' }}>
                  → {item.action}
                </div>
              )}
            </div>
          </div>
        ))}
      </WindowPanel>

      {/* Pet Care */}
      <WindowPanel title="PET CARE — REFERENCE" style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '12px' }}>
          <div className="text-h2" style={{ marginBottom: '6px' }}>Vet</div>
          <div className="text-body-sm" style={{ borderLeft: '3px solid var(--color-tomato)', paddingLeft: '10px' }}>
            <div style={{ fontWeight: 500 }}>{vetInfo.name}</div>
            <div className="text-body-sm text-ink-muted">{vetInfo.address}</div>
            <div>
              <a
                href={`tel:${vetInfo.phone.replace(/\D/g, '')}`}
                style={{ color: 'var(--color-forest)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}
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
              {pet.gender && (
                <span className="tag">{pet.gender}</span>
              )}
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
                  <div
                    key={j}
                    className="text-body-sm"
                    style={{ color: 'var(--color-tomato)' }}
                  >
                    ⚠ {item}
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

      {/* Work Locations */}
      <WindowPanel title="WORK LOCATIONS — SAN DIEGO" statusText="Within 25 min of 92115" style={{ marginBottom: '10px' }}>
        {workLocations.map((loc, i) => (
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
      </WindowPanel>

      {/* Verbatim Reference */}
      <WindowPanel title="REFERENCE — KEY PHRASES" style={{ marginBottom: '10px' }}>
        {Object.entries(verbatimCopy).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '8px 0',
              borderBottom: '1px solid var(--color-ink-ghost)',
            }}
          >
            <p className="text-body-sm" style={{ fontStyle: 'italic' }}>"{value}"</p>
          </div>
        ))}
      </WindowPanel>
    </PageShell>
  );
}
