import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('deepfake-detection')!

export const metadata: Metadata = {
  title: '실시간 딥페이크 탐지 및 영상 보안 솔루션 | LunarFlux AI',
  description: '라이브 스트림 내 AI 합성 영상과 보이스 클로닝을 실시간으로 검출하는 딥페이크 탐지 솔루션을 도입하세요.',
  keywords: ['딥페이크 탐지', '영상 보안', '딥페이크 검출', 'AI 음성 탐지', '보이스피싱 방지'],
  alternates: { canonical: serviceCanonicalUrl('deepfake-detection') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
