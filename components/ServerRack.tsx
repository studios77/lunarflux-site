/**
 * IDC 통로 비주얼.
 *
 * 히어로 우측을 채웁니다. 외부 이미지 없이 CSS 3D 만으로 그려 정적
 * 내보내기와 충돌하지 않고, 어떤 해상도에서도 선명하며 용량이 0 입니다.
 * 실사 사진은 톤이 팔레트와 겉돌고 잡동사니가 함께 찍혀 쓰지 않았습니다.
 *
 * 구조: 좌우 랙 벽을 rotateY 로 안쪽을 향해 세우고, 바닥을 rotateX 로 눕혀
 * 소실점이 가운데 생기게 합니다. 뒤쪽 랙일수록 어둡게·흐리게 해 깊이를 만듭니다.
 *
 * 3D 변환은 inline style 로 둡니다 — 임의값 유틸리티로 쓰면 문자열이 길어
 * 읽기 어렵고, 값이 서로 맞물려 있어 한곳에 모아두는 편이 고치기 쉽습니다.
 *
 * 애니메이션은 전부 animate-* 유틸리티라 globals.css 의
 * prefers-reduced-motion 블록이 자동으로 끕니다. LED 키프레임 시작값이
 * "켜짐" 이라 멈춰도 장비가 꺼진 것처럼 보이지 않습니다.
 * 점멸 지연은 인덱스에서 계산합니다 — 난수는 하이드레이션을 깨뜨립니다.
 */

/** 벽 하나에 세울 랙 수. 앞에서 뒤로 갈수록 어두워집니다. */
const DEPTH = [0, 1, 2, 3]
/** 랙 한 대에 들어가는 유닛 수 */
const UNITS = [0, 1, 2, 3, 4, 5, 6]

function RackWall({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  return (
    <div
      className="absolute inset-y-0 flex"
      style={{
        [isLeft ? 'left' : 'right']: 0,
        width: '58%',
        transformOrigin: isLeft ? 'left center' : 'right center',
        // 벽을 안쪽으로 세워 통로를 만듭니다.
        transform: `rotateY(${isLeft ? 58 : -58}deg)`,
        flexDirection: isLeft ? 'row' : 'row-reverse',
      }}
    >
      {DEPTH.map(d => (
        <div
          key={d}
          className="relative flex flex-1 flex-col justify-center gap-[6px] border-x border-line-strong/60 bg-gradient-to-b from-surface/90 via-elev/95 to-canvas px-1.5"
          style={{
            // 뒤쪽으로 갈수록 어둡게. 안개에 잠기는 효과입니다.
            opacity: 1 - d * 0.17,
            filter: d >= 2 ? `blur(${(d - 1) * 0.6}px)` : undefined,
          }}
        >
          {UNITS.map(u => {
            // 앞쪽 두 랙에만 점멸을 겁니다. 전부 움직이면 산만하고 무겁습니다.
            const animated = d < 2
            const delay = (d * 230 + u * 190) % 1400
            return (
              <div
                key={u}
                className="flex items-center gap-1 rounded-[3px] border border-line/70 bg-canvas/60 px-1 py-[3px]"
              >
                <span className="block h-[2px] flex-1 rounded-full bg-line-strong/70" />
                <span
                  className={`block size-[3px] shrink-0 rounded-full ${
                    u % 3 === 0 ? 'bg-accent' : u % 3 === 1 ? 'bg-accent-2' : 'bg-indigo-400'
                  } ${animated ? 'animate-[led_1.4s_ease-in-out_infinite]' : 'opacity-70'}`}
                  style={animated ? { animationDelay: `${delay}ms` } : undefined}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function ServerRack() {
  return (
    <div className="relative">
      {/* 장면 밖 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_50%_45%,rgba(52,211,153,0.18),transparent_68%)] blur-xl"
      />

      <div
        aria-hidden
        className="relative h-[420px] overflow-hidden rounded-2xl border border-line-strong bg-canvas shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
      >
        {/* 3D 무대 */}
        <div className="absolute inset-0" style={{ perspective: '760px' }}>
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <RackWall side="left" />
            <RackWall side="right" />

            {/* 바닥. 눕혀서 통로 타일이 소실점으로 모이게 합니다. */}
            <div
              className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(rgba(52,211,153,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.16)_1px,transparent_1px)] bg-[length:26px_26px]"
              style={{
                transformOrigin: 'bottom center',
                transform: 'rotateX(74deg)',
              }}
            />
          </div>
        </div>

        {/* 통로 안쪽 조명 — 소실점에서 새어 나오는 빛 */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_180px_130px_at_50%_44%,rgba(52,211,153,0.30),transparent_70%)]"
        />
        {/* 볼류메트릭 헤이즈 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_25%,rgba(7,11,20,0.72)_78%)]" />
        {/* 위아래 페이드 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas/70 via-transparent to-canvas" />

        {/* 훑고 지나가는 스캔선 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-[rackScan_6s_linear_infinite] bg-[linear-gradient(to_bottom,transparent,rgba(52,211,153,0.14),transparent)]" />

        {/* 좌상단 LIVE 칩 */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent/40 bg-canvas/75 px-2.5 py-1 backdrop-blur">
          <span className="inline-block size-1.5 animate-[pulseDot_1.6s_ease-in-out_infinite] rounded-full bg-accent" />
          <span className="font-mono text-label font-bold tracking-[0.1em] text-accent">LIVE</span>
        </div>

        {/* 하단 설비 정보 */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4">
          <div>
            <div className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
              LunarFlux IDC
            </div>
            <div className="mt-1 text-body font-bold text-fg">자체 운영 전산실</div>
          </div>
          <div className="shrink-0 rounded-lg border border-line bg-canvas/75 px-2.5 py-1.5 backdrop-blur">
            <div className="font-mono text-label text-accent">ENFORCING</div>
          </div>
        </div>
      </div>
    </div>
  )
}
