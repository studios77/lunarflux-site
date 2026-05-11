import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('aidc')!

export const metadata: Metadata = {
  title: '최신 GPU 호스팅 및 AI 전용 IDC (AIDC) | LunarFlux AI',
  description: 'RTX 5090 등 고성능 GPU 서버 임대 및 초고전력 코로케이션 서비스. 딥러닝과 LLM 학습에 최적화된 AIDC를 경험하세요.',
  keywords: ['GPU 호스팅', 'AI 서버', 'AIDC', '고전력 코로케이션', '딥러닝 인프라'],
  alternates: { canonical: serviceCanonicalUrl('aidc') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
