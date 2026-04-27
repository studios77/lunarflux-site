import Link from 'next/link'

const services = [
  { icon: '🏢', cat: 'IDC / 서버', name: '서버 임대 · 코로케이션', slug: 'server-rental', desc: '가상화 기반 VM 즉시 할당부터 고객 장비 입주(코로케이션)까지. 전력·냉각·네트워크 포함, IPMI 원격관리.', tags: ['KVM','IPMI','Bare Metal'] },
  { icon: '⚙️', cat: 'IDC / MSP', name: '위탁운영 매니지먼트', slug: 'managed-service', desc: 'OS 패치·장애대응·성능튜닝 전담. Zabbix+Grafana 실시간 모니터링, 월 SLA 리포트.', tags: ['Zabbix','Ansible','Grafana'] },
  { icon: '🔄', cat: 'IDC / HA', name: '운영서버 이중화 (HA)', slug: 'ha', desc: 'Active-Active/Standby 구성, 자동 페일오버 30초 이내, L4/L7 로드밸런서, 99.99% SLA.', tags: ['Keepalived','HAProxy','Pacemaker'] },
  { icon: '🗄️', cat: 'IDC / DB', name: 'DB 이중화 매니지먼트', slug: 'db-cluster', desc: 'Galera Cluster·Master-Slave 구성·모니터링·자동복구 위탁관리. 슬로우쿼리 분석.', tags: ['Galera','ProxySQL','Percona'] },
  { icon: '🛡️', cat: 'AI 보안', name: 'AI 스트림 이상탐지', slug: 'ai-stream-security', desc: 'RTMP/HLS 트래픽 머신러닝 분석. 세션 하이재킹·인젝션·DDoS 실시간 탐지 및 자동차단.', tags: ['Python ML','MediaMTX','Fail2ban'] },
  { icon: '🔍', cat: 'AI 보안', name: '딥페이크 탐지 서비스', slug: 'deepfake-detection', desc: '라이브 스트림 내 AI 합성 영상·음성 실시간 검출. 방송사·기업 미디어 대상 고부가가치.', tags: ['PyTorch','ONNX','FaceForensics'] },
  { icon: '📡', cat: '스트리밍', name: 'Ultrastream 엔진 호스팅', slug: 'ultrastream', desc: '국내 CDN 대비 10배 빠른 LL-HLS 1~2초 초저지연. 공공기관·기업·방송사·라이브커머스 전용. 동시 시청자 무제한, 99.99% 가용성.', tags: ['초저지연','무제한 시청자','99.99% SLA'] },
  { icon: '🎬', cat: '스트리밍', name: 'VOD 관리 + 멀티 리스트림', slug: 'vod-multistream', desc: 'VOD 저장·썸네일 자동생성. 유튜브·트위치·네이버 동시 송출 자동화.', tags: ['MariaDB','Cloudflare','FFmpeg'] },
  { icon: '🤖', cat: 'AI 보안', name: 'AI 자율 관제 에이전트', slug: 'ai-security', desc: '24시간 AI가 스스로 위협을 탐지하고 대응합니다. 보안 인력 없이도 엔터프라이즈급 관제. 기존 대비 비용 90% 절감.', tags: ['24/7 무인관제','자동 대응','비용 절감'] },
]

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>
        <div className="reveal">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            Services
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>통합 기술 서비스</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.8 }}>IDC 인프라, AI 보안, 라이브 스트리밍을 하나의 플랫폼에서.</p>
        </div>

        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20, marginTop: 60,
        }}>
          {services.map(s => (
            <Link key={s.name} href={`/services/${s.slug}/`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.6)', padding: '36px 32px', height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                borderRadius: 20, border: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = '#ffffff'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(16,185,129,0.12)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.6)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: 20, width: 48, height: 48, border: '1px solid var(--border2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', boxShadow: '0 4px 12px rgba(16,185,129,0.08)' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{s.cat}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>{s.name}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(16,185,129,0.05)', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text3)', letterSpacing: '0.02em', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.04em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  자세히 보기 <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
