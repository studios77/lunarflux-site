'use client'
import Link from 'next/link'

const edges = [
  {
    badge: '01 · 딥페이크 탐지',
    icon: '🔍',
    title: '실시간 딥페이크 탐지',
    subtitle: '국내 유일 라이브 스트림 특화',
    desc: '라이브 방송 중 AI 합성 영상·음성을 실시간 검출합니다. 프레임 단위 CNN + LSTM 분석으로 탐지 정확도 95% 이상을 제공하며, 기존 솔루션이 사후 분석에 그치는 것과 달리 방송 중 즉시 차단까지 자동화됩니다.',
    stats: [
      { val: '95%+', label: '탐지 정확도' },
      { val: '< 1s', label: '감지→차단' },
      { val: '24/7', label: '무인 감시' },
    ],
    highlight: '보이스피싱·선거 조작·기업 사칭 영상 대응에 즉시 적용 가능',
    color: '#0ea5e9',
  },
  {
    badge: '02 · AI 자율 관제',
    icon: '🤖',
    title: 'LLM 기반 AI 보안 관제',
    subtitle: '룰이 아닌 맥락으로 대응',
    desc: '기존 보안 시스템은 사전 정의된 패턴에만 반응합니다. LunarFlux AI 관제는 보안 이벤트의 맥락을 이해하고 처음 보는 공격 패턴도 스스로 판단·대응합니다. 24시간 인력 관제 대비 비용 90% 절감.',
    stats: [
      { val: '50+', label: '자동 대응 시나리오' },
      { val: '90%', label: '관제 비용 절감' },
      { val: '< 5분', label: '위협→격리' },
    ],
    highlight: 'IT 보안 전담 인력이 없는 기업도 엔터프라이즈급 관제 실현',
    color: '#f59e0b',
    link: '/services/ai-security/',
  },
  {
    badge: '03 · 초저지연 스트리밍',
    icon: '📡',
    title: 'LL-HLS 1~2초 레이턴시',
    subtitle: '국내 CDN 평균 대비 10배 빠름',
    desc: '국내 주요 CDN의 HLS 레이턴시는 평균 5~15초입니다. LunarFlux Ultrastream은 LL-HLS 프로토콜로 1~2초를 달성합니다. 라이브 커머스에서 지연 1초 단축이 구매 전환율에 직접 영향을 미칩니다.',
    stats: [
      { val: '1~2s', label: 'LL-HLS 레이턴시' },
      { val: '80%', label: '비용 절감' },
      { val: '∞', label: '동시 시청자' },
    ],
    highlight: '스포츠 중계·라이브 커머스·실시간 경매에서 경쟁사와 체감 차이',
    color: '#10b981',
  },
]

const trustStats = [
  { val: '99.99%', label: '서비스 가용성 SLA' },
  { val: '24/7', label: 'AI 자율 보안 관제' },
  { val: '< 30s', label: 'HA 자동 페일오버' },
  { val: '95%+', label: '딥페이크 탐지 정확도' },
]

const sectors = [
  { icon: '🏛️', label: '공공기관 · 지자체' },
  { icon: '🏦', label: '금융사 · 핀테크' },
  { icon: '📺', label: '방송사 · OTT' },
  { icon: '🛒', label: '이커머스 · 라이브커머스' },
  { icon: '🎮', label: '게임사 · 미디어' },
  { icon: '🏥', label: '의료 · 헬스케어' },
  { icon: '🎓', label: '교육 · 에듀테크' },
  { icon: '🏢', label: '중견 · 중소기업' },
]

export default function EdgeSection() {
  return (
    <section style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>

        {/* Header */}
        <div className="reveal">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            Competitive Edge
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 14 }}>
            시장을 압도하는<br />
            <span style={{ background: 'linear-gradient(135deg,#0284c7,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3가지 기술 차별점</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 560 }}>
            경쟁사가 한 가지를 잘할 때, LunarFlux AI는 세 가지를 동시에 제공합니다.
          </p>
        </div>

        {/* 3 Edge Cards */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 60 }}>
          {edges.map((e, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '36px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'center',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e2 => {
                (e2.currentTarget as HTMLDivElement).style.borderColor = e.color
                ;(e2.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px ${e.color}18`
              }}
              onMouseLeave={e2 => {
                (e2.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e2.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Left */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: e.color, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${e.color}18`, border: `1px solid ${e.color}44`, borderRadius: 20, padding: '3px 12px' }}>
                    {e.badge}
                  </span>
                </div>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{e.icon}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {e.title}
                </h3>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: e.color, marginBottom: 16, letterSpacing: '0.04em' }}>
                  {e.subtitle}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.8 }}>
                  {e.desc}
                </p>
                <div style={{ marginTop: 18, padding: '10px 14px', background: `${e.color}10`, borderLeft: `3px solid ${e.color}`, borderRadius: '0 6px 6px 0', fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                  {e.highlight}
                </div>
                {e.link && (
                  <Link href={e.link} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontFamily: 'var(--mono)', fontSize: '0.75rem', color: e.color, textDecoration: 'none', letterSpacing: '0.04em', borderBottom: `1px solid ${e.color}55`, paddingBottom: 2 }}>
                    상세 서비스 페이지 보기 →
                  </Link>
                )}
              </div>

              {/* Right — stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {e.stats.map((s, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '2.2rem', fontWeight: 800, color: e.color, letterSpacing: '-0.03em', lineHeight: 1, flexShrink: 0 }}>
                      {s.val}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="reveal" style={{ marginTop: 80 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            검증된 수치
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            {trustStats.map((t, i) => (
              <div key={i} style={{ background: 'var(--surface)', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 8 }}>
                  {t.val}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text3)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            도입 분야
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {sectors.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 40,
                fontSize: '0.82rem', color: 'var(--text2)',
                fontFamily: 'var(--sans)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'
                  ;(e.currentTarget as HTMLDivElement).style.color = 'var(--text)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLDivElement).style.color = 'var(--text2)'
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
