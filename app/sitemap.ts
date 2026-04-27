import type { MetadataRoute } from 'next'

/** 정적보내기(out/)에서 sitemap.xml 생성 */
export const dynamic = 'force-static'
export const revalidate = false

const BASE = 'https://lunarflux.ai'

const SERVICE_SLUGS = [
  'server-rental',
  'managed-service',
  'ha',
  'db-cluster',
  'system-recovery-migration',
  'ai-security',
  'ai-agent',
  'ai-stream-security',
  'deepfake-detection',
  'network-security',
  'zero-trust',
  'llm-security-audit',
  'ultrastream',
  'vod-multistream',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-27')
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${BASE}/services/${slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: slug === 'ai-security' || slug === 'ultrastream' ? 0.95 : 0.85,
    })),
  ]
  return entries
}
