# Google OAuth2 Setup

One-time setup to connect Google Calendar (and Gmail) to the app.
Takes about 10 minutes.

---

## Step 1 — Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown (top left) → **New Project**
3. Name it something like `life-guide-app` → **Create**
4. Make sure the new project is selected in the dropdown

---

## Step 2 — Enable the APIs

1. Go to **APIs & Services → Library**
2. Search for and enable both:
   - **Google Calendar API**
   - **Gmail API**

---

## Step 3 — Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** → **Create**
3. Fill in required fields:
   - App name: `Life Guide`
   - User support email: your Gmail address
   - Developer contact email: your Gmail address
4. Click **Save and Continue** through the Scopes and Test Users screens
5. On the Test Users screen, click **Add Users** and add `miasjones888@gmail.com`
6. Click **Save and Continue** → **Back to Dashboard**

---

## Step 4 — Create OAuth2 credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. Application type: **Desktop app**
4. Name: `life-guide-local` → **Create**
5. Copy and save your **Client ID** and **Client Secret** — you'll need them next

---

## Step 5 — Get a refresh token via OAuth2 Playground

1. Go to [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
2. Click the gear icon (top right) → check **Use your own OAuth credentials**
3. Paste your **Client ID** and **Client Secret** → close the panel
4. In the left panel, find and select these scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://mail.google.com/`
5. Click **Authorize APIs** → sign in with `miasjones888@gmail.com` → Allow
6. Click **Exchange authorization code for tokens**
7. Copy the **Refresh token** value

---

## Step 6 — Add credentials to your environment

Create a `.env.local` file in the project root (copy from `.env.local.example`):

```
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REFRESH_TOKEN=your-refresh-token-here
```

For Vercel deployment, add these same values as **Environment Variables** in your Vercel project settings.

---

## Notes

- The refresh token does not expire unless you revoke access or change your Google password
- The app only accesses the calendars listed in `lib/google-calendar.ts` (Events, Appointments, Social Life, Time Off)
- No data is stored anywhere — the app fetches live on each assistant request
- To revoke access at any time: Google Account → Security → Third-party apps → Life Guide → Remove
