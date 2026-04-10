'use client';

import React, { useState, useEffect, useRef } from 'react';

type AssistantActionType = 'calendar_create' | 'calendar_update' | 'calendar_delete' | 'email_draft' | 'email_send' | 'plan_next_steps' | 'freeze_mode';

interface AssistantAction {
  type: AssistantActionType;
  title: string;
  payload: Record<string, string>;
}

type ActionStatus = 'idle' | 'loading' | 'done' | 'error';

const CALENDAR_ACTION_TYPES: AssistantActionType[] = ['calendar_create', 'calendar_update', 'calendar_delete'];
const EMAIL_ACTION_TYPES: AssistantActionType[] = ['email_draft', 'email_send'];

type ConversationTurn = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: AssistantAction[];
};

const STARTER_PROMPTS = [
  'Add a vet appointment on April 28 at 11am.',
  'Draft an email to my landlord about lease renewal.',
  "I'm frozen. Give me one 10-minute next step.",
];

const STORAGE_KEY = 'assistant-history';
const PROVIDER_KEY = 'assistant-provider';

type Provider = 'anthropic' | 'openai' | 'gemini';
const PROVIDERS: Provider[] = ['anthropic', 'openai', 'gemini'];

function loadProvider(): Provider {
  try {
    const stored = localStorage.getItem(PROVIDER_KEY);
    if (stored === 'anthropic' || stored === 'openai' || stored === 'gemini') return stored;
  } catch {}
  return 'anthropic';
}

function loadHistory(): ConversationTurn[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is ConversationTurn =>
        typeof t === 'object' &&
        t !== null &&
        ((t as ConversationTurn).role === 'user' ||
          (t as ConversationTurn).role === 'assistant'),
    );
  } catch {
    return [];
  }
}

export default function AssistantPanel() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [provider, setProvider] = useState<Provider>('anthropic');
  // keyed by "${turnIndex}-${actionIndex}"
  const [actionStatuses, setActionStatuses] = useState<Record<string, ActionStatus>>({});
  const [actionErrors, setActionErrors] = useState<Record<string, string>>({});
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(loadHistory());
    setProvider(loadProvider());
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {}
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [messages]);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  async function submit(userMessage?: string) {
    const text = (userMessage ?? message).trim();
    if (!text || isLoading) return;

    const userTurn: ConversationTurn = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userTurn];
    setMessages(updatedMessages);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = updatedMessages.slice(-10).map(({ role, content }) => ({ role, content }));

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, provider }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong while contacting the assistant.');
        return;
      }

      const assistantTurn: ConversationTurn = {
        role: 'assistant',
        content: data.reply ?? '',
        timestamp: new Date().toISOString(),
        actions: Array.isArray(data.actions) && data.actions.length > 0 ? data.actions : undefined,
      };

      setMessages((prev) => [...prev, assistantTurn]);
    } catch {
      setError('Could not reach assistant endpoint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submit();
    }
  }

  function clearHistory() {
    setMessages([]);
    setActionStatuses({});
    setActionErrors({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  function selectProvider(p: Provider) {
    setProvider(p);
    try {
      localStorage.setItem(PROVIDER_KEY, p);
    } catch {}
  }

  async function executeAction(turnIdx: number, actionIdx: number, action: AssistantAction) {
    const key = `${turnIdx}-${actionIdx}`;
    setActionStatuses((prev: Record<string, ActionStatus>) => ({ ...prev, [key]: 'loading' }));
    setActionErrors((prev: Record<string, string>) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    const endpoint = EMAIL_ACTION_TYPES.includes(action.type) ? '/api/email' : '/api/calendar';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: action.type, payload: action.payload }),
      });
      const data = await response.json();

      if (!response.ok) {
        setActionStatuses((prev: Record<string, ActionStatus>) => ({ ...prev, [key]: 'error' }));
        setActionErrors((prev: Record<string, string>) => ({ ...prev, [key]: data.error ?? 'Action failed.' }));
      } else {
        setActionStatuses((prev: Record<string, ActionStatus>) => ({ ...prev, [key]: 'done' }));
      }
    } catch {
      setActionStatuses((prev: Record<string, ActionStatus>) => ({ ...prev, [key]: 'error' }));
      setActionErrors((prev: Record<string, string>) => ({ ...prev, [key]: `Could not reach ${endpoint}.` }));
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

      {messages.length > 0 && (
        <div
          ref={threadRef}
          style={{
            borderTop: '1px solid var(--color-ink-ghost)',
            paddingTop: '8px',
            display: 'grid',
            gap: '12px',
            maxHeight: '360px',
            overflowY: 'auto',
          }}
        >
          {messages.map((turn, turnIdx) => (
            <div key={turnIdx}>
              <div
                className="text-micro text-ink-muted"
                style={{ marginBottom: '3px', letterSpacing: '0.05em' }}
              >
                {turn.role === 'user' ? 'you' : 'assistant'}
              </div>
              <p className="text-body-sm" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {turn.content}
              </p>

              {turn.role === 'assistant' && turn.actions && turn.actions.length > 0 && (
                <div style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
                  {turn.actions.map((action, actionIdx) => {
                    const key = `${turnIdx}-${actionIdx}`;
                    const isCalendarAction = CALENDAR_ACTION_TYPES.includes(action.type);
                    const isEmailAction = EMAIL_ACTION_TYPES.includes(action.type);
                    const isExecutable = isCalendarAction || isEmailAction;
                    const isDestructive = action.type === 'email_send';
                    const status = actionStatuses[key] ?? 'idle';

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
                        key={key}
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
                          {actionErrors[key] && (
                            <div className="text-micro" style={{ color: 'var(--color-tomato)', marginTop: '2px' }}>
                              {actionErrors[key]}
                            </div>
                          )}
                        </div>

                        {isExecutable && (
                          <button
                            type="button"
                            onClick={() => executeAction(turnIdx, actionIdx, action)}
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
              )}
            </div>
          ))}
          {isLoading && (
            <div>
              <div className="text-micro text-ink-muted" style={{ marginBottom: '3px' }}>
                assistant
              </div>
              <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
                thinking…
              </p>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '11px',
            color: 'var(--color-ink-muted)',
          }}
        >
          via:
        </span>
        {PROVIDERS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => selectProvider(p)}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '999px',
              border: `1px solid ${p === provider ? 'var(--color-ink)' : 'var(--color-ink-ghost)'}`,
              background: 'transparent',
              color: p === provider ? 'var(--color-ink)' : 'var(--color-ink-muted)',
              cursor: 'pointer',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
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

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => submit()}
          disabled={isLoading || !message.trim()}
          style={{
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '999px',
            background: 'transparent',
            color: 'var(--color-ink)',
            padding: '6px 12px',
            fontSize: '13px',
            fontFamily: 'Courier New, monospace',
            cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !message.trim() ? 0.6 : 1,
          }}
        >
          {isLoading ? 'thinking…' : 'ask'}
        </button>

        {messages.length > 0 && !isLoading && (
          <button
            type="button"
            onClick={clearHistory}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: 'var(--color-ink-muted)',
              padding: '6px 0',
            }}
          >
            clear history
          </button>
        )}

        <span className="text-micro text-ink-muted" style={{ marginLeft: 'auto' }}>
          ⌘↵ to send
        </span>
      </div>

      {error && (
        <p className="text-micro" style={{ color: 'var(--color-tomato)', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}
