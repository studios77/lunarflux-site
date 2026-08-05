import Link from 'next/link'

/**
 * 카드별 강조색. Tailwind가 클래스를 정적으로 수집할 수 있도록
 * 색상 문자열을 조립하지 않고 완성된 클래스명으로 보관합니다.
 */
const TONES = {
  emerald: {
    badge: 'text-accent bg-accent/10 border-accent/30',
    label: 'text-accent',
    stat: 'text-accent',
    quote: 'border-l-accent bg-accent/8',
    link: 'text-accent border-accent/50 hover:border-accent',
    card: 'hover:border-accent hover:shadow-[0_0_36px_rgba(52,211,153,0.16)]',
  },
  cyan: {
    badge: 'text-accent-2 bg-accent-2/10 border-accent-2/30',
    label: 'text-accent-2',
    stat: 'text-accent-2',
    quote: 'border-l-accent-2 bg-accent-2/8',
    link: 'text-accent-2 border-accent-2/50 hover:border-accent-2',
    card: 'hover:border-accent-2 hover:shadow-[0_0_36px_rgba(34,211,238,0.16)]',
  },
  indigo: {
    badge: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
    label: 'text-indigo-400',
    stat: 'text-indigo-400',
    quote: 'border-l-indigo-400 bg-indigo-400/8',
    link: 'text-indigo-400 border-indigo-400/50 hover:border-indigo-400',
    card: 'hover:border-indigo-400 hover:shadow-[0_0_36px_rgba(129,140,248,0.16)]',
  },
} as const

const edges = [
  {
    badge: '01 · 딥페이크 탐지',
    icon: '🔍',
    title: '실시간 딥페이크 탐지',
    subtitle: '국내 유일 라이브 스트림 특화',
    desc: '사후 분석에 그치는 기존 솔루션과 달리, 방송 중 합성 영상·음성을 프레임 단위로 잡아 즉시 차단합니다.',
    stats: [
      { val: '95%+', label: '탐지 정확도' },
      { val: '< 1s', label: '감지→차단' },
      { val: '24/7', label: '무인 감시' },
    ],
    highlight: '보이스피싱·선거 조작·기업 사칭 영상 대응에 즉시 적용 가능',
    tone: 'emerald' as const,
    link: '/services/deepfake-detection/',
  },
  {
    badge: '02 · AI 자율 관제',
    icon: '🤖',
    title: 'LLM 기반 AI 보안 관제',
    subtitle: '룰이 아닌 맥락으로 대응',
    desc: '정해진 패턴에만 반응하는 기존 관제와 달리 이벤트의 맥락을 읽습니다. 처음 보는 공격도 스스로 판단해 대응합니다.',
    stats: [
      { val: '50+', label: '자동 대응 시나리오' },
      { val: '90%', label: '관제 비용 절감' },
      { val: '< 5분', label: '위협→격리' },
    ],
    highlight: 'IT 보안 전담 인력이 없는 기업도 엔터프라이즈급 관제 실현',
    tone: 'cyan' as const,
    link: '/services/ai-security/',
  },
  {
    badge: '03 · 초저지연 스트리밍',
    icon: '📡',
    title: 'LL-HLS 1~2초 레이턴시',
    subtitle: '국내 CDN 평균 대비 10배 빠름',
    desc: '국내 CDN 평균 5~15초인 HLS 지연을 LL-HLS로 1~2초까지 낮춥니다. 라이브 커머스에서 지연은 곧 전환율입니다.',
    stats: [
      { val: '1~2s', label: 'LL-HLS 레이턴시' },
      { val: '80%', label: '비용 절감' },
      { val: '∞', label: '동시 시청자' },
    ],
    highlight: '스포츠 중계·라이브 커머스·실시간 경매에서 경쟁사와 체감 차이',
    tone: 'indigo' as const,
    link: '/services/ultrastream/',
  },
]

const trustStats = [
  { val: '99.99%', label: '서비스 가용성 SLA' },
  { val: '24/7', label: 'AI 자율 보안 관제' },
  { val: '< 30s', label: 'HA 자동 페일오버' },
  { val: '95%+', label: '딥페이크 탐지 정확도' },
]

