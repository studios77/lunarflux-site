/**
 * Lunarflux Guard 관리 콘솔 미리보기.
 *
 * 실제 콘솔 스크린샷을 그대로 올리지 않고 UI 를 코드로 재현합니다.
 * 실제 화면에는 관리 IP·공격자 IP·내부 VM 이름·계정이 함께 찍혀 있어
 * 공개 사이트에 올릴 수 없기 때문입니다. 여기서는 레이아웃과 지표 이름만
 * 가져오고, 식별자가 필요한 자리는 국가·ASN 조직처럼 특정되지 않는 값만 씁니다.
 *
 * 고정 수치(시그니처 수·WAF 규칙 수)는 콘솔 실측값입니다.
 * 변동 수치(세션·탐지 건수)는 화면 형태를 보이기 위한 예시입니다.
 */
const TILES = [
  { value: 'ENFORCING', label: '데이터패스', sub: 'L2 투명 브리지', accent: true },
  { value: '탐지 중', label: 'IDS 침입탐지', sub: '51,977 시그니처' },
  { value: '105', label: 'WAF 웹방화벽', sub: '21 카테고리' },
]

const FINDINGS = [
  { level: 'HIGH', tone: 'text-danger border-danger/40 bg-danger/10', text: 'IPS 위협 감지 (위협인텔·익스플로잇)' },
  { level: 'HIGH', tone: 'text-danger border-danger/40 bg-danger/10', text: '봇/자동화 의심 IP (높음)' },
  { level: 'MED', tone: 'text-warn border-warn/40 bg-warn/10', text: 'WAF 웹공격 차단' },
]

/** 출발지는 국가·ASN 조직까지만. 실제 공격자 IP 는 싣지 않습니다. */
const INCIDENTS = [
  { score: 71, cc: 'US', org: 'Cloud Provider (ASN)', tags: ['Scanner', '계층모순'] },
  { score: 68, cc: 'US', org: 'Broadband ISP (ASN)', tags: ['RCE·LFI·CMDi'] },
]

export default function ConsolePreview() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-line-strong bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
    >
      {/* 상단 바 */}
      <div className="flex items-center gap-2 border-b border-line bg-elev px-3.5 py-2.5">
        <span className="font-mono text-label font-bold text-fg">Lunarflux Guard</span>
        <span className="hidden font-mono text-[0.6rem] text-fg-subtle sm:inline">
          V1.2 · candidate → commit
        </span>
        <span className="ml-auto rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[0.6rem] text-accent">
          Push Config
        </span>
      </div>

      {/* 탭 */}
      <div className="flex gap-3 overflow-hidden border-b border-line bg-elev/60 px-3.5 py-2">
        {['통합관제', '보안 서비스', '모니터링', '네트워크'].map((t, i) => (
          <span
            key={t}
            className={`whitespace-nowrap font-mono text-[0.62rem] ${
              i === 0 ? 'border-b-2 border-accent pb-1 text-accent' : 'text-fg-subtle'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="p-3.5">
        {/* 상태 타일 */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {TILES.map(t => (
            <div key={t.label} className="rounded-lg border border-line bg-surface px-3 py-2.5">
              <div
                className={`truncate text-[0.95rem] font-extrabold leading-none tracking-[-0.02em] ${
                  t.accent ? 'text-accent' : 'text-fg'
                }`}
              >
                {t.value}
              </div>
              <div className="mt-1.5 truncate font-mono text-[0.58rem] uppercase tracking-[0.06em] text-fg-muted">
                {t.label}
              </div>
              <div className="truncate font-mono text-[0.58rem] text-fg-subtle">{t.sub}</div>
            </div>
          ))}
        </div>

        {/* AI 상황 브리핑 */}
        <div className="mb-3 rounded-lg border border-line bg-surface p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-label text-accent-2">AI 상황 브리핑</span>
            <span className="rounded border border-line bg-elev px-1.5 py-0.5 font-mono text-[0.58rem] text-fg-subtle">
              로컬 AI
            </span>
            <span className="ml-auto font-mono text-[0.58rem] text-fg-subtle">외부 전송 0</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {FINDINGS.map(f => (
              <div key={f.text} className="flex items-center gap-2">
                <span
                  className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[0.55rem] font-bold ${f.tone}`}
                >
                  {f.level}
                </span>
                <span className="min-w-0 truncate text-[0.68rem] text-fg-muted">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 활성 인시던트 */}
        <div className="rounded-lg border border-line bg-surface p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-mono text-label text-fg">활성 인시던트</span>
            <span className="ml-auto font-mono text-[0.58rem] text-fg-subtle">점수순</span>
          </div>
          <div className="flex flex-col gap-2">
            {INCIDENTS.map(inc => (
              <div key={inc.org} className="flex items-center gap-2.5 border-t border-line pt-2 first:border-t-0 first:pt-0">
                <span className="shrink-0 font-mono text-[0.9rem] font-extrabold leading-none text-danger">
                  {inc.score}
                </span>
                <span className="shrink-0 rounded border border-line bg-elev px-1.5 py-0.5 font-mono text-[0.55rem] text-fg-muted">
                  {inc.cc}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.66rem] text-fg-muted">{inc.org}</span>
                <span className="hidden shrink-0 gap-1 sm:flex">
                  {inc.tags.map(tag => (
                    <span
                      key={tag}
                      className="whitespace-nowrap rounded-full border border-line bg-elev px-1.5 py-0.5 font-mono text-[0.55rem] text-fg-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
