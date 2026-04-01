# Design Direction — Life Guide Web App
**Updated with RR1 Reference Board Analysis**

---

## The Aesthetic Territory

Two reference boards (RR1, shared as IMG_5637–5642 and IMG_5599–5616) define the visual world this app should inhabit. They are not two separate directions — they are the same impulse viewed from different angles.

**The first cluster** (net art / early web / digital folk) establishes the typographic and structural language: Windows 98 chrome, Japanese BBS interfaces, Korean personal homepages circa 2001, dense ASCII layouts, information as decoration, early GUI widgets stripped of their context, screens inside screens, JODI-adjacent distortion, early e-commerce screencaps, hand-cursor icons, pixel icons. The operating premise is that interfaces from the early consumer web have a handmade quality — they were built by individuals for individuals, not optimized for engagement. They feel inhabited. They have a personality that contemporary design explicitly sands away.

**The second cluster** (digital-organic hybridity) establishes the emotional territory: laptops with moss and roots growing through them, CRT monitors used as planters, circuit boards colonized by ferns, a Japanese VDOLive player showing a pixelated waterfall (IMG_5614), a Windows Notepad floating over a jungle photograph (IMG_5612), a gray system dialog reading "plants are the only things that like you" (IMG_5613), PlantStudio software with its leaf wizard UI (IMG_5615), Amiga OS 3.9 running on a Yosemite desktop (IMG_5616). The visual idea across all of these is: **the digital substrate made porous by the biological**. Technology as something that can be grown through. The screen as a window into nature rather than away from it.

These two boards together describe the tension this app should live inside: **the precision of early computing meeting the indifference of organic growth**. Not warm. Not cozy. Not "naturalistic UI." Something closer to: a field guide interface. A botanical classification system. Software that knows about roots.

The critical tonal note is **indifferent accuracy**. Not whimsy. Not warmth. The dialog box that says "plants are the only things that like you" is deadpan and matter-of-fact. It is not trying to be cute. The PlantStudio leaf wizard is a serious piece of software doing serious work. The Amiga desktop with the waterfall wallpaper was someone's actual working environment. This is the register — not nostalgic performance of these aesthetics, but genuine inhabitation of the logic underneath them.

---

## Core Design Philosophy

**This is a reference tool, not an engagement tool.**

The person opening this app is often in a low-energy or overwhelmed state, looking for a quick answer: what should I do next? what is the anchor task? when is the thing due? The design must make that retrieval instant.

Design for:
- **Scanning** over reading
- **Retreating** not engaging — close the app and do the thing
- **Low friction** at every interaction point
- **Indifferent accuracy** — the interface tells you what is true, without affect

**Not:** warm, encouraging, productivity-platform, dashboard-forward, animated, gamified, whimsical.

---

## The Specific Visual Register

### What the reference boards are saying

The most articulate images in the boards:

**IMG_5612** — Windows Notepad open over a jungle/waterfall photograph. The interface sits in front of the natural world instead of replacing it. The text "aesthetic / aesthetic" spaced out in the Notepad window is itself a kind of deadpan annotation. This is the primary formal idea: the screen as transparent membrane over nature, not a wall against it.

**IMG_5613** — Gray system dialog (Japanese). "植物はあなたを好きで唯一のものです。 / plants are the only things that like you." Two OK/Cancel-style buttons (オーケー / どんな). The dialog contains photorealistic plant images on a flat gray system background. The tone is perfect: informational, undramatic, unexpectedly affecting. This is how the app should feel when it says something important.

**IMG_5614** — VDOLive Video player (Japanese) showing a pixelated waterfall/jungle scene. "5 個のオブジェクト" (5 objects). The interface is a container for the natural image — but the image is pixelated, low-res, held loosely by the chrome. This matters: the natural content does not become precious. It remains data.

**IMG_5615** — PlantStudio Plant Wizard: "Leaves." Grid-based selection interface for leaf shape, size, petiole length, angle. Green pixelated leaf icons on Windows 95 chrome. This is a system for classifying organic growth. It is the exact metaphor for what the Life Guide is: a system for classifying and tracking organic human experience using the tools of computing.

**IMG_5616** — Amiga OS 3.9 desktop, Yosemite waterfall wallpaper, multiple open windows including a CD player with green equalizer bars. This is a living, inhabited desktop environment. Functional, personal, not aestheticized. The wilderness is the wallpaper; the work is in the windows.

**IMG_5608/5609/5610** (moss/hardware series) — Technology reclaimed by biology. Cassette tapes, laptops, game cartridges with moss and plants growing through them. The hardware has become substrate. The digital object has become part of an ecosystem.

**The Notepad/jungle composite (multiple appearances)** — Windows 95/98 Notepad floating in front of jungle photography. This specific combination recurs throughout the boards. It is the anchor image: early digital tools and the natural world, coexisting without drama.

---

## Visual Language

### Color System

The app is primarily **achromatic** — the same logic as the reference images, where gray system chrome sits against full-color natural photography. The contrast is the point.

