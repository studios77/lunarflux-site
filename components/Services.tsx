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
    <section id="services" className="relative z-10 bg-elev">
      <div className="container-page py-20 md:py-24">
        <div className="reveal">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Services
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
            통합 기술 서비스
          </h2>
          <p className="max-w-lg break-keep text-[0.95rem] leading-[1.8] text-fg-muted">
            IDC 인프라, AI 보안, 라이브 스트리밍을 한 플랫폼에서. 필요한 항목만 고르거나, 전체를 맡기셔도 됩니다.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-15 lg:grid-cols-3">
          {services.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}/`}
              title={s.name}
              className="group block min-w-0"
            >
              <div className="relative h-full min-w-0 overflow-hidden rounded-2xl border border-line bg-surface/60 px-7 py-9 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:bg-surface group-hover:shadow-[0_16px_40px_rgba(52,211,153,0.14)]">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-line-strong bg-elev text-[1.4rem] transition-colors duration-300 group-hover:border-accent/60">
                  {s.icon}
                </div>
                <div className="mb-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent">
                  {s.cat}
                </div>
                <div className="mb-3 truncate text-[clamp(1rem,2.2vw,1.1rem)] font-bold leading-[1.35] tracking-[-0.02em] text-fg">
                  {s.name}
                </div>
                <div className="mb-5 break-keep text-[0.86rem] leading-[1.65] text-fg-muted">
                  {s.desc}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-accent/5 px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-[0.02em] text-fg-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-1 font-mono text-[0.75rem] font-semibold tracking-[0.04em] text-accent">
                  자세히 보기
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
