'use client'

import { useState, useEffect } from 'react'

const SERVICES = ['IDC', 'AI', '보안', '스트리밍', '기타']

/** 입력 요소 공통 스타일. outline을 지우는 대신 focus 링을 남겨 키보드 접근성을 유지합니다. */
const FIELD =
  'w-full rounded-lg border border-line bg-canvas px-4 py-3 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/60'

const LABEL = 'mb-2 block text-body text-fg-muted'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'IDC',
    message: '',
  })

  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 })
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'unconfigured'>('idle')

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1
    })
    setCaptchaAnswer('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check CAPTCHA
    if (parseInt(captchaAnswer) !== captcha.num1 + captcha.num2) {
      alert('자동가입방지(캡챠) 정답이 올바르지 않습니다.')
      generateCaptcha()
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Cloudflare Pages Function이 웹훅으로 중계한다.
      // 웹훅 URL은 서버 환경변수에만 있으므로 브라우저에 노출되지 않는다.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', service: 'IDC', message: '' })
        generateCaptcha()
        return
      }

      // 503 = 관리자가 웹훅을 아직 설정하지 않음. 접수된 것처럼 보이면 안 되므로
      // 성공으로 처리하지 않고 대체 연락 수단을 안내한다.
      setSubmitStatus(res.status === 503 ? 'unconfigured' : 'error')
    } catch (error) {
      console.warn('[ContactForm] 문의 전송 실패', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-elev text-2xl">
          📧
        </div>
        <div>
          <h3 className="mb-2 text-[1.25rem] font-bold text-fg">이메일 문의 폼</h3>
          <p className="break-keep text-body text-fg-muted">
            상세한 제안서 요청, 기술 검토서 전달 등 문의사항을 남겨주시면 검토 후 24시간 이내에 회신해 드립니다.
            <br />
            <a
              href="mailto:contact@LunarFlux.ai"
              className="mt-2 inline-block rounded-md border border-line bg-elev px-2 py-1 text-body font-semibold text-accent-2 transition-colors hover:border-accent-2"
            >
              contact@LunarFlux.ai
            </a>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className={LABEL}>이름 / 직급 *</label>
            <input
              id="cf-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={FIELD}
              placeholder="홍길동 과장"
            />
          </div>
          <div>
            <label htmlFor="cf-company" className={LABEL}>회사명</label>
            <input
              id="cf-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={FIELD}
              placeholder="(주)루나플럭스"
            />
          </div>
        </div>

        <div>
          <span className={LABEL}>문의 서비스 *</span>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map(service => (
              <button
                key={service}
                type="button"
                aria-pressed={formData.service === service}
                onClick={() => setFormData(prev => ({ ...prev, service }))}
                className={`min-h-11 rounded-full border px-4 py-2 text-body transition-all duration-200 ${
                  formData.service === service
                    ? 'border-accent bg-accent/10 font-semibold text-accent'
                    : 'border-line bg-canvas text-fg-muted hover:border-line-strong hover:text-fg'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="cf-email" className={LABEL}>이메일 주소 *</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={FIELD}
            placeholder="example@company.com"
          />
        </div>

        <div>
          <label htmlFor="cf-message" className={LABEL}>문의 내용 *</label>
          <textarea
            id="cf-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${FIELD} resize-y`}
            placeholder="도입하고자 하는 서비스나 궁금하신 점을 상세히 적어주세요."
          />
        </div>

        <div className="rounded-lg border border-line bg-elev p-4">
          <label htmlFor="cf-captcha" className="mb-3 block text-body text-fg-muted">
            자동등록방지 (캡챠) *
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg bg-canvas px-4 py-2 text-[1.2rem] font-bold tracking-[2px] text-fg">
              {captcha.num1} + {captcha.num2} = ?
            </div>
            <input
              id="cf-captcha"
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              required
              className={`${FIELD} w-25`}
              placeholder="정답"
            />
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="rounded-lg bg-accent/10 p-3 text-body text-accent">
            성공적으로 문의가 접수되었습니다. 빠르게 회신드리겠습니다.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg bg-danger/10 p-3 text-body text-danger">
            문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주시고, 계속 실패하면{' '}
            <a href="mailto:contact@LunarFlux.ai" className="font-semibold underline">
              contact@LunarFlux.ai
            </a>
            로 직접 보내주세요.
          </div>
        )}

        {submitStatus === 'unconfigured' && (
          <div className="rounded-lg bg-warn/10 p-3 text-body text-warn">
            현재 온라인 접수가 준비 중입니다. 번거로우시겠지만{' '}
            <a href="mailto:contact@LunarFlux.ai" className="font-semibold underline">
              contact@LunarFlux.ai
            </a>
            로 보내주시면 동일하게 처리해 드립니다.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-lg bg-accent p-4 text-base font-bold text-canvas transition-all duration-200 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? '접수 중...' : '문의 접수하기'}
        </button>
      </form>
    </div>
  )
}
