import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ultrastream — LL-HLS 초저지연 라이브 스트리밍 플랫폼 | LunarFlux AI',
  description: '국내 CDN 대비 10배 빠른 LL-HLS 1~2초 초저지연 스트리밍. 공공기관·방송사·기업 행사·라이브커머스 전용. 동시 시청자 무제한, 99.99% 가용성 보장.',
  keywords: ['라이브 스트리밍 솔루션', 'LL-HLS', '초저지연 스트리밍', '라이브 스트리밍 플랫폼', '스트리밍 솔루션', '기업 스트리밍', '공공기관 스트리밍', '방송 스트리밍', 'Ultrastream'],
  alternates: { canonical: 'https://lunarflux.ai/services/ultrastream/' },
  openGraph: {
    title: 'Ultrastream LL-HLS 초저지연 스트리밍 — LunarFlux AI',
    description: '국내 CDN 대비 10배 빠른 1~2초 초저지연. 공공기관·기업·방송사 전용 스트리밍 플랫폼.',
    url: 'https://lunarflux.ai/services/ultrastream/',
    siteName: 'LunarFlux AI', locale: 'ko_KR', type: 'website',
  },
}

const comparisons = [
  { label: '일반 HLS (국내 CDN 평균)', delay: '10~30초', bar: 100, color: '#ef4444' },
  { label: '경쟁사 저지연 솔루션', delay: '3~5초', bar: 30, color: '#f59e0b' },
  { label: 'Ultrastream LL-HLS', delay: '1~2초', bar: 10, color: '#0ea5e9' },
]

const strengths = [
  {
    icon: '⚡',
    title: '1~2초 초저지연 — 국내 최고 수준',
    desc: '국내 주요 방송사·CDN의 일반 HLS 스트리밍은 평균 10~30초의 지연이 발생합니다. Ultrastream은 LL-HLS 기술로 이를 1~2초까지 단축합니다. 시청자가 "지금 일어나는 일"을 진짜 실시간으로 보게 됩니다.',
  },
  {
    icon: '♾️',
    title: '동시 시청자 수 제한 없음',
    desc: '1명이든 100만 명이든 동일한 품질을 제공합니다. 대규모 공공 행사, 전국 단위 기업 방송, 스포츠 중계 등 트래픽이 예측 불가한 상황에서도 끊김 없이 서비스됩니다. CDN 연동으로 글로벌 확장도 즉시 가능합니다.',
  },
  {
    icon: '📱',
    title: '모든 기기, 모든 환경에서 끊김 없이',
    desc: '시청자의 인터넷 속도에 따라 화질이 자동으로 최적화됩니다. 고속 환경에서는 4K 고화질로, 느린 환경에서는 버퍼링 없이 낮은 화질로 자동 전환됩니다. PC, 모바일, 태블릿, TV 모두 지원합니다.',
  },
  {
    icon: '🔒',
    title: '방송 보안 및 저작권 보호 내장',
    desc: '무단 재송출과 스트림 도용을 방지하는 보안 기능이 기본 탑재됩니다. 특정 IP 또는 도메인에서만 재생 가능하도록 제한하고, 불법 공유 링크를 즉시 무력화합니다.',
  },
  {
    icon: '📊',
    title: '실시간 시청자 현황 대시보드',
    desc: '현재 동시 시청자 수, 지역별 분포, 화질별 비율, 버퍼링 발생 현황을 실시간으로 확인합니다. 방송 중 문제가 생기면 즉시 알림으로 알려드립니다.',
  },
  {
    icon: '🎬',
    title: '방송 즉시 VOD 자동 저장',
    desc: '라이브 방송이 끝나는 순간 자동으로 다시 보기 영상이 생성됩니다. 별도 작업 없이 방송 아카이브가 구축되며, 썸네일도 자동 생성됩니다.',
  },
]

