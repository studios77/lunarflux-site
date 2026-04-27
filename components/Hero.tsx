export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 5% 60px', overflow: 'hidden', position: 'relative', zIndex: 1,
    }}>
      <div style={{
        position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
        width: 920, height: 560,
        background: 'radial-gradient(ellipse at 40% 40%, rgba(16,185,129,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.06) 0%, transparent 50%), radial-gradient(ellipse, rgba(245,158,11,0.04) 35%, transparent 72%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent2)',
          letterSpacing: '0.12em', padding: '6px 16px',
          border: '1px solid rgba(16,185,129,0.35)', borderRadius: 2,
          marginBottom: 32, textTransform: 'uppercase',
          animation: 'fadeUp 0.8s ease both',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--accent2)',
            animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block',
          }} />
          AI-native ops · production stack
        </div>

        <h1 style={{
          fontFamily: 'var(--display)', fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)',
          marginBottom: 24, animation: 'fadeUp 0.8s 0.1s ease both',
          wordBreak: 'keep-all',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #059669 0%, #0d9488 40%, #6366f1 75%, #d97706 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>AI가 결합된</span> 인프라
          <br />
          <span style={{ color: 'var(--text2)', fontWeight: 700 }}>IDC · 보안 · 스트리밍</span>을 한 팀이 운영
        </h1>

        <p style={{
          fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 600,
          margin: '0 auto 48px', lineHeight: 1.85,
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}>
          LLM 기반 자율 관제·스트림 이상탐지·딥페이크 검출 등 <strong style={{ color: 'var(--text)', fontWeight: 600 }}>실제 트래픽에서 돌아가는 AI</strong>를
          IDC·네트워크·라이브 스택과 붙여 설계합니다.<br />
          슬라이드가 아니라 <strong style={{ color: 'var(--text)', fontWeight: 600 }}>상용 파이프라인</strong>으로 제공합니다.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.3s ease both',
        }}>
          <a href="#services" style={{
            padding: '16px 40px', background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 30, fontFamily: 'var(--sans)',
            fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.02em',
            textDecoration: 'none', boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(16,185,129,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(16,185,129,0.25)'; }}
          >서비스 살펴보기</a>
          <a href="#contact" style={{
            padding: '16px 40px', background: 'rgba(255,255,255,0.8)', color: 'var(--text)',
            border: '1px solid var(--border2)', borderRadius: 30, backdropFilter: 'blur(10px)',
            fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.02em',
            textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.background = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.8)'; }}
          >무료 상담 신청</a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginTop: 80,
          paddingTop: 48, flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.4s ease both',
        }}>
          {[
            { num: '99.99', unit: '%', label: 'Uptime SLA' },
            { num: '1~2', unit: 's', label: 'LL-HLS 레이턴시' },
            { num: '24', unit: '/7', label: 'AI 관제·자동대응' },
            { num: '14', unit: '+', label: 'AI 결합 서비스' },
          ].map(s => (
            <div key={s.label} style={{ 
              textAlign: 'center', background: 'rgba(255,255,255,0.6)', 
              backdropFilter: 'blur(12px)', border: '1px solid var(--border)', 
              borderRadius: 20, padding: '24px 32px', minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
            }}>
              <span style={{
                fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 800,
                color: 'var(--text)', display: 'block', lineHeight: 1.1, marginBottom: 4
              }}>
                {s.num}<span style={{ color: 'var(--accent)', fontSize: '1.6rem', marginLeft: 2 }}>{s.unit}</span>
              </span>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: '0.85rem',
                color: 'var(--text3)', letterSpacing: '0.04em',
                fontWeight: 600,
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  )
}
