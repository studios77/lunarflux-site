'use client'
import { useState, useRef } from 'react'

const WEB3FORMS_KEY = '92e76d57-87e2-4f09-8084-bc2552db772d'

const plans = [
  {
    tier: 'Starter', name: '스트림 Basic', price: '49,000', unit: '/hour', featured: false,
    desc: '라이브 스트리밍을 시작하는 소규모 팀에 적합한 플랜입니다.',
    features: ['Ultrastream 엔진 1채널','LL-HLS 스트리밍 (최대 1080p)','동시 시청자 100명','VOD 저장 50GB','기본 모니터링 대시보드','이메일 기술지원'],
  },
  {
    tier: 'Professional', name: 'Stream Pro + AI', price: '가격문의', unit: '', featured: true,
    desc: '스트리밍 + AI 보안이 결합된 가장 인기 있는 통합 플랜입니다.',
    features: ['Ultrastream 엔진 5채널','ABR 4단계 (1080p ~ 360p)','동시 시청자 1,000명','VOD 500GB + CDN','AI 이상탐지 + IP 자동차단','멀티플랫폼 동시 송출','24시간 Slack 기술지원'],
  },
  {
    tier: 'IDC Standard', name: '서버 위탁운영', price: '30만~', unit: '/월', featured: false,
    desc: '서버 운영을 전문가에게 맡기고 비즈니스에만 집중하세요.',
    features: ['OS 패치·보안업데이트 전담','장애대응 (4시간 이내)','Zabbix 실시간 모니터링','월간 SLA 리포트','백업 자동화 포함','전화·원격 기술지원'],
  },
  {
    tier: 'HA / DR', name: '이중화 + DR', price: '80만~', unit: '/월', featured: false,
    desc: '서버·DB 이중화와 재해복구까지 완전한 고가용성 구성.',
    features: ['Active-Active HA 구성','자동 페일오버 30초 이내','DB 이중화 (Galera Cluster)','DR 원격지 백업 연동','RTO 4h / RPO 1h 보장','분기별 복구훈련 포함'],
  },
]

interface ModalState {
  open: boolean
  planName: string
  planTier: string
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: 6, padding: '10px 14px', color: 'var(--text)',
  fontFamily: 'var(--sans)', fontSize: '0.88rem',
  outline: 'none', width: '100%', transition: 'border-color 0.2s',
}

