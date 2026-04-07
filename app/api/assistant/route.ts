import { NextResponse } from 'next/server';
import {
  dailyEvents,
  weeklyEvents,
  biweeklyEvents,
  aprilOneTimeEvents,
} from '@/content/calendar';
import { priorities, financeUrgentItems, modularNote } from '@/content/guide';
import type { DayOfWeek } from '@/content/types';
import {
  isGoogleCalendarConfigured,
  fetchAllEvents,
  buildLiveCalendarContext,
} from '@/lib/google-calendar';
import { fetchRecentEmails, buildEmailContext } from '@/lib/gmail';

interface AssistantAction {
  type: 'calendar_create' | 'calendar_update' | 'calendar_delete' | 'email_draft' | 'email_send' | 'plan_next_steps' | 'freeze_mode';
  title: string;
  payload: Record<string, string>;
}

interface AssistantResult {
  reply: string;
  actions: AssistantAction[];
}

interface ProviderError {
  error: string;
  status: number;
  retryable: boolean;
}

// ── Calendar context ──────────────────────────────────────────────

const WEEKLY_FOCUS: Record<number, string> = {
  0: 'life planning reset',
  1: 'portfolio work',
  2: 'notion R&D + life admin',
  3: 'notion R&D + portfolio work',
  4: 'buffer / life admin',
  5: 'systems work',
  6: 'creative exploration',
};

const DAY_NAMES: DayOfWeek[] = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
];

function buildCalendarContext(): string {
  const now = new Date();
  const todayISO = now.toISOString().split('T')[0];
  const dayIndex = now.getDay();
  const dayName = DAY_NAMES[dayIndex];
  const monthName = now.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const dayOfMonth = now.getDate();
  const weekFocus = WEEKLY_FOCUS[dayIndex];

  const lines: string[] = [];

  lines.push(`TODAY: ${dayName}, ${monthName} ${dayOfMonth} (${todayISO})`);
  lines.push(`TODAY'S FOCUS: ${weekFocus}`);
  lines.push('');

  // Daily recurring schedule
  lines.push("DAILY SCHEDULE (every day):");
  for (const e of dailyEvents) {
    const flag = e.isNonNegotiable ? ' [NON-NEGOTIABLE — never move]' : '';
    lines.push(`  ${e.time ?? 'anytime'} — ${e.emoji ?? ''} ${e.title}${flag}`);
    if (e.note) lines.push(`    "${e.note}"`);
  }
  lines.push('');

  // Today's weekly events
  const todayWeekly = weeklyEvents.filter(e => e.days?.includes(dayName));
  if (todayWeekly.length > 0) {
    lines.push("TODAY'S WEEKLY EVENTS:");
    for (const e of todayWeekly) {
      const isProtected = e.note?.toLowerCase().includes('protected') ? ' [PROTECTED TIME — do not schedule over]' : '';
      lines.push(`  ${e.time ?? 'anytime'} — ${e.emoji ?? ''} ${e.title}${isProtected}`);
      if (e.note) lines.push(`    "${e.note}"`);
    }
    lines.push('');
  }

  // Biweekly events (check if any fall in the next 14 days)
  const upcomingBiweekly = biweeklyEvents.filter(e => {
    if (!e.startDate) return false;
    const start = new Date(e.startDate + 'T12:00:00');
    const diffMs = start.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    // Check if any 14-day interval from startDate lands within next 14 days
    const cyclePosition = ((diffDays % 14) + 14) % 14;
    return cyclePosition <= 14;
  });
  if (upcomingBiweekly.length > 0) {
    lines.push('BIWEEKLY EVENTS (coming up):');
    for (const e of upcomingBiweekly) {
      lines.push(`  · ${e.title}`);
    }
    lines.push('');
  }

  // Upcoming one-time events (next 14 days)
  const upcoming = aprilOneTimeEvents.filter(e => {
    if (!e.date) return false;
    const eventDate = new Date(e.date + 'T12:00:00');
    const diffDays = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= -1 && diffDays <= 14;
  });
  if (upcoming.length > 0) {
    lines.push('UPCOMING ONE-TIME EVENTS (next 14 days):');
    for (const e of upcoming) {
      const urgent = e.isUrgent ? ' [URGENT]' : '';
      const timeStr = e.time ? ` ${e.time}` : '';
      lines.push(`  ${e.date}${timeStr} — ${e.title}${urgent}`);
      if (e.note) lines.push(`    note: ${e.note}`);
    }
    lines.push('');
  }

  // Current priorities
  const active = priorities.filter(p => !p.isLocked);
  lines.push('CURRENT PRIORITIES:');
  for (const p of active) {
    const urgent = p.isUrgent ? ' [URGENT]' : '';
    const ongoing = p.isOngoing ? ' [ongoing]' : '';
    lines.push(`  ${p.rank}. ${p.title} — next action: ${p.nextAction}${urgent}${ongoing}`);
  }
  lines.push('');

  // Urgent finance items
  if (financeUrgentItems.length > 0) {
    lines.push('URGENT FINANCE ITEMS:');
    for (const f of financeUrgentItems) {
      const amt = f.amount ? ` (${f.amount})` : '';
      lines.push(`  · ${f.title}${amt} — ${f.action ?? f.note}`);
    }
    lines.push('');
  }

  // Scheduling rules
  lines.push('SCHEDULING RULES:');
  lines.push(`  · ${modularNote}`);
  lines.push('  · Non-negotiable events (cat meds, personal meds, financial deadlines) cannot be moved or removed.');
  lines.push('  · Wednesday 10am Deep Focus and Thursday 2pm Outside Time are protected — do not schedule over them.');
  lines.push('  · When suggesting a new event, check for conflicts with the schedule above.');
  lines.push('');

  // Category legend
  lines.push('CATEGORY LEGEND:');
  lines.push('  tomato    = cat care');
  lines.push('  flamingo  = personal / relationships / self-care');
  lines.push('  banana    = food / finance');
  lines.push('  sage      = routines / grounding');
  lines.push('  blueberry = work / deep focus');
  lines.push('  basil     = outdoor / nature');
  lines.push('  graphite  = maintenance / admin / home');
  lines.push('  grape     = planning / creative direction');
  lines.push('  tangerine = urgent / deadlines');
  lines.push('  peacock   = spiritual / optional');

  return lines.join('\n');
}

