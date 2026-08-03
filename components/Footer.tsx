const links = [
  ['서비스', '/#services'],
  ['요금', '/#pricing'],
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
            <div className="font-mono text-[0.72rem] leading-relaxed tracking-[0.08em] text-fg-muted">
              IDC · AI 보안 · 스트리밍
              <br />
              인프라 전문 기업
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {companyInfo.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2.5">
                <span className="w-[110px] shrink-0 font-mono text-[0.72rem] tracking-[0.06em] text-fg-subtle">
                  {label}
                </span>
                <span className="break-keep text-[0.85rem] leading-normal text-fg">{value}</span>
              </div>
            ))}
          </div>

          <ul className="flex list-none flex-col gap-3 md:items-end">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-mono text-[0.82rem] tracking-[0.06em] text-fg-muted transition-colors duration-200 hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center border-t border-line/70 pt-6">
          <span className="font-mono text-[0.78rem] tracking-[0.06em] text-fg-subtle">
            © 2026 LunarFlux AI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
