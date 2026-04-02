import { NextResponse } from 'next/server';
import { getGmailMessages } from '@/lib/google';

/** GET /api/gmail — fetch recent unread/important emails */
export async function GET() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ error: 'Google credentials not configured', messages: [] }, { status: 200 });
  }

  try {
    const messages = await getGmailMessages(10);
    return NextResponse.json({ messages });
  } catch (err) {
    console.error('[/api/gmail GET]', err);
    return NextResponse.json({ error: 'Failed to fetch emails', messages: [] }, { status: 200 });
  }
}
