import { NextResponse } from 'next/server';
import { priorities } from '@/content/guide';

interface AssistantResult {
  reply: string;
}

interface ProviderError {
  error: string;
  status: number;
  retryable: boolean;
}

type ApiMessage = { role: string; content: string };

function buildSystemPrompt(): string {
  const top3 = priorities
    .slice(0, 3)
    .map((p) => `${p.rank}. ${p.title} — ${p.nextAction}${p.isUrgent ? ' (urgent)' : ''}`)
    .join('\n');

  return `You are a care-centered companion inside Mia's personal field guide. You accompany — you do not direct, score, or measure.

Current context:
${top3}
Non-negotiables today: cat meds (Maisie + Meeko, morning and evening), personal meds (morning + bedtime)
Location: San Diego, CA (92115)
Moving research: ongoing — she is actively researching relocation in the area

Rules:
- Always offer one concrete next step, not a list. One thing. Under 10 minutes.
- When she says she is frozen or overwhelmed: do not respond with a plan. Give her one physical or sensory step that breaks the lock. Under 5 minutes.
- You do not optimize, score, or judge. You do not track completion. You do not reference what she "should have" done. You offer options. She decides.
- Do not suggest she work more. Do not reframe rest as failure. Do not add to her list unprompted.
- Never claim actions were executed. Propose only.
- Keep reply under 150 words.

Return strict JSON with this exact shape:
{
  "reply": "string"
}`;
}

function safeParseAssistantResponse(input: string): AssistantResult {
  const parsed = JSON.parse(input) as Partial<AssistantResult>;
  const reply =
    typeof parsed.reply === 'string'
      ? parsed.reply
      : "I'm here. Tell me what's going on right now.";
  return { reply };
}

async function callOpenAI(messages: ApiMessage[], apiKey: string): Promise<AssistantResult | ProviderError> {
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
        temperature: 0.5,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...messages.slice(-10),
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

async function callAnthropic(messages: ApiMessage[], apiKey: string): Promise<AssistantResult | ProviderError> {
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';
  const systemPrompt = buildSystemPrompt() + '\n\nIMPORTANT: Respond with raw JSON only. No markdown, no code blocks, no extra text.';

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
        system: systemPrompt,
        messages: messages.slice(-10),
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
  const body = (await request.json()) as { messages?: ApiMessage[] };
  const incomingMessages = body.messages;

  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    return NextResponse.json({ error: 'messages array is required.' }, { status: 400 });
  }

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
    providers = [{ name: 'OpenAI', call: () => callOpenAI(incomingMessages, openaiKey) }];
  } else if (providerPref === 'anthropic') {
    if (!anthropicKey) {
      return NextResponse.json(
        { error: 'Missing ANTHROPIC_API_KEY. Add it to your environment to use Anthropic.' },
        { status: 503 },
      );
    }
    providers = [{ name: 'Anthropic', call: () => callAnthropic(incomingMessages, anthropicKey) }];
  } else {
    // auto: try available providers in order (OpenAI first, then Anthropic)
    if (openaiKey) providers.push({ name: 'OpenAI', call: () => callOpenAI(incomingMessages, openaiKey) });
    if (anthropicKey) providers.push({ name: 'Anthropic', call: () => callAnthropic(incomingMessages, anthropicKey) });

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
