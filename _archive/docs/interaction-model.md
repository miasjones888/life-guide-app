# Interaction Model: Field Guide to Yourself

## Document Header

**App:** Field Guide to Yourself
**Version:** 1.0 (MVP)
**Platform:** Mobile-first PWA (iOS Safari, Android Chrome) + Desktop (768px+)
**Target User:** Mia
**Design Philosophy:** Calm, low-friction, journal-like, field guide metaphor
**Last Updated:** 2026-03-31

---

## Interaction Philosophy

### Why This Isn't a Dashboard

Field Guide to Yourself is deliberately not a dashboard. No:
- Widgets showing aggregated data at a glance
- Notifications, badges, counters
- Real-time sync indicators
- Push notifications
- Habit streaks or gamification

Instead, it's a **felt experience**—the morning ritual of opening a journal or field guide. Each section is a chapter you flip to. Navigation feels like page-turning, not data retrieval. Interactions are calm, intentional, and reversible.

### Core Principle: Presence Over Productivity

The app's job is to be *present* with Mia's life. To ask gentle questions. To hold space. To remember what matters without being intrusive. All interactions serve presence, not productivity.

---

## Core Metaphors

### 1. The Field Guide (Sections as Chapters)

The 10 guide sections are chapters in a field guide to Mia's own life. Like a naturalist's field guide, each chapter:
- Has a distinct subject (Routines, Rhythm, Care, Finance, Body, Home, etc.)
- Contains both reference information and discovery
- Invites exploration without urgency
- Is beautiful to return to repeatedly

**Interaction consequence:** Navigation between sections feels like turning pages, not jumping between tabs. Horizontal slide animation (x:-40/x:40) reinforces the metaphor. Sections are never "stacked" or "grouped"—each is a full chapter.

### 2. The OS Window (Panels as Windowed Containers)

Within each chapter, content lives in **Window Panels**—containers inspired by desktop OS windows:
- Title bar (11px mono, chrome background)
- Content area (paper background, bordered)
- Status bar (micro text at bottom)
- No rounded corners (≤2px radius)—functional, not decorative

**Interaction consequence:** Panels can be independently collapsed/expanded. Multiple panels can be open at once. Opening one doesn't close others. This mirrors how a writer might have multiple documents open while writing.

### 3. The Daily Page (Today as a Bounded Journal Page)

Today view is a single, bounded journal page for the day:
- Date at top (like a journal entry date)
- Single anchor task (the main thing)
- Morning and evening routines (structured rituals)
- Cat care checklist (daily care)
- Meals check-in (nourishment)
- Medications (health)
- Weekly rhythm (weekly context)
- Outside time (embodiment)
- No scrolling past today into future/past (unlike calendar apps)

**Interaction consequence:** Today is not a dashboard. It's a complete, self-contained page. User sees all of today at once (or by scrolling within one page). Checking off items feels like marking a journal page, not optimizing a to-do list.

### 4. The Notepad (Reflection as Open Text)

The Reflection field is an open notepad. No structure, no prompts. Just a blank space to write.

**Interaction consequence:** User can type freely. Text is saved automatically (debounced). No "save" button. No form submission. Like writing in a real notepad—fluid, ambient, non-judgy.

---

## Navigation Interaction Model

### Mobile Bottom Tab Bar (Primary Navigation)

**Visual Design:**
- 56px tall (safe area respected at bottom)
- 4 tabs, thumb-reachable
- Icons only (no labels, to save space)
- Active state: forest green dot + subtle weight shift
- Background: paper color (slightly raised)

**Tab Order (left to right):**
1. 🌿 Today (home)
2. 📖 Guide (sections index)
3. 🗓 Week (7-day rhythm)
4. ··· More (secondary menu: Finance, Health, System, Reflection, Settings)

**Interaction Behavior:**

| Action | Result |
|--------|--------|
| [TAP] inactive tab | Slide animation: current view exits x:-40, new view enters x:40 (240ms ease-out). Active dot moves to new tab. |
| [TAP] active tab | No-op. View stays. (Optional: scroll to top of current view.) |
| [SWIPE] left/right (on content area) | Triggers tab switch (as if user tapped next/prev tab). Swipe left → next tab right (x:-40 exit, x:40 enter). Swipe right → prev tab left (x:40 exit, x:-40 enter). |
| Active state visual | Forest green filled dot below/within tab icon. Tab icon weight increases (600 → 700). Text (if any) is bold. |
| Transition timing | 240ms ease-out. No bounce. Feels deliberate, calm. |

### Desktop Left Sidebar Navigation (Secondary Layout)

**Visual Design:**
- 240px wide, sticky (left edge)
- All navigation items visible at once
- Hierarchical: main items (Today, Guide, Week) + submenu (Guide sections 01–10, More items)
- Active state: background highlight + forest green indicator dot

