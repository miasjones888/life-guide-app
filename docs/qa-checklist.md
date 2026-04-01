# QA Checklist — Field Guide to Yourself

**App:** Field Guide to Yourself (mobile-first personal life guide PWA)
**User:** Mia
**Phase:** 1 (Today View, Morning/Evening Routines, Guide Index, PWA foundation)
**Last Updated:** 2026-03-31
**Status:** Ready for QA

---

## How to Use This Checklist

This checklist is designed for manual QA testing of Phase 1, Phase 2, and Phase 3 features. Each item is binary: **PASS** or **FAIL**.

### Testing Environment Setup

- **Primary Device:** iPhone 12 (or equivalent iOS 16+, Safari 16+)
- **Secondary Device (optional):** Chrome on desktop with DevTools mobile simulation (375px viewport)
- **Network Condition:** Test both online and offline (DevTools Network tab: offline, or Settings > Airplane Mode on iOS)
- **Browser Cache:** Clear before each test run (Settings > Safari > Advanced > Website Data > Remove All)
- **Private/Incognito Mode:** Test localStorage degradation on at least one session
- **Testing URL:** Production Vercel deployment (or staging if applicable)

### Checkbox Legend

- `[ ]` — Not tested
- `[x]` — Pass
- `[ ]` (with comment) — Fail + remediation required

---

## Phase 1 QA Checklist

### Build Verification

- [ ] TypeScript compiles without errors (`pnpm build` succeeds)
- [ ] No console errors on app load (check DevTools Console on both Safari and Chrome)
- [ ] No console warnings related to Next.js, Tailwind, or Framer Motion
- [ ] No hydration mismatches (React errors in Console)
- [ ] Static export builds successfully or standard Next.js build serves correctly
- [ ] Lighthouse Performance score ≥ 85 (mobile)
- [ ] Lighthouse PWA score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse Best Practices score ≥ 90
- [ ] First Contentful Paint (FCP) < 1.2s (on 4G simulation)
- [ ] Largest Contentful Paint (LCP) < 1.5s
- [ ] Time to Interactive (TTI) < 2.0s

### Today View — Layout & Content

- [ ] Current date renders correctly (e.g., "31 Mar 2026")
- [ ] Day of week renders correctly (e.g., "Tuesday")
- [ ] Current time updates in real-time (or renders on initial load)
- [ ] Active block computes correctly based on current time (Morning, Afternoon, Evening)
- [ ] Morning Routine heading visible and prominent
- [ ] Evening Routine heading visible and prominent
- [ ] Anchor Task input field is visible and positioned correctly
- [ ] Safe area is respected on notched iPhones (no content under status bar or home indicator)
- [ ] Layout adapts correctly at 375px viewport width (iPhone SE)
- [ ] Layout adapts correctly at 430px viewport width (iPhone 15 Pro Max)
- [ ] Portrait orientation enforced (app does not rotate on iOS)
- [ ] No horizontal scrolling at any viewport width

### Today View — Morning Checklist

- [ ] Morning checklist renders when active block is "Morning"
- [ ] Morning checklist contains exactly 6 items in this order:
  1. Coffee
  2. Morning pages
  3. Meditation
  4. Reading
  5. Skincare
  6. Cat meds
- [ ] All 6 items are checkboxes (tap-to-toggle)
- [ ] Checking a box toggles visual state (strikethrough or opacity change)
- [ ] Unchecking a box toggles back
- [ ] Emoji render correctly on iOS Safari (no mojibake, no blank boxes)
- [ ] Checklist state resets on new calendar day (clear localStorage time-based state or refresh at midnight)
- [ ] Checklist state persists within same day (refresh page, boxes remain checked)
- [ ] "Morning Routine" link navigates to Morning Routine section

### Today View — Evening Checklist

- [ ] Evening checklist renders when active block is "Evening"
- [ ] Evening checklist contains exactly 6 items in this order:
  1. Cat meds
  2. Bedtime meds
  3. Skincare
  4. Anchor task
  5. Reading
  6. Lights out
- [ ] All 6 items are checkboxes (tap-to-toggle)
- [ ] Checking a box toggles visual state
- [ ] Unchecking a box toggles back
- [ ] Emoji render correctly
- [ ] Checklist state resets on new calendar day
- [ ] Checklist state persists within same day
- [ ] "Evening Routine" link navigates to Evening Routine section

### Today View — Anchor Task

