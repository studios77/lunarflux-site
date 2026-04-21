import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LunarFlux — AI Security & Streaming Infrastructure',
  description: 'IDC 서버 임대·위탁운영부터 AI 보안 관제, Ultrastream 엔진 기반 라이브 스트리밍까지. 하나의 플랫폼으로 완성하는 기술 인프라.',
  keywords: 'IDC, AI 보안, 스트리밍, 서버 임대, 위탁운영, 이중화, 딥페이크 탐지',
  openGraph: {
    title: 'LunarFlux — AI Security & Streaming Infrastructure',
    description: '차세대 보안 인프라 플랫폼',
    url: 'https://lunarflux.al',
    siteName: 'LunarFlux',
    locale: 'ko_KR',
    type: 'website',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
