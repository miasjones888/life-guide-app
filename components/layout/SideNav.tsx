'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHardDay } from '@/context/HardDayContext';

const navItems = [
  { href: '/', label: 'today', icon: '◉' },
  { href: '/guide', label: 'guide', icon: '≡' },
  { href: '/weekly', label: 'week', icon: '▦' },
  { href: '/daily', label: 'daily rhythm', icon: '│' },
  { href: '/monthly', label: 'monthly', icon: '◫' },
  { href: '/folders', label: 'folders', icon: '▣' },
  { href: '/deck', label: 'deck', icon: '▤' },
  { href: '/reflection', label: 'reflection', icon: '○' },
  { href: '/budget', label: 'budget', icon: '$' },
  { href: '/backup', label: 'backup', icon: '↓' },
];

export default function SideNav() {
  const pathname = usePathname();
  const { isHardDay, toggle } = useHardDay();

  return (
    <nav className="side-nav" aria-label="Primary navigation">
      <div style={{ padding: '12px 0 8px', borderBottom: '1px solid var(--color-ink-ghost)', marginBottom: '4px' }}>
        <span
          style={{
            fontFamily: 'Courier New, monospace',
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
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: isActive ? 'var(--color-forest)' : 'var(--color-ink-muted)',
              borderLeft: isActive ? '2px solid var(--color-forest)' : '2px solid transparent',
              backgroundColor: isActive ? 'rgba(74,94,58,0.06)' : 'transparent',
              minHeight: '36px',
            }}
          >
            <span style={{ width: '14px', textAlign: 'center', fontSize: '10px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Hard Day toggle */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--color-ink-ghost)', marginTop: '8px' }}>
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
            border: `1px solid ${isHardDay ? 'var(--color-ink-muted)' : 'var(--color-ink-ghost)'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
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
