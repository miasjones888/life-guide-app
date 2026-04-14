# Acceptance Criteria — Field Guide to Yourself

**App:** Field Guide to Yourself (mobile-first personal life guide PWA)
**User:** Mia
**Phase:** 1, 2, 3 (progressive phases)
**Last Updated:** 2026-03-31

---

## How to Use These Acceptance Criteria

Each feature has a set of numbered, testable, binary acceptance criteria. A feature is **COMPLETE** when all criteria marked as **REQUIRED** (no phase indicator) or for the relevant phase (Phase 1, 2, 3) are met with a PASS result.

**Criteria Format:** Most criteria follow a "Given/When/Then" structure or direct testable statement.

**Binary Result:** Each criterion is either PASS or FAIL. There is no partial credit. If a criterion says "must render," the element either renders or it doesn't.

**Phase-Tagged Criteria:** Criteria without a phase tag apply to all phases. Criteria with `[Phase 1]`, `[Phase 2]`, or `[Phase 3]` apply only to that phase.

---

## Feature: Today View

**Description:** The primary screen showing the current date, active block (Morning/Afternoon/Evening), and context-specific checklists and input fields.

**Status:** REQUIRED for Phase 1

### Acceptance Criteria

1. When the app loads, the current date is displayed in the format "31 Mar 2026" (DD Mon YYYY).
2. When the app loads, the day of the week is displayed (e.g., "Tuesday").
3. The date and day of week are computed dynamically based on the device's current time and update on calendar day rollover (midnight).
4. When the active block is "Morning," the title "Morning Routine" is displayed prominently.
5. When the active block is "Evening," the title "Evening Routine" is displayed prominently.
6. When the active block is "Morning," the morning checklist is visible with all 6 items in order: Coffee, Morning pages, Meditation, Reading, Skincare, Cat meds.
7. When the active block is "Evening," the evening checklist is visible with all 6 items in order: Cat meds, Bedtime meds, Skincare, Anchor task, Reading, Lights out.
8. The active block is computed based on current time: "Morning" (00:00–11:59), "Afternoon" (12:00–17:59), "Evening" (18:00–23:59).
9. Each checklist item is a interactive checkbox that toggles between checked (✓) and unchecked (☐) states on tap.
10. Checking or unchecking a box produces immediate visual feedback (strikethrough, opacity change, or highlight).
11. The Anchor Task input field is visible and labeled or otherwise descriptive.
12. The Anchor Task input field accepts text input and displays the typed text.
13. The Anchor Task text persists in localStorage and is restored on page reload within the same calendar day.
14. The Anchor Task text persists across browser close/reopen (unless in private/incognito mode).
15. All checklist items reset to unchecked state on the next calendar day (midnight rollover).
16. The Morning Routine link navigates to the Morning Routine detail section.
17. The Evening Routine link navigates to the Evening Routine detail section.
18. The layout respects safe areas on notched iPhones (status bar, home indicator) and is fully visible without scrolling at 375px viewport.
19. No horizontal scrolling occurs at any viewport width (375px–430px).
20. The UI does not flicker or flash when toggling checklists or input.

---

## Feature: Morning Routine Section

**Description:** A detailed view of the morning routine with both "Minimum" and "Full" versions.

**Status:** REQUIRED for Phase 1

### Acceptance Criteria

1. The Morning Routine section is accessible via navigation (Guide > Morning Routine or direct link).
2. The section displays a heading "Morning Routine."
3. Both "Minimum" and "Full" version toggles or tabs are visible and clearly labeled.
4. The **Minimum version contains exactly these 6 steps in order:**
   - Protected time. No calls, no notifications, no obligations.
   - Coffee
   - Journal
   - Read
   - Plan
   - Ground
5. The text "Protected time. No calls, no notifications, no obligations." appears exactly as written (verbatim check).
6. The **Full version contains exactly these 8 steps in order:**
   - Protected time. No calls, no notifications, no obligations.
   - Coffee
   - Morning pages
   - Meditation
   - Reading
   - Skincare
   - Cat meds
   - Eat something
