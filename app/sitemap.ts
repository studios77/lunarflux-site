import type { MetadataRoute } from 'next'
import { serviceCanonicalUrl, SITE_ORIGIN } from '@/lib/site'
import { SERVICE_SLUGS } from '@/lib/servicesData'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: serviceCanonicalUrl(slug),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: slug === 'ai-security' || slug === 'ultrastream' ? 0.95 : 0.85,
    })),
  ]
  return entries
}
