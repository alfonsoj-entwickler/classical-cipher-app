const FALLBACK_SITE_URL = 'https://classical-cipher-app.vercel.app';

// Only accept a configured URL if it actually parses and, outside local dev,
// uses https — a malformed or accidentally-http APP_URL would otherwise leak
// straight into metadataBase, canonical, OG tags, the sitemap and robots.txt.
function isUsableSiteUrl(candidate: string): boolean {
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'https:') return true;
    return parsed.protocol === 'http:' && process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
}

/**
 * Resolves the canonical base URL of the application.
 * Priority order:
 * 1. APP_URL (user-defined environment variable)
 * 2. NEXT_PUBLIC_SITE_URL (alternative standard convention)
 * 3. VERCEL_URL (automatically provided by Vercel runtime)
 * 4. Default fallback: 'https://classical-cipher-app.vercel.app'
 */
export function getSiteUrl(): string {
  const envUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    const trimmed = envUrl.replace(/\/+$/, '');
    if (isUsableSiteUrl(trimmed)) return trimmed;
  }

  if (process.env.VERCEL_URL) {
    const vercelUrl = `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
    if (isUsableSiteUrl(vercelUrl)) return vercelUrl;
  }

  return FALLBACK_SITE_URL;
}

export const SITE_URL = getSiteUrl();