7. The text "Eat something" is the last step in the Full version.
8. Toggling between Minimum and Full versions is instantaneous (no loading delay).
9. Checklist state is preserved when toggling between versions (checked items remain checked).
10. All steps in both versions are tap-to-check items (checkboxes or toggle elements).

---

## Feature: Evening Routine Section

**Description:** A detailed view of the evening routine with all steps, times, and medications.

**Status:** REQUIRED for Phase 1

### Acceptance Criteria

1. The Evening Routine section is accessible via navigation (Guide > Evening Routine or direct link).
2. The section displays a heading "Evening Routine."
3. The evening routine contains exactly these 6 steps in order:
   - Cat meds (at 9pm)
   - Bedtime meds (at 9:30pm)
   - Skincare
   - Anchor task
   - Reading
   - Lights out (at 11pm)
4. Time labels (9pm, 9:30pm, 11pm) are present and formatted consistently (e.g., "9:00pm" or "9pm").
5. All 6 steps are tap-to-check items (checkboxes or toggle elements).
6. Checking/unchecking a box produces immediate visual feedback.
7. All steps are displayed in the correct order with no omissions.
8. The text matches the source material exactly (no typos or variations).
9. Step text is readable and appropriately sized for mobile (≥16px).
10. The section is fully navigable and does not require horizontal scrolling.

---

## Feature: Guide Navigation

**Description:** Main index and navigation between the 10 guide sections (Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System).

**Status:** REQUIRED for Phase 1 (index only); Phase 2 (full content)

### Acceptance Criteria

1. [Phase 1] The Guide index displays a heading "Guide" or "Field Guide."
2. [Phase 1] All 10 section titles are listed: Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System.
3. [Phase 1] Each section title is a navigable link or button.
4. [Phase 1] Tapping a section title navigates to that section's detail page.
5. [Phase 2] Each of the 10 sections contains content specific to that section (not placeholder text).
6. [Phase 2] All section content is accurate and matches the Life Guide source material.
7. Back navigation from a section returns to the Guide index.
8. Back navigation works correctly (browser back button or app back gesture).

---

## Feature: Bottom Navigation

**Description:** 4-tab navigation bar (Today, Guide, Week, More) present at the bottom of all main screens.

**Status:** REQUIRED for Phase 1

### Acceptance Criteria

1. The bottom navigation bar is present on all main screens (Today, Guide, Week, More).
2. All 4 tabs are labeled: Today, Guide, Week, More.
3. All 4 tabs are interactive buttons with tap targets ≥ 44×44px.
4. Tapping the "Today" tab navigates to and displays the Today view.
5. Tapping the "Guide" tab navigates to and displays the Guide index.
6. Tapping the "Week" tab navigates to and displays the Weekly Rhythm view.
7. Tapping the "More" tab navigates to and displays the More/Settings view.
8. The active tab is visually indicated (color, underline, highlight, or icon change).
9. Inactive tabs are visually distinct from the active tab.
10. Safe area is respected at the bottom of the screen (navigation bar does not overlap the home indicator on notched iPhones).

---

## Feature: PWA Installation and Offline

**Description:** PWA manifest, service worker, offline caching, and home screen installation on iOS.

**Status:** REQUIRED for Phase 1

### Acceptance Criteria

1. A valid `manifest.json` file exists at `/public/manifest.json`.
2. The manifest contains `"name": "Field Guide to Yourself"`.
3. The manifest contains `"short_name"` with ≤ 12 characters (e.g., "Field Guide").
4. The manifest contains `"display": "standalone"`.
5. The manifest contains `"orientation": "portrait"`.
6. The manifest contains `"start_url": "/"`.
7. The manifest contains `"theme_color"` (valid hex color).
8. The manifest contains `"background_color"` (valid hex color).
9. The manifest contains an `"icons"` array with at least 3 icon entries (192px, 384px, 512px).
10. All icon files referenced in the manifest exist and are valid PNG or WebP format.
11. On iPhone 12+ (iOS 16+), the Share menu includes an "Add to Home Screen" option.
12. Tapping "Add to Home Screen" adds the app to the home screen with the correct name and icon.
13. Tapping the home screen icon launches the app in standalone mode (Safari chrome is not visible).
14. The app opens directly to the Today view on launch.
15. The app has its own entry in the iOS app switcher (separate from Safari).
16. A valid service worker is registered (check DevTools Application > Service Workers or PWA install status).
17. The service worker shows status "activated and running" in DevTools.
18. [Phase 1] The Today view, Guide index, Morning Routine, and Evening Routine pages load when offline (network disabled).
19. [Phase 1] Offline pages are interactive (checkboxes work, links navigate to other cached pages).
20. [Phase 1] All resources required for cached pages load from cache (no network requests fail visibly).

