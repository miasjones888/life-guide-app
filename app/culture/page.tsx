'use client';

import React, { useState, useMemo } from 'react';
import PageShell from '@/components/layout/PageShell';
import WindowPanel from '@/components/ui/WindowPanel';
import WishlistCard from '@/components/culture/WishlistCard';
import TikTokImporter from '@/components/culture/TikTokImporter';
import AddManualItem from '@/components/culture/AddManualItem';
import { useWishlist } from '@/hooks/useWishlist';
import type { WishlistCategory, WishlistItem } from '@/content/types';

type Tab = WishlistCategory | 'all' | 'done';

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'all' },
  { id: 'movie', label: 'movies' },
  { id: 'show', label: 'shows' },
  { id: 'book', label: 'books' },
  { id: 'experience', label: 'experiences' },
  { id: 'want', label: 'want' },
  { id: 'other', label: 'other' },
  { id: 'done', label: 'done' },
];

const CATEGORY_COLORS: Record<WishlistCategory, string> = {
  want: '#E67C73',
  experience: '#33B679',
  movie: '#3F51B5',
  show: '#8E24AA',
  book: '#F4511E',
  other: '#616161',
};

export default function CulturePage() {
  const { items, addItem, importItems, markDone, updateCategory, deleteItem } = useWishlist();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showImporter, setShowImporter] = useState(false);
  const [showAddManual, setShowAddManual] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const activeItems = useMemo(() => items.filter((item) => !item.done), [items]);
  const doneItems = useMemo(() => items.filter((item) => item.done), [items]);

  const filteredItems = useMemo((): WishlistItem[] => {
    if (activeTab === 'done') return doneItems;
    if (activeTab === 'all') return activeItems;
    return activeItems.filter((item) => item.category === activeTab);
  }, [activeTab, activeItems, doneItems]);

  function handleImport(incoming: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>[]) {
    const count = importItems(incoming);
    setImportStatus(`${count} item${count !== 1 ? 's' : ''} added.`);
    setTimeout(() => setImportStatus(null), 5000);
  }

  function tabCount(tab: Tab): number {
    if (tab === 'done') return doneItems.length;
    if (tab === 'all') return activeItems.length;
    return activeItems.filter((item) => item.category === tab).length;
  }

  const statusText = `${activeItems.length} active · ${doneItems.length} done`;

  const tabBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    overflowX: 'auto',
    padding: '2px 0 4px',
    WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
  };

  function tabBtnStyle(tab: Tab): React.CSSProperties {
    const isActive = activeTab === tab;
    const isDoneTab = tab === 'done';
    const catColor = !isDoneTab && tab !== 'all'
      ? CATEGORY_COLORS[tab as WishlistCategory]
      : undefined;

    return {
      flexShrink: 0,
      padding: '4px 10px',
      fontFamily: 'Courier New, monospace',
      fontSize: '10px',
      lineHeight: 1.3,
      border: '1px solid',
      borderRadius: '2px',
      cursor: 'pointer',
      minHeight: '28px',
      backgroundColor: isActive ? (catColor ?? 'var(--color-ink)') : 'transparent',
      borderColor: isActive ? (catColor ?? 'var(--color-ink)') : (catColor ?? 'var(--color-ink-ghost)'),
      color: isActive ? '#fff' : (catColor ?? 'var(--color-ink-muted)'),
    };
  }

  return (
    <PageShell>
      {showImporter && (
        <TikTokImporter
          onImport={handleImport}
          onClose={() => setShowImporter(false)}
        />
      )}
      {showAddManual && (
        <AddManualItem
          onAdd={(data) => addItem(data)}
          onClose={() => setShowAddManual(false)}
        />
      )}

      <div style={{ padding: '8px 0 4px' }}>
        <h1 className="text-h1">Culture</h1>
        <p className="text-body-sm text-ink-muted" style={{ marginTop: '4px' }}>
          Movies, shows, books, experiences, and things you want.
        </p>
      </div>

      <hr className="hairline" style={{ margin: '10px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setShowImporter(true)}
            style={{
              flex: 1,
              minHeight: '44px',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              border: '1px solid var(--color-ink-ghost)',
              borderRadius: '2px',
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--color-ink)',
            }}
          >
            import from TikTok
          </button>
          <button
            type="button"
            onClick={() => setShowAddManual(true)}
            style={{
              flex: 1,
              minHeight: '44px',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              backgroundColor: 'var(--color-chrome-dark)',
              color: '#fff',
            }}
          >
            + add manually
          </button>
        </div>

        {importStatus && (
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '11px',
            color: 'var(--color-ink-muted)',
            margin: 0,
            padding: '6px 8px',
            backgroundColor: 'var(--color-chrome)',
            border: '1px solid var(--color-ink-ghost)',
            borderRadius: '2px',
          }}>
            {importStatus}
          </p>
        )}

        {/* Tab bar */}
        <div style={tabBarStyle}>
          {TABS.map(({ id, label }) => {
            const count = tabCount(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                style={tabBtnStyle(id)}
              >
                {label}{count > 0 ? ` (${count})` : ''}
              </button>
            );
          })}
        </div>

        {/* List */}
        <WindowPanel
          title={activeTab === 'done' ? 'done' : activeTab === 'all' ? 'all lists' : activeTab}
          active={filteredItems.length > 0}
          statusText={statusText}
        >
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="text-body-sm" style={{ margin: 0 }}>
                Your lists are empty.
              </p>
              <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
                Import your TikTok saved videos or add items manually.
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
              {activeTab === 'done'
                ? 'Nothing marked as done yet.'
                : `No ${activeTab === 'all' ? 'active' : activeTab} items yet.`}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onDone={markDone}
                  onDelete={deleteItem}
                  onCategoryChange={updateCategory}
                />
              ))}
            </div>
          )}
        </WindowPanel>

        {/* TikTok export how-to (when list is empty) */}
        {items.length === 0 && (
          <WindowPanel title="how to import from TikTok">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
                TikTok doesn&apos;t have a public API for saved videos, but you can download your data directly from them.
              </p>
              <ol style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--color-ink-muted)',
                margin: 0,
                paddingLeft: '18px',
                lineHeight: 1.7,
              }}>
                <li>In TikTok: Profile → Menu → Settings → Privacy</li>
                <li>Personalization and data → Request data</li>
                <li>Choose JSON format → Request data</li>
                <li>Wait 1–2 days for the email notification</li>
                <li>Download the ZIP → find <code style={{ fontFamily: 'Courier New, monospace', fontSize: '12px' }}>favorite_videos.json</code></li>
                <li>Tap &quot;import from TikTok&quot; above and upload that file</li>
              </ol>
              <p className="text-body-sm text-ink-muted" style={{ margin: 0 }}>
                AI will auto-categorize your saved videos. You can adjust any category before saving.
              </p>
            </div>
          </WindowPanel>
        )}
      </div>
    </PageShell>
  );
}
