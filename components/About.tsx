'use client'
import { useEffect, useRef } from 'react'

const whyItems = [
  { num: '01', title: 'IDC + AI 보안 + 스트리밍 원스톱', desc: '세 영역을 한 회사가 통합 운영하는 플랫폼. 서버 임대부터 AI 관제까지 단일 창구.' },
  { num: '02', title: '인공지능보안 전공자 기술 자문', desc: 'AI 보안 기술엔지니어가 직접 서비스를 설계하고 운영합니다.' },
  { num: '03', title: '자체 개발 Ultrastream 엔진', desc: 'MediaMTX 기반 LL-HLS 1~2초 레이턴시. 상용 솔루션 대비 80% 비용 절감.' },
  { num: '04', title: 'Proxmox 기반 완전 이중화 인프라', desc: 'Windows Server 2022 + Proxmox VM 운영 경험. HA/DR 설계 및 실운영 검증 완료.' },
]

const termLines = [
  { type: 'prompt', text: '$ lunarflux status --all' },
  { type: 'out', text: 'Connecting to LunarFlux AI Engine...' },
  { type: 'blank' },
  { type: 'ok', text: '✓ MediaMTX      running — 4 streams active' },
  { type: 'ok', text: '✓ HA Cluster    ACTIVE-ACTIVE — no failover' },
  { type: 'ok', text: '✓ DB Galera     3-node cluster synced' },
  { type: 'ok', text: '✓ Backup        last: 2h ago — verified OK' },
  { type: 'blank' },
  { type: 'prompt', text: '$ ai-sec scan --realtime' },
  { type: 'out', text: 'Analyzing traffic patterns...' },
  { type: 'ok', text: '✓ AI Engine     0 threats detected' },
  { type: 'warn', text: '⚠ IP Block      3 IPs blocked (GeoIP KP,RU)' },
  { type: 'ok', text: '✓ Deepfake      stream integrity verified' },
  { type: 'blank' },
  { type: 'prompt', text: '$ uptime --sla' },
  { type: 'ok', text: '✓ 99.99% — last 30 days' },
  { type: 'cursor', text: '$ ' },
]

export default function About() {
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lines = termRef.current?.querySelectorAll('.term-line')
    lines?.forEach((line, i) => {
      (line as HTMLElement).style.opacity = '0';
      setTimeout(() => {
        (line as HTMLElement).style.transition = 'opacity 0.3s';
        (line as HTMLElement).style.opacity = '1';
      }, 400 + i * 100)
    })
  }, [])

  const colorMap: Record<string, string> = {
    prompt: '#e6edf3', out: '#8b949e', ok: '#3fb950', warn: '#e3b341', cursor: '#e6edf3', blank: 'transparent',
  }

  return (
    <section id="about" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>
        <div className="reveal">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            Why LunarFlux
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', marginBottom: 16 }}>왜 루나플럭스인가</h2>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginTop: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {whyItems.map(w => (
              <div key={w.num} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 20, border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 3, padding: '4px 8px', flexShrink: 0, marginTop: 2 }}>{w.num}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: 5 }}>{w.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0a0e1a', border: '1px solid var(--border2)', borderRadius: 8, overflow: 'hidden', fontFamily: 'var(--mono)' }}>
            <div style={{ background: 'var(--surface)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border)' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', marginLeft: 'auto', letterSpacing: '0.05em' }}>lunarflux — security-monitor</span>
            </div>
            <div ref={termRef} style={{ padding: 20, fontSize: '0.78rem', lineHeight: 2 }}>
              {termLines.map((line, i) => (
                <div key={i} className="term-line" style={{ color: colorMap[line.type] }}>
                  {line.type === 'blank' ? <br /> : (
                    <>
                      {line.text}
                      {line.type === 'cursor' && (
                        <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--accent)', verticalAlign: 'middle', animation: 'blink 1.1s step-end infinite' }} />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:768px){ #about .two-col { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  )
}
