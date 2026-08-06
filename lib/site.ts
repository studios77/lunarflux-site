export const SITE_NAME = 'LunarFlux AI'

/** Production site origin (trailing slash 없음) */
export const SITE_ORIGIN = 'https://lunarflux.ai'

export function serviceCanonicalUrl(slug: string): string {
  return `${SITE_ORIGIN}/services/${slug}/`
}

/**
 * 검색엔진 사이트 소유확인 코드.
 *
 * 각 서비스에 사이트를 등록하면 발급되는 값입니다. 빈 문자열이면 해당 meta
 * 태그를 출력하지 않으므로, 받은 것만 채워 넣으면 됩니다.
 *
 *   네이버  https://searchadvisor.naver.com  → 사이트 등록 → HTML 태그 확인
 *   구글    https://search.google.com/search-console → 소유권 확인 → HTML 태그
 *
 * 등록 자체가 중요합니다 — 특히 네이버는 서치어드바이저에 사이트와 사이트맵을
 * 제출하지 않으면 색인이 거의 되지 않습니다.
 */
export const SITE_VERIFICATION = {
  naver: '',
  google: '',
} as const

/** 서비스 외 정적 페이지. 사이트맵과 canonical 이 같은 목록을 보게 둡니다. */
export const STATIC_PAGES = [
  { path: '/contact/', priority: 0.9 },
  // 사용자용 사이트맵. 전환 페이지가 아니라 우선순위는 낮게 둡니다.
  { path: '/sitemap-page/', priority: 0.4 },
] as const

export function pageCanonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`
}

