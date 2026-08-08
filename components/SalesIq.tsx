'use client'
import { useEffect } from 'react'
import { SALESIQ } from '@/lib/site'

const SCRIPT_ID = 'zsiqscript'

/**
 * Zoho SalesIQ 가 window 에 붙이는 전역.
 *
 * `requestIdleCallback` 은 여기 넣지 않습니다 — DOM 타입에 이미 필수로 선언돼
 * 있어서, 옵셔널로 다시 적으면 교집합이 필수가 되고 `if (ric)` 가 "항상 참"
 * 으로 좁혀집니다(TS2774). 존재 확인은 아래에서 `typeof` 로 합니다.
 */
type ZohoWindow = Window & {
  $zoho?: {
    salesiq?: {
      ready?: () => void
      /** 위젯이 로드된 뒤에 붙습니다. contact 페이지 버튼이 씁니다. */
      floatwindow?: { visible: (state: 'show' | 'hide') => void }
    }
  }
}

/**
 * Zoho SalesIQ 라이브 채팅 위젯.
 *
 * Zoho 대시보드가 주는 스니펫과 같은 일을 합니다.
 *
 * ```html
 * <script>window.$zoho=window.$zoho||{};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}</script>
 * <script id="zsiqscript" src="https://salesiq.zohopublic.com/widget?wc=..." defer></script>
 * ```
 *
 * **위젯 코드는 전역이 아니라 스크립트 URL 의 `?wc=` 로 넘어갑니다.** 예전
 * 스니펫은 `$zoho.salesiq.widgetcode` 에 넣는 방식이었고 문서에도 그렇게
 * 남아 있는 곳이 많습니다. 지금 계정이 주는 형태는 위와 같으니 대시보드
 * 스니펫을 기준으로 맞추세요.
 *
 * 전역을 스크립트보다 먼저 세우는 순서는 그대로 지킵니다. 스크립트가
 * 로드되면서 `$zoho.salesiq` 를 읽고 거기에 API 를 붙입니다.
 *
 * **로딩은 유휴 시간까지 미룹니다.** 상담 위젯은 방문자가 도착하자마자
 * 필요한 것이 아닌데, 마운트 즉시 외부 번들을 받으면 첫 화면 렌더와
 * 경쟁합니다. `requestIdleCallback` 뒤로 보내고, 지원하지 않는 브라우저에서는
 * 타이머로 대체합니다. 3초 timeout 을 둬서 계속 바쁜 페이지에서도 결국
 * 뜨도록 보장합니다.
 *
 * 위젯 코드가 없으면 아무것도 하지 않습니다 — lib/site 의 SALESIQ 참고.
 */
export default function SalesIq() {
  useEffect(() => {
    const { widgetCode, scriptSrc } = SALESIQ
    if (!widgetCode) return

    const w = window as ZohoWindow
    let cancelled = false

    const load = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) return

      // 스크립트가 읽어 갈 전역을 먼저 세웁니다. 이미 있으면 덮지 않습니다.
      w.$zoho = w.$zoho || {}
      w.$zoho.salesiq = w.$zoho.salesiq || { ready: () => {} }

      const s = document.createElement('script')
      s.id = SCRIPT_ID
      s.src = `${scriptSrc}?wc=${encodeURIComponent(widgetCode)}`
      s.defer = true
      document.head.appendChild(s)
    }

    const hasIdleCallback = typeof window.requestIdleCallback === 'function'
    const handle = hasIdleCallback
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 2000)

    return () => {
      cancelled = true
      if (hasIdleCallback && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [])

  return null
}
