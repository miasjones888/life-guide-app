'use server';

import {
  createEvent,
  updateEvent,
  deleteEvent,
  isGoogleCalendarConfigured,
  CALENDAR_NAME_TO_ID,
} from '@/lib/google-calendar';
import { createDraft, sendEmail } from '@/lib/gmail';

interface ActionResult {
  success?: boolean;
  error?: string;
  draftId?: string;
  messageId?: string;
  eventId?: string;
  htmlLink?: string;
}

function toISO(date: string, time: string): string {
  return `${date}T${time}:00`;
}

function defaultEndISO(date: string, startTime: string): string {
  const dt = new Date(`${date}T${startTime}:00`);
  dt.setHours(dt.getHours() + 1);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  const h = String(dt.getHours()).padStart(2, '0');
  const min = String(dt.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}T${h}:${min}:00`;
}

export async function executeCalendarAction(
  type: 'calendar_create' | 'calendar_update' | 'calendar_delete',
  payload: Record<string, string>,
): Promise<ActionResult> {
  if (!isGoogleCalendarConfigured()) {
    return { error: 'Google Calendar is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to your environment.' };
  }

  try {
    if (type === 'calendar_create') {
      const { title, calendarName, date, startTime, endTime, description } = payload;
      if (!title || !date || !startTime) {
        return { error: 'calendar_create requires title, date (YYYY-MM-DD), and startTime (HH:MM).' };
      }
      const calendarId = CALENDAR_NAME_TO_ID[calendarName] ?? CALENDAR_NAME_TO_ID['Events'];
      const start = toISO(date, startTime);
      const end = endTime ? toISO(date, endTime) : defaultEndISO(date, startTime);
      const created = await createEvent(calendarId, title, start, end, description);
      return { success: true, eventId: created.id, htmlLink: created.htmlLink };
    }

    if (type === 'calendar_update') {
      const { eventId, calendarId, title, date, startTime, endTime, description } = payload;
      if (!eventId || !calendarId) {
        return { error: 'calendar_update requires eventId and calendarId.' };
      }
      await updateEvent(calendarId, eventId, {
        summary: title,
        startDateTime: date && startTime ? toISO(date, startTime) : undefined,
        endDateTime: date && endTime ? toISO(date, endTime) : undefined,
        description,
      });
      return { success: true };
    }

    if (type === 'calendar_delete') {
      const { eventId, calendarId } = payload;
      if (!eventId || !calendarId) {
        return { error: 'calendar_delete requires eventId and calendarId.' };
      }
      await deleteEvent(calendarId, eventId);
      return { success: true };
    }

    return { error: `Unknown action type: ${type}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function executeEmailAction(
  type: 'email_draft' | 'email_send',
  payload: Record<string, string>,
): Promise<ActionResult> {
  if (!isGoogleCalendarConfigured()) {
    return { error: 'Google credentials are not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to your environment.' };
  }

  const { to, subject, body, inReplyToMessageId } = payload;
  if (!to || !subject || !body) {
    return { error: 'email actions require to, subject, and body in the payload.' };
  }

  try {
    if (type === 'email_draft') {
      const result = await createDraft(to, subject, body, inReplyToMessageId);
      return { success: true, draftId: result.draftId };
    }

    if (type === 'email_send') {
      const result = await sendEmail(to, subject, body, inReplyToMessageId);
      return { success: true, messageId: result.messageId };
    }

    return { error: `Unknown action type: ${type}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
