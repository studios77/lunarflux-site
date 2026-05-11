'use client'

import { useState, useEffect } from 'react'

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
      // API 통신을 시뮬레이션 합니다. 실제 연결 시 여기에 fetch를 구현하세요.
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', service: 'IDC', message: '' })
      generateCaptcha()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📧</div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--display)' }}>이메일 문의 폼</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.6 }}>
            상세한 제안서 요청, 기술 검토서 전달 등 문의사항을 남겨주시면<br/>
            검토 후 24시간 이내에 회신해 드립니다.<br/>
            <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, fontSize: '0.9rem', color: 'var(--accent2)', fontWeight: 600 }}>contact@LunarFlux.ai</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 calc(50% - 8px)', minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--text2)' }}>이름 / 직급 *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', color: 'var(--text)', outline: 'none' }}
              placeholder="홍길동 과장"
            />
          </div>
          <div style={{ flex: '1 1 calc(50% - 8px)', minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--text2)' }}>회사명</label>
            <input 
              type="text" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', color: 'var(--text)', outline: 'none' }}
              placeholder="(주)루나플럭스"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--text2)' }}>문의 서비스 *</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['IDC', 'AI', '보안', '스트리밍', '기타'].map(service => (
              <button
                key={service}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, service }))}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: formData.service === service ? 'var(--accent)' : 'var(--border)',
                  background: formData.service === service ? 'rgba(52,211,153,0.1)' : 'var(--bg)',
                  color: formData.service === service ? 'var(--accent)' : 'var(--text2)',
                  fontSize: '0.9rem',
                  fontWeight: formData.service === service ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--text2)' }}>이메일 주소 *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', color: 'var(--text)', outline: 'none' }}
            placeholder="example@company.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--text2)' }}>문의 내용 *</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required
            rows={5}
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
            placeholder="도입하고자 하는 서비스나 궁금하신 점을 상세히 적어주세요."
          />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 8, border: '1px solid var(--border)' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 12, color: 'var(--text2)' }}>자동등록방지 (캡챠) *</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', background: 'var(--bg)', padding: '8px 16px', borderRadius: 8, letterSpacing: '2px', color: 'var(--text)' }}>
              {captcha.num1} + {captcha.num2} = ?
            </div>
            <input 
              type="number" 
              value={captchaAnswer} 
              onChange={(e) => setCaptchaAnswer(e.target.value)} 
              required
              style={{ width: 100, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', color: 'var(--text)', outline: 'none' }}
              placeholder="정답"
            />
          </div>
        </div>

        {submitStatus === 'success' && (
          <div style={{ color: '#34d399', fontSize: '0.95rem', padding: '12px', background: 'rgba(52,211,153,0.1)', borderRadius: 8 }}>
            성공적으로 문의가 접수되었습니다. 빠르게 회신드리겠습니다.
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{ color: '#ef4444', fontSize: '0.95rem', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
            문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            background: 'var(--text)', 
            color: 'var(--bg)', 
            border: 'none', 
            borderRadius: 8, 
            padding: '16px', 
            fontSize: '1rem', 
            fontWeight: 700, 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
            marginTop: 8,
            transition: 'opacity 0.2s'
          }}
        >
          {isSubmitting ? '접수 중...' : '문의 접수하기'}
        </button>
      </form>
    </div>
  )
}