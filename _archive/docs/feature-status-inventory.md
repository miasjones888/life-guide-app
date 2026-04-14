# Life Guide App — Feature Inventory & Status

_Last updated: April 7, 2026._

This is a complete feature inventory based on the current codebase + existing roadmap docs.

## Status key

- **Built + functional**: implemented in app and actively usable now.
- **Built + working (with limits)**: implemented and usable, but constrained by static data, local-only persistence, or setup requirements.
- **Will be added**: already planned in project docs, not implemented yet.
- **Could / should be added**: high-value next additions based on current architecture and visible gaps.

---

## 1) Built + functional (usable now)

### A. Core app shell + navigation
- Mobile-first page shell with consistent layout, version footer, and subtle page transition.
- Bottom navigation with primary tabs (`today`, `guide`, `week`) and “more” drawer for additional pages.
- Swipe navigation across primary tabs (`/`, `/guide`, `/weekly`).
- PWA baseline assets present (`manifest.json`, service worker files in `/public`).

### B. Today view (`/`)
- Live current time + date display.
- “Your brief” panel with anchor points, top priority, and grounding phrase that changes by time of day.
- “Anchor task” input persisted to localStorage.
- Time-aware checklist mode (morning/evening blocks) with per-day completion dimming saved in localStorage.
- Upcoming events list (next items from recurring daily schedule).
- Today-only one-time events (filtered from dated event set).
- Embedded AI assistant panel.

### C. Guide (`/guide`)
- Sectioned field manual with implemented sections §01–§04:
  - Priorities (interactive status cycle: todo → doing → done).
  - Finance urgent items.
  - Pet care + vet reference.
  - Field/work locations.
- Priority status persistence via `usePriorityStatus` hook.

### D. Weekly rhythm (`/weekly`)
- Expandable day-by-day weekly structure.
- Auto-opens today’s weekday.
- Focus labels per weekday and selected contextual copy injections.
- Biweekly recurring block rendering.

### E. Daily rhythm (`/daily`)
- Full-day grouped timeline (morning / afternoon / evening).
- Anchor mode toggle (reduced cognitive load view for non-negotiables + top priority).
- Every-two-days recurring section.

### F. Monthly rhythm (`/monthly`)
- Grouped monthly recurring event display:
  - first Sunday
  - fixed date
  - first Friday
  - no fixed date
  - interval-based recurring items
- Monthly budget-reset checklist.
- One-time April events grouped by date with urgency flags.

### G. Budget planner (`/budget`)
- Local budget state model with seeded defaults.
- Inline amount editing for baseline lines and month overrides.
- Categorized views (income, fixed, variable, subscriptions).
- Calculated month summary + forward projections.
- Goal list support and next-step extraction.
- localStorage persistence with versioned shape.

### H. Folders / notecard system (`/folders`)
- Folder shelf for project buckets.
- Capture stack workflow.
- Add note sheet with typed note formats.
- Move/update/delete notes and archive handling.
- localStorage persistence and cross-tab storage sync listener.

### I. Deck / flashcards (`/deck`)
- Add, edit, delete, flag cards.
- Filters by category, search, sort modes, and review modes.
- Random shuffle and sequential navigation.
- Undo delete window.
- Export and import JSON deck.
- localStorage persistence with schema compatibility handling.

### J. Reflection (`/reflection`)
- Freeform writing area with autosave.
- Save state indicator.
- Clear/reset action with confirmation.

### K. Test coverage (targeted utilities/hooks)
- Unit tests present for:
  - event time parsing
  - date formatting
  - flashcard hook behaviors

---

## 2) Built + working (with limits)

### A. AI assistant (Today page + `/api/assistant`)
- Works with Anthropic, OpenAI, or Gemini provider selection.
- Uses a structured system prompt and JSON response parsing.
- Supports retry/fallback behavior in `auto` mode on retryable provider errors.

**Current limits**
- Requires API keys in environment.
- Assistant is advisory only; no direct in-app mutation tools yet.
- No native tool execution path (e.g., “update calendar now” actions) inside the current endpoint.

### B. Calendar/event model
- Rendering is robust across daily/weekly/monthly contexts.

**Current limits**
- Event data is still primarily static content constants.
- In-app event changes are not yet persisted as a full calendar-editing system.

### C. PWA/offline posture
- Manifest and service worker files exist; app is structured for installability.

**Current limits**
- Offline behavior is present but not explicitly validated in this inventory against full acceptance checklist scenarios.

---

## 3) Will be added (already planned)

From existing project roadmap docs:

1. **Chat-to-update calendar**
   - Start with localStorage form or direct chat workflow for adding/editing/removing events.
   - Later evolve toward live Google Calendar API integration.

2. **Guide sections §05–§10 content completion**
   - Body, Home, Health, System, Routines, Rhythm.

3. **Desktop sidebar navigation**
   - Replace mobile bottom-nav behavior on wider breakpoints with sticky side navigation.

---

## 4) Could / should be added (recommended next wave)

### Highest value (should)
1. **Calendar write-path MVP (local first)**
   - Add structured event CRUD UI with local persistence and merge into rendered calendar lists.
2. **Dedicated “Today next action” engine**
   - A deterministic selector that always surfaces one tiny actionable step from current state.
3. **Cross-device sync option**
   - Optional encrypted sync/export profile for budget, folders, reflection, and deck.
4. **Resilience + validation layer for stored data**
   - Shared schema validation utility for all localStorage domains.
5. **Accessibility hardening pass**
   - Keyboard/focus audits, ARIA refinements for drawers/sheets, contrast checks.

### Medium value (could)
1. **Search across all modules** (guide + events + notes + deck).
2. **Command palette / quick capture** from any page.
3. **Reminder integrity checks** for medication/financial deadlines.
4. **Analytics-free “health checks” page**
   - purely local diagnostics (storage usage, sync state, service worker state).
5. **Structured backup/restore bundle**
   - single JSON snapshot for all local domains.

---

## 5) Quick snapshot by route

- `/` Today: **Built + functional**
- `/guide`: **Built + functional** (sections §01–§04)
- `/weekly`: **Built + functional**
- `/daily`: **Built + functional**
- `/monthly`: **Built + functional**
- `/budget`: **Built + functional**
- `/folders`: **Built + functional**
- `/deck`: **Built + functional**
- `/reflection`: **Built + functional**
- `/culture`: **Placeholder (planned, not yet built)**
- `/growth` (Life Navigation): **Placeholder (planned, not yet built)**

