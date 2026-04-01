# User Flows: Field Guide to Yourself

## Document Header

**App:** Field Guide to Yourself
**Version:** 1.0 (MVP)
**Target User:** Mia
**Platform:** Mobile-first PWA (iOS Safari, Android Chrome)
**Last Updated:** 2026-03-31

---

## Flow Notation Guide

### How to Read Flow Diagrams

Each flow is presented as a numbered sequence of steps. Steps describe:
- **Navigation action** (tap, swipe, type, or auto-trigger)
- **Screen/view** the user arrives at
- **UI element** they interact with (labeled with component name)
- **State change** that results

### Notation Key

| Symbol | Meaning |
|--------|---------|
| `[TAP]` | User taps element with finger |
| `[SWIPE]` | User swipes left/right (section nav) or up/down (scroll) |
| `[TYPE]` | User enters text via keyboard |
| `[AUTO]` | System-triggered (time-based, cache-load, etc.) |
| `→` | Transition to next step |
| `(cached)` | Content loaded from service worker cache |
| `(offline)` | User has no network connection |
| `(new day)` | Calendar day has changed |

### Flow Summary Structure

Each flow includes:
1. **Flow name** and narrative context
2. **Entry point** (where user is when flow starts)
3. **Preconditions** (device state, app state, network state)
4. **Step sequence** (numbered steps with actions)
5. **Exit/completion** (where user ends, what persists)

---

## Primary Flows

---

### Flow 1: Cold App Launch (First Time vs. Returning)

#### 1A: First-Time Cold Launch

**Narrative:** New PWA installation. User taps app icon for first time. No data exists yet.

**Entry Point:** App icon on home screen
**Preconditions:** First install, no localStorage, no network
**Completed By:** User sees Today view with empty state

**Steps:**

1. [TAP] App icon → system launches PWA container
2. [AUTO] PWA manifest loads (standalone mode, portrait orientation)
3. [AUTO] Service worker registers (cache-first strategy begins)
4. [AUTO] App shell loads (bottom tab bar, top header, no sidebar yet)
5. [AUTO] App checks localStorage for user data → finds none
6. [AUTO] Today view renders with empty state:
   - Date displays (computed from system time)
   - No anchor task (empty NotepadPanel with placeholder "No anchor for today")
   - Morning routine shows all items unchecked
   - Cat care section shows default items: Maisie meds, Meeko meds, third cat check
   - Meals: no entries
   - Medications: empty
   - Outside time: 0 hours logged
7. [AUTO] Today Active Block computes current time → displays current routine block (e.g., "Morning" at 8am, "Afternoon" at 2pm)
8. User sees calm, minimal Today view. No onboarding. No splash screen.

**Exit/Completion:** User is on Today view. All ephemeral state initialized (empty). Ready to interact.

---

#### 1B: Returning User Cold Launch (App Was Closed)

**Narrative:** User has used app before. Closes app, returns later. Should restore to last view.

**Entry Point:** App icon on home screen
**Preconditions:** localStorage contains prior session data, service worker cached
**Completed By:** User sees Today view with prior state restored

**Steps:**

1. [TAP] App icon → system launches PWA container
2. [AUTO] PWA manifest loads
3. [AUTO] Service worker activates (serves cached shell immediately)
4. [AUTO] App checks localStorage for:
   - Last visited section (e.g., "today", "guide:focus", "week")
   - Anchor task text (from AnchorTask panel)
   - Prior routine check states (resets if new day; persists if same day)
   - Prior reflection notes
5. [AUTO] Calendar system checks: is today a new day vs. last session?
   - **If same day:** Ephemeral checklist state persists (items user checked are still checked)
   - **If new day:** Ephemeral state resets (all routines unchecked, active block recomputed)
