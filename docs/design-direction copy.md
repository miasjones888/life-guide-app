# Field Guide to Yourself — Design Direction

**Project:** Field Guide to Yourself (FGY)
**Type:** Mobile-First Personal Life Guide PWA
**User:** Single user (Mia)
**Version:** 1.0
**Last Updated:** March 31, 2026

---

## Design Philosophy: Nature Inside the Machine

The dominant aesthetic of Field Guide to Yourself is a deliberate tension between two worlds: the mechanical, the systematic, the ordered (flat OS chrome, window frames, monospace type) and the organic, the alive, the natural (forest green, lush photography, botanical language). Every visual decision reinforces this duality.

The window frame becomes a **portal**. The user is not looking at nature on a screen; they are looking *through* a system interface into something living. The chrome is not decorative—it is structural, deliberate, and purposeful. It frames the content, contains it, and makes it tangible. Inside that frame lives forest green, photographs of growing things, care instructions written in a warm, human voice.

This is what technology can be: not a replacement for nature, not an escape from the natural world, but a lens for understanding it, recording it, tending it. The system voice (monospace typography, grid lines, status bars) never overpowers the content voice. They coexist in productive tension.

The emotional register is quiet, thoughtful, and deeply personal. This is an app for one person to know themselves better. It should feel like a field journal, an archive, a living document. It should feel earnest, not polished. Made-by-hand, not mass-produced.

---

## Emotional Register

### Should Feel Like
- A personal archive. A collection you've assembled over time.
- A paper field journal translated to digital. Intimate, tactile, real.
- OS interfaces from the 1990s–early 2000s: AmigaOS, early Mac, Windows 95–XP. Earnest, transparent about being a *tool*, not a lifestyle product.
- A Japanese botanical catalog. Quiet, organized, systematic. Taxonomic wonder.
- A hand-made thing. Slightly imperfect. Personal notation visible. Space for the human.
- Contemplative. Encouraging reflection. A place to slow down.
- Trustworthy. Simple. Not trying to be clever. Legible at a glance.

### Should NOT Feel Like
- A social app. No performative design, no influencer aesthetics.
- A consumer product. No unnecessary polish, no trends, no trends-chasing.
- An AI product. No gradients, no glassmorphism, no "futuristic" chrome.
- Chaotic or cluttered. Organization is visible. Hierarchy is clear.
- Passive. Every interaction should feel like agency—you are building this, maintaining this, choosing what goes here.
- Sentimental or precious. Green is not "healing" or "wellness." It is just the color of a forest. Photographs are not inspirational—they are documentary.

---

## Reference Image Analysis

### Category 1: Web1.0 / Net Art / Old Desktop OS Interfaces

#### "DREAMS" (Geocities-era portal frame)
**What it contributes:** The foundational metaphor. A heavily beveled, ornate 3D frame contains a portal to something else (Balinese temple + cloud sky). The frame is the most visually complex element, but it frames simplicity. The letterform "DREAMS" is spelled out in botanical ornament. This tells us: system chrome is the *magic*, not the content. The window is not transparent—it is *ornate*. It celebrates the structure.

**Extracted pattern:** Window-as-reverent-frame. The title bar and chrome are worth attention. Ornament appears in typography (letterforms carrying botanical reference), not as separate decoration.

**Avoid:** The beveled 3D effect itself (we use flat chrome). The complexity of the frame (our chrome is minimal). But honor the *reverence* for the window structure.

---

#### AmigaOS 3.9 Desktop (Yosemite wallpaper + floating windows)
**What it contributes:** Multiple coexisting windows. Nature as background *wallpaper*, system UI as foreground. Layering. The density of information: media player, equalizer bars, icon grid, all visible at once. This is how a personal computer should feel—multiple tools available, overlapping contexts, visible state.

**Extracted pattern:** Desktop as palimpsest. Multiple panels coexist. The user can see multiple aspects of their life simultaneously. Nature occupies the *background space*, system UI occupies the *foreground*. Both are valued.

**Avoid:** The dense clutter without purpose. Our app uses negative space deliberately. The wallpaper idea (nature as pure background) is explicitly rejected—nature in FGY is *content*, not decoration.

