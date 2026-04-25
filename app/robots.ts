import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      {
        userAgent: 'bingbot',
        allow: '/',
      },
      {
        userAgent: 'DaumOA',
        allow: '/',
      },
    ],
    sitemap: 'https://lunarflux.ai/sitemap.xml',
    host: 'https://lunarflux.ai',
  }
}
