import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('ultrastream')!

export const metadata: Metadata = {
  title: '초저지연 라이브 스트리밍 솔루션 (LL-HLS) | LunarFlux AI',
  description: '1~2초대 지연시간을 자랑하는 초저지연 라이브 스트리밍 솔루션. 안정적인 멀티 프로토콜 대규모 방송을 지원합니다.',
  keywords: ['초저지연 스트리밍', '라이브 스트리밍 솔루션', 'LL-HLS', 'WebRTC 방송', '인코딩 솔루션'],
  alternates: { canonical: serviceCanonicalUrl('ultrastream') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