---

#### VDOLive Player (Japanese) — Waterfall in a Window
**What it contributes:** The most direct reference. A Japanese OS dialog (ファイル / 編集 / 表示 / ヘルプ in the menu bar) contains a low-resolution, deeply green, misty forest waterfall photograph. The status bar reads "5 個のオブジェクト" (5 objects). This is *nature as window content*, not background. The nature is small, intimate, deeply observed. The text is in Japanese—a foreign script that signals "archive," "catalog," "not for mass consumption." Low resolution makes the image *more* precious, not less.

**Extracted pattern:** Nature lives inside the window. The window chrome is structural, not decorative. Metadata (object counts, status) is part of the design. Foreign language text is acceptable. Compression, low resolution, and intimacy are virtues.

**Avoid:** High-fidelity photography. Photorealism. Clean, polished images. Stock photography. The image should feel like *something you found*, not *something chosen for you*.

---

#### Japanese Mac Dialog (植物はあなたを好きで — "Plants Are the Only Things That Like You")
**What it contributes:** A gray rounded dialog contains a 3x4 grid of potted plants. The text is in Japanese. Buttons are オーケー (OK) and どんな (what). This demonstrates: (1) grid-of-objects as a UI pattern, (2) text as poetic/philosophical (not functional), (3) taxonomy as design, (4) the acceptance/questioning pattern (OK / What). The plants are simple, line-drawn icons, not photographs.

**Extracted pattern:** Grids of discrete, like objects. Section headers can carry philosophical text. Multiple button options invite contemplation, not immediate action. Icons are line-drawn, not photographic.

**Avoid:** Photorealistic plant photography. Overly cute or stylized illustrations. Buttons that demand action.

---

#### Notepad + Jungle Wallpaper (Windows Explorer + Typography)
**What it contributes:** Two Notepad windows floating over a jungle wallpaper. One window contains the word "a e s t h e t i c" spaced out vertically. The other contains a 3D staircase ASCII art. Notepad is the content tool. Monospace font. The spacing and layout of text *is* the visual design. Typography as visual structure, not just information delivery.

**Extracted pattern:** Notepad as the journaling interface. Monospace typography as the writing voice. Text layout carries meaning. Spacing and line breaks are design decisions, not accidents.

**Avoid:** Rich text editing. Markdown preview. WYSIWYG complexity. The Notepad should feel like *typewriter*, not word processor.

---

### Category 2: RR1 Mood Boards (Pinterest Archival / Dutch & Japanese Design)

#### Raoul De Keyser Archive Spread
**What it contributes:** Dense, bilingual text columns. An archival catalog aesthetic. Information organized systematically but not grid-locked. Serious, scholarly, permanent. This is archive language—the language of preservation, not communication.

**Extracted pattern:** Archive as design principle. Dense text is acceptable when organized systematically. Bilingual or multi-script text signals importance. Archival layouts feel permanent and trustworthy.

---

#### Japanese Kanji Grid (青/清/静/精 — Blue/Pure/Quiet/Spirit)
**What it contributes:** A grid of four kanji characters. Each character is visually complex, each carries meaning, each relates thematically. The grid *is* the content. Repetition of similar elements in rows and columns.

**Extracted pattern:** Grids of meaningful objects. Repetition as structure. Characters (or cards, or entries) that carry visual weight by themselves.

---

#### "Archive No. 001 — The Doors of Perception" (Minimal white catalog)
**What it contributes:** Almost nothing on the page. Massive white space. A small number of elements. Every choice is intentional because space is so visible. This is editorial minimalism—not empty, but *spaced*.

**Extracted pattern:** Negative space as design material. Whitespace reveals hierarchy. Fewer elements mean each element has weight.

---

#### Keyboard Keys with Moss
**What it contributes:** Technology (keyboard, silicon, plastic) being reclaimed by nature (moss growing into the keycaps). This is the project's metaphor made literal. The boundary between machine and natural dissolves. Decay, growth, transformation.

