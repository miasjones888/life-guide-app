'use client';

import React, { useState } from 'react';

type AssistantActionType = 'calendar_create' | 'calendar_update' | 'calendar_delete' | 'email_draft' | 'email_send' | 'plan_next_steps' | 'freeze_mode';

interface AssistantAction {
  type: AssistantActionType;
  title: string;
  payload: Record<string, string>;
}

interface AssistantResponse {
  reply: string;
  actions: AssistantAction[];
}

type ActionStatus = 'idle' | 'loading' | 'done' | 'error';

const CALENDAR_ACTION_TYPES: AssistantActionType[] = ['calendar_create', 'calendar_update', 'calendar_delete'];
const EMAIL_ACTION_TYPES: AssistantActionType[] = ['email_draft', 'email_send'];

const STARTER_PROMPTS = [
  'Add a vet appointment on April 28 at 11am.',
  'Draft an email to my landlord about lease renewal.',
  "I'm frozen. Give me one 10-minute next step.",
];

export default function AssistantPanel() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AssistantResponse | null>(null);
  const [actionStatuses, setActionStatuses] = useState<Record<number, ActionStatus>>({});
  const [actionErrors, setActionErrors] = useState<Record<number, string>>({});

  async function submit(userMessage?: string) {
    const text = (userMessage ?? message).trim();
    if (!text) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setActionStatuses({});
    setActionErrors({});

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }

      setResult(data);
      setMessage('');
    } catch {
      setError('Could not reach assistant endpoint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function executeAction(index: number, action: AssistantAction) {
    setActionStatuses((prev) => ({ ...prev, [index]: 'loading' }));
    setActionErrors((prev) => { const next = { ...prev }; delete next[index]; return next; });

    const endpoint = EMAIL_ACTION_TYPES.includes(action.type) ? '/api/email' : '/api/calendar';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: action.type, payload: action.payload }),
      });
      const data = await response.json();

      if (!response.ok) {
        setActionStatuses((prev) => ({ ...prev, [index]: 'error' }));
        setActionErrors((prev) => ({ ...prev, [index]: data.error ?? 'Action failed.' }));
      } else {
        setActionStatuses((prev) => ({ ...prev, [index]: 'done' }));
      }
    } catch {
      setActionStatuses((prev) => ({ ...prev, [index]: 'error' }));
      setActionErrors((prev) => ({ ...prev, [index]: `Could not reach ${endpoint}.` }));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
        Ask for help with scheduling, email drafts, planning, or freeze-mode support.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submit(prompt)}
            className="tag"
            style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit(); }}
        placeholder="What do you want help with right now?"
        rows={3}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-ink-ghost)',
          borderRadius: '8px',
          padding: '8px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: 'var(--color-ink)',
          outline: 'none',
          resize: 'vertical',
        }}
      />

      <button
        type="button"
        onClick={() => submit()}
        disabled={isLoading || !message.trim()}
        style={{
          alignSelf: 'flex-start',
          border: '1px solid var(--color-ink-ghost)',
          borderRadius: '999px',
          background: 'transparent',
          color: 'var(--color-ink)',
          padding: '6px 12px',
          fontSize: '13px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'thinking…' : 'ask'}
      </button>

      {error && (
        <p className="text-micro" style={{ color: 'var(--color-tomato)', margin: 0 }}>
          {error}
        </p>
      )}

      {result && (
        <div style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '8px', display: 'grid', gap: '12px' }}>
          <div>
            <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>
              assistant
            </div>
            <p className="text-body-sm" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {result.reply}
            </p>
          </div>

          {result.actions.length > 0 && (
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '6px' }}>
                proposed actions
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {result.actions.map((action, index) => {
                  const isCalendarAction = CALENDAR_ACTION_TYPES.includes(action.type);
                  const isEmailAction = EMAIL_ACTION_TYPES.includes(action.type);
                  const isExecutable = isCalendarAction || isEmailAction;
                  const isDestructive = action.type === 'email_send';
                  const status = actionStatuses[index] ?? 'idle';

                  const confirmLabel =
                    action.type === 'email_draft' ? 'save draft'
                    : action.type === 'email_send' ? 'send'
                    : 'confirm';

                  const doneLabel =
                    action.type === 'email_draft' ? 'drafted'
                    : action.type === 'email_send' ? 'sent'
                    : 'done';

                  return (
                    <div
                      key={`${action.type}-${index}`}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '8px',
                        border: '1px solid var(--color-ink-ghost)',
                        borderRadius: '6px',
                        opacity: status === 'done' ? 0.6 : 1,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="text-body-sm">
                          <strong>{action.title}</strong>
                        </div>
                        <div className="text-micro text-ink-muted">{action.type}</div>
                        {action.payload.body && (
                          <div className="text-micro text-ink-muted" style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>
                            {action.payload.body.slice(0, 200)}{action.payload.body.length > 200 ? '…' : ''}
                          </div>
                        )}
                        {actionErrors[index] && (
                          <div className="text-micro" style={{ color: 'var(--color-tomato)', marginTop: '2px' }}>
                            {actionErrors[index]}
                          </div>
                        )}
                      </div>

                      {isExecutable && (
                        <button
                          type="button"
                          onClick={() => executeAction(index, action)}
                          disabled={status === 'loading' || status === 'done'}
                          style={{
                            flexShrink: 0,
                            border: `1px solid ${isDestructive && status === 'idle' ? 'var(--color-tomato)' : 'var(--color-ink-ghost)'}`,
                            borderRadius: '999px',
                            background: status === 'done' ? 'var(--color-forest)' : 'transparent',
                            color: status === 'done' ? '#fff' : isDestructive && status === 'idle' ? 'var(--color-tomato)' : 'var(--color-ink)',
                            padding: '4px 10px',
                            fontSize: '12px',
                            cursor: status === 'loading' || status === 'done' ? 'not-allowed' : 'pointer',
                            opacity: status === 'loading' ? 0.6 : 1,
                          }}
                        >
                          {status === 'loading' ? 'working…' : status === 'done' ? doneLabel : confirmLabel}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
