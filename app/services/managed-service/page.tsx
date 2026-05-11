import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('managed-service')!

export const metadata: Metadata = {
  title: '서버 위탁운영 및 매니지드 서비스 (MSP) | LunarFlux AI',
  description: 'OS 보안 패치부터 24시간 모니터링, 장애 대응까지 서버 운영의 모든 것을 위탁 관리해 드립니다.',
  keywords: ['서버 위탁운영', '매니지드 서비스', '보안 패치', '장애 대응', '서버 관리'],
  alternates: { canonical: serviceCanonicalUrl('managed-service') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
