import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('system-recovery-migration')!

export const metadata: Metadata = {
  title: '서버 장애 복구 및 시스템 클라우드 이전 | LunarFlux AI',
  description: '랜섬웨어 사고 복구, 데이터베이스 복원, 그리고 레거시 인프라의 클라우드 이전(Migration) 전문 기술 지원 서비스.',
  keywords: ['서버 장애 복구', '시스템 이전', '클라우드 마이그레이션', '데이터 복원', '트러블슈팅'],
  alternates: { canonical: serviceCanonicalUrl('system-recovery-migration') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
