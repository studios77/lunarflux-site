import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LunarFlux AI — IDC 서버 임대·AI 보안·라이브 스트리밍',
  description: 'IDC 서버 임대·위탁운영, AI 보안 관제·스트림 이상 탐지·딥페이크 검출, Ultrastream 기반 초저지연 라이브까지. 인프라와 보안·미디어를 한 팀이 설계하고 운영합니다.',
  keywords: [
    'IDC', 'IDC 서버 임대', 'IDC 위탁운영', 'IDC 코로케이션', '서버 임대', '서버 위탁관리',
    '코로케이션', '1U 서버', '2U 서버', '풀랙', '하프랙', '데이터센터 임대',
    '클라우드 인프라', '베어메탈 서버', '전용서버 임대', 'VPS', '서버 호스팅',
    '스트리밍 솔루션', '영상 스트리밍', '영상 스트리밍 플랫폼', '라이브 스트리밍 플랫폼',
    '라이브 방송 솔루션', 'Ultrastream', '초저지연 스트리밍', 'LL-HLS', 'WebRTC 스트리밍',
    'VOD 플랫폼', '멀티스트림', '동시 송출', '유튜브 동시 방송',
    '인공지능 보안', 'AI 보안', '인공지능보안', '인공지능보안서비스', 'AI 보안 서비스', 'ai보안서비스',
    'AI 보안 관제', '네트워크 보안', '인공지능 보안 서비스', 'AI 사이버보안',
    '딥페이크 탐지', '딥페이크 검출', 'AI 이상탐지', 'SOC 자동화', '사이버 보안',
    'DDoS 차단', '보안 관제', 'SIEM', '제로트러스트',
    '백업 솔루션', 'DR 솔루션', '재해복구', '데이터 백업', '서버 이중화', 'HA 구성',
    '서버 복구', '서버 장애 복구', '시스템 이전', '트러블슈팅', '온프레미스 기술지원',
    'LunarFlux', '루나플럭스', 'LunarFlux AI'
  ],
  openGraph: {
    title: 'LunarFlux AI — IDC · AI 보안 · 라이브 스트리밍',
    description: 'IDC 인프라와 AI 보안, 초저지연 스트리밍을 함께 제공합니다.',
    url: 'https://lunarflux.ai',
    siteName: 'LunarFlux',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LunarFlux AI — IDC · AI 보안 · 스트리밍',
    description: 'IDC·AI 보안·라이브 스트리밍을 한 팀이 맡습니다.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
