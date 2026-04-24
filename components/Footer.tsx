'use client'

const links = [
  ['서비스', '#services'],
  ['요금', '#pricing'],
  ['소개', '#about'],
  ['문의', '#contact'],
]

const companyInfo = [
  { label: '회사명', value: '주식회사 스트리밍랩스' },
  { label: '대표', value: '박혜미' },
  { label: '사업자등록번호', value: '　' },
  { label: '주소', value: '서울시 강서구 마곡중앙6로 21, 508호' },
  { label: '전화', value: '0505-924-1004' },
  { label: '이메일', value: 'contact@lunarflux.ai' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f1117', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 5% 40px' }}>

        {/* 상단 3단 */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: 48, alignItems: 'start', flexWrap: 'wrap' }}>

          {/* 왼쪽: 로고 */}
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
              LunarFlux<span style={{ color: 'var(--accent)' }}>AI</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em', lineHeight: 1.6 }}>
              IDC · AI 보안 · 스트리밍<br />인프라 전문 기업
            </div>
          </div>

          {/* 가운데: 사업자 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {companyInfo.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: '#64748b', letterSpacing: '0.06em', minWidth: 110, flexShrink: 0 }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 400, lineHeight: 1.5 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* 오른쪽: 링크 */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', margin: 0, padding: 0, alignItems: 'flex-end' }}>
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = '#94a3b8')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 구분선 + 카피라이트 */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: '#475569', letterSpacing: '0.06em' }}>
            © 2025 LunarFlux. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
