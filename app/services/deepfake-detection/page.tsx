import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '딥페이크 탐지 서비스 — LunarFlux AI',
  description: '라이브 스트림 내 AI 합성 영상·음성 실시간 검출. 방송사·기업 미디어 대상 고부가가치.',
  alternates: { canonical: 'https://lunarflux.ai/services/deepfake-detection/' },
}

export default function Page() {
  const s = getServiceBySlug('deepfake-detection')!
  return <ServiceDetailPage s={s} />
}
