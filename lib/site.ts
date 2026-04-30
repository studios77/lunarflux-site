export const SITE_NAME = 'LunarFlux AI'

/** Production site origin (trailing slash 없음) */
export const SITE_ORIGIN = 'https://lunarflux.ai'

export function serviceCanonicalUrl(slug: string): string {
  return `${SITE_ORIGIN}/services/${slug}/`
}

