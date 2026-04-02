# Google Calendar + Gmail Setup Guide

This app integrates with your Google Calendar and Gmail to show live events and generate a daily Morning Brief via Claude AI.

Setup takes about 10–15 minutes. You'll do it once, then it runs automatically.

---

## Step 1: Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** (top bar) → **New Project**
3. Name it `life-guide-app` → **Create**

---

## Step 2: Enable the APIs

In your new project:

1. Go to **APIs & Services → Library**
2. Search for and enable **Google Calendar API** → Enable
3. Search for and enable **Gmail API** → Enable

---

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. If prompted to configure the consent screen:
   - User type: **External** → Create
   - App name: `life-guide-app`
   - User support email: your Gmail address
   - Developer contact email: your Gmail address
   - Save and continue through all screens
   - Under **Test users**, add `miasjones888@gmail.com`
4. Back at Create credentials:
   - Application type: **Desktop app**
   - Name: `life-guide-token-generator`
   - Click **Create**
5. Download the JSON, or copy the **Client ID** and **Client Secret**

---

## Step 4: Generate Your Refresh Token

In the project directory, run:

```bash
GOOGLE_CLIENT_ID=your_client_id GOOGLE_CLIENT_SECRET=your_client_secret node scripts/get-refresh-token.js
```

The script will:
1. Print a URL — open it in your browser
2. Sign in with `miasjones888@gmail.com` and authorize the app
3. Copy the authorization code shown on screen
4. Paste it back into the terminal
5. Print your `GOOGLE_REFRESH_TOKEN`

Copy that token — you'll need it in the next step.

---

## Step 5: Set Environment Variables

### Local development

Create a `.env.local` file in the project root (never commit this):

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_CALENDAR_ID=primary
ANTHROPIC_API_KEY=your_anthropic_key
```

### Vercel (production)

1. Go to your Vercel project → **Settings → Environment Variables**
2. Add each of the 5 variables above
3. Set scope to **Production** (and Preview if you want)
4. Redeploy the app

---

## Step 6: Get an Anthropic API Key (for Morning Brief)

This is optional — the app works without it, you just won't get the AI-generated daily digest.

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Go to **API Keys** → **Create Key**
4. Copy the key → add as `ANTHROPIC_API_KEY`

The Morning Brief uses `claude-haiku-4-5-20251001` (the fastest, cheapest model). Typical cost: < $0.01/day.

---

## What Each Variable Does

| Variable | Required | Purpose |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Yes | Identifies your OAuth app to Google |
| `GOOGLE_CLIENT_SECRET` | Yes | Authenticates your OAuth app |
| `GOOGLE_REFRESH_TOKEN` | Yes | Long-lived token to access your calendar and Gmail |
| `GOOGLE_CALENDAR_ID` | No | Which calendar to read. `primary` = your main calendar |
| `ANTHROPIC_API_KEY` | No | Enables the Morning Brief AI digest |

---

## What the App Can Access

| Permission | Scope | What it does |
|---|---|---|
| Google Calendar | Read + Create | Shows your real events; lets you add events from the app |
| Gmail | Read only | Reads recent unread/important emails for the daily digest |

The app **cannot** send emails, delete emails, delete calendar events, or access any other Google services.

---

## Troubleshooting

**"Google credentials not configured"** — Check that `GOOGLE_CLIENT_ID` and `GOOGLE_REFRESH_TOKEN` are set in your environment.

**"Failed to fetch calendar events"** — The refresh token may have expired (rare but possible after 6+ months of inactivity). Re-run `scripts/get-refresh-token.js` to get a new one.

**Morning Brief shows "No digest available"** — `ANTHROPIC_API_KEY` is not set, or the API call failed. Calendar events still show without it.

**Events not showing / wrong calendar** — Set `GOOGLE_CALENDAR_ID` to your specific calendar ID (found in Google Calendar Settings → your calendar → Integrate calendar → Calendar ID).

---

*Setup guide for Life Guide v1 — April 2026*
