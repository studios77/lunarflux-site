import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { KAKAO_CHANNEL_URL, SITE_NAME } from '@/lib/site'
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

        {/* 채널톡 위젯을 걷어낸 2026-08-08 이후 상담 창구는 카카오톡 채널 ·
            문의 폼 · 전화 셋입니다. 예전 "실시간 채팅 상담(추천)" 카드는
            "화면 우측 하단의 채팅 버튼"을 가리키고 있어 함께 지웠고, 거기
            있던 운영 시간은 아래 전화 카드로 옮겼습니다.
            카카오 카드는 KAKAO_CHANNEL_URL 이 비어 있으면 통째로 빠집니다 —
            없는 채널로 보내는 링크를 내보내지 않기 위해서입니다. */}
        <div className="flex flex-col gap-6">
          {KAKAO_CHANNEL_URL && (
            <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-6 sm:p-8">
              <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
              <div className="flex items-start gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl">
                  💬
                </div>
                <div>
                  <h3 className="mb-2 text-[1.25rem] font-bold">
                    카카오톡 상담
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle font-mono text-label text-canvas">
                      추천
                    </span>
                  </h3>
                  <p className="mb-4 break-keep text-body text-fg-muted">
                    카카오톡으로 문의를 남겨 주시면 담당 엔지니어가 확인 후 답변드립니다.
                    <br />
                    답변이 카카오톡 알림으로 도착하므로 창을 닫으셔도 놓치지 않습니다.
                  </p>
                  <a
                    href={KAKAO_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-lg bg-[#FEE500] px-4 py-2 text-body font-bold text-[#3C1E1E] transition-transform duration-200 hover:scale-[1.02]"
                  >
                    카카오톡으로 문의하기
                  </a>
                </div>
              </div>
            </div>
          )}

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
