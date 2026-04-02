#!/usr/bin/env node
/**
 * One-time script to generate a Google OAuth refresh token.
 *
 * Run once:
 *   node scripts/get-refresh-token.js
 *
 * It will print a URL — open it in a browser, authorize the app,
 * then paste the code back into the terminal.
 * Your GOOGLE_REFRESH_TOKEN will be printed at the end.
 *
 * Requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment:
 *   GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-refresh-token.js
 */

const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Error: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set.\n');
  console.error('Usage:');
  console.error('  GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-refresh-token.js\n');
  process.exit(1);
}

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/gmail.readonly',
];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent', // force refresh_token to be returned even if already authorized
});

console.log('\n=== Google OAuth Setup ===\n');
console.log('1. Open this URL in your browser:\n');
console.log(authUrl);
console.log('\n2. Authorize the app with your Google account (miasjones888@gmail.com).');
console.log('3. Copy the authorization code shown on screen.');
console.log('4. Paste it below.\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter the authorization code: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(code.trim());
    console.log('\n=== SUCCESS ===\n');
    console.log('Add this to your .env.local (and Vercel env vars):\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\nDone. Keep this token secret — it grants access to your Calendar and Gmail.\n');
  } catch (err) {
    console.error('\nFailed to exchange code for tokens:', err.message);
    process.exit(1);
  }
});
