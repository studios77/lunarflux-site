import type { Metadata } from 'next'
import ServiceDetailPage from '@/components/ServiceDetailPage'
import { findServiceBySlug } from '@/lib/servicesData'
import { serviceCanonicalUrl, SITE_NAME } from '@/lib/site'

const s = findServiceBySlug('ai-stream-security')!

export const metadata: Metadata = {
  title: `${s.name} | ${SITE_NAME}`,
  description: s.summary,
  alternates: { canonical: serviceCanonicalUrl('ai-stream-security') },
}

export default function Page() {
  return <ServiceDetailPage s={s} />
}
