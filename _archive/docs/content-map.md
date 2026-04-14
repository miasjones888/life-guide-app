# Content Map — Life Guide Web App

## Overview

This document maps the content from the Life Guide (docs/life-guide.md) and Calendar System (docs/calendar.md) to the interface structure of the web application. Use this as the blueprint for deciding what goes where, how content is organized, and what each screen or section should contain.

Claude Code should read this alongside the source content files before generating the implementation plan.

---

## Application Sections

### 1. Today / Dashboard

**Purpose:** Quick answer to "what is happening right now and what should I do?"

**Content to include:**
- Current date and time (display only)
- Today's anchor task (pulled from or entered manually)
- Urgent / time-sensitive items from the Urgent section of the guide
- Today's scheduled events from the daily rhythm (next 3–4 events from the daily timeline)
- One-time events on today's date (from the one-time events list in calendar.md)
- The Prioritization Snapshot — top 3 items only, with next action visible

**Priority callout (always visible at top if any of these are unresolved):**
- Contact therapist
- Schedule psychiatry
- Pay Shop Pay $112.50
- Resolve Petal card
- File taxes (if before April 15)
- Send animal photos to Amber (if before April 25)

**Display notes:**
- This section should be scannable in under 10 seconds
- No more than 7 items visible without scrolling
- Urgent items appear at the top with Tangerine/red indicator
- Collapsible event descriptions

---

### 2. Daily Rhythm

**Purpose:** The full day sequence — a reference for what the day looks like.

**Content to include:**
All daily recurring events from calendar.md, in time order:

| Time | Event | Color |
|---|---|---|
| 7:30am | Morning Routine | Sage |
| 8:00am | Morning Skincare | Flamingo |
| 9:00am | Cat Morning Meds | Tomato |
| 9:15am | Breakfast | Banana |
| 9:30am | AM Cat Playtime | Tomato |
| 12:30pm | Cat Midday Snack + Play | Tomato |
| 1:00pm | Eaten today? | Banana |
| 6:30pm | Dinner | Banana |
| 7:30pm | PM Cat Playtime | Tomato |
| 9:00pm | Evening Routine + Cat Evening Meds | Tomato/Sage |
| 9:30pm | Bedtime Meds | Tomato |
| 9:45pm | Night Skincare | Flamingo |
| 11:00pm | Lights Out | Graphite |

**Every 2 days indicator:** Shower check-in (7:30pm) — display on relevant days

**Display notes:**
- Vertical timeline layout on mobile
- Current time highlighted if viewing today
- Tap to expand full event description (from docs/life-guide.md event descriptions)
- Small "modular" note below the timeline: "Everything except cat meds and personal meds can be rescheduled."

---

### 3. Weekly System

**Purpose:** The full week structure — reference for what each day is supposed to hold.

**Content to include:**

Weekly structure by day:

| Day | Key Events |
|---|---|
| Monday | Rest / recovery. No structured work blocks. |
| Tuesday | Room reset 5:30pm |
| Wednesday | 🔵 Deep Focus: Project Session 10am |
| Thursday | 🌿 Outside Time 2pm |
| Friday | Cat brushing 7pm |
| Saturday | Buddhism (Optional) 9am, 🔵 Creative Session 10am, Laundry 2pm, Room reset 5:30pm |
| Sunday | Cat Full Groom 10am, Self-Care Block 11am, Call Mom 4pm, Check in w/ Sister 5pm, Instacart 6:30pm, Notes → Notecards 6:45pm, Weekly Setup 7pm |

**Weekly Setup steps (expandable):**
1. Review the week ahead in Google Calendar
2. Choose one anchor task per project folder
3. Write three weekly intentions in main notebook
4. Check the grocery list for anything missing
5. Write anchor task for Monday in the notebook

**Deep Focus Session rules (expandable):**
- Phone down. No email. No browsing. No switching.
- Anything that comes up goes on an index card.
- 90-120 minutes. Then stop.
- No project is worked on without its folder open.

**Bi-weekly events (indicate recurrence):**
- Check in with Annie — every 2 weeks
- Creative Adventure — every 2 weeks
- Trader Joe's Frozen Meal Check — every 2 weeks

**Display notes:**
- Day-by-day view, collapsed by default to show day label and count of events
- Expand each day to see full event list
- Modular note visible at top of section

---

### 4. Monthly System

**Purpose:** Reference for the first Sunday of each month and ongoing monthly logistics.

**Content to include:**

**Monthly Reset (First Sunday, 9am–11:30am):**
1. Review index card stack — what has become actionable?
2. Review three active project folders — is each still the right three?
3. Update the prioritization list — what has shifted?
4. Look at the paper calendar for the coming month
5. Write a single sentence for the month
6. Review the Must Buy List