6. [AUTO] Today view renders with restored data:
   - Date (today's)
   - Anchor task (if exists from prior session)
   - Morning routine (checked items if same day; all unchecked if new day)
   - Cat care (checked items if same day; all unchecked if new day)
   - Active block (recomputed for current time)
7. [AUTO] If last visited section was not Today (e.g., "guide:focus"):
   - User sees Today view
   - Slide animation plays (prior section exits x:40, Today enters x:-40)
   - User can tap tab bar to navigate back to prior section
8. User sees Today view with all prior context restored.

**Exit/Completion:** User is on Today view. All state (ephemeral for today, persistent anchor/reflection) is ready.

---

### Flow 2: Morning Routine Completion

**Narrative:** Mia wakes up. Opens app. Checks off morning steps. Feels light and ready.

**Entry Point:** Today view (app already open or just cold-launched)
**Preconditions:** Time is between 6am and 12pm. Morning routine block is active. No items checked yet (new day).
**Completed By:** All morning routine items are checked. User sees visual confirmation (green circles, muted text).

**Steps:**

1. User opens app or arrives at Today view
2. [AUTO] App computes current time → Today Active Block shows "Morning" (6am–12pm)
3. User sees Morning section with checklist items (e.g., "Meds", "Coffee", "Write 10 min", "Stretch", "Cat care")
4. [TAP] Checklist item 1 (e.g., "Meds")
   - Item border + background highlight (0.1s visual feedback)
   - Checkbox animates to forest green filled circle
   - Text color transitions to ink-muted
   - State saved to ephemeral morning routine array: `morning_routine[0] = true`
5. [TAP] Checklist item 2 ("Coffee") → same animation, state updated
6. [TAP] Checklist item 3 ("Write 10 min") → same animation, state updated
7. [TAP] Checklist item 4 ("Stretch") → same animation, state updated
8. [TAP] Checklist item 5 ("Cat care") → same animation, state updated
9. User now sees all morning items checked (green circles, muted text)
10. [AUTO] Visual completion state: Morning section shows "5/5 complete" (optional micro text)
11. User feels sense of light accomplishment. No badge, no celebration sound (calm design). User can scroll down to next section or navigate away.

**Exit/Completion:** All morning routine items are checked (ephemeral state). If user returns to Today before midnight, items stay checked. At midnight (new calendar day), state resets.

---

### Flow 3: Evening Routine Completion

**Narrative:** Mia approaches evening. Opens app or continues from today. Checks off wind-down steps.

**Entry Point:** Today view
**Preconditions:** Time is between 5pm and 12am. Evening routine block is active (or about to be). Can be same session as morning (ephemeral state persists).
**Completed By:** All evening routine items are checked.

**Steps:**

1. User is on Today view
2. [AUTO] App computes current time → Today Active Block updates to "Evening" (5pm–12am) once time passes afternoon threshold
3. User scrolls down (or is already at) Evening section
4. User sees Evening checklist items (e.g., "Tidy kitchen", "Journal", "Meds", "Wind-down tea", "No screens 30 min")
5. [TAP] Checklist item 1 ("Tidy kitchen")
   - Checkbox animates to filled green circle
   - Text mutes
   - State saved: `evening_routine[0] = true`
6. [TAP] Checklist item 2 ("Journal") → animation, state updated
7. [TAP] Checklist item 3 ("Meds") → animation, state updated
8. [TAP] Checklist item 4 ("Wind-down tea") → animation, state updated
9. [TAP] Checklist item 5 ("No screens 30 min") → animation, state updated
10. All evening items now checked
11. User feels ready for sleep. Can close app. State persists in localStorage until midnight (new day).

**Exit/Completion:** All evening routine items are checked (ephemeral state). User closes app or navigates elsewhere. At midnight, state resets for next day.

---

### Flow 4: Navigate to Guide Section & Expand Content

**Narrative:** Mia wants to read a guide chapter (e.g., "Care"). Navigates, finds content, expands panel.

**Entry Point:** Today view (any view, really)
**Preconditions:** App is open and online (or content is cached)
**Completed By:** User reads expanded content panel

**Steps:**

1. User is on Today view
2. [TAP] Guide tab (📖) in bottom tab bar
   - Active state (forest green dot) shifts from "🌿" to "📖"
   - Tab weight increases slightly (visual feedback)
   - Today view animates out (x:-40, 240ms ease-out)
   - Guide view animates in (x:40, 240ms ease-out)
3. User sees Guide Index (section list):
   - All 10 sections listed (01 Routines, 02 Rhythm, 03 Focus, 04 Care, 05 Body, 06 Home, 07 Finance, 08 Field, 09 Health, 10 System)
   - Each section is a tap target (44px tall minimum)
4. [TAP] Section 04 (Care)
   - Guide Index animates out (x:-40)
   - Care section animates in (x:40)
   - User sees Care section with multiple collapsible content entries (Window Panels)
5. User sees Care section:
   - Title: "04 Care"
   - Multiple Window Panels below (e.g., "Morning medications", "Cat care schedule", "Self-care templates", "Compassion reminders")
   - Each panel shows: title bar (11px mono, chrome background) + content hidden (collapsed)
6. [TAP] Window Panel title bar: "Cat care schedule"
   - Panel height animates from closed (36px—title bar only) to open (content height varies, e.g., 200px)
   - Content area fades in (Framer Motion)
   - User sees content: bullet list of cat care items, feeding times, medication reminders
   - Status bar appears at bottom: "8 items · Last updated 2 weeks ago"
7. [TAP] Another Window Panel: "Self-care templates"
   - This panel expands, prior panel stays expanded
   - Multiple panels can be open at once
8. If content is long (>500px), user can scroll within the panel
9. [TAP] Panel title bar again (to collapse) → panel height animates back to closed state

**Exit/Completion:** User has read Care section content. Can tap another section (swipe x:-40/x:40 animation), or tap Today tab to return.

---

### Flow 5: Cat Care Check-In

**Narrative:** Mia checks cat care status. Can do this from Today view (quick) or deep dive in Guide/Care (comprehensive).

**Entry Point:** Today view OR Guide → Care section
**Preconditions:** New day (ephemeral state reset)
**Completed By:** Cat care items marked complete or viewed

#### 5A: Quick Check-In (Today View)

**Steps:**

1. User is on Today view
2. User sees "Cat care" section (after morning routine)
   - Shows 3 items: "Maisie meds", "Meeko meds", "Checked third cat"
   - All unchecked (new day)
3. [TAP] "Maisie meds"
   - Checkbox fills green
   - Text mutes
   - State: `today.cat_care[0] = true`
4. [TAP] "Meeko meds"
   - State: `today.cat_care[1] = true`
5. [TAP] "Checked third cat"
   - State: `today.cat_care[2] = true`
6. All 3 items checked
7. User feels good about cat care. Can move on.

**Exit/Completion:** Cat care items checked in Today view.

#### 5B: Deep Dive (Guide → Care)

**Steps:**

1. User navigates to Guide → Care (see Flow 4)
2. [TAP] Window Panel: "Cat care schedule"
   - Panel expands
   - User sees detailed cat care info: feeding schedule, medication times, vet notes, behavior observations
3. User reads schedule, cross-references with today's checklist
4. [TAP] back to Today view (or stays in Guide)
5. User has context and can complete quick check-in (Flow 5A)

**Exit/Completion:** User has comprehensive understanding of cat care.

---

### Flow 6: Weekly Rhythm Check

**Narrative:** Mia checks what's on the weekly docket. Looks at today's focus. Feels oriented.

**Entry Point:** Any view
**Preconditions:** App is open
**Completed By:** User reviews weekly rhythm and current day focus

**Steps:**

1. User is on Today view
2. [TAP] Week tab (🗓) in bottom tab bar
   - Active state (green dot) shifts to "🗓"
   - Today view animates out (x:-40)
   - Week view animates in (x:40)
3. User sees Week view:
   - 7 rows, one per day (Mon–Sun)
   - Current day is highlighted (green background or border)
   - Each day shows: day name, date, theme/focus (if defined)
   - Example:
     - Mon 3/24: "Admin & sync"
     - Tue 3/25: "Writing focus"
     - Wed 3/26: "Community day"
     - **Thu 3/27: "Focus time"** ← today, highlighted
     - Fri 3/28: "Flex day"
     - Sat 3/29: "Maintenance"
     - Sun 3/30: "Rest & reflect"
4. User can [SWIPE UP/DOWN] to scroll if more days exist (future weeks)
5. User sees Thu (today) is "Focus time" → feels grounded in weekly rhythm
6. User can [TAP] any day to see that day's guide recommendations (optional deep link)
7. User taps back or navigates to another tab

**Exit/Completion:** User has reviewed weekly rhythm. Today's focus is visible and contextualized.

---

### Flow 7: Finance/Budget Hour

**Narrative:** It's finance hour. Mia goes to Finance guide section, opens budget checklist, marks items as done.

**Entry Point:** Guide index
**Preconditions:** Any time, usually on a set day (e.g., Friday)
**Completed By:** Budget checklist items are marked done

**Steps:**

1. User navigates to Guide tab (📖)
2. User sees Guide Index
3. [TAP] Section 07 (Finance)
   - Guide Index animates out
   - Finance section animates in
4. User sees Finance section:
   - Title: "07 Finance"
   - Multiple Window Panels:
     - "Monthly budget checklist"
     - "Income tracking"
     - "Expense categories"
     - "Financial goals"
5. [TAP] "Monthly budget checklist" panel title
   - Panel expands
   - User sees checklist (e.g., "Review spending", "Update budget sheet", "Check account balance", "Pay bills", "Log savings")
6. [TAP] "Review spending"
   - Checkbox fills green
   - Text mutes
   - State: finance checklist item 1 saved
7. [TAP] "Update budget sheet" → checked
8. [TAP] "Check account balance" → checked
9. [TAP] "Pay bills" → checked
10. [TAP] "Log savings" → checked
11. All items checked. Status bar: "5/5 complete"
12. User feels organized. Can navigate back or stay in Finance section

**Exit/Completion:** Finance checklist items marked done (persistent state in localStorage).

---

### Flow 8: Reflection/System Note

**Narrative:** Mia needs to jot a thought, reflection, or system note. Navigates to More → System → Reflection, writes a note.

**Entry Point:** Any view
**Preconditions:** App is open
**Completed By:** User has written and saved a reflection note

**Steps:**

1. User is on any view
2. [TAP] More tab (···) in bottom tab bar
   - Active state shifts
   - Current view animates out
   - More menu appears with options:
     - Finance
     - Health
     - System
     - Reflection
     - Settings
3. [TAP] "System" → System view animates in
4. [AUTO] System view displays system metadata and options
5. [TAP] "Reflection" subsection or link within System
   - Or, if Reflection is its own tab: [TAP] "Reflection" in More menu
   - Reflection view animates in
6. User sees Reflection section:
   - Title: "Reflection"
   - Large NotepadPanel with text input area
   - Placeholder text: "What's on your mind?"
   - Cursor ready (if user taps)
7. [TAP] Notepad input area
   - Keyboard appears (iOS/Android native)
   - Cursor is active
8. [TYPE] Reflection text
   - Example: "Feeling scattered today. Need to reset routine. Thursday always feels hard."
   - Text renders in real-time
   - No auto-save indicator; user trusts persistence
9. [AUTO] As user types, text is saved to localStorage (debounced every 500ms)
10. [TAP] outside input area or navigate away
    - Text persists in localStorage
    - User sees calm confirmation (no "saved" toast; just persistence)
11. User navigates back or to another section
    - Reflection note is permanently stored
    - User can return later and see it

**Exit/Completion:** Reflection note is written and persisted in localStorage.

---

### Flow 9: Anchor Task Set/Edit

**Narrative:** Mia's day has a central task. She taps the Anchor Task field on Today and types it. All-day context set.

**Entry Point:** Today view
**Preconditions:** Anchor task field is visible and empty (or has prior text)
**Completed By:** Anchor task text is set and visible on Today view

**Steps:**

1. User is on Today view
2. User sees "Anchor Task" section below date/active block
   - Shows NotepadPanel with title bar: "Anchor for today"
   - Content area is small, collapsed (just title visible unless user taps)
   - If empty: placeholder "No anchor yet" or "What's the main thing today?"
3. [TAP] Anchor Task title bar or content area
   - Panel height animates to expanded (e.g., 120px)
   - Keyboard appears
   - Cursor is active in text field
   - Any prior text is visible and editable
4. [TYPE] Anchor task text
   - Example: "Finish draft section 3"
   - Text renders in real-time
5. [AUTO] As user types, text is debounce-saved to localStorage (every 500ms)
6. [TAP] outside Anchor panel or swipe to another section
   - Keyboard dismisses
   - Panel collapses (if text is short enough; long text stays expanded)
   - Anchor task persists
7. User navigates back to Today
   - Anchor task is visible at top
   - User sees "Finish draft section 3" all day
   - Keeps focus

**Exit/Completion:** Anchor task is set and visible on Today view for the duration of the day.

---

### Flow 10: Deep Focus Session Start

**Narrative:** Mia is ready to write. Taps Guide → Focus → finds her project card → starts Deep Focus session.

**Entry Point:** Any view
**Preconditions:** App is open, user has projects defined in Guide/Focus
**Completed By:** Deep Focus session is active; user sees project context and timer (optional)

**Steps:**

1. User navigates to Guide tab (📖)
2. User sees Guide Index
3. [TAP] Section 03 (Focus)
   - Guide Index animates out
   - Focus section animates in
4. User sees Focus section:
   - Title: "03 Focus"
   - Multiple project cards displayed (e.g., "Novel draft", "Research project", "Learning goal")
   - Each card shows: project name, description snippet, current status, time spent
5. [TAP] "Novel draft" card
   - Card expands (or navigation occurs to project detail view)
   - User sees full project context:
     - Title: "Novel draft"
     - Description: "Finish section 3 of Untitled Novel"
     - Status: "In progress - section 3/5"
     - Prior sessions: "24h 15m total"
     - Last worked: "2 days ago"
     - Focus prompt/context: "Keep voice intimate. Show vulnerability."
6. [TAP] "Start Deep Focus Session" button
   - App transitions to Deep Focus mode
   - All other UI elements fade/hide (full-screen focus)
   - Timer appears (visual countdown, e.g., Pomodoro: 25 min)
   - Project title visible at top for context
   - User sees: "Focus time: 00:00" (elapsed time)
7. [AUTO] Timer counts up. No distractions. Minimal UI.
8. User writes/works. Session persists.
9. [TAP] "End session" (or timer naturally ends) or phone notification interrupts
   - Session ends
   - User sees session summary: "You focused for 47 minutes on Novel draft"
   - Time is saved to project localStorage
   - User returns to Focus section view

**Exit/Completion:** Deep Focus session is complete. Time logged to project. User ready for next task.

---

### Flow 11: Outside Time Acknowledgment

**Narrative:** Mia spent time outside. Taps Today → Outside Time section → logs it.

**Entry Point:** Today view
**Preconditions:** User has been outside and wants to log it
**Completed By:** Outside time is logged and visible on Today

**Steps:**

1. User is on Today view
2. User scrolls to "Outside Time" section
   - Shows current count: "0h 0m today"
   - Has input or quick-log options
3. [TAP] "Log outside time" button or input area
   - Small panel/modal appears for quick entry
   - Options:
     - "Quick log: +15 min"
     - "Quick log: +30 min"
     - "Custom: [input field]"
4. [TAP] "Quick log: +30 min"
   - Time is added to today's total
   - Display updates: "0h 30m today"
   - Visual feedback (brief pulse/highlight)
   - Time saved to ephemeral state
5. User can add more time or navigate away

**Exit/Completion:** Outside time is logged and persisted for the day (resets at midnight).

---

### Flow 12: Offline Access

**Narrative:** Mia has no network. Opens app. Content loads from service worker cache. She navigates guides and today view freely.

**Entry Point:** App icon (offline state)
**Preconditions:** No network connection. Service worker has cached content (from prior visit). First load or returning.
**Completed By:** User is navigating cached content, no degradation visible

**Steps:**

1. User is offline (no WiFi, no cellular)
2. [TAP] App icon
   - PWA launches
3. [AUTO] Service worker intercepts network requests
   - All requests served from cache (cache-first strategy)
   - No network error shown to user
4. [AUTO] Today view loads from cache:
   - Date displays (computed client-side from system time)
   - Anchor task loads from localStorage
   - Morning/evening routines load from localStorage (today's state)
   - Cat care loads from localStorage
5. User taps Guide tab
   - Guide Index loads from cache
   - All 10 section content loads from cache (static TypeScript files bundled)
6. User navigates between sections (swipe, tap)
   - All animations play smoothly
   - No network latency
7. User taps Week
   - Week view loads from cache
   - 7-day rhythm displays correctly
8. User can read all content, check off routines, edit reflection notes (all offline)
9. [AUTO] When network returns:
   - Service worker detects connection
   - Any writes (checklist state, notes) are synced if backend exists (future phase)
   - No disruption to user experience

**Exit/Completion:** User has full offline experience. No error states, no warnings. Content is always available.

---

### Flow 13: PWA Install Flow (iPhone Safari)

**Narrative:** Mia is on iPhone. Opens Field Guide website in Safari. Adds to home screen. Opens app standalone.

**Entry Point:** Safari, Field Guide website URL
**Preconditions:** iOS Safari, first visit to site
**Completed By:** App is installed on home screen and opens in standalone mode

**Steps:**

1. User is on iPhone Safari
2. User navigates to Field Guide website (or has link)
3. [TAP] Share button (bottom center, square with arrow icon)
   - iOS share menu appears
4. [TAP] "Add to Home Screen"
   - Home screen customize sheet appears
   - Shows app name: "Field Guide to Yourself"
   - Shows app icon (forest green color)
5. [TAP] "Add"
   - Icon is placed on home screen
   - App is now in launcher
6. [TAP] App icon on home screen
   - App launches in standalone mode (no Safari URL bar, no tabs)
   - PWA manifest applies (portrait orientation only, full screen)
   - Service worker registers (background)
   - App shell loads
7. [AUTO] App cold-launches to Today view (PWA entry point)
8. User sees familiar Today page, no onboarding, no splash screen

**Exit/Completion:** App is on home screen and opens in standalone mode every time.

---

## Error Flows

---

### Error Flow 1: localStorage Unavailable (Private Mode)

**Narrative:** User opens app in Safari private mode. localStorage is unavailable. App must gracefully degrade.

**Entry Point:** App cold launch in private/incognito mode
**Preconditions:** localStorage API is disabled or returns quota error
**Completed By:** App displays graceful message and functions without persistence

**Steps:**

1. [AUTO] App detects localStorage unavailable (try/catch)
2. [AUTO] Fallback: app uses in-memory state only
3. [AUTO] Today view renders with all data (computed/static), but warns user:
   - Small banner at top: "Private mode: changes won't be saved"
   - No error tone, calm messaging
4. User can still:
   - View all guides
   - Check off routines (state persists only in current session)
   - Navigate all sections
5. If user closes app and reopens (still in private mode):
   - All ephemeral state resets (routines unchecked)
   - All persistent state lost (anchor task, reflections gone)
   - Banner still shows: "Private mode: changes won't be saved"
6. User is informed upfront. No crashes.

**Exit/Completion:** App functions fully but with degraded persistence. User knows why.

---

### Error Flow 2: No Network, No Cache (First Visit Offline)

**Narrative:** User has never visited app before. Opens with no network. Service worker has nothing to cache yet.

**Entry Point:** App cold launch, offline, first ever visit
**Preconditions:** Zero prior visits. No service worker cache. No network.
**Completed By:** App shows error state but remains open and functional with static content

**Steps:**

1. [TAP] App icon
2. [AUTO] PWA shell loads (cached from browser, built into app)
3. [AUTO] Service worker tries to fetch guide content → network unavailable
4. [AUTO] Fallback: static guide data is bundled (TypeScript files)
   - All 10 guide sections have default/empty content
   - Today view shows date, empty state for routines
5. [AUTO] App shows message:
   - "No network. Some features unavailable. Connect to WiFi to sync."
   - Non-blocking, subtle banner
6. User can navigate and read default content
7. Guide Index shows all 10 sections
8. User can tap sections, but content is minimal/empty
9. User can still check off routines (stored in memory, lost on close)
10. Once network returns:
    - Service worker downloads and caches full guide content
    - App updates silently
    - User sees full content on next visit

**Exit/Completion:** App is usable but degraded until network returns. No crash, no blank screen.

---

### Error Flow 3: Corrupted localStorage

**Narrative:** localStorage data is corrupted (e.g., manual JSON edit, browser bug). App detects invalid state.

**Entry Point:** App cold launch with corrupted localStorage
**Preconditions:** localStorage exists but JSON is malformed or incompatible
**Completed By:** App clears bad data and restarts fresh

**Steps:**

1. [AUTO] App tries to parse localStorage (JSON.parse)
2. [AUTO] Parse fails → catch error
3. [AUTO] App detects corruption
4. [AUTO] Fallback:
   - Clear corrupted localStorage
   - Reinitialize with default state
   - Log error to console (dev only)
5. [AUTO] App displays brief message (1s toast):
   - "Recovered from data error. Starting fresh."
6. User sees Today view with fresh, empty state (as if first-time launch)
7. All prior data lost, but app is stable

**Exit/Completion:** App has recovered. User can continue. Dev can inspect console error log.

---

## Desktop Flow Differences

---

### Desktop Navigation (768px+)

On screens ≥ 768px wide, the layout shifts:

- **Bottom tab bar disappears** (mobile only)
- **Left sidebar appears** (240px wide, sticky)
- Sidebar shows all navigation options:
  - 🌿 Today
  - 📖 Guide (with 10 sublinks to each section)
  - 🗓 Week
  - Finance, Health, System, Reflection, Settings (from More)
- **Main content area** (max 700px, right side)
- **JournalSpread component** activates (two-column view for reading/writing side-by-side)

### Example Desktop Flow: Navigate to Focus Section

1. User is viewing Today on desktop
2. [TAP] "03 Focus" in left sidebar
   - Today content animates out (fade, not slide)
   - Focus section content animates in (fade)
   - URL updates (history.pushState)
3. User sees Focus section in main content area
   - Window Panels are laid out vertically
   - All panels visible at once (no tab switching)
4. User can [TAP] any Window Panel to expand/collapse
   - Panel height animates
   - No full-page navigation
5. [TAP] another section in sidebar:
   - Prior section fades out
   - New section fades in
   - Smooth, no horizontal slide (too jarring on wide screens)

### Desktop Sidebar Interaction

| Element | Interaction | Visual Feedback |
|---------|-----------|---------|
| Nav item (Today, Guide, Week, etc.) | [TAP] | Highlight background, text bold, indicator dot (forest green) |
| Guide subsection (01 Routines, 02 Rhythm, etc.) | [TAP] | Submenu expands (if collapsed), item highlights, content loads right |
| Collapse/expand Guide submenu | [TAP] chevron icon | Submenu collapses/expands, smooth animation |
| Scroll within sidebar | [SWIPE UP/DOWN] | Smooth scroll, no momentum required |

---

## Flow Summary Table

| Flow Name | Entry Point | Steps | Exit/Completion | Notes |
|-----------|-----------|-------|---------|---------|
| **Cold Launch (First Time)** | App icon | 8 steps | Today view, empty state | No onboarding, no splash |
| **Cold Launch (Returning)** | App icon | 8 steps | Today view, restored state | Ephemeral state persists if same day |
| **Morning Routine** | Today view | 5 steps | All items checked, green circles | Tap each item, animation feedback |
| **Evening Routine** | Today view | 5 steps | All items checked | Same as morning, different time block |
| **Navigate Guide & Expand** | Any view | 9 steps | Content panel expanded, readable | Swipe animation, Window Panel expand |
| **Cat Care Check-In** | Today or Guide/Care | 8 steps | Items checked | Quick path or deep dive option |
| **Weekly Rhythm Check** | Any view | 7 steps | User sees week overview, today highlighted | Swipe to scroll week |
| **Finance/Budget Hour** | Guide index | 6 steps | Budget checklist items checked | Persistent state, repeatable |
| **Reflection/System Note** | More menu | 7 steps | Note written and persisted | localStorage debounce save |
| **Anchor Task Set** | Today view | 6 steps | Anchor task visible on Today | Keyboard input, auto-save |
| **Deep Focus Session** | Guide/Focus | 9 steps | Session logged, time recorded | Full-screen focus mode |
| **Outside Time Log** | Today view | 5 steps | Time logged, display updated | Quick log or custom entry |
| **Offline Access** | App icon (offline) | 8 steps | Navigate cached content | No errors, full UX offline |
| **PWA Install (iPhone)** | Safari + website | 8 steps | App on home screen, standalone mode | Manifest applies, portrait orientation |

---

## Accessibility Flows

### Keyboard Navigation (Desktop)

All interactive elements are keyboard-accessible:

1. **Tab order:** Follows visual order (left sidebar → main content → top to bottom)
2. **Enter key:** Activates buttons, expands panels, navigates
3. **Space key:** Checks/unchecks checkboxes
4. **Arrow keys:** Navigate within lists, tabs
5. **Escape key:** Dismisses keyboards, collapses panels, goes back

### Screen Reader Flow (Today View)

1. [TAP] or [FOCUS] Today view
2. Screen reader announces: "Today, page. Thursday March 27, 2026."
3. User navigates with rotor: "Landmarks: region, navigation…"
4. Screen reader announces: "Morning routine, list, 5 items"
5. User swipes to first item: "Meds, checkbox, unchecked, button"
6. User [SPACE] to check: Screen reader announces "checked, list item 1 of 5"
7. Continue to next item: Screen reader announces "Coffee, checkbox, unchecked, button"
8. And so on for all items

### Reduced Motion Behavior

When `prefers-reduced-motion: reduce` is active:

- No slide animations (Today → Guide still transitions, but instantly, no x:-40/x:40 motion)
- No scale animations (expand/collapse panels still animate height, but no opacity change)
- No micro-interactions (checklist item glow is instant)
- No spin/rotate animations
- All state changes are instant but marked with focus/color change

---

## End of User Flows Document

**Total Flows:** 13 primary + 3 error + desktop variations
**Mobile Platforms:** iOS Safari, Android Chrome
**Desktop Platforms:** Any modern browser ≥ 768px wide
**Network Assumptions:** Graceful offline, cache-first strategy
**State Model:** Ephemeral (resets daily) + Persistent (localStorage)

---
