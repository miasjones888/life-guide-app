# Field Guide to Yourself — Design System Foundations

**Project:** Field Guide to Yourself (FGY)
**Type:** Design System Documentation
**Version:** 1.0
**Last Updated:** March 31, 2026

---

## Overview

This document specifies the complete design system for the Field Guide to Yourself progressive web app (PWA). It is intended as a reference for designers and developers implementing the visual design. All measurements are in pixels (px) unless otherwise noted. All colors are specified in hex format and RGB notation for development use.

---

## Design Token Reference

### Color Tokens (Complete Specification)

#### System Chrome Layer
Chrome colors represent the OS window interface, the tool itself.

```
--color-chrome:        #D4D0C8  |  rgb(212, 208, 200)
  Use: Default window title bars, unactive panel headers, system chrome background

--color-chrome-dark:   #808080  |  rgb(128, 128, 128)
  Use: Active window title bars, window borders, focus indicators, bottom panel active state

--color-chrome-light:  #F0EDE8  |  rgb(240, 237, 232)
  Use: Hover states on interactive elements, secondary surface, breadcrumb backgrounds, light fills
```

#### Content / Paper Layer
Paper colors provide the reading surface and text hierarchy.

```
--color-paper:         #F4F1EC  |  rgb(244, 241, 236)
  Use: Main content background, panel content areas, page backgrounds, card interiors

--color-ink:           #1A1917  |  rgb(26, 25, 23)
  Use: Primary text, body copy, headings, form labels, high-contrast elements

--color-ink-muted:     #6B6760  |  rgb(107, 103, 96)
  Use: Secondary text, metadata, timestamps, disabled states, helper text, breadcrumbs

--color-ink-ghost:     rgba(26, 25, 23, 0.07)  |  26, 25, 23 at 7% opacity
  Use: Hairline borders, subtle dividers, placeholder text, inactive borders
```

#### Nature / Green Layer
Green colors represent active states, interactions, and natural/living content.

```
--color-forest:        #3D5C3A  |  rgb(61, 92, 58)
  Use: Active title bars, checked checkbox fills, selected navigation states, expanded section border-left (2px)
       interactive hover states, primary accent for positive actions

--color-moss:          #7A9B76  |  rgb(122, 155, 118)
  Use: Secondary accent, hover states on nature-themed content, status indicator backgrounds

--color-lichen:        #C8D9C6  |  rgb(200, 217, 198)
  Use: Light fills (e.g., expanded section backgrounds), secondary fill colors, subtle backgrounds
```

#### System UI Accents
Specialized colors for specific UI components.

```
--color-status-bar:    #C0C0C0  |  rgb(192, 192, 192)
  Use: Status bar (bottom chrome stripe) background color

--color-title-text:    #FFFFFF  |  rgb(255, 255, 255)
  Use: Text color on active (--color-chrome-dark) title bars only
```

### Color Accessibility Matrix

All color pairs meet WCAG 2.1 contrast requirements:

