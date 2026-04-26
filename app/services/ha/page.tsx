import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서버 이중화 · HA 고가용성 구성 — LunarFlux AI',
  description: 'Active-Active·Active-Standby 서버 이중화 구성. 자동 페일오버 30초 이내, 99.99% SLA 가용성 보장. HAProxy L4/L7 로드밸런서, Keepalived VIP 관리.',
  keywords: [
    '서버 이중화', 'HA 구성', '고가용성', 'Active-Active', 'Active-Standby',
    '자동 페일오버', '로드밸런서', 'HAProxy', 'Keepalived', '무중단 서비스',
    '99.99% SLA', '서버 이중화 구성', '가상 IP', 'VIP',
  ],
  openGraph: {
    title: '서버 이중화 · HA 고가용성 — LunarFlux AI',
    description: 'Active-Active 이중화, 30초 이내 자동 페일오버, 99.99% SLA 보장.',
    url: 'https://lunarflux.ai/services/ha/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/ha/' },
}

export default function Page() {
  const s = getServiceBySlug('ha')!
  return <ServiceDetailPage s={s} />
}
