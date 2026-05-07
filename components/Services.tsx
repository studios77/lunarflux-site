import Link from 'next/link'

type ServiceCard = {
  icon: string
  cat: string
  name: string
  slug: string
  desc: string
  tags: string[]
}

const services: ServiceCard[] = [
  { icon: '🏢', cat: 'IDC / 서버', name: '서버 임대 · 코로케이션', slug: 'server-rental', desc: '가상화 기반 VM 즉시 할당부터 고객 장비 입주(코로케이션)까지. 전력·냉각·네트워크 포함, IPMI 원격관리.',     tags: ['KVM','IPMI','Bare Metal'] },
  { icon: '⚡', cat: 'IDC / AIDC', name: 'AIDC GPU 전용 호스팅', slug: 'aidc', desc: '고성능 GPU 서버 호스팅 및 초고전력 코로케이션. AI 학습·추론 최적화.', tags: ['RTX 5090','NVIDIA','딥러닝'] },
  { icon: '⚙️', cat: 'IDC / MSP', name: '위탁운영 매니지먼트', slug: 'managed-service', desc: 'OS 패치·장애대응·성능튜닝 전담. Zabbix+Grafana 실시간 모니터링, 월 SLA 리포트.', tags: ['Zabbix','Ansible','Grafana'] },
  { icon: '🔄', cat: 'IDC / HA', name: '운영서버 이중화 (HA)', slug: 'ha', desc: 'Active-Active/Standby 구성, 자동 페일오버 30초 이내, L4/L7 로드밸런서, 99.99% SLA.', tags: ['Keepalived','HAProxy','Pacemaker'] },
  { icon: '🗄️', cat: 'IDC / DB', name: 'DB 이중화 매니지먼트', slug: 'db-cluster', desc: 'Galera Cluster·Master-Slave 구성·모니터링·자동복구 위탁관리. 슬로우쿼리 분석.', tags: ['Galera','ProxySQL','Percona'] },
  { icon: '🛠️', cat: 'IDC / 서버', name: '서버 장애 복구 및 이전', slug: 'system-recovery-migration', desc: 'LunarFlux IDC 여부와 무관하게, 외부 고객이 운영 중인 서버·VM·온프레 환경에 대해 서비스가 필요한 고객이 요청 시 장애 복구, 이전, 성능·네트워크 TS. 원격·현장.', tags: ['긴급복구','이전','온프레'] },
  { icon: '🛡️', cat: 'AI 보안', name: 'AI 보안 관제', slug: 'ai-security', desc: '365일 24시간 무인 관제. 위협 자동 탐지·분류·대응과 비용 절감을 동시에. 공공·금융·중견기업 특화.', tags: ['24/7','자동 대응','컴플라이언스'] },
  { icon: '🤖', cat: 'AI 보안', name: 'AI 자율 관제 에이전트', slug: 'ai-agent', desc: 'LLM 기반 SOC 자동화. Wazuh SIEM·SOAR 플레이북으로 탐지→분석→대응까지 연결.', tags: ['LLM','SIEM','SOAR'] },
  { icon: '🛰️', cat: 'AI 보안', name: 'AI 스트림 이상탐지', slug: 'ai-stream-security', desc: 'RTMP/HLS 트래픽 머신러닝 분석. 세션 하이재킹·인젝션·DDoS 실시간 탐지 및 자동차단.', tags: ['Python ML','MediaMTX','Fail2ban'] },
  { icon: '🔍', cat: 'AI 보안', name: '딥페이크 탐지 서비스', slug: 'deepfake-detection', desc: '라이브 스트림 내 AI 합성 영상·음성 실시간 검출. 방송사·기업 미디어 대상 고부가가치.', tags: ['PyTorch','ONNX','FaceForensics'] },
  { icon: '🌐', cat: 'AI 보안', name: '네트워크 보안 · IDS/IPS', slug: 'network-security', desc: '침입탐지·방지와 ML 보조 이상탐지. 경계·내부 세그먼트 가시화 및 SIEM 연동.', tags: ['Suricata','Zeek','eBPF'] },
  { icon: '🔐', cat: 'AI 보안', name: '제로트러스트 아키텍처', slug: 'zero-trust', desc: 'ID·디바이스·맥락 기반 최소권한. 마이크로세그먼트·MFA·지속 검증 로드맵.', tags: ['IAM','세그먼트','MFA'] },
  { icon: '📋', cat: 'AI 보안', name: 'LLM 보안 감사', slug: 'llm-security-audit', desc: '생성형 AI 유출·프롬프트 인젝션·RAG 거버넌스 점검. 정책·기술·운영 권고안.', tags: ['프롬프트','거버넌스','감사'] },
  { icon: '📡', cat: '스트리밍', name: 'UltraStreamingEngine', slug: 'ultrastream', desc: '국내 CDN 대비 10배 빠른 LL-HLS 1~2초 초저지연. 공공기관·기업·방송사·라이브커머스 전용. 동시 시청자 무제한, 99.99% 가용성.', tags: ['초저지연','무제한 시청자','99.99% SLA'] },
  { icon: '🎬', cat: '스트리밍', name: 'VOD 관리 + 멀티 리스트림', slug: 'vod-multistream', desc: 'VOD 저장·썸네일 자동생성. 유튜브·트위치·네이버 동시 송출 자동화.', tags: ['MariaDB','Cloudflare','FFmpeg'] },
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
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.8 }}>IDC 인프라, AI 보안, 라이브 스트리밍을 한 플랫폼에서. 필요한 항목만 고르거나, 전체를 맡기셔도 됩니다.</p>
        </div>

        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20, marginTop: 60,
        }}>
          {services.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}/`} title={s.name} style={{ textDecoration: 'none', minWidth: 0 }}>
              <div style={{
                background: 'rgba(255,255,255,0.6)', padding: '36px 28px', height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer',
                position: 'relative', overflow: 'hidden', minWidth: 0,
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
                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1rem, 2.2vw, 1.1rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.35, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: 20, wordBreak: 'keep-all' }}>{s.desc}</div>
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
