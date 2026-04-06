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

function defaultEndTime(startTime: string): string {
  // Default to 1 hour after start
  const [h, m] = startTime.split(':').map(Number);
  const endH = String((h + 1) % 24).padStart(2, '0');
  return `${endH}:${String(m).padStart(2, '0')}`;
}

export async function POST(request: Request) {
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
      const end = toISO(date, endTime ?? defaultEndTime(startTime));

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
