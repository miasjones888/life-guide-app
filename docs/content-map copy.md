# Content Map: Field Guide to Yourself

**Version:** 1.0
**Status:** UI Surface Mapping
**Last Updated:** 2026-03-31
**Purpose:** Maps each content element to its UI surface, component type, interaction pattern, and display depth

---

## Mapping Methodology

This document maps the relationship between **content elements** (from content-inventory.md) and **UI surfaces** (screens, sections, components) in the Field Guide to Yourself app.

**Mapping dimensions:**
- **Surface:** Where content appears (screen, section, view)
- **Component Type:** How content is displayed (card, list, timeline, toggle, modal, etc.)
- **Interaction Type:** How user engages (read, tap, check, toggle, scroll, etc.)
- **Display Depth:** Level of detail shown (glanceable, semi-deep, deep)

**Display Depth definitions:**
- **Glanceable:** Quick visual scan (title, icon, one-line description, <10 seconds)
- **Semi-deep:** Moderate engagement (description + 2–3 supporting details, <30 seconds)
- **Deep:** Full content and context (full text blocks, instructions, options, >30 seconds)

---

## Surface Definitions

### TODAY View (Glanceable Overview)
The primary entry point showing current day's priorities and immediate actions.

**Components:**
- Top section: Time of day, current anchor task, next three time blocks
- Middle section: Next meal, cat care action due, Sunday recurring items (if Sunday)
- Bottom section: Quick-add capture, today's focus theme, evening readiness checklist

**Refresh:** Every 30 minutes or on app open

---

### Section 01 — Morning Routine
Dedicated screen for complete morning protocol.

**Sub-sections:**
- Version selector (A: Minimum | B: Full)
- 7:30am morning routine sequence
- 8:00am skincare with fallback language
- 9:00am cat meds reminder
- 9:15am breakfast with accessibility options
- 9:30am cat playtime
- 10:00am deep focus setup

**Timeline:** 7:30am–10:00am

---

### Section 02 — Cat Care
Dedicated screen for all cat-related content and schedules.

**Sub-sections:**
- Cat profiles (Maisie, Meeko, Third Cat) with medication details
- Daily schedule: morning meds, breakfast, midday snack + play, evening meds, dinner, litter
- Weekly: grooming schedule (Sunday)
- Monthly: supply check (items to reorder)
- Special: Solo cat duty protocol (when Dar away)

**Cat-specific content visible throughout:** CONT-008, CONT-009, CONT-013, CONT-014, CONT-021, CONT-022, CONT-039, CONT-041, CONT-044, CONT-045, CONT-046, CONT-069, CONT-071, CONT-072, CONT-073, CONT-085, CONT-089

---

### Section 03 — Meals & Eating
Dedicated screen for meal planning and eating check-ins.

**Sub-sections:**
- Breakfast (9:15am): accessibility language, grab-and-go options
- Lunch check-in (1:00pm): full check-in language, zero-effort options
- Dinner (6:30pm): accessibility language, no-cook options

**Companion:** Linked to TODAY view meal reminders

---

### Section 04 — Deep Focus & Projects
Dedicated screen for project work and focus sessions.

**Sub-sections:**
- 10:00am Deep Focus block: setup, guardrails, timer
- Portfolio project: status, progress
- Field Guide project: status, progress, form notes
- Curriculum Tracker project: status, progress
- Research project: status, progress
- Clay Sculpting class: dates (May 19–June 23), time (6–8pm Tues), cost ($450)

**Visible:** CONT-015 to CONT-020, CONT-080 to CONT-084

---

### Section 05 — Self-Care & Body
Dedicated screen for movement, skincare, sleep, and wellness.

**Sub-sections:**
- Morning skincare (8:00am): steps, fallback, timing guidance
- Outside time (2:00pm): activity options, Merlin app link, significance language
- Shower check-in (7:30pm): frequency tracker, minimum viable shower
- Night skincare (9:45pm): steps, fallback
- Sleep (11:00pm): target hours, lights-out language
- Weekly self-care block (Sunday): activities, duration
- Grounding: 5-4-3-2-1 sensory reset

