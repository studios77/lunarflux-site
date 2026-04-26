import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서버 임대 · 코로케이션 · IDC 입주 — LunarFlux AI',
  description: '1U·2U·4U·하프랙·풀랙 코로케이션 월정액 서비스. IDC 서버 임대, 베어메탈 전용서버, VPS 즉시 할당. 전력·냉각·네트워크·IPMI 원격관리 포함. 장기계약 최대 20% 할인.',
  keywords: [
    'IDC 서버 임대', 'IDC 코로케이션', '코로케이션', '1U 서버', '2U 서버', '풀랙 임대',
    '하프랙 임대', '데이터센터 임대', '서버 호스팅', '베어메탈 서버', '전용서버 임대',
    'VPS', 'IPMI 원격관리', '서버 위탁운영', 'IDC 입주',
  ],
  openGraph: {
    title: 'IDC 서버 임대 · 코로케이션 — LunarFlux AI',
    description: '1U·2U·4U·하프랙·풀랙 코로케이션. 전력·냉각·네트워크 포함, 월정액 서비스.',
    url: 'https://lunarflux.ai/services/server-rental/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/server-rental/' },
}

export default function Page() {
  const s = getServiceBySlug('server-rental')!
  return <ServiceDetailPage s={s} />
}