---

## Feature: Content Fidelity — All 10 Sections

**Description:** Accuracy and completeness of content across all 10 guide sections and related areas.

**Status:** REQUIRED for all phases (verified progressively: Phase 1 = Routines; Phase 2 = all 10)

### Acceptance Criteria

1. The Morning Routine section contains exactly the steps listed in the acceptance criteria for "Morning Routine Section."
2. The Evening Routine section contains exactly the steps listed in the acceptance criteria for "Evening Routine Section."
3. The exact phrase "Protected time. No calls, no notifications, no obligations." appears verbatim in the Morning Routine section.
4. The exact phrase "On a hard day: just those two. Done." appears verbatim somewhere in the app (Morning or Evening Routine, notes, or context).
5. The exact phrase "You don't have to cook. You just have to eat something." appears verbatim in the Evening Routine section.
6. The exact phrase "body + spirituality + feedstock in one block." appears verbatim in a relevant section (Care, Health, or Routines).
7. The exact phrase "Non-negotiable on whether, flexible on which." appears verbatim in a relevant section (Focus, Rhythm, or Routines).
8. The exact phrase "That is the whole task. Nothing else is required." appears verbatim in a relevant section (or as a note/context).
9. The exact phrase "Everything for today is written down." appears verbatim in the Today view or a relevant section.
10. [Phase 2] All 10 section titles are present and accurate: Routines, Rhythm, Focus, Care, Body, Home, Finance, Field, Health, System.
11. [Phase 2] No section contains placeholder text or "TODO" markers.
12. [Phase 2] All content is readable and appropriately formatted (correct font sizes, spacing, hierarchy).
13. [Phase 2] No sections have spelling or grammar errors.
14. [Phase 2] All facts and figures are accurate (e.g., cat names, times, financial amounts if present).
15. [Phase 2] All names, places, and proper nouns are spelled correctly.

---

## Feature: Cat Care Section

**Description:** Information about Maisie, Meeko, and the third cat, including medication schedules and care instructions.

**Status:** REQUIRED for Phase 2

### Acceptance Criteria

1. A Cat Care section or area is present and accessible in the app.
2. Maisie is listed with the designation "(Prozac, female)."
3. Meeko is listed with the designation "(meds twice daily, female)."
4. A third cat is mentioned with a name (or "TBD" if not yet determined) and relevant details.
5. Morning medication time is specified as 9:00am (or "9am").
6. Evening medication time is specified as 9:00pm (or "9pm").
7. Bedtime medication time is specified as 9:30pm.
8. All three cats are mentioned in the context of the morning or evening routine checklists.
9. The cat care information does not contain errors or inconsistencies.
10. Cat medication instructions are clear and unambiguous.
11. Special care notes (allergies, dietary restrictions, etc., if applicable) are present and accurate.
12. The section is fully readable and does not require special scrolling or interaction to access cat information.

---

## Feature: Weekly Rhythm View

**Description:** The week view displaying all 7 days with assigned focus themes.

**Status:** REQUIRED for Phase 2

### Acceptance Criteria

