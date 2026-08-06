import Link from 'next/link'

const links = [
  ['서비스', '/#services'],
  ['소개', '/#about'],
  ['문의', '/contact'],
]

const companyInfo = [
  { label: '회사명', value: '주식회사 스트리밍랩스' },
  { label: '사업자등록번호', value: '536-88-02408' },
  { label: '주소', value: '서울시 강서구 마곡중앙6로 21, 508호' },
  { label: '전화', value: '0505-924-1004' },
  { label: '이메일', value: 'contact@lunarflux.ai' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-elev">
      <div className="container-page pb-10 pt-16">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[200px_1fr_auto] md:gap-12">
          <div>
            <div className="mb-2 text-2xl font-extrabold text-white">
              LunarFlux<span className="text-accent">AI</span>
            </div>
            <div className="font-mono text-meta tracking-[0.08em] text-fg-muted">
              IDC · AI 보안 · 스트리밍
              <br />
              인프라 전문 기업
            </div>
          </div>

          {/* 좁은 화면에서는 라벨을 값 위로 올립니다. 110px 고정 라벨을 유지하면
              320px 뷰포트에서 값에 남는 폭이 ~160px 뿐이라 주소가 잘게 접힙니다. */}
          <div className="flex flex-col gap-3">
            {companyInfo.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2.5">
                <span className="font-mono text-meta tracking-[0.06em] text-fg-subtle sm:w-[110px] sm:shrink-0">
                  {label}
                </span>
                <span className="break-keep text-body text-fg">{value}</span>
              </div>
            ))}
          </div>

          {/* 패딩 없는 링크는 실효 높이가 20px 남짓이라 손가락으로 누르기 어렵습니다.
              inline-flex + min-h 로 터치 영역을 확보하고, gap 을 줄여 시각적
              간격은 그대로 유지합니다. */}
          <ul className="flex list-none flex-col gap-0.5 md:items-end">
            {links.map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center font-mono text-body tracking-[0.06em] text-fg-muted transition-colors duration-200 hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center border-t border-line/70 pt-6">
          <span className="font-mono text-meta tracking-[0.06em] text-fg-subtle">
            © 2026 LunarFlux AI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
