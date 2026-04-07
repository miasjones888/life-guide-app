import { NextResponse } from 'next/server';
import type { WishlistCategory } from '@/content/types';

interface CategorizeRequest {
  titles: string[];
}

interface CategorizeResponse {
  categories: WishlistCategory[];
}

const SYSTEM_PROMPT = `You are a content categorizer. Given a list of titles (video titles, book names, movie names, product names, etc.), categorize each one into exactly one of these categories:

- "movie": films, documentaries, short films, cinema
- "show": TV shows, series, anime, mini-series, web series
- "book": books, novels, memoirs, audiobooks, comics, graphic novels
- "experience": travel destinations, restaurants, activities, events, places to visit, things to do
- "want": physical products, items to buy, fashion, gear, gadgets, food items to try
- "other": anything that doesn't clearly fit the above

Rules:
- Return ONLY a JSON object with a "categories" array of strings, matching the input array order
- Each element must be exactly one of: "movie", "show", "book", "experience", "want", "other"
- No explanations, no markdown, just the JSON object

Example input: ["Dune Part Two", "The Bear Season 3", "Atomic Habits", "Cafe in Paris", "Nike Air Max 90"]
Example output: {"categories":["movie","show","book","experience","want"]}`;

async function callOpenAI(titles: string[], apiKey: string): Promise<WishlistCategory[] | null> {
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
        temperature: 0.1,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: JSON.stringify(titles) },
        ],
        response_format: { type: 'json_object' },
      }),
    });
    if (!response.ok) return null;
    const completion = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = completion.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = JSON.parse(content) as Partial<CategorizeResponse>;
    if (!Array.isArray(parsed.categories)) return null;
    return parsed.categories as WishlistCategory[];
  } catch {
    return null;
  }
}

async function callAnthropic(titles: string[], apiKey: string): Promise<WishlistCategory[] | null> {
  const model = process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5-20251001';
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
        max_tokens: 2048,
        system: SYSTEM_PROMPT + '\n\nIMPORTANT: Respond with raw JSON only. No markdown, no code blocks.',
        messages: [{ role: 'user', content: JSON.stringify(titles) }],
      }),
    });
    if (!response.ok) return null;
    const completion = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const content = completion.content?.find((c) => c.type === 'text')?.text;
    if (!content) return null;
    const parsed = JSON.parse(content) as Partial<CategorizeResponse>;
    if (!Array.isArray(parsed.categories)) return null;
    return parsed.categories as WishlistCategory[];
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as CategorizeRequest;
  const { titles } = body;

  if (!Array.isArray(titles) || titles.length === 0) {
    return NextResponse.json({ error: 'titles array is required.' }, { status: 400 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const validCategories: WishlistCategory[] = ['want', 'experience', 'movie', 'show', 'book', 'other'];

  // Try OpenAI first, then Anthropic
  let categories: WishlistCategory[] | null = null;

  if (openaiKey) {
    categories = await callOpenAI(titles, openaiKey);
  }
  if (!categories && anthropicKey) {
    categories = await callAnthropic(titles, anthropicKey);
  }

  if (!categories) {
    // Fallback: return 'other' for everything if no AI available
    const fallback: WishlistCategory[] = titles.map(() => 'other');
    return NextResponse.json({ categories: fallback });
  }

  // Validate and sanitize — ensure array length matches and all values are valid
  const sanitized: WishlistCategory[] = titles.map((_, i) => {
    const cat = categories![i];
    return validCategories.includes(cat) ? cat : 'other';
  });

  return NextResponse.json({ categories: sanitized });
}
