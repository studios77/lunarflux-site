'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const BOT_NAME = 'LunarFlux AI 어시스턴트'

const QUICK_REPLIES = [
  'IDC 서버 임대 문의',
  '스트리밍 솔루션 가격',
  'AI 보안 서비스 소개',
  '백업/DR 솔루션',
  '무료 상담 신청',
]

function getBotResponse(input: string): string {
  const q = input.toLowerCase()

  if (q.includes('idc') || q.includes('서버 임대') || q.includes('서버임대') || q.includes('위탁')) {
    return 'LunarFlux IDC 서버 임대·위탁운영 서비스는 국내 주요 IDC에 위치한 고사양 서버를 합리적인 비용으로 제공합니다.\n\n✔ 전용 서버 / 코로케이션\n✔ 24/7 모니터링 및 운영 대행\n✔ 유연한 계약 기간 (월 단위)\n\n자세한 견적은 하단 [문의하기]를 통해 문의해 주세요.'
  }

  if (q.includes('스트리밍') || q.includes('ultrastream') || q.includes('라이브') || q.includes('vod')) {
    return 'LunarFlux Ultrastream 엔진 기반 스트리밍 솔루션을 제공합니다.\n\n✔ 초저지연 라이브 스트리밍\n✔ VOD 멀티스트림 동시 배포\n✔ 4K·8K 고화질 지원\n✔ CDN 연동 및 글로벌 배포\n\n플랫폼 데모 및 가격 문의는 [문의하기] 섹션을 이용해 주세요.'
  }

  if (q.includes('ai 보안') || q.includes('보안') || q.includes('딥페이크') || q.includes('네트워크 보안')) {
    return 'AI 기반 보안 솔루션을 제공합니다.\n\n✔ AI 보안 관제 (이상 트래픽 실시간 탐지)\n✔ 딥페이크 탐지 엔진\n✔ 네트워크 보안 / IDS·IPS\n✔ 제로트러스트 아키텍처 적용 지원\n\n현재 무료 PoC(개념검증) 프로그램을 운영 중입니다. 문의 주세요!'
  }

  if (q.includes('백업') || q.includes('dr') || q.includes('재해') || q.includes('이중화') || q.includes('복구')) {
    return '데이터 보호 및 재해복구(DR) 솔루션을 제공합니다.\n\n✔ 자동 증분 백업 (일·주·월)\n✔ 지리적 이중화 (Active-Active / Active-Standby)\n✔ RTO 1시간 이내 복구 보장\n✔ 클라우드·온프레미스 하이브리드 지원\n\n지금 바로 [무료 상담]을 신청해 보세요.'
  }

  if (q.includes('가격') || q.includes('요금') || q.includes('비용') || q.includes('견적') || q.includes('플랜')) {
    return '요금은 사용하시는 서비스 규모와 구성에 따라 달라집니다.\n\n📦 **Starter** — 소규모 팀 / PoC 용도\n📦 **Business** — 중소기업 / 운영 환경\n📦 **Enterprise** — 대규모 인프라 / SLA 보장\n\n정확한 견적은 요구사항을 말씀해 주시면 24시간 내 회신드립니다. [문의하기] 섹션을 이용해 주세요!'
  }

  if (q.includes('상담') || q.includes('문의') || q.includes('연락') || q.includes('신청')) {
    return '무료 상담을 원하신다면 페이지 하단의 [문의하기] 섹션을 이용해 주세요.\n\n📧 이메일: contact@lunarflux.ai\n⏰ 응답 시간: 영업일 기준 24시간 이내\n\n또는 원하시는 서비스에 대해 여기서 질문해 주시면 안내해 드리겠습니다!'
  }

  if (q.includes('안녕') || q.includes('hello') || q.includes('hi') || q.includes('반가')) {
    return '안녕하세요! LunarFlux AI 어시스턴트입니다. 😊\n\nIDC 서버, 스트리밍, AI 보안, 백업/DR 등 다양한 서비스를 제공하고 있습니다. 궁금하신 점을 편하게 물어보세요!'
  }

  if (q.includes('소개') || q.includes('회사') || q.includes('lunarflux') || q.includes('루나플럭스')) {
    return 'LunarFlux AI는 차세대 기술 인프라 전문 기업입니다.\n\n🌙 주요 사업 분야\n✔ IDC 서버 임대·위탁운영\n✔ 스트리밍 솔루션 / 영상 플랫폼\n✔ AI 보안 / 딥페이크 탐지\n✔ 네트워크 보안\n✔ 백업 / 재해복구(DR)\n\n기업 고객의 디지털 인프라를 안전하고 효율적으로 운영할 수 있도록 지원합니다.'
  }

  return '죄송합니다, 정확한 답변을 드리기 어렵습니다. 😅\n\n아래 항목 중 궁금하신 내용을 선택하시거나, [문의하기] 섹션을 통해 직접 문의해 주시면 전문 담당자가 빠르게 안내해 드리겠습니다.\n\n• IDC 서버 임대\n• 스트리밍 솔루션\n• AI 보안 서비스\n• 백업/DR 솔루션\n• 요금 및 상담'
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! LunarFlux AI 어시스턴트입니다.\n무엇을 도와드릴까요? 아래 버튼을 클릭하거나 직접 질문을 입력해 주세요.' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botText = getBotResponse(text.trim())
      setMessages(prev => [...prev, { role: 'bot', text: botText }])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
    }, 600 + Math.random() * 400)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="채팅 상담"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #0284c7)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(14,165,233,0.5)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(14,165,233,0.7)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(14,165,233,0.5)'
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 18, height: 18, borderRadius: '50%',
            background: '#ef4444', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--bg)',
          }}>{unread}</span>
        )}
      </button>

      {/* Chat window */}
      <div style={{
        position: 'fixed', bottom: 96, right: 28, zIndex: 9998,
        width: 360, maxHeight: 560,
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: 16,
        boxShadow: '0 8px 48px rgba(14,165,233,0.18)',
        overflow: 'hidden',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
        transformOrigin: 'bottom right',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, var(--accent), #0284c7)',
          display: 'flex', alignItems: 'center', gap: 10,
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l2 2" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'var(--display)' }}>
              {BOT_NAME}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              온라인 · 즉시 응답
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
          background: 'var(--bg)',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end', gap: 6,
            }}>
              {msg.role === 'bot' && (
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--accent), #0284c7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" />
                  </svg>
                </div>
              )}
              <div style={{
                maxWidth: '78%',
                padding: '9px 13px',
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, var(--accent), #0284c7)'
                  : 'var(--surface)',
                color: msg.role === 'user' ? '#fff' : 'var(--text)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                fontFamily: 'var(--sans)',
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--accent), #0284c7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" />
                </svg>
              </div>
              <div style={{
                padding: '10px 14px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '14px 14px 14px 4px',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'inline-block',
                    animation: `dotBounce 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies — show after last bot message and not typing */}
          {!typing && messages[messages.length - 1]?.role === 'bot' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  padding: '5px 11px', fontSize: '0.72rem',
                  background: 'transparent', border: '1px solid var(--border2)',
                  borderRadius: 20, color: 'var(--accent)',
                  cursor: 'pointer', fontFamily: 'var(--sans)',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'
                  }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 12px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', gap: 8,
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1, border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 12px',
              fontSize: '0.82rem', fontFamily: 'var(--sans)',
              background: 'var(--bg)', color: 'var(--text)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: input.trim() && !typing ? 'var(--accent)' : 'var(--border)',
              border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
