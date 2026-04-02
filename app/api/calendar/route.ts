import { NextRequest, NextResponse } from 'next/server';
import { getCalendarEvents, createCalendarEvent } from '@/lib/google';

/** GET /api/calendar — fetch today + next 7 days of events */
export async function GET() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ error: 'Google credentials not configured', events: [] }, { status: 200 });
  }

  try {
    const now = new Date();
    // Start from beginning of today (LA time)
    const timeMin = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date(timeMin);
    timeMax.setDate(timeMax.getDate() + 8);

    const events = await getCalendarEvents(timeMin.toISOString(), timeMax.toISOString());
    return NextResponse.json({ events });
  } catch (err) {
    console.error('[/api/calendar GET]', err);
    return NextResponse.json({ error: 'Failed to fetch calendar events', events: [] }, { status: 200 });
  }
}

/** POST /api/calendar — create a new event */
export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ error: 'Google credentials not configured' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { summary, startDateTime, endDateTime, description, colorId } = body;

    if (!summary || !startDateTime || !endDateTime) {
      return NextResponse.json(
        { error: 'summary, startDateTime, and endDateTime are required' },
        { status: 400 }
      );
    }

    const event = await createCalendarEvent({ summary, startDateTime, endDateTime, description, colorId });
    return NextResponse.json({ event });
  } catch (err) {
    console.error('[/api/calendar POST]', err);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
