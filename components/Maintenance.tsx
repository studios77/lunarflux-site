import { CONTACT, SITE_NAME } from '@/lib/site'

/**
 * 홈페이지 리뉴얼 안내.
 *
 * 리뉴얼 중에는 서비스 상세·문의 페이지가 모두 홈으로 모이므로(`_redirects`),
 * **이 한 장이 사이트의 유일한 화면입니다.** 문의 페이지로 보낼 수 없으니
 * 연락 수단이 이 화면에 있어야 하는데, 공개하는 것은 **이메일 하나뿐**입니다.
 * 전화번호·주소·사업자등록번호는 리뉴얼이 끝나고 Footer 가 돌아올 때까지
 * 내보내지 않습니다.
 *
 * 외부 의존이 없습니다. Nav·Footer·상담 위젯을 쓰지 않는 이유는 그것들이
 * 전부 지금 닿을 수 없는 경로를 가리키기 때문입니다.
 */
export default function Maintenance() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-20 text-fg"
    >
      {/* 홈 히어로와 같은 분위기를 유지합니다. 리뉴얼 중이라도 브랜드가
          그대로 읽히는 편이 낫습니다. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_900px_460px_at_50%_12%,rgba(52,211,153,0.12),transparent_62%),radial-gradient(ellipse_620px_340px_at_78%_72%,rgba(34,211,238,0.08),transparent_58%)]"
      />

      <div className="relative w-full max-w-xl text-center">
        <img
          src="/logo.png"
          alt={SITE_NAME}
          width={72}
          height={72}
          className="mx-auto mb-7 size-18"
        />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 font-mono text-label uppercase tracking-[0.12em] text-accent">
          <span className="inline-block size-1.5 animate-[pulseDot_1.5s_ease-in-out_infinite] rounded-full bg-accent" />
          Renewal in progress
        </div>

        <h1 className="mb-5 break-keep text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
          홈페이지 리뉴얼 중입니다
        </h1>

        <p className="mb-10 break-keep text-lead leading-[1.85] text-fg-muted">
          더 나은 모습으로 찾아뵙기 위해 사이트를 새로 단장하고 있습니다.
          <br />
          그동안 문의는 아래 이메일로 보내주시면 동일하게 도와드립니다.
        </p>

        {/* 리뉴얼 기간에 공개하는 연락 수단은 이메일 하나입니다.
            전화번호·주소·사업자등록번호는 일부러 싣지 않습니다. */}
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-block rounded-full bg-accent px-9 py-3.5 text-center text-body font-bold text-canvas shadow-[0_8px_28px_rgba(52,211,153,0.26)] transition-colors hover:bg-accent-2"
        >
          {CONTACT.email}
        </a>

        <p className="mt-12 font-mono text-meta tracking-[0.06em] text-fg-subtle">
          {SITE_NAME}
        </p>
      </div>
    </main>
  )
}
