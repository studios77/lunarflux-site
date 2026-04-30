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
          username: 'LunarFlux AI 사이트',
          embeds: [
            {
              title: params.title,
              description: discordDescription,
              color: 0x10b981,
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