1. A Weekly Rhythm view or Week view is accessible via the "Week" tab in bottom navigation.
2. The view displays all 7 days of the week.
3. Each day is labeled with the day name (Monday, Tuesday, etc.).
4. Each day has an assigned focus theme (e.g., Check-in, Creative, Strategic, etc.).
5. All 7 days have focus themes assigned (no missing or null values).
6. Focus themes are consistent with the Life Guide source material.
7. Days are displayed in calendar order (Monday–Sunday or Sunday–Saturday, consistently).
8. The layout is responsive and does not require horizontal scrolling at 375px–430px viewport.
9. Each day's theme is clearly visible and readable (≥16px font or adequate contrast).
10. The current day (if today is within the week shown) is visually distinguished (highlight, bold, or color).

---

## Feature: Finance Section

**Description:** Finance tracking, payment reminders, and subscriptions management.

**Status:** REQUIRED for Phase 2

### Acceptance Criteria

1. A Finance section is accessible in the Guide or main navigation.
2. The Petal card is mentioned with relevant information (name, status, last used, or balance if applicable).
3. The Capital One card is mentioned with relevant information.
4. A credit card payment reminder is prominently displayed (day of month, amount, or due date).
5. A subscriptions review checklist or reminder is present (e.g., monthly subscriptions to audit).
6. Gap gift cards are mentioned with relevant context (balance, notes, or intended use).
7. Finance items are presented in a clear, organized format (checklist, table, or list).
8. All finance information is accurate and matches the source material.
9. If finance items are checkboxes or interactive, they toggle and can be marked complete.
10. The section clearly indicates what is required (e.g., "Pay credit card by the 15th of each month").

---

## Feature: Deep Focus / Projects Section

**Description:** Project management and deep focus tracking.

**Status:** REQUIRED for Phase 2

### Acceptance Criteria

1. [Phase 2] A Projects or Deep Focus section is accessible in the Guide or main navigation.
2. [Phase 2] Project cards or project list items are visible and distinct from each other.
3. [Phase 2] Each project has a title, description, and current status.
4. [Phase 2] Project status is clearly indicated (active, paused, archived, completed, or similar).
5. [Phase 2] All projects match Mia's actual work (no dummy or placeholder projects).
6. [Phase 2] Project information is accurate and matches the Life Guide source.
7. [Phase 3] Projects can be marked as complete or updated (if interactive features are added).
8. [Phase 3] Project updates persist across page reloads (localStorage or similar).

---

## Feature: Reflection / NotepadPanel

**Description:** Persistent notes and reflection capture.

**Status:** REQUIRED for Phase 2

### Acceptance Criteria

1. [Phase 2] A Reflection or Notepad panel is accessible (button, toggle, or dedicated view).
2. [Phase 2] An input field for writing notes is visible and focusable.
3. [Phase 2] Users can type and edit notes in the field.
4. [Phase 2] Notes are saved and persist in localStorage.
5. [Phase 2] Notes are restored on page reload (within the same browser session).
6. [Phase 2] Notes persist across browser close/reopen (unless in private/incognito mode).
7. [Phase 2] Notes do NOT persist in private/incognito mode (expected behavior).
8. [Phase 2] Users can clear or delete notes (confirmation dialog present before deletion).
9. [Phase 2] Character count or word count is displayed (optional but nice-to-have).
10. [Phase 2] The notepad does not interfere with other app functionality when open.

---

## Feature: Animations & Transitions

**Description:** Smooth, intentional animations and transitions using Framer Motion.

**Status:** REQUIRED for Phase 3

### Acceptance Criteria

1. [Phase 3] Page transitions (e.g., Today → Guide) use smooth Framer Motion animations.
2. [Phase 3] Checklist item animations (checking/unchecking) feel responsive and snappy (≤300ms).
3. [Phase 3] Tab switches in bottom navigation animate smoothly without jarring jumps.
4. [Phase 3] Any scroll-triggered animations perform without causing jank (60fps or near-60fps).
5. [Phase 3] Focus ring animations (if present) are smooth and not distracting.
6. [Phase 3] Animation durations are appropriate: quick interactions ≤300ms, longer transitions ≤600ms.
7. [Phase 3] When `prefers-reduced-motion: reduce` is set at OS level, all animations are disabled.
8. [Phase 3] App remains fully functional and responsive with animations disabled.

---

