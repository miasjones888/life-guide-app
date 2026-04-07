'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { systemVersionNote } from '@/content/guide';

const primaryNav = [
  { href: '/', label: 'today', icon: '◉' },
  { href: '/guide', label: 'guide', icon: '≡' },
  { href: '/weekly', label: 'week', icon: '▦' },
];

const secondaryNav = [
  { href: '/daily', label: 'daily rhythm' },
  { href: '/monthly', label: 'monthly' },
  { href: '/folders', label: 'folders' },
  { href: '/deck', label: 'deck' },
  { href: '/reflection', label: 'reflection' },
  { href: '/budget', label: 'budget' },
  { href: '/culture', label: 'culture' },
  { href: '/growth', label: 'life navigation' },
];

export default function SideNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <nav
      style={{
        width: '200px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-chrome)',
        borderRight: '1px solid var(--color-ink-ghost)',
        overflowY: 'auto',
      }}
      aria-label="Primary navigation"
    >
      {/* Logo / title */}
      <div
        style={{
          padding: '16px 14px 12px',
          borderBottom: '1px solid var(--color-ink-ghost)',
        }}
      >
        <span
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '11px',
            color: 'var(--color-ink-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Field Guide
        </span>
      </div>

      {/* Primary nav */}
      <div style={{ padding: '8px 0' }}>
        {primaryNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 14px',
                textDecoration: 'none',
                fontFamily: 'Courier New, monospace',
                fontSize: '12px',
                color: active ? 'var(--color-forest)' : 'var(--color-ink)',
                borderLeft: active ? '2px solid var(--color-forest)' : '2px solid transparent',
                backgroundColor: active ? 'rgba(74, 94, 58, 0.06)' : 'transparent',
              }}
            >
              <span style={{ fontSize: '13px', lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          borderTop: '1px solid var(--color-ink-ghost)',
          margin: '4px 0',
        }}
      />

      {/* Secondary nav */}
      <div style={{ padding: '4px 0', flex: 1 }}>
        {secondaryNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 14px',
                textDecoration: 'none',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px',
                color: active ? 'var(--color-forest)' : 'var(--color-ink-muted)',
                borderLeft: active ? '2px solid var(--color-forest)' : '2px solid transparent',
                backgroundColor: active ? 'rgba(74, 94, 58, 0.06)' : 'transparent',
              }}
            >
              {active && (
                <span style={{ color: 'var(--color-forest)', fontSize: '7px', marginRight: '6px' }}>◉</span>
              )}
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Version footer */}
      <div
        style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--color-ink-ghost)',
        }}
      >
        <p
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '9px',
            color: 'var(--color-ink-ghost)',
            lineHeight: 1.4,
          }}
        >
          {systemVersionNote}
        </p>
      </div>
    </nav>
  );
}