**Budget Hour (First Sunday, 11am–12:30pm):**
1. Open the bank app — review in/out since last month
2. Check for failed payments or unexpected charges
3. Run subscription audit — cancel anything unused
4. Check Shop Pay / Afterpay / Klarna for upcoming due dates
5. Note Must Buy items that fit in budget
6. Pay rent if due at end of month

**Monthly recurring events table:**
| Timing | Event |
|---|---|
| First Sunday 9am | Monthly Reset + Budget Hour |
| First Sunday 1pm | Cat Supply Check |
| 2nd of month | Pay Credit Card Bill |
| 15th of month | Pay Mom |
| Last day of month | Pay Partner Rent (3-day advance) |
| Monthly | Reorder Cat Medication |
| Every 11 days | Vet Food Check |
| First Friday | Rotate Cat Toys |
| Every 60 days | Check/Replace Scratchers |

**Display notes:**
- Checklist format for Monthly Reset and Budget Hour steps
- Monthly events as a compact table
- One Month System Review callout: "Next allowed system changes: May 1st"

---

### 5. Projects

**Purpose:** Quick reference for the three active projects and the project type system.

**Content to include:**

**Active Projects (3 slots):**

| # | Project | Type | Status | Next Action |
|---|---|---|---|---|
| 1 | Portfolio | Type 1 — Build | Active | Open the folder |
| 2 | Field Guide | Type 1 — Build | Active | Open the folder |
| 3 | Curriculum Tracker | Type 1 — Build | Active | Open the folder |

**Project Type System (expandable):**

Type 1 — Build: folder, slot, weekly move, deliverable, end state
Type 2 — Structured Learning: folder, slot, weekly move, end state (moving through, not building)
Type 3 — Practice: no folder, no slot, no move, no end state

Combined ceiling: max 3 active slots (Type 1 + Type 2 combined). Soft limit: 2 structured commitments.

**Current practices (Type 3):**
- Morning pages
- Sitting practice
- Outside time
- Applied Buddhism class (transitioning from Type 2 to Type 3 when 2026 year ends)

**Upcoming Type 2:**
- Sculpture class — Tuesdays 6-8pm, May 19 – Jun 23 (Tao of Clay, Josh Herman)
- Chthonic Archive curriculum — opens when Curriculum Tracker build closes

**Warning sign callout:**
> A practice that generates guilt, that you feel behind on, or that you are managing rather than moving through has crossed into obligation. Pause it, give it a folder if it needs structure, or let it go.

**Display notes:**
- Project cards showing name, type badge, and next action
- Project type explainer in expandable/collapsible section
- "Slot count" display: "3 of 3 slots active"

---

### 6. Prioritization

**Purpose:** Instant answer to "what should I work on?"

**Content to include:**

| Priority | Item | Status | Next Action |
|---|---|---|---|
| 1 | Therapy | Infrastructure | Contact one therapist today |
| 2 | Psychiatry | No appointment | Schedule this week |
| 3 | Unpacking | In progress | 20-minute room reset |
| 4 | Portfolio | Active build | Open the folder |
| 5 | Field Guide | Active build | Open the folder |
| 6 | Curriculum Tracker | Active build | Open the folder |
| 7 | Move Decision | Not yet actionable | Hold |
| 8 | Budget | Urgent | Subscription audit this Sunday |
| 9 | Job Applications | Locked | Unlocks when Portfolio done |
| 10 | Creative Tech Skills | Locked | Unlocks when Curriculum done |
| 11 | Grounding | Ongoing | Outside time Thursday |

**Display notes:**
- Numbered list, top items visually emphasized
- Status badges (Active / Urgent / Locked / Hold / Infrastructure)
- Locked items slightly de-emphasized visually
- Compact — scannable in under 5 seconds

---

### 7. Reference Sections

These are less frequently accessed but important for completeness. Can live under a collapsible "Reference" navigation item or a dedicated "Reference" tab.

#### 7a. Pet Care System

**Content:**
- Daily cat schedule (table — from docs/life-guide.md cat care section)
- Weekly cat tasks
- Monthly cat tasks
- Vet contacts: Mission Valley Pet Clinic, (619) 281-2934, 4329 Twain Ave
- Maisie: on Prozac, vet services due now, add to pet insurance
- Meeko: on medications
- Jinshi: male, no current meds

**Display:** Reference table, simple and clean.

#### 7b. Finance + Admin

**Content:**
- Urgent this cycle (callout block — high visibility):
  - Petal card: payment failed — resolve now
  - Shop Pay Tao of Clay: $112.50 — pay with different card NOW
  - Taxes: April 15 deadline
  - Capital One double charge: $10 from ANTHROPIC x2 — verify
