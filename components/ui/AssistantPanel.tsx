'use client';

import React, { useState } from 'react';

type AssistantActionType = 'calendar_create' | 'calendar_update' | 'calendar_delete' | 'email_draft' | 'plan_next_steps' | 'freeze_mode';

interface AssistantAction {
  type: AssistantActionType;
  title: string;
  payload: Record<string, string>;
}

interface AssistantResponse {
  reply: string;
  actions: AssistantAction[];
}

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

  async function submit(userMessage?: string) {
    const text = (userMessage ?? message).trim();
    if (!text) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong while contacting GPT.');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
        Ask GPT to help with calendar updates, email drafts, planning, or freeze-mode support.
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
        {isLoading ? 'thinking…' : 'ask gpt'}
      </button>

      {error && (
        <p className="text-micro" style={{ color: 'var(--color-tomato)', margin: 0 }}>
          {error}
        </p>
      )}

      {result && (
        <div style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '8px', display: 'grid', gap: '8px' }}>
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
              <div className="text-micro text-ink-muted" style={{ marginBottom: '4px' }}>
                proposed actions
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', display: 'grid', gap: '4px' }}>
                {result.actions.map((action, index) => (
                  <li key={`${action.type}-${index}`} className="text-body-sm">
                    <strong>{action.title}</strong> <span className="text-ink-muted">({action.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