**Extracted pattern:** The chrome and the green are not enemies. They transform each other. Rust, patina, wear—these are beautiful. Perfection is not the goal.

---

#### Takashi Homma Filmography (List as Texture)
**What it contributes:** Film titles repeated in dense, small columns. The text itself *becomes* a visual texture through repetition and scale. Lists are design elements. Metadata is content.

**Extracted pattern:** Dense text as texture. Lists of items (dates, times, names) can be visually beautiful through typography and spacing alone. No illustration needed.

---

#### Dutch Design Week "(In No Particular Order)" (Bracketed Type System)
**What it contributes:** Large brackets used as a typographic system. Breaking traditional hierarchy. Unexpected pairing of elements. Bold, systematic rule-breaking.

**Extracted pattern:** Typography as structure. Rules (lines, brackets) as design elements. Asymmetry as intentional choice. The grid can be broken by a strong enough visual element.

---

#### "Nature is There to Be Loved" (Forest + Geometric Triangle Overlay)
**What it contributes:** A photograph of forest depth. A geometric triangle overlaid. The geometry does not dominate—it is a *frame*, a *viewfinder*, pointing to the nature. Restraint. One accent shape. The photograph carries weight.

**Extracted pattern:** Nature as content, not decoration. Geometric shapes can frame or point, but they do not compete. One strong visual accent per composition.

---

### Category 3: Hand-Drawn Interest Maps
**What it contributes:** Confirmation of emotional register. Made by hand. Personal notation. Imperfect. Alive. The map is not for literal reproduction in the design, but as proof-of-concept that this is a *personal* project, assembled by one human for themselves. The visual register is warm, hand-made, not sterile.

**Extracted pattern:** The entire design should feel *made*, not generated. Precision in execution, humanity in choice.

---

## Design Lineages

### Japanese Editorial Design
Japanese editorial tradition—from the 1980s through present—emphasizes **modular page units, radical negative space, quiet asymmetry, and text-as-visual-element**. See: typographic systems of Hideaki Fukuda, the grid-based layouts of Werkplaats, the field journals of Japanese nature writers. Typography carries as much meaning as language. Space is intentional. A spread can contain 80% negative space and still feel full.

**Application to FGY:** Sections are modular, stackable units. Each section can stand alone visually. Negative space above and below sections creates breathing room. Type scale changes create visual hierarchy without color or size extremes. Dates and times are visual elements, not metadata. Section numbers appear in margins. The app reads like a series of spreads, not a continuous scroll.

---

### Dutch Editorial Design (Karel Martens, Werkplaats Typografie)
Dutch design tradition emphasizes **typography-as-architecture, unexpected column breaks, bold contrast moments, systematic rule-breaking**. Rules exist to be broken *systematically*. Grids are present but visible in their breaking. Color is restrained and intentional. Tabular and numerical systems are embraced as design materials.

**Application to FGY:** The grid is visible (hairline rules separate sections). Column breaks are intentional asymmetries—a section number in the left margin, a time label bleeding to the edge, a status bar that breaks the column width. Typography does structural work. Small type sits beside large type in high contrast. The system is visible because systems are honest.

---

### Net Art / Web1.0 Personal Web
The aesthetic of the personal web (1995–2010): earnest, collectible, taxonomic, the window as **portal**, the web as **archive**, not broadcast. Geocities sites, link collections, personal servers. Each page is a *thing you've made*, not a profile you've optimized. The interface is transparent—you can see the browser chrome, the file structure, the *tool*. This is not Instagram; this is a personal project.

**Application to FGY:** The app should feel like something Mia has *assembled*, not something designed for her. Window chrome is visible and styled deliberately. The app is single-user, not social. The grid of cards is a *collection*, a *taxonomy*, not a feed. The interface celebrates structure (title bars, status bars, grids) rather than hiding it.

---

