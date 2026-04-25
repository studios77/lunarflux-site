'use client'
import { useState, useRef } from 'react'

const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')

    const formData = new FormData(formRef.current)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', '[LunarFlux] 새 서비스 문의가 접수되었습니다')
    formData.append('from_name', 'LunarFlux 문의')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        formRef.current.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '11px 14px', color: 'var(--text)',
    fontFamily: 'var(--sans)', fontSize: '0.88rem', fontWeight: 300,
    outline: 'none', width: '100%', transition: 'border-color 0.2s',
  }

  const contactItems = [
    { icon: '📧', title: 'Email', val: 'contact@lunarflux.al' },
    { icon: '💬', title: 'Kakao / Telegram', val: '@lunarflux_support' },
    { icon: '🕐', title: '응답 시간', val: '평일 24시간 이내 / 긴급 장애 즉시' },
    { icon: '📍', title: '서비스 지역', val: '글로벌 전지역 (원격 운영 가능)' },
  ]

  return (
    <section id="contact" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>
        <div className="reveal">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            Contact
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>서비스 문의</h2>
          <p style={{ fontSize: '0.95rem', color: '#111827', maxWidth: 520, lineHeight: 1.8 }}>기술이사가 직접 검토 후 24시간 내 회신드립니다.</p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, marginTop: 60, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {contactItems.map(c => (
              <div key={c.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}>
                <div style={{ fontSize: '1rem', width: 36, height: 36, background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#111827', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 500 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '36px 32px' }}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { label: '이름 / 담당자', name: 'name', type: 'text', placeholder: '홍길동' },
                  { label: '회사명', name: 'company', type: 'text', placeholder: '(주)루나테크' },
                  { label: '이메일', name: 'email', type: 'email', placeholder: 'contact@company.com' },
                  { label: '연락처', name: 'phone', type: 'tel', placeholder: '010-0000-0000' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#111827', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} name={f.name} placeholder={f.placeholder} required={f.name === 'name' || f.name === 'email'} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                ))}

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#111827', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>관심 서비스</label>
                  <select name="service" style={{ ...inputStyle, appearance: 'none' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  >
                    <option value="">서비스를 선택해주세요</option>
                    <option>서버 임대 / 코로케이션</option>
                    <option>위탁운영 (MSP)</option>
                    <option>서버 이중화 (HA)</option>
                    <option>DB 이중화 매니지먼트</option>
                    <option>DR 재해복구</option>
                    <option>Ultrastream 스트리밍 호스팅</option>
                    <option>AI 보안 관제</option>
                    <option>딥페이크 탐지</option>
                    <option>엔터프라이즈 (전체 통합)</option>
                    <option>기타 / 복합 문의</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: '#111827', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>문의 내용</label>
                  <textarea name="message" placeholder="현재 인프라 환경이나 필요하신 서비스를 자유롭게 작성해 주세요." rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              {status === 'error' && (
                <p style={{ marginTop: 12, fontSize: '0.82rem', color: '#ef4444', fontFamily: 'var(--mono)' }}>
                  전송 실패 — 잠시 후 다시 시도해주세요.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} style={{
                width: '100%', marginTop: 16, padding: 14,
                background: status === 'success' ? '#28c840' : status === 'error' ? '#ef4444' : 'var(--accent)',
                color: '#000',
                border: 'none', borderRadius: 4,
                fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.08em',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}>
                {status === 'sending' && '전송 중…'}
                {status === 'success' && '전송 완료 — 곧 연락드리겠습니다 ✓'}
                {status === 'error' && '전송 실패 — 다시 시도해주세요'}
                {status === 'idle' && '문의 전송 — 24시간 내 회신'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
