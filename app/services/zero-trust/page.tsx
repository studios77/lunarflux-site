import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('zero-trust')!

export const metadata: Metadata = serviceMetadata({
  slug: 'zero-trust',
  title: '제로트러스트 보안 아키텍처 설계 | LunarFlux AI',
  description: '경계 없는 보안 시대, 최소 권한 원칙과 지속 검증을 기반으로 하는 기업 맞춤형 제로트러스트 보안 컨설팅.',
  keywords: ['제로트러스트', '보안 아키텍처', '최소권한', '접근통제', '보안 컨설팅'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
