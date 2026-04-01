# Deployment Plan — Field Guide to Yourself

**App:** Field Guide to Yourself (mobile-first personal life guide PWA)
**User:** Mia
**Platform:** Vercel free tier + GitHub
**Last Updated:** 2026-03-31

---

## Deployment Philosophy

This document describes the complete deployment and release strategy for Field Guide to Yourself.

**Core Principles:**

1. **Zero-Config Infrastructure:** Vercel free tier + GitHub integration. No complex CI/CD configuration needed.
2. **No Environment Variables:** Phase 1–3 content is entirely static. No secrets, API keys, or environment-specific config required.
3. **Automatic Deployments:** Main branch → auto-deploy to production. No staging environment needed for a solo project.
4. **Progressive Phases:** Ship Phase 1 (Today view + core PWA) first, then Phase 2 (all 10 guide sections) and Phase 3 (animations + desktop).
5. **Instant Rollback:** If production breaks, Vercel dashboard allows one-click rollback to previous deployment.

---

## Pre-Deployment Checklist

Complete this checklist **before** every push to the main branch.

- [ ] All QA checklist items PASS for the feature/phase being deployed
- [ ] All acceptance criteria PASS for the feature/phase being deployed
- [ ] Local build succeeds: `pnpm build` (no errors or warnings)
- [ ] No console errors in local dev (`pnpm dev` in Safari and Chrome DevTools)
- [ ] TypeScript compiles with no errors (`pnpm tsc --noEmit`)
- [ ] All feature branches are merged and no temporary code is left
- [ ] No hardcoded TODOs or FIXMEs in deployed code
- [ ] No console.log() statements left in production code (or wrapped in dev-only conditions)
- [ ] All sensitive content (passwords, API keys, personal PII) is removed or never included
- [ ] Icons and manifest files are in /public and valid
- [ ] Service worker config is correct in next.config.ts
- [ ] Tailwind CSS purge/content paths are correct
- [ ] TypeScript strict mode is enabled (tsconfig.json)
- [ ] Next.js build command is `pnpm build`
- [ ] Next.js output format is set correctly (static export or standard Next.js build)
- [ ] Vercel project is configured with correct Node.js version (≥20)
- [ ] Vercel deployment preview is tested in Safari (not just desktop Chrome)
- [ ] PWA installs on iPhone from preview URL (using iPhone 12 or equivalent)
- [ ] Offline functionality works on preview URL
- [ ] Production domain is configured (if using custom domain)
- [ ] Lighthouse scores on production URL meet targets (Performance ≥85, PWA ≥90)

---

## Environment Setup

### Local Development Setup

**Prerequisites:**
- macOS, Linux, or Windows with WSL2
- Node.js ≥20 (verify: `node --version`)
- pnpm ≥8 (install: `npm install -g pnpm`)
- Git (for cloning and pushing)
- GitHub account
- Vercel account (free tier)
- iPhone 12 or equivalent for testing (or use Chrome DevTools mobile simulation)

