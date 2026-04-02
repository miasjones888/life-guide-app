import { NextResponse } from 'next/server';
import { getCalendarEvents, getGmailMessages } from '@/lib/google';
import { generateDailyDigest } from '@/lib/claude';

// ---------------------------------------------------------------------------
// In-memory cache — resets on server restart, survives page refreshes.
// 1-hour TTL so Claude isn't called on every navigation.
// ---------------------------------------------------------------------------
let cachedDigest: { text: string; generatedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function isCacheValid(): boolean {
  if (!cachedDigest) return false;
  return Date.now() - cachedDigest.generatedAt < CACHE_TTL_MS;
}

/** GET /api/digest — returns a Claude-generated daily brief */
export async function GET() {
  // Return cached result if fresh
  if (isCacheValid()) {
    return NextResponse.json({
      digest: cachedDigest!.text,
      cached: true,
      generatedAt: new Date(cachedDigest!.generatedAt).toISOString(),
    });
  }

  // Without credentials, return empty (client shows nothing / falls back)
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ digest: '', cached: false, generatedAt: null });
  }

  try {
    const now = new Date();
    const laDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    const timeMin = new Date(laDate);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(timeMin);
    timeMax.setDate(timeMax.getDate() + 1);

    const [events, messages] = await Promise.all([
      getCalendarEvents(timeMin.toISOString(), timeMax.toISOString()),
      process.env.ANTHROPIC_API_KEY ? getGmailMessages(10) : Promise.resolve([]),
    ]);

    const dateDisplay = laDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    let digest = '';
    if (process.env.ANTHROPIC_API_KEY) {
      digest = await generateDailyDigest({
        events,
        emails: messages,
        topPriority: 'Contact one therapist today (priority #1)',
        date: dateDisplay,
      });
    }

    cachedDigest = { text: digest, generatedAt: Date.now() };

    return NextResponse.json({
      digest,
      cached: false,
      generatedAt: new Date(cachedDigest.generatedAt).toISOString(),
    });
  } catch (err) {
    console.error('[/api/digest GET]', err);
    return NextResponse.json({ digest: '', cached: false, generatedAt: null });
  }
}

/** DELETE /api/digest — manually bust the cache (for the refresh button) */
export async function DELETE() {
  cachedDigest = null;
  return NextResponse.json({ cleared: true });
}
