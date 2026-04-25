import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { servicesData, getServiceBySlug } from '@/lib/servicesData'

export function generateStaticParams() {
  return servicesData.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.name} — LunarFlux AI`,
    description: service.summary,
    alternates: { canonical: `https://lunarflux.ai/services/${service.slug}` },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getServiceBySlug(params.slug)
  if (!s) notFound()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(2,4,12,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 5%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Lunar<span style={{ color: 'var(--accent)' }}>Flux</span>
        </Link>
        <Link href="/#services" style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text2)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          ← 서비스 목록
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: 120, paddingBottom: 80, padding: '120px 5% 80px',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent2)', display: 'inline-block' }} />
          {s.cat}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.4rem', width: 72, height: 72, border: '1px solid var(--border2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', flexShrink: 0 }}>
            {s.icon}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {s.name}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.8, maxWidth: 640 }}>
              {s.desc}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {s.tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', padding: '5px 12px', border: '1px solid var(--accent)', borderRadius: 2, color: 'var(--accent)', letterSpacing: '0.05em' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Highlights */}
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

      {/* Specs + Use Cases */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* Specs */}
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

          {/* Use Cases */}
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

      {/* CTA */}
      <section style={{ background: 'var(--bg2)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
            지금 바로 시작하세요
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: 36 }}>
            전문 엔지니어가 직접 검토 후 24시간 내 회신드립니다.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#contact" style={{
              padding: '14px 36px', background: 'var(--accent)', color: '#000',
              borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem',
              fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none',
              boxShadow: '0 0 30px rgba(56,189,248,0.3)',
            }}>
              {s.cta}
            </Link>
            <Link href="/#services" style={{
              padding: '14px 36px', background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border2)', borderRadius: 4,
              fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em',
              textDecoration: 'none',
            }}>
              다른 서비스 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28 }}>
            관련 서비스
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {servicesData.filter(sv => sv.slug !== s.slug).slice(0, 4).map(sv => (
              <Link key={sv.slug} href={`/services/${sv.slug}/`} style={{
                display: 'block', padding: '20px 20px', textDecoration: 'none',
                border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={undefined}
              >
                <div style={{ fontSize: '1.1rem', marginBottom: 10 }}>{sv.icon}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{sv.cat}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{sv.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.6 }}>{sv.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
