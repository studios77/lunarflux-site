import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('server-rental')!

export const metadata: Metadata = {
  title: `${s.name} | ${SITE_NAME}`,
  description: s.summary,
  alternates: { canonical: serviceCanonicalUrl('server-rental') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
