import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DB 이중화 · 데이터베이스 클러스터 관리 — LunarFlux AI',
  description: 'Galera Cluster·Master-Slave DB 이중화 설계·운영 대행. ProxySQL 읽기/쓰기 분리, 슬로우 쿼리 분석, 자동 복구. MariaDB·MySQL·Percona 전문 관리.',
  keywords: [
    'DB 이중화', '데이터베이스 이중화', 'Galera Cluster', 'DB 클러스터', 'MariaDB 이중화',
    'MySQL 이중화', 'ProxySQL', 'Master-Slave', 'DB 위탁운영', '슬로우 쿼리',
    '데이터베이스 관리', 'DB 백업', 'DB 복구',
  ],
  openGraph: {
    title: 'DB 이중화 · 클러스터 관리 — LunarFlux AI',
    description: 'Galera Cluster, ProxySQL 읽기/쓰기 분리, 슬로우 쿼리 분석. MariaDB/MySQL 전문 관리.',
    url: 'https://lunarflux.ai/services/db-cluster/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/db-cluster/' },
}

export default function Page() {
  const s = getServiceBySlug('db-cluster')!
  return <ServiceDetailPage s={s} />
}
