import { getHomepage, getDirections, getCourses, getFaqs, getReviews, getTeamMembers, getConsultationTypes, getStudioGallery } from '@/lib/strapi'
import ClientHome from './ClientHome'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [homepage, directions, courses, faqs, reviews, team, consultationTypes, studioGallery] = await Promise.all([
    getHomepage(),
    getDirections(),
    getCourses(),
    getFaqs(),
    getReviews(),
    getTeamMembers(),
    getConsultationTypes(),
    getStudioGallery(),
  ])

  return (
    <ClientHome
      homepage={homepage}
      directions={directions || []}
      courses={courses || []}
      faqs={faqs || []}
      reviews={reviews || []}
      team={team || []}
      consultationTypes={consultationTypes || []}
      studioGallery={studioGallery}
    />
  )
}
