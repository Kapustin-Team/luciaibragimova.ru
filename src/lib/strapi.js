const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || ''

async function fetchStrapi(path, params = {}) {
  const url = new URL(`/api${path}`, STRAPI_URL)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  const headers = { 'Content-Type': 'application/json' }
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${path} ${url.search}`)
      return null
    }

    const json = await res.json()
    return json.data
  } catch (e) {
    console.error(`Strapi fetch exception: ${path}`, e.message)
    return null
  }
}

// === API Functions ===

export async function getHomepage() {
  return fetchStrapi('/homepage', {
    'populate[seo][populate]': '*',
    'populate[blocks][populate]': '*',
  })
}

export async function getConsultationTypes() {
  return fetchStrapi('/consultation-types', {
    'populate': '*',
    'sort': 'order:asc',
  })
}

export async function getDirections() {
  return fetchStrapi('/directions', {
    'populate': '*',
    'sort': 'order:asc',
  })
}

export async function getCourses() {
  return fetchStrapi('/courses', {
    'populate[0]': 'direction',
    'populate[1]': 'tariffs',
    'populate[2]': 'image',
    'populate[3]': 'author',
    'sort': 'order:asc',
    'pagination[pageSize]': '50',
  })
}

export async function getCourseBySlug(slug) {
  const data = await fetchStrapi('/courses', {
    'filters[slug][$eq]': slug,
    'populate[0]': 'direction',
    'populate[1]': 'targetAudience.image',
    'populate[2]': 'results',
    'populate[3]': 'modules',
    'populate[4]': 'tariffs',
    'populate[5]': 'faqs',
    'populate[6]': 'reviews.screenshot',
    'populate[7]': 'reviews.video',
    'populate[8]': 'relatedCourses',
    'populate[9]': 'author',
    'populate[10]': 'image',
    'populate[11]': 'teachers.photo',
    'populate[12]': 'resultsImage',
    'populate[13]': 'methods',
    'populate[14]': 'limitations',
  })
  return data?.[0] || null
}

export async function getFaqs() {
  return fetchStrapi('/faqs', {
    'sort': 'order:asc',
  })
}

export async function getReviews() {
  return fetchStrapi('/reviews', {
    'populate[0]': 'screenshot',
    'populate[1]': 'video',
    'populate[2]': 'course',
  })
}

export async function getTeamMembers() {
  return fetchStrapi('/team-members', {
    'populate[0]': 'photo',
    'sort': 'order:asc',
  })
}

export { STRAPI_URL }
