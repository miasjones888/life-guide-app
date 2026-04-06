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

interface ProviderError {
  error: string;
  status: number;
  retryable: boolean;
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

const ANTHROPIC_SYSTEM_PROMPT =
  SYSTEM_PROMPT + '\n\nIMPORTANT: Respond with raw JSON only. No markdown, no code blocks, no extra text.';

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

async function callOpenAI(message: string, apiKey: string): Promise<AssistantResult | ProviderError> {
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

async function callAnthropic(message: string, apiKey: string): Promise<AssistantResult | ProviderError> {
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';

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
        system: ANTHROPIC_SYSTEM_PROMPT,
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

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const providerPref = process.env.AI_PROVIDER ?? 'auto';
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  // Build ordered list of providers to try based on preference
  type ProviderEntry = { name: string; call: () => Promise<AssistantResult | ProviderError> };
  let providers: ProviderEntry[] = [];

  if (providerPref === 'openai') {
    if (!openaiKey) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY. Add it to your environment to use OpenAI.' },
        { status: 503 },
      );
    }
    providers = [{ name: 'OpenAI', call: () => callOpenAI(message, openaiKey) }];
  } else if (providerPref === 'anthropic') {
    if (!anthropicKey) {
      return NextResponse.json(
        { error: 'Missing ANTHROPIC_API_KEY. Add it to your environment to use Anthropic.' },
        { status: 503 },
      );
    }
    providers = [{ name: 'Anthropic', call: () => callAnthropic(message, anthropicKey) }];
  } else {
    // auto: try available providers in order (OpenAI first, then Anthropic)
    if (openaiKey) providers.push({ name: 'OpenAI', call: () => callOpenAI(message, openaiKey) });
    if (anthropicKey) providers.push({ name: 'Anthropic', call: () => callAnthropic(message, anthropicKey) });

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

    // Only fall back to next provider on quota/rate-limit errors
    if (!result.retryable) break;
  }

  return NextResponse.json({ error: lastError?.error ?? 'AI request failed.' }, { status: lastError?.status ?? 502 });
}