**Visible:** CONT-005 to CONT-007, CONT-026 to CONT-031, CONT-042 to CONT-043, CONT-050 to CONT-051, CONT-055 to CONT-056, CONT-068

---

### Section 06 — Home & Room Reset
Dedicated screen for physical space management.

**Sub-sections:**
- Room reset (5:30pm): timer, 3-phase workflow
- Phase 1 (surfaces): trash bag, relocation bag, stop-on-timer guidance
- Phase 2 (boxes): sort routine, time-bound closing
- Phase 3 (zones): rotation schedule (bathroom, kitchen, desk, wardrobe)
- Laundry (weekly): priority order, minimum viable action

**Visible:** CONT-032 to CONT-036, CONT-065 to CONT-066

---

### Section 07 — Evening Routine
Dedicated screen for 9pm–11pm wind-down sequence.

**Sub-sections:**
- 9:00pm cat evening meds + dinner + litter (summary)
- 9:30pm bedtime meds
- 9:45pm night skincare: steps, fallback language
- Write anchor task for tomorrow
- Reading before sleep (encouraged)
- Social media guard: no TikTok/Instagram
- Lights out (11pm): full target language
- Alternative evening routine (Creative Dashboard version)

**Visible:** CONT-047 to CONT-057

---

### Section 08 — Health & Mental Health
Dedicated screen for medications, mental health support, and appointments.

**Sub-sections:**
- Bedtime meds (9:30pm): daily reminder, timing
- PRN anxiety meds: accessibility language, function-based usage guidance
- Psychiatry: scheduling status, next appointment
- Therapy outreach (weekly Sunday task): minimum viable action language
- Mental health framing: no judgment, function-based approach

**Visible:** CONT-048 to CONT-049, CONT-088

---

### Section 09 — Weekly Schedule
Dedicated screen showing weekly rhythm and focus themes.

**Sub-sections:**
- 7-day view: Monday (Portfolio), Tuesday (Notion + Admin), Wednesday (Notion + Portfolio), Thursday (Buffer), Friday (Systems), Saturday (Creative), Sunday (Planning)
- Color coding by focus area
- Drag to reorder (if week varies)
- Link to deeper view of each day's projects

**Visible:** CONT-058 to CONT-064

---

### Section 10 — Community & Spirituality
Dedicated screen for community events and spiritual practice.

**Sub-sections:**
- Gratitude Group (Slow Mornings for Fast Times): details, bring checklist, after-party info
- LA River Dance Party: timing (Sundays, sunset), music genres, dry event info, Eventbrite link
- Applied Buddhism & Meditation (Saturday optional): location, facilitator, email for weekly reading
- Outside time (integrated): activity options, body + spirituality framing

**Visible:** CONT-027, CONT-067, CONT-086 to CONT-087

---

### TODAY View — Dynamic Section (Sunday Only)
Special rendering on Sundays showing all weekly recurring tasks and monthly reviews.

**Content visible only on Sundays:**
- Monthly Financial Review (Budget Hour): CONT-074 to CONT-079
- Life Planning Reset checklist: CONT-070
- Self-Care Block: CONT-068
- Cat Full Groom: CONT-069
- Therapy Outreach: CONT-088
- Weekly theme review + next week anchor

---

### Navigation / Hub
Top-level navigation allowing access to all 10 sections + TODAY view.

**Structure:**
- TODAY (home icon)
- 01 Morning
- 02 Cats
- 03 Meals
- 04 Focus
- 05 Self-Care
- 06 Home
- 07 Evening
- 08 Health
- 09 Schedule
- 10 Community
- Settings (system preferences, notifications, export)

---

## Content-to-Surface Mapping Table

