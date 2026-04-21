export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '48px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
          Lunar<span style={{ color: 'var(--accent)' }}>Flux</span>
        </div>
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none' }}>
          {[['서비스','#services'],['요금','#pricing'],['소개','#about'],['문의','#contact']].map(([label, href]) => (
            <li key={label}>
              <a href={href} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--accent)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text3)'}
              >{label}</a>
            </li>
          ))}
        </ul>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.05em' }}>
          © 2025 LunarFlux. All rights reserved. · lunarflux.al
        </div>
      </div>
    </footer>
  )
}
