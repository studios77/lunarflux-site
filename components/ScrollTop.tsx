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
      className={`fixed bottom-24 left-5 z-[9997] flex size-13 items-center justify-center rounded-full border border-line-strong bg-surface p-0 shadow-[0_4px_20px_rgba(52,211,153,0.15)] transition-all duration-300 hover:border-accent hover:shadow-[0_4px_24px_rgba(52,211,153,0.35)] sm:left-7 ${
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-90 opacity-0'
      }`}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" className="absolute inset-0 -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" className="stroke-line" strokeWidth="2" />
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          className="stroke-accent transition-[stroke-dasharray] duration-200"
          strokeWidth="2"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 stroke-accent"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
