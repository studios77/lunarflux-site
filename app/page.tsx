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
    description: 'IDC 서버 임대·위탁운영, 스트리밍 솔루션, 영상 스트리밍 플랫폼, AI 보안, 네트워크 보안, 백업/DR 솔루션을 제공하는 차세대 기술 인프라 플랫폼',
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
            description: 'Ultrastream 엔진 기반 라이브 스트리밍 및 영상 스트리밍 플랫폼 서비스',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IDC / 클라우드 인프라',
            description: 'IDC 서버 임대·위탁운영 및 클라우드 인프라 서비스',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI 보안 / 네트워크 보안',
            description: 'AI 기반 보안 관제, 딥페이크 탐지, 네트워크 보안 서비스',
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
