import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IM_Fell_English, DM_Serif_Display, VT323 } from 'next/font/google';
import './globals.css';
import { HardDayProvider } from '@/context/HardDayContext';

// ─── Typography stack ────────────────────────────────────────────────────
// Self-hosted via next/font/google — no CDN <link>s. All four fonts are
// exposed as CSS variables and consumed from globals.css so the rest of
// the app never imports next/font directly.
//
//   IBM Plex Mono       → chrome / micro text / time labels / tags
//   IM Fell English     → journal body (the drawer in Step 3)
//   DM Serif Display    → display + headings
//   VT323               → monospace accents (version footer etc.)
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const fellEnglish = IM_Fell_English({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-fell',
  display: 'swap',
  // next/font has no override metrics for IM Fell English; opt out of
  // the automatic fallback size adjustment so the build stays quiet.
  adjustFontFallback: false,
});

const serifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif-display',
  display: 'swap',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Field Guide to Yourself',
  description: "Mia's personal life reference system — Field Guide v1",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Field Guide',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4D0C8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = [
    plexMono.variable,
    fellEnglish.variable,
    serifDisplay.variable,
    vt323.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-chrome min-h-screen">
        <HardDayProvider>
          {children}
        </HardDayProvider>
      </body>
    </html>
  );
}
