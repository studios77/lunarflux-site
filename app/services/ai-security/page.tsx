import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 보안 관제 서비스 · 24시간 무인 보안 — LunarFlux AI',
  description: '사람 없이 24시간 스스로 탐지하고 대응하는 AI 보안 관제. 보안 사고 평균 99분→5분 이내 대응. 기존 관제 비용 대비 90% 절감. 공공기관·금융사·기업 특화.',
  keywords: ['AI 보안 관제', '인공지능보안서비스', 'ai보안서비스', '24시간 보안 관제', '무인 보안 관제', '보안 자동화', 'AI 보안', '사이버 보안 서비스', '보안 관제 서비스'],
  alternates: { canonical: 'https://lunarflux.ai/services/ai-security/' },
  openGraph: {
    title: 'AI 보안 관제 서비스 — LunarFlux AI',
    description: '24시간 AI가 스스로 탐지·분석·대응. 보안 인력 없이도 엔터프라이즈급 관제 실현.',
    url: 'https://lunarflux.ai/services/ai-security/',
    siteName: 'LunarFlux AI', locale: 'ko_KR', type: 'website',
  },
}

const strengths = [
  {
    icon: '⚡',
    title: '사고 발생 5분 이내 자동 대응',
    desc: '보안 위협이 감지되는 순간, AI가 즉시 분석하고 스스로 차단합니다. 담당자가 자리를 비운 새벽 2시에도, 주말에도 동일하게 작동합니다. 기존 인력 관제의 평균 대응 시간 99분을 5분 이내로 단축합니다.',
  },
  {
    icon: '🧠',
    title: '처음 보는 공격도 스스로 판단',
    desc: '기존 보안 시스템은 미리 등록된 패턴만 탐지합니다. LunarFlux AI 관제는 공격의 맥락과 흐름을 이해하여 새로운 유형의 위협도 스스로 판단하고 대응합니다. 알려지지 않은 신종 공격에도 강합니다.',
  },
  {
    icon: '💰',
    title: '보안 관제 비용 최대 90% 절감',
    desc: '24시간 보안 관제를 위해 교대 인력을 운영하면 연간 수억 원이 필요합니다. LunarFlux AI 관제는 그 비용의 10분의 1로 동등하거나 더 높은 수준의 보안을 제공합니다. 중소·중견기업도 부담 없이 도입 가능합니다.',
  },
  {
    icon: '🔍',
    title: '중요한 알림만 담당자에게 전달',
    desc: '수천 개의 보안 로그 중에서 실제로 중요한 위협만 골라 담당자에게 보고합니다. 불필요한 경보(오탐)를 최소화하여 보안팀이 정말 중요한 일에 집중할 수 있습니다.',
  },
  {
    icon: '📊',
    title: '매일·매주·매월 보안 현황 리포트',
    desc: '어떤 위협이 몇 건 탐지됐고, 어떻게 처리됐는지 알기 쉬운 리포트로 확인하세요. 경영진 보고용 요약본부터 담당자용 상세 리포트까지 자동으로 제공됩니다.',
  },
  {
    icon: '🛡️',
    title: '컴플라이언스 및 감사 자동화',
    desc: '금융, 의료, 공공기관에서 요구하는 보안 감사 기록을 자동으로 생성하고 보관합니다. 정기 감사 때 필요한 자료를 별도 준비 없이 즉시 제출할 수 있습니다.',
  },
]

const problems = [
  { stat: '99분', desc: '보안 사고 발생 후 인력 관제의 평균 인지 시간' },
  { stat: '43%', desc: '사이버 공격이 업무 시간 외(야간·주말)에 발생하는 비율' },
  { stat: '8억+', desc: '국내 기업 평균 보안 사고 1건당 피해 비용 (원)' },
  { stat: '67%', desc: '보안 인력 부족을 가장 큰 위험 요소로 꼽는 기업 비율' },
]

const steps = [
  { num: '01', title: '전체 인프라 실시간 감시', desc: '서버, 네트워크, 애플리케이션, 클라우드까지 모든 영역에서 발생하는 이벤트를 24시간 수집하고 분석합니다.' },
  { num: '02', title: '위협 자동 탐지 및 분류', desc: '수집된 데이터에서 이상 징후를 즉시 식별하고 위협 수준을 자동으로 분류합니다. 경미한 것은 자동 처리, 중요한 것은 에스컬레이션합니다.' },
  { num: '03', title: '즉각 자동 대응 실행', desc: '위협이 확인되면 AI가 스스로 차단, 격리, 접근 제한 등의 조치를 즉시 실행합니다. 사람의 승인을 기다리지 않습니다.' },
  { num: '04', title: '담당자 보고 및 사후 분석', desc: '처리된 모든 위협에 대한 상세 보고서를 생성하고, 담당자에게 주요 내용을 자동 보고합니다. 재발 방지 권고안도 함께 제공됩니다.' },
]

