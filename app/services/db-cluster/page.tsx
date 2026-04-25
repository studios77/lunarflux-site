import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DB 이중화 매니지먼트 — LunarFlux AI',
  description: 'Galera Cluster·Master-Slave 구성·모니터링·자동복구 위탁관리. 슬로우쿼리 분석.',
  alternates: { canonical: 'https://lunarflux.ai/services/db-cluster/' },
}

export default function Page() {
  const s = getServiceBySlug('db-cluster')!
  return <ServiceDetailPage s={s} />
}
