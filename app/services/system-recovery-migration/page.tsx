import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '시스템 복구 · 이전 · 트러블슈팅 — LunarFlux AI',
  description: '고객사 온프레미스·자체 서버·클라우드 VM 대상 장애 복구, 시스템 이전, 트러블슈팅. IDC 임대와 별도 단건·프로젝트 지원.',
  keywords: [
    '서버 복구', '시스템 이전', '트러블슈팅', '온프레미스 지원', '장애 복구',
    '서버 이전', '긴급 기술지원', 'IDC 외 지원', 'LunarFlux',
  ],
  openGraph: {
    title: '시스템 복구 · 이전 · 트러블슈팅 — LunarFlux AI',
    description: '고객사 인프라 전용 기술지원. 복구·이전·TS.',
    url: 'https://lunarflux.ai/services/system-recovery-migration/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/system-recovery-migration/' },
}

export default function Page() {
  const s = getServiceBySlug('system-recovery-migration')!
  return <ServiceDetailPage s={s} />
}
