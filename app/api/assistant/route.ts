import { NextResponse } from 'next/server';

interface AssistantAction {
  type: 'calendar_create' | 'calendar_update' | 'calendar_delete' | 'email_draft' | 'plan_next_steps' | 'freeze_mode';
  title: string;
  payload: Record<string, string>;
}

interface AssistantResult {
  reply: string;
  actions: AssistantAction[];
}

const SYSTEM_PROMPT = `You are the Life Guide copilot.

Your job:
1) Help with scheduling and calendar updates.
2) Draft concise, warm emails.
3) Organize plans into short actionable steps.
4) Support freeze mode with tiny, compassionate next actions.

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
- If user seems emotionally stuck, include one immediate 5-10 minute action.
- Never claim actions were executed; propose actions only.`;

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

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OPENAI_API_KEY. Add it to your environment to enable GPT features.' },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

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
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `OpenAI request failed: ${text}` }, { status: 502 });
    }

    const completion = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'OpenAI returned an empty response.' }, { status: 502 });
    }

    const result = safeParseAssistantResponse(content);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Unable to reach OpenAI API.' }, { status: 502 });
  }
}
