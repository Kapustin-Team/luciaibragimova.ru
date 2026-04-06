'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/organisms/Header/Header'
import Hero from '@/components/organisms/Hero/Hero'
import Directions from '@/components/organisms/Directions/Directions'
import DirectionsGrid from '@/components/organisms/DirectionsGrid/DirectionsGrid'
import TopBanner from '@/components/organisms/TopBanner/TopBanner'
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

const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

async function fetchPublic(path) {
  const res = await fetch(`${STRAPI_PUBLIC_URL}/api/${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Public Strapi fetch failed: ${res.status} ${path}`)
  const json = await res.json()
  return json.data
}

const BLOCK_MAP = {
  'blocks.top-banner': TopBanner,
  'blocks.hero': Hero,
  'blocks.directions-grid': DirectionsGrid,
  'blocks.directions': Directions,
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
  const [homepageState, setHomepageState] = useState(homepage)
  const [directionsState, setDirectionsState] = useState(directions || [])
  const [coursesState, setCoursesState] = useState(courses || [])
  const [faqsState, setFaqsState] = useState(faqs || [])
  const [reviewsState, setReviewsState] = useState(reviews || [])
  const [teamState, setTeamState] = useState(team || [])
  const [consultationTypesState, setConsultationTypesState] = useState(consultationTypes || [])

  useEffect(() => {
    let cancelled = false

    const needsHomepage = !homepageState?.blocks?.length
    const needsDirections = directionsState.length === 0
    const needsCourses = coursesState.length === 0
    const needsFaqs = faqsState.length === 0
    const needsReviews = reviewsState.length === 0
    const needsTeam = teamState.length === 0
    const needsConsultationTypes = consultationTypesState.length === 0

    if (!needsHomepage && !needsDirections && !needsCourses && !needsFaqs && !needsReviews && !needsTeam && !needsConsultationTypes) {
      return
    }

    ;(async () => {
      try {
        const [homepageData, directionsData, coursesData, faqsData, reviewsData, teamData, consultationTypesData] = await Promise.all([
          needsHomepage ? fetchPublic('homepage?populate[seo][populate]=*&populate[blocks][populate]=*') : Promise.resolve(homepageState),
          needsDirections ? fetchPublic('directions?populate=*&sort=order:asc') : Promise.resolve(directionsState),
          needsCourses ? fetchPublic('courses?populate[0]=direction&populate[1]=tariffs&populate[2]=image&populate[3]=author&sort=order:asc&pagination[pageSize]=50') : Promise.resolve(coursesState),
          needsFaqs ? fetchPublic('faqs?sort=order:asc') : Promise.resolve(faqsState),
          needsReviews ? fetchPublic('reviews?populate[0]=screenshot&populate[1]=video&populate[2]=course') : Promise.resolve(reviewsState),
          needsTeam ? fetchPublic('team-members?populate[0]=photo&sort=order:asc') : Promise.resolve(teamState),
          needsConsultationTypes ? fetchPublic('consultation-types?populate=*&sort=order:asc') : Promise.resolve(consultationTypesState),
        ])

        if (cancelled) return

        if (homepageData) setHomepageState(homepageData)
        if (Array.isArray(directionsData) && directionsData.length) setDirectionsState(directionsData)
        if (Array.isArray(coursesData) && coursesData.length) setCoursesState(coursesData)
        if (Array.isArray(faqsData) && faqsData.length) setFaqsState(faqsData)
        if (Array.isArray(reviewsData) && reviewsData.length) setReviewsState(reviewsData)
        if (Array.isArray(teamData) && teamData.length) setTeamState(teamData)
        if (Array.isArray(consultationTypesData) && consultationTypesData.length) setConsultationTypesState(consultationTypesData)
      } catch (error) {
        console.error('ClientHome public fallback failed', error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [homepageState, directionsState, coursesState, faqsState, reviewsState, teamState, consultationTypesState])

  const sharedData = {
    directions: directionsState,
    courses: coursesState,
    faqs: faqsState,
    reviews: reviewsState,
    team: teamState,
    consultationTypes: consultationTypesState,
  }

  const blocks = homepageState?.blocks || []
  const hasBlocks = blocks.length > 0

  if (hasBlocks) {
    const heroBlock = blocks.find((b) => b.__component === 'blocks.hero')
    const otherBlocks = blocks.filter((b) => b.__component !== 'blocks.hero')

    return (
      <>
        <Header />
        <main>
          {heroBlock && <Hero data={heroBlock} {...sharedData} />}
          {otherBlocks.map((block, i) => {
            const Component = BLOCK_MAP[block.__component]
            if (!Component) {
              console.warn(`Unknown homepage block: ${block.__component}`)
              return null
            }
            return <Component key={`${block.__component}-${i}`} data={block} {...sharedData} />
          })}
        </main>
        <Footer directions={directionsState} courses={coursesState} />
        <ChatWidget />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <TopBanner />
        <Hero />
        <DirectionsGrid directions={directionsState} courses={coursesState} />
        <TrustBlock />
        <PinkBanner />
        <About />
        <FeaturedCourse courses={coursesState} />
        <Courses courses={coursesState} />
        <Reviews reviews={reviewsState} />
        <Cta />
        <Faq faqs={faqsState} />
        <Consultations consultationTypes={consultationTypesState} />
        <Team team={teamState} />
        <ContactBlock />
      </main>
      <Footer directions={directionsState} courses={coursesState} />
      <ChatWidget />
    </>
  )
}
