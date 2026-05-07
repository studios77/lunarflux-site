import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_NAME } from '@/lib/site'

export const metadata = {
  title: `무료 상담 | ${SITE_NAME}`,
  description: 'LunarFlux AI 서비스 문의 및 무료 상담 안내',
}

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <Nav />
      <section style={{ padding: '120px 5% 80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
          Contact
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, marginBottom: 16 }}>무료 상담 및 문의</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text2)', marginBottom: 50, lineHeight: 1.8 }}>
          서비스 도입 견적이나 인프라 구축, 장애 대응과 관련된 궁금하신 점을 해결해 드립니다.<br/>
          아래의 상담 채널 중 가장 편하신 방법으로 연락해 주세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--accent)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>💬</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--display)' }}>실시간 채팅 상담 <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', background: 'var(--accent)', color: '#000', padding: '2px 8px', borderRadius: 10, verticalAlign: 'middle', marginLeft: 8 }}>추천</span></h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16 }}>
                  화면 우측 하단의 채팅 버튼을 클릭하시면 전문 엔지니어와 실시간으로 대화하실 수 있습니다.<br/>
                  가장 빠르고 정확한 기술 및 비용 안내를 받아보실 수 있습니다.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>* 운영 시간: 평일 10:00 - 19:00 (긴급 장애는 24시간)</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📧</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--display)' }}>이메일 문의</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                  상세한 제안서 요청, 기술 검토서 전달 등 자료가 필요한 문의는 이메일로 보내주시기 바랍니다.<br/>
                  검토 후 24시간 이내에 회신해 드립니다.
                </p>
                <a href="mailto:contact@lunarflux.ai" style={{ display: 'inline-block', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 700, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>contact@lunarflux.ai</a>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📞</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--display)' }}>긴급 기술 지원</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                  LunarFlux 인프라 장애 발생 시나 긴급하게 대응이 필요한 사안은 즉각 연락 바랍니다.<br/>
                  (일반 비용 문의는 가급적 채팅/이메일 활용을 부탁드립니다.)
                </p>
                <a href="tel:01032043847" style={{ display: 'inline-block', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 700, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>010-3204-3847</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
