import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'

const s = getServiceBySlug('server-rental')!

export const metadata: Metadata = {
  title: `\ — LunarFlux AI`,
  description: s.summary,
  alternates: { canonical: `https://lunarflux.ai/services/server-rental/` },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
