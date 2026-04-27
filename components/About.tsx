'use client'
import { useEffect, useRef } from 'react'

const whyItems = [
  { num: '01', title: '인프라와 AI 보안을 함께', desc: '서버·네트워크·스트림 위에 보안 AI를 올리는 설계를 같이 잡습니다. 도입 이후 운영까지 한 창구로 이어집니다.' },
  { num: '02', title: '실제 트래픽에서 돌아가는 AI', desc: '자율 관제, 스트림 이상 탐지, 딥페이크 검출 등을 고객 환경에 맞춰 연결합니다. 이슈가 생기면 보안·미디어 엔지니어가 바로 대응합니다.' },
  { num: '03', title: '자체 Ultrastream 엔진', desc: 'LL-HLS로 1~2초 수준의 지연을 목표로 합니다. 방송·라이브커머스·공공 중계 등 용도에 맞춰 구성합니다.' },
  { num: '04', title: '가상화·이중화·백업까지', desc: 'VM, HA, DB 클러스터, 백업·DR까지 한 번에 설계할 수 있습니다.' },
]

const termLines = [
  { type: 'prompt', text: '$ lunarflux status --all' },
  { type: 'out', text: 'LunarFlux 엔진에 연결 중…' },
  { type: 'blank' },
  { type: 'ok', text: '✓ MediaMTX      running — 4 streams active' },
  { type: 'ok', text: '✓ HA Cluster    ACTIVE-ACTIVE — no failover' },
  { type: 'ok', text: '✓ DB Galera     3-node cluster synced' },
  { type: 'ok', text: '✓ Backup        last: 2h ago — verified OK' },
  { type: 'blank' },
  { type: 'prompt', text: '$ ai-sec scan --realtime' },
  { type: 'out', text: '실시간 이벤트 분석 중…' },
  { type: 'ok', text: '✓ AI Engine     위협 0건 · 낮은 등급 12건 검토 대기' },
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
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>왜 LunarfluxAI인가?</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.75, marginBottom: 8 }}>인프라와 AI 보안, 스트리밍을 나눠 맡기지 않고 한 팀이 맡습니다. 설계부터 운영·장애 대응까지 이어집니다.</p>
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
