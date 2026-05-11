import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('server-rental')!

export const metadata: Metadata = {
  title: '고성능 전용서버 임대 및 IDC 코로케이션 | LunarFlux AI',
  description: '고성능 베어메탈 서버 임대 및 고객 장비 코로케이션 서비스. 최적화된 전력, 냉각, 네트워크 환경을 제공합니다.',
  keywords: ['서버 임대', '코로케이션', '전용서버', 'IDC', '베어메탈'],
  alternates: { canonical: serviceCanonicalUrl('server-rental') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
