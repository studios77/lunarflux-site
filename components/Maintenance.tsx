import { CONTACT, SITE_NAME } from '@/lib/site'

/**
 * 홈페이지 리뉴얼 안내.
 *
 * 리뉴얼 중에는 21개 페이지가 모두 이 화면이므로(`lib/site` 의 `MAINTENANCE`),
 * **이 한 장이 사이트의 유일한 얼굴입니다.** 문의 페이지로 보낼 수 없으니
 * 연락 수단이 여기 있어야 하는데, 공개하는 것은 **이메일 하나뿐**입니다.
 * 전화번호·주소·사업자등록번호는 리뉴얼이 끝나고 `Footer` 가 돌아올 때까지
 * 내보내지 않습니다.
 *
 * 외부 의존이 없습니다. Nav·Footer·상담 위젯을 쓰지 않는 이유는 그것들이
 * 전부 지금 닿을 수 없는 경로를 가리키기 때문입니다. 대신 상단 상태 바와
 * 그리드 배경을 홈 히어로에서 그대로 가져와, 공사 중 안내처럼 보이지 않고
 * 같은 사이트의 한 화면으로 읽히게 했습니다.
 *
 * 애니메이션은 전부 `animate-[...]` 로만 겁니다. `globals.css` 가
 * `prefers-reduced-motion` 에서 이 클래스들을 일괄로 끄는데, 기본 상태가
 * 이미 보이는 값이라 꺼져도 내용이 사라지지 않습니다.
 */

/** 상단 상태 바. 홈 히어로의 LIVE 티커와 같은 구조입니다. */
const STATUS = [
  { label: '사이트', value: '리뉴얼 작업 중' },
  // 사이트만 멈춘 것이지 사업이 멈춘 게 아니라는 점을 분명히 합니다.
  // 이 줄이 없으면 방문자가 서비스 중단으로 오해할 수 있습니다.
  { label: '서비스 운영', value: '정상' },
  { label: '문의 접수', value: '이메일' },
]

export default function Maintenance() {
  return (
    <>
      <div className="grid-bg" />

      {/* 상태 바 + 본문을 세로 flex 로 묶습니다. 본문 높이를 100vh 에서 바
          높이를 빼는 식으로 계산하면, 글꼴이 바뀌거나 바가 두 줄이 될 때
          어긋납니다. flex-1 이 남는 높이를 그대로 가져가게 둡니다. */}
      <div className="relative flex min-h-screen flex-col">
      {/* 상태 바. 좁은 화면에서 줄바꿈으로 뭉치지 않도록 가로 스크롤을 둡니다. */}
      <div className="relative z-10 shrink-0 border-b border-line bg-elev">
        <div className="container-page flex items-center gap-4 overflow-x-auto py-2.5">
          {/* 빨강(danger)이 아니라 호박색(warn)입니다. 장애가 아니라
              예정된 작업이라는 뜻을 색으로도 맞춥니다. */}
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-label font-bold text-warn">
            <span className="inline-block size-1.5 animate-[pulseDot_1.5s_ease-in-out_infinite] rounded-full bg-warn" />
            MAINTENANCE
          </span>
          {STATUS.map(s => (
            <span
              key={s.label}
              className="flex shrink-0 items-center gap-1.5 font-mono text-label text-fg-subtle"
            >
              <span className="text-line-strong">·</span>
              {s.label}
              <b className="font-semibold text-fg-muted">{s.value}</b>
            </span>
          ))}
        </div>
      </div>

      <main
        id="main-content"
        className="relative flex flex-1 items-center justify-center px-6 py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_820px_420px_at_50%_18%,rgba(52,211,153,0.13),transparent_64%),radial-gradient(ellipse_560px_320px_at_78%_82%,rgba(34,211,238,0.07),transparent_60%)]"
        />

        <div className="relative w-full max-w-lg text-center">
          {/* 로고만 두면 마크가 가늘어 작게 보입니다. Nav 처럼 워드마크와
              묶어 브랜드가 또렷하게 읽히도록 했습니다.
              원본 PNG 가 안쪽 여백을 품고 있어 실제 마크는 상자보다 작게
              보입니다. Nav 의 마크:글자 비율(약 2.5)에 맞춰 키웠습니다. */}
          <div className="mb-10 flex animate-[fadeUp_0.7s_ease_both] items-center justify-center gap-2">
            <img src="/logo.png" alt="" width={56} height={56} className="size-14 shrink-0" />
            <span className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-fg">
              LunarFlux<span className="text-accent">AI</span>
            </span>
          </div>

          <h1 className="mb-5 animate-[fadeUp_0.7s_0.1s_ease_both] break-keep text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.22] tracking-[-0.025em] text-fg">
            홈페이지를
            <br />
            새로 단장하고 있습니다
          </h1>

          <p className="mb-10 animate-[fadeUp_0.7s_0.2s_ease_both] break-keep text-lead leading-[1.85] text-fg-muted">
            더 나은 모습으로 곧 찾아뵙겠습니다.
            <br />
            그동안에도 서비스 운영과 기술 지원은 계속됩니다.
          </p>

          {/* 작업이 진행 중임을 글자 말고도 보이게 합니다. 완료율을 뜻하지
              않도록 숫자 없이 숨 쉬는 막대로만 둡니다 — 홈 히어로의 통계
              막대와 같은 재료입니다. */}
          <div
            aria-hidden
            className="mx-auto mb-10 h-0.5 w-40 animate-[fadeUp_0.7s_0.3s_ease_both] overflow-hidden rounded-full bg-line"
          >
            <span className="block h-full origin-left animate-[meter_2.4s_ease-in-out_infinite] bg-gradient-to-r from-accent to-accent-2" />
          </div>

          <div className="animate-[fadeUp_0.7s_0.4s_ease_both]">
            <div className="mb-3 font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
              문의
            </div>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-block rounded-full bg-accent px-9 py-3.5 text-body font-bold text-canvas shadow-[0_8px_28px_rgba(52,211,153,0.26)] transition-colors hover:bg-accent-2"
            >
              {CONTACT.email}
            </a>
          </div>

          {/* 연도는 Footer 와 같이 하드코딩합니다. `new Date()` 를 쓰면 같은
              커밋이 빌드 시점에 따라 다른 결과를 내는데, 이 저장소는 사이트맵
              에서 이미 그 문제를 겪고 고쳤습니다. */}
          <p className="mt-14 animate-[fadeUp_0.7s_0.5s_ease_both] font-mono text-label tracking-[0.08em] text-fg-subtle">
            © 2026 {SITE_NAME}
          </p>
        </div>
      </main>
      </div>
    </>
  )
}