- [ ] Anchor Task input field is visible and focusable
- [ ] Placeholder text is present and descriptive
- [ ] User can type text and it appears in the field
- [ ] Anchor task text persists in localStorage across page refresh
- [ ] Anchor task text persists across browser close/reopen (if not in private mode)
- [ ] Anchor task state loads immediately on app open (no flicker or delay)
- [ ] Text input does not trigger keyboard to close unexpectedly

### Bottom Navigation

- [ ] 4 tabs visible: Today, Guide, Week, More
- [ ] All 4 tabs are tap-targets ≥ 44×44px
- [ ] Active tab has visual indicator (color, underline, or highlight)
- [ ] Inactive tabs are visually distinct
- [ ] Tapping "Today" navigates to Today view
- [ ] Tapping "Guide" navigates to Guide index
- [ ] Tapping "Week" navigates to Weekly rhythm view
- [ ] Tapping "More" navigates to More/Settings view
- [ ] Tab transitions are smooth (no flicker, Framer Motion easing applied)
- [ ] Safe area is respected at bottom (tab bar does not overlap home indicator)

### Morning Routine Section

- [ ] Morning Routine section is accessible from Guide > Morning Routine
- [ ] Section heading: "Morning Routine"
- [ ] Introductory text present and visible
- [ ] Both "Minimum" and "Full" versions are present as tabs or toggles
- [ ] **Minimum version contains exactly these steps (in order):**
  - Protected time. No calls, no notifications, no obligations.
  - Coffee
  - Journal
  - Read
  - Plan
  - Ground
  - (Verbatim check: "Protected time. No calls, no notifications, no obligations." appears exactly)
- [ ] **Full version contains exactly these steps (in order):**
  - Protected time. No calls, no notifications, no obligations.
  - Coffee
  - Morning pages
  - Meditation
  - Reading
  - Skincare
  - Cat meds
  - Eat something
  - Ground
- [ ] Each step is its own line or distinct element
- [ ] All emoji render correctly
- [ ] Switching between Minimum and Full versions is instant (no delay)
- [ ] Tap-to-check works on both versions
- [ ] State persists when toggling between versions (checked items stay checked)

### Evening Routine Section

- [ ] Evening Routine section is accessible from Guide > Evening Routine
- [ ] Section heading: "Evening Routine"
- [ ] All steps present in correct order:
  - Cat meds at 9pm
  - Bedtime meds at 9:30pm
  - Skincare
  - Anchor task
  - Reading
  - Lights out at 11pm
- [ ] Time labels (9pm, 9:30pm, 11pm) are visible and formatted consistently
- [ ] Tap-to-check works on all steps
- [ ] All emoji render correctly
- [ ] Step text matches source material exactly (verbatim check)
- [ ] State resets on new calendar day
- [ ] State persists within same day

### PWA — Installation & Manifest

- [ ] `manifest.json` is valid JSON (check at /public/manifest.json)
- [ ] Manifest contains `"name": "Field Guide to Yourself"`
- [ ] Manifest contains `"short_name": "Field Guide"` or similar (≤12 characters)
- [ ] Manifest contains `"display": "standalone"`
- [ ] Manifest contains `"orientation": "portrait"`
- [ ] Manifest contains `"start_url": "/"`
- [ ] Manifest contains valid `"theme_color"` (hex format)
- [ ] Manifest contains valid `"background_color"` (hex format)
- [ ] Manifest contains `"icons"` array with at least 3 sizes (192px, 384px, 512px)
- [ ] All icon files exist and are valid PNG/WebP
- [ ] Icon files are in /public directory

### PWA — Installation on iOS

- [ ] On iPhone 12 (iOS 16+), Safari shows "Share" button (not "Add to Home Screen" — iOS uses Share instead)
- [ ] Tapping Share > "Add to Home Screen" adds app to home screen
- [ ] App icon appears on home screen with correct name
- [ ] App icon is the correct image (matches manifest icons)
- [ ] Tapping home screen icon launches app in standalone mode (no Safari UI visible)
- [ ] App opens to Today view on launch
- [ ] App has its own app switcher entry (not Safari)

### PWA — Offline Functionality

- [ ] Activate offline mode (DevTools Network: offline, or iOS Airplane Mode)
- [ ] Today view loads and displays cached content (date, current block, checklists)
- [ ] Guide index page loads
- [ ] Morning Routine section loads
- [ ] Evening Routine section loads
- [ ] All cached pages are interactive (tapping links still works)
- [ ] Service worker is registered (check DevTools Application > Service Workers)
- [ ] Service worker shows status "activated and running"
- [ ] App does not crash or show blank screen in offline mode
- [ ] Returning online restores fresh content when page is refreshed

### Service Worker

