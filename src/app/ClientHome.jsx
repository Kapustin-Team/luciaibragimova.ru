'use client'

import Header from '@/components/organisms/Header/Header'
import Hero from '@/components/organisms/Hero/Hero'
import TopBanner from '@/components/organisms/TopBanner/TopBanner'
import Directions from '@/components/organisms/Directions/Directions'
import DirectionsGrid from '@/components/organisms/DirectionsGrid/DirectionsGrid'
import PinkBanner from '@/components/organisms/PinkBanner/PinkBanner'
import About from '@/components/organisms/About/About'
import FeaturedCourse from '@/components/organisms/FeaturedCourse/FeaturedCourse'
import Courses from '@/components/organisms/Courses/Courses'
import Reviews from '@/components/organisms/Reviews/Reviews'
import Cta from '@/components/organisms/Cta/Cta'
import Faq from '@/components/organisms/Faq/Faq'
import TrustBlock from '@/components/organisms/TrustBlock/TrustBlock'
import Consultations from '@/components/organisms/Consultations/Consultations'
import ContactBlock from '@/components/organisms/ContactBlock/ContactBlock'
import Team from '@/components/organisms/Team/Team'
import Footer from '@/components/organisms/Footer/Footer'
import ChatWidget from '@/components/organisms/ChatWidget/ChatWidget'

// Map Strapi block __component to React components
const BLOCK_MAP = {
  'blocks.top-banner': TopBanner,
  'blocks.hero': Hero,
  'blocks.directions-grid': DirectionsGrid,
  'blocks.pink-banner': PinkBanner,
  'blocks.about': About,
  'blocks.featured-course': FeaturedCourse,
  'blocks.courses-catalog': Courses,
  'blocks.reviews-section': Reviews,
  'blocks.cta-section': Cta,
  'blocks.faq-section': Faq,
  'blocks.trust-block': TrustBlock,
  'blocks.consultations-section': Consultations,
  'blocks.contact-section': ContactBlock,
  'blocks.team-section': Team,
}

export default function ClientHome({ homepage, directions, courses, faqs, reviews, team, consultationTypes }) {
  const sharedData = { directions, courses, faqs, reviews, team, consultationTypes }
  const blocks = homepage?.blocks || []
  const hasBlocks = blocks.length > 0

  if (hasBlocks) {
    // Extract hero and top-banner, render rest normally
    const topBanner = blocks.find(b => b.__component === 'blocks.top-banner')
    const heroBlock = blocks.find(b => b.__component === 'blocks.hero')
    const otherBlocks = blocks.filter(b => b.__component !== 'blocks.top-banner' && b.__component !== 'blocks.hero')

    return (
      <>
        <Header />
        <main>
          {heroBlock && <Hero data={heroBlock} {...sharedData} />}
          {topBanner && <TopBanner data={topBanner} {...sharedData} />}
          {otherBlocks.map((block, i) => {
            const Component = BLOCK_MAP[block.__component]
            if (!Component) return null
            return <Component key={`${block.__component}-${i}`} data={block} {...sharedData} />
          })}
        </main>
        <Footer directions={directions} courses={courses} />
        <ChatWidget />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TopBanner />
        <TrustBlock />
        <DirectionsGrid directions={directions} courses={courses} />
        <PinkBanner />
        <About />
        <FeaturedCourse />
        <Courses courses={courses} />
        <Reviews reviews={reviews} />
        <Cta />
        <Faq faqs={faqs} />
        <Consultations />
        <ContactBlock />
      </main>
      <Footer directions={directions} courses={courses} />
      <ChatWidget />
    </>
  )
}