**Step-by-Step:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/field-guide-to-yourself.git
   cd field-guide-to-yourself
   ```

2. **Install Node.js version (if not already ≥20):**
   ```bash
   node --version  # Must be ≥20
   ```

3. **Install pnpm (if not already installed):**
   ```bash
   npm install -g pnpm@latest
   pnpm --version  # Verify ≥8
   ```

4. **Install project dependencies:**
   ```bash
   pnpm install
   ```
   (This reads pnpm-lock.yaml and installs exact versions)

5. **Start local development server:**
   ```bash
   pnpm dev
   ```
   (Server runs on http://localhost:3000)

6. **Test in Safari (on macOS) or Chrome DevTools mobile simulation:**
   - On macOS: Open http://localhost:3000 in Safari
   - On mobile (iOS): Use ngrok to tunnel local server, then visit tunneled URL on iPhone
     ```bash
     # In a separate terminal:
     npx ngrok http 3000
     # Visit https://<ngrok-url> on iPhone
     ```

7. **Run TypeScript check:**
   ```bash
   pnpm tsc --noEmit
   ```

8. **Run production build locally:**
   ```bash
   pnpm build
   pnpm start  # Start production server
   ```

---

### Vercel Project Setup

**Prerequisites:**
- GitHub account with the Field Guide repository pushed
- Vercel account (free tier)

**Step-by-Step:**

1. **Sign in to Vercel:**
   - Visit https://vercel.com
   - Click "Sign up" or "Sign in"
   - Choose GitHub as auth provider
   - Authorize Vercel to access your GitHub repositories

2. **Create a new Vercel project:**
   - Click "New Project"
   - Select the `field-guide-to-yourself` GitHub repository
   - Click "Import"

3. **Configure build settings:**
   - **Project Name:** `field-guide-to-yourself` (or desired name; Vercel suggests a default)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next` (standard Next.js) OR leave blank if using static export
   - **Install Command:** `pnpm install` (auto-detected)
   - **Environment Variables:** Leave blank (Phase 1–3 has no environment variables)

4. **Deploy:**
   - Click "Deploy"
   - Vercel runs the first build (may take 1–2 minutes)
   - On success, you'll see a "Congratulations" message and a URL (e.g., `https://field-guide-to-yourself-abc123.vercel.app`)

5. **Configure deployment branches:**
   - Go to Project Settings > Git
   - **Production Branch:** `main`
   - **Preview Branches:** (optional) Configure any staging branches
   - For a solo project, only `main` → production is needed

6. **Enable automatic deployments:**
   - This is the default; no action needed
   - Any push to `main` triggers automatic deployment
   - Deployment status is visible in Vercel Dashboard or GitHub commit status

---

### GitHub Repository Setup

**Prerequisites:**
- GitHub account
- Local repo cloned and ready to push

**Step-by-Step:**

1. **Create a new GitHub repository:**
   - Visit https://github.com/new
   - **Repository name:** `field-guide-to-yourself`
   - **Description:** "Mobile-first personal life guide PWA for Mia"
   - **Visibility:** Private (recommended) or Public
   - **Initialize:** Do NOT initialize with README (you'll push existing code)
   - Click "Create repository"

2. **Push your local code:**
   ```bash
   cd field-guide-to-yourself
   git remote add origin https://github.com/<YOUR_USERNAME>/field-guide-to-yourself.git
   git branch -M main  # Ensure main branch exists
   git push -u origin main
   ```

3. **Configure branch protection (optional but recommended):**
   - Go to Repo Settings > Branches
   - Click "Add rule" under Branch Protection Rules
   - **Branch name pattern:** `main`
   - **Require a pull request before merging:** Check (enforces code review, even for solo dev)
   - **Require status checks to pass:** Check (runs Vercel preview build)
   - Click "Create"

4. **Configure GitHub to require Vercel preview:**
   - No additional config needed; Vercel automatically adds status checks

---

### Custom Domain Setup (Optional)

**Only complete this if you want a custom domain (e.g., fieldguide.mia.com).**

**Prerequisites:**
- A custom domain registered (e.g., via Namecheap, GoDaddy, Route53)
- Vercel account

**Step-by-Step:**

1. **In Vercel Dashboard:**
   - Go to Project Settings > Domains
   - Click "Add Domain"
   - Enter your custom domain (e.g., `fieldguide.mia.com`)
   - Click "Add"

2. **Vercel shows DNS records to configure:**
   - Copy the provided DNS record (usually a CNAME or A record)

3. **In your domain registrar's DNS settings:**
   - Add the DNS record Vercel provided
   - Wait for DNS propagation (typically 15 minutes to 48 hours)

4. **Verify in Vercel:**
   - Vercel automatically detects when DNS is configured
   - Your app is now live at https://fieldguide.mia.com

**If using Vercel domains (optional):**
- Vercel offers free `.vercel.app` subdomains (e.g., `field-guide-to-yourself.vercel.app`)
- Custom domains are free to configure; no additional cost

---

## Build Configuration

### next.config.ts

**Required settings for Phase 1+:**

```typescript
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  // TypeScript strict mode
  typescript: {
    strict: true,
  },

  // Tailwind CSS output
  scss: {
    cssModule: false,
  },

  // Static export (for full static generation)
  // Uncomment if not using Next.js server:
  // output: 'export',

  // PWA configuration
  ...(process.env.NODE_ENV === "production" && {
    webpack: (config) => {
      // PWA settings here if needed
      return config;
    },
  }),
};

// Apply next-pwa
export default withPWA({
  dest: "public",
  ...nextConfig,
});
```

**Key settings:**
- `typescript.strict: true` — Enforce strict TypeScript checking
- PWA plugin enabled for service worker generation
- No environment variables required
- No API routes needed (Phase 1–3 is static content)

---

### tailwind.config.ts

**Required settings:**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        // Avoid pure white (#FFF) and pure black (#000)
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)"], // JetBrains Mono
        sans: ["var(--font-inter)"], // Inter
      },
      borderRadius: {
        // Keep max 2px for Window Panels
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px (if needed)
      },
    },
  },
  plugins: [],
};

