import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Yeti', allow: '/' },
      { userAgent: 'bingbot', allow: '/' },
      { userAgent: 'DaumOA', allow: '/' },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
