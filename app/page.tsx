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
          // 서비스 목록 순서를 실제 주력에 맞춥니다 — 보안 4축 → 인프라 → 스트리밍.
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '네트워크 보안 / 차세대 방화벽',
                description:
                  '자체 개발 NGFW Lunarflux Guard(NGFW·WAF·로컬 AI 융합 어플라이언스), IDS/IPS 침입탐지, 제로트러스트 설계, 스트림 이상탐지.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '클라우드 보안',
                description:
                  '클라우드 보안 형상 진단(CSPM), 컨테이너·쿠버네티스 워크로드 보호(CWPP), 권한 정리 및 컴플라이언스 매핑.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI · 데이터 보안',
                description: '생성형 AI 유출·프롬프트 인젝션 점검(LLM 보안 감사), 실시간 딥페이크 탐지.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '보안 운영 / 24시간 관제',
                description: 'AI 자율 보안 관제(SOC), LLM 기반 관제 에이전트로 탐지→분석→대응 자동화.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'IDC 인프라',
                description:
                  'IDC 서버 임대·코로케이션, GPU 전용 호스팅(AIDC), 위탁운영, HA·DB 이중화, 장애 복구 및 이전.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '라이브 스트리밍',
                description:
                  'UltraStreamingEngine 기반 LL-HLS 초저지연 라이브 스트리밍, VOD·멀티 플랫폼 동시 송출.',
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
