'use client'

import TopBanner from '@/components/organisms/TopBanner/TopBanner'
import Header from '@/components/organisms/Header/Header'
import Hero from '@/components/organisms/Hero/Hero'
import TopTierTraining from '@/components/organisms/TopTierTraining/TopTierTraining'
import ForresterWave from '@/components/organisms/ForresterWave/ForresterWave'
import SkillCards from '@/components/organisms/SkillCards/SkillCards'
import IdcSection from '@/components/organisms/IdcSection/IdcSection'
import HandsOn from '@/components/organisms/HandsOn/HandsOn'
import AiBanner from '@/components/organisms/AiBanner/AiBanner'
import SkillIq from '@/components/organisms/SkillIq/SkillIq'
import BusinessSection from '@/components/organisms/BusinessSection/BusinessSection'
import LogosBar from '@/components/organisms/LogosBar/LogosBar'
import Testimonials from '@/components/organisms/Testimonials/Testimonials'
import CtaSection from '@/components/organisms/CtaSection/CtaSection'
import Footer from '@/components/organisms/Footer/Footer'

export default function Home() {
  return (
    <>
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <TopTierTraining />
        <ForresterWave />
        <SkillCards />
        <IdcSection />
        <HandsOn />
        <AiBanner />
        <SkillIq />
        <BusinessSection />
        <LogosBar />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
