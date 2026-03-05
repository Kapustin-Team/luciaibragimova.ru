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
    'populate[0]': 'seo',
    'populate[1]': 'blocks',
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
    'populate[1]': 'targetAudience',
    'populate[2]': 'results',
    'populate[3]': 'modules',
    'populate[4]': 'tariffs',
    'populate[5]': 'faqs',
    'populate[6]': 'reviews',
    'populate[7]': 'relatedCourses',
    'populate[8]': 'author',
    'populate[9]': 'image',
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
    'populate': '*',
  })
}

export async function getTeamMembers() {
  return fetchStrapi('/team-members', {
    'populate': '*',
    'sort': 'order:asc',
  })
}

export { STRAPI_URL }
