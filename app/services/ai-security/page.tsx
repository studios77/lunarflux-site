import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('ai-security')!

export const metadata: Metadata = serviceMetadata({
  slug: 'ai-security',
  title: '24/7 AI 보안 관제 및 위협 대응 서비스 | LunarFlux AI',
  description: '중소·중견기업을 위한 24시간 무인 자율 보안 관제 솔루션. 침해 사고 실시간 탐지와 자동 차단을 지원합니다.',
  keywords: ['AI 보안 관제', '침해사고 대응', '무인 관제', '정보보안', 'SIEM'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
