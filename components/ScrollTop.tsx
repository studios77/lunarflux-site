'use client'
import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrolled > 400)
      setScrollPct(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const r = 20
  const circ = 2 * Math.PI * r
  const dash = (scrollPct / 100) * circ

  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      style={{
        position: 'fixed', bottom: 96, left: 28, zIndex: 9997,
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--surface)', border: '1px solid var(--border2)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(16,185,129,0.15)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'all' : 'none', padding: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(16,185,129,0.35)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(16,185,129,0.15)'
      }}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle cx="26" cy="26" r={r} fill="none" stroke="var(--accent)" strokeWidth="2"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.2s ease' }}
        />
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
