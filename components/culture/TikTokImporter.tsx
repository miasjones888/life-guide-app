'use client';

import React, { useState, useRef } from 'react';
import type { WishlistCategory, WishlistItem } from '@/content/types';

interface TikTokFavoriteEntry {
  Link?: string;
  Date?: string;
}

interface ParsedVideo {
  url: string;
  title: string;
  author: string;
  thumbnail?: string;
  category: WishlistCategory;
}

interface TikTokImporterProps {
  onImport: (items: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>[]) => void;
  onClose: () => void;
}

type Step = 'upload' | 'loading' | 'preview' | 'done';

const CHUNK_SIZE = 20; // categorize 20 titles at a time

async function fetchOEmbed(url: string): Promise<{ title: string; author: string; thumbnail?: string } | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      title?: string;
      author_name?: string;
      thumbnail_url?: string;
    };
    return {
      title: data.title ?? url,
      author: data.author_name ?? '',
      thumbnail: data.thumbnail_url,
    };
  } catch {
    return null;
  }
}

async function categorizeTitles(titles: string[]): Promise<WishlistCategory[]> {
  // Phase 0: /api/categorize was part of the invented AI cluster and has been
  // archived. Everything defaults to 'other' until users re-categorize manually
  // in the preview step.
  return titles.map(() => 'other' as WishlistCategory);
}

function extractUrlsFromJson(json: unknown): string[] {
  // TikTok export: favorite_videos.json has { FavoriteVideoList: [ { Link, Date }, ... ] }
  // Also handle the top-level Activity.FavoriteVideoList structure
  if (!json || typeof json !== 'object') return [];

  const obj = json as Record<string, unknown>;

  // Direct: { FavoriteVideoList: [...] }
  if (Array.isArray(obj['FavoriteVideoList'])) {
    return (obj['FavoriteVideoList'] as TikTokFavoriteEntry[])
      .map((entry) => entry?.Link ?? '')
      .filter(Boolean);
  }

  // Nested: { Activity: { FavoriteVideoList: [...] } }
  const activity = obj['Activity'];
  if (activity && typeof activity === 'object') {
    const act = activity as Record<string, unknown>;
    if (Array.isArray(act['FavoriteVideoList'])) {
      return (act['FavoriteVideoList'] as TikTokFavoriteEntry[])
        .map((entry) => entry?.Link ?? '')
        .filter(Boolean);
    }
  }

  // Also check for a flat array of strings (user pasted URLs)
  if (Array.isArray(obj)) {
    return (obj as unknown[])
      .filter((item) => typeof item === 'string' && item.includes('tiktok.com'))
      .map((item) => item as string);
  }

  return [];
}

