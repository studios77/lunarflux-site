const plans = [
  {
    tier: 'Starter', name: '스트림 Basic', price: '49,000', unit: '/hour', featured: false,
    desc: '라이브 스트리밍을 시작하는 소규모 팀에 적합한 플랜입니다.',
    features: ['Ultrastream 엔진 1채널','LL-HLS 스트리밍 (최대 1080p)','동시 시청자 100명','VOD 저장 50GB','기본 모니터링 대시보드','이메일 기술지원'],
  },
  {
    tier: 'Professional', name: 'Stream Pro + AI', price: '가격문의', unit: '', featured: true,
    desc: '스트리밍 + AI 보안이 결합된 가장 인기 있는 통합 플랜입니다.',
    features: ['Ultrastream 엔진 5채널','ABR 4단계 (1080p ~ 360p)','동시 시청자 1,000명','VOD 500GB + CDN','AI 이상탐지 + IP 자동차단','멀티플랫폼 동시 송출','24시간 Slack 기술지원'],
  },
  {
    tier: 'IDC Standard', name: '서버 위탁운영', price: '30만~', unit: '/월', featured: false,
    desc: '서버 운영을 전문가에게 맡기고 비즈니스에만 집중하세요.',
    features: ['OS 패치·보안업데이트 전담','장애대응 (4시간 이내)','Zabbix 실시간 모니터링','월간 SLA 리포트','백업 자동화 포함','전화·원격 기술지원'],
  },
  {
    tier: 'HA / DR', name: '이중화 + DR', price: '80만~', unit: '/월', featured: false,
    desc: '서버·DB 이중화와 재해복구까지 완전한 고가용성 구성.',
    features: ['Active-Active HA 구성','자동 페일오버 30초 이내','DB 이중화 (Galera Cluster)','DR 원격지 백업 연동','RTO 4h / RPO 1h 보장','분기별 복구훈련 포함'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>
        <div className="reveal">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            Pricing
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>투명한 요금제</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.8 }}>필요한 서비스만 선택하세요. 모든 플랜에 기본 모니터링과 기술 지원이 포함됩니다.</p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 60 }}>
          {plans.map(p => (
            <div key={p.name} style={{
              border: p.featured ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: 8, padding: '36px 28px',
              background: p.featured ? 'linear-gradient(160deg, rgba(56,189,248,0.1), var(--surface))' : 'var(--surface)',
              position: 'relative', transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: p.featured ? '0 0 40px rgba(56,189,248,0.15)' : 'none',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              {p.featured && (
                <div style={{ position: 'absolute', top: -1, right: 24, background: 'var(--accent)', color: '#000', fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '0 0 4px 4px' }}>POPULAR</div>
              )}
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{p.tier}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{p.name}</div>
              <div style={{ margin: '20px 0' }}>
                {p.price === '가격문의' ? (
                  <span style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>
                    가격문의
                  </span>
                ) : (
                  <span style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, color: 'var(--text)' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text2)', fontFamily: 'var(--mono)', verticalAlign: 'super' }}>₩</span>
                    {p.price}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text3)', fontFamily: 'var(--mono)', fontWeight: 400 }}>{p.unit}</span>
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 24, lineHeight: 1.7 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '0.83rem', color: 'var(--text2)', padding: '7px 0', borderBottom: '1px solid rgba(56,189,248,0.08)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: 'block', width: '100%', padding: 12, borderRadius: 4, textAlign: 'center', textDecoration: 'none',
                fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.06em', transition: 'all 0.25s',
                background: p.featured ? 'var(--accent)' : 'transparent',
                border: p.featured ? '1px solid var(--accent)' : '1px solid var(--border2)',
                color: p.featured ? '#fff' : 'var(--text)', fontWeight: p.featured ? 500 : 400,
              }}>
                {p.tier === 'IDC Standard' || p.tier === 'HA / DR' ? '상담 신청' : '시작하기'}
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="reveal" style={{ marginTop: 16, border: '1px solid var(--border)', borderRadius: 8, padding: '36px 28px', background: 'linear-gradient(135deg, rgba(253,230,138,0.07), var(--surface))' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Enterprise</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Full AI Security Suite</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent2)', margin: '16px 0' }}>맞춤 견적</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7, maxWidth: 600 }}>무제한 채널 + 전용서버 + AI 보안 관제 + 딥페이크 탐지 + HA/DR 이중화 + 백업 자동화.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 24px', marginBottom: 24 }}>
            {['무제한 채널 + 전용서버','AI 보안 관제 24/7','딥페이크 탐지 모듈','HA/DR 완전 이중화','LLM 보안 감사','전담 기술이사 지원'].map(f => (
              <div key={f} style={{ fontSize: '0.83rem', color: 'var(--text2)', padding: '7px 0', borderBottom: '1px solid rgba(56,189,248,0.08)', display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>—</span>{f}
              </div>
            ))}
          </div>
          <a href="#contact" style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none' }}>엔터프라이즈 상담</a>
        </div>
      </div>
    </section>
  )
}
