import Link from 'next/link'

/**
 * 관제 중심 히어로.
 *
 * 큰 제목만 놓는 대신 방화벽이 실제로 무엇을 보고 있는지를 첫 화면에 둡니다.
 * IDC·SI 업체 사이트와 구분되는 지점이라, 보안 회사로 읽히게 하는 것이 목적입니다.
 *
 * 수치 표기 원칙:
 *  - 티커와 우측 카드의 값(51,977 · 105 · 0)은 콘솔 실측 고정값입니다.
 *  - 인시던트 목록은 화면 형태를 보이기 위한 예시이며, 출발지는 국가와
 *    ASN 유형까지만 씁니다. 실제 공격자 IP 는 싣지 않습니다.
 *    실시간처럼 오해되지 않도록 "예시 화면" 을 명시합니다.
 */
const TICKER = [
  { label: '데이터패스', value: 'ENFORCING' },
  { label: 'IDS', value: '51,977 시그니처' },
  { label: 'WAF', value: '105 규칙' },
  { label: '지오블로킹', value: '적용 중' },
  { label: '외부 전송', value: '0' },
]

const INCIDENTS = [
  { score: 71, cc: 'US', org: 'Cloud Provider (ASN)', tags: ['Scanner', '계층모순'] },
  { score: 68, cc: 'US', org: 'Broadband ISP (ASN)', tags: ['RCE·LFI·CMDi'] },
  { score: 65, cc: 'CN', org: 'Regional ISP (ASN)', tags: ['봇 의심'] },
]

const STATS = [
  { value: '51,977', label: 'IDS 시그니처', fill: '88%' },
  { value: '105', label: '자체 WAF 규칙 · 21 카테고리', fill: '72%' },
  { value: '0', label: '외부 전송 · 로컬 AI 분석', fill: '100%' },
]

export default function Hero() {
  return (
    <>
      {/* 상단 상태 티커. 가로 스크롤을 허용해 좁은 화면에서 줄바꿈으로 뭉치지 않게 합니다. */}
      <div className="relative z-10 border-b border-line bg-elev">
        <div className="container-page flex items-center gap-4 overflow-x-auto py-2.5">
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-label font-bold text-danger">
            <span className="inline-block size-1.5 animate-[pulseDot_1.5s_ease-in-out_infinite] rounded-full bg-danger" />
            LIVE
          </span>
          {TICKER.map(t => (
            <span key={t.label} className="flex shrink-0 items-center gap-1.5 font-mono text-label text-fg-subtle">
              <span className="text-line-strong">·</span>
              {t.label}
              <b className="font-semibold text-fg-muted">{t.value}</b>
            </span>
          ))}
        </div>
      </div>

      <section id="hero" className="relative z-10 overflow-hidden pb-24 pt-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_900px_460px_at_50%_8%,rgba(52,211,153,0.14),transparent_62%),radial-gradient(ellipse_620px_340px_at_82%_40%,rgba(248,113,113,0.09),transparent_58%)]"
        />

        <div className="container-page relative">
          <div className="mb-14 max-w-2xl">
            <div className="mb-6 inline-flex animate-[fadeUp_0.8s_ease_both] items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 font-mono text-label uppercase tracking-[0.12em] text-accent">
              차세대 방화벽 · AI 보안 관제 · 클라우드 보안
            </div>
            <h1 className="mb-5 animate-[fadeUp_0.8s_0.1s_ease_both] break-keep text-[clamp(2.25rem,5.5vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-fg">
              <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent">
                AI 보안
              </span>
              을 설계하고
              <br />
              직접 운영합니다
            </h1>
            <p className="mb-8 max-w-xl animate-[fadeUp_0.8s_0.2s_ease_both] break-keep text-lead text-fg-muted">
              자체 개발한 Lunarflux Guard가 네트워크 계층에서 직접 지문을 수집합니다. 분석은 전부 온프레미스에서 끝납니다.
            </p>
            <div className="flex animate-[fadeUp_0.8s_0.3s_ease_both] flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-9 py-3.5 text-center text-body font-semibold text-canvas shadow-[0_8px_28px_rgba(52,211,153,0.28)] transition-colors hover:bg-accent-2"
              >
                무료 상담 신청
              </Link>
              <Link
                href="/services/lunarflux-guard/"
                className="rounded-full border border-line-strong bg-surface/60 px-9 py-3.5 text-center text-body font-semibold text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                제품 살펴보기
              </Link>
            </div>
          </div>

          {/* 관제 보드 */}
          <div className="grid animate-[fadeUp_0.8s_0.4s_ease_both] grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-2xl border border-line bg-surface/55 p-6 backdrop-blur">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="font-mono text-label uppercase tracking-[0.12em] text-accent-2">
                  활성 인시던트
                </span>
                {/* 실시간 데이터로 오해되지 않도록 명시합니다 */}
                <span className="ml-auto font-mono text-label text-fg-subtle">점수순 · 예시 화면</span>
              </div>
              <div className="flex flex-col">
                {INCIDENTS.map(inc => (
                  <div
                    key={inc.org}
                    className="flex items-center gap-3 border-t border-line py-3.5 first:border-t-0 first:pt-0"
                  >
                    <span className="min-w-9 shrink-0 font-mono text-[1.2rem] font-extrabold leading-none text-danger">
                      {inc.score}
                    </span>
                    <span className="shrink-0 rounded border border-line bg-elev px-2 py-0.5 font-mono text-label text-fg-muted">
                      {inc.cc}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-body text-fg-muted">{inc.org}</span>
                    <span className="hidden shrink-0 gap-1.5 sm:flex">
                      {inc.tags.map(tag => (
                        <span
                          key={tag}
                          className="whitespace-nowrap rounded-full border border-line bg-elev px-2.5 py-0.5 font-mono text-label text-fg-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {STATS.map(s => (
                <div key={s.label} className="rounded-xl border border-line bg-elev px-5 py-4">
                  <div className="text-[1.5rem] font-extrabold leading-none tracking-[-0.02em] text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1.5 break-keep font-mono text-label uppercase tracking-[0.06em] text-fg-subtle">
                    {s.label}
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                    <span className="block h-full bg-accent" style={{ width: s.fill }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
