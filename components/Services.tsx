import Link from 'next/link'
import { servicesData } from '@/lib/servicesData'

/**
 * 홈 서비스 개요.
 *
 * 예전에는 18개 서비스를 카드로 전부 펼쳐 스크롤이 길고 무엇을 먼저 볼지
 * 알 수 없었습니다. 여기서는 보안 4개 축만 카드로 두고 서비스는 이름 링크로
 * 접습니다. 상세는 각 페이지와 메가메뉴가 이미 담고 있습니다.
 *
 * 콘텐츠 출처는 lib/servicesData.ts 하나입니다.
 */
const PILLARS: { label: string; prefix: string; blurb: string }[] = [
  { label: '네트워크 보안', prefix: '보안 / 네트워크', blurb: '경계부터 내부 세그먼트까지' },
  { label: '클라우드 보안', prefix: '보안 / 클라우드', blurb: '설정·권한·워크로드 점검' },
  { label: 'AI · 데이터 보안', prefix: '보안 / AI·데이터', blurb: '생성형 AI와 합성 미디어 대응' },
  { label: '보안 운영', prefix: '보안 / 운영', blurb: '24시간 자율 관제와 대응' },
]

const infraCount = servicesData.filter(s => s.cat.startsWith('IDC')).length
const streamCount = servicesData.filter(s => s.cat.startsWith('스트리밍')).length

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-canvas">
      <div className="container-page py-24 md:py-32">
        <div className="reveal max-w-xl">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Security Services
          </div>
          <h2 className="break-keep text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-fg">
            네 개의 축으로 지킵니다
          </h2>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PILLARS.map(pillar => {
            const items = servicesData.filter(s => s.cat.startsWith(pillar.prefix))
            if (items.length === 0) return null

            return (
              <div
                key={pillar.label}
                className="rounded-2xl border border-line bg-surface/60 px-8 py-9 backdrop-blur transition-colors duration-300 hover:border-accent/50"
              >
                <h3 className="mb-1.5 break-keep text-[1.25rem] font-bold tracking-[-0.02em] text-fg">
                  {pillar.label}
                </h3>
                <p className="mb-6 break-keep text-meta text-fg-subtle">{pillar.blurb}</p>

                <ul className="flex list-none flex-col">
                  {items.map(s => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="group flex items-center gap-2.5 border-t border-line py-3 text-body text-fg-muted transition-colors hover:text-accent"
                      >
                        <span className="shrink-0 text-meta opacity-60">{s.icon}</span>
                        <span className="min-w-0 break-keep">{s.name}</span>
                        <span
                          aria-hidden
                          className="ml-auto shrink-0 text-fg-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* 인프라·스트리밍은 보안 아래로 접습니다. 여전히 하는 일이지만
            메인의 초점은 보안입니다. */}
        <div className="reveal mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-elev px-8 py-7 sm:flex-row sm:items-center">
          <p className="break-keep text-body text-fg-muted">
            <span className="font-semibold text-fg">IDC 인프라 {infraCount}종</span> · 스트리밍{' '}
            {streamCount}종도 함께 운영합니다.
          </p>
          <Link
            href="/contact"
            className="shrink-0 font-mono text-meta tracking-[0.04em] text-accent transition-colors hover:text-accent-2 sm:ml-auto"
          >
            인프라 문의 →
          </Link>
        </div>
      </div>
    </section>
  )
}
