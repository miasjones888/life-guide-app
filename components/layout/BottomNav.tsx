'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * BottomNav — 7-item primary nav, mobile.
 *
 * The Phase 1 six plus the Phase 2 library surface. No "more" drawer:
 * if it is not in the seven, it is not in the nav. /settings is
 * reachable by typing the URL or linking from elsewhere, never from
 * here.
 */
const primaryNav = [
  { href: '/today', label: 'today', icon: '◉' },
  { href: '/garden', label: 'garden', icon: '❋' },
  { href: '/calendar', label: 'calendar', icon: '▦' },
  { href: '/library', label: 'library', icon: '◫' },
  { href: '/notes', label: 'notes', icon: '▣' },
  { href: '/budget', label: 'budget', icon: '$' },
  { href: '/field-report', label: 'field report', icon: '≡' },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="bottom-nav"
      aria-label="Primary navigation"
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
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '640px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}
      >
        {primaryNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
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
                gap: '3px',
                textDecoration: 'none',
                color: isActive ? 'var(--color-forest)' : 'var(--color-ink-muted)',
                minHeight: '44px',
                borderTop: isActive
                  ? '2px solid var(--color-forest)'
                  : '2px solid transparent',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-chrome)',
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-chrome)',
                  fontSize: '10px',
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
