import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서버 위탁운영 · 매니지먼트 서비스 — LunarFlux AI',
  description: '전문 엔지니어가 서버 운영을 전담합니다. OS 보안 패치, 24시간 장애 대응, Zabbix 실시간 모니터링, 월간 SLA 리포트. 서버 위탁관리, MSP 서비스.',
  keywords: [
    '서버 위탁운영', '서버 위탁관리', 'MSP 서비스', '서버 관리 대행', '24시간 장애 대응',
    'Zabbix 모니터링', '서버 모니터링', 'OS 패치', '보안 패치', 'SLA 리포트',
    '서버 운영 아웃소싱', 'IT 아웃소싱', '매니지드 서비스',
  ],
  openGraph: {
    title: '서버 위탁운영 · MSP — LunarFlux AI',
    description: '24시간 장애 대응, OS 패치, Zabbix 모니터링, 월간 SLA 리포트. 서버 운영 전담.',
    url: 'https://lunarflux.ai/services/managed-service/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/managed-service/' },
}

export default function Page() {
  const s = getServiceBySlug('managed-service')!
  return <ServiceDetailPage s={s} />
}
