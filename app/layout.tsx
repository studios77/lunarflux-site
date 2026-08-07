import type { Metadata, Viewport } from 'next'
import { SITE_NAME, SITE_ORIGIN, SITE_VERIFICATION } from '@/lib/site'
import { SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_TITLE, SEO_KEYWORDS } from '@/lib/seo'
import ChatBot from '@/components/ChatBot'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

export const metadata: Metadata = {
  // metadataBase 는 별도 export 가 아니라 metadata 의 필드여야 Next 가 인식합니다.
  // 예전에는 최상위 export 로 두어 죽은 코드였고, 그 상태에서 OG 이미지를
  // 추가하면 상대 경로가 절대 URL 로 확장되지 않습니다.
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: SEO_DEFAULT_TITLE,
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  creator: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
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
  robots: {
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
          모든 페이지에 채팅을 띄웁니다. 홈에만 두면 /contact 가 안내하는
          "화면 우측 하단의 채팅 버튼"이 정작 그 페이지에 없습니다.
        */}
        <ChatBot />
      </body>
    </html>
  )
}