const sectors = [
  { icon: '🏦', name: '금융 · 핀테크', desc: '실시간 이상 거래 탐지, 개인정보 유출 방지' },
  { icon: '🏥', name: '의료 · 헬스케어', desc: '환자 데이터 보호, 의료기기 네트워크 보안' },
  { icon: '🏛️', name: '공공기관 · 지자체', desc: '행정망 침해 방지, 보안 감사 자동화' },
  { icon: '🛒', name: '이커머스 · 플랫폼', desc: '고객 정보 보호, 결제 시스템 보안' },
  { icon: '🎮', name: '게임 · 미디어', desc: '서버 해킹 방지, 불법 접근 차단' },
  { icon: '🏢', name: '중견 · 중소기업', desc: '전담 보안팀 없이 엔터프라이즈급 보안 실현' },
]

export default function AISecurityPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(240,248,255,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 5%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', display: 'inline-block' }} />
          Lunarflux<span style={{ color: 'var(--accent)' }}>AI</span>
        </Link>
        <Link href="/#services" style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text2)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          ← 서비스 목록
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ padding: '130px 5% 90px', maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
          AI Security Monitoring
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 28, maxWidth: 800 }}>
          사람 없이 24시간,<br />
          <span style={{ background: 'linear-gradient(135deg,#0284c7,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI가 스스로 지키는</span><br />
          보안 관제
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.85, maxWidth: 580, marginBottom: 44 }}>
          보안 위협은 담당자가 자리를 비운 새벽에 집중됩니다.<br />
          LunarFlux AI 보안 관제는 365일 24시간, 단 한 순간도 놓치지 않고<br />
          위협을 탐지하고 스스로 대응합니다.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/#contact" style={{ padding: '14px 36px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 30px rgba(14,165,233,0.3)' }}>
            무료 보안 진단 신청
          </Link>
          <a href="tel:01032043847" style={{ padding: '14px 36px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textDecoration: 'none' }}>
            📞 010-3204-3847
          </a>
        </div>

        {/* 긴급 배지 */}
        <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse2 1.5s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: '#ef4444', letterSpacing: '0.06em' }}>
            현재 AI 관제 엔진 실시간 가동 중 — 위협 0건 탐지
          </span>
        </div>
      </section>

      {/* 문제 제기 */}
      <section style={{ background: 'var(--bg2)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            현실
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            지금 이 순간에도 보안 위협은 계속됩니다
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 600, marginBottom: 52 }}>
            보안 사고는 예고 없이 찾아오고, 대부분 담당자가 없는 시간에 발생합니다. 늦은 대응 하나가 수억 원의 피해로 이어집니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            {problems.map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', padding: '36px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 800, color: '#ef4444', letterSpacing: '-0.03em', marginBottom: 12 }}>{p.stat}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.65 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 강점 */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            핵심 강점
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 52 }}>
            LunarFlux AI 관제만의 차별점
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {strengths.map((s, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '32px 28px',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(14,165,233,0.1)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작동 방식 */}
      <section style={{ background: 'var(--bg2)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            작동 방식
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 52 }}>
            도입부터 대응까지, 4단계로 작동합니다
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: '0 28px 0 0', position: 'relative' }}>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: 22, right: 0, width: 28, height: 2, background: 'linear-gradient(90deg, var(--accent), var(--border))', display: 'none' }} />
                )}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 4, padding: '4px 10px', display: 'inline-block', marginBottom: 16 }}>
                  STEP {s.num}
                </div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#fff', fontFamily: 'var(--display)', fontWeight: 700, fontSize: '1rem' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.75, paddingRight: 16 }}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div style={{ marginTop: 24, color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 300 }}>↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 분야 */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            도입 분야
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
            모든 규모, 모든 업종에서 활용됩니다
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {sectors.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 효과 */}
      <section style={{ background: 'linear-gradient(135deg, #0c1e3a 0%, #0a2a50 100%)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            도입 효과
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: 52 }}>
            도입 후 달라지는 것들
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { before: '평균 99분', after: '5분 이내', label: '위협 대응 시간' },
              { before: '수억 원/년', after: '90% 절감', label: '보안 관제 비용' },
              { before: '업무 시간만', after: '365일 24시간', label: '관제 운영 시간' },
              { before: '사후 처리', after: '실시간 차단', label: '위협 대응 방식' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 10, padding: '28px 22px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through', marginBottom: 6 }}>{item.before}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{item.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg2)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>지금 시작하세요</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
            무료 보안 취약점 진단을<br />먼저 받아보세요
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: 40 }}>
            현재 인프라의 보안 취약점을 무료로 진단해 드립니다.<br />
            전문 엔지니어가 검토 후 24시간 이내 결과를 안내해 드립니다.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#contact" style={{ padding: '14px 36px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 30px rgba(14,165,233,0.25)' }}>
              무료 진단 신청하기
            </Link>
            <a href="tel:01032043847" style={{ padding: '14px 36px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textDecoration: 'none' }}>
              📞 긴급 상담 010-3204-3847
            </a>
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['도입 비용 무료 견적', '24시간 내 회신', '계약 의무 없음'].map((t, i) => (
              <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse2 {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </main>
  )
}
