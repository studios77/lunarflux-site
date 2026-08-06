import Link from 'next/link'
import ServiceIcon from '@/components/ServiceIcon'
import ConsolePreview from '@/components/ConsolePreview'

/**
 * 자체 제품 하나를 앞세우는 블록.
 *
 * 강점을 세 카드로 나열하던 예전 구성은 무엇이 주력인지 알려주지 못했습니다.
 * 보안 회사의 첫인상은 "무엇을 만들었는가" 이므로 Guard 하나로 좁힙니다.
 * 수치는 전부 제품 사양서 근거입니다.
 */
const POINTS = [
  { title: '에이전트리스', desc: '보호 대상 서버에 무설치. L2 투명 인라인이라 IP 변경도 없습니다.' },
  { title: 'JA4+ 4지문', desc: 'UA만 보는 WAF가 구조적으로 놓치는 위조 트래픽을 계층 모순으로 잡습니다.' },
  { title: '외부 전송 0', desc: '위협 브리핑을 온프레미스 sLLM이 만듭니다. 로그가 밖으로 나가지 않습니다.' },
]

export default function Flagship() {
  return (
    <section className="relative z-10 bg-elev">
      <div className="container-page py-24 md:py-32">
        <div className="reveal grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/5 px-3.5 py-1 font-mono text-label uppercase tracking-[0.12em] text-accent">
              자체 개발 제품
            </div>
            <h2 className="mb-3 flex items-center gap-3.5 break-keep text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-fg">
              <ServiceIcon slug="lunarflux-guard" className="size-9 shrink-0 text-accent" />
              Lunarflux Guard
            </h2>
            <p className="mb-9 max-w-lg break-keep text-lead text-fg-muted">
              차세대 방화벽과 웹 방화벽, 로컬 AI를 한 대에 융합한 온프레미스 어플라이언스.
            </p>

            <div className="flex flex-col gap-6">
              {POINTS.map(p => (
                <div key={p.title} className="flex gap-4 border-l-2 border-accent/40 pl-5">
                  <div>
                    <div className="mb-1 text-body font-bold text-fg">{p.title}</div>
                    <div className="break-keep text-body text-fg-muted">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/services/lunarflux-guard/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-body font-semibold text-canvas transition-colors hover:bg-accent-2"
            >
              제품 자세히 보기
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* 수치 카드는 히어로 관제 보드가 이미 같은 값을 보여주므로 여기서는 뺍니다.
              콘솔 미리보기는 메뉴 구조를 보여주는 것이라 인시던트 보드와 겹치지 않습니다. */}
          <div className="self-start">
            <ConsolePreview />
          </div>
        </div>
      </div>
    </section>
  )
}
