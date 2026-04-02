import Anthropic from '@anthropic-ai/sdk';
import type { GCalEvent, GmailMessage } from './google';

const client = new Anthropic();

export interface DigestInput {
  events: GCalEvent[];
  emails: GmailMessage[];
  topPriority: string;
  date: string; // e.g. "Thursday, April 2, 2026"
}

/**
 * Generate a concise daily briefing using Claude Haiku.
 * Returns plain text (no markdown) — 5–8 sentences, matter-of-fact tone.
 */
export async function generateDailyDigest(input: DigestInput): Promise<string> {
  const { events, emails, topPriority, date } = input;

  const eventList =
    events.length > 0
      ? events
          .map((e) => {
            const time = e.allDay
              ? 'all day'
              : new Date(e.start).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'America/Los_Angeles',
                });
            return `- ${time}: ${e.summary}`;
          })
          .join('\n')
      : 'No events on the calendar today.';

  const emailList =
    emails.length > 0
      ? emails
          .slice(0, 5)
          .map((m) => `- ${m.subject} (from: ${m.from.split('<')[0].trim()})`)
          .join('\n')
      : 'No unread or important emails.';

  const prompt = `You are writing a brief daily run-down for a single person named Mia. She has depression, anxiety, ADHD, and CPTSD. She uses this app to reduce cognitive load.

Today is ${date}.

CALENDAR EVENTS TODAY:
${eventList}

RECENT UNREAD / IMPORTANT EMAILS:
${emailList}

TOP PRIORITY TODAY:
${topPriority}

Write a daily run-down in 5–8 plain sentences. Rules:
- Matter-of-fact tone. No positivity theater. No "great news!" or "exciting day ahead!"
- Lead with what is actually happening today (event count, any non-standard events).
- Mention any urgent or time-sensitive items clearly.
- Note the top priority task.
- If there are any emails that look actionable or urgent, mention the subject.
- End with one sentence that is anchoring but not motivational — just orienting. Something like "Everything for today is written down."
- Plain prose only. No bullet points, no headers, no markdown.`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== 'text') return '';
  return block.text.trim();
}