**Tab/Section List (in sidebar):**
- 🌿 Today
- 📖 Guide
  - ├ 01 Routines
  - ├ 02 Rhythm
  - ├ 03 Focus
  - ├ 04 Care
  - ├ 05 Body
  - ├ 06 Home
  - ├ 07 Finance
  - ├ 08 Field
  - ├ 09 Health
  - └ 10 System
- 🗓 Week
- ··· More
  - Finance (Finance page)
  - Health (Health page)
  - System (System page)
  - Reflection
  - Settings

**Interaction Behavior:**

| Action | Result |
|--------|--------|
| [TAP] main nav item (Today, Guide, Week) | Current content fades out (opacity 0 → 1, 150ms). New content fades in. No slide animation (too jarring on wide screens). Item highlights in sidebar. |
| [TAP] Guide submenu | If collapsed: expands (height animation, 01–10 appear). If expanded: collapses (height animation, 01–10 hide). Or, [TAP] any section (01–10) directly → opens that section (no need to expand/collapse). |
| [TAP] More submenu | Expands/collapses to show Finance, Health, System, Reflection, Settings. |
| [TAP] section within expanded submenu | Content animates in (fade). Sidebar item highlights. URL updates. |
| [SWIPE UP/DOWN] within sidebar | Scrolls sidebar if content overflows (rare at 240px width, but possible on very small desktop). |
| Active state visual | Background color (light green, subtle). Forest green indicator dot to left of text. Font weight 600. |

### Back Navigation

**Mobile Gesture Back (Swipe Right):**

When user is inside a guide section (e.g., viewing Guide 03 Focus), swiping right (or tapping a hardware back button on Android) goes back one level:
- If in section (not index): Guide section exits x:40, Guide Index enters x:-40 (slide animation)
- If in Guide Index: animates back to previous top-level view (e.g., Today)
- If on Today: app stays on Today (no-op, or activates app switcher on iOS)