### Field Guide / Artist Book
Field guides (Peterson's birds, wildflower guides) and artist books emphasize **dense information, clear taxonomy, sectioned organization, appendices, reference formats, and repetition**. Each entry follows a template. Information is not simplified—it is *organized*. Photography is documentary, not illustrative. The book is meant to be carried, consulted, marked up.

**Application to FGY:** Sections are clearly titled and numbered. Each entry (care task, reflection, observation) follows a consistent format. Information is dense but organized. Appendices (reference guide, calendar, archive) are accessible. The app should feel like it can be "consulted" and "returned to." Margins have space for notation.

---

## Core Visual Metaphors

### The OS Window as Portal
The window frame—title bar, borders, chrome—is not a constraint. It is a **reverent structure**. Inside the frame, the world is different: warmer, greener, more intimate. The chrome makes the boundary explicit: "Here is the boundary between system and content, between tool and thing-being-tended."

**Visual rules:**
- Title bar is always present. It is 28px tall, monospace, all-caps. It reads like a file name (e.g., "CARE TASKS" or "REFLECTION.TXT").
- Border is a hairline (1px), not a thick frame. Minimalist chrome, not ornate.
- The corner radius of window panels is ≤2px. It is *barely* rounded. This is not a modern rounded card; it is a flat, boxy container.
- Status bar at the bottom is 14px, monospace, contains metadata. It reads like OS status ("3 items · today").
- Between title bar and content, there is visual separation. No ambiguity about the boundary.

---

### Nature Photography as Content (Not Decoration)
When photographs appear in FGY, they are **part of the content you're tracking**, not a design flourish. A photo of your plant. A photo of a place you visited. A weather photograph. The photograph is *data*.

**Visual rules:**
- Photographs are contained within window panels, not bleeding to edges.
- Photographs do not have decorative borders or frames applied on top.
- Photographs are shown at their natural aspect ratio (not cropped to fit a grid).
- A photograph can occupy the full width of a window panel's content area.
- Photographs are not filtered, color-graded, or stylized. They appear as captured.
- If a photograph must be compressed or low-resolution, that is acceptable—it is honest about the medium.
- Photographs are always accompanied by metadata (date, location, plant name) in monospace type.

**What NOT to do:**
- Background images or textures. Nature does not wallpaper.
- Decorative botanical illustration. Drawings are not used.
- Hero imagery or splash screens. Photographs have no precedent or framing.
- Filters or overlays. The photograph is not a design asset to be processed.

---

### Typographic Registers: Mono = System, Humanist = Content
Two typeface families carry two distinct voices:

**JetBrains Mono (all sizes, structural typography):**
- Title bars and window labels
- Section headers and numbers
- Timestamps, dates, times
- Status bar text and metadata
- Button labels
- Input field labels
- The *system* voice: clear, mechanical, trustworthy, the voice of the tool itself

**Inter (body copy and descriptions):**
- Calendar event descriptions
- Care instructions
- Reflection notes
- Supporting text
- The *content* voice: warm, conversational, human, the voice of the thing being described

These two voices never mix. A title is never in Inter. A description is never in Mono. This creates clarity: you always know if you're reading the *system* or the *content*.

---

### The Grid of Like Objects: Taxonomy as Design
When multiple objects are displayed (plants in a care list, care tasks in a day, entries in a calendar, reflections in an archive), they are arranged in a **grid**. The grid might be 1 column (mobile), 2 columns (tablet), or 3 columns (desktop). The objects within the grid are *similar* but *distinct*.

**Visual rules:**
- Grid items are contained in their own panels (cards). Each card has a title bar and border.
- Grid items are the same size within a single view. No masonry, no variable heights (unless the content itself varies, e.g., multi-line text).
- Grid gaps are consistent: 12–16px between cards.
- The grid is never hidden. Column breaks are visible. This is not a seamless layout; it is an obvious collection.
- Grid items can be tapped to expand or reveal more information.

**What NOT to do:**
- Masonry layouts that hide the grid structure.
- Items of wildly varying sizes. (Similar-sized objects look more like a collection.)
- Seamless scrolling. (The grid boundaries should be visible.)

---

### The Notepad as Reflection Space
One major interface pattern is the **Notepad Panel**: a full-height, tappable text area styled to look like a Notepad window (title bar reads "reflection.txt" or similar, monospace font, blinking cursor visible). This is the place for free-form reflection.

**Visual rules:**
- The Notepad Panel has a title bar that includes "reflection.txt" or similar.
- The content area has a white or off-white background (slightly different from the default paper color).
- The font is monospace (JetBrains Mono, 15px).
- The cursor is visible and blinking (or static if no input is active).
- Line height is generous (23px, matching other monospace UI).
- Margins inside the Notepad are 20px (matching window panel padding).
- When a user taps the Notepad, it expands to full height (or modal state on mobile).
- There is no character count, no formatting toolbar. It is pure text input.

**What NOT to do:**
- Rich text editing. The Notepad does not support bold, italic, links, etc.
- Markdown preview. The Notepad shows only raw text.
- Auto-save indicators. It simply saves.
- Character limits or warnings.

---

## Typography Direction

### Font Selection Rationale

**JetBrains Mono** (Primary / Structural)
- Monospace typeface designed for code, embraced for UI typography
- Available in variable weights (100–800)
- Clear differentiation between similar characters (0 vs O, 1 vs l)
- Geometric, modern, yet warm
- Loaded from Google Fonts (no custom hosting required)
- Used for: all titles, labels, status information, numerical data, and the *system voice*

**Inter** (Secondary / Content)
- Humanist sans-serif, designed for reading
- Variable weight, excellent readability at all sizes
- Warm, approachable, conversational tone
- Loaded from Google Fonts
- Used for: body text, descriptions, event details, reflection content, and the *content voice*

**Rationale against serifs:** Serifs belong to books, not screens. Serifs suggest permanence and authority in a way that contradicts FGY's goal of being a working document, a journal, something alive and changeable.

---

### Type Scale

All sizes are provided in px with line-height in px:

| Role | Size | Line-Height | Font | Weight | Usage |
|------|------|-------------|------|--------|-------|
| Display | 40px | 44px | JetBrains Mono | 400 | Section numbers, dates, large headings, window titles |
| Heading1 | 24px | 30px | JetBrains Mono | 700 | Section headers, major panel titles |
| Heading2 | 16px | 22px | JetBrains Mono | 400 | Sub-section labels, card titles, status messages |
| Body | 15px | 23px | Inter | 400 | Calendar descriptions, care instructions, body text, reflections |
| BodySmall | 13px | 19px | Inter | 400 | Secondary information, expanded notes, helper text |
| Micro | 11px | 14px | JetBrains Mono | 400 | Status bar text, timestamps, item counts, metadata |

**Line-height ratios:** All calculated to provide generous vertical breathing room. Minimum 1.2x, typically 1.4–1.5x.

**Letter-spacing:** None (default). Monospace fonts have built-in spacing.

**Font loading:** Both fonts are loaded from Google Fonts via `<link rel="preconnect">` and `<link rel="stylesheet">`. No custom font files or self-hosting.

---

## Color Direction

### Three-Layer Palette

The color system is deliberately three-layered, each layer carrying distinct meaning:

#### Layer 1: System Chrome (Gray)
The mechanical, the framing, the tool itself.

| Token | Hex | Use |
|-------|-----|-----|
| --color-chrome | #D4D0C8 | Default window chrome, unactive title bars, panels |
| --color-chrome-dark | #808080 | Active title bars, borders, focus rings |
| --color-chrome-light | #F0EDE8 | Hover states, secondary surface, breadcrumbs |

**Rationale:** These grays are drawn from classic OS interfaces (AmigaOS, System 7, Windows 95). They are warm (not cold blue-gray) and feel analog—like plastic from the 1990s, not cold metal. #D4D0C8 is the backbone color and appears in almost every window panel's title bar.

#### Layer 2: Content / Paper (Warm Neutrals)
The surface on which content lives.

| Token | Hex | Use |
|-------|-----|-----|
| --color-paper | #F4F1EC | Main content background, panel backgrounds, page backgrounds |
| --color-ink | #1A1917 | Primary text, body copy, headings |
| --color-ink-muted | #6B6760 | Secondary text, metadata, disabled states |
| --color-ink-ghost | rgba(26,25,23,0.07) | Hairline borders, subtle dividers, placeholder text |

**Rationale:** The paper color (#F4F1EC) is warm, cream-gray—the color of aged paper or linen, not pure white. This softens the screen and makes reading feel less harsh. The ink is near-black but slightly warm, not pure #000000. These colors together feel like a printed field journal.

#### Layer 3: Nature (Green)
The living content, the subject being tended.

| Token | Hex | Use |
|-------|-----|-----|
| --color-forest | #3D5C3A | Active states, checked items, selected sections, accent color |
| --color-moss | #7A9B76 | Secondary accent, hover states on nature-themed elements |
| --color-lichen | #C8D9C6 | Light fills, background washes, subtle backgrounds |

**Rationale:** The forest green (#3D5C3A) is deep, earthy, not bright or saturated. It recalls the interior of a forest canopy. The progression from forest (dark) to moss (mid) to lichen (pale) mirrors nature's own palette. The green is never used for danger or warning—only for positive states (checked, selected, active).

#### System UI Accents

| Token | Hex | Use |
|-------|-----|-----|
| --color-status-bar | #C0C0C0 | Status bar background, subtle dividers |
| --color-title-text | #FFFFFF | Text on active (dark) title bar |

---

### Color Contrast & Accessibility
- **Text on paper:** #1A1917 (ink) on #F4F1EC (paper) = 18.2:1 WCAG AAA
- **Secondary text:** #6B6760 (ink-muted) on #F4F1EC (paper) = 8.1:1 WCAG AA
- **Forest accent:** #3D5C3A on #F4F1EC = 6.8:1 WCAG AA
- **White text on active bar:** #FFFFFF on #808080 = 5.2:1 WCAG AA
- **Hairline borders:** rgba(26,25,23,0.07) is subtle but visible on #F4F1EC background

---

### When to Use Each Color

**Chrome/Gray:**
- Window title bars (default state)
- Borders and rules
- Disabled states
- Background of inactive sections
- Any UI chrome or structural element

**Paper/Warm Neutral:**
- All content backgrounds
- Primary text
- Body copy and descriptions
- Page backgrounds

**Green:**
- Active title bars
- Checked states (checkboxes, tasks)
- Selected navigation items
- Expanded sections (left border accent)
- Interactive hover states
- Accent moments (e.g., a single rule in forest green)

**What NOT to do:**
- Do not use color to indicate error or warning. FGY does not have "error states" with red or orange. Instead, use ink-ghost (very light) or a modal dialog.
- Do not use red, orange, or warm accent colors. Green is the only accent.
- Do not use multiple shades of green inconsistently. Stick to the three greens (forest, moss, lichen) for every state.
- Do not use pure white (#FFFFFF) or pure black (#000000) for content.

---

## What to Build vs. What to Avoid: Paired Comparison

| DO | DON'T |
|-----|--------|
| Flat, minimal window chrome with visible title bar | Rounded cards with shadows and glassmorphism |
| Monospace type for system voice (labels, times, titles) | Serif fonts or decorative scripts |
| Generous negative space and breathing room | Crowded layouts or wall-of-text designs |
| Grids of rectangular, like-sized objects | Masonry layouts or infinite scrolling |
| Photographs as content (with metadata) | Decorative illustrations or background images |
| Visible structure (hairlines, column breaks, grid gaps) | Hidden structure or seamless interfaces |
| One accent color (forest green) for all interactive states | Multiple colors for different states (red, blue, orange) |
| Quiet, contemplative interactions (no continuous animation) | Parallax, auto-play, or attention-grabbing motion |
| Modular sections that can stand alone | One long vertical feed or continuous narrative |
| Text as a design element (lists, typography, spacing) | Decoration or illustration added for visual interest |
| Dark title bar (#808080) for active sections | Bright or saturated colors for emphasis |
| Honest, visible borders and rules | Blurred edges or soft drop shadows |
| The typeface is part of the content (Notepad, system UI) | Type treated as invisible carrier of text |

---

## Section Visual Character

The guide contains approximately 10 major sections (Care Tasks, Reflections, Plants, Observations, Calendar, Archive, Settings, etc.). Each section should have a distinct visual or organizational character, while remaining consistent with the overall design language.

### Care Tasks Section
- Window Panels arranged vertically or in a flexible grid
- Each task is a ChecklistItem component (circular checkbox, tappable)
- Title bar reads "CARE TASKS"
- Status bar shows task count and due date
- When a task is marked complete, the checkbox fills with forest green and the text becomes muted
- Time labels (e.g., "9:00 AM," "2:30 PM") bleed slightly to the left margin
- The section feels like a *to-do list*, simple and actionable

### Reflections Section
- Full-height Notepad Panel (or expandable card that becomes Notepad)
- Title bar reads "REFLECTION.TXT"
- Large text input area, monospace
- Below the Notepad, a list of past reflections in reverse chronological order
- Each past reflection is a collapsed window panel with date and snippet
- Tapping a past reflection expands it to show full text
- The section feels like a *journal*, personal and archival

### Plants / Observations Section
- Grid of rectangular cards, each representing a plant or observation
- Each card is a window panel with:
  - Title bar (plant name or observation name)
  - Photograph (full width of card)
  - Metadata (date, location, condition) in Micro type
  - Expandable care details or notes
- Grid is 1 column on mobile, 2 columns on tablet, 3 columns on desktop
- The section feels like a *catalog*, taxonomic and visual

### Calendar Section
- Weekly or monthly view depending on breakpoint
- Each day is a window panel (or row of panels)
- Time blocks within each day showing events/tasks
- Times are in Mono, events in humanist type
- The section feels like a *schedule*, temporal and structured

### Archive Section
- Dense list of entries, each with date and brief descriptor
- Entries are clickable and expand to show full content
- List is searchable or filterable by date or tag
- The section feels like a *reference library*, organized and permanent

### Settings / Reference Section
- Sparse layout with few items per panel
- Clear labels and toggle switches
- Toggle switches use forest green when active
- The section feels *administrative* but not cluttered

---

## Art Direction Principles

These ten principles guide every visual decision in FGY:

1. **Chrome is honest.** The window frame is not hidden or minimized. It is styled deliberately and is part of the content. The title bar matters. The status bar matters.

2. **Green is accent, not decoration.** Forest green (#3D5C3A) is used only for interactive states: checked items, active sections, hover states, focus indicators. It never appears gratuitously. It is earned through interaction.

3. **Photographs are data.** When a photograph appears (a plant, a place, weather, sky), it is accompanied by metadata: date, location, species name. The photograph is *recorded*, not inspirational.

4. **Monospace is the system voice.** All UI text that is *not* content (labels, titles, times, status) is set in JetBrains Mono. This creates instant differentiation: you always know if you are reading the tool or the content.

5. **Negative space reveals priority.** Whitespace is not wasted space. The more space around an element, the more important it is. Crowding is discouraged.

6. **The grid is visible.** Column breaks, gaps between cards, and alignment rules are visible—sometimes as hairlines, sometimes as empty space. The structure is not invisible; it is honest.

7. **Repetition is powerful.** Lists of items (dates, times, task names) repeated in small type can be visually beautiful through typography alone, without illustration or icon embellishment.

8. **Text can be ornament.** A repeated list of plant names, a series of timestamps, or a section header in large monospace type carries visual weight. The text does not need decoration.

9. **Asymmetry is intentional.** The layout is not purely symmetrical. A time label bleeds to the margin. A section number sits in empty space. These breaks are deliberate, not accidental.

10. **The interface is a tool, not a lifestyle.** The design does not seduce or perform. It is clear, trustworthy, and direct. The user is in control. The interface gets out of the way of the content.

---

## Summary: Design as Service

Field Guide to Yourself is not a product. It is a **tool for self-knowledge**. Every visual choice—the window chrome, the green accent, the monospace type, the sparse layout—is in service of helping Mia understand her own life better. The design should disappear when it succeeds. The user should feel *agency*—they are building this, maintaining this, choosing what goes here.

The tension between system (chrome, grid, monospace) and content (green, photographs, reflection) is not contradiction. It is the whole point. Technology and nature coexist. The machine frames the living thing. And in that frame, the living thing becomes clearer.
