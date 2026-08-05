/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * 문의 폼을 관리자 채널(Slack·Discord·범용 웹훅)로 중계합니다.
 * 웹훅 URL은 Cloudflare 대시보드의 환경변수(ADMIN_NOTIFY_WEBHOOK)로만 주입되며,
 * 브라우저 번들에 포함되지 않습니다. 서버에서 호출하므로 CORS 제약도 없습니다.
 *
 * 설정: Cloudflare Pages → lunarflux → Settings → Environment variables
 *       ADMIN_NOTIFY_WEBHOOK = https://hooks.slack.com/... (Secret 권장)
 */

interface Env {
  ADMIN_NOTIFY_WEBHOOK?: string
}

interface EventContext {
  request: Request
  env: Env
}

/** 폼에서 받는 필드와 관리자 알림에 표시할 라벨 */
const FIELDS: { key: string; label: string; required: boolean; max: number }[] = [
  { key: 'name', label: '이름 / 직급', required: true, max: 100 },
  { key: 'company', label: '회사명', required: false, max: 200 },
  { key: 'service', label: '문의 서비스', required: false, max: 50 },
  { key: 'email', label: '이메일', required: true, max: 254 },
  { key: 'message', label: '문의 내용', required: true, max: 5000 },
]

const MAX_BODY_BYTES = 16_000

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const webhook = context.env.ADMIN_NOTIFY_WEBHOOK?.trim() ?? ''
  if (webhook.length < 10) {
    // 관리자가 아직 웹훅을 설정하지 않은 상태. 접수된 것처럼 응답하지 않는다.
    return json({ ok: false, reason: 'unconfigured' }, 503)
  }

  const raw = await context.request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, reason: 'too_large' }, 413)
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(raw)
  } catch {
    return json({ ok: false, reason: 'invalid_json' }, 400)
  }

  const values: { label: string; value: string }[] = []
  for (const f of FIELDS) {
    const v = typeof payload[f.key] === 'string' ? (payload[f.key] as string).trim() : ''
    if (f.required && !v) {
      return json({ ok: false, reason: 'missing_field', field: f.key }, 400)
    }
    values.push({ label: f.label, value: v.slice(0, f.max) })
  }

  const lines = values.map(v => `**${v.label}**\n${v.value || '—'}`).join('\n\n')
  const title = '웹사이트 문의 접수'

  let body: string
  if (webhook.includes('hooks.slack.com')) {
    body = JSON.stringify({ text: `*${title}*\n\n${lines}`.slice(0, 35000) })
  } else if (
    webhook.includes('discord.com/api/webhooks') ||
    webhook.includes('discordapp.com/api/webhooks')
  ) {
    body = JSON.stringify({
      username: 'LunarFlux AI 사이트',
      embeds: [
        {
          title,
          description: lines.slice(0, 4090),
          color: 0x34d399,
          timestamp: new Date().toISOString(),
        },
      ],
    })
  } else {
    body = JSON.stringify({
      title,
      fields: Object.fromEntries(values.map(v => [v.label, v.value])),
    })
  }

  let upstream: Response
  try {
    upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
  } catch {
    return json({ ok: false, reason: 'upstream_unreachable' }, 502)
  }

  if (!upstream.ok) {
    // 웹훅 URL이 응답 본문에 실릴 수 있으므로 그대로 전달하지 않는다.
    return json({ ok: false, reason: 'upstream_error', status: upstream.status }, 502)
  }

  return json({ ok: true }, 200)
}
