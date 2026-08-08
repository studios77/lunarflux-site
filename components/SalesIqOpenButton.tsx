'use client'
import { useState } from 'react'

type ZohoWindow = Window & {
  $zoho?: { salesiq?: { floatwindow?: { visible: (state: 'show' | 'hide') => void } } }
}

/** 위젯이 도착할 때까지 기다렸다가 엽니다. 못 열면 false. */
async function openWhenReady(timeoutMs = 6000): Promise<boolean> {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const float = (window as ZohoWindow).$zoho?.salesiq?.floatwindow
    if (float?.visible) {
      try {
        float.visible('show')
        return true
      } catch {
        // API 이름이 바뀌었거나 위젯이 아직 초기화 중일 수 있습니다.
        // 조용히 실패시키지 않고 아래 이메일 안내로 넘깁니다.
        return false
      }
    }
    await new Promise(r => setTimeout(r, 120))
  }
  return false
}

/**
 * contact 페이지에서 채팅창을 직접 여는 버튼.
 *
 * 예전에는 "화면 우측 하단의 채팅 버튼을 클릭하시면" 이라고 위치를 설명하고
 * 있었습니다. 위치를 읽게 하는 대신 그 자리에서 열어 줍니다.
 *
 * 위젯 로딩을 유휴 시간까지 미루므로, 방문자가 이 버튼을 먼저 누르면 전역이
 * 아직 없을 수 있습니다. 그래서 바로 실패시키지 않고 도착할 때까지 잠깐
 * 기다립니다. 끝내 못 열면 — 광고 차단, 네트워크 문제, Zoho 쪽 API 변경 —
 * 이메일로 안내합니다. 눌러도 아무 일이 없는 버튼은 두지 않습니다.
 */
export default function SalesIqOpenButton() {
  const [state, setState] = useState<'idle' | 'opening' | 'failed'>('idle')

  const onClick = async () => {
    setState('opening')
    const ok = await openWhenReady()
    setState(ok ? 'idle' : 'failed')
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={state === 'opening'}
        className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 text-body font-bold text-canvas transition-colors hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'opening' ? '채팅 여는 중...' : '채팅 상담 시작하기'}
      </button>

      {state === 'failed' && (
        <p className="mt-3 break-keep text-body text-warn">
          채팅창을 열지 못했습니다. 광고 차단 확장 프로그램이 켜져 있을 수 있습니다.{' '}
          <a href="mailto:contact@LunarFlux.ai" className="font-semibold underline">
            contact@LunarFlux.ai
          </a>
          로 보내주셔도 동일하게 처리해 드립니다.
        </p>
      )}
    </>
  )
}
