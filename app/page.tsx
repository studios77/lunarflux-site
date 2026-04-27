'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import EdgeSection from '@/components/EdgeSection'
import ScrollTop from '@/components/ScrollTop'

export default function Home() {
  useEffect(() => {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LunarFlux AI',
    url: 'https://lunarflux.ai',
    logo: 'https://lunarflux.ai/logo.png',
    description: 'IDC 서버 임대·위탁운영, AI 보안 관제와 스트림 이상 탐지·딥페이크 검출, Ultrastream 기반 라이브 스트리밍 등을 제공하는 기술 인프라 파트너',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
    },
    sameAs: [
      'https://lunarflux.ai',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'LunarFlux 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '스트리밍 솔루션 / 영상 스트리밍 플랫폼',
            description: 'Ultrastream 엔진 기반 초저지연 LL-HLS 라이브 스트리밍, VOD·멀티 플랫폼 동시 송출.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IDC / 클라우드 인프라',
            description: 'IDC 서버 임대·코로케이션·위탁운영, HA·DB 이중화, 장애 복구 및 이전(요청 시).',
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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid-bg" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <EdgeSection />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <ScrollTop />
    </>
  )
}
