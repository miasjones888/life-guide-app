# Scheduled Brief Agents

Two Claude agents to register via `/schedule` when the claude.ai connection is stable.

---

## Agent 1 — Daily Brief
**Name:** `life-guide-daily-brief`
**Cron:** `30 6 * * *` (6:30am every day)

### Prompt

```
Read /home/user/life-guide-app/content/calendar.ts and /home/user/life-guide-app/content/guide.ts.

Compute today's date and determine:
- Day of week (0=Sun through 6=Sat), day name (e.g. "thursday"), month+day display (e.g. "april 2")
- WEEKLY_FOCUS label from this map: {0:"life planning reset",1:"portfolio work",2:"notion R&D + life admin",3:"notion R&D + portfolio work",4:"buffer / life admin",5:"systems work",6:"creative exploration"}

Collect from dailyEvents:
- Events where isNonNegotiable === true (non-negotiables list)
- Next 4–5 events with a time after 6:30am, sorted ascending by time (parse "7:30am"/"9:00pm" to minutes)

Collect from aprilOneTimeEvents: any events where `date` === today's ISO date (YYYY-MM-DD).

From priorities: first item where isLocked is not true = current focus.

Grounding phrase by day: Mon/Wed/Fri → "Non-negotiable on whether, flexible on which." | Tue/Thu → "Everything for today is written down." | Sat → "body + spirituality + feedstock in one block. Don't plan it to death. Just go outside." | Sun → "That is the whole task. Nothing else is required."

Use gmail_get_profile to get the user's email address.
Use gmail_create_draft with To and From set to that address.

Subject: your brief for [day name], [month day]

Body (plain text, — as section divider, · as bullet):

[day name]. [focus label].

—

non-negotiables
· [time]  [emoji] [title]
(one line per non-negotiable event)

coming up
· [time]  [title]
(next 4–5 daily events after 6:30am)

[ONLY if one-time events exist today — include this block:]
today
· [emoji] [title][  time if present]

current focus
→ [priority title]

—

[grounding phrase]

Tone: spare, warm, non-compliance. Personal field guide entry, not a productivity notification. No greeting, no sign-off.
```

---

## Agent 2 — Weekly + Monthly Brief
**Name:** `life-guide-weekly-brief`
**Cron:** `0 18 * * 0` (6:00pm every Sunday)

### Prompt

```
Read /home/user/life-guide-app/content/calendar.ts and /home/user/life-guide-app/content/guide.ts.

Today is Sunday. Compute today's date.

WEEKLY_FOCUS map: {0:"life planning reset",1:"portfolio work",2:"notion R&D + life admin",3:"notion R&D + portfolio work",4:"buffer / life admin",5:"systems work",6:"creative exploration"}

Determine the coming week: Monday through Saturday dates.
For each day Mon–Sat, note the WEEKLY_FOCUS label. Also note any special weekly events from weeklyEvents that have extra context (e.g. Wednesday has "deep focus (protected)", Thursday has "outside time").

Check biweeklyEvents: for each, calculate whether it falls in the coming week using startDate + 14-day intervals. Include any that land Mon–Sat.

Check aprilOneTimeEvents: include any where `date` falls Mon–Sat of the coming week.

Top 2 non-locked priorities from the priorities array.

Determine if this is the LAST Sunday of the month: check if today.getDate() + 7 > number of days in current month. If yes, this is the monthly brief Sunday — include monthly budget steps and monthly recurring events.

Use gmail_get_profile to get the user's email address.
Use gmail_create_draft with To and From set to that address.

Subject (regular week): the week ahead — [mon month day]–[sat month day]
Subject (last Sunday of month): the week ahead + monthly reset — [mon month day]–[sat month day]

Body (plain text, — as section divider, · as bullet):

sunday. life planning reset.

—

the week ahead
Mon  [focus label][  · special note if applicable]
Tue  [focus label]
Wed  [focus label]  · deep focus (protected)
Thu  [focus label]  · outside time
Fri  [focus label]
Sat  [focus label]

[ONLY if biweekly events land this week:]
recurring this week
· [title] ([day name])

[ONLY if one-time events land this week:]
one-time this week
· [day name, date]  [title]

current focus
→ [priority 1 title]
→ [priority 2 title]

[ONLY if last Sunday of month — add this entire block:]
—

monthly reset this week
[for each monthlyBudgetStep: [order]. [title] — [description]]

monthly recurring items
· [title for each monthlyEvent]

—

That is the whole task. Nothing else is required.

Tone: spare, warm, non-compliance. Reads like a weekly field guide briefing. No greeting, no sign-off.
```

---

## To register these agents

In a Claude Code session, run:

```
/schedule
```

Then paste the prompt for each agent when prompted, with the cron and name specified above.
Or ask Claude: "set up the scheduled brief agents" — the prompts are saved here.
