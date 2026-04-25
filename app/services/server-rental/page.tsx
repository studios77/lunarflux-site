import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서버 임대 · 코로케이션 — LunarFlux AI',
  description: '가상화 기반 VM 즉시 할당부터 고객 장비 입주(코로케이션)까지. 전력·냉각·네트워크 포함, IPMI 원격관리.',
  alternates: { canonical: 'https://lunarflux.ai/services/server-rental/' },
}

export default function Page() {
  const s = getServiceBySlug('server-rental')!
  return <ServiceDetailPage s={s} />
}
