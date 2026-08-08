import Link from 'next/link'
import ServiceIcon from '@/components/ServiceIcon'
import { servicesData } from '@/lib/servicesData'

/**
 * 홈 서비스 개요.
 *
 * 예전에는 18개 서비스를 카드로 전부 펼쳐 스크롤이 길고 무엇을 먼저 볼지
 * 알 수 없었습니다. 여기서는 보안 4개 축만 카드로 두고 서비스는 이름 링크로
 * 접습니다. 상세는 각 페이지와 메가메뉴가 이미 담고 있습니다.
 *
 * 콘텐츠 출처는 lib/servicesData.ts 하나입니다. points 의 수치도 전부
 * servicesData 의 specs·highlights 에서 가져온 값이므로, 사양이 바뀌면
 * 두 곳을 함께 고쳐야 합니다.
 */
type Pillar = {
  label: string
  prefix: string
  blurb: string
  body: string
  points: string[]
}

const PILLARS: Pillar[] = [
  {
    label: '네트워크 보안',
    prefix: '보안 / 네트워크',
    blurb: '경계부터 내부 세그먼트까지',
    body:
      '방화벽 한 대로 끝나지 않습니다. 밖에서 들어오는 트래픽과 서버끼리 오가는 내부 트래픽을 같은 정책으로 봅니다. Lunarflux Guard 는 보호 대상 서버에 아무것도 설치하지 않고 L2 투명 인라인으로 삽입되어, IP 변경이나 네트워크 재설계 없이 보안 계층을 얹습니다.',
    points: [
      'IDS/IPS 51,977 시그니처 · 자체 WAF 105규칙 21카테고리',
      'JA4+ 4지문으로 User-Agent 를 위조한 봇을 계층 모순으로 식별',
      '내부망 횡적 이동·스캐닝·비정상 프로토콜 사용까지 가시화',
    ],
  },
  {
    label: '클라우드 보안',
    prefix: '보안 / 클라우드',
    blurb: '설정·권한·워크로드 점검',
    body:
      '클라우드 사고는 대부분 침입이 아니라 열려 있는 설정에서 시작합니다. 계정에 쌓인 공개 버킷과 과다 권한을 걷어내고, 배포 전 이미지와 운영 중인 컨테이너를 따로 보지 않고 한 흐름으로 다룹니다.',
    points: [
      'AWS · Azure · GCP 계정 단위로 노출 지점과 권한 과다 점검',
      '이미지 취약점부터 런타임 이상 행위까지 배포 파이프라인에 연결',
      '전부 고치라는 목록 대신 위험도와 작업량을 함께 본 조치 순서',
    ],
  },
  {
    label: 'AI · 데이터 보안',
    prefix: '보안 / AI·데이터',
    blurb: '생성형 AI와 합성 미디어 대응',
    body:
      '생성형 AI 를 업무에 붙이는 순간 새로운 유출 경로가 함께 열립니다. 어떤 모델에 어떤 데이터가 흘러가는지 먼저 목록화하고, 화면과 통화에 섞여 들어오는 합성 영상·음성은 실시간으로 걸러냅니다.',
    points: [
      '프롬프트 인젝션 · 시스템 프롬프트 유출 · PII 유입 시뮬레이션',
      '챗봇 · 코파일럿 · RAG · 외부 API 까지 사용 현황 인벤토리',
      '라이브 스트림 딥페이크 탐지 정확도 95% 이상, 합성 음성 포함',
    ],
  },
  {
    label: '보안 운영',
    prefix: '보안 / 운영',
    blurb: '24시간 자율 관제와 대응',
    body:
      '탐지까지는 도구가 하지만, 새벽 3시에 울린 경보를 판단하는 일은 늘 사람 몫이었습니다. LLM 에이전트가 이벤트를 분석해 심각도를 나누고, 사전 정의된 플레이북으로 차단·격리까지 실행한 뒤 중요한 건만 담당자에게 올립니다.',
    points: [
      '심각 위협 5분 이내 탐지·대응, 야간·주말·공휴일 포함 365일',
      'SOAR 플레이북 50+ 시나리오로 격리·차단·보고까지 자동 실행',
      '감사 대응용 증적과 일간·주간·월간 리포트 자동 생성',
    ],
  },
]

const infraCount = servicesData.filter(s => s.cat.startsWith('IDC')).length
const streamCount = servicesData.filter(s => s.cat.startsWith('스트리밍')).length

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-canvas">
      <div className="container-page py-24 md:py-32">
        <div className="reveal max-w-xl">
          <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
            <span className="inline-block h-px w-6 bg-accent-2" />
            Security Services
          </div>
          <h2 className="break-keep text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-fg">
            네 개의 축으로 지킵니다
          </h2>
          <p className="mt-5 break-keep text-lead text-fg-muted">
            들어오는 트래픽, 클라우드 설정, 생성형 AI, 그리고 경보가 울린 뒤의 24시간.
            각 축이 무엇을 막는지와 어떤 서비스가 붙는지를 함께 적었습니다.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PILLARS.map(pillar => {
            const items = servicesData.filter(s => s.cat.startsWith(pillar.prefix))
            if (items.length === 0) return null

            return (
              <div
                key={pillar.label}
                className="flex flex-col rounded-2xl border border-line bg-surface/60 px-8 py-9 backdrop-blur transition-colors duration-300 hover:border-accent/50"
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="break-keep text-[1.25rem] font-bold tracking-[-0.02em] text-fg">
                    {pillar.label}
                  </h3>
                  <span className="ml-auto shrink-0 font-mono text-label text-fg-subtle">
                    {items.length}종
                  </span>
                </div>
                <p className="mt-1.5 break-keep text-meta text-fg-subtle">{pillar.blurb}</p>

                <p className="mt-5 break-keep text-body leading-[1.85] text-fg-muted">
                  {pillar.body}
                </p>

                <ul className="mt-6 flex list-none flex-col gap-2.5">
                  {pillar.points.map(point => (
                    <li key={point} className="flex gap-3 break-keep text-meta text-fg-muted">
                      <span
                        aria-hidden
                        className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-accent/70"
                      />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* 링크 목록은 카드 바닥에 붙입니다. 축마다 서비스 수가 달라
                    설명 길이도 다른데, mt-auto 가 없으면 카드끼리 구분선 위치가
                    어긋나 보입니다. */}
                <ul className="mt-auto flex list-none flex-col pt-7">
                  {items.map(s => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="group flex items-center gap-2.5 border-t border-line py-3 text-body text-fg-muted transition-colors hover:text-accent"
                      >
                        <ServiceIcon slug={s.slug} className="size-4.5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                        <span className="min-w-0 break-keep">{s.name}</span>
                        <span
                          aria-hidden
                          className="ml-auto shrink-0 text-fg-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* 인프라·스트리밍은 보안 아래로 접습니다. 여전히 하는 일이지만
            메인의 초점은 보안입니다. */}
        <div className="reveal mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-elev px-8 py-7 sm:flex-row sm:items-center">
          <p className="break-keep text-body text-fg-muted">
            <span className="font-semibold text-fg">IDC 인프라 {infraCount}종</span> · 스트리밍{' '}
            {streamCount}종도 함께 운영합니다.
          </p>
          <Link
            href="/contact"
            className="shrink-0 font-mono text-meta tracking-[0.04em] text-accent transition-colors hover:text-accent-2 sm:ml-auto"
          >
            인프라 문의 →
          </Link>
        </div>
      </div>
    </section>
  )
}
