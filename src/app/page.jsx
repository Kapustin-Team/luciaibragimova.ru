import { getHomepage, getDirections, getCourses, getFaqs, getReviews, getTeamMembers } from '@/lib/strapi'
import ClientHome from './ClientHome'

export default async function Home() {
  const [homepage, directions, courses, faqs, reviews, team] = await Promise.all([
    getHomepage(),
    getDirections(),
    getCourses(),
    getFaqs(),
    getReviews(),
    getTeamMembers(),
  ])

  return (
    <ClientHome
      homepage={homepage}
      directions={directions || []}
      courses={courses || []}
      faqs={faqs || []}
      reviews={reviews || []}
      team={team || []}
    />
  )
}
