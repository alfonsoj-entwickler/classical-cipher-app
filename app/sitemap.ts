import { MetadataRoute } from 'next';
import { SITE_URL } from '@/helpers/site';
import { CIPHERS } from '@/helpers/ciphers/types';

// Bump when the content of these routes materially changes.
const LAST_MODIFIED = new Date('2026-09-25');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...CIPHERS.filter(({ implemented }) => implemented).map(({ id }) => ({
      url: `${SITE_URL}/cipher/${id}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