## Feature: Accessibility

**Description:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support, color contrast, and touch target sizing.

**Status:** REQUIRED for all phases

### Acceptance Criteria

1. All interactive elements (buttons, links, inputs, checkboxes, tabs) have visible focus rings.
2. Focus rings are visible when using keyboard Tab navigation.
3. Focus ring color has sufficient contrast (≥3:1) against the background color.
4. Keyboard Tab key cycles through all focusable elements in a logical, left-to-right, top-to-bottom order.
5. All touch targets are ≥ 44×44px in size.
6. No two touch targets overlap or are so closely spaced that they are difficult to tap.
7. All form inputs (including Anchor Task field) have associated labels or aria-label attributes.
8. All buttons have descriptive text or aria-label (not generic "click here").
9. All links have descriptive text (not generic "read more").
10. All headings use semantic HTML tags (`<h1>`, `<h2>`, `<h3>`) in correct hierarchical order.
11. No heading hierarchy is skipped (e.g., h1 → h2 → h3, never h1 → h3).
12. All emoji with semantic meaning have aria-label attributes (e.g., `<span aria-label="coffee cup">☕</span>`).
13. Decorative emoji have `aria-hidden="true"` or equivalent.
14. Body text color contrast is ≥7:1 (dark text on light background or vice versa).
15. Secondary text (labels, hints) color contrast is ≥4.5:1.
16. Link text color contrast is ≥4.5:1, and links are underlined or otherwise visually distinct from body text.
17. iOS VoiceOver (screen reader) announces all content in a logical order.
18. VoiceOver announces current date, active block, and checklist item states correctly.
19. VoiceOver does not get stuck or skip important content.
20. No `aria-label` text is cut off or truncated (verify by testing with VoiceOver).

---

## Feature: Performance

**Description:** Load times, bundle sizes, Lighthouse scores, and user-perceived performance.

**Status:** REQUIRED for Phase 1+

### Acceptance Criteria

1. [Phase 1] Lighthouse Performance score on mobile is ≥ 85.
2. [Phase 1] Lighthouse PWA score is ≥ 90.
3. [Phase 1] First Contentful Paint (FCP) is < 1.2 seconds on 4G network simulation.
4. [Phase 1] Largest Contentful Paint (LCP) is < 1.5 seconds on 4G network simulation.
5. [Phase 1] Time to Interactive (TTI) is < 2.0 seconds on 4G network simulation.
6. [Phase 1] JavaScript bundle size is < 150kb gzipped.
7. [Phase 1] CSS bundle size is < 20kb gzipped.
8. [Phase 1] Total initial page size (HTML + CSS + JS gzipped) is < 200kb.
9. [Phase 1] Offline cached pages load in < 0.5 seconds.
10. [Phase 2+] Cumulative Layout Shift (CLS) is < 0.1 (no unexpected jank or content shifts).
11. [Phase 3] Lighthouse Accessibility score is ≥ 90.
12. [Phase 3] Lighthouse Best Practices score is ≥ 90.

---

## Feature: Desktop Layout

**Description:** Responsive layout and usability at 768px+ viewport width.

**Status:** REQUIRED for Phase 3

### Acceptance Criteria

1. [Phase 3] At 768px+ viewport width, the layout adapts appropriately (not mobile-only stretched).
2. [Phase 3] Content is centered with a max-width constraint (not full-width to screen edge).
3. [Phase 3] Navigation is appropriate for desktop (horizontal nav, expanded sidebar, or other suitable layout).
4. [Phase 3] Touch targets remain ≥ 44×44px or are adequately spaced for mouse/trackpad use.
5. [Phase 3] Font sizes are appropriate for distance viewing (not too small at larger viewports).
6. [Phase 3] No horizontal scrolling occurs at 768px or wider viewports.
7. [Phase 3] Layout is tested and confirmed working at 768px, 1024px, and 1440px viewport widths.

---

## Feature: Color & Contrast (Cross-Cutting)

**Description:** Color usage, contrast verification, and brand consistency.

**Status:** REQUIRED for all phases

### Acceptance Criteria

