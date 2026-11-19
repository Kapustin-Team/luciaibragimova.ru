import LegalPage, { legalPageMetadata } from '@/components/organisms/LegalPage/LegalPage'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  return legalPageMetadata(slug)
}

export default async function Page({ params }) {
  const { slug } = await params
  return <LegalPage slug={slug} />
}
