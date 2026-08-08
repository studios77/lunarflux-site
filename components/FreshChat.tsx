'use client'
import { useEffect } from 'react'
import { FRESHCHAT } from '@/lib/site'

const SCRIPT_ID = 'freshchat-widget'

/**
 * Freshchat 이 window 에 붙이는 전역. 타입 선언이 없어 최소한만 좁혀 씁니다.
 *
 * `requestIdleCallback` 은 여기 넣지 않습니다 — DOM 타입에 이미 필수로 선언돼
 * 있어서, 옵셔널로 다시 적으면 교집합이 필수가 되고 `if (ric)` 가 "항상 참"
 * 으로 좁혀집니다(TS2774). 런타임 지원은 브라우저마다 다르므로 존재 확인은
 * 아래에서 `typeof` 로 합니다.
 */
type FcWindow = Window & {
  fcWidget?: { init: (opts: Record<string, unknown>) => void; open?: () => void }
}

/**
 * Freshchat 웹 위젯.
 *
 * **유휴 시간까지 로딩을 미룹니다.** 상담 위젯은 방문자가 도착하자마자
 * 필요한 것이 아닌데, 마운트 즉시 외부 번들을 받으면 첫 화면 렌더와
 * 경쟁합니다. `requestIdleCallback` 뒤로 보내고, 지원하지 않는 브라우저에서는
 * 타이머로 대체합니다. 3초 timeout 을 둬서 계속 바쁜 페이지에서도 결국
 * 뜨도록 보장합니다.
 *
 * 토큰이 없으면 아무것도 하지 않습니다 — lib/site 의 FRESHCHAT 참고.
 */
export default function FreshChat() {
  useEffect(() => {
    const { token, host } = FRESHCHAT
    if (!token) return

    const w = window as FcWindow
    let cancelled = false

    const load = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) return

      const s = document.createElement('script')
      s.id = SCRIPT_ID
      s.src = `${host}/js/widget.js`
      s.async = true
      s.onload = () => {
        // 스크립트가 늦게 도착하는 사이에 페이지를 떠났을 수 있습니다.
        if (cancelled || !w.fcWidget) return
        w.fcWidget.init({ token, host, locale: 'ko' })
      }
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
