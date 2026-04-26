'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const serviceMenu = [
  {
    cat: 'IDC / 서버',
    color: '#0ea5e9',
    items: [
      { name: '서버 임대 · 코로케이션', slug: 'server-rental', desc: '1U~풀랙 코로케이션 월정액' },
      { name: '위탁운영 매니지먼트', slug: 'managed-service', desc: '24시간 장애대응 · OS 패치' },
      { name: '서버 이중화 (HA)', slug: 'ha', desc: '자동 페일오버 30초 · 99.99%' },
      { name: 'DB 이중화 관리', slug: 'db-cluster', desc: 'Galera 클러스터 위탁운영' },
    ],
  },
  {
    cat: 'AI 보안',
    color: '#f59e0b',
    items: [
      { name: 'AI 보안 관제', slug: 'ai-security', desc: '24시간 무인 자율 보안관제', highlight: true },
      { name: 'AI 스트림 이상탐지', slug: 'ai-stream-security', desc: 'DDoS · 세션 하이재킹 자동차단' },
      { name: '딥페이크 탐지', slug: 'deepfake-detection', desc: '실시간 AI 합성 영상 검출' },
      { name: 'AI 자율 관제 에이전트', slug: 'ai-agent', desc: 'LLM SOC · SOAR 자동화' },
    ],
  },
  {
    cat: '스트리밍',
    color: '#10b981',
    items: [
      { name: 'Ultrastream 스트리밍', slug: 'ultrastream', desc: 'LL-HLS 1~2초 초저지연', highlight: true },
      { name: 'VOD + 멀티 리스트림', slug: 'vod-multistream', desc: '유튜브·트위치 동시 송출' },
    ],
  },
]

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
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 5%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(240,248,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Logo */}
        <a href="#hero" style={{
          fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 800,
          letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
            boxShadow: '0 0 10px var(--accent)', animation: 'pulse 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          Lunarflux<span style={{ color: 'var(--accent)' }}>AI</span>
        </a>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>

          {/* 서비스 드롭다운 */}
          <li style={{ position: 'relative' }}
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current)
              setMenuOpen(true)
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => setMenuOpen(false), 250)
            }}
          >
            <button style={{
              fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700,
              color: menuOpen ? 'var(--accent)' : 'var(--text2)',
              background: 'none', border: 'none', cursor: 'pointer',
              letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 0', transition: 'color 0.2s',
            }}>
              서비스
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: menuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setMenuOpen(false), 250)
                }}
                style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                marginTop: 0, paddingTop: 8,
                background: 'var(--surface)', border: '1px solid var(--border2)',
                borderRadius: 12, padding: '20px 0',
                boxShadow: '0 20px 60px rgba(14,165,233,0.15)',
                display: 'flex', gap: 0,
                minWidth: 700,
                zIndex: 300,
              }}>
                {serviceMenu.map((cat, ci) => (
                  <div key={ci} style={{
                    flex: 1, padding: '0 20px',
                    borderRight: ci < serviceMenu.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'var(--mono)', fontSize: '0.6rem',
                      color: cat.color, letterSpacing: '0.12em', textTransform: 'uppercase',
                      marginBottom: 12, fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ width: 12, height: 1, background: cat.color, display: 'inline-block' }} />
                      {cat.cat}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {cat.items.map((item, ii) => (
                        <Link
                          key={ii}
                          href={`/services/${item.slug}/`}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: 'block', padding: '8px 10px', borderRadius: 6,
                            textDecoration: 'none',
                            background: item.highlight ? `${cat.color}10` : 'transparent',
                            border: item.highlight ? `1px solid ${cat.color}30` : '1px solid transparent',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => {
                            if (!item.highlight) (e.currentTarget as HTMLElement).style.background = 'var(--bg)'
                          }}
                          onMouseLeave={e => {
                            if (!item.highlight) (e.currentTarget as HTMLElement).style.background = 'transparent'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>
                              {item.name}
                            </span>
                            {item.highlight && (
                              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', color: cat.color, background: `${cat.color}20`, border: `1px solid ${cat.color}40`, borderRadius: 10, padding: '1px 6px', letterSpacing: '0.06em' }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'var(--text3)', marginTop: 2 }}>
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 하단 바로가기 */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid var(--border)', padding: '10px 20px', display: 'flex', gap: 16, background: 'var(--bg)', borderRadius: '0 0 12px 12px' }}>
                  <a href="#services" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                    전체 서비스 보기 →
                  </a>
                  <a href="#contact" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text3)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                    무료 상담 신청 →
                  </a>
                </div>
              </div>
            )}
          </li>

          {/* 일반 메뉴 */}
          {[
            { id: 'pricing', label: '요금' },
            { id: 'about', label: '소개' },
            { id: 'contact', label: '문의' },
          ].map(m => (
            <li key={m.id}>
              <a href={`#${m.id}`} style={{
                fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700,
                color: active === m.id ? 'var(--accent)' : 'var(--text2)',
                textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s',
              }}>
                {m.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + 모바일 햄버거 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#contact" style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem',
            padding: '8px 18px', background: 'transparent',
            border: '1px solid var(--accent)', color: 'var(--accent)',
            borderRadius: 4, textDecoration: 'none', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'var(--accent)'
              ;(e.target as HTMLElement).style.color = '#000'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'transparent'
              ;(e.target as HTMLElement).style.color = 'var(--accent)'
            }}
          >
            무료 상담
          </a>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text)' }}
            className="hamburger"
          >
            {mobileOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 199,
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '20px 5%', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
        }}>
          {serviceMenu.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: cat.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
                {cat.cat}
              </div>
              {cat.items.map((item, ii) => (
                <Link key={ii} href={`/services/${item.slug}/`} onClick={() => setMobileOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{item.name}</span>
                  {item.highlight && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: cat.color, background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: 10, padding: '2px 8px' }}>NEW</span>}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {[{id:'pricing',label:'요금'},{id:'about',label:'소개'},{id:'contact',label:'문의'}].map(m => (
              <a key={m.id} href={`#${m.id}`} onClick={() => setMobileOpen(false)} style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text2)', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                {m.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          nav ul { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
