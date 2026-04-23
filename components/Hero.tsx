export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 5% 60px', overflow: 'hidden', position: 'relative', zIndex: 1,
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, rgba(245,158,11,0.06) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent2)',
          letterSpacing: '0.12em', padding: '6px 16px',
          border: '1px solid rgba(6,182,212,0.3)', borderRadius: 2,
          marginBottom: 32, textTransform: 'uppercase',
          animation: 'fadeUp 0.8s ease both',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--accent2)',
            animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block',
          }} />
          AI Security & Streaming Infrastructure
        </div>

        <h1 style={{
          fontFamily: 'var(--display)', fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text)',
          marginBottom: 24, animation: 'fadeUp 0.8s 0.1s ease both',
        }}>
          차세대<br />
          <span style={{
            background: 'linear-gradient(135deg, #38bdf8, #fde68a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>보안 인프라</span><br />
          플랫폼
        </h1>

        <p style={{
          fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560,
          margin: '0 auto 48px', lineHeight: 1.8,
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}>
          IDC 서버 임대·위탁운영부터 AI 보안 관제,<br />
          Ultrastream 엔진 기반 라이브 스트리밍까지.<br />
          하나의 플랫폼으로 완성하는 기술 인프라.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.3s ease both',
        }}>
          <a href="#services" style={{
            padding: '14px 36px', background: 'var(--accent)', color: '#000',
            border: 'none', borderRadius: 4, fontFamily: 'var(--mono)',
            fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.06em',
            textDecoration: 'none', boxShadow: '0 0 30px rgba(56,189,248,0.35)',
            transition: 'all 0.25s',
          }}>서비스 살펴보기</a>
          <a href="#contact" style={{
            padding: '14px 36px', background: 'transparent', color: 'var(--text)',
            border: '1px solid var(--border2)', borderRadius: 4,
            fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em',
            textDecoration: 'none', transition: 'all 0.25s',
          }}>무료 상담 신청</a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48, marginTop: 80,
          paddingTop: 48, borderTop: '1px solid var(--border)', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.4s ease both',
        }}>
          {[
            { num: '99.99', unit: '%', label: 'Uptime SLA' },
            { num: '1~2', unit: 's', label: 'LL-HLS 레이턴시' },
            { num: '24', unit: '/7', label: 'AI 보안 관제' },
            { num: '19', unit: '개', label: '핵심 서비스' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 700,
                color: 'var(--text)', display: 'block',
              }}>
                {s.num}<span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>{s.unit}</span>
              </span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '0.65rem',
                color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase',
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
