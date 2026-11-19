import LegalPage, { legalPageMetadata } from '@/components/organisms/LegalPage/LegalPage'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return legalPageMetadata('consent')
}

export default function Page() {
  return <LegalPage slug="consent" />
}
