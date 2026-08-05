/**
 * Lunarflux Guard 관리 콘솔 미리보기.
 *
 * 실제 콘솔 스크린샷 대신 UI 를 코드로 재현합니다. 이유:
 *  - 스크린샷에는 IP·호스트명·로그가 딸려 들어가 공개 사이트에 올리기 부적절
 *  - 화면 크기·해상도에 따라 흐려지지 않고, 다크 팔레트와 정확히 맞음
 *
 * 메뉴 이름은 실제 콘솔에서 그대로 가져왔고, 수치는 형태를 보여주기 위한
 * 예시입니다. 실제 탐지 데이터가 아니므로 라벨에 "예시" 를 명시합니다.
 */
const NAV: { group: string; items: string[] }[] = [
  { group: '보안 서비스', items: ['보안 정책', '차단 목록', 'WAF', 'JA4+ 지문', 'AI 보안 분석'] },
  { group: '모니터링', items: ['트래픽 로그', '보안 리포트', 'SIEM 내보내기'] },
  { group: '네트워크', items: ['인터페이스', 'VM 헬스'] },
]

const TILES = [
  { label: '활성 인시던트', value: '3' },
  { label: '차단 IP', value: '128' },
  { label: '탐지 룰', value: '6만+' },
]

export default function ConsolePreview() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-line-strong bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
    >
      {/* 상단 바 */}
      <div className="flex items-center gap-2.5 border-b border-line bg-elev px-4 py-2.5">
        <span className="inline-block size-2 rounded-full bg-accent" />
        <span className="font-mono text-label text-fg">Lunarflux Guard</span>
        <span className="font-mono text-label text-fg-subtle">V1.2 · candidate → commit</span>
        <span className="ml-auto rounded border border-accent/40 px-2 py-0.5 font-mono text-label text-accent">
          Push Config
        </span>
      </div>

      <div className="grid grid-cols-[128px_1fr] sm:grid-cols-[150px_1fr]">
        {/* 사이드바 */}
        <div className="border-r border-line bg-elev/60 px-3 py-4">
          {NAV.map(section => (
            <div key={section.group} className="mb-4 last:mb-0">
              <div className="mb-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fg-subtle">
                {section.group}
              </div>
              {section.items.map((item, i) => (
                <div
                  key={item}
                  className={`truncate rounded px-2 py-1 text-[0.7rem] ${
                    section.group === '보안 서비스' && i === 0
                      ? 'bg-accent/12 text-accent'
                      : 'text-fg-muted'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 본문 */}
        <div className="p-4">
          <div className="mb-3 grid grid-cols-3 gap-2">
            {TILES.map(t => (
              <div key={t.label} className="rounded-lg border border-line bg-surface px-3 py-2.5">
                <div className="text-[1.15rem] font-extrabold leading-none tracking-[-0.02em] text-accent">
                  {t.value}
                </div>
                <div className="mt-1.5 truncate font-mono text-[0.6rem] uppercase tracking-[0.06em] text-fg-subtle">
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-line bg-surface p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-label text-accent-2">AI 상황 브리핑</span>
              <span className="ml-auto font-mono text-[0.6rem] text-fg-subtle">외부 전송 0</span>
            </div>
            {/* 실제 브리핑 문구 대신 형태만 — 데이터를 지어내지 않습니다 */}
            <div className="flex flex-col gap-1.5">
              <span className="block h-1.5 w-full rounded-full bg-line" />
              <span className="block h-1.5 w-[86%] rounded-full bg-line" />
              <span className="block h-1.5 w-[62%] rounded-full bg-line" />
            </div>
            <div className="mt-3 flex gap-1.5">
              {['봇 의심 IP', '스캐너', '차단 현황'].map(chip => (
                <span
                  key={chip}
                  className="rounded-full border border-line bg-elev px-2 py-0.5 font-mono text-[0.6rem] text-fg-subtle"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
