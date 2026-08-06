import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('ai-agent')!

export const metadata: Metadata = serviceMetadata({
  slug: 'ai-agent',
  title: 'AI 자율 보안 관제 에이전트 솔루션 | LunarFlux AI',
  description: 'LLM 기반 SOC 자동화 에이전트로 24시간 365일 무인 자율 관제와 침해 사고 자동 대응을 실현합니다.',
  keywords: ['보안 관제', '자율 관제', 'AI SOC', 'SOAR 자동화', '위협 탐지'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
