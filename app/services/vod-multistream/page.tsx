import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VOD 관리 · 멀티 리스트림 동시 송출 — LunarFlux AI',
  description: '라이브 방송 자동 녹화·VOD 저장·썸네일 자동생성. 유튜브·트위치·네이버TV·아프리카TV 동시 송출 자동화. CDN 연동 전 세계 빠른 배포.',
  keywords: [
    'VOD 플랫폼', '멀티스트림', '동시 송출', '유튜브 동시 방송', '트위치 동시 방송',
    '리스트림', '라이브 녹화', 'VOD 저장', '썸네일 자동생성', '다중 플랫폼 송출',
    '라이브 커머스 아카이빙', 'CDN 배포', '스트리밍 아카이브',
  ],
  openGraph: {
    title: 'VOD 관리 · 멀티 동시 송출 — LunarFlux AI',
    description: '유튜브·트위치·네이버 동시 송출, 자동 녹화·VOD 저장, 썸네일 자동생성.',
    url: 'https://lunarflux.ai/services/vod-multistream/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/vod-multistream/' },
}

export default function Page() {
  const s = getServiceBySlug('vod-multistream')!
  return <ServiceDetailPage s={s} />
}
