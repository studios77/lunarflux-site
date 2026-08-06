import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('network-security')!

export const metadata: Metadata = serviceMetadata({
  slug: 'network-security',
  title: '기업 네트워크 보안 및 지능형 IDS/IPS | LunarFlux AI',
  description: '머신러닝과 룰 기반 엔진을 결합한 지능형 네트워크 보안 솔루션. 이상 트래픽 탐지와 자동 차단 기능을 제공합니다.',
  keywords: ['네트워크 보안', 'IDS/IPS', '이상 트래픽 탐지', '내부망 보안', 'Suricata'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
