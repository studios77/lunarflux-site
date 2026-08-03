'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type ServiceMenuLink = {
  name: string
  slug: string
  desc: string
  highlight?: boolean
}

type ServiceMenuSection = { sub?: string; items: ServiceMenuLink[] }
type ServiceMenuCategory = { cat: string; tone: keyof typeof TONES; sections: ServiceMenuSection[] }

/** 카테고리별 강조색. Tailwind가 정적으로 수집하도록 완성된 클래스명으로 보관합니다. */
const TONES = {
  cyan: {
    label: 'text-accent-2',
    bar: 'bg-accent-2',
    highlight: 'bg-accent-2/10 border-accent-2/30',
    badge: 'text-accent-2 bg-accent-2/15 border-accent-2/40',
  },
  indigo: {
    label: 'text-indigo-400',
    bar: 'bg-indigo-400',
    highlight: 'bg-indigo-400/10 border-indigo-400/30',
    badge: 'text-indigo-400 bg-indigo-400/15 border-indigo-400/40',
  },
  emerald: {
    label: 'text-accent',
    bar: 'bg-accent',
    highlight: 'bg-accent/10 border-accent/30',
    badge: 'text-accent bg-accent/15 border-accent/40',
  },
} as const

function MenuItemTitle({ item, size }: { item: ServiceMenuLink; size: 'sm' | 'md' }) {
  return (
    <span
      className={`block min-w-0 truncate font-semibold leading-[1.35] tracking-[-0.01em] text-fg ${
        size === 'sm' ? 'text-[0.875rem]' : 'text-[0.95rem]'
      }`}
    >
      {item.name}
    </span>
  )
}

const serviceMenu: ServiceMenuCategory[] = [
  {
    cat: 'IDC / AIDC',
    tone: 'cyan',
    sections: [
      {
        items: [
          { name: 'AIDC GPU 전용 호스팅', slug: 'aidc', desc: '초고전력 코로케이션 · RTX 5090', highlight: true },
          { name: '서버 임대 · 코로케이션', slug: 'server-rental', desc: '1U~풀랙 코로케이션 월정액' },
          { name: '위탁운영 매니지먼트', slug: 'managed-service', desc: '24시간 장애대응 · OS 패치' },
          { name: '서버 이중화 (HA)', slug: 'ha', desc: '자동 페일오버 30초 · 99.99%' },
          { name: 'DB 이중화 관리', slug: 'db-cluster', desc: 'Galera 클러스터 위탁운영' },
          { name: '서버 장애 복구 및 이전', slug: 'system-recovery-migration', desc: '트러블슈팅 포함 · 원격·현장' },
        ],
      },
    ],
  },
  {
    cat: 'AI 보안',
    tone: 'indigo',
    sections: [
      {
        sub: '관제 · 자동화',
        items: [
          { name: 'AI 보안 관제', slug: 'ai-security', desc: '24시간 무인 자율 보안관제', highlight: true },
          { name: 'AI 자율 관제 에이전트', slug: 'ai-agent', desc: 'LLM SOC · SOAR' },
        ],
      },
      {
        sub: '스트리밍 · 미디어',
        items: [
          { name: 'AI 스트림 이상탐지', slug: 'ai-stream-security', desc: 'DDoS · 하이재킹 차단' },
          { name: '딥페이크 탐지', slug: 'deepfake-detection', desc: '실시간 합성 영상 검출' },
        ],
      },
      {
        sub: '인프라 · 거버넌스',
        items: [
          { name: '네트워크 보안 · IDS/IPS', slug: 'network-security', desc: '침입탐지 · 이상 ML' },
          { name: '제로트러스트 설계', slug: 'zero-trust', desc: '세그먼트 · MFA' },
          { name: 'LLM 보안 감사', slug: 'llm-security-audit', desc: '유출 · 인젝션 점검' },
        ],
      },
    ],
  },
  {
    cat: '스트리밍',
    tone: 'emerald',
    sections: [
      {
        items: [
          { name: 'UltraStreamingEngine', slug: 'ultrastream', desc: 'LL-HLS 1~2초', highlight: true },
          { name: 'VOD + 멀티 리스트림', slug: 'vod-multistream', desc: '동시 송출' },
        ],
      },
    ],
  },
]

const NAV_LINK = 'text-base font-bold tracking-[0.02em] transition-colors duration-200 hover:text-accent'

