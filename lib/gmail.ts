/**
 * Gmail integration — OAuth2 token refresh + read/write utilities.
 * Requires the same env vars as google-calendar.ts:
 * GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
 * Scope needed: https://mail.google.com/
 */

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

// ── Auth ───────────────────────────────────────────────────────────

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

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  isUnread: boolean;
}

// ── Read ───────────────────────────────────────────────────────────

function extractHeader(headers: Array<{ name: string; value: string }>, name: string): string {
  return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? '';
}

export async function fetchRecentEmails(maxResults = 8): Promise<EmailSummary[]> {
  const accessToken = await getAccessToken();

  // List recent inbox message IDs
  const listRes = await fetch(
    `${GMAIL_BASE}/messages?q=in:inbox&maxResults=${maxResults}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!listRes.ok) return [];
  const listData = (await listRes.json()) as { messages?: Array<{ id: string }> };
  const ids = listData.messages ?? [];

  // Fetch metadata for each message in parallel
  const emails = await Promise.all(
    ids.map(async ({ id }) => {
      const msgRes = await fetch(
        `${GMAIL_BASE}/messages/${id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      if (!msgRes.ok) return null;
      const msg = (await msgRes.json()) as {
        id: string;
        snippet: string;
        labelIds: string[];
        payload: { headers: Array<{ name: string; value: string }> };
      };
      return {
        id: msg.id,
        subject: extractHeader(msg.payload.headers, 'Subject') || '(no subject)',
        from: extractHeader(msg.payload.headers, 'From'),
        date: extractHeader(msg.payload.headers, 'Date'),
        snippet: msg.snippet ?? '',
        isUnread: msg.labelIds?.includes('UNREAD') ?? false,
      } satisfies EmailSummary;
    }),
  );

  return emails.filter((e): e is EmailSummary => e !== null);
}

export function buildEmailContext(emails: EmailSummary[]): string {
  if (emails.length === 0) return 'RECENT EMAILS: (inbox empty or unavailable)\n';

  const lines: string[] = ['RECENT INBOX (last 8 emails):'];
  for (const e of emails) {
    const unread = e.isUnread ? ' [UNREAD]' : '';
    lines.push(`  · From: ${e.from}${unread}`);
    lines.push(`    Subject: ${e.subject}`);
    lines.push(`    Date: ${e.date}`);
    lines.push(`    Preview: ${e.snippet.slice(0, 120)}${e.snippet.length > 120 ? '…' : ''}`);
    lines.push(`    {id:${e.id}}`);
    lines.push('');
  }
  return lines.join('\n');
}

// ── Write ──────────────────────────────────────────────────────────

function buildRfc2822(
  from: string,
  to: string,
  subject: string,
  body: string,
  inReplyToMessageId?: string,
): string {
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
  ];
  if (inReplyToMessageId) {
    headers.push(`In-Reply-To: ${inReplyToMessageId}`);
    headers.push(`References: ${inReplyToMessageId}`);
  }
  return headers.join('\r\n') + '\r\n\r\n' + body;
}

function toBase64Url(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getSenderAddress(accessToken: string): Promise<string> {
  const res = await fetch(`${GMAIL_BASE}/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return 'me';
  const data = (await res.json()) as { emailAddress: string };
  return data.emailAddress;
}

export async function createDraft(
  to: string,
  subject: string,
  body: string,
  inReplyToMessageId?: string,
): Promise<{ draftId: string }> {
  const accessToken = await getAccessToken();
  const from = await getSenderAddress(accessToken);
  const raw = toBase64Url(buildRfc2822(from, to, subject, body, inReplyToMessageId));

  const res = await fetch(`${GMAIL_BASE}/drafts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { raw } }),
  });
  if (!res.ok) throw new Error(`Failed to create draft: ${await res.text()}`);
  const data = (await res.json()) as { id: string };
  return { draftId: data.id };
}

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  inReplyToMessageId?: string,
): Promise<{ messageId: string }> {
  const accessToken = await getAccessToken();
  const from = await getSenderAddress(accessToken);
  const raw = toBase64Url(buildRfc2822(from, to, subject, body, inReplyToMessageId));

  const res = await fetch(`${GMAIL_BASE}/messages/send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) throw new Error(`Failed to send email: ${await res.text()}`);
  const data = (await res.json()) as { id: string };
  return { messageId: data.id };
}
