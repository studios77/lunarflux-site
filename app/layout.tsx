import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LunarFlux AI — IDC 서버 임대·AI 보안·스트리밍 통합 플랫폼',
  description: 'IDC 서버 임대·위탁운영부터 AI 보안 관제, Ultrastream 엔진 기반 라이브 스트리밍까지. 스트리밍 솔루션, 영상 스트리밍 플랫폼, 클라우드 인프라, AI 보안, 네트워크 보안, 백업/DR 솔루션을 하나의 플랫폼으로.',
  keywords: [
    'IDC', 'IDC 서버 임대', 'IDC 위탁운영', '클라우드 인프라', '서버 임대',
    '스트리밍 솔루션', '영상 스트리밍', '영상 스트리밍 플랫폼', '라이브 스트리밍', 'Ultrastream',
    'AI 보안', '네트워크 보안', '딥페이크 탐지', 'AI 보안 관제', '사이버 보안',
    '백업 솔루션', 'DR 솔루션', '재해복구', '데이터 백업', '이중화',
    'LunarFlux', '루나플럭스'
  ],
  openGraph: {
    title: 'LunarFlux AI — IDC 서버 임대·AI 보안·스트리밍 통합 플랫폼',
    description: '스트리밍 솔루션·영상 스트리밍 플랫폼·IDC·클라우드 인프라·AI 보안·네트워크 보안·백업/DR 솔루션. 차세대 기술 인프라 플랫폼.',
    url: 'https://lunarflux.ai',
    siteName: 'LunarFlux',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LunarFlux AI — IDC 서버 임대·AI 보안·스트리밍 통합 플랫폼',
    description: '스트리밍 솔루션·IDC·AI 보안·백업/DR 솔루션을 하나의 플랫폼으로.',
  },
  alternates: {
    canonical: 'https://lunarflux.ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="f5c658e8819d2cff69bcd33a949fcf2885eab0c0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
