const STATS = [
  { num: '99.99', unit: '%', label: 'Uptime SLA' },
  { num: '1~2', unit: 's', label: 'LL-HLS 레이턴시' },
  { num: '24', unit: '/7', label: '보안 관제' },
  { num: '14', unit: '개', label: '통합 서비스' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      {/* 앰비언트 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[16%] h-[420px] w-[min(920px,120vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_40%_40%,rgba(52,211,153,0.18),transparent_58%),radial-gradient(ellipse_at_72%_32%,rgba(34,211,238,0.14),transparent_52%),radial-gradient(ellipse,rgba(99,102,241,0.10)_36%,transparent_74%)] blur-[10px] md:h-[560px]"
      />

      <div className="container-page text-center">
        <div className="mb-8 inline-flex animate-[fadeUp_0.8s_ease_both] items-center gap-2 rounded-sm border border-accent/35 bg-accent/5 px-4 py-1.5 font-mono text-label uppercase tracking-[0.12em] text-accent">
          <span className="inline-block size-1.5 animate-[pulseDot_1.5s_ease-in-out_infinite] rounded-full bg-accent" />
          IDC · AI 보안 · 라이브 스트리밍 솔루션
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl animate-[fadeUp_0.8s_0.1s_ease_both] break-keep text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg">
          IDC ·{' '}
          <span className="bg-gradient-to-br from-accent via-accent-2 to-indigo-400 bg-clip-text text-transparent">
            AI 보안
          </span>
          {' · '}
          <span className="whitespace-nowrap">스트리밍솔루션</span>
          <br />
          <span className="font-bold text-fg-muted">한곳에서 설계하고 운영합니다</span>
        </h1>

        <p className="mx-auto mb-12 max-w-xl animate-[fadeUp_0.8s_0.2s_ease_both] break-keep text-base leading-[1.85] text-fg-muted">
          서버 임대·위탁운영부터 자율 보안 관제, 스트림 이상 탐지, 딥페이크 검출까지.
          <br className="hidden sm:block" /> 고객 환경에 맞춰 붙이고, UltraStreamingEngine으로 라이브까지 이어 드립니다.
        </p>

        <div className="flex animate-[fadeUp_0.8s_0.3s_ease_both] flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <a
            href="#services"
            className="rounded-full bg-accent px-10 py-4 text-body font-semibold tracking-[0.02em] text-canvas shadow-[0_8px_28px_rgba(52,211,153,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-2 hover:shadow-[0_14px_36px_rgba(34,211,238,0.38)]"
          >
            서비스 살펴보기
          </a>
          <a
            href="/contact"
            className="rounded-full border border-line-strong bg-surface/60 px-10 py-4 text-body font-semibold tracking-[0.02em] text-fg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface"
          >
            무료 상담 신청
          </a>
        </div>

        <div className="mt-20 grid animate-[fadeUp_0.8s_0.4s_ease_both] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map(s => (
            <div
              key={s.label}
              className="rounded-2xl border border-line bg-surface/60 px-4 py-6 text-center backdrop-blur transition-colors duration-300 hover:border-accent/40 sm:px-8"
            >
              <span className="mb-1 block text-[2rem] font-extrabold leading-tight text-fg sm:text-[2.8rem]">
                {s.num}
                <span className="ml-0.5 text-[1.2rem] text-accent sm:text-[1.6rem]">{s.unit}</span>
              </span>
              <span className="text-meta font-semibold tracking-[0.04em] text-fg-subtle sm:text-body">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
