/**
 * IDC 랙 비주얼.
 *
 * 히어로 우측 여백을 채우는 장식입니다. 외부 이미지 없이 CSS 만으로 그려
 * 정적 내보내기(next/image 최적화 불가)와 충돌하지 않고, 어떤 해상도에서도
 * 선명합니다.
 *
 * 애니메이션은 전부 animate-[...] 유틸리티로 겁니다. globals.css 의
 * prefers-reduced-motion 블록이 [class*="animate-"] 를 끄기 때문에, 모션
 * 최소화 설정에서는 자동으로 정지합니다. 키프레임 시작값을 "켜짐" 으로 둬서
 * 멈춰도 장비가 꺼진 것처럼 보이지 않습니다.
 *
 * 지연·속도는 인덱스에서 계산합니다 — 난수를 쓰면 서버와 클라이언트 렌더가
 * 달라져 하이드레이션이 깨집니다.
 */
type Unit = { label: string; sub: string; lit: number; primary?: boolean }

const UNITS: Unit[] = [
  { label: 'GUARD', sub: 'NGFW · WAF', lit: 3, primary: true },
  { label: 'NODE-01', sub: 'compute', lit: 2 },
  { label: 'NODE-02', sub: 'compute', lit: 3 },
  { label: 'STOR-01', sub: 'nvme', lit: 2 },
  { label: 'DB-CL', sub: 'galera', lit: 3 },
  { label: 'EDGE', sub: 'stream', lit: 2 },
]

export default function ServerRack() {
  return (
    <div aria-hidden className="relative select-none">
      {/* 랙 뒤쪽 글로우 */}
      <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_50%_40%,rgba(52,211,153,0.16),transparent_65%)] blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-elev/80 p-3.5 shadow-[0_28px_70px_rgba(0,0,0,0.55)] backdrop-blur">
        {/* 랙 상단 라벨 */}
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="inline-block size-1.5 animate-[pulseDot_2s_ease-in-out_infinite] rounded-full bg-accent" />
          <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
            LunarFlux IDC
          </span>
          <span className="ml-auto font-mono text-label text-accent">ONLINE</span>
        </div>

        {/* 스캔 하이라이트 */}
        <div className="pointer-events-none absolute inset-x-0 top-10 h-10 animate-[rackScan_5.5s_linear_infinite] bg-[linear-gradient(to_bottom,transparent,rgba(52,211,153,0.10),transparent)]" />

        <div className="flex flex-col gap-1.5">
          {UNITS.map((u, i) => (
            <div
              key={u.label}
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 ${
                u.primary
                  ? 'border-accent/45 bg-accent/8'
                  : 'border-line bg-surface/70'
              }`}
            >
              {/* 통풍구 */}
              <div className="flex shrink-0 flex-col gap-[3px]">
                {[0, 1, 2].map(r => (
                  <span key={r} className="block h-[2px] w-5 rounded-full bg-line-strong" />
                ))}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`font-mono text-label font-bold leading-none ${
                    u.primary ? 'text-accent' : 'text-fg-muted'
                  }`}
                >
                  {u.label}
                </div>
                <div className="mt-1 font-mono text-[0.6rem] leading-none text-fg-subtle">
                  {u.sub}
                </div>
              </div>

              {/* 활동 LED. 유닛마다 주기와 지연을 달리해 실제 장비처럼 어긋나게 깜빡입니다. */}
              <div className="flex shrink-0 items-center gap-1.5">
                {Array.from({ length: u.lit }).map((_, k) => (
                  <span
                    key={k}
                    className={`block size-1.5 rounded-full ${
                      k === 0 ? 'bg-accent' : k === 1 ? 'bg-accent-2' : 'bg-indigo-400'
                    } animate-[led_1.4s_ease-in-out_infinite]`}
                    style={{ animationDelay: `${(i * 170 + k * 310) % 1400}ms` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 처리량 미터 */}
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-line bg-canvas px-3 py-2.5">
          <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fg-subtle">
            throughput
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <span className="block h-full origin-left animate-[meter_3.2s_ease-in-out_infinite] bg-gradient-to-r from-accent to-accent-2" />
          </span>
        </div>
      </div>
    </div>
  )
}
