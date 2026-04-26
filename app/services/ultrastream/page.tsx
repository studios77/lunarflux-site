import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '라이브 스트리밍 솔루션 · Ultrastream 엔진 — LunarFlux AI',
  description: '초저지연 라이브 스트리밍 플랫폼. LL-HLS 1~2초 레이턴시, ABR 4단계 화질 자동전환, RTMP·WebRTC·SRT 멀티 프로토콜. CDN 연동 무제한 동시 시청자.',
  keywords: [
    '라이브 스트리밍 솔루션', '스트리밍 플랫폼', '영상 스트리밍', '라이브 방송 솔루션',
    '초저지연 스트리밍', 'LL-HLS', 'WebRTC', 'RTMP', 'SRT 스트리밍',
    'ABR 스트리밍', '라이브 스트리밍 호스팅', 'OTT 솔루션', '스트리밍 서버',
    'Ultrastream', 'MediaMTX', '라이브 방송 플랫폼',
  ],
  openGraph: {
    title: '라이브 스트리밍 솔루션 · Ultrastream — LunarFlux AI',
    description: 'LL-HLS 초저지연 1~2초, ABR 4단계, RTMP·WebRTC·SRT 지원. CDN 연동 무제한 확장.',
    url: 'https://lunarflux.ai/services/ultrastream/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/ultrastream/' },
}

export default function Page() {
  const s = getServiceBySlug('ultrastream')!
  return <ServiceDetailPage s={s} />
}
