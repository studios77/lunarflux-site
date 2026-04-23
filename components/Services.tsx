const services = [
  { icon: '🏢', cat: 'IDC / 서버', name: '서버 임대 · 코로케이션', desc: '전용서버·VPS·고객 장비 입주. 전력·냉각·네트워크 포함, Proxmox 기반 VM 즉시 할당.', tags: ['Proxmox','KVM','IPMI'] },
  { icon: '⚙️', cat: 'IDC / MSP', name: '위탁운영 매니지먼트', desc: 'OS 패치·장애대응·성능튜닝 전담. Zabbix+Grafana 실시간 모니터링, 월 SLA 리포트.', tags: ['Zabbix','Ansible','Grafana'] },
  { icon: '🔄', cat: 'IDC / HA', name: '운영서버 이중화 (HA)', desc: 'Active-Active/Standby 구성, 자동 페일오버 30초 이내, L4/L7 로드밸런서, 99.99% SLA.', tags: ['Keepalived','HAProxy','Pacemaker'] },
  { icon: '🗄️', cat: 'IDC / DB', name: 'DB 이중화 매니지먼트', desc: 'MariaDB Galera Cluster·Master-Slave 구성·모니터링·자동복구 위탁관리. 슬로우쿼리 분석.', tags: ['Galera','ProxySQL','Percona'] },
  { icon: '🛡️', cat: 'AI 보안', name: 'AI 스트림 이상탐지', desc: 'RTMP/HLS 트래픽 머신러닝 분석. 세션 하이재킹·인젝션·DDoS 실시간 탐지 및 자동차단.', tags: ['Python ML','MediaMTX','Fail2ban'] },
  { icon: '🔍', cat: 'AI 보안', name: '딥페이크 탐지 서비스', desc: '라이브 스트림 내 AI 합성 영상·음성 실시간 검출. 방송사·기업 미디어 대상 고부가가치.', tags: ['PyTorch','ONNX','FaceForensics'] },
  { icon: '📡', cat: '스트리밍', name: 'Ultrastream 엔진 호스팅', desc: 'MediaMTX 기반 RTMP/HLS/WebRTC. LL-HLS 1~2초 레이턴시, ABR 4단계, SRT·RTSP 지원.', tags: ['MediaMTX','FFmpeg','WebRTC'] },
  { icon: '🎬', cat: '스트리밍', name: 'VOD 관리 + 멀티 리스트림', desc: 'MariaDB 기반 VOD 저장·관리, 썸네일 자동생성. 유튜브·트위치·네이버 동시 송출 자동화.', tags: ['MariaDB','Cloudflare','FFmpeg'] },
  { icon: '🤖', cat: 'AI 보안', name: 'AI 자율 관제 에이전트', desc: 'LLM 기반 SOC 에이전트. 위협탐지→분석→대응 자동화로 24/7 무인 관제 실현.', tags: ['Claude API','Wazuh','SOAR'] },
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
          gap: 1, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginTop: 60,
        }}>
          {services.map(s => (
            <div key={s.name} style={{
              background: 'var(--bg2)', padding: '36px 32px',
              transition: 'background 0.3s', cursor: 'default',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg2)')}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: 20, width: 44, height: 44, border: '1px solid var(--border2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.cat}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{s.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75 }}>{s.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text3)', letterSpacing: '0.05em' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