**Base palette:**

| Token | Value | Usage |
|---|---|---|
| `--color-system-bg` | `#C0C0C0` | Windows 95 system gray — used sparingly for callout blocks or terminal-mode elements |
| `--color-surface` | `#FFFFFF` | Primary content background |
| `--color-surface-paper` | `#F8F6F0` | Slightly warm white — like paper, like an old document |
| `--color-ink` | `#1A1A1A` | Primary text |
| `--color-ink-mid` | `#3A3A3A` | Secondary text |
| `--color-rule` | `#BBBBBB` | Dividers, borders |
| `--color-rule-dark` | `#888888` | Heavier rules, window chrome |
| `--color-moss` | `#4A5E3A` | Single organic accent — used only for category indicators, not fills |
| `--color-terminal` | `#00AA00` | Terminal green — for specific monospace callout moments only |

**Category color accents** (from Google Calendar system — used as 2–3px left border strips only, never fills):

| Category | Color | Hex |
|---|---|---|
| Cat care / Health | Tomato | `#D50000` |
| System maintenance | Grape | `#8E24AA` |
| Deep work | Blueberry | `#3F51B5` |
| Outside time | Basil | `#0B8043` |
| Food / Logistics | Banana | `#F6BF26` |
| Self-care / Family | Flamingo | `#E67C73` |
| Cleaning / Laundry | Graphite | `#616161` |
| Deadlines | Tangerine | `#F4511E` |
| Spirituality | Peacock | `#039BE5` |
| Learning / Studio | Sage | `#33B679` |

### Typography

The typographic reference is **system fonts and early web serifs** — not as retro performance, but as neutral accuracy.

**Heading font:** Georgia or a serif with similar letterpress quality. H1/H2 headers should have a slight typesetting weight — not a display font, not a brand font. The PlantStudio wizard uses system fonts and they look exactly right because they are not trying to be anything.

