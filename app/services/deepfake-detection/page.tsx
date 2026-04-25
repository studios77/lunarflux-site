import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'

const s = getServiceBySlug('deepfake-detection')!

export const metadata: Metadata = {
  title: `\ — LunarFlux AI`,
  description: s.summary,
  alternates: { canonical: `https://lunarflux.ai/services/deepfake-detection/` },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
