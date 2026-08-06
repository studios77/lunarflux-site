import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceMetadata } from '@/lib/seo'

const s = findServiceBySlug('cloud-posture')!

export const metadata: Metadata = serviceMetadata({
  slug: 'cloud-posture',
  title: '클라우드 보안 형상 진단 (CSPM) | LunarFlux AI',
  description:
    'AWS·Azure·GCP 계정의 설정 오류와 외부 노출, 과다 권한을 점검하고 위험도에 따른 개선 순서를 제시합니다.',
  keywords: ['CSPM', '클라우드 보안', '클라우드 보안 진단', 'AWS 보안', 'Azure 보안', '권한 정리'],
})

export default function Page() {
  return <ServiceDetailPage s={s} />
}