- [ ] Service worker file is generated and served (check DevTools Network for service-worker.js)
- [ ] Service worker registration appears in DevTools Console (no registration errors)
- [ ] Cached assets are listed in DevTools Application > Cache Storage
- [ ] Cache contains HTML, CSS, JS, and font files
- [ ] Cache versioning works (old caches are cleaned up on app update)

### Typography & Fonts

- [ ] JetBrains Mono font loads and renders for headings and labels
- [ ] Inter font loads and renders for body text
- [ ] No serif fonts appear anywhere in the app (Courier, Georgia, Times, etc.)
- [ ] No system fonts override intended fonts
- [ ] Font files are loaded from next/font (not @import or external CDN)
- [ ] Font sizes are readable at 375px viewport (minimum 16px for body)
- [ ] Font weights are correct (headings bold, body regular)
- [ ] Line height is adequate (≥1.5 for body text)
- [ ] Letter spacing is consistent and not excessive

### Accessibility — Focus & Interaction

- [ ] All interactive elements (buttons, links, inputs) have visible focus rings
- [ ] Focus ring color has sufficient contrast against background
- [ ] Focus rings are at least 3px wide
- [ ] Keyboard Tab key cycles through focusable elements in logical order
- [ ] Touch targets are all ≥ 44×44px (buttons, links, checkboxes, tabs)
- [ ] No invisible or overlapping touch targets
- [ ] Disabled elements are visually distinct (opacity or color change)

### Accessibility — Semantic HTML & Labels

- [ ] All headings use correct semantic tags (`<h1>`, `<h2>`, `<h3>` — not `<div class="heading">`)
- [ ] Headings are in correct hierarchical order (no skipped levels like h1 → h3)
- [ ] Form inputs have associated labels (`<label for="...">` or `aria-label`)
- [ ] Anchor Task input field has a label or aria-label
- [ ] All buttons have descriptive text or aria-label
- [ ] Links have descriptive text (not "click here" or "read more")

### Accessibility — Screen Reader

- [ ] VoiceOver (iOS) reads page structure correctly
- [ ] VoiceOver announces current date and day of week
- [ ] VoiceOver announces "Morning Routine" or "Evening Routine" checklist items
- [ ] VoiceOver announces checkbox states (checked/unchecked)
- [ ] VoiceOver announces tab names and current active tab
- [ ] VoiceOver reads input field labels (Anchor Task)
- [ ] No screen reader gets stuck or skips important content

### Accessibility — Color & Contrast