const useCases = [
  {
    sector: '공공기관 · 지자체',
    icon: '🏛️',
    color: '#0ea5e9',
    title: '전국 단위 생중계도 끊김 없이',
    scenarios: [
      '시·도지사 기자회견 및 브리핑 실시간 중계',
      '의회·위원회 회의 투명 공개 스트리밍',
      '재난 상황 긴급 대국민 브리핑',
      '선거 개표 실시간 방송',
      '공공 문화행사·축제 온라인 중계',
    ],
    point: '보안 채널 분리, 내부망 전용 스트리밍 구성 가능. 공공기관 정보보안 지침 준수.',
  },
  {
    sector: '기업 · 대기업',
    icon: '🏢',
    color: '#f59e0b',
    title: '임직원 수만 명, 동시에 하나의 방송으로',
    scenarios: [
      '전사 타운홀·CEO 연설 전 임직원 실시간 송출',
      '신제품 론칭 이벤트 온라인 동시 중계',
      '주주총회·IR 온라인 라이브',
      '글로벌 본사·지사 동시 회의 방송',
      '사내 교육·세미나 실시간 스트리밍',
    ],
    point: '임직원 전용 보안 접속, 로그인 인증 연동, 내부 포털 임베드 지원.',
  },
  {
    sector: '방송사 · 미디어',
    icon: '📺',
    color: '#10b981',
    title: '1초의 지연도 허용하지 않는 현장 중계',
    scenarios: [
      '스포츠 경기 실시간 중계 (OTT 연동)',
      '뉴스 속보 즉시 온라인 배포',
      '콘서트·공연 온라인 유료 생중계',
      '멀티채널 동시 스트리밍 관리',
      '해외 시청자 글로벌 CDN 배포',
    ],
    point: '방송 등급 SLA 99.99% 보장. AI 스트림 보안·딥페이크 탐지 연동 가능.',
  },
  {
    sector: '이커머스 · 라이브커머스',
    icon: '🛒',
    color: '#8b5cf6',
    title: '지연 1초가 매출을 바꿉니다',
    scenarios: [
      '쇼핑 라이브 방송 초저지연 (호스트↔시청자 소통)',
      '한정판 상품 선착순 구매 연동',
      '멀티채널 동시 라이브 방송 관리',
      '방송 중 실시간 쿠폰·이벤트 연동',
      '방송 종료 즉시 VOD 쇼핑 연결',
    ],
    point: '스트리밍 지연 1초 단축 → 구매 전환율 평균 8% 향상 (업계 데이터 기준).',
  },
]

const stats = [
  { val: '1~2초', label: 'LL-HLS 레이턴시', sub: '국내 CDN 평균 대비 10배 빠름' },
  { val: '99.99%', label: '서비스 가용성', sub: 'SLA 보장 / 월간 다운타임 4.3분 이하' },
  { val: '무제한', label: '동시 시청자', sub: 'CDN 연동 자동 확장' },
  { val: '80%', label: '비용 절감', sub: '기존 방송 인프라 대비' },
]

