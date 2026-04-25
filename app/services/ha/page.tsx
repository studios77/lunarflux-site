import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '운영서버 이중화 (HA) — LunarFlux AI',
  description: 'Active-Active/Standby 구성, 자동 페일오버 30초 이내, L4/L7 로드밸런서, 99.99% SLA.',
  alternates: { canonical: 'https://lunarflux.ai/services/ha/' },
}

export default function Page() {
  const s = getServiceBySlug('ha')!
  return <ServiceDetailPage s={s} />
}
