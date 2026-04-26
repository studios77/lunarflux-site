import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 스트리밍 보안 · 이상탐지 자동차단 — LunarFlux AI',
  description: 'RTMP·HLS 스트리밍 트래픽 AI 머신러닝 이상탐지. DDoS 자동 차단, 세션 하이재킹 탐지, 스트림 키 도용 방지. XDP·eBPF 커널 레벨 필터링, 5초 이내 차단.',
  keywords: [
    'AI 스트리밍 보안', '스트리밍 보안', 'AI 보안 서비스', 'ai보안서비스', '인공지능보안서비스',
    '인공지능 보안 서비스', 'DDoS 차단', '이상탐지', 'AI 이상탐지',
    '세션 하이재킹', '스트림 보안', 'RTMP 보안', 'HLS 보안', 'eBPF',
    '스트리밍 DDoS', '인공지능 보안', '머신러닝 보안', '스트림 키 보안',
  ],
  openGraph: {
    title: 'AI 스트리밍 보안 · 이상탐지 — LunarFlux AI',
    description: 'RTMP·HLS 트래픽 AI 이상탐지. DDoS 자동차단, 세션 하이재킹 탐지, 5초 이내 대응.',
    url: 'https://lunarflux.ai/services/ai-stream-security/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/ai-stream-security/' },
}

export default function Page() {
  const s = getServiceBySlug('ai-stream-security')!
  return <ServiceDetailPage s={s} />
}
