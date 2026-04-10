/**
 * Google Calendar integration — OAuth2 token refresh + read/write utilities.
 * Requires env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
 */

const GCAL_BASE = 'https://www.googleapis.com/calendar/v3';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const TIMEZONE = 'America/Los_Angeles';

// ── Calendar registry ──────────────────────────────────────────────

export const GCAL_CALENDARS = [
  { id: 'miasjones888@gmail.com', name: 'Events' },
  { id: 'd38h5gdrdb07a8bp3f3vo6c1hk@group.calendar.google.com', name: 'Appointments' },
  { id: 'dd2ljltpdigfv0dvrs5nnor21o@group.calendar.google.com', name: 'Social Life' },
  { id: 'rsi9187n2pv7i7l85sp3ikngrg@group.calendar.google.com', name: 'Time Off' },
] as const;

// Maps calendar name → calendar ID for assistant actions
export const CALENDAR_NAME_TO_ID: Record<string, string> = {
  Events: 'miasjones888@gmail.com',
  primary: 'miasjones888@gmail.com',
  Appointments: 'd38h5gdrdb07a8bp3f3vo6c1hk@group.calendar.google.com',
  'Social Life': 'dd2ljltpdigfv0dvrs5nnor21o@group.calendar.google.com',
  'Time Off': 'rsi9187n2pv7i7l85sp3ikngrg@group.calendar.google.com',
};

// ── Auth ───────────────────────────────────────────────────────────

export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  if (!response.ok) {
    throw new Error(`Google token refresh failed: ${await response.text()}`);
  }
  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

// ── Types ──────────────────────────────────────────────────────────

export interface GCalEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  description?: string;
  calendarName: string;
  calendarId: string;
}

// ── Read ───────────────────────────────────────────────────────────

async function fetchCalendarEvents(
  accessToken: string,
  calendarId: string,
  calendarName: string,
  timeMin: string,
  timeMax: string,
): Promise<GCalEvent[]> {
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '100',
  });
  const response = await fetch(
    `${GCAL_BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!response.ok) return [];
  const data = (await response.json()) as { items?: GCalEvent[] };
  return (data.items ?? []).map((item) => ({ ...item, calendarName, calendarId }));
}

export async function fetchAllEvents(): Promise<GCalEvent[]> {
  const accessToken = await getAccessToken();
  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const timeMax = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const results = await Promise.all(
    GCAL_CALENDARS.map((cal) =>
      fetchCalendarEvents(accessToken, cal.id, cal.name, timeMin, timeMax),
    ),
  );

  return results.flat().sort((a, b) => {
    const aTime = a.start.dateTime ?? a.start.date ?? '';
    const bTime = b.start.dateTime ?? b.start.date ?? '';
    return aTime.localeCompare(bTime);
  });
}

// ── Write ──────────────────────────────────────────────────────────

export async function createEvent(
  calendarId: string,
  summary: string,
  startDateTime: string,
  endDateTime: string,
  description?: string,
): Promise<{ id: string; htmlLink?: string }> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${GCAL_BASE}/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary,
        description,
        start: { dateTime: startDateTime, timeZone: TIMEZONE },
        end: { dateTime: endDateTime, timeZone: TIMEZONE },
      }),
    },
  );
  if (!response.ok) throw new Error(`Failed to create event: ${await response.text()}`);
  return response.json() as Promise<{ id: string; htmlLink?: string }>;
}

export async function updateEvent(
  calendarId: string,
  eventId: string,
  updates: {
    summary?: string;
    startDateTime?: string;
    endDateTime?: string;
    description?: string;
  },
): Promise<void> {
  const accessToken = await getAccessToken();
  const patch: Record<string, unknown> = {};
  if (updates.summary) patch.summary = updates.summary;
  if (updates.description !== undefined) patch.description = updates.description;
  if (updates.startDateTime) patch.start = { dateTime: updates.startDateTime, timeZone: TIMEZONE };
  if (updates.endDateTime) patch.end = { dateTime: updates.endDateTime, timeZone: TIMEZONE };
  const response = await fetch(
    `${GCAL_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    },
  );
  if (!response.ok) throw new Error(`Failed to update event: ${await response.text()}`);
}

export async function deleteEvent(calendarId: string, eventId: string): Promise<void> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${GCAL_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to delete event: ${await response.text()}`);
  }
}

// ── Context builder ────────────────────────────────────────────────

export function buildLiveCalendarContext(events: GCalEvent[]): string {
  const now = new Date();
  const todayISO = now.toLocaleDateString('en-CA', { timeZone: TIMEZONE }); // YYYY-MM-DD
  const lines: string[] = [];

  lines.push(
    `LIVE GOOGLE CALENDAR — ${now.toLocaleDateString('en-US', {
      timeZone: TIMEZONE,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`,
  );
  lines.push('Calendars: Events, Appointments, Social Life, Time Off');
  lines.push('');

  // Group events by date
  const byDate = new Map<string, GCalEvent[]>();
  for (const event of events) {
    const dateKey = (event.start.dateTime ?? event.start.date ?? '').slice(0, 10);
    if (!dateKey) continue;
    if (!byDate.has(dateKey)) byDate.set(dateKey, []);
    byDate.get(dateKey)!.push(event);
  }

  // Render each of the next 14 days
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateKey = d.toLocaleDateString('en-CA', { timeZone: TIMEZONE });
    const dayEvents = byDate.get(dateKey) ?? [];

    if (i > 0 && dayEvents.length === 0) continue; // skip empty future days; always show today

    const isToday = dateKey === todayISO;
    const label = isToday
      ? 'TODAY'
      : d.toLocaleDateString('en-US', {
          timeZone: TIMEZONE,
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });

    lines.push(`${label} (${dateKey}):`);

    if (dayEvents.length === 0) {
      lines.push('  (nothing scheduled)');
    } else {
      for (const event of dayEvents) {
        let timeStr = 'all-day ';
        if (event.start.dateTime) {
          timeStr =
            new Date(event.start.dateTime).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              timeZone: TIMEZONE,
            }) + ' ';
        }
        lines.push(
          `  · ${timeStr}— ${event.summary} [${event.calendarName}] {id:${event.id}, cal:${event.calendarId}}`,
        );
        if (event.description) lines.push(`    note: ${event.description}`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}
