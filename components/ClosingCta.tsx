import Link from 'next/link'

/**
 * 마무리 블록. 예전 About 섹션(왜 LunarFlux인가 4항목 + 터미널 애니메이션)을
 * 세 줄로 줄여 여기에 흡수했습니다. 메인에서는 이유를 길게 설명하기보다
 * 상담으로 넘기는 편이 낫습니다.
 */
const REASONS = [
  { title: '직접 만듭니다', desc: '방화벽·관제 엔진을 자체 개발해 운영합니다.' },
  { title: '한 팀이 끝까지', desc: '설계·구축·장애 대응을 나눠 맡기지 않습니다.' },
  { title: '데이터는 안에서', desc: '분석을 온프레미스에서 수행합니다.' },
]

export default function ClosingCta() {
  return (
    <section id="about" className="relative z-10 bg-elev">
      <div className="container-page py-24 md:py-32">
        <div className="reveal grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          <div>
            <h2 className="mb-10 break-keep text-[clamp(1.9rem,4.5vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.02em] text-fg">
              보안은 맡기고,
              <br />
              <span className="text-fg-muted">본업에 집중하세요</span>
            </h2>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
              {REASONS.map(r => (
                <div key={r.title}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="inline-block size-1.5 rounded-full bg-accent" />
                    <span className="text-body font-bold text-fg">{r.title}</span>
                  </div>
                  <p className="break-keep text-meta text-fg-muted">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-9 py-4 text-center text-body font-semibold text-canvas shadow-[0_8px_28px_rgba(52,211,153,0.28)] transition-colors hover:bg-accent-2"
            >
              무료 상담 신청
            </Link>
            <Link
              href="/services/lunarflux-guard/"
              className="rounded-full border border-line-strong px-9 py-4 text-center text-body font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              제품 살펴보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