// ── System prompt ─────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are the Life Guide copilot for Mia.

Mia is a writer, copywriter, and creative director in San Diego. She lives with her partner Dar and three cats (Maisie, Meeko, and a third named Jinshi). She has depression, anxiety, CPTSD, and ADHD. She has significant task initiation difficulty and variable energy day to day. She has built her own life system to work with her neurodivergence, not against it.

This app is her field guide — a read-first, reference-first tool. Not a productivity dashboard. Not a task manager.

Your job:
1) Help with scheduling and calendar updates. You have access to her live Google Calendar (Events, Appointments, Social Life, Time Off) provided below. When she asks to add, move, or remove something, check for conflicts and flag any issues with non-negotiable or protected events. For calendar_create, include calendarName (Events / Appointments / Social Life / Time Off), date (YYYY-MM-DD), startTime (HH:MM 24h), endTime (HH:MM 24h), and title in the payload. For calendar_update or calendar_delete, include eventId and calendarId from the schedule data.
2) Read, draft, and send emails. You have access to her recent inbox (provided below). For email_draft (saves to Gmail drafts) or email_send (sends immediately — user must confirm), include to, subject, and body in the payload. For replies, also include inReplyToMessageId from the inbox data. Write in Mia's voice: spare, warm, direct. Never formal or corporate.
3) Organize plans into short, actionable steps — no more than 3 at a time.
4) Support freeze mode with one tiny, compassionate next action (5–10 min max). One thing. Not a list.

Tone: spare, warm, non-compliance. Short sentences. No filler. Never motivational, never corporate, never cheerful. No "You've got this!" No "Great job!" Reads like a personal field guide entry, not a productivity app.

Hard-day principle: the minimum is always enough. Never imply that doing less is failure.

Return strict JSON with this exact shape:
{
  "reply": "string",
  "actions": [
    {
      "type": "calendar_create | calendar_update | calendar_delete | email_draft | plan_next_steps | freeze_mode",
      "title": "string",
      "payload": { "key": "value" }
    }
  ]
}

