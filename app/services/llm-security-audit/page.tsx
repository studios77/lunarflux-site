import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM 보안 감사 — LunarFlux AI',
  description: '생성형 AI 유출·프롬프트 인젝션·거버넌스 점검. RAG·외부 API·내부 챗봇 환경 특화.',
  keywords: [
    'LLM 보안', '프롬프트 인젝션', '생성형 AI', 'AI 거버넌스', 'RAG 보안',
    'AI 감사', '데이터 유출 방지', 'ai보안서비스', '인공지능보안서비스',
  ],
  openGraph: {
    title: 'LLM 보안 감사 — LunarFlux AI',
    description: '정책·기술·운영 관점의 위험 평가와 권고 로드맵.',
    url: 'https://lunarflux.ai/services/llm-security-audit/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/llm-security-audit/' },
}

export default function Page() {
  const s = getServiceBySlug('llm-security-audit')!
  return <ServiceDetailPage s={s} />
}
