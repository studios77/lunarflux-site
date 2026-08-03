import Link from 'next/link'

const plans = [
  {
    tier: 'Starter', name: '스트림 Basic', price: '49,000', unit: '/hour', featured: false,
    desc: '라이브 스트리밍을 시작하는 소규모 팀에 적합한 플랜입니다.',
    features: ['UltraStreamingEngine 1채널','LL-HLS 스트리밍 (최대 1080p)','동시 시청자 100명','VOD 저장 50GB','기본 모니터링 대시보드','이메일 기술지원'],
  },
  {
    tier: 'Professional', name: 'Stream Pro + AI', price: '가격문의', unit: '', featured: true,
    desc: '스트리밍 + AI 보안이 결합된 가장 인기 있는 통합 플랜입니다.',
    features: ['UltraStreamingEngine 5채널','ABR 4단계 (1080p ~ 360p)','동시 시청자 1,000명','VOD 500GB + CDN','AI 이상탐지 + IP 자동차단','멀티플랫폼 동시 송출','24시간 Slack 기술지원'],
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

const enterpriseFeatures = [
  '무제한 채널 + 전용서버',
  'AI 보안 관제 24/7',
  '딥페이크 탐지 모듈',
  'HA/DR 완전 이중화',
  'LLM 보안 감사',
  '서버 장애 복구 및 이전',
  '네트워크 IDS/IPS',
  '전담 전문기술엔지니어 지원',
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 bg-canvas">
      <div className="container-page py-20 md:py-24">
        <div className="reveal">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Pricing
          </div>
          <h2 className="mb-4 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
            투명한 요금제
          </h2>
          <p className="max-w-lg break-keep text-[0.95rem] leading-[1.8] text-fg-muted">
            스트리밍, AI 보안, IDC 운영 중 필요한 범위만 선택하세요. 기업용 맞춰 견적도 상담으로 안내합니다.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-15 xl:grid-cols-4">
          {plans.map(p => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-lg px-7 py-9 transition-transform duration-300 hover:-translate-y-1 ${
                p.featured
                  ? 'border border-accent bg-gradient-to-b from-accent/8 to-surface shadow-[0_0_36px_rgba(52,211,153,0.14)]'
                  : 'border border-line bg-surface'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-px right-6 rounded-b bg-accent px-3 py-1 font-mono text-[0.6rem] font-medium tracking-[0.08em] text-canvas">
                  POPULAR
                </div>
              )}
              <div className="mb-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                {p.tier}
              </div>
              <div className="mb-1.5 text-[1.4rem] font-bold text-fg">{p.name}</div>
              <div className="my-5">
                {p.price === '가격문의' ? (
                  <span className="text-[1.8rem] font-bold text-accent">가격문의</span>
                ) : (
                  <span className="text-[2.4rem] font-bold text-fg">
                    <span className="align-super font-mono text-base font-normal text-fg-muted">₩</span>
                    {p.price}
                    <span className="font-mono text-[0.8rem] font-normal text-fg-subtle">{p.unit}</span>
                  </span>
                )}
              </div>
              <p className="mb-6 break-keep text-[0.82rem] leading-[1.7] text-fg-muted">{p.desc}</p>
              <ul className="mb-8 flex-1 list-none">
                {p.features.map(f => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 break-keep border-b border-line py-[7px] text-[0.83rem] text-fg-muted"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] text-accent">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block w-full rounded p-3 text-center font-mono text-[0.75rem] tracking-[0.06em] transition-all duration-250 ${
                  p.featured
                    ? 'border border-accent bg-accent font-medium text-canvas hover:bg-accent-2 hover:border-accent-2'
                    : 'border border-line-strong text-fg hover:border-accent hover:bg-accent hover:text-canvas'
                }`}
              >
                상담 신청
              </Link>
            </div>
          ))}
        </div>

        <div className="reveal mt-4 rounded-lg border border-line bg-gradient-to-br from-accent-2/8 to-surface px-7 py-9">
          <div className="mb-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
            Enterprise
          </div>
          <div className="mb-1.5 text-[1.4rem] font-bold text-fg">Full AI Security Suite</div>
          <div className="my-4 text-[1.6rem] font-bold text-accent-2">맞춰 견적</div>
          <p className="mb-5 max-w-2xl break-keep text-[0.82rem] leading-[1.7] text-fg-muted">
            무제한 채널 + 전용서버 + AI 보안 관제 + 딥페이크 탐지 + HA/DR 이중화 + 백업 자동화 + 외부 운영 서버 복구·이전 지원.
          </p>
          <div className="mb-6 grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseFeatures.map(f => (
              <div
                key={f}
                className="flex gap-2.5 break-keep border-b border-line py-[7px] text-[0.83rem] text-fg-muted"
              >
                <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] text-accent">—</span>
                {f}
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-block rounded bg-accent px-8 py-3 font-mono text-[0.75rem] font-medium tracking-[0.06em] text-canvas transition-colors duration-250 hover:bg-accent-2"
          >
            엔터프라이즈 무료 상담 신청
          </Link>
        </div>
      </div>
    </section>
  )
}
