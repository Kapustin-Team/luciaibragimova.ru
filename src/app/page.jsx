'use client'

import Header from '@/components/organisms/Header/Header'
import Hero from '@/components/organisms/Hero/Hero'
import TopBanner from '@/components/organisms/TopBanner/TopBanner'
import Directions from '@/components/organisms/Directions/Directions'
import PinkBanner from '@/components/organisms/PinkBanner/PinkBanner'
import About from '@/components/organisms/About/About'
import FeaturedCourse from '@/components/organisms/FeaturedCourse/FeaturedCourse'
import Courses from '@/components/organisms/Courses/Courses'
import Reviews from '@/components/organisms/Reviews/Reviews'
import Cta from '@/components/organisms/Cta/Cta'
import Faq from '@/components/organisms/Faq/Faq'
import Footer from '@/components/organisms/Footer/Footer'

export default function Home() {
  return (
    <>
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <Directions />
        <PinkBanner />
        <About />
        <FeaturedCourse />
        <Courses />
        <Reviews />
        <Cta />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
