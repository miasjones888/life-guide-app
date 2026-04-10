'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import { useBudget } from '@/hooks/useBudget';
import type { BudgetLine, BudgetCategory } from '@/content/types';

// ── Helpers ────────────────────────────────────────────────────────────────

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatMonthLabel(monthKey: string): string {
  // Parse as UTC noon to avoid timezone-driven date shifts
  const d = new Date(monthKey + '-15T12:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).toLowerCase();
}

function fmt(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

const CATEGORY_LABELS: Record<BudgetCategory, string> = {
  income: 'income',
  housing: 'housing',
  food: 'food',
  pets: 'pets',
  health: 'health',
  subscriptions: 'subscriptions',
  transport: 'transport',
  misc: 'misc',
};

// ── Inline-edit amount cell ────────────────────────────────────────────────

interface AmountCellProps {
  lineId: string;
  amount: number;
  month: string | null; // null = baseline edit
  editingId: string | null;
  editingMonth: string | null;
  editValue: string;
  onStart: (id: string, month: string | null, current: number) => void;
  onEditChange: (v: string) => void;
  onCommit: () => void;
  onKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function AmountCell({
  lineId, amount, month,
  editingId, editingMonth, editValue,
  onStart, onEditChange, onCommit, onKey,
}: AmountCellProps) {
  const isEditing = editingId === lineId && editingMonth === month;
  if (isEditing) {
    return (
      <input
        type="number"
        min="0"
        step="1"
        autoFocus
        value={editValue}
        onChange={(e) => onEditChange(e.target.value)}
        onBlur={onCommit}
        onKeyDown={onKey}
        style={{
          width: '80px',
          fontFamily: 'Courier New, monospace',
          fontSize: '13px',
          textAlign: 'right',
          backgroundColor: 'var(--color-chrome)',
          border: '1px solid var(--color-chrome-dark)',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'var(--color-ink)',
          outline: 'none',
        }}
      />
    );
  }
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => onStart(lineId, month, amount)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onStart(lineId, month, amount);
      }}
      style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '13px',
        color: 'var(--color-ink-muted)',
        cursor: 'text',
        minWidth: '44px',
        textAlign: 'right',
        padding: '2px 0',
        display: 'inline-block',
      }}
    >
      {fmt(amount)}
    </span>
  );
}

// ── Line row ───────────────────────────────────────────────────────────────

