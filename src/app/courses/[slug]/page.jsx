import { getCourseBySlug, getCourses } from '@/lib/strapi'
import CoursePageClient from './CoursePageClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const courses = await getCourses()
  if (!courses) return []
  return courses.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return { title: 'Курс не найден' }
  return {
    title: `${course.title} — Студия Люции Ибрагимовой`,
    description: course.shortDescription || '',
  }
}

export default async function CoursePage({ params }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) notFound()
  return <CoursePageClient course={course} />
}