export default config;
```

**Key settings:**
- `content` paths include all app and component directories
- No serif fonts in fontFamily
- Custom colors avoid pure white/black
- borderRadius limited appropriately

---

### tsconfig.json

**Required settings:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".next", "out", "dist"]
}
```

**Key settings:**
- `strict: true` — Enforces all type checking
- `moduleResolution: "bundler"` — For Next.js
- Path aliases (`@/*`) for clean imports

---

### pnpm-workspace.yaml (if using monorepo)

**Only needed if you split the app into multiple packages. For a solo app, skip this.**

```yaml
packages:
  - "."
```

---

### Vercel Project Configuration

**In Vercel Dashboard > Project Settings:**

1. **General:**
   - **Framework Preset:** Next.js
   - **Root Directory:** . (root of repo)

2. **Build & Development:**
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next` (or leave blank for default)
   - **Install Command:** `pnpm install`
   - **Development Command:** `pnpm dev`

3. **Environment Variables:**
   - None (leave empty)

4. **Node.js Version:**
   - **Node.js Version:** 20.x (or latest LTS)

5. **Serverless Function Configuration:**
   - **Memory:** 1024MB (default)
   - Leave all other settings as default

6. **Git:**
   - **Production Branch:** `main`
   - **Preview Branches:** (optional) Configure staging/preview branches if needed

---

## PWA Deployment Requirements

### manifest.json

**Location:** `/public/manifest.json`

**Required content:**

```json
{
  "name": "Field Guide to Yourself",
  "short_name": "Field Guide",
  "description": "Mobile-first personal life guide PWA for Mia",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#1a1a1a",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["lifestyle", "productivity"],
  "screenshots": [
    {
      "src": "/screenshot-1.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Key requirements:**
- `display: "standalone"` — App launches without Safari chrome
- `orientation: "portrait"` — Lock to portrait on iOS
- `start_url: "/"` — Launches to home (Today view)
- `icons` — At least 192px, 384px, 512px (PNG or WebP)
- `theme_color` & `background_color` — Must be valid hex colors
- `purpose: "maskable"` — For adaptive icon on Android (optional for iOS)

---

### Icon Files

**Location:** `/public/icon-*.png`

**Requirements:**

| Size | Format | Purpose |
|------|--------|---------|
| 192×192px | PNG or WebP | Smallest icon |
| 384×384px | PNG or WebP | Medium icon |
| 512×512px | PNG or WebP | Largest icon (maskable) |

**Generation:**
- Use a design tool (Figma, Sketch, Photoshop) to create 512×512px master
- Export at 192×192, 384×384, 512×512 sizes
- Verify that icon is readable at small sizes (192×192)
- For maskable icon (512px): Design with safe-zone circle in center (80% of size)

---

### next-pwa Configuration

**In next.config.ts:**

```typescript
import withPWA from "next-pwa";

export default withPWA({
  dest: "public",
  register: true, // Auto-register service worker
  skipWaiting: false, // Wait for user to activate new SW
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
  ],
});
```

**Key settings:**
- `dest: "public"` — Output service worker to /public
- `register: true` — Auto-register in client
- `runtimeCaching` — Cache fonts and images for offline use
- Service worker is generated during `pnpm build`

---

### Service Worker Registration

**In your app's root layout or _app.tsx:**

```typescript
"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered:", reg);
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });
    }
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**Next-PWA handles this automatically**, but explicit registration can be added for clarity.

---

### HTTPS Requirement

**Vercel provides automatic HTTPS** for all deployments (both .vercel.app subdomains and custom domains).

- All connections to Vercel-hosted apps are automatically HTTPS
- Service workers require HTTPS (not available on HTTP)
- No additional SSL certificate needed; Vercel handles it

---

## Release Workflow

### Phase 1 Release Process

**Goal:** Ship Today view, Morning/Evening routines, Guide index, and PWA foundation.

**Timeline:** Approximately 1–2 weeks of development.

**Pre-Release Steps:**

1. **Complete feature development:**
   - Today view with date, active block, checklists
   - Morning Routine section (Minimum + Full versions)
   - Evening Routine section
   - Bottom navigation (4 tabs)
   - Guide index listing all 10 sections
   - PWA manifest, icons, service worker config

2. **Run QA checklist:**
   - Complete all Phase 1 QA checklist items
   - Test on iPhone 12 (or equivalent)
   - Test offline functionality
   - Verify PWA installation on iOS

3. **Verify acceptance criteria:**
   - All Phase 1 acceptance criteria PASS
   - Run Lighthouse audit (target: Performance ≥85, PWA ≥90)

4. **Pre-deployment checklist:**
   - Complete the "Pre-Deployment Checklist" at the beginning of this document

5. **Local build verification:**
   ```bash
   pnpm build
   pnpm start
   # Test locally for 5–10 minutes
   ```

6. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Phase 1 release: Today view, routines, PWA foundation"
   git push origin main
   ```

7. **Vercel auto-deploys:**
   - Check Vercel Dashboard for deployment status
   - Wait for green checkmark (deployment complete)
   - URL is automatically provided

8. **Post-deployment verification:**
   - Visit production URL on iPhone 12
   - Verify Today view renders
   - Verify PWA installs from home screen
   - Verify offline functionality works
   - Run Lighthouse audit on production URL

9. **Mark as released:**
   - Create a Git tag: `git tag -a v1.0.0 -m "Phase 1: Core MVP"`
   - Push tag: `git push origin v1.0.0`
   - Update README with release notes

---

### Phase 2 Release Process

**Goal:** Ship all 10 guide sections with complete content (Care, Finance, Weekly Rhythm, Projects, Reflection).

**Timeline:** Approximately 2–4 weeks after Phase 1.

**Process:**

1. **Develop all 10 sections:**
   - Implement content from Life Guide
   - Verify verbatim phrases and cat care details
   - Implement NotepadPanel for reflection

2. **Run QA checklist:**
   - Complete all Phase 2 QA checklist items
   - Test each section for content accuracy
   - Verify cat care section with medication times

3. **Verify acceptance criteria:**
   - All Phase 2 acceptance criteria PASS

4. **Pre-deployment checklist:**
   - Complete the checklist

5. **Push to main:**
   ```bash
   git commit -m "Phase 2 release: All 10 guide sections, cat care, finance, reflection"
   git push origin main
   ```

6. **Vercel auto-deploys:**
   - Monitor deployment in Vercel Dashboard

7. **Post-deployment verification:**
   - Test all 10 sections on iPhone
   - Verify cat care content (Maisie, Meeko, third cat)
   - Verify medication times (9am, 9pm, 9:30pm)
   - Test NotepadPanel persistence
   - Run Lighthouse audit

8. **Mark as released:**
   ```bash
   git tag -a v1.1.0 -m "Phase 2: Complete guide content, cat care, finance, reflection"
   git push origin v1.1.0
   ```

---

### Phase 3 Release Process

**Goal:** Ship animations, desktop layout, and final polish.

**Timeline:** Approximately 2–3 weeks after Phase 2.

**Process:**

1. **Develop Phase 3 features:**
   - Implement Framer Motion animations
   - Test prefers-reduced-motion support
   - Implement desktop layout (768px+)
   - Add Open Graph metadata

2. **Run QA checklist:**
   - Complete all Phase 3 QA checklist items
   - Test animations on iPhone (no jank)
   - Test desktop layout at 768px, 1024px, 1440px

3. **Verify acceptance criteria:**
   - All Phase 3 acceptance criteria PASS
   - Lighthouse Accessibility ≥90, Best Practices ≥90

4. **Pre-deployment checklist:**
   - Complete the checklist

5. **Push to main:**
   ```bash
   git commit -m "Phase 3 release: Animations, desktop layout, polish"
   git push origin main
   ```

6. **Vercel auto-deploys**

7. **Post-deployment verification:**
   - Test animations on production URL
   - Test desktop layout
   - Verify reduced motion works
   - Run full Lighthouse audit

8. **Mark as released:**
   ```bash
   git tag -a v1.2.0 -m "Phase 3: Animations, desktop, polish"
   git push origin v1.2.0
   ```

---

### Ongoing Content Updates

**After Phase 1–3 shipping, content may need updates (e.g., routine changes, new cats, new projects).**

**Workflow for content-only updates:**

1. **Edit TypeScript content files:**
   - Content is stored in `.ts` files (e.g., `/src/data/routines.ts`, `/src/data/guides.ts`)
   - Edit the relevant file

2. **Test locally:**
   ```bash
   pnpm dev
   # Verify changes in browser
   ```

3. **Commit and push:**
   ```bash
   git add src/data/
   git commit -m "Update: Change X in routine/guide"
   git push origin main
   ```

4. **Vercel auto-deploys:**
   - Deployment completes in 30–60 seconds for content-only changes

5. **Verify on production:**
   - Visit production URL and refresh browser
   - Clear cache if needed (Settings > Safari > Advanced > Website Data)

---

## Rollback Procedure

**If production breaks, roll back immediately using Vercel Dashboard.**

**Step-by-Step:**

1. **Open Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Select the Field Guide project

2. **View Deployments:**
   - Click "Deployments" tab
   - See list of recent deployments (newest first)

3. **Find the last known-good deployment:**
   - Identify the deployment before the broken one
   - Look at the timestamp and Git commit

4. **Rollback:**
   - Hover over the known-good deployment
   - Click the three-dot menu (⋯)
   - Select "Promote to Production"
   - Confirm

5. **Verify rollback:**
   - Production URL now serves the previous deployment
   - Verify on iPhone that app works

6. **Investigate root cause:**
   - Check the broken commit for issues
   - Fix locally
   - Commit and push again (which will re-deploy)

**Rollback is instantaneous (< 1 minute).**

---

## Monitoring

### What to Monitor on Vercel

1. **Deployment Status:**
   - Check Vercel Dashboard > Deployments
   - All deployments should show green checkmark (success)
   - Red X indicates build failure; investigate logs

2. **Analytics (if enabled):**
   - Vercel Analytics tracks:
     - Page views
     - Unique visitors
     - Core Web Vitals (FCP, LCP, CLS, FID)
   - Navigate to Analytics tab in Vercel Dashboard

3. **Performance:**
   - Check Vercel Analytics for Core Web Vitals trends
   - LCP should remain < 1.5s
   - CLS should remain < 0.1
   - FCP should remain < 1.2s

4. **Errors:**
   - Vercel automatically logs server-side errors
   - Enable GitHub integration to see deployment status on commits
   - Check Vercel Logs for any runtime errors

---

### Actions to Take

| Issue | Action |
|-------|--------|
| Build fails | Check Vercel logs. Fix locally. Commit and re-push. |
| Lighthouse score drops | Investigate performance regressions. Check bundle size. Optimize and re-deploy. |
| Core Web Vitals degrade | Check for new animations or large assets. Optimize and re-deploy. |
| PWA score drops | Check manifest.json and service worker. Verify offline functionality. |
| High error rate | Check app logs in browser console. Rollback if critical. |

---

## Performance Verification After Deploy

**After every production deploy, run Lighthouse audit on the live URL.**

**Process:**

1. **Open production URL on desktop:**
   - Navigate to https://field-guide-to-yourself.vercel.app (or custom domain)

2. **Open Chrome DevTools:**
   - Press F12 or right-click > Inspect

3. **Run Lighthouse:**
   - Click "Lighthouse" tab in DevTools
   - Select "Mobile" (to test as mobile device)
   - Click "Analyze page load"
   - Wait for audit to complete (~60 seconds)

4. **Review results:**
   - **Performance:** Should be ≥85
   - **PWA:** Should be ≥90
   - **Accessibility:** Should be ≥90
   - **Best Practices:** Should be ≥90

5. **If scores drop:**
   - Investigate which metrics caused the drop
   - Check bundle size (Sources tab in DevTools)
   - Check for new slow network requests (Network tab)
   - Optimize and re-deploy

---

## iOS PWA Testing After Deploy

**After every production deploy, test PWA installation and offline on iPhone.**

**Equipment:**
- iPhone 12 or equivalent (iOS 16+)
- Separate from development device (to test fresh install)

**Step-by-Step:**

1. **Open Safari on iPhone:**
   - Navigate to production URL (https://field-guide-to-yourself.vercel.app or custom domain)

2. **Install PWA:**
   - Tap Share button (bottom center)
   - Scroll down, tap "Add to Home Screen"
   - Edit name if desired (default: "Field Guide to Yourself")
   - Tap "Add" (top right)
   - App icon appears on home screen

3. **Launch app:**
   - Tap home screen icon
   - App launches in standalone mode (no Safari chrome visible)
   - App should open to Today view

4. **Test offline functionality:**
   - Open Settings > Airplane Mode > ON
   - Tap home screen icon again (or switch back from Safari)
   - App should still work; cached pages should load
   - Tap navigation tabs; verify cached pages load
   - Checklist items should still work

5. **Test online again:**
   - Turn off Airplane Mode
   - Refresh app (pull down to refresh or navigate tab)
   - Fresh content should load

6. **Document results:**
   - Take screenshots of app icon, home screen, and app running
   - Note any issues or unexpected behavior
   - Report issues in GitHub Issues for tracking

---

## Troubleshooting Guide

### Service Worker Not Registering

**Symptoms:**
- PWA does not install on iPhone
- No service worker in DevTools Application > Service Workers
- Offline does not work

**Causes & Solutions:**

1. **Service worker file not generated:**
   - Verify `next.config.ts` has `withPWA` configured
   - Check that `/public/sw.js` exists after `pnpm build`
   - Rebuild: `pnpm build`
   - Restart dev server: `pnpm dev`

2. **HTTPS not enforced:**
   - Service workers require HTTPS
   - Vercel provides automatic HTTPS; no action needed
   - Local dev (http://localhost) may not register SW; use ngrok for HTTPS tunnel

3. **Manifest.json invalid:**
   - Verify `/public/manifest.json` exists
   - Validate JSON syntax (use https://jsonlint.com)
   - Check that `start_url: "/"` is correct
   - Verify all icon paths are correct

4. **next-pwa version conflict:**
   - Check compatibility with Next.js 14
   - Reinstall: `pnpm install next-pwa@latest`

---

### App Not Installing on iPhone

**Symptoms:**
- Share menu does not show "Add to Home Screen" option
- "Add to Home Screen" is grayed out or disabled

**Causes & Solutions:**

1. **Manifest.json not valid:**
   - Ensure manifest.json is in `/public`
   - Validate manifest with Web App Manifest Validator: https://www.pwabuilder.com
   - Check that `display: "standalone"` is set
   - Check that `start_url: "/"` is set

2. **Icons missing or invalid:**
   - Verify all icon files exist in `/public`
   - Icons should be PNG or WebP
   - Sizes should be 192x192, 384x384, 512x512
   - Re-export from design tool if needed

3. **Safari version too old:**
   - PWA installation requires Safari 15.1+ (iOS 15.1+)
   - Verify iPhone is on iOS 16+ (required for Phase 1)

4. **Cached manifest:**
   - Clear Safari website data: Settings > Safari > Advanced > Website Data
   - Remove any existing app (if previously added)
   - Refresh page and try again

---

### Offline Not Working

**Symptoms:**
- Service worker is registered, but offline pages don't load
- Airplane mode: pages show blank or error

**Causes & Solutions:**

1. **runtimeCaching not configured:**
   - Verify `next.config.ts` has `runtimeCaching` array
   - Check that routes to cache are listed (pages, assets)
   - Rebuild: `pnpm build`

2. **Service worker not caching pages:**
   - Check DevTools Application > Cache Storage
   - Should see cache entries for HTML, CSS, JS
   - If empty, service worker may not have activated
   - Uninstall app, clear data, reinstall

3. **Pages not pre-cached:**
   - By default, only visited pages are cached
   - To cache all pages on install, use `precache` in next-pwa config:
     ```typescript
     precache: [
       "/",
       "/guide",
       "/week",
       "/more",
     ]
     ```

4. **Old service worker still active:**
   - Uninstall app from home screen
   - Clear Safari data: Settings > Safari > Advanced > Website Data
   - Reinstall app
   - Service worker should be fresh

---

### Framer Motion Bundle Too Large

**Symptoms:**
- `pnpm build` reports JavaScript bundle > 150kb
- Lighthouse Performance score drops

**Causes & Solutions:**

1. **Unnecessary Framer Motion features:**
   - Audit which Framer Motion features are used
   - Remove unused features (Animate Presence, Drag, etc.)

2. **Tree-shaking not working:**
   - Ensure using named imports: `import { motion } from "framer-motion"`
   - Avoid default import: `import Framer from "framer-motion"`

3. **Compress/minify:**
   - Next.js automatically minifies; no action needed
   - Check that `.env.production` is not disabling minification

4. **Split into separate bundle:**
   - Use dynamic import for Framer Motion:
     ```typescript
     const motion = dynamic(() => import("framer-motion").then(mod => mod.motion), {
       ssr: false,
     });
     ```

5. **Replace with lighter library:**
   - Consider `popmotion` or CSS animations if Framer Motion is too heavy

---

### next-pwa Compatibility Issues with App Router

**Symptoms:**
- Service worker errors in console
- PWA features not working with Next.js 14 App Router

**Causes & Solutions:**

1. **next-pwa version:**
   - Ensure `next-pwa ≥5.x.x` (supports App Router)
   - Upgrade: `pnpm add next-pwa@latest`

2. **Service worker path:**
   - Verify `dest: "public"` in next-pwa config
   - Service worker should be at `/public/sw.js`

3. **Client-side registration:**
   - In App Router, register SW in a client component (use `"use client"` directive)
   - Example above in "Service Worker Registration" section

4. **Clear next cache:**
   - Delete `.next` folder: `rm -rf .next`
   - Rebuild: `pnpm build`

---

### Font Loading Issues

**Symptoms:**
- Fonts don't load (default system fonts appear)
- Layout Shift from font swap
- Slow page load due to fonts

**Causes & Solutions:**

1. **next/font not configured:**
   - In `app/layout.tsx`:
     ```typescript
     import { Jetbrains_Mono, Inter } from "next/font/google";

     const jetbrainsMono = Jetbrains_Mono({ variable: "--font-jetbrains-mono" });
     const inter = Inter({ variable: "--font-inter" });

     export default function RootLayout({ children }) {
       return (
         <html className={`${jetbrainsMono.variable} ${inter.variable}`}>
           <body>{children}</body>
         </html>
       );
     }
     ```
   - Fonts are now preloaded and optimized

2. **CSS not using variables:**
   - Verify `tailwind.config.ts` references font variables:
     ```typescript
     fontFamily: {
       mono: ["var(--font-jetbrains-mono)"],
       sans: ["var(--font-inter)"],
     }
     ```

3. **Font files not loading:**
   - Check Network tab in DevTools
   - Should see requests for `.woff2` files
   - If no requests, check next/font import

4. **Layout Shift:**
   - Use `font-display: swap` (default in next/font)
   - Or use `font-display: optional` for less aggressive fallback

---

## Security Checklist

**Before every production deploy, verify:**

- [ ] No sensitive data in repository (passwords, API keys, personal emails)
- [ ] No `.env.local` or `.env` files committed (add to `.gitignore` if not already)
- [ ] All TypeScript is type-checked: `pnpm tsc --noEmit`
- [ ] No `console.log()` or `console.error()` with sensitive data
- [ ] No hardcoded tokens or credentials anywhere in code
- [ ] localStorage is accessed safely (try/catch wrapped)
- [ ] No third-party scripts loaded from untrusted sources
- [ ] Vercel domain uses HTTPS (automatic)
- [ ] Custom domain (if used) has HTTPS certificate (Vercel auto-provides)
- [ ] No SQL injection vectors (N/A — no database, but good to note)
- [ ] No XSS vectors in dynamic content (React automatically escapes)
- [ ] No CORS issues if API calls are added later
- [ ] Git repository is private (recommended for personal app)

---

## Maintenance Plan

### Content Update Process (Monthly Review)

**Recommended:** First Friday of each month

**Process:**

1. **Review Life Guide for changes:**
   - Any routine changes?
   - Any cat care updates?
   - Any new projects or goals?
   - Any financial items to add/remove?

2. **Update TypeScript content files:**
   - Edit `/src/data/routines.ts` if routines changed
   - Edit `/src/data/guides.ts` if guide content changed
   - Edit `/src/data/cats.ts` if cat info changed

3. **Test locally:**
   - `pnpm dev`
   - Navigate app and verify changes

4. **Deploy:**
   - `git commit -m "Update: Content refresh for [month]"`
   - `git push origin main`
   - Vercel auto-deploys

5. **Verify on production:**
   - Open production URL
   - Refresh and verify changes

---

### Dependency Updates (Quarterly)

**Recommended:** First Monday of Q2, Q3, Q4

**Process:**

1. **Check for updates:**
   ```bash
   pnpm outdated
   ```

2. **Update packages:**
   ```bash
   pnpm update
   ```

3. **Test locally:**
   ```bash
   pnpm build
   pnpm start
   ```

4. **Check Lighthouse:**
   - Run Lighthouse audit locally
   - Verify scores don't drop

5. **Deploy:**
   ```bash
   git commit -m "chore: Update dependencies (Q2 2026)"
   git push origin main
   ```

6. **Verify on production:**
   - Run Lighthouse audit on production URL
   - Verify app works on iPhone

---

### Vercel Project Monitoring

**Monthly checklist:**

- [ ] Check Vercel Analytics for visitor trends
- [ ] Check Core Web Vitals in Vercel Analytics (LCP, CLS, FCP)
- [ ] Review Vercel Deployments for any failed builds
- [ ] Check for any Vercel alerts or notifications
- [ ] Verify SSL certificate is valid (Vercel auto-renews, but good to check)
- [ ] Test app on iPhone to ensure smooth performance

---

## Sign-Off

**Deployment Manager:** ________________
**Date:** ________________

**Pre-Deployment Checklist Status:** [ ] All items PASS [ ] Some items FAIL (blocking)

**Notes:**
```
(Any additional notes about deployment readiness)
```

---

**End of Deployment Plan**
