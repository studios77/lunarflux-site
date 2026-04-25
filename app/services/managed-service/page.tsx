import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '위탁운영 매니지먼트 — LunarFlux AI',
  description: 'OS 패치·장애대응·성능튜닝 전담. Zabbix+Grafana 실시간 모니터링, 월 SLA 리포트.',
  alternates: { canonical: 'https://lunarflux.ai/services/managed-service/' },
}

export default function Page() {
  const s = getServiceBySlug('managed-service')!
  return <ServiceDetailPage s={s} />
}
