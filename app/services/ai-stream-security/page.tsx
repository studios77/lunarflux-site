import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('ai-stream-security')!

export const metadata: Metadata = serviceMetadata({
  slug: 'ai-stream-security',
  title: '스트리밍 인프라 전용 AI 보안 (이상탐지) | LunarFlux AI',
  description: 'RTMP, HLS 트래픽을 타겟으로 한 DDoS, 세션 하이재킹 공격을 실시간 방어하는 스트리밍 맞춤형 AI 보안 솔루션.',
  keywords: ['스트리밍 보안', 'DDoS 방어', '트래픽 분석', '세션 하이재킹 차단'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