export default function TikTokImporter({ onImport, onClose }: TikTokImporterProps) {
  const [step, setStep] = useState<Step>('upload');
  const [pastedJson, setPastedJson] = useState('');
  const [preview, setPreview] = useState<ParsedVideo[]>([]);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-paper)',
    border: '1px solid var(--color-ink-ghost)',
    borderRadius: '2px',
    padding: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const btnStyle: React.CSSProperties = {
    minHeight: '44px',
    fontFamily: 'Courier New, monospace',
    fontSize: '13px',
    border: '1px solid var(--color-ink-ghost)',
    borderRadius: '2px',
    cursor: 'pointer',
    background: 'transparent',
    color: 'var(--color-ink)',
  };

  async function processUrls(urls: string[]) {
    setStep('loading');
    setError('');

    if (urls.length === 0) {
      setError('No TikTok URLs found in that file. Make sure you\'re uploading favorite_videos.json from your TikTok data export.');
      setStep('upload');
      return;
    }

    // Cap at 100 to avoid excessive API calls
    const urlsToProcess = urls.slice(0, 100);

    // Fetch oEmbed for each URL (in parallel, batched 5 at a time)
    const videos: Array<ParsedVideo | null> = new Array(urlsToProcess.length).fill(null);
    const BATCH = 5;
    for (let i = 0; i < urlsToProcess.length; i += BATCH) {
      setProgress(`Fetching video info... ${Math.min(i + BATCH, urlsToProcess.length)} / ${urlsToProcess.length}`);
      const batch = urlsToProcess.slice(i, i + BATCH);
      const results = await Promise.all(batch.map(fetchOEmbed));
      results.forEach((result, j) => {
        videos[i + j] = result
          ? { url: urlsToProcess[i + j], title: result.title, author: result.author, thumbnail: result.thumbnail, category: 'other' }
          : { url: urlsToProcess[i + j], title: urlsToProcess[i + j], author: '', category: 'other' };
      });
    }

    const validVideos = videos.filter((v): v is ParsedVideo => v !== null);

    // Categorize in chunks
    const titles = validVideos.map((v) => v.title);
    const allCategories: WishlistCategory[] = [];
    for (let i = 0; i < titles.length; i += CHUNK_SIZE) {
      setProgress(`Categorizing... ${Math.min(i + CHUNK_SIZE, titles.length)} / ${titles.length}`);
      const chunk = titles.slice(i, i + CHUNK_SIZE);
      const cats = await categorizeTitles(chunk);
      allCategories.push(...cats);
    }

    // Assign categories
    const withCategories: ParsedVideo[] = validVideos.map((v, i) => ({
      ...v,
      category: allCategories[i] ?? 'other',
    }));

    setPreview(withCategories);
    setProgress('');
    setStep('preview');
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as unknown;
        const urls = extractUrlsFromJson(parsed);
        await processUrls(urls);
      } catch {
        setError('Could not read that file. Make sure it\'s a valid JSON file from your TikTok data export.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  async function handlePaste() {
    if (!pastedJson.trim()) return;
    try {
      const parsed = JSON.parse(pastedJson) as unknown;
      const urls = extractUrlsFromJson(parsed);
      await processUrls(urls);
    } catch {
      setError('Could not parse that as JSON. Paste the raw contents of favorite_videos.json.');
    }
  }

  function handleCategoryChange(index: number, category: WishlistCategory) {
    setPreview((prev) => prev.map((v, i) => (i === index ? { ...v, category } : v)));
  }

  function handleConfirm() {
    const items: Omit<WishlistItem, 'id' | 'addedAt' | 'done'>[] = preview.map((v) => ({
      title: v.title,
      url: v.url,
      thumbnail: v.thumbnail,
      author: v.author || undefined,
      category: v.category,
      source: 'tiktok' as const,
    }));
    onImport(items);
    setStep('done');
  }

  const allCategories: WishlistCategory[] = ['want', 'experience', 'movie', 'show', 'book', 'other'];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'var(--color-paper)',
        borderRadius: '4px 4px 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-ink-ghost)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: 'var(--color-ink)' }}>
            import from tiktok
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              color: 'var(--color-ink-muted)',
              minWidth: '44px',
              minHeight: '44px',
            }}
            aria-label="close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

          {step === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                backgroundColor: 'var(--color-chrome)',
                border: '1px solid var(--color-ink-ghost)',
                borderRadius: '2px',
                padding: '12px',
              }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink)', margin: '0 0 8px' }}>
                  how to get your TikTok data:
                </p>
                <ol style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--color-ink-muted)', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                  <li>Open TikTok → Profile → Menu (☰) → Settings</li>
                  <li>Privacy → Personalization and data</li>
                  <li>Request data → Select JSON format → Request</li>
                  <li>Wait ~1-2 days, then download the ZIP</li>
                  <li>Open the ZIP → find <strong>favorite_videos.json</strong></li>
                  <li>Upload it below</li>
                </ol>
              </div>

              {error && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#D50000', margin: 0 }}>
                  {error}
                </p>
              )}

              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json"
                  onChange={handleFile}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  style={{
                    ...btnStyle,
                    width: '100%',
                    backgroundColor: 'var(--color-chrome-dark)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  upload favorite_videos.json
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--color-ink-ghost)', paddingTop: '16px' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)', margin: '0 0 8px' }}>
                  or paste the JSON content directly:
                </p>
                <textarea
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                  placeholder='{"FavoriteVideoList": [...]}'
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Courier New, monospace', fontSize: '11px' }}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={!pastedJson.trim()}
                  style={{
                    ...btnStyle,
                    width: '100%',
                    marginTop: '8px',
                    opacity: !pastedJson.trim() ? 0.4 : 1,
                    cursor: !pastedJson.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  process pasted JSON
                </button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', padding: '32px 0' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: 'var(--color-ink-muted)', textAlign: 'center', margin: 0 }}>
                {progress || 'Processing...'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--color-ink-muted)', textAlign: 'center', margin: 0 }}>
                This may take a minute — fetching video info and categorizing.
              </p>
            </div>
          )}

          {step === 'preview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--color-ink)', margin: 0 }}>
                Found <strong>{preview.length}</strong> saved videos. Review and adjust categories before importing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {preview.map((v, i) => (
                  <div key={i} style={{
                    border: '1px solid var(--color-ink-ghost)',
                    borderRadius: '2px',
                    padding: '8px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}>
                    {v.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={v.thumbnail}
                        alt=""
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: 'var(--color-ink)',
                        margin: '0 0 4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {v.title}
                      </p>
                      {v.author && (
                        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: 'var(--color-ink-muted)', margin: '0 0 4px' }}>
                          @{v.author.replace(/^@/, '')}
                        </p>
                      )}
                      <select
                        value={v.category}
                        onChange={(e) => handleCategoryChange(i, e.target.value as WishlistCategory)}
                        style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '10px',
                          backgroundColor: 'var(--color-paper)',
                          border: '1px solid var(--color-ink-ghost)',
                          borderRadius: '2px',
                          padding: '2px 4px',
                          cursor: 'pointer',
                          color: 'var(--color-ink)',
                        }}
                      >
                        {allCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--color-ink)', margin: '0 0 8px' }}>
                {preview.length} item{preview.length !== 1 ? 's' : ''} added to your lists.
              </p>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', color: 'var(--color-ink-muted)', margin: 0 }}>
                You can change categories or remove items from the list view.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {(step === 'preview' || step === 'done') && (
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--color-ink-ghost)',
            display: 'flex',
            gap: '8px',
          }}>
            {step === 'preview' && (
              <>
                <button
                  type="button"
                  onClick={() => setStep('upload')}
                  style={{ ...btnStyle, flex: 1 }}
                >
                  back
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  style={{
                    ...btnStyle,
                    flex: 2,
                    backgroundColor: 'var(--color-chrome-dark)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  add {preview.length} item{preview.length !== 1 ? 's' : ''}
                </button>
              </>
            )}
            {step === 'done' && (
              <button
                type="button"
                onClick={onClose}
                style={{ ...btnStyle, flex: 1 }}
              >
                close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