| Content ID | Content Name | Primary Surface | Component Type | Interaction Type | Display Depth | Secondary Surfaces |
|------------|--------------|-----------------|-----------------|-----------------|---------------|--------------------|
| CONT-001 | 7:30am Morning Routine (Ver A) | 01-Morning | Toggle/Card | Tap to select | Glanceable | TODAY (time of day) |
| CONT-002 | 7:30am Morning Routine (Ver B) | 01-Morning | Toggle/Card | Tap to select | Semi-deep | TODAY (time of day) |
| CONT-003 | Morning Routine Descriptor | 01-Morning | Text block | Read | Glanceable | 01-Morning header |
| CONT-004 | Morning Social Media Guard | 01-Morning | Alert/Banner | Read | Glanceable | 01-Morning header |
| CONT-005 | 8:00am Skincare Tasks | 01-Morning, 05-Self-Care | Checklist | Check/tap | Glanceable | TODAY (time of day) |
| CONT-006 | Morning Skincare Fallback | 01-Morning, 05-Self-Care | Tooltip/Hint | Tap for help | Glanceable | Inline with CONT-005 |
| CONT-007 | Morning Skincare Timing | 01-Morning, 05-Self-Care | Instruction card | Read | Glanceable | Inline with CONT-005 |
| CONT-008 | 9:00am Cat Morning Meds | 02-Cats, TODAY | Reminder card | Check off | Glanceable | TODAY (next action) |
| CONT-009 | Cat Breakfast Deadline | 02-Cats, TODAY | Time block | Read | Glanceable | TODAY (next action) |
| CONT-010 | 9:15am Breakfast | 01-Morning, 03-Meals | Time block | Read | Glanceable | TODAY (time of day) |
| CONT-011 | Breakfast Accessibility | 03-Meals, 01-Morning | Instruction card | Read | Glanceable | Inline with CONT-010 |
| CONT-012 | Breakfast Grab-and-go Options | 03-Meals, 01-Morning | List | Read/Scroll | Semi-deep | Expandable in CONT-010 |
| CONT-013 | 9:30am AM Cat Playtime | 02-Cats, 01-Morning | Time block | Check off | Glanceable | TODAY (next action) |
| CONT-014 | Cat Playtime Significance | 02-Cats | Instruction | Read | Glanceable | Card header for CONT-013 |
| CONT-015 | 10:00am Deep Focus Session | 01-Morning, 04-Focus, TODAY | Time block + timer | Tap start | Semi-deep | TODAY (next action) |
| CONT-016 | Deep Focus Guardrails | 04-Focus | Instruction card | Read | Semi-deep | Modal before timer starts |
| CONT-017 | Project: Portfolio | 04-Focus | Project card | Tap for details | Semi-deep | Section hub |
| CONT-018 | Project: Field Guide | 04-Focus | Project card | Tap for details | Semi-deep | Section hub |
| CONT-019 | Project: Curriculum | 04-Focus | Project card | Tap for details | Semi-deep | Section hub |
| CONT-020 | Project: Research | 04-Focus | Project card | Tap for details | Semi-deep | Section hub |
| CONT-021 | 12:30pm Cat Midday Snack | 02-Cats | Time block | Check off | Glanceable | TODAY (if time reached) |
| CONT-022 | 12:30pm Cat Midday Play | 02-Cats | Time block | Check off | Glanceable | TODAY (if time reached) |
| CONT-023 | 1:00pm Eaten Today? | 03-Meals, TODAY | Check-in prompt | Tap response | Glanceable | TODAY (floating prompt) |
| CONT-024 | Lunch Check-in Language | 03-Meals | Modal/Card | Read/respond | Semi-deep | CONT-023 modal |
| CONT-025 | Zero-effort Meal Options | 03-Meals | List | Read/Scroll | Semi-deep | Expandable in CONT-024 |
| CONT-026 | 2:00pm Outside Time | 05-Self-Care, TODAY | Flexible time block | Tap to log | Semi-deep | TODAY (if time reached) |
| CONT-027 | Outside Time Core Language | 05-Self-Care | Instruction card | Read | Deep | Section intro/header |
| CONT-028 | Outside Activity: Hiking | 05-Self-Care | Reference option | Read | Glanceable | List in CONT-027 |
| CONT-029 | Outside Activity: Paddleboarding | 05-Self-Care | Reference option | Read | Glanceable | List in CONT-027 |
| CONT-030 | Outside Activity: Birdwatching | 05-Self-Care | Reference option + link | Read/tap | Glanceable | List in CONT-027 (link to Merlin) |
| CONT-031 | Outside Activity: Long Walk | 05-Self-Care | Reference option | Read | Glanceable | List in CONT-027 |
| CONT-032 | 5:30pm Room Reset | 06-Home, TODAY | Time block + timer | Tap start | Semi-deep | TODAY (if time reached) |
| CONT-033 | Room Reset Core Instruction | 06-Home | Instruction card | Read | Glanceable | Modal before timer starts |
| CONT-034 | Room Reset Phase 1 | 06-Home | Workflow step | Read/check | Semi-deep | Modal instruction flow |
| CONT-035 | Room Reset Phase 2 | 06-Home | Workflow step | Read/check | Semi-deep | Modal instruction flow (conditional) |
| CONT-036 | Room Reset Phase 3 | 06-Home | Workflow step + rotation tracker | Read/check | Semi-deep | Modal instruction flow (conditional) |
| CONT-037 | 6:30pm Dinner | 03-Meals, TODAY | Time block | Read | Glanceable | TODAY (time of day) |
| CONT-038 | Dinner Accessibility Language | 03-Meals | Instruction card | Read | Semi-deep | Inline with CONT-037 |
| CONT-039 | 7:00pm Cat Brushing (Weekly) | 02-Cats | Weekly recurring event | Read | Glanceable | Weekly view, cat schedule |
| CONT-040 | 7:30pm PM Cat Playtime | 02-Cats | Time block | Check off | Glanceable | TODAY (time of day) |
| CONT-041 | PM Cat Playtime Significance | 02-Cats | Instruction | Read | Glanceable | Card header for CONT-040 |
| CONT-042 | 7:30pm Shower Check-in | 05-Self-Care, TODAY | Check-in prompt | Tap response | Glanceable | TODAY (evening section) |
| CONT-043 | Shower Minimum Viable | 05-Self-Care | Instruction card | Read | Semi-deep | Modal if "no" response |
| CONT-044 | 9:00pm Cat Evening Meds | 02-Cats, TODAY, 07-Evening | Reminder card | Check off | Glanceable | TODAY (evening), 07-Evening |
| CONT-045 | 9:00pm Cat Dinner | 02-Cats, TODAY, 07-Evening | Time block | Check off | Glanceable | TODAY (evening), 07-Evening |
| CONT-046 | 9:00pm Litter Scoop | 02-Cats, TODAY, 07-Evening | Time block | Check off | Glanceable | TODAY (evening), 07-Evening |
| CONT-047 | 9:00pm Evening Routine Seq 1 | 07-Evening | Routine step summary | Read | Glanceable | Section intro |
| CONT-048 | 9:30pm Bedtime Meds | 07-Evening, 08-Health | Reminder card | Check off | Glanceable | 07-Evening |
| CONT-049 | PRN Anxiety Meds Accessibility | 08-Health | Instruction card | Tap to read | Semi-deep | 08-Health section |
| CONT-050 | 9:45pm Night Skincare | 07-Evening, 05-Self-Care | Checklist | Check/tap | Glanceable | 07-Evening |
| CONT-051 | Night Skincare Minimum | 07-Evening, 05-Self-Care | Instruction card | Tap for help | Glanceable | Inline with CONT-050 |
| CONT-052 | Write Tomorrow's Anchor | 07-Evening, TODAY | Text input field | Write/tap | Semi-deep | 07-Evening section |
| CONT-053 | Evening Reading | 07-Evening | Encouragement text | Read | Glanceable | 07-Evening |
| CONT-054 | Evening Social Media Guard | 07-Evening | Alert/Banner | Read | Glanceable | 07-Evening header |
| CONT-055 | 11:00pm Lights Out Language | 07-Evening | Instruction card | Read | Semi-deep | 07-Evening section |
| CONT-056 | Target Sleep Duration | 07-Evening | Reference | Read | Glanceable | 07-Evening |
| CONT-057 | Alternative Evening Routine | 07-Evening | Toggle/Alternate view | Tap to switch | Semi-deep | 07-Evening toggle |
| CONT-058 | Monday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-059 | Tuesday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-060 | Wednesday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-061 | Thursday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-062 | Friday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-063 | Saturday Weekly Focus | 09-Schedule | Day cell | Read | Glanceable | Weekly grid |
| CONT-064 | Sunday Weekly Focus | 09-Schedule, TODAY | Day cell | Read | Glanceable | Weekly grid, TODAY (Sunday only) |
| CONT-065 | Laundry (Weekly) | 06-Home, TODAY (if unspecified day is selected) | Task card | Check off | Glanceable | 06-Home section |
| CONT-066 | Laundry Minimum Viable | 06-Home | Instruction card | Read | Semi-deep | Card header or modal for CONT-065 |
| CONT-067 | Saturday: Applied Buddhism | 10-Community, Calendar | Event card | Tap for details | Semi-deep | 10-Community, calendar integration |
| CONT-068 | Sunday: Self-Care Block | 05-Self-Care, TODAY | Recurring event | Read | Semi-deep | TODAY (Sunday), 05-Self-Care |
| CONT-069 | Sunday: Cat Full Groom | 02-Cats, TODAY | Recurring event | Check off | Semi-deep | TODAY (Sunday), 02-Cats |
| CONT-070 | Sunday: Life Planning Reset | TODAY | Recurring task checklist | Check off items | Deep | TODAY (Sunday only), modal |
| CONT-071 | Maisie Cat Profile | 02-Cats | Profile card | Tap for details | Semi-deep | 02-Cats section |
| CONT-072 | Meeko Cat Profile | 02-Cats | Profile card | Tap for details | Semi-deep | 02-Cats section |
| CONT-073 | Third Cat Profile | 02-Cats | Profile card | Tap for details | Semi-deep | 02-Cats section |
| CONT-074 | Monthly Financial Review | TODAY | Recurring task | Check off | Semi-deep | TODAY (Sunday only) |
| CONT-075 | Petal Card Urgent | TODAY | Checklist item | Check off | Glanceable | TODAY (Sunday) monthly section |
| CONT-076 | Shop Pay Review | TODAY | Checklist item | Check off | Glanceable | TODAY (Sunday) monthly section |
| CONT-077 | Capital One Bill | TODAY | Checklist item | Check off | Glanceable | TODAY (Sunday) monthly section |
| CONT-078 | Gap Gift Cards | TODAY | Reference | Read | Glanceable | TODAY (Sunday) monthly section |
| CONT-079 | Tax Reminder | TODAY | Alert/Banner (seasonal) | Read | Glanceable | TODAY (Jan–Apr) |
| CONT-080 | Portfolio Project | 04-Focus | Project card | Tap for details | Semi-deep | 04-Focus hub |
| CONT-081 | Field Guide Project | 04-Focus | Project card | Tap for details | Semi-deep | 04-Focus hub |
| CONT-082 | Curriculum Tracker Project | 04-Focus | Project card | Tap for details | Semi-deep | 04-Focus hub |
| CONT-083 | Research Project | 04-Focus | Project card | Tap for details | Semi-deep | 04-Focus hub |
| CONT-084 | Clay Sculpting Class | 04-Focus, Calendar | Event card | Tap for details | Semi-deep | 04-Focus, calendar integration |
| CONT-085 | Monthly Cat Supply Check | 02-Cats, TODAY | Checklist item | Check off | Glanceable | TODAY (Sunday), 02-Cats |
| CONT-086 | Gratitude Group | 10-Community, Calendar | Event card | Tap for RSVP details | Semi-deep | 10-Community, calendar integration |
| CONT-087 | LA River Dance Party | 10-Community, Calendar | Event card | Tap for Eventbrite link | Semi-deep | 10-Community, calendar integration |
| CONT-088 | Therapy Outreach | 08-Health, TODAY | Recurring task | Tap to log action | Semi-deep | TODAY (Sunday), 08-Health |
| CONT-089 | Solo Cat Duty Protocol | 02-Cats | Conditional card | Read when triggered | Deep | 02-Cats (conditional display) |

