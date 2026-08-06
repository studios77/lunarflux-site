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
  /**
   * ZeptoMail(Zoho) Send Mail 토큰. Zoho 메일을 쓰는 경우 이쪽이 자연스럽습니다.
   * 값은 "Zoho-enczapikey ..." 에서 뒤쪽 키만 넣어도 되고 통째로 넣어도 됩니다.
   */
  ZEPTOMAIL_TOKEN?: string
  /** ZeptoMail 리전 엔드포인트. 기본 api.zeptomail.com (미국). EU 는 api.zeptomail.eu */
  ZEPTOMAIL_HOST?: string
  /** Resend API 키. ZeptoMail 대신 쓸 경우. https://resend.com */
  RESEND_API_KEY?: string
  /** 문의를 받을 주소. 예: contact@lunarflux.ai */
  CONTACT_TO_EMAIL?: string
  /** 발신 주소. 발송 서비스에서 인증한 도메인이어야 합니다. */
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

/** 메일 제목·본문은 두 발송 서비스가 공유합니다. */
function compose(values: Field[]) {
  const rows = values
    .map(
      v =>
        `<tr>` +
        `<td style="padding:8px 14px;background:#f4f6f9;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(v.label)}</td>` +
        `<td style="padding:8px 14px;white-space:pre-wrap">${escapeHtml(v.value || '—')}</td>` +
        `</tr>`,
    )
    .join('')

  return {
    subject: `[문의] ${values.find(v => v.label === '이름 / 직급')?.value ?? ''} — ${TITLE}`,
    html:
      `<div style="font-family:system-ui,-apple-system,'Malgun Gothic',sans-serif;font-size:14px;line-height:1.7">` +
      `<h2 style="margin:0 0 16px">${TITLE}</h2>` +
      `<table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>` +
      `</div>`,
    text: values.map(v => `${v.label}\n${v.value || '—'}`).join('\n\n'),
  }
}

/** "이름 <주소>" 또는 "주소" 를 ZeptoMail 이 요구하는 형태로 나눕니다. */
function splitAddress(raw: string): { address: string; name?: string } {
  const m = raw.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  return m ? { name: m[1] || undefined, address: m[2].trim() } : { address: raw.trim() }
}

/**
 * ZeptoMail (Zoho) 발송.
 *
 * Zoho 메일을 이미 쓰는 경우 도메인이 그쪽에 붙어 있어 인증이 간단합니다.
 * 토큰은 "Zoho-enczapikey xxx" 형태로 발급되는데, 통째로 붙여넣든 뒤쪽 키만
 * 넣든 동작하도록 접두사를 보정합니다.
 */
async function sendZeptoMail(env: Env, values: Field[], replyTo: string): Promise<boolean> {
  const raw = env.ZEPTOMAIL_TOKEN?.trim()
  const to = env.CONTACT_TO_EMAIL?.trim()
  if (!raw || !to) return false

  const token = raw.startsWith('Zoho-enczapikey') ? raw : `Zoho-enczapikey ${raw}`
  const host = env.ZEPTOMAIL_HOST?.trim() || 'api.zeptomail.com'
  const from = splitAddress(env.CONTACT_FROM_EMAIL?.trim() || 'LunarFlux AI <noreply@lunarflux.ai>')
  const mail = compose(values)

  const res = await fetch(`https://${host}/v1.1/email`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: { address: from.address, name: from.name },
      to: [{ email_address: { address: to } }],
      // 답장하면 문의자에게 바로 가도록. 관리자가 주소를 옮겨 적지 않아도 됩니다.
      ...(replyTo ? { reply_to: [{ address: replyTo }] } : {}),
      subject: mail.subject,
      htmlbody: mail.html,
      textbody: mail.text,
    }),
  })

  return res.ok
}

/** Resend 발송. ZeptoMail 대신 쓰고 싶을 때. */
async function sendResend(env: Env, values: Field[], replyTo: string): Promise<boolean> {
  const key = env.RESEND_API_KEY?.trim()
  const to = env.CONTACT_TO_EMAIL?.trim()
  if (!key || !to) return false

  const from = env.CONTACT_FROM_EMAIL?.trim() || 'LunarFlux AI <noreply@lunarflux.ai>'
  const mail = compose(values)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
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

  const to = Boolean(env.CONTACT_TO_EMAIL?.trim())
  const hasZepto = Boolean(env.ZEPTOMAIL_TOKEN?.trim() && to)
  const hasResend = Boolean(env.RESEND_API_KEY?.trim() && to)
  const hasWebhook = (env.ADMIN_NOTIFY_WEBHOOK?.trim()?.length ?? 0) >= 10
  if (!hasZepto && !hasResend && !hasWebhook) {
    return json({ ok: false, reason: 'unconfigured' }, 503)
  }

  const replyTo = values.find(v => v.label === '이메일')?.value ?? ''

  // 한 채널이 실패해도 다른 채널로 전달됐으면 접수 성공입니다.
  // 이메일 서비스는 둘 다 설정돼 있으면 둘 다 보냅니다(중복 발송이 유실보다 낫습니다).
  const results = await Promise.allSettled([
    hasZepto ? sendZeptoMail(env, values, replyTo) : Promise.resolve(false),
    hasResend ? sendResend(env, values, replyTo) : Promise.resolve(false),
    hasWebhook ? sendWebhook(env, values) : Promise.resolve(false),
  ])
  const delivered = results.some(r => r.status === 'fulfilled' && r.value === true)

  if (!delivered) {
    // 실패 사유에 키·URL 이 실릴 수 있으므로 그대로 전달하지 않습니다.
    return json({ ok: false, reason: 'delivery_failed' }, 502)
  }

  return json({ ok: true }, 200)
}
