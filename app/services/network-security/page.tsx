import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '네트워크 보안 · IDS/IPS — LunarFlux AI',
  description: '지능형 침입탐지·방지. 이상 트래픽 ML 분석과 Suricata/Zeek 기반 하이브리드. IDC·기업 망 특화.',
  keywords: [
    'IDS', 'IPS', '네트워크 보안', '침입탐지', 'Suricata', 'Zeek', 'eBPF',
    'AI 보안', '이상탐지', '머신러닝 보안', 'ai보안서비스', '인공지능보안서비스',
  ],
  openGraph: {
    title: '네트워크 보안 · IDS/IPS — LunarFlux AI',
    description: '룰 기반 + ML 보조 탐지. 경계·내부 세그먼트 통합 운영.',
    url: 'https://lunarflux.ai/services/network-security/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/network-security/' },
}

export default function Page() {
  const s = getServiceBySlug('network-security')!
  return <ServiceDetailPage s={s} />
}
