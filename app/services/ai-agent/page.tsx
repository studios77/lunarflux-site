import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 자율 관제 에이전트 · 24시간 무인 보안관제 — LunarFlux AI',
  description: 'LLM 기반 SOC 자동화 에이전트. 위협탐지→분석→대응 전 과정 자동화. Wazuh SIEM 연동, SOAR 플레이북 50+, 24시간 무인 관제. AI 보안 관제 서비스.',
  keywords: [
    'AI 보안 관제', 'SOC 자동화', '인공지능 보안 관제', '24시간 보안 관제', 'SOAR',
    'SIEM', 'Wazuh', '위협 탐지', 'AI 관제', '무인 보안관제',
    'LLM 보안', '보안 자동화', '사이버 위협 대응', '보안 에이전트',
  ],
  openGraph: {
    title: 'AI 자율 관제 에이전트 — LunarFlux AI',
    description: 'LLM 기반 위협탐지→분석→대응 자동화. Wazuh SIEM 연동, 24시간 무인 관제.',
    url: 'https://lunarflux.ai/services/ai-agent/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/ai-agent/' },
}

export default function Page() {
  const s = getServiceBySlug('ai-agent')!
  return <ServiceDetailPage s={s} />
}
