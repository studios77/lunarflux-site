import { KAKAO_CHANNEL_URL } from '@/lib/site'

/**
 * 카카오톡 상담 버튼.
 *
 * 채널톡 위젯을 걷어낸 자리입니다. 위젯이 아니라 링크 하나라서 서버
 * 컴포넌트로 둡니다 — 'use client' 도, 외부 스크립트도 없습니다. 예전
 * 채널톡은 모든 페이지에서 마운트 즉시 외부 번들을 받아 첫 화면 렌더와
 * 경쟁했는데, 여기서는 그 비용이 0 입니다.
 *
 * 위치는 우측 하단입니다. ScrollTop 이 좌측 하단(`left-5`)이라 겹치지
 * 않습니다 — 둘 중 하나를 옮길 때 서로 확인하세요.
 */
export default function KakaoChat() {
  // 채널을 아직 만들지 않았으면 아무것도 내보내지 않습니다. lib/site 참고.
  if (!KAKAO_CHANNEL_URL) return null

  return (
    <a
      href={KAKAO_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡으로 상담하기 (새 창)"
      className="group fixed bottom-6 right-5 z-[9998] flex min-h-13 items-center gap-2.5 rounded-full bg-[#FEE500] pl-4 pr-5 shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] sm:right-7"
    >
      {/* 카카오 노란색 위에서는 어두운 갈색이 카카오 UI 의 관례이고
          대비도 충분합니다. 사이트 팔레트(에메랄드)를 쓰면 노랑 위에서
          읽기 어려워집니다. */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="#3C1E1E"
        aria-hidden
        className="shrink-0"
      >
        <path d="M12 3C6.99 3 3 6.2 3 10.14c0 2.52 1.67 4.73 4.19 5.99-.18.65-.67 2.4-.77 2.77-.12.46.17.45.36.33.15-.1 2.35-1.6 3.3-2.25.63.09 1.27.14 1.92.14 5.01 0 9-3.2 9-7.14S17.01 3 12 3Z" />
      </svg>
      <span className="whitespace-nowrap text-body font-bold text-[#3C1E1E]">
        카카오톡 상담
      </span>
    </a>
  )
}