---

## Cross-Surface Content Mapping

### Content Appearing in Multiple Surfaces

**Content shown in TODAY + section-specific view:**
- CONT-008 (9:00am Cat Morning Meds): TODAY → 02-Cats
- CONT-013 (9:30am AM Cat Playtime): TODAY → 02-Cats or 01-Morning
- CONT-015 (10:00am Deep Focus): TODAY → 04-Focus
- CONT-021 (12:30pm Cat Midday Snack): TODAY → 02-Cats
- CONT-023 (1:00pm Eaten Today?): TODAY → 03-Meals
- CONT-032 (5:30pm Room Reset): TODAY → 06-Home
- CONT-040 (7:30pm PM Cat Playtime): TODAY → 02-Cats
- CONT-042 (7:30pm Shower Check-in): TODAY → 05-Self-Care
- CONT-044 (9:00pm Cat Evening Meds): TODAY → 02-Cats → 07-Evening
- CONT-045 (9:00pm Cat Dinner): TODAY → 02-Cats → 07-Evening
- CONT-046 (9:00pm Litter Scoop): TODAY → 02-Cats → 07-Evening
- CONT-064 (Sunday Weekly Focus): TODAY → 09-Schedule

**Content appearing in 3+ surfaces:**
- CONT-005 (8:00am Skincare): 01-Morning → 05-Self-Care → TODAY
- CONT-026 (2:00pm Outside Time): 05-Self-Care → TODAY → 10-Community (spiritual dimension)
- CONT-027 (Outside Time Core Language): 05-Self-Care → 10-Community