**Desktop Back Button (Browser/Hardware):**
- [TAP] browser back button (or [CMD+][ on Mac, [ALT+][ on Windows)
- URL goes back via history.pushState
- View animates in (fade, 150ms)
- No slide animation on desktop

**Interaction Consistency:**
- Always reversible. User can go forward and back.
- No "lost" states. Each navigation step is recorded in browser history.
- On iOS PWA (no back button UI), swipe gesture is primary; Android hardware back button is secondary.

### Section-to-Section Navigation Animation

**Animation Spec (Mobile):**

```
Forward navigation (e.g., Today → Guide):
  Current view (Today):
    - opacity: 1 → 1 (no fade)
    - transform: translateX(0) → translateX(-40px)
    - duration: 240ms
    - easing: ease-out

  Incoming view (Guide):
    - opacity: 1 → 1 (no fade)
    - transform: translateX(40px) → translateX(0)
    - duration: 240ms
    - easing: ease-out
    - starts simultaneously (not sequentially)

Back navigation (e.g., Guide → Today):
  Current view (Guide):
    - opacity: 1 → 1 (no fade)
    - transform: translateX(0) → translateX(40px)
    - duration: 240ms
    - easing: ease-out

  Incoming view (Today):
    - opacity: 1 → 1 (no fade)
    - transform: translateX(-40px) → translateX(0)
    - duration: 240ms
    - easing: ease-out

Timing: Both views animate simultaneously (not chained). No stagger. Feels fast.
```

**Animation Spec (Desktop):**

```
Forward navigation:
  Current view:
    - opacity: 1 → 0
    - duration: 150ms
    - easing: ease-out

  Incoming view:
    - opacity: 0 → 1
    - duration: 150ms
    - easing: ease-out
    - starts simultaneously

Back navigation: Same as forward (simple cross-fade, no directional motion).
```

### Swipe Gesture Detection (Mobile)

**Horizontal Swipe (Section Navigation):**
- **Swipe left** (< 300px right, > 50px displacement): Next tab (x:-40 exit, x:40 enter)
- **Swipe right** (> 300px right, > 50px displacement): Previous tab (x:40 exit, x:-40 enter) or back
- **Threshold:** 50px minimum displacement to register swipe (prevents accidental swipes while scrolling)
- **Gesture handler:** React Router or custom Framer Motion hook

**Vertical Swipe (Within Section):**
- **Swipe up/down:** Scrolls section content (standard overflow scroll, no custom animation)
- **Swipe up at bottom:** No app-wide action (just end of scroll)
- **Swipe down at top:** Optional pull-to-refresh (not implemented in Phase 1)

---

## Touch Interaction Model

### Core Touch Interactions

| Gesture | Target | Result | Animation |
|---------|--------|--------|-----------|
| **[TAP]** | Checklist item (unchecked) | Item state → checked; checkbox fills green; text mutes | 100ms scale pulse + color fade |
| **[TAP]** | Checklist item (checked) | Item state → unchecked; checkbox empties; text darkens | 100ms scale pulse + color fade |
| **[TAP]** | Tab bar tab (inactive) | Navigate to that tab | Slide animation (240ms) |
| **[TAP]** | Tab bar tab (active) | Optional: scroll to top of view | Scroll animation (300ms, easing-out) |
| **[TAP]** | Window Panel title bar (collapsed) | Panel expands; height animates open | Framer Motion height + opacity (150ms ease-out) |
| **[TAP]** | Window Panel title bar (expanded) | Panel collapses; height animates closed | Framer Motion height + opacity (150ms ease-out) |
| **[TAP]** | Text input field (NotepadPanel, AnchorTask, Reflection) | Keyboard appears; cursor is active | iOS/Android native keyboard slide (platform standard) |
| **[TAP]** | Read more link (within expanded panel) | Scrolls to show more text within panel | Native scroll, no custom animation |
| **[SWIPE LEFT]** | Content area (horizontal swipe) | Navigate to next tab (same as [TAP] right tab) | Slide animation (240ms) |
| **[SWIPE RIGHT]** | Content area (horizontal swipe) | Navigate to prev tab or back (same as [TAP] left tab) | Slide animation (240ms) |
| **[SWIPE UP/DOWN]** | Content area (vertical swipe) | Scroll content within section | Native scroll, no custom animation |
| **[LONG PRESS]** | (none defined) | N/A | N/A |
| **[PINCH/ZOOM]** | (disabled) | App doesn't respond to pinch | N/A |
| **[PULL TO REFRESH]** | (not implemented) | N/A | N/A |

### Tap Target Sizes

All interactive elements meet minimum accessibility:
- **Checklist item:** 44px tall (entire row is tap target, not just checkbox)
- **Tab bar tab:** 56px tall (full safe area)
- **Window Panel title bar:** 36px tall (includes padding)
- **Text link:** 44px min height (if within paragraph, at least 24px text size)
- **Button:** 44px tall, 40px wide minimum
- **Text input field:** 44px tall (native iOS/Android keyboard safe area)

---

## Component-Level Interactions

### Window Panel (Collapsed ↔ Expanded)

**Component Structure:**
```
┌─────────────────────────────────────┐
│ Title Bar (11px mono, chrome bg)    │ ← [TAP] to toggle
├─────────────────────────────────────┤
│                                     │
│ Content Area (hidden if collapsed)  │
│ (paper background, scrollable)      │
│                                     │
├─────────────────────────────────────┤
│ Status Bar (micro text, muted)      │
└─────────────────────────────────────┘
```

**Interaction Behavior:**

| State | Visual | Content Height | Opacity |
|-------|--------|-----------------|---------|
| Collapsed | Title bar only, gray border | 36px | 0% (hidden) |
| Expanded | Title + content + status, darker border | Varies (100–500px) | 100% (visible) |

**Animation Spec (Collapsed → Expanded):**
```
Title bar:
  - No movement, stays fixed

Content area:
  - height: 0 → [content_height] (e.g., 300px)
  - opacity: 0 → 1
  - duration: 150ms
  - easing: ease-out
  - overflow: hidden during animation

Status bar:
  - Appears at same time as content
  - opacity: 0 → 1 (150ms)
```

**Expanded → Collapsed:**
```
Content area:
  - height: [content_height] → 0
  - opacity: 1 → 0
  - duration: 150ms
  - easing: ease-out

Status bar:
  - opacity: 1 → 0 (150ms)
```

**Multiple Panels Open:**
- Tapping panel A while panel B is open: both remain open
- No automatic collapse
- User can have 2–5 panels expanded at once (page scrolls if needed)

### Checklist Item (Unchecked → Checked)

**Component Structure:**
```
┌─ [CHECKBOX] Text label ─────────────────┐
│ 44px minimum height, tap entire row     │
└─────────────────────────────────────────┘
```

**Interaction Behavior:**

| State | Checkbox | Text Color | Text Weight | Background |
|-------|----------|-----------|-------------|------------|
| Unchecked | Empty circle (1px border, ink color) | ink (dark) | 400 (regular) | Transparent |
| Checked | Filled circle (forest green) | ink-muted (gray) | 400 (regular) | Transparent (no strikethrough) |

**Animation Spec (Unchecked → Checked):**
```
Checkbox circle:
  - stroke-width: 1px → 0px (fills)
  - fill: transparent → forest-green
  - scale: 1 → 1.1 (pulse) → 1
  - duration: 100ms scale, 80ms color
  - easing: ease-out

Text label:
  - color: ink → ink-muted
  - duration: 100ms
  - easing: ease-out

Background:
  - No background change (not like traditional strikethrough todo)
  - Subtlety is key (Mia doesn't need visual celebration)
```

**Checked → Unchecked:**
```
Same animation in reverse (100ms total).
Checkbox unfills, text darkens.
```

### Routine Checklist (Sequential Check Behavior)

**Component Structure:**
```
Morning Routine
├─ [_] Meds
├─ [_] Coffee
├─ [_] Write 10 min
├─ [_] Stretch
└─ [_] Cat care
```

**Interaction Behavior:**
- User taps items in any order (not forced sequential)
- Each item animates independently (100ms per item)
- No skip logic or blocking
- All items can be unchecked and re-checked throughout the day
- At midnight (new calendar day), all items reset to unchecked

**Visual Feedback:**
- Optional: "3/5 complete" micro text below routine section (only visible if at least 1 item is checked)
- No progress bar
- No celebration on 100% complete

### Bottom Nav Tab Switch

**Component Structure:**
```
┌──────────────────────────────────────┐
│ 🌿 Today │ 📖 Guide │ 🗓 Week │ ··· More │
└──────────────────────────────────────┘
 [active dot below Today] [weight: 700]
```

**Interaction Behavior:**

| Action | Active Indicator | Content Animation | Timing |
|--------|------------------|------------------|--------|
| [TAP] Guide tab (from Today) | Dot moves under 📖, weight 700 | Today x:-40, Guide x:40 | 240ms ease-out |
| [TAP] Week tab (from Guide) | Dot moves under 🗓, weight 700 | Guide x:-40, Week x:40 | 240ms ease-out |
| [TAP] More tab (from Week) | Dot moves under ···, weight 700 | Week x:-40, More x:40 | 240ms ease-out |
| [TAP] active tab again | No change (optional: scroll to top) | None | N/A |

**Tab Indicator Animation:**
```
Active dot:
  - Moves to new tab position (translateX)
  - duration: 240ms
  - easing: ease-out
  - Synced with content slide
```

### AnchorTask Field (Tap → Edit → Dismiss)

**Component Structure:**
```
Anchor for today
├─ (collapsed) Title bar only, shows text preview
└─ (expanded) Full text input area
```

**Interaction Behavior:**

| State | Height | Content | Keyboard |
|-------|--------|---------|----------|
| Collapsed | 44px | Title bar only, preview of first line of text | Hidden |
| Expanded | 120px | Full text input field, cursor blinking | Visible (active) |

**Animation Spec (Tap → Expand):**
```
Panel height:
  - 44px → 120px
  - duration: 150ms
  - easing: ease-out

Text input:
  - opacity: 0 → 1 (150ms)
  - focus: true (cursor active)

Keyboard:
  - appears after animation completes (platform standard delay, ~50ms)
```

**Auto-Save Behavior:**
```
As user types:
  - debounce: 500ms
  - each keystroke triggers debounce timer
  - on debounce fire: save to localStorage
  - no visual "saving" indicator
  - no error handling shown (fails silently, retries on next debounce)
```

**Tap Outside (Dismiss):**
```
When user taps outside text field or navigates away:
  - Keyboard dismisses (platform standard)
  - Panel collapses (if text is < 1 line) or stays expanded (if text is long)
  - Text persists to localStorage
  - no "save" action needed by user
```

### NotepadPanel (Reflection Field)

**Component Structure:**
```
Reflection
├─ (always expanded)
├─ Large text input (no collapse)
├─ Placeholder: "What's on your mind?"
└─ Optional: word count (micro text, bottom right)
```

**Interaction Behavior:**

| Interaction | Result |
|-------------|--------|
| [TAP] text input area | Keyboard appears, cursor active |
| [TYPE] text | Text renders in real-time, word count updates (if shown) |
| [TAP] outside | Keyboard dismisses (native platform behavior) |
| Navigate away | Text is auto-saved (debounced 500ms), user is not blocked |
| Return to Reflection | Prior text is loaded from localStorage, cursor can continue |

**Auto-Save Spec:**
```
On keystroke:
  - debounce: 500ms
  - trigger save to localStorage
  - no confirmation message
  - no error UI

On app close:
  - any unsaved text is lost (but debounce usually completes)
  - next session loads last saved version
```

### WeekRow (Current Day Highlight & Horizontal Scroll)

**Component Structure:**
```
┌─ Week View ────────────────────┐
│ Mon 3/24                        │
│ Tue 3/25                        │
│ Wed 3/26                        │
│ Thu 3/27 [HIGHLIGHTED]          │ ← today
│ Fri 3/28                        │
│ Sat 3/29                        │
│ Sun 3/30                        │
└─────────────────────────────────┘
```

**Visual Spec (Current Day Highlight):**
- Background: light green (ink-20)
- Border left: 2px forest green
- Font weight: 600 (bold)
- Text color: ink (darker)

**Interaction Behavior:**

| Action | Result |
|--------|--------|
| [TAP] any day row | Navigate to that day's guide recommendations (optional deep link, Phase 2) |
| [SWIPE UP/DOWN] within Week view | Scroll to see future weeks (if available) |
| [SWIPE LEFT/RIGHT] on Week view | Same as swipe on content area—navigate to next/prev tab (Week → More, or Week → Guide) |

### Today Active Block (Time-Based Transition)

**Component:**
The "Active Block" is a computed element showing current time-of-day block:
- Morning (6am–12pm)
- Afternoon (12pm–5pm)
- Evening (5pm–12am)
- Night (12am–6am, if user is still awake—rarely used)

**Interaction Behavior:**

| Time | Active Block | Routine Section | Visual |
|------|--------------|-----------------|--------|
| 6am–12pm | Morning | Morning routine appears (or is highlighted) | "Morning" label at top |
| 12pm–5pm | Afternoon | Afternoon block (if defined) or routine section changes | "Afternoon" label at top |
| 5pm–12am | Evening | Evening routine appears (or is highlighted) | "Evening" label at top |

**Animation Spec (Block Transition):**
```
When time crosses threshold (e.g., 12pm → Afternoon):
  - active block text fades out (opacity 1 → 0, 150ms)
  - active block text changes
  - active block text fades in (opacity 0 → 1, 150ms)
  - routine section expands/highlights (if collapsed)
  - duration: 300ms total
  - easing: ease-out
```

**No User Interaction:** Block transition is automatic, computed by comparing current time to threshold times.

---

## State Model

### Ephemeral State (Resets Daily)

**Definition:** State that is relevant only to today. Resets at midnight (new calendar day).

**Ephemeral State Data:**
- Morning routine checklist (all 5 items: checked or unchecked)
- Evening routine checklist (all 5 items)
- Cat care checklist (3 items)
- Meals check-in status
- Medications check-in status
- Outside time logged (hours/minutes)
- Deep Focus session time (for today)

**Storage:** localStorage, namespaced by date (`today_2026_03_31_routine_morning`)

**Lifecycle:**
1. App cold launch on Day 1: Initialize as empty/unchecked
2. User checks off items throughout Day 1
3. User closes app (state persists in localStorage)
4. User returns to app later on Day 1 (same calendar day): State is restored, items stay checked
5. Midnight: Calendar day changes to Day 2
6. App detects new day (via date comparison): Clears all ephemeral state for Day 1
7. Day 2 view shows all items unchecked (fresh start)

**Reset Trigger:**
```javascript
if (storedDate !== today) {
  // New day detected
  clearEphemeralState(); // resets all today's data
  initializeNewDay(); // sets today = new date
}
```

### Persistent State (Survives Day Boundary)

**Definition:** State that transcends individual days. User-created content that is permanent.

**Persistent State Data:**
- Anchor task text (persists across days; user can re-use or modify)
- Reflection notes (all of them, cumulative)
- Finance/budget checklist items (checked state)
- Project definitions in Focus section (name, description, time logged)
- User settings (theme, notifications, etc.)
- Weekly rhythm definitions (7 days × focus text)

**Storage:** localStorage, no date namespace

**Lifecycle:**
1. User writes anchor task "Finish draft section 3" on Day 1
2. User closes app
3. User opens app on Day 2: Anchor task still shows "Finish draft section 3"
4. User can keep it, edit it, or clear it
5. User writes reflection "Feeling scattered today" on Day 2
6. On Day 3, both prior anchor tasks (Day 1, Day 2) are available in history (if UI supports browsing prior days' anchors—Phase 2 feature)

### Computed State (Derived, Not Stored)

**Definition:** State calculated at runtime, never persisted. Always fresh.

**Computed State Data:**
- Current active block (Morning/Afternoon/Evening—derived from system time)
- Current week (Mon–Sun—derived from system date)
- Today's date (derived from system date)
- Day of week (derived from system date)
- Is today a new day? (derived by comparing stored date to current date)

**No Storage:** Computed state is never written to localStorage. It's calculated on every app load or time-based event.

**Example (Active Block):**
```javascript
function getActiveBlock(currentTime) {
  const hour = currentTime.getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 24) return 'evening';
  return 'night';
}
// Called on app load and on setInterval (every minute check)
```

### Static State (TypeScript Content, Never Changes at Runtime)

**Definition:** Content defined at build time. Never changes without a code redeploy.

**Static State Data:**
- All 10 guide section definitions (content, formatting, structure)
- Window Panel definitions (title, content blocks)
- Checklist item labels (Meds, Coffee, etc.)
- Weekly rhythm default structure
- All copy/microcopy (labels, placeholders, button text)

**Storage:** TypeScript files (`/src/guides/*.ts`, `/src/content/*.ts`)

**No Runtime Changes:** Static content cannot be edited in the app (no admin panel, no CMS). Changes require code redeploy.

**Why This Works:** Field Guide is a personal tool for a single user (Mia). No multi-user collaboration, no need for dynamic content management. Static TypeScript is fast, simple, and reliable.

---

## Animation Language Reference

### Master Animation Specifications

Every animation in the app is built from 3 core specs:

#### 1. Section Navigation (Horizontal Slide)

**Used For:** Tab switching, guide navigation, back/forward movement

**Mobile Spec:**
```
Forward (left tab → right tab):
  Current view:
    transform: translateX(0) → translateX(-40px)
    opacity: 1 (no fade)
    duration: 240ms
    easing: ease-out

  Incoming view:
    transform: translateX(40px) → translateX(0)
    opacity: 1 (no fade)
    duration: 240ms
    easing: ease-out
    [starts simultaneously with current view exit]

Back (right tab → left tab):
  Current view:
    transform: translateX(0) → translateX(40px)
    duration: 240ms
    easing: ease-out

  Incoming view:
    transform: translateX(-40px) → translateX(0)
    duration: 240ms
    easing: ease-out
```

**Desktop Spec:**
```
Both forward and back:
  Current view:
    opacity: 1 → 0
    duration: 150ms
    easing: ease-out

  Incoming view:
    opacity: 0 → 1
    duration: 150ms
    easing: ease-out
    [starts simultaneously]

Note: No motion on desktop, only cross-fade. Reduces cognitive load on larger screens.
```

**Trigger:** User taps tab, swipes horizontally, or navigates via sidebar link

---

#### 2. Panel Expand/Collapse (Height Animation)

**Used For:** Window Panels, NotepadPanel, AnchorTask

**Spec:**
```
Collapsed → Expanded:
  height:
    from: 36px (title bar only)
    to: [content_height] (100–500px, varies by content)
    duration: 150ms
    easing: ease-out
    overflow: hidden (clips during animation)

  opacity (content):
    from: 0
    to: 1
    duration: 150ms
    easing: ease-out
    [synced with height animation]

  border-color:
    from: ink-40 (light gray)
    to: ink-60 (darker gray)
    duration: 150ms
    easing: ease-out
    [subtle depth increase]

Expanded → Collapsed:
  Reverse of above (150ms, same easing)
```

**Trigger:** User taps panel title bar

---

#### 3. State Change (Micro Animation)

**Used For:** Checklist item check/uncheck, tab switch feedback, input focus

**Spec (Checklist Check):**
```
Checkbox circle:
  fill:
    from: transparent
    to: forest-green
    duration: 80ms
    easing: ease-out

  scale (pulse):
    from: 1
    to: 1.1 (peak) → 1 (end)
    duration: 100ms
    easing: cubic-bezier(0, 0.7, 0, 1) [bouncy]

Text label:
  color:
    from: ink (dark)
    to: ink-muted (gray)
    duration: 100ms
    easing: ease-out

Background:
  No change (no highlight, no fade)
```

**Trigger:** User taps checklist item

---

#### 4. Fade (Cross-Fade, Desktop-Only)

**Used For:** Desktop section navigation, modal/dialog entry

**Spec:**
```
Current element:
  opacity: 1 → 0
  duration: 150ms
  easing: ease-out

Incoming element:
  opacity: 0 → 1
  duration: 150ms
  easing: ease-out
  [starts simultaneously]
```

**Trigger:** User navigates on desktop (sidebar click) or modal appears

---

#### 5. Scroll (Native, No Custom Animation)

**Used For:** Within-section vertical scroll, week view overflow scroll

**Spec:**
```
Scroll behavior: smooth (not instant)
  scrollBehavior: 'smooth' (CSS)
  duration: computed by scroll distance (platform standard)
  easing: ease-out
  no momentum scrolling customization (platform default)
```

**Trigger:** User scrolls with finger or wheel. Swipe gesture on touch.

---

### Animation Timing Reference

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| Section slide (mobile) | 240ms | ease-out | Page-turning feel, unhurried |
| Section fade (desktop) | 150ms | ease-out | Subtle, less motion |
| Panel expand/collapse | 150ms | ease-out | Content reveal, not jarring |
| Checklist pulse | 100ms | cubic-bezier(0, 0.7, 0, 1) | Feedback, playful but calm |
| Color fade (text/icon) | 80–100ms | ease-out | Micro change, quick |
| Scroll (smooth) | dynamic | ease-out | Natural, not stiff |

**Philosophy:** All animations are under 300ms. Most are 150ms or less. The goal is to feel responsive without feeling rushed or chaotic.

---

## Reduced Motion Behavior

When user has enabled `prefers-reduced-motion: reduce` (in OS accessibility settings):

### Affected Animations

| Animation | Normal | Reduced Motion |
|-----------|--------|-----------------|
| Section slide (mobile) | 240ms slide x:±40 | Instant fade (0ms, or 50ms) |
| Section fade (desktop) | 150ms fade | Instant (0ms, or 50ms fade) |
| Panel expand | 150ms height | Instant expand, no opacity fade |
| Checklist pulse | 100ms scale + 80ms color | Instant color change, no scale |
| Scroll (smooth) | Momentum scroll | Instant scroll to target |
| Tab switch feedback | 240ms slide | Instant tab change, color updates |

### CSS Implementation

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Behavior Detail

With reduced motion:
- All animations are instant (0ms) or very fast (50ms max)
- No scale/rotation animations
- No multi-step animations (always single keyframe change)
- Color changes, state updates still happen (just without motion)
- User still gets visual feedback (color, border, text change) but no motion
- Focus indicators remain visible (important for keyboard nav)

---

## Accessibility Interaction Model

### Keyboard Navigation

All interactive elements are keyboard-accessible. Tab order follows DOM order and visual left-to-right, top-to-bottom.

#### Mobile (On-Screen Keyboard)

Mobile devices use on-screen keyboards, so hardware keyboard nav is secondary:
- [TAP] text input → keyboard appears
- [ENTER] on keyboard → submits (if form)
- [ESCAPE] (if supported) → dismisses keyboard, stays in app
- Hardware back button (Android) → navigates back (handled by app)

#### Desktop (Hardware Keyboard)

All navigation and interactions can be done via keyboard:

| Keyboard Input | Action | Result |
|---|---|---|
| [TAB] | Move focus forward | Focus ring appears, next element highlights |
| [SHIFT + TAB] | Move focus backward | Focus ring moves to previous element |
| [ENTER] / [SPACE] | Activate focused element | Button press, link navigation, checkbox toggle |
| [ARROW UP/DOWN] | Navigate within list or panel | Focus moves to next/prev item |
| [ARROW LEFT/RIGHT] | Tab navigation (sidebar) | Focus moves to prev/next tab |
| [ESCAPE] | Close/dismiss | Modal closes, panel collapses (context-dependent) |
| [CMD + ]] (Mac) / [ALT + ARROW RIGHT] (Windows) | Forward in history | App navigates forward |
| [CMD + [] (Mac) / [ALT + ARROW LEFT] (Windows) | Back in history | App navigates back |
| [CMD + Z] (Mac) / [CTRL + Z] (Windows) | Undo (optional) | Reverse last action (Phase 2 feature) |

### Focus Management

- **Focus ring:** Visible outline (2px forest green border, 2px offset) around focused element
- **Focus order:** Logical, not by visual position (left sidebar first, then main content, then follow reading order)
- **Focus trapping:** No focus trap (user can escape with [ESCAPE] or [TAB] out)
- **Initial focus:** On page load, focus goes to main content region (not sidebar, not top nav)
- **Restored focus:** After navigation (tab switch), focus returns to main content (not retained from prior section)

### Screen Reader Behavior

Field Guide uses semantic HTML and ARIA roles to communicate structure:

#### Today View Example

```
Announcements (in order of DOM):
1. "Today, page"
2. "Thursday, March 27, 2026"
3. "Morning routine, list"
4. "Meds, checkbox, unchecked, button"
5. "Coffee, checkbox, unchecked, button"
6. [etc. for all 5 morning items]
7. "Cat care, list"
8. "Maisie meds, checkbox, unchecked, button"
9. [etc.]
10. "Outside time, 0 hours logged today"
11. "Weekly rhythm, list"
12. [etc.]
```

#### Guide Section Example

```
Announcements:
1. "Guide index, page"
2. "Sections, list, 10 items"
3. "01 Routines, link, button"
4. "02 Rhythm, link, button"
5. [etc.]
6. "Opened section 04 Care"
7. "Care, page"
8. "Morning medications, panel, collapsed"
9. "Cat care schedule, panel, collapsed"
10. [etc.]
```

### ARIA Roles & Attributes

- **`role="button"`** on all tappable elements (checkboxes, tab bar tabs, expand/collapse toggles)
- **`aria-checked="true/false"`** on checkbox inputs
- **`aria-expanded="true/false"`** on collapsible panels
- **`aria-current="page"`** on active navigation item (sidebar, tab bar)
- **`aria-label="..."`** on icon-only buttons (tab bar tabs, panel expand toggle)
- **`aria-describedby="..."`** linking elements to descriptions (optional)
- **`aria-live="polite"`** on status updates (optional—used for "checklist complete" announcements)

### Focus Visible States

Every interactive element has a visible focus state:

```css
button:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-forest-green);
  outline-offset: 2px;
}

/* No outline on mouse-only (no click-visible) */
button:focus:not(:focus-visible) {
  outline: none;
}
```

---

## Error Interaction States

### Network Error

**Scenario:** User navigates to a section, network request fails.

**UI Display:**
- Banner at top: "No connection. Showing cached content."
- Non-blocking, muted color (ink-muted)
- User can still interact with cached content

**Interaction:**
- No alert() or modal
- User can dismiss banner by swiping it away (optional) or it fades after 5s
- Content stays visible beneath banner

### Offline Error (No Cache)

**Scenario:** First-time user, no network, no service worker cache yet.

**UI Display:**
- Panel in main content area: "Offline. Some content unavailable."
- Shows default/empty state of content
- User can navigate and explore (will see empty sections)

**Interaction:**
- Non-blocking
- User can navigate normally
- Once online, sections populate with real content

### localStorage Quota Error

**Scenario:** App tries to save state, but localStorage is full.

**UI Display:**
- Silent failure (no user-facing error in Phase 1)
- Dev console logs error for debugging
- Data loss is graceful (app continues, some state may not persist)

**Interaction:**
- No visible error
- User experience is unchanged (they don't know a save failed)
- Mitigation: implement quota management later (cleanup old sessions, etc.)

### Corrupted Data

**Scenario:** localStorage is malformed or incompatible.

**UI Display:**
- Brief toast (1–2s): "Recovered from data error. Starting fresh."
- Non-threatening, neutral tone

**Interaction:**
- Toast auto-dismisses
- App resets to fresh state
- User can continue normally (prior data is lost)

### Invalid Input

**Scenario:** User enters invalid data (e.g., very long text in anchor task).

**UI Display:**
- Silent truncation (no error shown)
- Input is limited via maxLength attribute
- User can't type beyond the limit

**Interaction:**
- No error message
- Typing just stops working past the limit
- Feels smooth, not restrictive

---

## Motion Preferences Summary

| Scenario | With Motion | Reduced Motion | Always Visible |
|----------|------------|-----------------|---|
| Tab switch | 240ms slide (mobile) | Instant fade | Tab highlight, color change |
| Panel expand | 150ms height + opacity | Instant height | Border color, content appears |
| Checklist check | 100ms pulse + 80ms color | Instant color | Checkbox filled, text muted |
| Navigation (desktop) | 150ms fade | Instant | Text/icon highlight |
| Scroll | Smooth momentum | Instant to target | Content position change |

**Philosophy:** Motion is delightful but optional. All state changes are communicated via color, border, or other non-motion cues.

---

## Design Tokens Reference (For Implementation)

### Timing Functions

```javascript
const timing = {
  sectionSlide: '240ms', // mobile horizontal nav
  sectionFade: '150ms', // desktop horizontal nav
  panelToggle: '150ms', // expand/collapse
  microFeedback: '100ms', // checklist check
  colorFade: '80ms', // text/icon color
  easing: 'ease-out', // default
  easeIn: 'ease-in',
  easingBounce: 'cubic-bezier(0, 0.7, 0, 1)', // checklist pulse
};
```

### Motion Distances

```javascript
const motion = {
  slideOffset: '40px', // section slide x displacement
  pulseScale: '1.1', // checklist checkbox scale at peak
  focusOutsetOffset: '2px', // focus ring offset
};
```

### Breakpoints

```javascript
const breakpoints = {
  mobile: '< 768px', // bottom tab bar, full-width sections
  tablet: '>= 768px', // sidebar + content (still portrait)
  desktop: '>= 1024px', // wide sidebar + full content + potential right panel
};
```

---

## Implementation Notes for Developers

### Framer Motion Usage

All animations should use Framer Motion library:
```javascript
import { motion } from 'framer-motion';

// Section slide
<motion.div
  initial={{ x: 40 }}
  animate={{ x: 0 }}
  exit={{ x: -40 }}
  transition={{ duration: 0.24, ease: 'easeOut' }}
>
  Content
</motion.div>

// Panel expand
<motion.div
  animate={{ height: isOpen ? 'auto' : '36px' }}
  transition={{ duration: 0.15, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### Accessibility Checklist

- [ ] All interactive elements have `role="button"` or semantic equivalent
- [ ] All focused elements have visible focus ring (2px forest green)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All color/state changes do not rely solely on color (use text, border, icon change)
- [ ] All modals have focus trap (if used)
- [ ] All alt text for images is present (if images exist)
- [ ] Keyboard tab order is logical and visible
- [ ] ARIA labels/descriptions are clear and concise

---

## End of Interaction Model Document

**Total Components Detailed:** 10
**Total Animations Specified:** 5 core + variants
**Accessibility Standards:** WCAG 2.1 AA
**Mobile Platforms:** iOS Safari, Android Chrome
**Desktop Layout:** 768px+ (sidebar + content)

---
