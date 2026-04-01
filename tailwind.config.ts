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
        'ink-muted': '#6B6760',
        'ink-ghost': 'rgba(26,25,23,0.07)',
        forest: '#3D5C3A',
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
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