export default function Nav() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const onScroll = () => {
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 80) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-200 border-b border-line bg-canvas/85 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => { setMenuOpen(false); setMobileOpen(false) }}
          className="flex shrink-0 items-center gap-2 text-[1.2rem] font-extrabold tracking-[-0.02em] text-fg"
        >
          <span className="inline-block size-2 animate-[pulseDot_2s_ease-in-out_infinite] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          LunarFlux<span className="text-accent">AI</span>
        </Link>

        <ul className="hidden list-none items-center gap-7 md:flex">
          <li
            className="relative"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current)
              setMenuOpen(true)
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => setMenuOpen(false), 250)
            }}
          >
            <button
              aria-expanded={menuOpen}
              className={`flex items-center gap-1 py-1 text-base font-bold tracking-[0.02em] transition-colors duration-200 ${
                menuOpen ? 'text-accent' : 'text-fg-muted hover:text-accent'
              }`}
            >
              서비스
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {menuOpen && (
              <div
                onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }}
                onMouseLeave={() => { closeTimer.current = setTimeout(() => setMenuOpen(false), 250) }}
                className="absolute left-1/2 top-[calc(100%+8px)] z-[9999] flex w-[min(1120px,calc(100vw-20px))] max-w-[calc(100vw-20px)] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-line-strong bg-elev shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
              >
                <div className="grid grid-cols-3 gap-0 px-2.5 pb-3.5 pt-4.5">
                  {serviceMenu.map((cat, ci) => {
                    const tone = TONES[cat.tone]
                    return (
                      <div
                        key={cat.cat}
                        className={`min-w-0 px-2.5 ${ci < serviceMenu.length - 1 ? 'border-r border-line' : ''}`}
                      >
                        <div
                          className={`mb-3 flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] ${tone.label}`}
                        >
                          <span className={`inline-block h-px w-3 ${tone.bar}`} />
                          {cat.cat}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {cat.sections.map((sec, si) => (
                            <div key={sec.sub ?? si}>
                              {sec.sub && (
                                <div
                                  className={`mb-1.5 pl-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle ${
                                    si > 0 ? 'mt-3.5' : ''
                                  }`}
                                >
                                  {sec.sub}
                                </div>
                              )}
                              {sec.items.map(item => (
                                <Link
                                  key={item.slug}
                                  href={`/services/${item.slug}/`}
                                  onClick={() => setMenuOpen(false)}
                                  title={item.name}
                                  className={`block rounded-md border p-2 transition-colors duration-150 ${
                                    item.highlight
                                      ? tone.highlight
                                      : 'border-transparent hover:border-line hover:bg-surface'
                                  }`}
                                >
                                  <div className="flex flex-nowrap items-center gap-1.5">
                                    <div className="min-w-0 flex-1">
                                      <MenuItemTitle item={item} size="sm" />
                                    </div>
                                    {item.highlight && (
                                      <span
                                        className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[0.56rem] tracking-[0.06em] ${tone.badge}`}
                                      >
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 break-keep text-[0.8rem] leading-[1.45] text-fg-subtle">
                                    {item.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-4 border-t border-line bg-canvas px-5 py-2.5">
                  <Link
                    href="/#services"
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-[0.78rem] tracking-[0.06em] text-accent hover:text-accent-2"
                  >
                    전체 서비스 보기 →
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-[0.78rem] tracking-[0.06em] text-fg-subtle hover:text-fg"
                  >
                    무료 상담 신청 →
                  </Link>
                </div>
              </div>
            )}
          </li>

          {[
            { id: 'pricing', label: '요금' },
            { id: 'about', label: '소개' },
          ].map(m => (
            <li key={m.id}>
              <Link
                href={`/#${m.id}`}
                className={`${NAV_LINK} ${active === m.id ? 'text-accent' : 'text-fg-muted'}`}
              >
                {m.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className={`${NAV_LINK} text-fg-muted`}>
              문의
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded border border-accent px-4.5 py-2 font-mono text-[0.75rem] tracking-[0.05em] text-accent transition-colors duration-200 hover:bg-accent hover:text-canvas sm:block"
          >
            무료 상담
          </Link>

          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileOpen}
            className="flex p-1 text-fg md:hidden"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="container-page fixed inset-x-0 top-16 z-199 max-h-[calc(100vh-64px)] overflow-y-auto border-b border-line bg-elev py-5 md:hidden">
          {serviceMenu.map(cat => {
            const tone = TONES[cat.tone]
            return (
              <div key={cat.cat} className="mb-6">
                <div
                  className={`mb-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] ${tone.label}`}
                >
                  {cat.cat}
                </div>
                {cat.sections.map((sec, si) => (
                  <div key={sec.sub ?? si}>
                    {sec.sub && (
                      <div
                        className={`mb-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle ${
                          si > 0 ? 'mt-3' : ''
                        }`}
                      >
                        {sec.sub}
                      </div>
                    )}
                    {sec.items.map(item => (
                      <Link
                        key={item.slug}
                        href={`/services/${item.slug}/`}
                        title={item.name}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between gap-2.5 border-b border-line py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <MenuItemTitle item={item} size="md" />
                        </div>
                        {item.highlight && (
                          <span
                            className={`shrink-0 rounded-full border px-2 py-1 font-mono text-[0.58rem] ${tone.badge}`}
                          >
                            NEW
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}
          <div className="mt-4 flex flex-col">
            {[
              { id: 'pricing', label: '요금' },
              { id: 'about', label: '소개' },
            ].map(m => (
              <Link
                key={m.id}
                href={`/#${m.id}`}
                onClick={() => setMobileOpen(false)}
                className="border-b border-line py-2.5 text-base font-bold text-fg-muted"
              >
                {m.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-2.5 text-base font-bold text-fg-muted"
            >
              문의
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded border border-accent py-2.5 text-center font-mono text-[0.8rem] tracking-[0.05em] text-accent"
            >
              무료 상담
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
