import { google } from 'googleapis';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

function getOAuth2Client() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

// ---------------------------------------------------------------------------
// Calendar
// ---------------------------------------------------------------------------

export interface GCalEvent {
  id: string;
  summary: string;
  start: string;      // ISO datetime or date string
  end: string;
  allDay: boolean;
  colorId?: string;   // Google Calendar color ID (1–11)
  description?: string;
  location?: string;
}

/** Map GCal colorId → hex used in the app's category system */
const COLOR_MAP: Record<string, string> = {
  '1':  '#a4bdfc', // lavender
  '2':  '#33b679', // sage
  '3':  '#8e24aa', // grape
  '4':  '#e67c73', // flamingo
  '5':  '#f6bf26', // banana
  '6':  '#f4511e', // tangerine
  '7':  '#039be5', // peacock
  '8':  '#616161', // graphite
  '9':  '#3f51b5', // blueberry
  '10': '#0b8043', // basil
  '11': '#d50000', // tomato
};

export function getEventColor(colorId?: string): string {
  if (!colorId) return '#6B6760'; // ink-muted default
  return COLOR_MAP[colorId] ?? '#6B6760';
}

/**
 * Fetch events from Google Calendar for a date range.
 * @param timeMin ISO string for range start
 * @param timeMax ISO string for range end
 */
export async function getCalendarEvents(
  timeMin: string,
  timeMax: string
): Promise<GCalEvent[]> {
  const auth = getOAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 50,
  });

  const items = res.data.items ?? [];

  return items.map((item) => {
    const allDay = Boolean(item.start?.date && !item.start?.dateTime);
    const start = item.start?.dateTime ?? item.start?.date ?? '';
    const end = item.end?.dateTime ?? item.end?.date ?? '';
    return {
      id: item.id ?? '',
      summary: item.summary ?? '(no title)',
      start,
      end,
      allDay,
      colorId: item.colorId ?? undefined,
      description: item.description ?? undefined,
      location: item.location ?? undefined,
    };
  });
}

export interface NewCalendarEvent {
  summary: string;
  /** ISO datetime string, e.g. "2026-04-02T09:00:00" */
  startDateTime: string;
  /** ISO datetime string */
  endDateTime: string;
  description?: string;
  colorId?: string;
}

/** Create a new event in Google Calendar. Returns the created event. */
export async function createCalendarEvent(event: NewCalendarEvent): Promise<GCalEvent> {
  const auth = getOAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: event.summary,
      description: event.description,
      colorId: event.colorId,
      start: { dateTime: event.startDateTime, timeZone: 'America/Los_Angeles' },
      end: { dateTime: event.endDateTime, timeZone: 'America/Los_Angeles' },
    },
  });

  const item = res.data;
  return {
    id: item.id ?? '',
    summary: item.summary ?? event.summary,
    start: item.start?.dateTime ?? event.startDateTime,
    end: item.end?.dateTime ?? event.endDateTime,
    allDay: false,
    colorId: item.colorId ?? event.colorId,
  };
}

// ---------------------------------------------------------------------------
// Gmail
// ---------------------------------------------------------------------------

export interface GmailMessage {
  id: string;
  subject: string;
  from: string;
  snippet: string;
  date: string;
  isUnread: boolean;
}

/**
 * Fetch recent unread or important emails.
 * Returns up to maxResults messages with subject, sender, snippet.
 */
export async function getGmailMessages(maxResults = 10): Promise<GmailMessage[]> {
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: 'v1', auth });

  // Fetch unread + important emails from the last 3 days
  const listRes = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread OR is:important newer_than:3d',
    maxResults,
  });

  const messageIds = listRes.data.messages ?? [];
  if (messageIds.length === 0) return [];

  const messages = await Promise.all(
    messageIds.map(async ({ id }) => {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: id!,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'Date'],
      });

      const headers = msg.data.payload?.headers ?? [];
      const get = (name: string) =>
        headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ?? '';

      const labelIds = msg.data.labelIds ?? [];

      return {
        id: id!,
        subject: get('Subject') || '(no subject)',
        from: get('From'),
        snippet: msg.data.snippet ?? '',
        date: get('Date'),
        isUnread: labelIds.includes('UNREAD'),
      };
    })
  );

  return messages;
}
