'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Today', icon: '◉' },
  { href: '/daily', label: 'Daily', icon: '⊡' },
  { href: '/weekly', label: 'Weekly', icon: '▦' },
  { href: '/monthly', label: 'Monthly', icon: '▣' },
  { href: '/guide', label: 'Guide', icon: '≡' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '56px',
        backgroundColor: 'var(--color-chrome)',
        borderTop: '1px solid var(--color-ink-ghost)',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 100,
      }}
    >
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              textDecoration: 'none',
              backgroundColor: isActive ? 'var(--color-chrome-dark)' : 'transparent',
              color: isActive ? 'var(--color-title-text)' : 'var(--color-ink-muted)',
              minHeight: '44px',
              transition: 'background-color 0.1s',
            }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', lineHeight: 1 }}>
              {item.icon}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', lineHeight: 1 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
