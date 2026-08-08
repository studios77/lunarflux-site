import type { MetadataRoute } from 'next'
import {
  CONTENT_LAST_MODIFIED,
  pageCanonicalUrl,
  serviceCanonicalUrl,
  SITE_ORIGIN,
  STATIC_PAGES,
} from '@/lib/site'
import { getServiceBySlug, SERVICE_SLUGS } from '@/lib/servicesData'

export const dynamic = 'force-static'
export const revalidate = false

/**
 * lastmod 는 빌드 시각이 아니라 콘텐츠 수정일입니다.
 *
 * 예전에는 `new Date()` 하나를 전 항목에 돌려 써서, 배포할 때마다 21개 URL 이
 * 모두 방금 바뀐 것으로 나갔습니다. 문서만 고친 배포에서도 마찬가지였고,
 * 이런 값이 반복되면 검색엔진은 lastmod 를 신뢰하지 않습니다.
 *
 * 날짜를 올리는 곳은 `lib/site.ts` 의 CONTENT_LAST_MODIFIED 입니다.
 * 페이지 하나만 바뀌었다면 STATIC_PAGES.lastModified 나
 * ServiceData.updated 로 그 항목만 덮어쓰세요.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 전환 페이지라 서비스 상세보다 우선순위가 높습니다. 빠져 있었습니다.
    ...STATIC_PAGES.map((page) => ({
      url: pageCanonicalUrl(page.path),
      lastModified: page.lastModified ?? CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: page.priority,
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: serviceCanonicalUrl(slug),
      lastModified: getServiceBySlug(slug)?.updated ?? CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: slug === 'lunarflux-guard' || slug === 'ai-security' ? 0.95 : 0.85,
    })),
  ]
  return entries
}
