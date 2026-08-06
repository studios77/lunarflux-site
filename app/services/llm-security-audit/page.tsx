import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('llm-security-audit')!

export const metadata: Metadata = serviceMetadata({
  slug: 'llm-security-audit',
  title: '생성형 AI / LLM 보안 감사 컨설팅 | LunarFlux AI',
  description: '생성형 AI 도입 기업을 위한 프롬프트 인젝션 방어, 데이터 유출 방지 및 LLM 보안 거버넌스 점검 서비스입니다.',
  keywords: ['LLM 보안', '프롬프트 인젝션', '데이터 유출 방지', '생성형 AI 거버넌스'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
