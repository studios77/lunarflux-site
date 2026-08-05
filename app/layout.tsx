import type { Metadata, Viewport } from 'next'
import { SITE_NAME, SITE_ORIGIN } from '@/lib/site'
import { SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_TITLE, SEO_KEYWORDS } from '@/lib/seo'
import ChatBot from '@/components/ChatBot'
import './globals.css'

/**
 * 등장 애니메이션의 안전장치. 자세한 동작은 globals.css 의 `.js .reveal` 주석 참고.
 *
 * <head>에서 즉시 실행되므로 본문이 그려지기 전에 `.js` 가 붙습니다.
 * (body 렌더 뒤에 붙이면 숨겨지기 전 한 프레임이 노출돼 깜빡입니다.)
 * 앱 번들과 별개로 실행되므로 번들이 죽어도 타이머는 살아남습니다.
 */
const REVEAL_FALLBACK = `document.documentElement.classList.add('js');
window.__revealFallback=setTimeout(function(){document.documentElement.classList.remove('js')},4000)`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
}

export const metadataBase = new URL(SITE_ORIGIN)

export const metadata: Metadata = {
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
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
        <script dangerouslySetInnerHTML={{ __html: REVEAL_FALLBACK }} />
      </head>
      <body>
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
