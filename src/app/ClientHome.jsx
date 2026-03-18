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
import TrustBlock from '@/components/organisms/TrustBlock/TrustBlock'
import Consultations from '@/components/organisms/Consultations/Consultations'
import ContactBlock from '@/components/organisms/ContactBlock/ContactBlock'
import Footer from '@/components/organisms/Footer/Footer'

// Map Strapi block __component to React components
const BLOCK_MAP = {
  'blocks.top-banner': TopBanner,
  'blocks.hero': Hero,
  'blocks.directions-grid': Directions,
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
}

export default function ClientHome({ homepage, directions, courses, faqs, reviews, team, consultationTypes }) {
  // Build shared data context for blocks
  const sharedData = { directions, courses, faqs, reviews, team, consultationTypes }

  // If homepage has blocks from Strapi, render dynamically
  const blocks = homepage?.blocks || []
  const hasBlocks = blocks.length > 0

  return (
    <>
      {hasBlocks ? (
        <>
          <Header />
          <main>
            {blocks.map((block, i) => {
              const Component = BLOCK_MAP[block.__component]
              if (!Component) return null
              return <Component key={`${block.__component}-${i}`} data={block} {...sharedData} />
            })}
          </main>
        </>
      ) : (
        // Fallback: static layout (no Strapi data)
        <>
          <TopBanner />
          <Header />
          <main>
            <Hero />
            <TrustBlock />
            <Directions directions={directions} />
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
        </>
      )}
      <Footer directions={directions} courses={courses} />
    </>
  )
}
