import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl } from '@/lib/site'

const s = findServiceBySlug('lunarflux-guard')!

export const metadata: Metadata = {
  title: '차세대 방화벽 NGFW · WAF · AI 통합 어플라이언스 | LunarFlux AI',
  description:
    'NGFW와 WAF, 로컬 AI 분석을 한 대에 융합한 온프레미스 보안 어플라이언스. L2 투명 인라인으로 IP 변경 없이 삽입되며 보호 대상 서버에는 무설치입니다.',
  keywords: ['NGFW', '차세대 방화벽', 'WAF', '웹방화벽', 'JA4', '봇 차단', 'IDC 보안', '온프레미스 보안'],
  alternates: { canonical: serviceCanonicalUrl('lunarflux-guard') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
