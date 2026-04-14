import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chrome: '#D4D0C8',
        'chrome-dark': '#808080',
        'chrome-light': '#F0EDE8',
        paper: '#F4F1EC',
        ink: '#1A1917',
        'ink-1': '#1A1917',
        'ink-2': '#33302C',
        'ink-3': '#4F4B45',
        'ink-4': '#6B6760',
        'ink-muted': '#4F4B45',
        'ink-ghost': 'rgba(26,25,23,0.12)',
        'border-1': 'rgba(26,25,23,0.28)',
        'border-2': 'rgba(26,25,23,0.18)',
        'border-3': 'rgba(26,25,23,0.12)',
        forest: '#4A5E3A',
        moss: '#7A9B76',
        lichen: '#C8D9C6',
        'status-bar': '#C0C0C0',
        'title-text': '#FFFFFF',
        // Calendar category colors
        tomato: '#D50000',
        grape: '#8E24AA',
        blueberry: '#3F51B5',
        basil: '#0B8043',
        banana: '#F6BF26',
        flamingo: '#E67C73',
        graphite: '#616161',
        tangerine: '#F4511E',
        peacock: '#039BE5',
        sage: '#33B679',
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'Courier New', 'monospace'],
        chrome: ['var(--font-plex-mono)', 'IBM Plex Mono', 'Courier New', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-serif-display)', 'DM Serif Display', 'Georgia', 'Times New Roman', 'serif'],
        display: ['var(--font-serif-display)', 'DM Serif Display', 'Georgia', 'Times New Roman', 'serif'],
        journal: ['var(--font-fell)', 'IM Fell English', 'Georgia', 'Times New Roman', 'serif'],
        accent: ['var(--font-vt)', 'VT323', 'Courier New', 'monospace'],
      },
      fontSize: {
        display: ['40px', { lineHeight: '1.1', fontWeight: '400' }],
        h1: ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['16px', { lineHeight: '1.3', fontWeight: '400' }],
        body: ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        micro: ['11px', { lineHeight: '1.3', fontWeight: '400' }],
      },
      borderWidth: {
        '1': '1px',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