Rules:
- Keep reply under 120 words.
- If user seems emotionally stuck or frozen, return exactly one immediate action (5–10 minutes). Not a list. One thing.
- Never claim actions were executed; propose actions only.
- Never add greetings or sign-offs to replies.
- Preserve Mia's voice and exact phrasing if she provides copy to use.
- When proposing a calendar_create or calendar_update, include "time", "title", "category", and "date" in the payload where known.`;

async function buildSystemPrompt(): Promise<string> {
  let calendarSection: string;
  let emailSection: string;

  if (isGoogleCalendarConfigured()) {
    const [eventsResult, emailsResult] = await Promise.allSettled([
      fetchAllEvents(),
      fetchRecentEmails(8),
    ]);

    calendarSection =
      eventsResult.status === 'fulfilled'
        ? buildLiveCalendarContext(eventsResult.value)
        : `[Google Calendar fetch failed: ${eventsResult.reason instanceof Error ? eventsResult.reason.message : 'unknown error'}]\n\n${buildCalendarContext()}`;

    emailSection =
      emailsResult.status === 'fulfilled'
        ? buildEmailContext(emailsResult.value)
        : `[Gmail fetch failed: ${emailsResult.reason instanceof Error ? emailsResult.reason.message : 'unknown error'}]`;
  } else {
    calendarSection = `[Google Calendar not configured — using static schedule]\n\n${buildCalendarContext()}`;
    emailSection = '[Gmail not configured — email features unavailable]';
  }

  return `${BASE_SYSTEM_PROMPT}\n\n---\n\n${calendarSection}\n---\n\n${emailSection}`;
}

// ── Provider calls ────────────────────────────────────────────────

function safeParseAssistantResponse(input: string): AssistantResult {
  const parsed = JSON.parse(input) as Partial<AssistantResult>;
  const reply = typeof parsed.reply === 'string' ? parsed.reply : 'I can help with that. Tell me what you want to do first.';
  const actions = Array.isArray(parsed.actions)
    ? parsed.actions.filter(
        (action): action is AssistantAction =>
          typeof action === 'object' &&
          action !== null &&
          typeof (action as AssistantAction).type === 'string' &&
          typeof (action as AssistantAction).title === 'string' &&
          typeof (action as AssistantAction).payload === 'object' &&
          (action as AssistantAction).payload !== null,
      )
    : [];

  return { reply, actions };
}

async function callOpenAI(message: string, apiKey: string, systemPrompt: string): Promise<AssistantResult | ProviderError> {
  const model = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        error: `OpenAI request failed: ${text}`,
        status: 502,
        retryable: response.status === 429 || response.status === 529,
      };
    }

    const completion = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      return { error: 'OpenAI returned an empty response.', status: 502, retryable: false };
    }

    return safeParseAssistantResponse(content);
  } catch {
    return { error: 'Unable to reach OpenAI API.', status: 502, retryable: false };
  }
}

async function callAnthropic(message: string, apiKey: string, systemPrompt: string): Promise<AssistantResult | ProviderError> {
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';
  const anthropicPrompt = systemPrompt + '\n\nIMPORTANT: Respond with raw JSON only. No markdown, no code blocks, no extra text. The "reply" field must follow the tone guidelines above.';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: anthropicPrompt,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        error: `Anthropic request failed: ${text}`,
        status: 502,
        retryable: response.status === 429 || response.status === 529,
      };
    }

    const completion = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };

    const content = completion.content?.find((c) => c.type === 'text')?.text;
    if (!content) {
      return { error: 'Anthropic returned an empty response.', status: 502, retryable: false };
    }

    return safeParseAssistantResponse(content);
  } catch {
    return { error: 'Unable to reach Anthropic API.', status: 502, retryable: false };
  }
}

function isProviderError(result: AssistantResult | ProviderError): result is ProviderError {
  return 'error' in result;
}

// ── Route handler ─────────────────────────────────────────────────

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const systemPrompt = await buildSystemPrompt();

  const providerPref = process.env.AI_PROVIDER ?? 'auto';
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  type ProviderEntry = { name: string; call: () => Promise<AssistantResult | ProviderError> };
  let providers: ProviderEntry[] = [];

  if (providerPref === 'openai') {
    if (!openaiKey) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY. Add it to your environment to use OpenAI.' },
        { status: 503 },
      );
    }
    providers = [{ name: 'OpenAI', call: () => callOpenAI(message, openaiKey, systemPrompt) }];
  } else if (providerPref === 'anthropic') {
    if (!anthropicKey) {
      return NextResponse.json(
        { error: 'Missing ANTHROPIC_API_KEY. Add it to your environment to use Anthropic.' },
        { status: 503 },
      );
    }
    providers = [{ name: 'Anthropic', call: () => callAnthropic(message, anthropicKey, systemPrompt) }];
  } else {
    if (openaiKey) providers.push({ name: 'OpenAI', call: () => callOpenAI(message, openaiKey, systemPrompt) });
    if (anthropicKey) providers.push({ name: 'Anthropic', call: () => callAnthropic(message, anthropicKey, systemPrompt) });

    if (providers.length === 0) {
      return NextResponse.json(
        { error: 'No AI provider configured. Add OPENAI_API_KEY or ANTHROPIC_API_KEY to your environment.' },
        { status: 503 },
      );
    }
  }

  let lastError: ProviderError | null = null;

  for (const provider of providers) {
    const result = await provider.call();

    if (!isProviderError(result)) {
      return NextResponse.json(result);
    }

    lastError = result;

    if (!result.retryable) break;
  }

  return NextResponse.json({ error: lastError?.error ?? 'AI request failed.' }, { status: lastError?.status ?? 502 });
}
