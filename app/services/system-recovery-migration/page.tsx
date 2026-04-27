import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서버 장애 복구 및 이전 — LunarFlux AI',
  description: '외부 고객이 운영 중인 서버·온프레·클라우드 VM 대상 장애 복구, 시스템 이전, 트러블슈팅. 서비스가 필요한 고객 요청 시 IDC 임대와 별도 단건·프로젝트 지원.',
  keywords: [
    '서버 복구', '시스템 이전', '트러블슈팅', '온프레미스 지원', '장애 복구',
    '서버 이전', '긴급 기술지원', 'IDC 외 지원', 'LunarFlux',
  ],
  openGraph: {
    title: '서버 장애 복구 및 이전 — LunarFlux AI',
    description: '외부 고객 운영 서버 대상 기술지원. 요청 시 복구·이전·TS.',
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
