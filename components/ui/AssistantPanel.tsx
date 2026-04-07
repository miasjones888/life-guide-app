'use client';

import React, { useState, useEffect, useRef } from 'react';

type ConversationTurn = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

const STARTER_PROMPTS = [
  "I'm frozen. Give me one thing I can do right now.",
  "What's one outdoor or movement thing that might help today?",
  "Help me think through one thing that's been sitting on me.",
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
        (t as ConversationTurn).role === 'user' ||
        (t as ConversationTurn).role === 'assistant',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
        One thing at a time. One step at a time.
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
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {messages.map((turn, i) => (
            <div key={i}>
              <div
                className="text-micro text-ink-muted"
                style={{ marginBottom: '3px', letterSpacing: '0.05em' }}
              >
                {turn.role === 'user' ? 'you' : 'assistant'}
              </div>
              <p
                className="text-body-sm"
                style={{ margin: 0, whiteSpace: 'pre-wrap' }}
              >
                {turn.content}
              </p>
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

        <span
          className="text-micro text-ink-muted"
          style={{ marginLeft: 'auto' }}
        >
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
