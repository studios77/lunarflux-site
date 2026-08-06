import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('vod-multistream')!

export const metadata: Metadata = serviceMetadata({
  slug: 'vod-multistream',
  title: 'VOD 관리 및 멀티 리스트림 솔루션 | LunarFlux AI',
  description: '라이브 방송 자동 VOD 저장, 썸네일 생성, 유튜브·트위치·네이버 등 멀티플랫폼 동시 송출 솔루션을 제공합니다.',
  keywords: ['VOD 솔루션', '리스트림', '동시송출', '유튜브 스트리밍', '멀티플랫폼'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
