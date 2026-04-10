import { NextResponse } from 'next/server';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  isGoogleCalendarConfigured,
  CALENDAR_NAME_TO_ID,
} from '@/lib/google-calendar';

interface CalendarActionBody {
  type: 'calendar_create' | 'calendar_update' | 'calendar_delete';
  payload: Record<string, string>;
}

function toISO(date: string, time: string): string {
  // date: YYYY-MM-DD, time: HH:MM (24h)
  return `${date}T${time}:00`;
}

function defaultEndISO(date: string, startTime: string): string {
  const dt = new Date(`${date}T${startTime}:00`);
  dt.setHours(dt.getHours() + 1);
  const d = dt.toISOString().split('T')[0];
  const t = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
  return `${d}T${t}:00`;
}

export async function POST(request: Request) {
  const expectedSecret = process.env.NEXT_PUBLIC_WRITE_SECRET;
  if (expectedSecret && request.headers.get('x-write-secret') !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { error: 'Google Calendar is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to your environment.' },
      { status: 503 },
    );
  }

  const body = (await request.json()) as CalendarActionBody;
  const { type, payload } = body;

  try {
    if (type === 'calendar_create') {
      const { title, calendarName, date, startTime, endTime, description } = payload;

      if (!title || !date || !startTime) {
        return NextResponse.json(
          { error: 'calendar_create requires title, date (YYYY-MM-DD), and startTime (HH:MM).' },
          { status: 400 },
        );
      }

      const calendarId = CALENDAR_NAME_TO_ID[calendarName] ?? CALENDAR_NAME_TO_ID['Events'];
      const start = toISO(date, startTime);
      const end = endTime ? toISO(date, endTime) : defaultEndISO(date, startTime);

      const created = await createEvent(calendarId, title, start, end, description);
      return NextResponse.json({ success: true, eventId: created.id, htmlLink: created.htmlLink });
    }

    if (type === 'calendar_update') {
      const { eventId, calendarId, title, date, startTime, endTime, description } = payload;

      if (!eventId || !calendarId) {
        return NextResponse.json(
          { error: 'calendar_update requires eventId and calendarId.' },
          { status: 400 },
        );
      }

      await updateEvent(calendarId, eventId, {
        summary: title,
        startDateTime: date && startTime ? toISO(date, startTime) : undefined,
        endDateTime: date && endTime ? toISO(date, endTime) : undefined,
        description,
      });
      return NextResponse.json({ success: true });
    }

    if (type === 'calendar_delete') {
      const { eventId, calendarId } = payload;

      if (!eventId || !calendarId) {
        return NextResponse.json(
          { error: 'calendar_delete requires eventId and calendarId.' },
          { status: 400 },
        );
      }

      await deleteEvent(calendarId, eventId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: `Unknown action type: ${type}` }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
