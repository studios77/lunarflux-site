import type { MetadataRoute } from 'next'
import { pageCanonicalUrl, serviceCanonicalUrl, SITE_ORIGIN, STATIC_PAGES } from '@/lib/site'
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
    // 전환 페이지라 서비스 상세보다 우선순위가 높습니다. 빠져 있었습니다.
    ...STATIC_PAGES.map((page) => ({
      url: pageCanonicalUrl(page.path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: page.priority,
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: serviceCanonicalUrl(slug),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: slug === 'lunarflux-guard' || slug === 'ai-security' ? 0.95 : 0.85,
    })),
  ]
  return entries
}
