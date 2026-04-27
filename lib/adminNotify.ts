/**
 * Web3Forms 이메일과 별도로, 관리자에게 즉시 알림(Slack / Discord 웹훅).
 * 배포 시 .env에 NEXT_PUBLIC_ADMIN_NOTIFY_WEBHOOK 을 설정하세요.
 * - Slack: Incoming Webhook URL (hooks.slack.com/...)
 * - Discord: 채널 웹훅 URL (discord.com/api/webhooks/...)
 * URL이 없으면 아무 것도 하지 않습니다(기존 동작 유지).
 */

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

export async function notifyAdminInstant(params: {
  title: string
  fields: Record<string, string>
}): Promise<void> {
  const url = WEBHOOK
  if (!url) return

  const fields = stripSensitive(params.fields)
  const lines = Object.entries(fields)
    .map(([k, v]) => `**${k}**\n${(v || '—').trim()}`)
    .join('\n\n')

  const slackText = `*${params.title}*\n\n${lines}`.slice(0, 35000)
  const discordDescription = `${params.title}\n\n${lines}`.slice(0, 4090)

  try {
    if (url.includes('hooks.slack.com')) {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: slackText }),
      })
      return
    }

    if (url.includes('discord.com/api/webhooks') || url.includes('discordapp.com/api/webhooks')) {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'LunarFlux 사이트',
          embeds: [
            {
              title: params.title,
              description: discordDescription,
              color: 0x0ea5e9,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      })
      return
    }

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: params.title, fields }),
    })
  } catch (e) {
    console.warn('[notifyAdminInstant]', e)
  }
}

export function formDataToRecord(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  fd.forEach((v, k) => {
    if (typeof v === 'string') out[k] = v
  })
  return out
}