interface LineRowProps {
  line: BudgetLine;
  showCategory?: boolean;
  editingId: string | null;
  editingMonth: string | null;
  editValue: string;
  onStart: (id: string, month: string | null, current: number) => void;
  onEditChange: (v: string) => void;
  onCommit: () => void;
  onKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function LineRow({ line, showCategory, editingId, editingMonth, editValue, onStart, onEditChange, onCommit, onKey }: LineRowProps) {
  return (
    <div
      className="time-block"
      style={{ borderLeft: '3px solid var(--color-ink-ghost)', paddingLeft: '10px' }}
    >
      <div style={{ flex: 1 }}>
        <div
          className="text-body"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}
        >
          <span style={{ flex: 1 }}>{line.label}</span>
          <AmountCell
            lineId={line.id}
            amount={line.amount}
            month={null}
            editingId={editingId}
            editingMonth={editingMonth}
            editValue={editValue}
            onStart={onStart}
            onEditChange={onEditChange}
            onCommit={onCommit}
            onKey={onKey}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '2px' }}>
          {showCategory && (
            <span className="text-micro text-ink-muted">{CATEGORY_LABELS[line.category]}</span>
          )}
          {line.note && (
            <span className="text-micro text-ink-muted">{line.note}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function BudgetPage() {
  const { state, calculations, updateLineAmount, setMonthOverride } = useBudget();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const { currentMonth, thisMonth, projections } = calculations;
  const currentMonthLabel = formatMonthLabel(currentMonth);

  // Grouped lines
  const incomeLines = state.lines.filter((l) => l.category === 'income');
  const fixedExpenses = state.lines.filter((l) => l.category !== 'income' && l.isFixed && !l.isSubscription);
  const variableExpenses = state.lines.filter((l) => l.category !== 'income' && !l.isFixed);
  const subscriptionLines = state.lines.filter((l) => l.isSubscription);
  const subscriptionTotal = subscriptionLines.reduce((sum, l) => sum + l.amount, 0);

  // Next step: first goal with timing language in note, else first goal
  const nextStepGoal =
    state.goals.find((g) =>
      g.note?.toLowerCase().match(/sunday|monday|tuesday|wednesday|thursday|friday|saturday|today|this week|target/)
    ) ?? state.goals[0];
  const nextStep = nextStepGoal
    ? `${nextStepGoal.label}${nextStepGoal.note ? ` — ${nextStepGoal.note}` : ''}`
    : 'Review your goals.';

  // Inline edit handlers
  function startEdit(id: string, month: string | null, current: number) {
    setEditingId(id);
    setEditingMonth(month);
    setEditValue(String(current));
  }

  function commitEdit() {
    if (!editingId) return;
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed) && parsed >= 0) {
      if (editingMonth) {
        setMonthOverride(editingId, editingMonth, parsed);
      } else {
        updateLineAmount(editingId, parsed);
      }
    }
    setEditingId(null);
    setEditingMonth(null);
    setEditValue('');
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditingMonth(null);
      setEditValue('');
    }
  }

  const netPositive = thisMonth.net >= 0;
  const netDisplay = `${netPositive ? '+' : '-'}${fmt(Math.abs(thisMonth.net))}`;

  return (
    <PageShell>
      {/* Header */}
      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Budget</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Tap any amount to edit. Changes save immediately.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      {/* Status */}
      <div
        style={{
          border: '1px solid #BBBBBB',
          backgroundColor: 'var(--color-paper)',
          borderRadius: '2px',
          padding: '12px',
          marginBottom: '8px',
        }}
      >
        <div className="text-micro text-ink-muted" style={{ marginBottom: '6px' }}>
          {currentMonthLabel}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            fontFamily: 'Courier New, monospace',
            fontSize: '13px',
          }}
        >
          <span>{fmt(thisMonth.income)} in</span>
          <span style={{ color: 'var(--color-ink-ghost)' }}>—</span>
          <span>{fmt(thisMonth.expenses)} out</span>
          <span style={{ color: 'var(--color-ink-ghost)' }}>=</span>
          <span
            style={{
              color: netPositive ? 'var(--color-basil)' : 'var(--color-tomato)',
              fontWeight: 600,
            }}
          >
            {netDisplay}
          </span>
        </div>
      </div>

      {/* Next step */}
      <div
        style={{
          border: '1px solid #BBBBBB',
          backgroundColor: 'var(--color-paper)',
          borderRadius: '2px',
          padding: '12px',
          marginBottom: '10px',
        }}
      >
        <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>next step</div>
        <div className="text-body-sm">→ {nextStep}</div>
      </div>

      {/* §01 Income */}
      <div style={{ marginBottom: '6px', marginTop: '4px' }}>
        <span className="text-micro text-ink-muted">§01</span>
      </div>
      <WindowPanel title="income" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Variable. Update at the start of each month.
        </div>
        {incomeLines.map((line) => (
          <LineRow
            key={line.id}
            line={line}
            editingId={editingId}
            editingMonth={editingMonth}
            editValue={editValue}
            onStart={startEdit}
            onEditChange={setEditValue}
            onCommit={commitEdit}
            onKey={handleKey}
          />
        ))}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '4px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              color: 'var(--color-ink-muted)',
            }}
          >
            <span>total</span>
            <span>{fmt(thisMonth.income)}</span>
          </div>
        </div>
      </WindowPanel>

      {/* §02 Fixed Expenses */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§02</span>
      </div>
      <WindowPanel title="fixed expenses" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Same every month. These don't move.
        </div>
        {fixedExpenses.map((line) => (
          <LineRow
            key={line.id}
            line={line}
            showCategory
            editingId={editingId}
            editingMonth={editingMonth}
            editValue={editValue}
            onStart={startEdit}
            onEditChange={setEditValue}
            onCommit={commitEdit}
            onKey={handleKey}
          />
        ))}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '4px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              color: 'var(--color-ink-muted)',
            }}
          >
            <span>total</span>
            <span>{fmt(fixedExpenses.reduce((s, l) => s + l.amount, 0))}</span>
          </div>
        </div>
      </WindowPanel>

      {/* §03 Variable */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§03</span>
      </div>
      <WindowPanel title="variable" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          These are estimates. Edit when actuals are known.
        </div>
        {variableExpenses.map((line) => (
          <LineRow
            key={line.id}
            line={line}
            showCategory
            editingId={editingId}
            editingMonth={editingMonth}
            editValue={editValue}
            onStart={startEdit}
            onEditChange={setEditValue}
            onCommit={commitEdit}
            onKey={handleKey}
          />
        ))}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '4px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              color: 'var(--color-ink-muted)',
            }}
          >
            <span>total</span>
            <span>{fmt(variableExpenses.reduce((s, l) => s + l.amount, 0))}</span>
          </div>
        </div>
      </WindowPanel>

      {/* §04 Subscriptions */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§04</span>
      </div>
      <WindowPanel
        title="subscriptions"
        active
        statusText={`${fmt(subscriptionTotal)}/mo`}
        style={{ marginBottom: '10px' }}
      >
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Audit this Sunday. Cancel anything unused.
        </div>
        {subscriptionLines.map((line) => (
          <LineRow
            key={line.id}
            line={line}
            editingId={editingId}
            editingMonth={editingMonth}
            editValue={editValue}
            onStart={startEdit}
            onEditChange={setEditValue}
            onCommit={commitEdit}
            onKey={handleKey}
          />
        ))}
      </WindowPanel>

      {/* §05 Month View */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§05</span>
      </div>
      <WindowPanel title="month view" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          Tap income to set a month-specific actual without changing your baseline.
        </div>
        {projections.map((proj) => {
          const isCurrent = proj.month === currentMonth;
          const projNet = proj.net;
          const projNetPositive = projNet >= 0;
          const projNetDisplay = `${projNetPositive ? '+' : ''}${Math.round(projNet).toLocaleString()}`;
          // Find the primary income line for per-month override editing
          const freelanceLine = state.lines.find((l) => l.id === 'income-freelance');
          const monthIncomeOverride = state.overrides.find(
            (o) => o.id === 'income-freelance' && o.month === proj.month
          );
          const displayIncome = monthIncomeOverride ? monthIncomeOverride.amount : (freelanceLine?.amount ?? proj.income);
          return (
            <div
              key={proj.month}
              className="time-block"
              style={{
                borderLeft: `3px solid ${isCurrent ? 'var(--color-forest)' : 'var(--color-ink-ghost)'}`,
                paddingLeft: '10px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  className="text-body"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
                >
                  <span
                    style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {formatMonthLabel(proj.month)}
                    {isCurrent && (
                      <span className="tag">now</span>
                    )}
                    {monthIncomeOverride && (
                      <span className="tag" style={{ borderColor: 'var(--color-moss)', color: 'var(--color-moss)' }}>actual</span>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '12px',
                      color: projNetPositive ? 'var(--color-basil)' : 'var(--color-tomato)',
                    }}
                  >
                    {projNetDisplay}
                  </span>
                </div>
                <div className="text-micro text-ink-muted" style={{ marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AmountCell
                    lineId="income-freelance"
                    amount={displayIncome}
                    month={proj.month}
                    editingId={editingId}
                    editingMonth={editingMonth}
                    editValue={editValue}
                    onStart={startEdit}
                    onEditChange={setEditValue}
                    onCommit={commitEdit}
                    onKey={handleKey}
                  />
                  <span style={{ color: 'var(--color-ink-ghost)' }}>in ·</span>
                  <span>{fmt(proj.expenses)} out</span>
                  {!projNetPositive && (
                    <span className="tag" style={{ borderColor: 'var(--color-tomato)', color: 'var(--color-tomato)' }}>tight</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </WindowPanel>

      {/* §06 Goals */}
      <div style={{ marginBottom: '6px', marginTop: '8px' }}>
        <span className="text-micro text-ink-muted">§06</span>
      </div>
      <WindowPanel title="goals" style={{ marginBottom: '10px' }}>
        <div className="text-micro text-ink-muted" style={{ paddingBottom: '6px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '6px' }}>
          What you're working toward.
        </div>
        {state.goals.map((goal) => (
          <div
            key={goal.id}
            className="time-block"
            style={{ borderLeft: '3px solid var(--color-ink-ghost)', paddingLeft: '10px' }}
          >
            <div style={{ flex: 1 }}>
              <div className="text-body">{goal.label}</div>
              {goal.targetAmount && (
                <div className="text-micro text-ink-muted">target: {fmt(goal.targetAmount)}</div>
              )}
              {goal.note && (
                <div className="text-micro text-ink-muted">{goal.note}</div>
              )}
            </div>
          </div>
        ))}
      </WindowPanel>
    </PageShell>
  );
}
