import type { MetadataRoute } from 'next'
import { MAINTENANCE, SITE_ORIGIN } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = false

/**
 * 리뉴얼 중에도 크롤링은 막지 않습니다. 일부러입니다.
 *
 * 검색 결과에서 내려가게 하는 일은 각 페이지의 `noindex` 메타태그가 합니다.
 * 여기서 `Disallow: /` 를 걸면 크롤러가 페이지에 들어오지 못해 그 `noindex`
 * 를 읽을 수 없고, 이미 색인된 URL 이 제목만 남은 채 검색 결과에 계속
 * 머무릅니다. 빼려고 막는 것이 빼지 못하게 만드는 셈입니다.
 *
 * 그래서 리뉴얼 중에 바뀌는 것은 사이트맵 선언뿐입니다. 전부 `noindex` 인
 * 상태에서 "이 URL 들을 수집하라" 는 사이트맵을 함께 내보내면 신호가
 * 엇갈립니다.
 */
export default function robots(): MetadataRoute.Robots {
  const rules = [
    { userAgent: '*', allow: '/' },
    { userAgent: 'Googlebot', allow: '/' },
    { userAgent: 'Yeti', allow: '/' },
    { userAgent: 'bingbot', allow: '/' },
    { userAgent: 'DaumOA', allow: '/' },
  ]

  if (MAINTENANCE) {
    return { rules, host: SITE_ORIGIN }
  }

  return {
    rules,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