---

## Time-Conditional Content Display

### Morning (7:30am–12:30pm)
**Surfaces active:**
- Section 01 (Morning)
- Section 02 (Cat Care — morning routines)
- Section 03 (Meals — breakfast, lunch prep)
- Section 04 (Focus Session setup)
- Section 09 (Today's weekly focus theme)

**TODAY view:** Morning routine card, next time block, cat morning action, next meal

### Midday (12:30pm–5:30pm)
**Surfaces active:**
- Section 02 (Cat Care — midday snack + play)
- Section 03 (Meals — lunch check-in at 1pm)
- Section 04 (Deep Focus session active)
- Section 05 (Outside time option, 2pm)
- Section 06 (Room reset setup, 5:30pm)

**TODAY view:** Current time block, meal check-in, cat action, next action

### Evening (5:30pm–11:00pm)
**Surfaces active:**
- Section 02 (Cat Care — evening meds, dinner, litter)
- Section 03 (Meals — dinner)
- Section 05 (Shower check-in, 7:30pm)
- Section 06 (Room reset active)
- Section 07 (Evening routine full)
- Section 08 (Health — bedtime meds, PRN anxiety meds)

**TODAY view:** Evening routine card, cat action, shower check-in, upcoming time blocks

### Sunday Only (24-hour special view)
**TODAY view transforms to include:**
- Monthly Financial Review (CONT-074 to CONT-079)
- Life Planning Reset checklist (CONT-070)
- Self-Care Block (CONT-068)
- Cat Full Groom (CONT-069)
- Therapy Outreach (CONT-088)
- Weekly theme review

**Surfaces available:** All sections active, with Sunday-specific highlights

---

## Verbatim Copy Placement Map

**Verbatim-protected phrases and their UI placements:**

| Phrase (ID) | Primary Surface | Component | Display Depth | Alternative Surfaces |
|------------|-----------------|-----------|---------------|-----------------------|
| CONT-003: "Protected time..." | 01-Morning | Section header banner | Glanceable | TODAY (morning section) |
| CONT-004: "No scrolling Instagram..." | 01-Morning | Alert/instruction card | Glanceable | 01-Morning sidebar |
| CONT-006: "On a hard day..." | 01-Morning, 05-Self-Care | Tooltip on skincare card | Glanceable | Help icon next to CONT-005 |
| CONT-007: "Do before looking..." | 01-Morning, 05-Self-Care | Instruction inline | Glanceable | Card footer for CONT-005 |
| CONT-011: "No appetite is okay..." | 03-Meals, 01-Morning | Tooltip/hint text | Glanceable | Card header for breakfast |
| CONT-024: "Check in with yourself..." | 03-Meals | Modal on 1pm check-in | Semi-deep | TODAY (floating prompt modal) |
| CONT-027: "Protected outdoor block..." | 05-Self-Care | Section intro/header | Deep | 10-Community (spiritual framing) |
| CONT-033: "One small cleaning..." | 06-Home | Modal before timer | Glanceable | 06-Home section header |
| CONT-038: "Have you eaten dinner..." | 03-Meals | Card at 6:30pm | Semi-deep | TODAY (dinner time block) |
| CONT-041: "Helps them wind down..." | 02-Cats | Card header for PM playtime | Glanceable | 02-Cats daily schedule |
| CONT-043: "Minimum viable shower..." | 05-Self-Care | Modal if shower check-in is "no" | Semi-deep | 05-Self-Care shower section |
| CONT-049: "PRN anxiety meds..." | 08-Health | Instruction card (prominent placement) | Semi-deep | 08-Health medications section |
| CONT-051: "Two steps minimum..." | 07-Evening, 05-Self-Care | Tooltip on night skincare card | Glanceable | Card footer for night skincare |
| CONT-055: "Put the phone down..." | 07-Evening | Section closing statement | Semi-deep | 07-Evening Lights Out card |
| CONT-066: "Minimum viable action..." | 06-Home | Laundry card header/inline | Semi-deep | 06-Home laundry section |

---

## Content Not Yet Fully Surfaced (Open Questions)

### Clarifications needed:

1. **Reflection Field (localStorage only)**
   - Where in the UI does user access reflection notes?
   - Is this a daily journal entry tied to evening routine, or a separate analytics view?
   - Suggested surface: Section within 08-Health or as a settings-accessible note archive

2. **Moving Research (ongoing, surfaces Sunday)**
   - How is "moving research" surfaced in the app?
   - Is it a project card in 04-Focus, or a dedicated research board/surface?
   - Suggested surface: 04-Focus as a project card, or new Section 11 (Planning/Research)

3. **Psychiatry Scheduling (standing task)**
   - Where is "next psychiatry appointment" visible?
   - Is there a dedicated calendar view or integration?
   - Suggested surface: 08-Health section with appointment tracker

4. **Subscriptions to Cancel**
   - Is this tracked in the app, or external?
   - Suggested surface: Sunday Financial Review checklist in TODAY view

5. **Merlin App Link (birdwatching)**
   - Where does the Merlin app link appear?
   - Is it a deep link in the app, or external reference?
   - Suggested surface: Inline link in CONT-030 (Birdwatching option)

6. **Dar Presence / Solo Cat Duty Trigger**
   - How does the app know when Dar is away to surface CONT-089?
   - Is there a shared calendar integration, or manual toggle?
   - Suggested surface: Calendar event sync or user setting toggle

---

## Component Library Requirements

Based on content-to-surface mapping, the following component types are required:

### Core Components
- **Time Block Card:** Time + action + check-off (used throughout daily schedule)
- **Instruction Card:** Text block with optional "more info" toggle (used for accessibility, fallback language)
- **Checklist Item:** Checkbox + text + optional timer (used for routines, recurring tasks)
- **Alert/Banner:** Full-width notice (used for social media guards, reminders)
- **Modal/Card Stack:** Full content display with close (used for check-ins, instructions, detailed info)
- **Toggle/Selector:** Binary or multi-option choice (version selector, alternative routines)
- **Timer Interface:** Countdown with pause/cancel (used for room reset, deep focus, etc.)
- **Text Input Field:** For anchor task writing, notes capture
- **List/Scroll View:** Multi-item display (meal options, project cards, community events)
- **Calendar Integration:** Event display, date navigation, recurring indicators
- **Profile Card:** Cat profiles with photo + details + medication status

### Specialized Components
- **Weekly Grid:** 7-day schedule with focus themes, color-coded
- **Project Card:** Title + status + progress + action link
- **Event Card:** Event title + time + RSVP/Eventbrite link
- **Recurring Indicator:** Badge or icon showing frequency (daily, weekly, monthly)
- **Conditional Display Toggle:** Show/hide based on day of week, time of day, or user setting

---

## Navigation & Information Architecture

### Primary Navigation (Bottom Tab or Hamburger Menu)
1. TODAY (Home) — Dynamic daily view
2. 01 Morning
3. 02 Cats
4. 03 Meals
5. 04 Focus
6. 05 Self-Care
7. 06 Home
8. 07 Evening
9. 08 Health
10. 09 Schedule
11. 10 Community
12. Settings

### Suggested IA: Bottom tab bar (6–8 primary items) + "More" menu or hamburger for secondary sections

**Recommended primary tabs:**
- TODAY
- Morning
- Cats
- Focus
- Evening
- Community
- (+ More menu for Meals, Home, Health, Schedule, Settings)

---

## Content Depth Strategy

### Glanceable Content (< 10 seconds, no interaction required)
- Time blocks with next action
- Single-line instructions or reminders
- Icons or badges showing status
- Current time / day context

**Examples:** CONT-001, CONT-008, CONT-013, CONT-015, CONT-040, CONT-044, CONT-045, CONT-046

### Semi-Deep Content (10–30 seconds, read + tap for options)
- Full instruction cards with fallback language
- Checklist with 3–5 items
- Meal/activity options (expandable list)
- Event details with RSVP link
- Project cards with status + progress

**Examples:** CONT-002, CONT-024, CONT-027, CONT-032, CONT-038, CONT-068, CONT-070, CONT-080

### Deep Content (> 30 seconds, full-screen modal or section)
- Complete routine sequence (morning, evening)
- Full cat care protocol
- Project details with notes
- Therapy outreach guidance
- Alternative routine selection

**Examples:** CONT-027, CONT-057, CONT-070, CONT-088, CONT-089

---

## Success Metrics for Content Mapping

- [x] Every content element (89 total) mapped to at least one surface
- [x] All time-blocked content appears in both section view AND TODAY view
- [x] Verbatim-protected phrases appear exactly as written in UI
- [x] Daily routine flows without required navigation (morning 7:30am–10am visible in progression)
- [x] Sunday recurring tasks accessible in single unified view (TODAY/Sunday transform)
- [x] All cat care actions tied to both 02-Cats section AND daily timeline
- [x] All interactive check-ins (eating, shower, etc.) surfaced at appropriate times
- [x] Community events, projects, and external links (Merlin, Eventbrite) clearly marked

---

## Appendix: Surface Refresh & Update Triggers

| Surface | Refresh Frequency | Triggers |
|---------|------------------|----------|
| TODAY | Every 30 min or on app open | Time change, user check-off, completed action, time-conditional content |
| 01 Morning | On open if before 12pm | Clock time, version selection toggle |
| 02 Cats | Every 15 min (medication alarms) | Medication schedule, cat care check-off, monthly supply check date |
| 03 Meals | Every 60 min (meal time approach) | Clock time, eating check-in response, completed actions |
| 04 Focus | On user input | Timer start/stop, project update, deep focus mode toggle |
| 05 Self-Care | Every 2 hours | Clock time, activity log, shower frequency check |
| 06 Home | On timer start/completion | Room reset timer, laundry day |
| 07 Evening | On open if after 7pm | Clock time, cat schedule check-off, routine sequence |
| 08 Health | Daily or on app open | Medication reminder, appointment date, therapy outreach date |
| 09 Schedule | Weekly on Sunday/Monday | Week change, focus theme edit, day reorder |
| 10 Community | Weekly or on event update | New event posted, RSVP date, Eventbrite link refresh |

---

**End of Content Map**
