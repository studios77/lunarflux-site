'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav'
import { SITE_NAME, SITE_ORIGIN } from '@/lib/site'
import { SEO_DEFAULT_DESCRIPTION } from '@/lib/seo'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Flagship from '@/components/Flagship'
import ClosingCta from '@/components/ClosingCta'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'

export default function Home() {
  useEffect(() => {
    // 여기까지 실행됐다면 번들이 살아 있다는 뜻이므로 layout.tsx의
    // 폴백 타이머를 취소합니다. 취소하지 않으면 4초 뒤 `.js` 가 걷혀
    // 아직 화면 밖인 섹션들이 애니메이션 없이 한꺼번에 나타납니다.
    const w = window as Window & { __revealFallback?: ReturnType<typeof setTimeout> }
    clearTimeout(w.__revealFallback)

    const reveals = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach(r => obs.observe(r))
    return () => obs.disconnect()
  }, [])

  const site = SITE_ORIGIN
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        url: site,
        name: SITE_NAME,
        inLanguage: 'ko-KR',
        description: SEO_DEFAULT_DESCRIPTION,
        publisher: { '@id': `${site}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: SITE_NAME,
        url: site,
        description: SEO_DEFAULT_DESCRIPTION,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'KR',
        },
        sameAs: [site],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${SITE_NAME} 서비스`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '스트리밍 솔루션 / 영상 스트리밍 플랫폼',
                description: 'UltraStreamingEngine 기반 초저지연 LL-HLS 라이브 스트리밍, VOD·멀티 플랫폼 동시 송출.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'IDC / 클라우드 인프라',
                description: 'IDC 서버 임대·코로케이션·위탁운영, HA·DB 이중화, 장애 복구 및 이전.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI 보안 / 네트워크 보안',
                description: 'AI 보안 관제, 스트림 이상 탐지, 딥페이크 검출, 네트워크 보안·IDS/IPS, LLM 보안 감사, 제로트러스트 설계 등',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '백업/DR 솔루션',
                description: '데이터 백업, 재해복구(DR), 이중화 솔루션 서비스',
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid-bg" />
      <Nav />
      <main id="main-content">
        {/* 자체 제품 → 보안 4개 축 → 마무리. 예전의 EdgeSection·About 은
            내용이 겹치고 길어 Flagship·ClosingCta 로 흡수했습니다. */}
        <Hero />
        <Flagship />
        <Services />
        <ClosingCta />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
