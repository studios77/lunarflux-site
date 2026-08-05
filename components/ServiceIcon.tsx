/**
 * 서비스 아이콘.
 *
 * 예전에는 servicesData 의 이모지(🧱 ☁️ 📦 …)를 그대로 찍었습니다. 이모지는
 * OS·브라우저마다 모양과 색이 제각각이고 보안 제품 페이지에서 장난스러워
 * 보여, 선(stroke) 기반 단색 아이콘으로 교체했습니다. currentColor 를 쓰므로
 * 주변 텍스트 색을 그대로 따라갑니다.
 *
 * 슬러그를 못 찾으면 기본 방패를 그립니다 — 서비스가 늘어도 화면이 깨지지 않게.
 */
type Props = { slug: string; className?: string }

const PATHS: Record<string, React.ReactNode> = {
  // ── IDC
  'server-rental': (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  aidc: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </>
  ),
  'managed-service': (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  ha: (
    <>
      <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M18 2v4h-4M6 22v-4h4" />
    </>
  ),
  'db-cluster': (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  'system-recovery-migration': (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5 5L21 12l-9 9-3-3 9-9z" />
      <path d="M6 18l-3-3" />
    </>
  ),

  // ── 보안 / 네트워크
  'lunarflux-guard': (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  'network-security': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </>
  ),
  'zero-trust': (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" />
    </>
  ),
  'ai-stream-security': (
    <>
      <path d="M2 12h4l3 8 6-16 3 8h4" />
    </>
  ),

  // ── 보안 / 클라우드
  'cloud-posture': (
    <>
      <path d="M17.5 18H7a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.5 1.6A3.7 3.7 0 0 1 17.5 18z" />
      <path d="M10 13.5l1.7 1.7 3.3-3.4" />
    </>
  ),
  'cloud-workload': (
    <>
      <path d="M12 2.8l8 4.2v9.9l-8 4.3-8-4.3V7z" />
      <path d="M4 7l8 4.3L20 7M12 11.3V21" />
    </>
  ),

  // ── 보안 / AI·데이터
  'llm-security-audit': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <circle cx="11.5" cy="14" r="2.5" />
      <path d="M13.4 15.9L16 18.5" />
    </>
  ),
  'deepfake-detection': (
    <>
      <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),

  // ── 보안 / 운영
  'ai-security': (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z" />
      <path d="M12 9v4M12 16h.01" />
    </>
  ),
  'ai-agent': (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2.5" />
      <path d="M12 4v4M9 14h.01M15 14h.01M2 13h2M20 13h2" />
    </>
  ),

  // ── 스트리밍
  ultrastream: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17" />
    </>
  ),
  'vod-multistream': (
    <>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M22 8l-6 4 6 4z" />
    </>
  ),
}

const FALLBACK = <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z" />

export default function ServiceIcon({ slug, className = 'size-6' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      {PATHS[slug] ?? FALLBACK}
    </svg>
  )
}