const sectors = [
  { icon: '🏛️', label: '공공기관 · 지자체' },
  { icon: '🏦', label: '금융사 · 핀테크' },
  { icon: '📺', label: '방송사 · OTT' },
  { icon: '🛒', label: '이커머스 · 라이브커머스' },
  { icon: '🎮', label: '게임사 · 미디어' },
  { icon: '🏥', label: '의료 · 헬스케어' },
  { icon: '🎓', label: '교육 · 에듀테크' },
  { icon: '🏢', label: '중견 · 중소기업' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
      <span className="inline-block h-px w-6 bg-accent-2" />
      {children}
    </div>
  )
}

export default function EdgeSection() {
  return (
    <section className="relative z-10 bg-elev">
      <div className="container-page py-20 md:py-24">
        <div className="reveal">
          <SectionLabel>Competitive Edge</SectionLabel>
          <h2 className="mb-3.5 break-keep text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
            경쟁사 대비 두드러지는
            <br />
            <span className="bg-gradient-to-br from-accent via-accent-2 to-indigo-400 bg-clip-text text-transparent">
              세 가지 기술 강점
            </span>
          </h2>
          <p className="max-w-xl break-keep text-body leading-[1.8] text-fg-muted">
            딥페이크 탐지, AI 보안 관제, 초저지연 스트리밍. 설계부터 운영까지 한 팀이 맡습니다.
          </p>
        </div>

        <div className="reveal mt-12 flex flex-col gap-6 md:mt-15">
          {edges.map(e => {
            const tone = TONES[e.tone]
            return (
              <div
                key={e.badge}
                className={`grid grid-cols-1 items-center gap-8 rounded-xl border border-line bg-surface p-6 transition duration-300 sm:p-9 lg:grid-cols-2 lg:gap-12 ${tone.card}`}
              >
                <div>
                  <div className="mb-4 flex items-center gap-2.5">
                    <span
                      className={`rounded-full border px-3 py-0.5 font-mono text-label uppercase tracking-[0.12em] ${tone.badge}`}
                    >
                      {e.badge}
                    </span>
                  </div>
                  <div className="mb-2.5 text-[2rem]">{e.icon}</div>
                  <h3 className="mb-1 break-keep text-[1.5rem] font-bold tracking-[-0.02em] text-fg">
                    {e.title}
                  </h3>
                  <div className={`mb-4 font-mono text-meta tracking-[0.04em] ${tone.label}`}>
                    {e.subtitle}
                  </div>
                  <p className="break-keep text-body leading-[1.8] text-fg-muted">{e.desc}</p>
                  <div
                    className={`mt-4.5 break-keep rounded-r-md border-l-[3px] px-3.5 py-2.5 text-meta text-fg-muted ${tone.quote}`}
                  >
                    {e.highlight}
                  </div>
                  {e.link && (
                    <Link
                      href={e.link}
                      className={`mt-5 inline-flex items-center gap-1.5 border-b pb-0.5 font-mono text-meta tracking-[0.04em] transition-colors ${tone.link}`}
                    >
                      상세 서비스 페이지 보기 →
                    </Link>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {e.stats.map(s => (
                    <div
                      key={s.label}
                      className="flex items-center gap-5 rounded-lg border border-line bg-canvas px-6 py-5"
                    >
                      <div
                        className={`shrink-0 text-[1.8rem] font-extrabold leading-none tracking-[-0.03em] sm:text-[2.2rem] ${tone.stat}`}
                      >
                        {s.val}
                      </div>
                      <div className="font-mono text-meta uppercase tracking-[0.06em] text-fg-muted">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="reveal mt-20">
          <SectionLabel>검증된 수치</SectionLabel>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {trustStats.map(t => (
              <div key={t.label} className="bg-surface px-6 py-8 text-center">
                <div className="mb-2 text-[1.7rem] font-extrabold tracking-[-0.03em] text-fg sm:text-[2rem]">
                  {t.val}
                </div>
                <div className="break-keep font-mono text-label uppercase tracking-[0.06em] text-fg-subtle">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-16">
          <SectionLabel>도입 분야</SectionLabel>
          <div className="mt-6 flex flex-wrap gap-3">
            {sectors.map(s => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4.5 py-2.5 text-body text-fg-muted transition-colors duration-200 hover:border-accent hover:text-fg"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
