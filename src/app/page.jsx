import { getHomepage, getDirections, getCourses, getFaqs, getReviews, getTeamMembers, getConsultationTypes } from '@/lib/strapi'
import ClientHome from './ClientHome'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [homepage, directions, courses, faqs, reviews, team, consultationTypes] = await Promise.all([
    getHomepage(),
    getDirections(),
    getCourses(),
    getFaqs(),
    getReviews(),
    getTeamMembers(),
    getConsultationTypes(),
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
    />
  )
}
