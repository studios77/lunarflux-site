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
  /**
   * 2026-04-25(197fd97)에 넣었다가 2026-05-01(d3b0ad3) SEO 정리 중 유실된 값입니다.
   * 서치어드바이저 등록은 살아 있으므로 같은 코드를 되돌려 인증을 복구합니다.
   * 지우면 네이버 재검증에서 미인증으로 떨어지니 SEO 작업 시 주의하세요.
   */
  naver: 'f5c658e8819d2cff69bcd33a949fcf2885eab0c0',
  /**
   * 비워 둡니다. 구글은 DNS TXT 로 이미 인증돼 있습니다.
   *   google-site-verification=QnuX6yTbHeAPL7CemB-JD07LDE5Po6sHyYqbiwgwbr8
   * DNS 방식은 사이트 코드와 무관하게 유지되므로 메타태그를 더하면 중복이고
   * 관리 지점만 늘어납니다. DNS 레코드를 지우는 경우에만 여기에 코드를 넣으세요.
   */
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

