import { notFound, redirect } from 'next/navigation';

/**
 * Phase 0 legacy slug catch-all. Old single-segment routes that no
 * longer have their own page collapse here and forward to whichever
 * Phase 1 surface absorbed them. Unknown slugs fall through to 404.
 *
 * Literal directories under app/ take precedence, so this only ever
 * matches paths that don't have a real page of their own.
 */

const LEGACY_REDIRECTS: Record<string, string> = {
  daily: '/today',
  weekly: '/today',
  monthly: '/today',
  growth: '/today',
  culture: '/today',
  reflection: '/notes',
};

export function generateStaticParams() {
  return Object.keys(LEGACY_REDIRECTS).map((legacy) => ({ legacy }));
}

export const dynamicParams = false;

export default function LegacySlugPage({ params }: { params: { legacy: string } }) {
  const target = LEGACY_REDIRECTS[params.legacy];
  if (!target) notFound();
  redirect(target);
}
