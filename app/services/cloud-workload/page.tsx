import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl } from '@/lib/site'

const s = findServiceBySlug('cloud-workload')!

export const metadata: Metadata = {
  title: '클라우드 워크로드 보호 · 컨테이너 보안 (CWPP) | LunarFlux AI',
  description:
    '컨테이너 이미지 취약점 점검부터 쿠버네티스 설정 진단, 런타임 이상 행위 탐지까지 워크로드 보안을 한 흐름으로 다룹니다.',
  keywords: ['CWPP', '컨테이너 보안', '쿠버네티스 보안', '워크로드 보호', '이미지 스캔'],
  alternates: { canonical: serviceCanonicalUrl('cloud-workload') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
