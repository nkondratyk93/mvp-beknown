import type { MetadataRoute } from 'next';

const BASE_URL = 'https://beknown.no-humans.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [
    'how-to-create-ai-verified-professional-profile',
    'ai-conversation-history-career-tool',
    'beknown-vs-linkedin-vs-readcv',
  ];

  const languages = ['es', 'de', 'fr', 'pt', 'ja'];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/generate`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/claim`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date('2026-03-22'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const languagePages: MetadataRoute.Sitemap = languages.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date('2026-03-22'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...languagePages];
}
