import Link from 'next/link'
import { servicesData } from '@/lib/servicesData'

/**
 * 홈 서비스 목록.
 *
 * 콘텐츠는 lib/servicesData.ts 한 곳에서만 가져옵니다. 예전에는 이 파일이
 * 이름·설명·태그를 따로 들고 있어 상세 페이지와 문구가 갈라졌습니다.
 *
 * 그룹 순서가 곧 노출 순서입니다. 보안을 앞에, 스트리밍을 맨 뒤에 둡니다.
 */
const GROUPS: { label: string; prefix: string }[] = [
  { label: '네트워크 보안', prefix: '보안 / 네트워크' },
  { label: '클라우드 보안', prefix: '보안 / 클라우드' },
  { label: 'AI · 데이터 보안', prefix: '보안 / AI·데이터' },
  { label: '보안 운영', prefix: '보안 / 운영' },
  { label: 'IDC 인프라', prefix: 'IDC' },
  { label: '스트리밍', prefix: '스트리밍' },
]

const SECURITY_COUNT = servicesData.filter(s => s.cat.startsWith('보안')).length

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-elev">
      <div className="container-page py-24 md:py-32">
        <div className="reveal">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Services
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
            보안을 중심으로,
            <br />
            인프라까지 한 팀이
          </h2>
          <p className="max-w-lg break-keep text-body leading-[1.8] text-fg-muted">
            AI 보안 {SECURITY_COUNT}개 서비스에 IDC 인프라와 스트리밍까지. 필요한 범위만 고르셔도 됩니다.
          </p>
        </div>

        {GROUPS.map(group => {
          const items = servicesData.filter(s => s.cat.startsWith(group.prefix))
          if (items.length === 0) return null

          return (
            <div key={group.label} className="reveal mt-16 md:mt-20">
              <div className="mb-7 flex items-center gap-4">
                <h3 className="shrink-0 break-keep text-[1.25rem] font-bold tracking-[-0.02em] text-fg">
                  {group.label}
                </h3>
                <span className="h-px flex-1 bg-line" />
                <span className="shrink-0 font-mono text-label text-fg-subtle">
                  {items.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(s => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}/`}
                    title={s.name}
                    className="group block min-w-0"
                  >
                    <div className="relative h-full min-w-0 overflow-hidden rounded-2xl border border-line bg-surface/60 px-8 py-10 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:bg-surface group-hover:shadow-[0_16px_40px_rgba(52,211,153,0.14)]">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-line-strong bg-elev text-[1.4rem] transition-colors duration-300 group-hover:border-accent/60">
                        {s.icon}
                      </div>
                      {/* 카드마다 카테고리를 다시 쓰지 않습니다 — 위 그룹 제목이 이미 말합니다 */}
                      <div className="mb-3 break-keep text-[clamp(1rem,2.2vw,1.1rem)] font-bold leading-[1.4] tracking-[-0.02em] text-fg">
                        {s.name}
                      </div>
                      <div className="mb-5 break-keep text-body text-fg-muted">
                        {s.summary}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.slice(0, 3).map(t => (
                          <span
                            key={t}
                            className="rounded-full border border-line bg-accent/5 px-2.5 py-1 font-mono text-label font-medium tracking-[0.02em] text-fg-subtle"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-1 font-mono text-meta font-semibold tracking-[0.04em] text-accent">
                        자세히 보기
                        <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