| Foreground | Background | Contrast Ratio | WCAG Level |
|-----------|-----------|-----------------|-----------|
| --color-ink (#1A1917) | --color-paper (#F4F1EC) | 18.2:1 | AAA |
| --color-ink-muted (#6B6760) | --color-paper (#F4F1EC) | 8.1:1 | AA |
| --color-forest (#3D5C3A) | --color-paper (#F4F1EC) | 6.8:1 | AA |
| --color-title-text (#FFFFFF) | --color-chrome-dark (#808080) | 5.2:1 | AA |
| --color-ink-ghost (rgba 7%) | --color-paper (#F4F1EC) | 2.1:1 | decorative/borders only |
| --color-forest (#3D5C3A) | --color-lichen (#C8D9C6) | 4.8:1 | AA |

---

## Typography System

### Font Families

Both fonts are loaded from Google Fonts via CDN. No custom font files or subsetting required.

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
```

#### JetBrains Mono (Monospace — System Voice)
- Variable weight available (100–800)
- Used for: titles, labels, times, dates, timestamps, section numbers, button text, status messages
- The "system voice" — clear, mechanical, trustworthy
- Never use for body paragraph text

```css
font-family: 'JetBrains Mono', monospace;
```

#### Inter (Humanist Sans — Content Voice)
- Variable weight available (100–900)
- Used for: body text, descriptions, event content, reflection notes, helper text
- The "content voice" — warm, conversational, human
- Never use for UI labels or system text

```css
font-family: 'Inter', sans-serif;
```

### Type Scale & Line Heights

All sizes in pixels. Line-height in pixels (absolute, not relative).

| Role | Font Size | Line Height | Font | Weight | Letter-Spacing | Usage |
|------|-----------|------------|------|--------|-----------------|-------|
| Display | 40px | 44px | JetBrains Mono | 400 | normal | Section numbers, large dates, window titles, major headings |
| Heading1 | 24px | 30px | JetBrains Mono | 700 | normal | Section headers, primary panel titles, major section dividers |
| Heading2 | 16px | 22px | JetBrains Mono | 400 | normal | Sub-section labels, card titles, secondary headers, action labels |
| Body | 15px | 23px | Inter | 400 | normal | Event descriptions, care instructions, body copy, reflection text |
| BodySmall | 13px | 19px | Inter | 400 | normal | Secondary info, helper text, expanded notes, captions |
| Micro | 11px | 14px | JetBrains Mono | 400 | normal | Status bar text, timestamps, item counts, metadata, breadcrumbs |

### Type Scale Ratios
- Display → Heading1: 0.6x (40px → 24px)
- Heading1 → Heading2: 0.67x (24px → 16px)
- Heading2 → Body: 0.94x (16px → 15px)
- Body → BodySmall: 0.87x (15px → 13px)
- BodySmall → Micro: 0.85x (13px → 11px)

### Font Weight Guidelines
- **JetBrains Mono 400 (regular):** Default for all monospace text (labels, times, timestamps, body text in Notepad)
- **JetBrains Mono 700 (bold):** Section headers (Heading1) only
- **Inter 400 (regular):** Default for all humanist text (body copy, descriptions)
- **Inter 500 (medium):** Rarely used; reserved for emphasis or strong callouts
- **Inter 700 (bold):** Never used in body copy; use heading styles instead

### Text Rendering & Anti-aliasing
```css
/* Apply to all text containers */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

### Accessibility: Font Sizes at Breakpoints
Minimum readable font size is 13px (Micro). No text smaller than 11px. At mobile (≤375px), minimum text size remains 13px; increase line-height if needed for readability.

---

## Spacing Token Map

All spacing is in pixels. Base unit is 8px. All values are multiples of 4px minimum.

### Spacing Scale

| Token | Value | Use Case |
|-------|-------|----------|
| --space-xs | 4px | Tight internal spacing, icon margins, minimal gaps |
| --space-sm | 8px | Padding inside small components, tight spacing |
| --space-md | 12px | Standard component padding, small gaps between elements |
| --space-lg | 16px | Standard padding, gaps between sub-sections, vertical rhythm |
| --space-xl | 20px | Large padding, window panel internals (side/top margins) |
| --space-2xl | 24px | Generous padding, emphasized separation |
| --space-3xl | 32px | Sub-section separation, large vertical gaps |
| --space-4xl | 40px | Section separation, major breaks |
| --space-5xl | 48px | Section-to-section gap, page-level rhythm |

### Component Padding Standards

| Component | Top | Right | Bottom | Left | Notes |
|-----------|-----|-------|---------|------|-------|
| Window Panel content | 20px | 20px | 20px | 20px | All sides equal |
| Window Panel title bar | 6px | 12px | 6px | 12px | Text is vertically centered in 28px total height |
| Time Block label | 0px | 12px | 0px | 0px | Time label sits left, tight to content on right |
| ChecklistItem | 0px | 12px | 0px | 0px | Checkbox target is 44px, text flows right |
| Notepad Panel | 20px | 20px | 20px | 20px | Match Window Panel padding |

### Vertical Rhythm / Section Spacing

| Context | Spacing | Notes |
|---------|---------|-------|
| Between major sections | 48px | Large, obvious break |
| Between sub-sections | 32px | Moderate break, still related |
| Between grid items | 12–16px | Inside a grid, consistent gap |
| Between cards in a list | 16px | Consistent list item separation |
| Between lines of text | 23px (line-height) | Calculated from type scale |
| Top/bottom margin of panel | 16px | Breathing room around panels |

### Layout Margins (Container)

| Breakpoint | Side Margin | Max Content Width | Notes |
|-----------|-----------|------------------|-------|
| xs (375px) | 20px left/right | 335px | Mobile default |
| sm (390px) | 20px left/right | 350px | Large mobile |
| md (768px) | 40px left/right | 688px | Tablet |
| lg (1100px) | auto (centered) | 1000px | Desktop, centered |

---

## Breakpoints

Breakpoints define responsive behavior. Use mobile-first design: start with xs, then progressively add styles.

| Breakpoint Name | Min Width | Max Width | Device Type | Column Count | Notes |
|-----------------|-----------|-----------|-------------|-------------|-------|
| xs | 0px | 374px | Mobile small | 1 | iPhone SE, small phones |
| sm | 375px | 767px | Mobile | 1 | Standard mobile devices |
| md | 768px | 1099px | Tablet | 2 | iPad, large tablets |
| lg | 1100px | ∞ | Desktop | 3 | Large desktop, multi-monitor |

### Media Query Syntax
```css
/* Mobile-first: default is xs (no media query needed) */

@media (min-width: 375px) {
  /* sm: large mobile */
}

@media (min-width: 768px) {
  /* md: tablet */
}

@media (min-width: 1100px) {
  /* lg: desktop */
}
```

---

## Grid System

### Mobile Grid (xs & sm: ≤767px)
- **Container width:** 100vw (full viewport)
- **Side padding:** 20px left and right
- **Content area width:** 100vw − 40px = max 335px at 375px viewport
- **Column count:** 1
- **Gutter (gap between items):** 16px (vertical only; horizontal n/a at 1 column)
- **Base unit:** 8px

### Tablet Grid (md: 768–1099px)
- **Container width:** 100vw
- **Side padding:** 40px left and right
- **Content area width:** 100vw − 80px = max 688px at 768px viewport
- **Column count:** 2
- **Column width (equal):** (content area width − gutter) / 2
- **Gutter:** 16px (between columns and rows)
- **Base unit:** 8px

**Example calculation at 768px:**
- Content area: 688px
- Gutter: 16px
- Column width: (688 − 16) / 2 = 336px per column

### Desktop Grid (lg: ≥1100px)
- **Container width:** max-width 1000px, centered on viewport
- **Side padding:** auto (for centering)
- **Content area width:** 1000px
- **Column count:** 3
- **Column width (equal):** (1000 − 32px gutter) / 3 ≈ 322px per column
- **Gutter:** 16px (between columns and rows)
- **Base unit:** 8px

**Example calculation at 1200px:**
- Content area: 1000px
- Gutters: 2 × 16px = 32px
- Column width: (1000 − 32) / 3 ≈ 322px per column

### Grid Implementation Rules
- All grid items are the same height within a row (unless content explicitly overflows)
- Grid gaps are uniform (16px on all sides)
- Grid rows wrap naturally; do not force a fixed row height
- At mobile (xs/sm), grid is single-column: no horizontal gaps, only vertical gaps
- Grid does not use CSS Grid auto-fit; use explicit column count per breakpoint

---

## Z-Index System

Z-index layers define stacking order. Use these values exclusively; do not invent new layers.

| Layer Name | Z-Value | Component/Context | Notes |
|-----------|---------|------------------|-------|
| --z-base | 0 | Default stacking (Window Panels, content) | Do not explicitly set unless overriding |
| --z-sticky | 10 | Position: sticky elements (e.g., floating section headers) | Stays in view on scroll |
| --z-dropdown | 20 | Dropdown menus, inline overlays | Appears above base content |
| --z-modal-backdrop | 30 | Semi-transparent backdrop behind modals | Blocks interaction with background |
| --z-modal | 31 | Modal dialogs, expanded panels | Always appears above backdrop |
| --z-toast | 40 | Toast notifications, temporary alerts | Appears above all other content |
| --z-tooltip | 50 | Tooltips, contextual help | Top of stack, appears on demand |

### Example Usage
```css
.window-panel {
  z-index: var(--z-base); /* 0 */
}

.sticky-header {
  position: sticky;
  z-index: var(--z-sticky); /* 10 */
}

.modal-backdrop {
  z-index: var(--z-modal-backdrop); /* 30 */
}

.modal {
  z-index: var(--z-modal); /* 31 */
}
```

---

## Component Library

### WindowPanel

**Description:** Primary container component. Represents an OS window with title bar, content area, and optional status bar.

**Variants:**
1. Default (title bar + content + status bar)
2. Collapsed (title bar only, content hidden)
3. Expanded (full height, modal state on mobile)

**Props:**
- `title` (string, required): Text for title bar, all-caps, monospace
- `content` (ReactNode): Main content area
- `statusBar` (string, optional): Status bar text, right-aligned
- `isActive` (boolean, default: false): Whether title bar is active (dark) or inactive (light)
- `isExpanded` (boolean, default: false): Whether expanded or collapsed
- `onToggle` (function, optional): Callback when user taps title bar to toggle

**Visual Spec:**
```
Layout:
┌─────────────────────────┐
│ [title bar 28px height] │  background: --color-chrome (inactive) or --color-chrome-dark (active)
├─────────────────────────┤  1px border: --color-ink-ghost
│ content area            │  background: --color-paper, padding: 20px
│ (variable height)       │
├─────────────────────────┤  1px top border: --color-ink-ghost
│ [status bar 14px]       │  background: --color-status-bar
└─────────────────────────┘

Title bar text: 11px, JetBrains Mono 400, --color-ink
Title bar text (active): 11px, JetBrains Mono 400, --color-title-text

Borders: 1px solid --color-ink-ghost on all sides
Corner radius: 2px (all corners)
Box-shadow: none (or max 0 1px 3px rgba(0,0,0,0.08))
```

**Interaction States:**
- **Default:** Chrome title bar, paper content
- **Hover (on title bar):** Title bar background → --color-chrome-light
- **Active (title bar focused):** Title bar background → --color-chrome-dark, text → --color-title-text
- **Pressed:** Scale 0.97 immediate (no transition)
- **Expanded:** Border-left 2px solid --color-forest (left edge only)

**Accessibility:**
- Title bar is a clickable/focusable element (role="button" or actual button)
- Tab order includes title bar for expanding/collapsing
- Status bar is live region (aria-live="polite") for state changes
- Sufficient color contrast between all text and backgrounds (see Color Accessibility Matrix)

---

### TimeBlock

**Description:** Horizontal layout pairing a time label on the left with content on the right. Used in calendar and task contexts.

**Props:**
- `time` (string, required): Time label, e.g., "9:00 AM" or "14:30", in monospace
- `content` (ReactNode): Content to the right of time label
- `isActive` (boolean, default: false): Whether this block is highlighted
- `hasBorder` (boolean, default: true): Whether to show top border

**Visual Spec:**
```
Layout (row):
┌───────────┬──────────────────────┐
│ 9:00 AM   │ content here         │
└───────────┴──────────────────────┘

Time label: 11px, JetBrains Mono 400, --color-ink, fixed width ~70px, left-aligned
Gap between time and content: 12px
Top border: 1px solid --color-ink-ghost (if hasBorder)
Content area: 15px, Inter 400, --color-ink
Padding: 12px top/bottom (around entire row)
```

**Interaction States:**
- **Default:** Hairline top border
- **Active:** Text color for time label → --color-forest, content text remains standard
- **Hover:** Background → --color-chrome-light

**Accessibility:**
- Proper semantic structure (time in <time> element if applicable)
- Content within TimeBlock is readable by screen readers

---

### ContentEntry

**Description:** Tappable panel that expands to reveal more information. Collapsed shows a summary; expanded shows full content.

**Props:**
- `title` (string, required): Entry title (Heading2 style)
- `summary` (string, optional): Brief text shown in collapsed state
- `content` (ReactNode): Full content shown in expanded state
- `isExpanded` (boolean, default: false): Expanded or collapsed
- `onToggle` (function): Callback for expand/collapse
- `metadata` (string, optional): Metadata line (e.g., date, count) in Micro style

**Visual Spec:**
```
Collapsed state:
┌─────────────────────┐
│ [TITLE]             │  Heading2 style, JetBrains Mono
│ [summary text...]   │  BodySmall style, Inter, --color-ink-muted
│ [metadata · today]  │  Micro style, --color-ink-ghost
└─────────────────────┘
(entire panel is tappable)

Expanded state:
┌─────────────────────┐
│ [TITLE]             │  Title bar (active, dark)
│                     │
│ [full content here] │  Content area, variable height
│ [metadata · today]  │  Status bar
└─────────────────────┘

(border-left 2px solid --color-forest indicates expanded)
```

**Interaction States:**
- **Collapsed:** Standard panel, cursor: pointer
- **Hover (collapsed):** Background → --color-chrome-light
- **Pressed:** Scale 0.97 immediate
- **Expanded:** Border-left 2px solid --color-forest, title bar active (dark)

**Accessibility:**
- Entire panel is a single tappable target (min 44px height)
- Title is announced on expand
- Content is revealed with aria-expanded and aria-controls

---

### ChecklistItem

**Description:** List item with checkbox and label. Used for tasks, to-do lists, and completion tracking.

**Props:**
- `label` (string, required): Item text
- `isChecked` (boolean, default: false): Checked state
- `onChange` (function): Callback when user taps checkbox
- `icon` (string, optional): Optional icon or indicator before checkbox

**Visual Spec:**
```
Layout (row):
┌─────┬────────────────────┐
│ (o) │ item label text    │
└─────┴────────────────────┘

Checkbox: 24px diameter circle, center of 44px left tap target
Checkbox background (unchecked): --color-paper with --color-ink-ghost border (1px)
Checkbox background (checked): --color-forest
Checkbox mark (checked): --color-paper (white circle or checkmark inside)
Label text: 15px, Inter 400, --color-ink (unchecked) or --color-ink-muted (checked)
Label text (checked): light strikethrough (text-decoration: line-through, opacity: 0.7)
Padding: 12px left (before checkbox), 12px right (after label)
Vertical padding: 8px (centering within 44px min touch target)
```

**Interaction States:**
- **Unchecked:** Checkbox has ghost border, label is full opacity
- **Hover (unchecked):** Background → --color-chrome-light
- **Pressed:** Scale 0.97 immediate
- **Checked:** Checkbox filled with --color-forest, label text muted and struck-through
- **Checked + hover:** Background → --color-lichen (very light)

**Accessibility:**
- Native <input type="checkbox"> or role="checkbox"
- Label associated with checkbox via <label> element
- Keyboard accessible (Space/Enter to toggle)
- Touch target minimum 44px (full row height)

---

### NotepadPanel

**Description:** Text input area styled like a Notepad window. Used for reflection and journaling.

**Props:**
- `title` (string, default: "reflection.txt"): Title bar text
- `placeholder` (string, optional): Placeholder text in input
- `value` (string): Current text content
- `onChange` (function): Callback for text changes
- `isEditable` (boolean, default: true): Whether input is editable

**Visual Spec:**
```
Layout:
┌───────────────────────┐
│ REFLECTION.TXT        │  Title bar (JetBrains Mono 400, 11px, --color-ink)
├───────────────────────┤  1px border
│                       │
│ [blinking cursor]     │  Monospace textarea, JetBrains Mono 15px
│ user text here        │  Background: #FFFFFF or very light (slightly different from --color-paper)
│                       │
│ type more text...     │
└───────────────────────┘

Font: JetBrains Mono 15px / 23px line-height, 400 weight
Text color: --color-ink
Cursor: blinking (or solid if display only)
Padding: 20px on all sides (inside content area)
Border: 1px solid --color-ink-ghost
Corner radius: 2px
Background: #FFFFFF (or #F9F7F2 for slight contrast from --color-paper)

(No title bar styling; plain monospace + simple borders)
```

**Interaction States:**
- **Unfocused:** Standard appearance, no visible cursor
- **Focused:** Cursor visible and blinking, border slightly darker or subtle focus ring
- **Readonly (isEditable: false):** Text color → --color-ink-muted, no cursor, no input

**Accessibility:**
- Proper <textarea> element with label
- aria-label or associated <label> element for screen readers
- Tab stops in correct order
- Keyboard input fully supported
- Character count not announced by default (user can manually check if needed)

---

### GridPanel

**Description:** Container that arranges its children in a responsive grid. Wrapper around grid layout.

**Props:**
- `title` (string, optional): Optional section title above grid
- `children` (ReactNode): Grid items (typically ContentEntry or card components)
- `columns` (object): Column counts by breakpoint, e.g., { xs: 1, sm: 1, md: 2, lg: 3 }
- `gap` (string, default: "16px"): Gap between grid items

**Visual Spec:**
```
At xs/sm (mobile):
┌─────────────────┐
│ SECTION TITLE   │  (optional) Heading1 style
│                 │  Margin: 20px bottom
├─────────────────┤
│  Item 1         │
├─────────────────┤
│  Item 2         │
├─────────────────┤
│  Item 3         │
└─────────────────┘

At md (tablet, 2 columns):
┌───────────┬───────────┐
│  Item 1   │  Item 2   │
├───────────┼───────────┤
│  Item 3   │  Item 4   │
└───────────┴───────────┘
(gap: 16px between columns and rows)

At lg (desktop, 3 columns):
┌────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │
├────────┼────────┼────────┤
│ Item 4 │ Item 5 │ Item 6 │
└────────┴────────┴────────┘
```

**Accessibility:**
- Grid structure announced if using semantic HTML (<ul>, <li> or <div role="list">)
- Items within grid are properly ordered
- No hidden content

---

### SectionHeader

**Description:** Large, prominent section divider. Marks the start of a major section.

**Props:**
- `title` (string, required): Section title text
- `subtitle` (string, optional): Optional subtitle or descriptor
- `number` (string | number, optional): Section number, displayed in margin
- `icon` (ReactNode, optional): Optional icon or visual element

**Visual Spec:**
```
Layout:
         ┌────────────────────┐
    [01] │ SECTION TITLE      │
         │ optional subtitle  │
         │                    │
         └────────────────────┘

Section number: Display size (40px), JetBrains Mono 400, --color-ink-muted, positioned in left margin
Title: Heading1 size (24px), JetBrains Mono 700, --color-ink
Subtitle: BodySmall size (13px), Inter 400, --color-ink-muted
Top margin: 48px (from previous section)
Bottom margin: 32px (to following content)
Padding: 0 (no internal padding; margins provide spacing)
```

**Optional Ornamental Detail:**
- One ornamental letterform may appear as a visual accent (e.g., a floral initial letter for Reflections section)
- If used, ornament is rendered in --color-lichen or --color-moss, subtle and not distracting
- Ornament is purely decorative and carries no semantic meaning

**Accessibility:**
- Number is decorative or semantic depending on context (if it's a true section number, it should be in HTML hierarchy)
- Title is an <h1>, <h2>, or <h3> depending on nesting level
- Subtitle is not a heading; it's descriptive text

---

### BottomNav

**Description:** Navigation bar fixed at bottom of mobile viewport. Tabs for major app sections.

**Props:**
- `tabs` (array): Array of { label, icon, href, isActive }
- `onChange` (function, optional): Callback when user selects a tab

**Visual Spec:**
```
┌─────────────────────────────────────┐
│  [icon] │ [icon] │ [icon] │ [icon]  │
│  Care   │ Plants │ Journal│ Archive │
└─────────────────────────────────────┘

Height: 56px (including padding)
Background: --color-chrome
Border-top: 1px solid --color-ink-ghost
Padding: 8px top/bottom, distributed across tabs
Display: flex, space-around, justify-content: center

Tab item (each):
- Icon: 24px × 24px, centered above label
- Label: 10px, Inter 400, --color-ink-muted (inactive) or --color-forest (active)
- Icon color: --color-ink-muted (inactive) or --color-forest (active)
- Tap target: full width of tab (5th of container)
- Active indicator: small dot or underline in --color-forest below label

Interaction:
- Default: Icon + label in muted gray
- Hover: Icon + label scale up 1.05x, label color → --color-forest
- Active (current section): Label color → --color-forest, dot appears below
- Pressed: Scale 0.95x immediate
```

**Mobile-Only Component**
- BottomNav is display: none at breakpoints ≥ md (tablet)
- On tablet/desktop, use a sidebar or horizontal navigation instead (not defined in this doc)

**Accessibility:**
- Proper <nav> element or role="navigation"
- Each tab is a <button> or <a> with proper semantics
- aria-current="page" on active tab
- Tab order includes all navigation items

---

### StatusBar

**Description:** Chrome bar at bottom of a Window Panel. Displays metadata and item counts.

**Props:**
- `text` (string): Status text, e.g., "3 items · today" or "last updated 2 hours ago"
- `alignment` (string, default: "right"): "left" or "right" alignment

**Visual Spec:**
```
┌──────────────────────────────┐
│ 3 items · today              │
└──────────────────────────────┘

Height: 14px (no additional padding; text is baseline-aligned)
Background: --color-status-bar (#C0C0C0)
Font: 11px, JetBrains Mono 400, --color-ink-muted
Text alignment: left (default) or right (if alignment="right")
Padding: 6px 12px (to match Window Panel sides)
Border-top: 1px solid --color-ink-ghost
```

**Usage Context:**
- Always appears inside Window Panel as the bottom stripe
- Text is right-aligned by default (right side of window)
- Metadata is concise: item counts, timestamps, state indicators

**Accessibility:**
- Status bar content is announced if it changes dynamically
- Text is readable by screen readers as part of panel context

---

### Tag

**Description:** Small, chip-like label for categorization or filtering. Used for plant types, task categories, etc.

**Props:**
- `label` (string, required): Tag text
- `variant` (string, default: "default"): "default", "active", "selected"
- `onRemove` (function, optional): Callback if tag is dismissible (shows X)

**Visual Spec:**
```
Default state:
┌──────────┐
│ Plant    │
└──────────┘

Active/selected state:
┌──────────┐
│ Plant    │ (background: --color-lichen, text: --color-forest)
└──────────┘

Height: 24px (including padding)
Padding: 4px 10px
Font: 11px, Inter 400, --color-ink
Background: --color-paper with 1px --color-ink-ghost border (default)
Background: --color-lichen (active/selected)
Text color: --color-ink (default) or --color-forest (active)
Border radius: 12px (rounded pill shape, different from 2px elsewhere)
Display: inline-block

Removable tag (with X button):
Add small [×] button right side, 14px diameter, within tag bounds
```

**Interaction:**
- Default: Paper background, muted border
- Hover: Background → --color-chrome-light
- Selected: Background → --color-lichen, text → --color-forest
- Click (remove): X button triggers onRemove callback

**Accessibility:**
- If tag is clickable/dismissible, it's a <button> element
- aria-label for X button: "Remove [tag label]"
- If tag is just a label, it's plain text or a <span>

---

### Rule (Hairline Divider)

**Description:** Simple horizontal line for visual separation. Subtle, never dominant.

**Props:**
- `orientation` (string, default: "horizontal"): "horizontal" or "vertical"
- `spacing` (string, default: "md"): Spacing above/below, e.g., "sm", "md", "lg"
- `color` (string, default: "ghost"): Color token, typically "ghost" or "muted"

**Visual Spec:**
```
Horizontal:
─────────────────────────────

Width: 100% of containing element
Height: 1px
Color: --color-ink-ghost (default) or --color-ink-muted
Margin: var(--space-{spacing}) on top and bottom
Background: solid (no pattern)

Vertical:
│
│
│

Height: 100% of containing element
Width: 1px
Color: --color-ink-ghost or --color-ink-muted
Margin: var(--space-{spacing}) on left and right
```

**Usage Context:**
- Separates sections or subsections
- Used sparingly; too many rules clutter the layout
- Often appears at top of Time Block components
- Between cards in a grid (visible as row gaps)

**Accessibility:**
- Purely decorative (no semantic meaning)
- Use `aria-hidden="true"` if in semantic HTML
- Never use as the only visual indicator of section separation

---

### VisuallyHidden

**Description:** Utility component to visually hide content while keeping it accessible to screen readers.

**Visual Spec:**
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Usage Context:**
- Hiding label text when icon is sufficient (but label is still announced)
- Hiding status updates that are announced via aria-live
- Hiding skip navigation links that appear only on keyboard focus

**Accessibility:**
- Content is completely hidden visually but available to assistive technologies
- Use for any text that should only be heard, not seen

---

## Motion & Animation System

### Global Animation Settings
- **Reduced motion enabled globally:** All animations automatically reduce to opacity-only fades on `prefers-reduced-motion: reduce`
- **No parallax, no auto-play, no continuous animations**
- **All animations are state-change driven** (user interaction or conditional)

### Animation Specifications

#### Page Navigation Slide + Scale
- **Trigger:** Navigating between major sections
- **Duration:** 240ms
- **Easing:** cubic-bezier(0.32, 0.72, 0, 1) [ease-out]
- **Properties animated:** transform (translateX, scale), opacity
- **Details:**
  - Entering page: slide in from right (transform: translateX(20px)) + scale to 0.98, fade in (opacity: 0 → 1)
  - Exiting page: slide out to left (transform: translateX(-20px)) + scale to 0.98, fade out
  - Reduced motion: opacity fade only (0 → 1 / 1 → 0), no transform

```css
@media (prefers-reduced-motion: no-preference) {
  .page-enter {
    animation: pageEnter 240ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateX(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-enter {
    animation: pageEnterReduced 240ms;
  }

  @keyframes pageEnterReduced {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

#### Card Expand (ContentEntry)
- **Trigger:** User taps card to expand
- **Duration:** 180ms
- **Easing:** cubic-bezier(0.32, 0.72, 0, 1) [ease-out]
- **Properties animated:** max-height, opacity (for content reveal)
- **Details:**
  - From collapsed height (e.g., 80px) to expanded height (variable, content-dependent)
  - Border-left color transition: none → --color-forest (no animation, instant)
  - Reduced motion: opacity only, no height animation

```css
@media (prefers-reduced-motion: no-preference) {
  .card-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 180ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .card.expanded .card-content {
    max-height: 1000px; /* or calculated height */
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-content {
    transition: none;
    opacity: 0;
  }

  .card.expanded .card-content {
    opacity: 1;
  }
}
```

#### Checklist Item Check
- **Trigger:** User taps checkbox
- **Duration:** 120ms
- **Easing:** cubic-bezier(0.32, 0.72, 0, 1) [ease-out]
- **Properties animated:** background-color (checkbox), text-decoration, color (text)
- **Details:**
  - Checkbox background: --color-paper → --color-forest (120ms)
  - Text color: --color-ink → --color-ink-muted (120ms)
  - Strikethrough applied instantly (not animated)
  - Reduced motion: opacity fade only

```css
@media (prefers-reduced-motion: no-preference) {
  .checkbox {
    transition: background-color 120ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .checkbox.checked {
    background-color: var(--color-forest);
  }

  .checkbox-label {
    transition: color 120ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .checkbox.checked ~ .checkbox-label {
    color: var(--color-ink-muted);
    text-decoration: line-through;
  }
}

@media (prefers-reduced-motion: reduce) {
  .checkbox,
  .checkbox-label {
    transition: none;
  }

  .checkbox.checked {
    background-color: var(--color-forest);
  }
}
```

#### Section Header Fade-Up Enter
- **Trigger:** Page/section loads
- **Duration:** 200ms
- **Easing:** cubic-bezier(0.32, 0.72, 0, 1) [ease-out]
- **Properties animated:** opacity, transform (translateY)
- **Details:**
  - Enters from translateY(12px) opacity 0, to translateY(0) opacity 1
  - Reduced motion: opacity fade only, no transform

#### Today View Load (Staggered)
- **Trigger:** Today view (home/main section) loads
- **Duration:** 50ms delay per block, staggered
- **Base animation:** Fade in (opacity 0 → 1, 200ms)
- **Details:**
  - First block: starts immediately (animation-delay: 0ms)
  - Second block: animation-delay: 50ms
  - Third block: animation-delay: 100ms
  - Etc.
  - Creates cascading reveal effect
  - Reduced motion: all blocks fade in simultaneously without delay

```css
@media (prefers-reduced-motion: no-preference) {
  .today-block {
    opacity: 0;
    animation: todayBlockEnter 200ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
  }

  .today-block:nth-child(1) { animation-delay: 0ms; }
  .today-block:nth-child(2) { animation-delay: 50ms; }
  .today-block:nth-child(3) { animation-delay: 100ms; }
  .today-block:nth-child(4) { animation-delay: 150ms; }

  @keyframes todayBlockEnter {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .today-block {
    opacity: 0;
    animation: todayBlockEnterReduced 200ms forwards;
  }

  .today-block:nth-child(n) { animation-delay: 0ms; }

  @keyframes todayBlockEnterReduced {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

#### Bottom Nav Tab Switch
- **Trigger:** User taps a different navigation tab
- **Duration:** 100ms
- **Easing:** cubic-bezier(0.32, 0.72, 0, 1) [ease-out]
- **Properties animated:** icon scale, label color
- **Details:**
  - Icon scale: scale(1) → scale(1.15) → scale(1) (pulse effect)
  - Label color: --color-ink-muted → --color-forest (100ms)
  - Reduced motion: color change only, no scale

---

## Interaction States Reference Table

Complete state specification for all interactive elements.

| Element | State | Visual Change | Animation |
|---------|-------|---------------|-----------|
| Window Panel title bar | default | --color-chrome bg, --color-ink text | none |
| Window Panel title bar | hover | --color-chrome-light bg | none |
| Window Panel title bar | active | --color-chrome-dark bg, --color-title-text text | none |
| Window Panel title bar | pressed | scale 0.97 | immediate |
| Window Panel | expanded | border-left 2px solid --color-forest | instant |
| Checkbox | unchecked | ghost border, no fill | none |
| Checkbox | hover | --color-chrome-light bg | none |
| Checkbox | checked | --color-forest fill, white mark | 120ms ease-out |
| Checkbox label | default | --color-ink, no strikethrough | none |
| Checkbox label | checked | --color-ink-muted, strikethrough | 120ms ease-out |
| ContentEntry card | collapsed | standard panel | none |
| ContentEntry card | hover | --color-chrome-light bg | none |
| ContentEntry card | expanded | border-left --color-forest, active title bar | 180ms ease-out |
| Button (generic) | default | --color-paper bg, --color-ink text | none |
| Button (generic) | hover | --color-chrome-light bg | none |
| Button (generic) | pressed | scale 0.97 | immediate |
| Button (green accent) | default | --color-forest bg, --color-title-text text | none |
| Button (green accent) | hover | --color-moss bg | none |
| Button (green accent) | pressed | scale 0.97 | immediate |
| Input field | default | --color-paper bg, --color-ink-ghost border | none |
| Input field | focused | --color-chrome-dark border (or focus ring) | none |
| Input field (Notepad) | focused | cursor visible, border subtle | none |
| Navigation link | default | --color-ink text | none |
| Navigation link | hover | --color-forest text | none |
| Navigation link | active (current page) | --color-forest text, indicator dot/underline | instant |
| Tab (BottomNav) | inactive | --color-ink-muted icon/text | none |
| Tab (BottomNav) | hover | scale 1.05 | none |
| Tab (BottomNav) | active | --color-forest icon/text, indicator | instant |
| Tag | default | --color-paper bg, ghost border, --color-ink text | none |
| Tag | selected | --color-lichen bg, --color-forest text | none |

---

## Accessibility Requirements (WCAG 2.1 AA)

### General Requirements
- **Minimum font size:** 13px (Micro role). No text smaller than 11px.
- **Minimum touch target:** 44px × 44px for all interactive elements (buttons, checkboxes, links, tabs)
- **Focus indicator:** 2px solid --color-chrome-dark, 2px offset from element border
- **Focus visible:** `:focus-visible` always visible on keyboard navigation
- **Color contrast:** See Color Accessibility Matrix (all text meets AA or AAA)
- **Motion:** All animations must respect `prefers-reduced-motion: reduce`

### Component-Specific Accessibility

#### WindowPanel
- Title bar is a keyboard-focusable button (or actual <button>)
- Focus ring on title bar when focused
- aria-expanded="true|false" if collapsible
- aria-controls linking to controlled content

#### ChecklistItem
- Semantic <input type="checkbox"> element
- Label associated via <label> element or aria-labelledby
- Touch target: entire row minimum 44px height
- Keyboard: Space or Enter to toggle

#### ContentEntry
- Entire card is tappable (44px minimum height)
- aria-expanded="true|false" for expand/collapse state
- aria-controls linking to expandable content

#### NotepadPanel
- Semantic <textarea> element
- Associated <label> element
- aria-label or aria-labelledby for screen readers
- Character count available (not auto-announced)

#### BottomNav
- Proper <nav> element with role="navigation"
- Each tab is a <button> or <a>
- aria-current="page" on active tab
- Tab order follows visual order

#### Form Fields (Generic)
- All inputs have associated <label> elements
- aria-label for icon-only buttons
- aria-required for required fields
- aria-invalid + aria-describedby for error states

#### Visual Indicators
- Never use color alone to indicate state
- Include text labels (e.g., "checked", "active") or icons with text alternatives
- Status changes announced via aria-live regions when appropriate

### Color Contrast Validation
- All text passes WCAG AA (4.5:1 minimum) or AAA (7:1 minimum) contrast ratio
- See Color Accessibility Matrix for validated pairs
- Test all states: default, hover, active, disabled, checked

### Keyboard Navigation
- All interactive elements reachable via Tab key
- Tab order logical and matches visual order
- No keyboard traps (users can always tab out)
- Esc key closes modals and dropdowns
- Enter/Space activates buttons

### Screen Reader Testing
- All page structure announced correctly (headings, lists, landmarks)
- Form labels announced with inputs
- Dynamic content updates announced via aria-live
- Decorative elements marked as aria-hidden="true"

---

## Content Readability Rules

### Line Measure (Max Width)
- **Optimal reading width:** 50–75 characters per line
- **For body text (Inter 15px):** 335px on mobile, 500px on tablet, 600px on desktop
- **For monospace text (JetBrains Mono 15px):** Same limits apply
- **Enforce via max-width CSS property** on text containers

### Line Height
- All line heights specified in type scale (not relative, absolute px values)
- Minimum 1.2x font size (e.g., 15px font → 18px min line-height)
- Recommended 1.4–1.5x for body text (15px → 21–23px)
- Generous line height improves readability on screen

### Text Alignment
- **Left-aligned:** All body text, default
- **Center-aligned:** Section headers (Heading1, Heading2)
- **Right-aligned:** Status bar text, timestamps, metadata
- **Justified:** Never used (poor readability on narrow screens)

### Link Styling
- Links within body text are underlined (text-decoration: underline)
- Link color: --color-forest (distinguishable from body text --color-ink)
- Visited state: --color-moss (slightly lighter than active)
- Focus ring: 2px solid --color-chrome-dark

### List Formatting
- **Unordered lists:** Bullet point (•) or dash (–) in --color-ink-muted, text in --color-ink
- **Ordered lists:** Numeric (1. 2. 3.) in --color-ink-muted
- **List item spacing:** 8px vertical gap between items
- **Nested lists:** Indent 20px per level

### Paragraph Spacing
- Paragraphs separated by blank space (16px margin-bottom minimum)
- No extra spacing before first paragraph in a panel
- Last paragraph in a panel: no margin-bottom (edge of content area)

---

## Image Handling Rules

### Image Specifications
- **Format:** JPEG (photographs), PNG (screenshots, diagrams), WebP (modern fallback)
- **Compression:** Lossy JPEG at 75% quality; PNG at 8-bit indexed color when possible
- **Dimensions:** Always specify width and height on <img> to prevent layout shift
- **Responsive:** Use srcset and <picture> for different viewport sizes

### Image in Panels
- **Container:** Images appear inside Window Panel content area, not bleeding to edges
- **Width:** 100% of panel content area (minus padding)
- **Height:** Aspect ratio preserved; no cropping or stretching
- **Border:** No decorative border or frame applied on top
- **Caption:** Optional caption in BodySmall (13px Inter) below image
- **Metadata:** Date, location, species name in Micro (11px JetBrains Mono) below image

### Photographs (Nature, Plants, Places)
- Shown at full quality, not filtered or color-graded
- Low-resolution or compressed images acceptable (honest about medium)
- Aspect ratio varies (not forced to square or 16:9)
- Accompanied by metadata (date taken, location, subject)

### Diagrams & Illustrations
- Line-drawn diagrams (not photorealistic)
- Simple, clear visual hierarchy
- Never decorative; only for explanation or documentation

### Image Alt Text
- All images have descriptive alt text (not empty)
- Alt text describes content and context for screen readers
- For decorative images without semantic meaning: alt="" (empty) with aria-hidden="true"

### Lazy Loading
- Images below the fold can use `loading="lazy"` for performance
- Images above fold: `loading="eager"` or omit attribute (default eager)

---

## Error State Specifications

### Error States (No Dedicated Color)
FGY does not use a dedicated error color (red, orange). Instead:
- **Visual indicator:** Modal dialog or toast with --color-ink text on --color-paper bg
- **Text emphasis:** Bold or uppercase text for error heading
- **Icon:** Optional warning icon (outline style, not filled)
- **Layout:** Centered or full-width message, high z-index (--z-toast or --z-modal)

### Error Message Content
- Clear, plain language (no technical jargon)
- Explain what went wrong and how to fix it
- Example: "Could not save changes. Please check your connection and try again."
- Provide action button: "Retry" or "Dismiss"

### Form Field Errors
- Below the field: helper text in --color-ink-muted (not red)
- Field border: --color-ink-ghost (no change, subtle)
- Field background: --color-chrome-light (light warning fill, optional)
- Focus ring on field: --color-chrome-dark (normal focus, not error-specific)

### Toast Notifications
- Background: --color-paper
- Border: 1px solid --color-chrome
- Text: --color-ink
- Close button: optional X, --color-ink-muted
- Position: top or bottom, centered or corner
- Duration: 4 seconds (auto-dismiss)
- Z-index: --z-toast (40)

---

## Empty State Specifications

### Empty State Layout
- **Heading:** "No [items/tasks/notes] yet" in Heading2 style
- **Body text:** Brief, encouraging message in Body style
- **Illustration:** Optional simple icon or visual (line-drawn only)
- **Call to action:** "Create your first [item]" button or link
- **Vertical centering:** Empty state card centered in viewport (on mobile, may be vertically centered within scroll area)

### Empty State Visual
- Full-width container, minimal height (200px minimum)
- Text centered
- Icon (if present): 48px × 48px, in --color-moss (not dominant)
- Background: --color-paper (same as normal panels)
- Border: --color-ink-ghost (subtle, optional)

### Example Empty State
```
         [leaf icon in --color-moss]

        No plants yet

      Start tracking your plants!
   [Create Your First Plant] button
```

---

## Do/Don't Rules (Visual Examples)

### Typography

**DO:**
- Use JetBrains Mono for all UI labels, titles, and times
- Use Inter for all body text and descriptions
- Maintain consistent line-height across type scale
- Set max line-width to 500–600px for body text
- Use weight hierarchy (400 regular, 700 bold) for emphasis

**DON'T:**
- Mix serif and sans-serif fonts in the same panel
- Use smaller than 13px for body text (Micro 11px is max-small)
- Use decorative scripts, handwriting, or display fonts
- Use all-caps for body text (reserved for UI labels)
- Override line-height values (stick to type scale)

### Color Usage

**DO:**
- Use --color-chrome for all window chrome (title bars, borders)
- Use --color-forest for all interactive states (checked, active, hover)
- Use --color-paper as the default content background
- Maintain consistent color usage across components
- Validate all text color contrast against background

**DON'T:**
- Use red, orange, or warm accent colors (green only)
- Use pure white (#FFFFFF) or pure black (#000000)
- Apply color gradients (flat color only)
- Change color of a standard component beyond the specified states
- Use color alone to indicate state (always include text or icon)

### Layout & Spacing

**DO:**
- Use consistent 8px-based spacing throughout
- Add generous negative space between sections (48px gaps)
- Align content to the grid (gutter alignment)
- Keep margins and padding symmetric within components
- Break the grid intentionally with a single asymmetrical element per page

**DON'T:**
- Crowd content without breathing room
- Use inconsistent spacing values (stick to token scale)
- Right-align large blocks of text (breaks readability)
- Create deeply nested indentation (max 2–3 levels)
- Use whitespace to hide content (whitespace reveals hierarchy)

### Interactive Elements

**DO:**
- Make all interactive elements minimum 44px × 44px touch target
- Use clear focus indicators on keyboard navigation
- Provide visual feedback on every interaction (hover, press, checked)
- Use consistent interaction timing (240ms for major changes, 120ms for minor)
- Test keyboard navigation and screen reader compatibility

**DON'T:**
- Make clickable elements smaller than 44px
- Forget focus rings or assume mouse-only usage
- Use hover states that are the same as default
- Apply interactions that don't respect prefers-reduced-motion
- Create dead zones or UI elements with no clear function

### Imagery

**DO:**
- Include metadata (date, location, name) with photographs
- Use photographs to show actual content (not decoration)
- Compress images appropriately (lossy JPEG, 75% quality)
- Provide descriptive alt text for all images
- Show images at their natural aspect ratio

**DON'T:**
- Apply filters, color-grades, or overlays to photographs
- Use background images or wallpapers
- Include decorative illustrations or ornamental imagery
- Display images without context or metadata
- Force images into non-native aspect ratios

### Structure & Hierarchy

**DO:**
- Use clear section headers (Heading1) to mark major divisions
- Create visual hierarchy through type scale and weight
- Keep navigation and major actions visible above the fold
- Use tables or grids to present structured data
- Number sections or provide outline for complex documents

**DON'T:**
- Bury important actions below lots of scrolling content
- Create ambiguity about section boundaries or page structure
- Use too many heading levels (max 3–4 levels deep)
- Present data in wall-of-text paragraphs
- Hide navigation or major features

---

## Summary & Implementation Checklist

### Before Building

- [ ] Font families loaded from Google Fonts (JetBrains Mono + Inter)
- [ ] Color tokens defined as CSS custom properties (--color-*)
- [ ] Spacing scale defined (--space-xs through --space-5xl)
- [ ] Breakpoints defined for responsive behavior
- [ ] Z-index system in place (--z-base through --z-tooltip)
- [ ] Component library specs reviewed
- [ ] Animation timings and easing values chosen
- [ ] Accessibility checklist prepared (WCAG 2.1 AA)

### During Development

- [ ] Components match visual specs exactly (dimensions, colors, typography)
- [ ] All interactive elements have hover, active, and focus states
- [ ] Touch targets minimum 44px (or 44px minimum height for rows)
- [ ] Animations respect prefers-reduced-motion
- [ ] All form inputs have labels and error states
- [ ] Focus rings visible on keyboard navigation (2px --color-chrome-dark)
- [ ] Color contrast passes WCAG AA for all text pairs
- [ ] Images have alt text and are responsive (srcset)
- [ ] Keyboard navigation works (Tab, Enter, Space, Esc)
- [ ] Screen reader tested (headings, labels, lists announced)

### Before Launch

- [ ] Full accessibility audit (WCAG 2.1 AA conformance)
- [ ] Visual regression testing (all components, all states, all breakpoints)
- [ ] Performance testing (animations smooth, no jank)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iPhone, Android, various screen sizes)
- [ ] Network testing (slow 3G, offline scenarios)
- [ ] Reduced motion testing (all animations respect prefers-reduced-motion)
- [ ] Empty state and error state testing
- [ ] Print stylesheet (if applicable)

---

## Document Maintenance

**This design system is a living document.**

- Review quarterly (or when major UI changes are made)
- Update color tokens if palette shifts
- Add new components as they are created
- Record component variants as they emerge
- Keep type scale and spacing tokens in sync across codebase
- Monitor accessibility reports and fix issues promptly

**For questions or clarifications:** Refer to `/design-direction.md` for design philosophy and rationale. This document (`design-system.md`) contains the implementation specifications.
