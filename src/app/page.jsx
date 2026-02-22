'use client'

import Hero from '@/components/organisms/Hero/Hero'
import About from '@/components/organisms/About/About'
import Directions from '@/components/organisms/Directions/Directions'
import Courses from '@/components/organisms/Courses/Courses'
import Reviews from '@/components/organisms/Reviews/Reviews'
import Faq from '@/components/organisms/Faq/Faq'
import Footer from '@/components/organisms/Footer/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Directions />
      <Courses />
      <Reviews />
      <Faq />
      <Footer />
    </main>
  )
}
