'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const primaryNav = [
  { href: '/', label: 'today', icon: '◉' },
  { href: '/guide', label: 'guide', icon: '≡' },
  { href: '/weekly', label: 'week', icon: '▦' },
];

const moreItems = [
  { href: '/daily', label: 'daily rhythm' },
  { href: '/monthly', label: 'monthly' },
  { href: '/deck', label: 'deck' },
];

const moreHrefs = moreItems.map((i) => i.href);

export default function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isMoreActive = moreHrefs.some((h) => pathname.startsWith(h));

  function handleMoreToggle() {
    setShowMore((v) => !v);
  }

  function handleMoreItemClick() {
    setShowMore(false);
  }

  return (
    <>
      {/* More drawer */}
      {showMore && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowMore(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 98,
            }}
          />
          {/* Sheet */}
          <div
            style={{
              position: 'fixed',
              bottom: '56px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-chrome)',
              borderTop: '1px solid var(--color-ink-ghost)',
              zIndex: 99,
              padding: '4px 0',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            {moreItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMoreItemClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    textDecoration: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: isActive ? 'var(--color-forest)' : 'var(--color-ink)',
                    borderBottom: '1px solid var(--color-ink-ghost)',
                    gap: '10px',
                  }}
                >
                  {isActive && (
                    <span style={{ color: 'var(--color-forest)', fontSize: '8px' }}>◉</span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Nav bar */}
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
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={handleMoreToggle}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              borderTop: isMoreActive || showMore
                ? '2px solid var(--color-forest)'
                : '2px solid transparent',
              color: isMoreActive || showMore
                ? 'var(--color-forest)'
                : 'var(--color-ink-muted)',
              cursor: 'pointer',
              minHeight: '44px',
              padding: '0',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px',
                lineHeight: 1,
              }}
            >
              ···
            </span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                lineHeight: 1,
              }}
            >
              more
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