- Monthly fixed payments (table)
- Gap gift cards: ~$125–150 (Banana Republic, Old Navy, Athleta accept them too)
- Subscription audit reminder
- Chicago flights email — reply by EOD Thursday

**Display:** Urgent items in Tangerine callout at top, rest as reference table.

#### 7c. Creative Work System

**Content:**
- The gap between idea and page (guide text)
- The Index Card Start method (three questions before writing)
- Work locations in San Diego within 25 minutes of 92115:
  - Living Room Coffeehouse — 5900 El Cajon Blvd (open until 11pm)
  - Scrimshaw Coffee — 5542 El Cajon Blvd (closes 6pm)
  - Holsem Coffee — 2911 University Ave, North Park
  - Communal Coffee — 2335 University Ave
  - Muri Coffee & Dessert — 2528 University Ave (4.8★)
  - Good Omen Coffee Co — 4590 Park Blvd, University Heights (4.7★, open 6:30am)
  - Provecho Coffee — 1955 Julian Ave, Barrio Logan (inside Bread & Salt, 4.9★)
  - Lovesong Coffee + Market — 3022 N Park Way (plants, outlets, best matcha)
  - Lestat's on Park — 4496 Park Blvd (24 hours — late night only)
  - The Book Catapult — 3010 Juniper St, South Park (4.9★ — research/feedstock destination)
- Research states (freestanding / build-embedded / project-adjacent)
- Notes → Notecards workflow

**Display:** Work locations as a compact list with notes. Research states as brief labeled descriptions.

#### 7d. Notes → Notecards System

**Content:**
- Workflow steps:
  1. Capture in Notes app when out
  2. Sunday 6:45pm: transfer to notecards
  3. One note per card
  4. Cards go into stack
  5. Monthly Reset: review stack
- What goes on a card vs. not
- Notecard formats (fragment, question, reference, map, research)
- Anchor task format for nightly notebook

**Display:** Numbered workflow steps, card format examples in a subtle box.

#### 7e. Lists

**Content:**
- Must Buy List: kept in back of main notebook. Items that need to be purchased when money allows. Not urgent, just tracked.
- Grocery List: building throughout the week, used for Sunday Instacart order.

Note: These lists live in the paper system. This section in the app is a reminder of where they live, not a digital list.

**Display:** Simple callout noting that lists are paper-based.

---

### 8. System Updates

**Purpose:** Reference for how and when to update the system. Visible when user needs to change something.

**Content:**
- The 4-week rule: try the current version for 4 weeks before changing
- One month lock: no system changes until May 1st one-month review
- Update protocol:
  1. Wait 4 weeks
  2. Open new Claude conversation
  3. Share current guide + prompt describing the change
  4. Workshop the change together
  5. Update calendar and guide
  6. Run new version for 4 weeks
- One change at a time
- Questions to ask before changing anything (from "Give It a Month" section)

**Display:** Step-by-step process list, callout with the 4-week rule prominently displayed.

---

## Content Priority Hierarchy

When in doubt about what to show or hide by default:

**Always visible (never collapse):**
- Urgent/time-sensitive items
- Today's next 3 events
- Top 3 prioritization items
- Cat meds alarms (these are non-negotiable)
- Financial deadlines with dates

**Default collapsed, tap to expand:**
- Full event descriptions
- Project type system explanation
- Monthly Reset full steps
- Budget Hour full steps
- Work location list

**In reference section only (not on main views):**
- Full notecard format guides
- Full research state descriptions
- Full system update protocol steps
- Color system legend

---

## Content Notes for Implementation

1. **Source of truth:** All content in docs/life-guide.md and docs/calendar.md. Do not invent or paraphrase — use content as written.

2. **Cat med alarms** appear in multiple sections (daily rhythm, pet care, today view). This is intentional — they are the only non-modular daily events.

3. **The modular task note** should appear in: Daily Rhythm, Weekly System, and Today views. Use identical phrasing each time: "Tasks are modular. Everything except cat meds, your meds, and financial deadlines can be rescheduled."

4. **Urgents are time-sensitive.** Several items in the urgent list have hard dates (taxes April 15, Amber session April 25, Glen Ivy booking, etc.). The app should reflect these dates accurately. Do not treat them as permanent fixtures.

5. **Color system** is functional, not decorative. The 10 calendar colors map directly to categories. Every event displayed in the app should carry its correct category color as a small visual indicator, consistent with how they appear in Google Calendar.

6. **No backend required for v1.** All content is static. Content can be stored in JSON or pulled from the markdown files directly. The app is a reference tool, not a data entry tool.

7. **The guide is versioned.** This is v1, locked April 2026. The system update protocol is the mechanism for future versions. The app should make the version visible (small footer or header note: "Life Guide v1 — locked April 2026. Next review: May 1.").
