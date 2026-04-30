import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('zero-trust')!

export const metadata: Metadata = {
  title: `${s.name} | ${SITE_NAME}`,
  description: s.summary,
  alternates: { canonical: serviceCanonicalUrl('zero-trust') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