1. No pure white (#FFFFFF) is used as background or text (use off-white or very light gray instead).
2. No pure black (#000000) is used as text or primary background (use very dark gray instead).
3. All text color pairs have been verified for contrast compliance (7:1 for body, 4.5:1 for secondary).
4. Color palette is consistent across all sections and pages.
5. No conflicting or jarring color combinations that make content hard to read.
6. All color changes meet WCAG AA contrast requirements.
7. Color is not the only means of conveying information (e.g., errors use both color and text).
8. Verified with WebAIM Contrast Checker or similar tool (screenshots of results can be attached).

---

## Feature: Typography (Cross-Cutting)

**Description:** Font selection, loading, and rendering.

**Status:** REQUIRED for all phases

### Acceptance Criteria

1. All headings and labels render in JetBrains Mono font.
2. All body text renders in Inter font.
3. No serif fonts appear anywhere in the app (including fallback chains).
4. Web fonts are loaded successfully from next/font (check Network tab for font file requests).
5. Fonts load without causing layout shift (font-display: swap or preload used).
6. No `@import` statements for fonts (use next/font instead).
7. Font sizes are appropriate and readable (≥16px for body, hierarchical scaling for headings).
8. Font weights are used correctly (headings bold, body regular, as intended).
9. Line height is adequate for readability (≥1.5 for body text).
10. Letter spacing is consistent and not excessive (normal or slightly increased for readability).

---

## Feature: Storage & Private Mode

**Description:** localStorage usage, degradation in private mode, and data persistence.

**Status:** REQUIRED for Phase 1+

### Acceptance Criteria

1. App works without crashing in private/incognito mode.
2. localStorage is accessed safely with try/catch wrapping.
3. In private mode, data is session-only (cleared on browser close, expected behavior).
4. App gracefully degrades if localStorage is unavailable (falls back to in-memory state).
5. No console errors or warnings related to localStorage in private mode.
6. Anchor Task input field works in private mode (data is in-session only).
7. Checklist state works in private mode (state resets on browser close, as expected).
8. localStorage data is scoped to origin (not accessible from other origins).

---

## Feature: Stability & Error Handling

**Description:** General app stability, crash prevention, and error handling.

**Status:** REQUIRED for all phases

### Acceptance Criteria

1. App does not crash on initial load.
2. App does not crash when navigating between sections.
3. App does not crash when rapidly tapping buttons or checkboxes.
4. App does not crash when opening/closing panels or modals.
5. App does not crash when toggling between view modes (Minimum/Full routine versions).
6. No infinite loops or memory leaks (Performance tab shows stable memory usage over time).
7. All network requests (if any) include timeout handling.
8. All errors are handled gracefully (no unhandled rejections in console).
9. If an error occurs, a user-friendly message is displayed (not raw error text).

---

## Feature: Content Rendering (Cross-Cutting)

**Description:** Emoji, special characters, and rendering consistency.

**Status:** REQUIRED for all phases

### Acceptance Criteria

1. All emoji render correctly on iOS Safari (no mojibake, no blank boxes).
2. All emoji render consistently across Chrome, Safari, Firefox, and Edge.
3. Emoji variation selectors do not break rendering (e.g., zero-width joiners in emoji combos).
4. No text is clipped or cut off due to emoji width.
5. Emoji scale appropriately with text size.
6. Special characters (™, ©, —, etc., if used) render correctly.
7. No rendering differences between device and desktop simulation.

---

## Sign-Off

**Feature Owner:** ________________
**QA Lead:** ________________
**Date:** ________________

**Acceptance Decision:** [ ] ALL CRITERIA PASS — Ready for Release
                         [ ] SOME CRITERIA FAIL — Needs Remediation
                         [ ] BLOCKED — Critical Issues

**Failed Criteria Summary:**
```
(List any criteria that did not pass, by feature and criterion number)
```

**Remediation Notes:**
```
(Actions taken or planned to address failures)
```

**Approved for Release By:** ________________ (Product Owner)
**Date:** ________________

---

**End of Acceptance Criteria**
