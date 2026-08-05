const whyItems = [
  { num: '01', title: '인프라와 AI 보안을 함께', desc: '서버·네트워크·스트림 위에 보안 AI를 올리는 설계를 같이 잡습니다. 도입 이후 운영까지 한 창구로 이어집니다.' },
  { num: '02', title: '실제 트래픽에서 돌아가는 AI', desc: '자율 관제, 스트림 이상 탐지, 딥페이크 검출 등을 고객 환경에 맞춰 연결합니다. 이슈가 생기면 보안·미디어 엔지니어가 바로 대응합니다.' },
  { num: '03', title: '자체 UltraStreamingEngine', desc: 'LL-HLS로 1~2초 수준의 지연을 목표로 합니다. 방송·라이브커머스·공공 중계 등 용도에 맞춰 구성합니다.' },
  { num: '04', title: '가상화·이중화·백업까지', desc: 'VM, HA, DB 클러스터, 백업·DR까지 한 번에 설계할 수 있습니다.' },
]

const termLines = [
  { type: 'prompt', text: '$ lunarflux status --all' },
  { type: 'out', text: 'LunarFlux AI 시스템에 연결 중…' },
  { type: 'blank' },
  { type: 'ok', text: '✓ MediaMTX      running — 4 streams active' },
  { type: 'ok', text: '✓ HA Cluster    ACTIVE-ACTIVE — no failover' },
  { type: 'ok', text: '✓ DB Galera     3-node cluster synced' },
  { type: 'ok', text: '✓ Backup        last: 2h ago — verified OK' },
  { type: 'blank' },
  { type: 'prompt', text: '$ ai-sec scan --realtime' },
  { type: 'out', text: '실시간 이벤트 분석 중…' },
  { type: 'ok', text: '✓ AI Engine     위협 0건 · 낮은 등급 12건 검토 대기' },
  { type: 'warn', text: '⚠ IP Block      3 IPs blocked (GeoIP KP,RU)' },
  { type: 'ok', text: '✓ Deepfake      stream integrity verified' },
  { type: 'blank' },
  { type: 'prompt', text: '$ uptime --sla' },
  { type: 'ok', text: '✓ 99.99% — last 30 days' },
  { type: 'cursor', text: '$ ' },
]

/** 터미널 출력은 실제 콘솔 색을 흉내 내므로 사이트 팔레트를 따르지 않습니다 */
const lineColor: Record<string, string> = {
  prompt: 'text-[#e6edf3]',
  out: 'text-[#8b949e]',
  ok: 'text-[#3fb950]',
  warn: 'text-[#e3b341]',
  cursor: 'text-[#e6edf3]',
  blank: 'text-transparent',
}

export default function About() {
  return (
    <section id="about" className="relative z-10 bg-elev">
      <div className="container-page py-20 md:py-24">
        <div className="reveal">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Why LunarFlux AI
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
            왜 LunarFlux AI인가?
          </h2>
          <p className="max-w-lg break-keep text-body text-fg-muted">
            인프라와 AI 보안, 스트리밍을 나눠 맡기지 않고 한 팀이 맡습니다. 설계부터 운영·장애 대응까지 이어집니다.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 items-center gap-10 md:mt-15 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-4">
            {whyItems.map(w => (
              <div
                key={w.num}
                className="flex items-start gap-4 rounded-lg border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/40"
              >
                <div className="mt-0.5 shrink-0 rounded border border-line bg-canvas px-2 py-1 font-mono text-label text-accent">
                  {w.num}
                </div>
                <div>
                  <h4 className="mb-1.5 text-lead font-semibold leading-snug text-fg">{w.title}</h4>
                  <p className="break-keep text-body text-fg-muted">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-line-strong bg-[#02120e] font-mono">
            <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-2.5">
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <span
                  key={c}
                  className="inline-block size-2.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
              <span className="ml-auto font-mono text-label tracking-[0.05em] text-fg-subtle">
                lunarfluxai — security-monitor
              </span>
            </div>
            <div className="overflow-x-auto p-5 text-label leading-loose sm:text-meta">
              {termLines.map((line, i) => (
                <div
                  key={i}
                  className={`animate-[fadeUp_0.3s_ease_both] whitespace-pre ${lineColor[line.type]}`}
                  style={{ animationDelay: `${400 + i * 100}ms` }}
                >
                  {line.type === 'blank' ? (
                    <br />
                  ) : (
                    <>
                      {line.text}
                      {line.type === 'cursor' && (
                        <span className="inline-block h-3.5 w-2 animate-[blink_1.1s_step-end_infinite] bg-accent align-middle" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
