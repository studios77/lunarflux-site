import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '딥페이크 탐지 서비스 · AI 합성 영상 검출 — LunarFlux AI',
  description: '실시간 라이브 스트림 딥페이크 탐지. AI 합성 영상·음성 자동 검출, 탐지 정확도 95% 이상. 보이스피싱 대응, 보이스 클로닝 탐지, 방송사·기업 미디어 특화.',
  keywords: [
    '딥페이크 탐지', '딥페이크 검출', '딥페이크 방지', 'AI 합성 영상 탐지',
    '보이스 클로닝 탐지', '보이스피싱 탐지', '딥페이크 솔루션', 'FaceForensics',
    '인공지능 합성 탐지', '라이브 스트림 보안', '미디어 위변조 탐지', 'TensorRT',
  ],
  openGraph: {
    title: '딥페이크 탐지 서비스 — LunarFlux AI',
    description: '실시간 라이브 스트림 딥페이크·AI 합성 영상·보이스 클로닝 자동 검출. 정확도 95%+.',
    url: 'https://lunarflux.ai/services/deepfake-detection/',
    siteName: 'LunarFlux AI',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://lunarflux.ai/services/deepfake-detection/' },
}

export default function Page() {
  const s = getServiceBySlug('deepfake-detection')!
  return <ServiceDetailPage s={s} />
}