- [ ] Body text color contrast ≥ 7:1 (dark text on light background or vice versa)
- [ ] Secondary text (labels, hints) contrast ≥ 4.5:1
- [ ] Link text contrast ≥ 4.5:1 (and links are underlined or otherwise distinguished from regular text)
- [ ] Focus ring color contrast ≥ 3:1 against background
- [ ] Color is not the only means of conveying information (e.g., errors use both color and text)
- [ ] No pure white (#FFFFFF) or pure black (#000000) used (see Cross-Cutting Checks below)

### Accessibility — Images & Emoji

- [ ] All emoji have aria-labels (e.g., `<span aria-label="coffee cup">☕</span>`)
- [ ] Decorative emoji (if any) have `aria-hidden="true"`
- [ ] No images without alt text (if images are present in Phase 1)
- [ ] Emoji render consistently across iOS Safari and Chrome

### Performance — Bundle Sizes

- [ ] JavaScript bundle < 150kb gzipped (check Vercel Analytics or local build output)
- [ ] CSS bundle < 20kb
- [ ] Total initial page size < 200kb (HTML + CSS + JS gzipped combined)
- [ ] Fonts are optimized (system fonts or next/font with preload)
- [ ] No unused CSS in Tailwind output (Tailwind purge is configured)
- [ ] Framer Motion bundle is < 50kb gzipped

### Performance — Load Times

- [ ] First Contentful Paint (FCP) < 1.2s on 4G (DevTools Lighthouse simulation)
- [ ] Largest Contentful Paint (LCP) < 1.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1 (no jank or unexpected layout shifts)
- [ ] Time to Interactive (TTI) < 2.0s
- [ ] Offline load (from cache) < 0.5s

### Content Fidelity — Verbatim Phrases

- [ ] "Protected time. No calls, no notifications, no obligations." appears exactly in Morning Routine
- [ ] "On a hard day: just those two. Done." appears somewhere in the app (Morning Routine or note)
- [ ] "You don't have to cook. You just have to eat something." appears in Evening Routine or notes
- [ ] "body + spirituality + feedstock in one block." appears in relevant section
- [ ] "Non-negotiable on whether, flexible on which." appears in relevant section
- [ ] "That is the whole task. Nothing else is required." appears in relevant section
- [ ] "Everything for today is written down." appears in Today view or relevant section

### Content Fidelity — Cat Care

- [ ] Maisie is listed with "(Prozac, female)"
- [ ] Meeko is listed with medication notes "(meds twice daily, female)"
- [ ] Third cat is mentioned (name TBD or filled in as applicable)
- [ ] Morning meds at 9am mentioned in Morning Routine
- [ ] Evening meds at 9pm and 9:30pm mentioned in Evening Routine
- [ ] Cat meds are in checklist items

### Content Fidelity — Routines

- [ ] Morning Routine section lists all steps in correct order
- [ ] Evening Routine section lists all steps in correct order
- [ ] Step text matches Life Guide source exactly (no typos, no omissions)
- [ ] No extra or invented steps in routines

### Content Fidelity — Weekly Rhythm

- [ ] Weekly view shows all 7 days of the week
- [ ] Each day has a focus theme assigned (e.g., Monday = Check-in)
- [ ] Focus themes are consistent with Life Guide
- [ ] No missing days or null values

### Content Fidelity — Finance

- [ ] Petal card mentioned
- [ ] Capital One mentioned
- [ ] Credit card payment reminder present
- [ ] Subscriptions review mentioned
- [ ] Gap gift cards mentioned

### Content Fidelity — Outside Time

- [ ] Hiking mentioned as outside activity
- [ ] Paddleboarding mentioned
- [ ] Birdwatching mentioned
- [ ] Long walk mentioned
- [ ] Merlin app mentioned for bird identification

---

## Phase 2 QA Checklist

### Guide Sections — Presence & Navigation

- [ ] All 10 guide sections render: Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System
- [ ] Each section has a heading and introductory text
- [ ] Navigation between sections works (tapping section links)
- [ ] Back navigation returns to Guide index
- [ ] Guide index lists all 10 sections with brief descriptions

### Cat Care Section

- [ ] Cat Care section heading is prominent
- [ ] All three cat names are listed
- [ ] Maisie profile includes: "(Prozac, female)" and relevant care notes
- [ ] Meeko profile includes: "(meds twice daily, female)" and relevant care notes
- [ ] Third cat profile is complete and accurate
- [ ] Medication schedule is clear: morning meds 9am, evening meds 9pm
- [ ] Special care instructions are present (if any)
- [ ] Appointment reminders or health notes are visible (if applicable)

### Weekly Rhythm Section

- [ ] Weekly Rhythm view displays all 7 days
- [ ] Each day shows the correct focus theme:
  - Monday: Check-in (or applicable theme)
  - Tuesday: (correct theme)
  - Wednesday: (correct theme)
  - Thursday: (correct theme)
  - Friday: (correct theme)
  - Saturday: (correct theme)
  - Sunday: (correct theme)
- [ ] Days are displayed in calendar order (Monday–Sunday or Sunday–Saturday, consistent)
- [ ] Theme names are clear and match Life Guide
- [ ] Visual hierarchy makes each day distinct

### Finance Section

- [ ] Finance section heading present
- [ ] Petal card mentioned with relevant info
- [ ] Capital One card mentioned with relevant info
- [ ] Credit card payment reminder is prominent
- [ ] Monthly subscriptions review checklist is present
- [ ] Gap gift cards are mentioned
- [ ] Finance checklist is interactive (tap-to-check items)
- [ ] Finance checklist state persists (localStorage)

### Deep Focus / Projects Section

- [ ] Projects or Deep Focus section is labeled clearly
- [ ] Project cards are visible and distinct
- [ ] Each project has a title, description, and status
- [ ] Project status is clear (active, paused, archived, etc.)
- [ ] Projects match Mia's actual work (from Life Guide source)
- [ ] No placeholder or dummy projects visible

### Reflection / NotepadPanel

- [ ] Reflection or Notepad panel is accessible (button or toggle)
- [ ] Input field for reflection notes is visible
- [ ] User can type and save notes
- [ ] Notes persist in localStorage across page refreshes
- [ ] Notes persist across browser close/reopen
- [ ] Notes do not appear in private/incognito mode (expected behavior)
- [ ] Character count or word count is shown (optional but nice-to-have)
- [ ] Notes can be cleared or deleted (confirmation dialog present)

### Content Accuracy — All Sections

- [ ] All section content matches Life Guide source material exactly
- [ ] No typos or spelling errors in any section
- [ ] All verifiable facts are correct (names, dates, numbers)
- [ ] Verbatim phrases appear exactly as written in Life Guide
- [ ] No sections are empty or contain placeholder text
- [ ] Section order matches intended structure

---

## Phase 3 QA Checklist

### Animations & Transitions

- [ ] Page transitions use Framer Motion with smooth easing
- [ ] Checklist item animations (check/uncheck) feel responsive
- [ ] Tab switches animate smoothly (no jarring jumps)
- [ ] Scroll animations (if present) do not create jank
- [ ] Focus ring animations (if present) are smooth
- [ ] Animation duration is ≤ 300ms for quick interactions, ≤ 600ms for longer transitions
- [ ] All animations respect `prefers-reduced-motion` (OS-level setting)

### Reduced Motion

- [ ] When `prefers-reduced-motion: reduce` is set, all animations are disabled
- [ ] Layout remains correct with animations disabled
- [ ] No functionality is lost with animations off
- [ ] Page still feels responsive (no delays)

### Desktop Layout

- [ ] At 768px+ viewport width, layout adapts to wider screens
- [ ] Content is centered with max-width (not stretched to screen edge)
- [ ] Navigation layout is appropriate for desktop (horizontal nav or expanded sidebar)
- [ ] Touch targets remain ≥ 44×44px or are suitably spaced for mouse
- [ ] Font sizes are appropriate for distance viewing
- [ ] No horizontal scrolling at desktop widths

### Color Contrast — Comprehensive Audit

- [ ] Background color: check contrast with all text colors
- [ ] Link color: check contrast with background
- [ ] Focus ring color: check contrast with background
- [ ] Button states (active, hover, disabled): check contrast for all states
- [ ] Error messages (if any): check text and background contrast
- [ ] Use WebAIM Contrast Checker or similar tool for precise measurements

### Open Graph & Metadata

- [ ] Open Graph tags present in `<head>`
- [ ] `og:title` is set to "Field Guide to Yourself"
- [ ] `og:description` is descriptive (10–160 characters)
- [ ] `og:image` is set to a valid image URL (≥1200x630px recommended)
- [ ] `og:url` is set to production domain
- [ ] `og:type` is "website"
- [ ] Meta description tag is present and descriptive

---

## Cross-Cutting Checks (All Phases)

### Color Usage

- [ ] No pure white (#FFFFFF) is used as background or text (use off-white or very light gray instead)
- [ ] No pure black (#000000) is used as text or primary background (use very dark gray instead)
- [ ] Color palette is consistent across all sections
- [ ] No conflicting or jarring color combinations

### Typography

- [ ] No serif fonts appear anywhere (not even in fallback chains)
- [ ] All text uses either JetBrains Mono or Inter
- [ ] Font stack in Tailwind config does not include serif fonts
- [ ] Web fonts are loaded successfully (check Network tab for font file requests)

### Layout & Spacing

- [ ] No rounded corners > 2px on Window Panels (if Window Panels are used)
- [ ] Padding and margins are consistent (multiples of 4px or 0.25rem)
- [ ] Safe area is respected on all notched iPhones (status bar, home indicator)
- [ ] Content never overlaps UI chrome

### Emoji

- [ ] All emoji render correctly on iOS Safari (no mojibake or blank boxes)
- [ ] Emoji render consistently on Chrome and other browsers
- [ ] Emoji have aria-labels where semantically important
- [ ] Decorative emoji have `aria-hidden="true"`
- [ ] No color or variation selectors are breaking emoji rendering

### localStorage & Private Mode

- [ ] App works in private/incognito mode without crashing
- [ ] localStorage is accessed safely (wrapped in try/catch)
- [ ] In private mode, data is session-only (clears on browser close)
- [ ] No console errors or warnings related to localStorage in private mode
- [ ] App gracefully falls back to in-memory state if localStorage is unavailable

### General Stability

- [ ] App does not crash on initial load
- [ ] App does not crash when navigating between sections
- [ ] App does not crash when rapidly tapping buttons
- [ ] App does not crash when toggling checklist items rapidly
- [ ] App does not crash when opening/closing NotepadPanel
- [ ] No infinite loops or memory leaks (check DevTools Performance tab)

---

## Sign-Off

**QA Lead:** ________________
**Date:** ________________
**Overall Status:** [ ] PASS [ ] FAIL [ ] NEEDS REMEDIATION

**Critical Issues Found:**
```
(List any showstopper bugs that block release)
```

**Known Issues (acceptable to ship):**
```
(List known issues that can be addressed in Phase 2 or later)
```

**Recommendations:**
```
(Any process improvements or testing suggestions)
```

---

**End of QA Checklist**
