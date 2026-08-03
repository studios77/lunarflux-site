const WEBHOOK =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ADMIN_NOTIFY_WEBHOOK?.trim() ?? '' : ''

function stripSensitive(entries: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(entries)) {
    if (k.toLowerCase() === 'access_key' || k.toLowerCase() === 'password') continue
    out[k] = v
  }
  return out
}

export function isAdminNotifyConfigured(): boolean {
  return WEBHOOK.length > 10
}

/**
 * 관리자 채널로 즉시 전송합니다.
 * 전송에 실패하면 예외를 던집니다 — 호출부에서 사용자에게 실패를 알려야 하므로
 * 오류를 삼키지 않습니다.
 */
export async function notifyAdminInstant(params: {
  title: string
  fields: Record<string, string>
}): Promise<void> {
  const url = WEBHOOK
  if (!url) throw new Error('NEXT_PUBLIC_ADMIN_NOTIFY_WEBHOOK이 설정되지 않았습니다')

  const fields = stripSensitive(params.fields)
  const lines = Object.entries(fields)
    .map(([k, v]) => `**${k}**\n${(v || '—').trim()}`)
    .join('\n\n')

  const isSlack = url.includes('hooks.slack.com')
  const isDiscord =
    url.includes('discord.com/api/webhooks') || url.includes('discordapp.com/api/webhooks')

  let body: string
  if (isSlack) {
    body = JSON.stringify({ text: `*${params.title}*\n\n${lines}`.slice(0, 35000) })
  } else if (isDiscord) {
    body = JSON.stringify({
      username: 'LunarFlux AI 사이트',
      embeds: [
        {
          title: params.title,
          description: `${params.title}\n\n${lines}`.slice(0, 4090),
          color: 0x34d399,
          timestamp: new Date().toISOString(),
        },
      ],
    })
  } else {
    body = JSON.stringify({ title: params.title, fields })
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  if (!res.ok) {
    throw new Error(`관리자 알림 웹훅이 ${res.status} 응답을 반환했습니다`)
  }
}

export function formDataToRecord(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  fd.forEach((v, k) => {
    if (typeof v === 'string') out[k] = v
  })
  return out
}
