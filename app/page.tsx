'use client'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

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

  return (
    <>
      <NextSeo
        title="LunarFlux AI — IDC 서버 임대·AI 보안·스트리밍 통합 플랫폼"
        description="스트리밍 솔루션·영상 스트리밍 플랫폼·IDC·클라우드 인프라·AI 보안·네트워크 보안·백업/DR 솔루션. 하나의 플랫폼으로 완성하는 차세대 기술 인프라."
        canonical="https://lunarflux.al"
        openGraph={{
          url: 'https://lunarflux.al',
          title: 'LunarFlux AI — IDC 서버 임대·AI 보안·스트리밍 통합 플랫폼',
          description: '스트리밍 솔루션·영상 스트리밍 플랫폼·IDC·클라우드 인프라·AI 보안·네트워크 보안·백업/DR 솔루션.',
          siteName: 'LunarFlux',
          locale: 'ko_KR',
        }}
        additionalMetaTags={[
          { name: 'keywords', content: 'IDC, IDC 서버 임대, 클라우드 인프라, 스트리밍 솔루션, 영상 스트리밍 플랫폼, 라이브 스트리밍, AI 보안, 네트워크 보안, 딥페이크 탐지, 백업 솔루션, DR 솔루션, 재해복구, 이중화, LunarFlux' },
          { name: 'naver-site-verification', content: 'f5c658e8819d2cff69bcd33a949fcf2885eab0c0' },
        ]}
      />
      <div className="grid-bg" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