export default function UltrastreamPage() {
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
      <section style={{ padding: '130px 5% 80px', maxWidth: 1100, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(14,165,233,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
          Ultrastream Engine · LL-HLS Technology
        </div>

        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 28, maxWidth: 820 }}>
          국내 CDN보다<br />
          <span style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>10배 빠른 스트리밍.</span><br />
          지연 없는 라이브가<br />게임을 바꿉니다.
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.85, maxWidth: 580, marginBottom: 44 }}>
          시청자가 화면을 보는 순간과 현실이 벌어지는 순간의 차이.<br />
          Ultrastream LL-HLS는 그 간격을 <strong style={{ color: 'var(--text)' }}>1~2초</strong>로 줄입니다.<br />
          공공기관, 대기업, 방송사, 이커머스가 선택한 이유입니다.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 60 }}>
          <Link href="/#contact" style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 30px rgba(14,165,233,0.35)' }}>
            무료 데모 신청
          </Link>
          <a href="tel:01032043847" style={{ padding: '14px 36px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textDecoration: 'none' }}>
            📞 010-3204-3847
          </a>
        </div>

        {/* 지연 비교 바 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 28px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>스트리밍 지연(레이턴시) 비교</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {comparisons.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.82rem', color: i === 2 ? 'var(--text)' : 'var(--text2)', fontWeight: i === 2 ? 700 : 400 }}>{c.label}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: c.color, fontWeight: 700 }}>{c.delay}</span>
                </div>
                <div style={{ height: i === 2 ? 12 : 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.bar}%`, background: c.color, borderRadius: 4, opacity: i === 2 ? 1 : 0.5 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text3)' }}>
            * 동일 네트워크 환경 기준 측정값 / 실제 환경에 따라 다를 수 있음
          </div>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section style={{ background: 'linear-gradient(135deg,#0c1e3a,#0a2a50)', padding: '70px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 12, overflow: 'hidden' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '36px 28px', textAlign: 'center', background: 'rgba(0,0,0,0.15)' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em', marginBottom: 8 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 혁신 기술 설명 */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            혁신 기술
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
            왜 Ultrastream이 다른가
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 640, marginBottom: 52 }}>
            기존 스트리밍 방식은 영상을 큰 덩어리로 쪼개어 전송합니다. Ultrastream LL-HLS는 덩어리를 최소 단위로 나누어 만들어지는 즉시 전송하는 방식으로, 기다림 없이 실시간에 가장 가까운 경험을 제공합니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {strengths.map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '30px 26px', transition: 'border-color 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(14,165,233,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.02rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 분야 상세 */}
      <section style={{ background: 'var(--bg2)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            실제 활용 분야
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            기관, 기업, 방송사가<br />실제로 이렇게 씁니다
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 580, marginBottom: 52 }}>
            초저지연 스트리밍이 필요한 모든 곳에 Ultrastream이 있습니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {useCases.map((u, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '280px 1fr' }}>
                {/* 좌측 */}
                <div style={{ background: `linear-gradient(160deg, ${u.color}18, ${u.color}08)`, borderRight: `1px solid ${u.color}22`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>{u.icon}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: u.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{u.sector}</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>{u.title}</div>
                </div>
                {/* 우측 */}
                <div style={{ padding: '32px 32px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {u.scenarios.map((sc, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.86rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                        <span style={{ color: u.color, fontSize: '0.75rem', flexShrink: 0, marginTop: 2 }}>▸</span>
                        {sc}
                      </li>
                    ))}
                  </ul>
                  <div style={{ padding: '10px 14px', background: `${u.color}10`, borderLeft: `3px solid ${u.color}`, borderRadius: '0 6px 6px 0', fontSize: '0.79rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    {u.point}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            도입 효과
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
            Ultrastream 도입 후 달라지는 것
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {[
              { before: '10~30초 지연', after: '1~2초 실시간', label: '스트리밍 레이턴시' },
              { before: '동시 시청자 한계', after: '무제한 확장', label: '트래픽 대응' },
              { before: '수동 VOD 편집', after: '방송 즉시 자동 저장', label: 'VOD 아카이빙' },
              { before: '단일 플랫폼', after: '10개 동시 송출', label: '멀티 채널 배포' },
              { before: '별도 보안 설정', after: '보안 기능 기본 탑재', label: '스트림 보안' },
              { before: '불투명한 현황', after: '실시간 대시보드', label: '모니터링' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{item.label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text3)', textDecoration: 'line-through', marginBottom: 6 }}>{item.before}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)' }}>{item.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0c1e3a,#0a2a50)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>지금 시작하세요</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            무료 데모로<br />직접 체험해 보세요
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 44 }}>
            실제 스트리밍 환경에서 LL-HLS 지연을 직접 확인하실 수 있습니다.<br />
            전문 엔지니어가 귀사 환경에 맞는 구성을 안내해 드립니다.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#contact" style={{ padding: '15px 40px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 40px rgba(14,165,233,0.4)' }}>
              무료 데모 신청하기
            </Link>
            <a href="tel:01032043847" style={{ padding: '15px 40px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.06em', textDecoration: 'none' }}>
              📞 010-3204-3847
            </a>
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
            {['무료 데모 환경 제공', '도입 비용 맞춤 견적', '24시간 내 회신'].map((t, i) => (
              <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
