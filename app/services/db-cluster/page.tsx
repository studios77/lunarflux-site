import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('db-cluster')!

export const metadata: Metadata = {
  title: '무중단 DB 이중화 및 매니지먼트 서비스 | LunarFlux AI',
  description: 'Galera Cluster, Master-Slave 구성 등 데이터베이스 이중화 설계부터 모니터링, 성능 튜닝까지 전문적으로 위탁 관리해 드립니다.',
  keywords: ['DB 이중화', 'Galera Cluster', '데이터베이스 관리', '서버 위탁', '슬로우 쿼리'],
  alternates: { canonical: serviceCanonicalUrl('db-cluster') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
