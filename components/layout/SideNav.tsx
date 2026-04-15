'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHardDay } from '@/context/HardDayContext';

/**
 * SideNav — 6-item primary nav, desktop.
 *
 * Mirrors BottomNav exactly. No "more" drawer, no secondary list.
 * /settings is reachable via URL, never from here.
 */
const navItems = [
  { href: '/today', label: 'today', icon: '◉' },
  { href: '/garden', label: 'garden', icon: '❋' },
  { href: '/calendar', label: 'calendar', icon: '▦' },
  { href: '/notes', label: 'notes', icon: '▣' },
  { href: '/budget', label: 'budget', icon: '$' },
  { href: '/field-report', label: 'field report', icon: '≡' },
] as const;

export default function SideNav() {
  const pathname = usePathname();
  const { isHardDay, toggle } = useHardDay();

  return (
    <nav className="side-nav" aria-label="Primary navigation">
      <div
        style={{
          padding: '12px 0 8px',
          borderBottom: '1px solid var(--color-ink-ghost)',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-chrome)',
            fontSize: '10px',
            color: 'var(--color-ink-muted)',
            letterSpacing: '0.08em',
            padding: '0 12px',
          }}
        >
          field guide
        </span>
      </div>

      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              textDecoration: 'none',
              fontFamily: 'var(--font-chrome)',
              fontSize: '11px',
              color: isActive ? 'var(--color-forest)' : 'var(--color-ink-muted)',
              borderLeft: isActive
                ? '2px solid var(--color-forest)'
                : '2px solid transparent',
              backgroundColor: isActive ? 'rgba(74,94,58,0.06)' : 'transparent',
              minHeight: '36px',
            }}
          >
            <span style={{ width: '14px', textAlign: 'center', fontSize: '10px' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Hard Day toggle */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid var(--color-ink-ghost)',
          marginTop: '8px',
        }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isHardDay}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 0',
            background: 'none',
            border: `1px solid ${
              isHardDay ? 'var(--color-ink-muted)' : 'var(--color-ink-ghost)'
            }`,
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'var(--font-chrome)',
            fontSize: '11px',
            color: isHardDay ? 'var(--color-ink)' : 'var(--color-ink-muted)',
            justifyContent: 'center',
            minHeight: '36px',
          }}
        >
          <span>{isHardDay ? '◉' : '○'}</span>
          <span>hard day mode</span>
        </button>
      </div>
    </nav>
  );
}
