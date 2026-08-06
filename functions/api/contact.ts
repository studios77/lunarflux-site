/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * 문의 폼을 관리자에게 전달합니다. 전달 경로는 두 가지이고 둘 다 선택입니다.
 *
 *   이메일  RESEND_API_KEY + CONTACT_TO_EMAIL 이 있으면 메일로 발송
 *   웹훅    ADMIN_NOTIFY_WEBHOOK 이 있으면 Slack·Discord·범용 JSON 으로 전달
 *
 * 둘 다 설정하면 양쪽으로 보냅니다. 하나라도 성공하면 접수 성공입니다.
 * 아무것도 설정되지 않으면 503 을 돌려주고, 폼은 "이메일로 보내주세요" 를
 * 안내합니다 — 전달되지 않은 문의를 접수된 것처럼 보이게 하지 않기 위함입니다.
 *
 * 값은 전부 Cloudflare 대시보드의 환경변수(Secret)로만 주입되며 브라우저
 * 번들에 포함되지 않습니다. 서버에서 호출하므로 CORS 제약도 없습니다.
 *
 * 설정: Cloudflare Pages → lunarflux → Settings → Environment variables
 */

interface Env {
  /** Resend API 키. https://resend.com — 도메인 인증 후 발급 */
  RESEND_API_KEY?: string
  /** 문의를 받을 주소. 예: contact@lunarflux.ai */
  CONTACT_TO_EMAIL?: string
  /** 발신 주소. Resend 에서 인증한 도메인이어야 합니다. */
  CONTACT_FROM_EMAIL?: string
  /** Slack·Discord·범용 웹훅 URL */
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
const TITLE = '웹사이트 문의 접수'

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

/** 메일 본문에 값을 넣기 전 HTML 특수문자를 무력화합니다. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

type Field = { label: string; value: string }

async function sendEmail(env: Env, values: Field[], replyTo: string): Promise<boolean> {
  const key = env.RESEND_API_KEY?.trim()
  const to = env.CONTACT_TO_EMAIL?.trim()
  if (!key || !to) return false

  // 발신 주소는 Resend 에서 인증한 도메인이어야 합니다. 미지정 시 관례적인 값.
  const from = env.CONTACT_FROM_EMAIL?.trim() || 'LunarFlux AI <noreply@lunarflux.ai>'

  const rows = values
    .map(
      v =>
        `<tr>` +
        `<td style="padding:8px 14px;background:#f4f6f9;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(v.label)}</td>` +
        `<td style="padding:8px 14px;white-space:pre-wrap">${escapeHtml(v.value || '—')}</td>` +
        `</tr>`,
    )
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      // 답장하면 문의자에게 바로 가도록. 관리자가 주소를 옮겨 적지 않아도 됩니다.
      reply_to: replyTo,
      subject: `[문의] ${values.find(v => v.label === '이름 / 직급')?.value ?? ''} — ${TITLE}`,
      html:
        `<div style="font-family:system-ui,-apple-system,'Malgun Gothic',sans-serif;font-size:14px;line-height:1.7">` +
        `<h2 style="margin:0 0 16px">${TITLE}</h2>` +
        `<table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>` +
        `</div>`,
      text: values.map(v => `${v.label}\n${v.value || '—'}`).join('\n\n'),
    }),
  })

  return res.ok
}

async function sendWebhook(env: Env, values: Field[]): Promise<boolean> {
  const webhook = env.ADMIN_NOTIFY_WEBHOOK?.trim() ?? ''
  if (webhook.length < 10) return false

  const lines = values.map(v => `**${v.label}**\n${v.value || '—'}`).join('\n\n')

  let body: string
  if (webhook.includes('hooks.slack.com')) {
    body = JSON.stringify({ text: `*${TITLE}*\n\n${lines}`.slice(0, 35000) })
  } else if (
    webhook.includes('discord.com/api/webhooks') ||
    webhook.includes('discordapp.com/api/webhooks')
  ) {
    body = JSON.stringify({
      username: 'LunarFlux AI 사이트',
      embeds: [
        {
          title: TITLE,
          description: lines.slice(0, 4090),
          color: 0x34d399,
          timestamp: new Date().toISOString(),
        },
      ],
    })
  } else {
    body = JSON.stringify({
      title: TITLE,
      fields: Object.fromEntries(values.map(v => [v.label, v.value])),
    })
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  return res.ok
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { env } = context

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

  // 입력 검증을 전달 설정보다 먼저 합니다. 설정 여부와 무관하게 잘못된 요청은
  // 잘못됐다고 답하는 편이 맞고, 미설정 상태에서도 검증을 확인할 수 있습니다.
  const values: Field[] = []
  for (const f of FIELDS) {
    const v = typeof payload[f.key] === 'string' ? (payload[f.key] as string).trim() : ''
    if (f.required && !v) {
      return json({ ok: false, reason: 'missing_field', field: f.key }, 400)
    }
    values.push({ label: f.label, value: v.slice(0, f.max) })
  }

  const hasEmail = Boolean(env.RESEND_API_KEY?.trim() && env.CONTACT_TO_EMAIL?.trim())
  const hasWebhook = (env.ADMIN_NOTIFY_WEBHOOK?.trim()?.length ?? 0) >= 10
  if (!hasEmail && !hasWebhook) {
    return json({ ok: false, reason: 'unconfigured' }, 503)
  }

  const replyTo = values.find(v => v.label === '이메일')?.value ?? ''

  // 한 채널이 실패해도 다른 채널로 전달됐으면 접수 성공입니다.
  const results = await Promise.allSettled([
    hasEmail ? sendEmail(env, values, replyTo) : Promise.resolve(false),
    hasWebhook ? sendWebhook(env, values) : Promise.resolve(false),
  ])
  const delivered = results.some(r => r.status === 'fulfilled' && r.value === true)

  if (!delivered) {
    // 실패 사유에 키·URL 이 실릴 수 있으므로 그대로 전달하지 않습니다.
    return json({ ok: false, reason: 'delivery_failed' }, 502)
  }

  return json({ ok: true }, 200)
}
