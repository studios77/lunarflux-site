import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '제로트러스트 아키텍처 — LunarFlux AI',
  description: 'ID·디바이스·맥락 기반 최소권한과 지속 검증. 성숙도 진단부터 마이크로세그먼트·MFA 설계까지.',
  keywords: [
    '제로트러스트', 'Zero Trust', '마이크로세그먼트', 'MFA', '최소권한',
    'AI 보안', '인프라 보안', 'IAM', '조건부 접근', 'ai보안서비스',
  ],
  openGraph: {
    title: '제로트러스트 아키텍처 — LunarFlux AI',
    description: '신뢰 경계 재설계와 단계적 도입 로드맵.',
    url: 'https://lunarflux.ai/services/zero-trust/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/zero-trust/' },
}

export default function Page() {
  const s = getServiceBySlug('zero-trust')!
  return <ServiceDetailPage s={s} />
}
