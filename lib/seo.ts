import type { Metadata } from 'next'
import { SITE_NAME, SITE_ORIGIN, serviceCanonicalUrl } from './site'

/**
 * 브라우저 탭과 검색 결과에 뜨는 기본 제목·설명.
 *
 * 예전 값은 "최고의 스트리밍솔루션·AI 보안·인프라" 였습니다. 두 가지를 고쳤습니다.
 *  - 스트리밍이 앞에 있어 보안 전문사로 읽히지 않았습니다. 주력이 자체 개발한
 *    차세대 방화벽이므로 순서를 뒤집었습니다.
 *  - "최고의" 같은 최상급 표현은 근거를 대기 어렵고 표시광고 측면에서도
 *    불리합니다. 무엇을 하는지로 대체했습니다.
 *
 * 제목은 검색 결과에서 잘리지 않도록 40자 안쪽으로 유지합니다.
 */
export const SEO_DEFAULT_TITLE = `${SITE_NAME} | 차세대 방화벽 · AI 보안 관제 · 클라우드 보안`

export const SEO_DEFAULT_DESCRIPTION =
  '자체 개발한 차세대 방화벽 Lunarflux Guard를 중심으로 네트워크·클라우드·AI 데이터 보안과 24시간 자율 관제를 제공합니다. IDC 인프라 운영과 라이브 스트리밍까지 한 팀이 맡습니다.'

/**
 * 검색어. 실제 제공 서비스 순서대로 둡니다 — 보안 → 인프라 → 스트리밍.
 * 스트리밍은 여전히 제공하므로 빼지 않고 뒤로 내렸습니다.
 */
export const SEO_KEYWORDS: string[] = [
  // 주력 제품
  'Lunarflux Guard',
  'NGFW',
  '차세대 방화벽',
  'WAF',
  '웹방화벽',
  '통합 보안 어플라이언스',
  'JA4',
  '봇 차단',

  // 네트워크 보안
  '네트워크 보안',
  'IDS',
  'IPS',
  '침입탐지',
  '제로트러스트',
  '스트림 이상탐지',

  // 클라우드 보안
  '클라우드 보안',
  'CSPM',
  '클라우드 보안 진단',
  'CWPP',
  '컨테이너 보안',
  '쿠버네티스 보안',

  // AI · 데이터 보안
  'AI 보안',
  'LLM 보안',
  '딥페이크 탐지',
  '프롬프트 인젝션',

  // 보안 운영
  'AI 보안 관제',
  'SOC',
  'SIEM',
  'SOAR',
  '보안 관제',

  // 인프라
  'IDC',
  '서버 임대',
  '코로케이션',
  'GPU 호스팅',
  'AIDC',
  '위탁운영',
  'HA',
  'DB 이중화',
  '장애 복구',
  '시스템 이전',

  // 스트리밍
  '스트리밍솔루션',
  '라이브 스트리밍',
  'UltraStreamingEngine',
  'LL-HLS',
  'VOD',

  // 브랜드
  'LunarFlux AI',
  'lunarflux.ai',
]

/**
 * 공유 카드 이미지.
 *
 * app/opengraph-image.png 파일 규약이 만드는 /opengraph-image.png 를 그대로
 * 가리킵니다. metadataBase 가 절대 URL 로 확장해 주므로 경로만 적으면 됩니다.
 *
 * 아래 두 함수가 openGraph 를 정의하는 순간 루트 레이아웃의 openGraph 는
 * 통째로 대체됩니다 — 필드 단위로 합쳐지지 않습니다. images 를 빼면
 * 상속되는 것이 아니라 그냥 사라져서, 홈을 뺀 전 페이지가 og:image 없이
 * 나갔습니다(카톡·슬랙에 썸네일 자체가 안 뜸). 여기서 항상 붙입니다.
 */
const OG_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — 차세대 방화벽 · AI 보안 관제`,
}

/**
 * 서비스 상세 페이지 메타데이터.
 *
 * 예전에는 18개 페이지가 title·description·canonical 만 갖고 openGraph 는
 * 루트 레이아웃 것을 상속했습니다. 그래서 어느 서비스 페이지를 공유하든
 * 카카오톡·슬랙에 홈 카드가 떴습니다.
 *
 * 여기서 한 번에 만들어 주면 제목을 고칠 때 OG 가 따라오지 않는 일이 없습니다.
 */
export function serviceMetadata(opts: {
  slug: string
  title: string
  description: string
  keywords?: string[]
}): Metadata {
  const url = serviceCanonicalUrl(opts.slug)
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
  }
}

/** 서비스 외 정적 페이지(문의 등) 메타데이터 */
export function pageMetadata(opts: {
  path: string
  title: string
  description: string
  keywords?: string[]
}): Metadata {
  const url = `${SITE_ORIGIN}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
  }
}
