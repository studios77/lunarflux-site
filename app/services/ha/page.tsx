import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('ha')!

export const metadata: Metadata = {
  title: '운영서버 이중화 (HA) 설계 및 구축 | LunarFlux AI',
  description: '30초 이내 자동 페일오버를 보장하는 무중단 서버 이중화 솔루션. Active-Active 및 Active-Standby 구성을 지원합니다.',
  keywords: ['서버 이중화', '고가용성', 'HA 구성', '로드밸런서', '무중단 서비스'],
  alternates: { canonical: serviceCanonicalUrl('ha') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
