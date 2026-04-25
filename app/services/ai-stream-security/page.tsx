import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 스트림 이상탐지 — LunarFlux AI',
  description: 'RTMP/HLS 트래픽 머신러닝 분석. 세션 하이재킹·인젝션·DDoS 실시간 탐지 및 자동차단.',
  alternates: { canonical: 'https://lunarflux.ai/services/ai-stream-security/' },
}

export default function Page() {
  const s = getServiceBySlug('ai-stream-security')!
  return <ServiceDetailPage s={s} />
}
