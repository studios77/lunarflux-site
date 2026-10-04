import type { Metadata, Viewport } from 'next'
import { MAINTENANCE, SITE_NAME, SITE_ORIGIN, SITE_VERIFICATION } from '@/lib/site'
import { SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_TITLE, SEO_KEYWORDS } from '@/lib/seo'
import SalesIq from '@/components/SalesIq'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

/**
 * 리뉴얼 중에는 제목·설명도 바꿉니다. `noindex` 가 반영되기 전에 검색 결과에
 * 남아 있는 동안, 설명만이라도 현재 상태를 알려주는 편이 낫습니다.
 */
const TITLE = MAINTENANCE ? `홈페이지 리뉴얼 중 | ${SITE_NAME}` : SEO_DEFAULT_TITLE
// 설명은 검색 결과와 링크 공유 카드에 그대로 나갑니다. 화면에서 가린 전화번호가
// 여기 남으면 가린 의미가 없으므로 이메일만 적습니다.
const DESCRIPTION = MAINTENANCE
  ? '홈페이지 리뉴얼 중입니다. 문의는 contact@lunarflux.ai 로 보내주시면 동일하게 처리해 드립니다.'
  : SEO_DEFAULT_DESCRIPTION

export const metadata: Metadata = {
  // metadataBase 는 별도 export 가 아니라 metadata 의 필드여야 Next 가 인식합니다.
  // 예전에는 최상위 export 로 두어 죽은 코드였고, 그 상태에서 OG 이미지를
  // 추가하면 상대 경로가 절대 URL 로 확장되지 않습니다.
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: TITLE,
  description: DESCRIPTION,
  // 리뉴얼 중에는 키워드를 내보내지 않습니다. 보여줄 수 없는 서비스를
  // 검색어로 알리는 셈이 됩니다.
  ...(MAINTENANCE ? {} : { keywords: SEO_KEYWORDS }),
  authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  creator: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_ORIGIN,
  },
  // 코드가 비어 있으면 태그를 내보내지 않습니다. lib/site 의 SITE_VERIFICATION 참고.
  verification: {
    ...(SITE_VERIFICATION.google ? { google: SITE_VERIFICATION.google } : {}),
    ...(SITE_VERIFICATION.naver
      ? { other: { 'naver-site-verification': SITE_VERIFICATION.naver } }
      : {}),
  },
  // 리뉴얼 중에는 검색 결과에서 빠지도록 noindex 를 내보냅니다.
  //
  // 검색엔진이 이 태그를 읽어야 색인에서 내려가므로 `robots.txt` 로 크롤링을
  // 막지 않습니다. 막으면 크롤러가 들어오지 못해 noindex 를 보지 못하고,
  // 이미 색인된 URL 이 오히려 그대로 남습니다. app/robots.ts 주석 참고.
  robots: MAINTENANCE
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      // globals.css 의 scroll-behavior: smooth 를 의도한 것임을 Next 에 알립니다.
      // 없으면 라우트 전환마다 부드러운 스크롤 경고가 뜹니다.
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body>
        {/* Tab 첫 타에 나타납니다. 이게 없으면 키보드 사용자는 매 페이지마다
            로고와 서비스 메뉴를 지나야 본문에 닿습니다. */}
        <a
          href="#main-content"
          className="skip-link rounded-lg bg-accent px-4 py-2.5 text-body font-semibold text-canvas"
        >
          본문으로 건너뛰기
        </a>
        {children}
        {/*
          상담 위젯은 모든 페이지에 둡니다 — 홈에만 두면 /contact 가 안내하는
          채팅이 정작 그 페이지에 없습니다. 예전에 실제로 그랬습니다.
          SALESIQ.widgetCode 가 비어 있으면 아무것도 로드하지 않습니다.

          리뉴얼 중에는 띄우지 않습니다. 안내 화면이 전화·이메일로 연락을
          청하고 있는데 채팅창까지 띄우면 말이 엇갈리고, 리뉴얼 기간에
          아무도 보지 않는 채팅은 없는 것보다 나쁩니다.
        */}
        {!MAINTENANCE && <SalesIq />}
      </body>
    </html>
  )
}
