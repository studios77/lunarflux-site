import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { SITE_NAME } from '@/lib/site'

export const metadata = {
  title: `무료 상담 | ${SITE_NAME}`,
  description: 'LunarFlux AI 서비스 문의 및 무료 상담 안내',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas text-fg">
      <Nav />
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8 md:pt-30 lg:px-[5%]">
        <div className="mb-3 flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent-2">
          <span className="inline-block h-px w-6 bg-accent-2" />
          Contact
        </div>
        <h1 className="mb-4 break-keep text-[clamp(2rem,5vw,3rem)] font-bold">무료 상담 및 문의</h1>
        <p className="mb-12 break-keep text-[1.05rem] leading-[1.8] text-fg-muted">
          서비스 도입 견적이나 인프라 구축, 장애 대응과 관련된 궁금하신 점을 해결해 드립니다.
          <br />
          아래의 상담 채널 중 가장 편하신 방법으로 연락해 주세요.
        </p>

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl">
                💬
              </div>
              <div>
                <h3 className="mb-2 text-[1.25rem] font-bold">
                  실시간 채팅 상담
                  <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle font-mono text-[0.65rem] text-canvas">
                    추천
                  </span>
                </h3>
                <p className="mb-4 break-keep text-[0.95rem] leading-[1.6] text-fg-muted">
                  화면 우측 하단의 채팅 버튼을 클릭하시면 전문 엔지니어와 실시간으로 대화하실 수 있습니다.
                  <br />
                  가장 빠르고 정확한 기술 및 비용 안내를 받아보실 수 있습니다.
                </p>
                <p className="break-keep text-[0.85rem] text-fg-subtle">
                  * 운영 시간: 평일 10:00 - 19:00 (긴급 장애는 24시간)
                </p>
              </div>
            </div>
          </div>

          <ContactForm />

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-elev text-2xl">
                📞
              </div>
              <div>
                <h3 className="mb-2 text-[1.25rem] font-bold">긴급 기술 지원</h3>
                <p className="mb-3 break-keep text-[0.95rem] leading-[1.6] text-fg-muted">
                  LunarFlux 인프라 장애 발생 시나 긴급하게 대응이 필요한 사안은 즉각 연락 바랍니다.
                  <br />
                  (일반 비용 문의는 가급적 채팅/이메일 활용을 부탁드립니다.)
                </p>
                <a
                  href="tel:01032043847"
                  className="inline-block rounded-lg border border-line bg-elev px-4 py-2 text-[1.1rem] font-bold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  010-3204-3847
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
