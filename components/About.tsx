'use client'
import { useEffect, useRef } from 'react'

const whyItems = [
  { num: '01', title: 'AI 파이프라인을 인프라와 같이 납품', desc: '탐지·분류·대응 모델과 데이터 경로를 IDC·네트워크·스트림 스택에 맞춰 설계합니다. PoC가 아닌 상용 운영 기준으로 맞춥니다.' },
  { num: '02', title: 'LLM·ML을 실제 관제·스트림에 탑재', desc: '자율 관제 에이전트, 스트림 이상탐지, 딥페이크 검출 등을 고객 트래픽에 연결해 돌립니다. 보안·미디어 엔지니어가 온콜로 이어집니다.' },
  { num: '03', title: '자체 Ultrastream + AI 미디어 스택', desc: '초저지연 LL-HLS 엔진과 AI 검증 레이어를 함께 운영합니다. 방송·커머스·공공 스트림에 맞춘 구성.' },
  { num: '04', title: '가상화·HA 위에서 AI 워크로드까지', desc: 'GPU·CPU 워크로드, 이중화, 백업·DR까지 한 로드맵으로 설계·전환합니다.' },
]

const termLines = [
  { type: 'prompt', text: '$ lunarflux status --all' },
  { type: 'out', text: 'Connecting to LunarFlux AI control plane…' },
  { type: 'blank' },
  { type: 'ok', text: '✓ MediaMTX      running — 4 streams active' },
  { type: 'ok', text: '✓ HA Cluster    ACTIVE-ACTIVE — no failover' },
  { type: 'ok', text: '✓ DB Galera     3-node cluster synced' },
  { type: 'ok', text: '✓ Backup        last: 2h ago — verified OK' },
  { type: 'blank' },
  { type: 'prompt', text: '$ ai-sec scan --realtime' },
  { type: 'out', text: 'LLM summarizer + ML baselines — scoring events…' },
  { type: 'ok', text: '✓ AI Engine     0 critical — 12 low queued for review' },
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
            Why LunarfluxAI
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>AI를 「기능」이 아니라 운영으로</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.75, marginBottom: 8 }}>슬라이드용 데모가 아니라, 관제·스트림·거버넌스에 붙는 <strong style={{ color: 'var(--text)', fontWeight: 600 }}>실서비스 AI</strong>를 지향합니다.</p>
        </div>

        <div className="reveal two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginTop: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {whyItems.map(w => (
              <div key={w.num} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 20, border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', background: 'rgba(15,23,42,0.06)', border: '1px solid var(--border)', borderRadius: 3, padding: '4px 8px', flexShrink: 0, marginTop: 2 }}>{w.num}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>{w.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#022c22', border: '1px solid var(--border2)', borderRadius: 8, overflow: 'hidden', fontFamily: 'var(--mono)' }}>
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
