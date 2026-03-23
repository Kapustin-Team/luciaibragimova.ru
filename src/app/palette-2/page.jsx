import { getHomepage, getDirections, getCourses, getFaqs, getReviews, getTeamMembers, getConsultationTypes } from '@/lib/strapi'
import ClientHome from '../ClientHome'
import PaletteLayout from './PaletteLayout'

export const metadata = {
  title: 'Палитра 2 — Пыльный розовый | Студия Люции Ибрагимовой',
  robots: 'noindex, nofollow',
}

export default async function Palette2Page() {
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
    <PaletteLayout>
      <ClientHome
        homepage={homepage}
        directions={directions || []}
        courses={courses || []}
        faqs={faqs || []}
        reviews={reviews || []}
        team={team || []}
        consultationTypes={consultationTypes || []}
      />
    </PaletteLayout>
  )
}
