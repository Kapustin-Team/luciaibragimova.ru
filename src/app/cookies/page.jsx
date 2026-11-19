import LegalPage, { legalPageMetadata } from '@/components/organisms/LegalPage/LegalPage'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return legalPageMetadata('cookies')
}

export default function Page() {
  return <LegalPage slug="cookies" />
}
