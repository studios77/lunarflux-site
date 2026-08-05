import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import type { ServiceData } from '@/lib/servicesData'
import { getRelatedServices } from '@/lib/servicesData'
import { SITE_NAME, serviceCanonicalUrl } from '@/lib/site'

const SECTION = 'py-16 md:py-20'
const TH = 'border-b border-line px-5 py-3.5 text-center font-mono text-[0.65rem] font-normal uppercase tracking-[0.1em] text-fg-subtle'
const TD = 'border-b border-line px-5 py-3.5 text-center text-[0.8rem] text-fg-muted'

function SectionLabel({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div
      className={`mb-4 flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] ${
        muted ? 'text-fg-subtle' : 'text-accent-2'
      }`}
    >
      {!muted && <span className="inline-block h-px w-6 bg-accent-2" />}
      {children}
    </div>
  )
}

export default function ServiceDetailPage({ s }: { s: ServiceData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.seoH1 || s.name,
    description: s.desc,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: 'https://lunarflux.ai'
    },
    url: serviceCanonicalUrl(s.slug),
    category: s.cat,
    serviceType: s.name,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav·Footer는 <main> 밖에 둡니다. 랜드마크가 겹치면 스크린리더의
          "본문으로 건너뛰기"가 내비게이션부터 읽습니다. */}
      <Nav />
      <main className="min-h-screen bg-canvas text-fg">
        <section className="container-page pb-16 pt-28 md:pb-20 md:pt-30">
          <SectionLabel>{s.cat}</SectionLabel>
          <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row">
            <div className="flex size-18 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface text-[2.4rem]">
              {s.icon}
            </div>
            <div>
              <h1 className="mb-3 break-keep text-[clamp(1.85rem,4.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                {s.name}
              </h1>
              <p className="max-w-2xl break-keep text-[1.05rem] leading-[1.8] text-fg-muted">{s.desc}</p>
            </div>
          </div>
        </section>

        <section className={`bg-elev ${SECTION}`}>
          <div className="container-page">
            <SectionLabel>핵심 기능</SectionLabel>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {s.highlights.map((h, i) => (
                <div key={h.title} className="bg-elev px-7 py-9">
                  <div className="mb-3 font-mono text-[0.65rem] tracking-[0.1em] text-accent">
                    0{i + 1}
                  </div>
                  <div className="mb-2.5 break-keep text-[1.1rem] font-semibold">{h.title}</div>
                  <div className="break-keep text-[0.85rem] leading-[1.75] text-fg-muted">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={SECTION}>
          <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-15">
            <div>
              <SectionLabel>사양 / 스펙</SectionLabel>
              <ul className="mt-7 list-none">
                {s.specs.map(spec => (
                  <li
                    key={spec}
                    className="flex items-start gap-3 break-keep border-b border-line py-3 text-[0.875rem] leading-[1.6] text-fg-muted"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] text-accent">—</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>활용 사례</SectionLabel>
              <ul className="mt-7 list-none">
                {s.useCases.map(uc => (
                  <li
                    key={uc}
                    className="flex items-start gap-3 break-keep border-b border-line py-3 text-[0.875rem] leading-[1.6] text-fg-muted"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] text-accent-2">✓</span>
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {s.comparison && s.comparison.items.length > 0 && (
          <section className={`bg-elev ${SECTION}`}>
            <div className="container-page">
              <SectionLabel>{s.comparison.label}</SectionLabel>
              <div className="mt-6 overflow-x-auto rounded-lg border border-line">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="bg-surface">
                      <th className={`${TH} text-left`}>기능</th>
                      <th className={`${TH} min-w-40 bg-accent/6 font-bold text-accent`}>
                        {s.slug === 'aidc'
                          ? 'AIDC GPU 전용 호스팅'
                          : s.slug === 'ultrastream'
                            ? 'UltraStreamingEngine'
                            : s.name}
                      </th>
                      {s.comparison.items[0]?.others && (
                        <>
                          <th className={TH}>A사</th>
                          <th className={TH}>B사</th>
                          <th className={TH}>C사</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {s.comparison.items.map((item, i) => (
                      <tr key={item.label} className={i % 2 === 0 ? '' : 'bg-white/[0.015]'}>
                        <td className="border-b border-line px-5 py-3.5 font-mono text-[0.8rem] tracking-[0.03em] text-fg-muted">
                          {item.label}
                        </td>
                        <td className="border-b border-line bg-accent/4 px-5 py-3.5 text-center text-[0.8rem] font-semibold text-accent">
                          {item.ours}
                        </td>
                        {item.others && (
                          <>
                            <td className={TD}>{item.others[0]}</td>
                            <td className={TD}>{item.others[1]}</td>
                            <td className={TD}>{item.others[2]}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 break-keep font-mono text-[0.75rem] leading-[1.6] text-fg-subtle">
                * 비교 정보는 각 엔진의 공개 문서 기준이며, 버전·플랜에 따라 차이가 있을 수 있습니다. 최신 정보는 각 벤더 공식 문서를 확인하세요.
              </p>
            </div>
          </section>
        )}

        {s.coloPricing && s.coloPricing.length > 0 && (
          <section className={`bg-surface ${SECTION}`}>
            <div className="container-page">
              <SectionLabel>코로케이션 요금표</SectionLabel>
              <h2 className="mb-2 text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
                상품별 월정액 요금
              </h2>
              <p className="mb-10 break-keep text-[0.88rem] leading-[1.7] text-fg-muted">
                모든 상품에 전력·냉각·네트워크 회선·IPMI 원격관리가 포함됩니다. 부가세(10%) 별도 적용.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {s.coloPricing.map(plan => (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col rounded-xl px-5 pb-6 pt-7 ${
                      plan.popular
                        ? 'border-[1.5px] border-accent bg-gradient-to-b from-accent/12 to-surface shadow-[0_0_32px_rgba(52,211,153,0.18)]'
                        : 'border border-line bg-surface'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3.5 py-0.5 font-mono text-[0.62rem] font-bold tracking-[0.08em] text-canvas">
                        POPULAR
                      </div>
                    )}
                    <div
                      className={`mb-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] ${
                        plan.popular ? 'text-accent' : 'text-fg-subtle'
                      }`}
                    >
                      {plan.size}
                    </div>
                    <div className="mb-4 break-keep text-base font-bold text-fg">{plan.name}</div>
                    <div
                      className={`mb-1 text-[1.15rem] font-extrabold tracking-[-0.02em] ${
                        plan.popular ? 'text-accent' : 'text-fg'
                      }`}
                    >
                      {plan.price}
                    </div>
                    <div className="mb-5 font-mono text-[0.7rem] text-fg-subtle">{plan.note}</div>
                    <div
                      className={`flex flex-col gap-2 border-t pt-4 ${
                        plan.popular ? 'border-accent/25' : 'border-line'
                      }`}
                    >
                      {[
                        { label: '네트워크', value: plan.network },
                        { label: '냉각·보안', value: '포함' },
                        { label: 'IPMI 원격관리', value: '포함' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between text-[0.78rem] text-fg-muted">
                          <span>{item.label}</span>
                          <span className="font-semibold text-fg">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 break-keep font-mono text-[0.78rem] leading-[1.7] text-fg-subtle">
                * 추가 IP, 전용 회선 업그레이드, 교차 연결(Cross Connect) 등은 별도 협의 | 장기 계약(6·12개월) 시 최대 20% 할인
              </p>
            </div>
          </section>
        )}

        <section className={`bg-elev text-center ${SECTION}`}>
          <div className="container-page">
            <div className="mx-auto max-w-xl">
            <h2 className="mb-4 break-keep text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-[-0.02em]">
              지금 바로 시작하세요
            </h2>
            <p className="mb-9 break-keep text-[0.95rem] leading-[1.8] text-fg-muted">
              전문 엔지니어가 검토 후 24시간 내 회신드리며, 긴급 장애는 즉시 대응합니다.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded bg-accent px-9 py-3.5 font-mono text-[0.8rem] font-medium tracking-[0.06em] text-canvas shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-colors hover:bg-accent-2"
              >
                {s.cta}
              </Link>
              <Link
                href="/#services"
                className="rounded border border-line-strong px-9 py-3.5 font-mono text-[0.8rem] tracking-[0.06em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                다른 서비스 보기
              </Link>
            </div>
            </div>
          </div>
        </section>

        <section className={SECTION}>
          <div className="container-page">
            <SectionLabel muted>관련 서비스</SectionLabel>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {getRelatedServices(s.slug, 4).map(sv => (
                <Link
                  key={sv.slug}
                  href={`/services/${sv.slug}/`}
                  title={sv.name}
                  className="block rounded-md border border-line bg-surface px-4 py-4.5 transition-colors hover:border-accent/50"
                >
                  <div className="mb-2 text-[1.05rem]">{sv.icon}</div>
                  <div className="mb-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-accent">
                    {sv.cat}
                  </div>
                  <div className="mb-1.5 break-keep text-[0.88rem] font-semibold leading-[1.25] text-fg">
                    {sv.name}
                  </div>
                  <div className="break-keep text-[0.74rem] leading-[1.55] text-fg-muted">
                    {sv.summary}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
