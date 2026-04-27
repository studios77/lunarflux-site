import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

const BASE = 'https://lunarflux.ai'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Yeti', allow: '/' },
      { userAgent: 'bingbot', allow: '/' },
      { userAgent: 'DaumOA', allow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