export default function Pricing() {
  const [modal, setModal] = useState<ModalState>({ open: false, planName: '', planTier: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const openModal = (planName: string, planTier: string) => {
    setModal({ open: true, planName, planTier })
    setStatus('idle')
    setTimeout(() => formRef.current?.reset(), 50)
  }

  const closeModal = () => {
    if (status === 'sending') return
    setModal(m => ({ ...m, open: false }))
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')

    const fd = new FormData(formRef.current)
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('subject', `[LunarFlux 요금제 접수] ${modal.planTier} — ${modal.planName}`)
    fd.append('from_name', 'LunarFlux 요금제 신청')
    fd.append('plan', `${modal.planTier} / ${modal.planName}`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        formRef.current.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section id="pricing" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 5%' }}>
          <div className="reveal">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
              Pricing
            </div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>투명한 요금제</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.8 }}>필요한 서비스만 선택하세요. 모든 플랜에 기본 모니터링과 기술 지원이 포함됩니다.</p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 60 }}>
            {plans.map(p => (
              <div key={p.name} style={{
                border: p.featured ? '1px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 8, padding: '36px 28px',
                background: p.featured ? 'linear-gradient(160deg, rgba(56,189,248,0.1), var(--surface))' : 'var(--surface)',
                position: 'relative', transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: p.featured ? '0 0 40px rgba(56,189,248,0.15)' : 'none',
                display: 'flex', flexDirection: 'column',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                {p.featured && (
                  <div style={{ position: 'absolute', top: -1, right: 24, background: 'var(--accent)', color: '#000', fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '0 0 4px 4px' }}>POPULAR</div>
                )}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{p.tier}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{p.name}</div>
                <div style={{ margin: '20px 0' }}>
                  {p.price === '가격문의' ? (
                    <span style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>가격문의</span>
                  ) : (
                    <span style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 700, color: 'var(--text)' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text2)', fontFamily: 'var(--mono)', verticalAlign: 'super' }}>₩</span>
                      {p.price}
                      <span style={{ fontSize: '0.8rem', color: 'var(--text3)', fontFamily: 'var(--mono)', fontWeight: 400 }}>{p.unit}</span>
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 24, lineHeight: 1.7 }}>{p.desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: 32, flex: 1 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: '0.83rem', color: 'var(--text2)', padding: '7px 0', borderBottom: '1px solid rgba(56,189,248,0.08)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(p.name, p.tier)}
                  style={{
                    display: 'block', width: '100%', padding: 12, borderRadius: 4, textAlign: 'center',
                    fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.06em', transition: 'all 0.25s',
                    background: p.featured ? 'var(--accent)' : 'transparent',
                    border: p.featured ? '1px solid var(--accent)' : '1px solid var(--border2)',
                    color: p.featured ? '#fff' : 'var(--text)', fontWeight: p.featured ? 500 : 400,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!p.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!p.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)'
                    }
                  }}
                >
                  {p.tier === 'IDC Standard' || p.tier === 'HA / DR' ? '상담 신청' : '시작하기'}
                </button>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="reveal" style={{ marginTop: 16, border: '1px solid var(--border)', borderRadius: 8, padding: '36px 28px', background: 'linear-gradient(135deg, rgba(253,230,138,0.07), var(--surface))' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Enterprise</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Full AI Security Suite</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent2)', margin: '16px 0' }}>맞춤 견적</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7, maxWidth: 600 }}>무제한 채널 + 전용서버 + AI 보안 관제 + 딥페이크 탐지 + HA/DR 이중화 + 백업 자동화.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 24px', marginBottom: 24 }}>
              {['무제한 채널 + 전용서버','AI 보안 관제 24/7','딥페이크 탐지 모듈','HA/DR 완전 이중화','LLM 보안 감사','전담 전문기술엔지니어 지원'].map(f => (
                <div key={f} style={{ fontSize: '0.83rem', color: 'var(--text2)', padding: '7px 0', borderBottom: '1px solid rgba(56,189,248,0.08)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 }}>—</span>{f}
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal('Full AI Security Suite', 'Enterprise')}
              style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', border: 'none', cursor: 'pointer' }}
            >
              엔터프라이즈 상담
            </button>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {modal.open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: 16, width: '100%', maxWidth: 480,
            boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}>
            {/* Modal Header */}
            <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {modal.planTier}
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
                  {modal.planName} 신청
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: '1.2rem', padding: 4, lineHeight: 1 }}
              >✕</button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px 28px' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                    접수가 완료됐습니다!
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
                    담당자가 확인 후 <strong>24시간 이내</strong> 연락드립니다.<br />
                    긴급 문의: <a href="tel:01032043847" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>010-3204-3847</a>
                  </p>
                  <button
                    onClick={closeModal}
                    style={{ padding: '10px 28px', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 6, fontFamily: 'var(--mono)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    닫기
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <input type="hidden" name="plan" value={`${modal.planTier} / ${modal.planName}`} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.63rem', color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        이름 / 담당자 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input name="name" type="text" placeholder="홍길동" required style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.63rem', color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        연락처 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input name="phone" type="tel" placeholder="010-0000-0000" required style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.63rem', color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        이메일 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input name="email" type="email" placeholder="contact@company.com" required style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.63rem', color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        회사명
                      </label>
                      <input name="company" type="text" placeholder="(주)회사명 (선택)" style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.63rem', color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        추가 문의사항
                      </label>
                      <textarea name="message" placeholder="궁금한 점이나 요구사항을 자유롭게 작성해 주세요." rows={3}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>
                  </div>

                  {/* 선택 플랜 표시 */}
                  <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(14,165,233,0.06)', border: '1px solid var(--border2)', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>✓</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text2)' }}>
                      선택 플랜: <strong style={{ color: 'var(--text)' }}>{modal.planTier} — {modal.planName}</strong>
                    </span>
                  </div>

                  {status === 'error' && (
                    <p style={{ marginTop: 10, fontSize: '0.8rem', color: '#ef4444', fontFamily: 'var(--mono)' }}>
                      전송 실패 — 잠시 후 다시 시도하거나 전화로 문의해 주세요.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      width: '100%', marginTop: 18, padding: '13px 0',
                      background: status === 'error' ? '#ef4444' : 'var(--accent)',
                      color: '#000', border: 'none', borderRadius: 6,
                      fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600,
                      letterSpacing: '0.06em', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1, transition: 'all 0.2s',
                    }}
                  >
                    {status === 'sending' ? '접수 중…' : status === 'error' ? '전송 실패 — 다시 시도' : '신청 접수하기'}
                  </button>

                  <p style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text3)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
                    담당자 확인 후 24시간 이내 회신 · 긴급: 010-3204-3847
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
