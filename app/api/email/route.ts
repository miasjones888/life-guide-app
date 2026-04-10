import { NextResponse } from 'next/server';
import { createDraft, sendEmail } from '@/lib/gmail';
import { isGoogleCalendarConfigured } from '@/lib/google-calendar';

interface EmailActionBody {
  type: 'email_draft' | 'email_send';
  payload: {
    to: string;
    subject: string;
    body: string;
    inReplyToMessageId?: string;
  };
}

export async function POST(request: Request) {
  const expectedSecret = process.env.NEXT_PUBLIC_WRITE_SECRET;
  if (expectedSecret && request.headers.get('x-write-secret') !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { error: 'Google credentials are not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to your environment.' },
      { status: 503 },
    );
  }

  const body = (await request.json()) as EmailActionBody;
  const { type, payload } = body;
  const { to, subject, body: emailBody, inReplyToMessageId } = payload;

  if (!to || !subject || !emailBody) {
    return NextResponse.json(
      { error: 'email actions require to, subject, and body in the payload.' },
      { status: 400 },
    );
  }

  try {
    if (type === 'email_draft') {
      const result = await createDraft(to, subject, emailBody, inReplyToMessageId);
      return NextResponse.json({ success: true, draftId: result.draftId });
    }

    if (type === 'email_send') {
      const result = await sendEmail(to, subject, emailBody, inReplyToMessageId);
      return NextResponse.json({ success: true, messageId: result.messageId });
    }

    return NextResponse.json({ error: `Unknown action type: ${type}` }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
