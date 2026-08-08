import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ServiceIcon from '@/components/ServiceIcon'
import { servicesData } from '@/lib/servicesData'
import { SITE_NAME } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

/**
 * 사용자용 사이트맵.
 *
 * 검색엔진용 /sitemap.xml 과는 별개로, 방문자가 전체 구조를 한눈에 보는
 * 페이지입니다. 모든 상세 페이지로 가는 내부 링크가 한곳에 모이므로
 * 크롤러가 페이지를 발견하는 경로도 하나 더 생깁니다.
 *
 * 경로가 /sitemap 이 아니라 /sitemap-page 인 이유: app/sitemap.ts 가
 * /sitemap.xml 을 만들고 있어 이름이 겹치지 않게 피했습니다.
 *
 * 목록은 servicesData 에서 가져오므로 서비스를 추가하면 자동으로 실립니다.
 */
export const metadata: Metadata = pageMetadata({
  path: '/sitemap-page/',
  title: `사이트맵 | ${SITE_NAME}`,
  description:
    'LunarFlux AI 전체 페이지 목록. 네트워크·클라우드·AI 데이터 보안과 보안 운영, IDC 인프라, 스트리밍 서비스를 한눈에 확인하세요.',
  keywords: ['사이트맵', 'LunarFlux AI 서비스', '전체 서비스 목록'],
})

/** 노출 순서 = 배열 순서. 보안을 앞에, 스트리밍을 뒤에 둡니다. */
const GROUPS: { label: string; prefix: string; desc: string }[] = [
  {
    label: '네트워크 보안',
    prefix: '보안 / 네트워크',
    desc: '경계 방화벽부터 내부 세그먼트까지, 트래픽이 지나는 길목을 통제합니다.',
  },
  {
    label: '클라우드 보안',
    prefix: '보안 / 클라우드',
    desc: 'AWS·Azure·GCP 계정 설정과 컨테이너 워크로드를 한 흐름으로 점검합니다.',
  },
  {
    label: 'AI · 데이터 보안',
    prefix: '보안 / AI·데이터',
    desc: '생성형 AI 도입에 따르는 유출 리스크와 합성 영상·음성 탐지를 다룹니다.',
  },
  {
    label: '보안 운영',
    prefix: '보안 / 운영',
    desc: '탐지 이후를 맡습니다. 24시간 자율 관제와 플레이북 기반 자동 대응.',
  },
  {
    label: 'IDC 인프라',
    prefix: 'IDC',
    desc: '서버 임대·코로케이션부터 GPU 호스팅, 이중화, 위탁운영, 장애 복구까지.',
  },
  {
    label: '스트리밍',
    prefix: '스트리밍',
    desc: '초저지연 라이브 송출과 VOD 아카이빙·멀티 플랫폼 동시 리스트림.',
  },
]

const GENERAL = [
  { href: '/', label: '홈', desc: 'AI 보안 전문 기업 LunarFlux AI' },
  { href: '/contact/', label: '무료 상담 · 문의', desc: '도입 상담, 견적, 긴급 장애 대응 접수' },
]

export default function SitemapPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-canvas text-fg">
        <section className="container-page pb-24 pt-32 md:pt-36">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Sitemap
          </div>
          <h1 className="mb-4 break-keep text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em]">
            사이트맵
          </h1>
          <p className="mb-14 max-w-xl break-keep text-lead text-fg-muted">
            전체 페이지를 한눈에 볼 수 있습니다. 보안 {servicesData.filter(s => s.cat.startsWith('보안')).length}종을
            포함해 모두 {servicesData.length}개 서비스를 운영합니다.
          </p>

          <div className="mb-12">
            <h2 className="mb-5 break-keep text-[1.25rem] font-bold tracking-[-0.02em]">일반</h2>
            <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2">
              {GENERAL.map(g => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="group block rounded-xl border border-line bg-surface/60 px-5 py-4 transition-colors hover:border-accent/50"
                  >
                    <span className="block text-body font-semibold text-fg transition-colors group-hover:text-accent">
                      {g.label}
                    </span>
                    <span className="mt-1 block break-keep text-meta text-fg-subtle">{g.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {GROUPS.map(group => {
            const items = servicesData.filter(s => s.cat.startsWith(group.prefix))
            if (items.length === 0) return null

            return (
              <div key={group.label} className="mb-12">
                <div className="mb-2 flex items-center gap-4">
                  <h2 className="shrink-0 break-keep text-[1.25rem] font-bold tracking-[-0.02em]">
                    {group.label}
                  </h2>
                  <span className="h-px flex-1 bg-line" />
                  <span className="shrink-0 font-mono text-label text-fg-subtle">{items.length}</span>
                </div>
                <p className="mb-5 max-w-2xl break-keep text-meta text-fg-subtle">{group.desc}</p>

                <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(s => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="group flex h-full gap-3.5 rounded-xl border border-line bg-surface/60 px-5 py-4 transition-colors hover:border-accent/50"
                      >
                        <ServiceIcon
                          slug={s.slug}
                          className="mt-0.5 size-5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent"
                        />
                        <span className="min-w-0">
                          <span className="block break-keep text-body font-semibold text-fg transition-colors group-hover:text-accent">
                            {s.name}
                          </span>
                          <span className="mt-1 block break-keep text-meta text-fg-subtle">
                            {s.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  )
}
