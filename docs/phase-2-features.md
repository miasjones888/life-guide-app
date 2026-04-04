# Phase 2 Features

Planned features for the next development pass. Each entry documents the what, why, and all viable
implementation routes — so any AI tool or developer can pick it up.

---

## Feature 1 — Chat-to-Update-Calendar

### What it does

A conversational interface for adding, editing, or removing calendar entries using natural language.

Examples:
- "Add a vet appointment for Maisie on April 28th at 11am"
- "Move the hair appointment to Saturday at 2pm"
- "Add a reminder to call the psychiatry office every Monday at 10am"

### Why it matters

Currently all calendar content lives in `content/calendar.ts` as static TypeScript constants.
Updates require editing that file and redeploying. A chat interface removes that friction and makes
the app genuinely useful from a phone.

---

### Option 1 — Edit `calendar.ts` via Claude API

**How it works:**
- In-app chat panel sends the user's message to the Claude API (Anthropic SDK)
- Claude uses function calling to identify the change (add / update / delete event)
- The API response updates `calendar.ts` directly (via Claude Code or a build-time script)
- App reads the updated file on next load

**Best for:** Users comfortable with Claude Code who don't need real-time sync.
**Tradeoff:** Requires a redeploy or a server-side file write to persist changes.

---

### Option 2 — Google Calendar API + any AI ⭐ Recommended

**How it works:**
- Replace static `aprilOneTimeEvents` (and eventually all event arrays) with live calls to
  `gcal_list_events` from the Google Calendar MCP
- In-app chat panel sends the user's message to any AI (Claude, Gemini, GPT)
- AI interprets the request and calls the appropriate GCal tool:
  - `gcal_create_event` — add new event
  - `gcal_update_event` — edit existing event
  - `gcal_delete_event` — remove event
- App reads live from Google Calendar on each load (or with caching)

**Best for:** Phone-first usage; syncs with iOS Calendar; no redeploy needed.
**Tradeoff:** Requires Google Calendar API access and a backend AI call endpoint.
**Note:** Gmail MCP and GCal MCP tools are already available in the current session setup.
This is the most natural extension of the existing tooling.

**AI options (all work with GCal API):**
| AI | Notes |
|---|---|
| Claude (Anthropic) | Already integrated via MCP; most context about the life guide |
| Gemini | Native Google product; tightest GCal integration |
| GPT-4o | Function calling is mature; widely documented |

---

### Option 3 — localStorage form (no AI)

**How it works:**
- Simple in-app form: title, date, time, category, optional note
- Event saved to localStorage
- At render time, localStorage events are merged with static `calendar.ts` events
- Works offline; no server; no AI

**Best for:** Fast, private, minimal complexity. Good interim solution.
**Tradeoff:** Data lives only on that device. No sync. No natural language.

---

### Option 4 — Notion database + AI

**How it works:**
- All calendar data lives in a Notion database (one row per event)
- In-app chat calls AI with Notion MCP tools:
  - `notion-create-pages` — add event
  - `notion-update-page` — edit event
- App reads from Notion API at build time or runtime

**Best for:** Users already using Notion as their life OS.
**Tradeoff:** Requires Notion API setup; adds Notion as a dependency.
**Note:** Notion MCP tools are available in the current session setup.

---

### Recommended implementation path

**Start with Option 3** (localStorage form) to unblock phone-side calendar edits immediately —
zero infrastructure, works offline.

**Then upgrade to Option 2** (Google Calendar API) to get real sync across devices. The GCal MCP
tools are already wired up; the main work is replacing the static event arrays with live API calls
and building a simple chat panel that routes to the right GCal tool.

---

## Feature 2 — Guide sections §05–§10

The guide currently has §01–§04 (Priorities, Finance, Care, Field).
The interaction model describes 10 sections. Remaining sections need content authored first:

| § | Section | Content source |
|---|---|---|
| §05 | Body | Skincare routine, movement, sleep, meals |
| §06 | Home | Room reset phases, laundry, cleaning rhythm |
| §07 | Health | Medications, therapy notes, psychiatry |
| §08 | System | Weekly reset, monthly review, reflection prompts |
| §09 | Routines | Morning full + hard-day, evening full + hard-day |
| §10 | Rhythm | Weekly focus by day (already in `/weekly` — link or embed) |

These sections will be populated from `docs/life-guide.md` once content is finalized there.

---

## Feature 3 — Desktop sidebar navigation

The interaction model describes a 240px sticky sidebar for viewports ≥ 768px.
Currently the app uses the same bottom nav on all screen sizes.

Implementation: responsive layout in `components/layout/PageShell.tsx` that switches from
BottomNav to a SideNav at 768px. No new routing logic needed — same links, different layout.

---

## Notes

- All features are additive — nothing here breaks the current v1
- Option 2 (GCal live) is the highest-leverage single change for making the app feel alive
- Scheduled briefs (docs/scheduled-agents.md) and chat-to-update-calendar can share the same
  AI integration layer once built
