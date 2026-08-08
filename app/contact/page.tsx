import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { SITE_NAME } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

// canonical·openGraph 를 헬퍼가 함께 만듭니다. 예전에는 canonical 만 있어
// 공유 시 홈 카드가 떴습니다.
export const metadata: Metadata = pageMetadata({
  path: '/contact/',
  title: `무료 상담 | ${SITE_NAME}`,
  description: 'AI 보안 도입 상담, 인프라 구축 견적, 긴급 장애 대응 문의를 받습니다.',
  keywords: ['보안 상담', 'NGFW 도입 문의', 'AI 보안 견적', 'IDC 문의'],
})

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-canvas text-fg">
      <section className="container-page pb-24 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.15em] text-accent-2">
          <span className="inline-block h-px w-6 bg-accent-2" />
          Contact
        </div>
        <h1 className="mb-4 break-keep text-[clamp(2rem,5vw,3rem)] font-bold">무료 상담 및 문의</h1>
        <p className="mb-12 break-keep text-lead leading-[1.8] text-fg-muted">
          서비스 도입 견적이나 인프라 구축, 장애 대응과 관련된 궁금하신 점을 해결해 드립니다.
          <br />
          아래의 상담 채널 중 가장 편하신 방법으로 연락해 주세요.
        </p>

        {/* 채널톡 위젯을 걷어낸 2026-08-08 이후 상담 채널은 폼과 전화 둘입니다.
            예전에는 맨 위에 "실시간 채팅 상담(추천)" 카드가 있었는데, 그 카드가
            안내하던 "화면 우측 하단의 채팅 버튼"이 이제 없습니다. 카드를 빼면서
            거기 있던 운영 시간은 아래 전화 카드로 옮겼습니다. 채팅을 다시
            붙이면 이 문단과 layout.tsx 주석을 함께 되돌리세요. */}
        <div className="flex flex-col gap-6">
          <ContactForm />

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-elev text-2xl">
                📞
              </div>
              <div>
                <h3 className="mb-2 text-[1.25rem] font-bold">긴급 기술 지원</h3>
                <p className="mb-3 break-keep text-body text-fg-muted">
                  LunarFlux 인프라 장애 발생 시나 긴급하게 대응이 필요한 사안은 즉각 연락 바랍니다.
                  <br />
                  (일반 비용 문의는 가급적 위 문의 폼을 이용해 주세요.)
                </p>
                <a
                  href="tel:01032043847"
                  className="inline-block rounded-lg border border-line bg-elev px-4 py-2 text-[1.1rem] font-bold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  010-3204-3847
                </a>
                <p className="mt-3 break-keep text-body text-fg-subtle">
                  * 운영 시간: 평일 10:00 - 19:00 (긴급 장애는 24시간)
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