**Body font:** System UI stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` — or IBM Plex Sans. Clean, functional, zero personality of its own.

**Monospace:** `Courier New` or `IBM Plex Mono` — for timestamps, event IDs, data display, and any terminal-register content. The monospace should feel like it was printed by a system, not designed by a designer.

**Special treatment:**
- Category labels: `UPPERCASE TRACKED` in small size — like system documentation
- Time stamps: monospace, small, muted
- Urgency callouts: system dialog register — gray border, flat background, matter-of-fact text

**Font size base:** 16px body minimum. Line height 1.6–1.7. No text below 13px except timestamps.

### Interface Components

**The Window metaphor:**
Content cards can optionally reference the window-chrome of the reference boards — a thin title bar with a label, a content area, a subtle border. Not a literal Windows 95 skeuomorphism, but a nod to the containment logic. Each section of content lives in a container that has an identity.

**The Callout Block:**
A direct reference to IMG_5613 — the gray system dialog. When something important needs to be said (urgent financial action, medication reminder, system note), it should appear in a container that looks like a system message: gray or near-white background, monospace or plain text, thick border, no decoration. Informational. Unexplained. True.

Example visual register:
```
┌─────────────────────────────────────────────────┐
│ Cat morning meds — 9:00am                        │
│ Maisie + Meeko — first dose. Wet food by 10am.   │
└─────────────────────────────────────────────────┘
```

**The Timeline:**
The daily rhythm view should resemble something between a biological taxonomy table (PlantStudio) and a BBS post list (from RR1 boards 1–6): monospaced or tightly typeset time labels on the left, event titles on the right, a faint rule between each row. Very close to how a system log looks.

**The Window-Over-Nature motif:**
At the app level — not the component level — there is an opportunity to use organic imagery as background context. A very low-opacity botanical photograph or texture could sit under the primary content surface, visible only at the edges. The interface floats over the world. It does not replace it. This should be implemented very subtly if at all — the point is barely-there, not decorative.

### Texture and Details

Small details from the boards that should inform the micro-visual language:

- **Pixel-precision borders** — 1px solid rules, not blurred or rounded into softness
- **Dithering patterns** — optional texture for loading states or background areas, referencing early digital graphics
- **Screen-within-screen** — small embedded content panels should feel like windows inside windows. The app is a container; its sections are containers.
- **Dead-media awareness** — the reference to cassette tapes, VHS players, CD-ROM interfaces is about obsolescence as texture. The app does not need to look like obsolete software, but it should know about obsolescence. Things end. Systems close.
- **Green as organic** — the terminal green (#00AA00) that appears in equalizer bars and pixel foliage throughout the boards is the single allowed "accent" color in the technical sense. Used for: active states, category indicators, the moss accent. Never decorative.

---

## Layout Principles

### Mobile First

Primary use case: phone, one hand, quick lookup, close and act.

- Single column
- Generous tap targets (44px minimum)
- No horizontal scroll
- Bottom navigation or sticky top nav
- Readable at arm's length without zooming

### The Grid

Reference the BBS/early web density. Content can be packed tighter than contemporary mobile design norms suggest. Users of reference-style tools are not scrolling for discovery — they are looking for something specific. Dense is fine if structured.

### Hierarchy via Weight and Space

The RR1 boards avoid color hierarchy almost entirely — structure comes from:
- Weight difference (bold vs. regular)
- Size difference (large header vs. small label)
- Spatial separation (whitespace as punctuation)
- Rule lines (thin rules as dividers, not color bands)

Apply this same logic. No color backgrounds for sections. No gradients. No rounded cards as a primary organizational tool. Sections are separated by rules and space, not by colored containers.

---

## Interaction Notes

### Expand / Collapse

Content that can be expanded should reference the **file tree** or **file drawer** model from early OS interfaces (visible in the Amiga OS and Windows screenshots throughout the boards). The collapsed state shows just enough — a title and a minimal indicator. Expanding reveals the full content. The transition should be instant or near-instant, not animated.

### Urgency

Urgent items should feel like **system alerts** — not app-push-notification design, not red badges. The system dialog model from IMG_5613: a bordered container, plain text, no iconography, no color fill. The urgency is in the content, not the styling.

### Navigation

The app is a reference system. Navigation should feel like moving between sections of a manual or BBS board — categorical, clear, linear. Not a swipe-based discovery interface.

---

## What to Avoid

Explicitly **not** the direction:

- Rounded corners on everything (contemporary iOS/Material vocabulary)
- Gradient backgrounds or colored section fills
- Illustration or decorative iconography
- Progress bars, streak counters, completion metrics
- Any animation that lasts more than 100ms
- "Wellness app" color palettes (sage green, warm beige, soft pink as brand colors)
- Dark mode as the primary experience
- Whimsy of any kind
- The appearance of having been "designed" in the contemporary sense

The reference boards include exactly zero contemporary productivity app design. They include exactly zero Material Design. They include exactly zero Airbnb/Stripe/Linear aesthetic influence. This is not an accident.

---

## Reference Image Index

All reference images are in `assets/reference-images/`.

### Primary design references (highest influence on visual direction)

| File | Description | What it informs |
|---|---|---|
| IMG_5612.png | Windows Notepad over jungle waterfall photograph | The foundational motif — interface over nature |
| IMG_5600–5603 | "Plants are the only things that like you" gray dialog series | Callout block register, system dialog tone |
| IMG_5599.jpeg | VDOLive player with pixelated waterfall | Container-for-nature, low-res organic content |
| IMG_5615.png | PlantStudio Plant Wizard (leaf classification) | The app as field guide / classification system metaphor |
| IMG_5616.png | Amiga OS 3.9 desktop, Yosemite wallpaper | Inhabited desktop, multiple open windows, nature as context |

### Net art / early web references (structural and typographic direction)

| File | Description | What it informs |
|---|---|---|
| IMG_5637.png | RR1 board — net art, early web screencaps | Overall information density and layout logic |
| IMG_5638.png | RR1 board — Korean/Japanese personal homepages, widgets | Typography, dense layout, early web chrome |
| IMG_5639.png | RR1 board — ASCII, data display, print/publication | Typography, editorial structure |
| IMG_5640.png | RR1 board — portfolio sites, Behance, net art | Interface as personal space |
| IMG_5641.png | RR1 board — net art, early web browsers, glitch | Interface decay, screens inside screens |
| IMG_5642.png | RR1 board — more net art and early web imagery | Information density, annotation as form |

### Digital-organic hybridity references

| File | Description | What it informs |
|---|---|---|
| IMG_5608.png | Technology overgrown with moss/plants | The substrate idea — digital objects colonized by growth |
| IMG_5609.png | Plant growing over CRT/hardware | Same — physical tech as biological substrate |
| IMG_5610.png | Multiple overgrown tech objects | Same series |
| IMG_5611.png | More overgrown hardware | Same series |
| IMG_5599–5607 | Extended digital-organic series | Full visual territory of the boards |

### Content context (not design reference)
- IMG_5702.png, IMG_5704.png, IMG_5705.png — iMessage screenshots with scheduling information

---

## Technology Suggestions for Claude Code

Stack recommendation based on the design direction:

**Framework:** Next.js with static generation — content is static markdown, no backend needed for v1. Good for performance on mobile.

**Styling:** CSS custom properties + vanilla CSS. The default Tailwind component aesthetic is the opposite of what this app needs — if using Tailwind, the defaults must be overridden aggressively and no component library defaults should be used.

**Typography:** System font stack for body, Georgia for headings. Load nothing from Google Fonts — system fonts are the point.

**Content rendering:** Markdown to HTML. All guide content is in `docs/life-guide-v1.md` — parse and render rather than hardcoding.

**State:** Minimal. This is a read-only reference app. localStorage for simple persistence (last section visited, etc.) but no complex state management for v1.

**Deployment:** Vercel or Netlify. Static export. No server.

**Do not use:** Component libraries with default styling (shadcn, MUI, Chakra, etc.), animation libraries, any library whose primary purpose is "beautiful by default."
