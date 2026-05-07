import ServiceDetailPage from '@/components/ServiceDetailPage'
import { getServiceBySlug } from '@/lib/servicesData'
import { getSEO } from '@/lib/seo'

export const metadata = getSEO('aidc')

export default function AIDCPage() {
  const data = getServiceBySlug('aidc')
  if (!data) return <div>Not Found</div>
  return <ServiceDetailPage data={data} />
}
