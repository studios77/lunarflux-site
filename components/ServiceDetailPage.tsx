import Link from 'next/link'
import Nav from '@/components/Nav'
import type { ServiceData } from '@/lib/servicesData'
import { getRelatedServices } from '@/lib/servicesData'
import { SITE_NAME, serviceCanonicalUrl } from '@/lib/site'

export default function ServiceDetailPage({ s }: { s: ServiceData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.seoH1 || s.name,
    description: s.desc,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: 'https://lunarflux.ai'
    },
    url: serviceCanonicalUrl(s.slug),
    category: s.cat,
    serviceType: s.name,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <Nav />

      <section style={{ padding: '120px 5% 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
          {s.cat}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.4rem', width: 72, height: 72, border: '1px solid var(--border2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', flexShrink: 0 }}>
            {s.icon}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.85rem,4.8vw,3rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 12, wordBreak: 'keep-all', maxWidth: '100%' }}>
              {s.name}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 640 }}>{s.desc}</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
            핵심 기능
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {s.highlights.map((h, i) => (
              <div key={i} style={{ background: 'var(--bg2)', padding: '36px 28px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 12 }}>0{i + 1}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 10 }}>{h.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.75 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%' }}>
        <div className="specs-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
              사양 / 스펙
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {s.specs.map((spec, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text2)', padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0, marginTop: 3 }}>—</span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
              활용 사례
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {s.useCases.map((uc, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text2)', padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent2)', fontFamily: 'var(--mono)', fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {s.comparison && s.comparison.items.length > 0 && (
        <section style={{ background: 'var(--bg2)', padding: '80px 5%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
              {s.comparison.label}
            </div>
            <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border)', marginTop: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>기능</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--border)', fontWeight: 700, background: 'rgba(52,211,153,0.06)', minWidth: 160 }}>{s.slug === 'aidc' ? 'AIDC GPU 전용 호스팅' : (s.slug === 'ultrastream' ? 'UltraStreamingEngine' : s.name)}</th>
                    {s.comparison.items[0]?.others && (
                      <>
                        <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>A사</th>
                        <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>B사</th>
                        <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>C사</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {s.comparison.items.map((item, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                      <td style={{ padding: '13px 20px', fontSize: '0.8rem', color: 'var(--text2)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', letterSpacing: '0.03em' }}>{item.label}</td>
                      <td style={{ padding: '13px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, borderBottom: '1px solid var(--border)', background: 'rgba(52,211,153,0.04)' }}>{item.ours}</td>
                      {item.others && (
                        <>
                          <td style={{ padding: '13px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{item.others[0]}</td>
                          <td style={{ padding: '13px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{item.others[1]}</td>
                          <td style={{ padding: '13px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{item.others[2]}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text3)', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>* 비교 정보는 각 엔진의 공개 문서 기준이며, 버전·플랜에 따라 차이가 있을 수 있습니다. 최신 정보는 각 벤더 공식 문서를 확인하세요.</p>
          </div>
        </section>
      )}

      {s.coloPricing && s.coloPricing.length > 0 && (
        <section style={{ background: 'var(--bg3)', padding: '80px 5%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
              코로케이션 요금표
            </div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>상품별 월정액 요금</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text2)', marginBottom: 40, lineHeight: 1.7 }}>모든 상품에 전력·냉각·네트워크 회선·IPMI 원격관리가 포함됩니다. 부가세(10%) 별도 적용.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
              {s.coloPricing.map((plan, i) => (
                <div key={i} style={{
                  position: 'relative',
                  background: plan.popular ? 'linear-gradient(160deg, #064e3b 0%, #022c22 100%)' : 'var(--surface)',
                  border: plan.popular ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 12, padding: '28px 22px 24px',
                  boxShadow: plan.popular ? '0 0 32px rgba(16,185,129,0.18)' : '0 1px 6px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, padding: '3px 14px', borderRadius: 20, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>POPULAR</div>
                  )}
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: plan.popular ? 'var(--accent)' : 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{plan.size}</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 700, color: plan.popular ? '#fff' : 'var(--text)', marginBottom: 16 }}>{plan.name}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--display)', color: plan.popular ? 'var(--accent)' : 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>{plan.price}</div>
                  <div style={{ fontSize: '0.7rem', color: plan.popular ? 'rgba(255,255,255,0.5)' : 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: 20 }}>{plan.note}</div>
                  <div style={{ borderTop: `1px solid ${plan.popular ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[{ label: '네트워크', value: plan.network }, { label: '냉각·보안', value: '포함' }, { label: 'IPMI 원격관리', value: '포함' }].map((item, j) => (
                      <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: plan.popular ? 'rgba(255,255,255,0.75)' : 'var(--text2)' }}>
                        <span>{item.label}</span>
                        <span style={{ fontWeight: 600, color: plan.popular ? '#fff' : 'var(--text)' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 24, fontSize: '0.78rem', color: 'var(--text3)', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>* 추가 IP, 전용 회선 업그레이드, 교차 연결(Cross Connect) 등은 별도 협의 | 장기 계약(6·12개월) 시 최대 20% 할인</p>
          </div>
        </section>
      )}

      <section style={{ background: 'var(--bg2)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>지금 바로 시작하세요</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: 36 }}>전문 엔지니어가 검토 후 24시간 내 회신드리며, 긴급 장애는 즉시 대응합니다.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '14px 36px', background: 'var(--accent)', color: '#000', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 30px rgba(52,211,153,0.3)' }}>
              {s.cta}
            </Link>
            <Link href="/#services" style={{ padding: '14px 36px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textDecoration: 'none' }}>
              다른 서비스 보기
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28 }}>관련 서비스</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {getRelatedServices(s.slug, 4).map(sv => (
              <Link key={sv.slug} href={`/services/${sv.slug}/`} title={sv.name} style={{ display: 'block', padding: '18px 16px', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)' }}>
                <div style={{ fontSize: '1.05rem', marginBottom: 8 }}>{sv.icon}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{sv.cat}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6, lineHeight: 1.25, wordBreak: 'keep-all' }}>{sv.name}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text2)', lineHeight: 1.55, wordBreak: 'keep-all' }}>{sv.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){ .specs-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </main>
    </>
  )
}
