import type { Metadata, Viewport } from 'next';
import './globals.css';
import { HardDayProvider } from '@/context/HardDayContext';

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
  return (
    <html lang="en">
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
