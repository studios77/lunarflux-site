import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ultrastream 엔진 호스팅 — LunarFlux AI',
  description: 'MediaMTX 기반 RTMP/HLS/WebRTC. LL-HLS 1~2초 레이턴시, ABR 4단계, SRT·RTSP 지원.',
  alternates: { canonical: 'https://lunarflux.ai/services/ultrastream/' },
}

export default function Page() {
  const s = getServiceBySlug('ultrastream')!
  return <ServiceDetailPage s={s} />
}
