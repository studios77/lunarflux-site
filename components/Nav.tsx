'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [active, setActive] = useState('')

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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 5%', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(240,248,255,0.92)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <a href="#hero" style={{
        fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 800,
        letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
          boxShadow: '0 0 10px var(--accent)',
          animation: 'pulse 2s ease-in-out infinite',
          display: 'inline-block',
        }} />
        Lunarflux<span style={{ color: 'var(--accent)' }}>AI</span>
      </a>

      <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }}>
        {['services','pricing','about','contact'].map(id => (
          <li key={id}>
            <a href={`#${id}`} style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem',
              color: active === id ? 'var(--accent)' : 'var(--text2)',
              textDecoration: 'none', letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}>
              {id === 'services' ? '서비스' : id === 'pricing' ? '요금' : id === 'about' ? '소개' : '문의'}
            </a>
          </li>
        ))}
      </ul>

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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </nav>
  )
}
