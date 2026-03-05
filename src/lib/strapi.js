const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || ''

async function fetchStrapi(path, params = {}) {
  const url = new URL(`/api${path}`, STRAPI_URL)
  
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'object') {
      // Handle nested params like populate
      flattenParams(key, value, url.searchParams)
    } else {
      url.searchParams.set(key, value)
    }
  })

  const headers = { 'Content-Type': 'application/json' }
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error(`Strapi fetch error: ${res.status} ${path}`)
    return null
  }

  const json = await res.json()
  return json.data
}

function flattenParams(prefix, obj, searchParams) {
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    searchParams.set(prefix, String(obj))
    return
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      flattenParams(`${prefix}[${i}]`, item, searchParams)
    })
    return
  }
  if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      flattenParams(`${prefix}[${key}]`, value, searchParams)
    })
  }
}

// === API Functions ===

export async function getHomepage() {
  return fetchStrapi('/homepage', {
    'populate[blocks][populate]': '*',
    'populate[seo][populate]': '*',
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
    'populate[direction]': '*',
    'populate[tariffs]': '*',
    'populate[image]': '*',
    'populate[author][populate]': '*',
    'sort': 'order:asc',
    'pagination[pageSize]': '50',
  })
}

export async function getCourseBySlug(slug) {
  const data = await fetchStrapi('/courses', {
    'filters[slug][$eq]': slug,
    'populate[direction]': '*',
    'populate[targetAudience]': '*',
    'populate[results]': '*',
    'populate[modules]': '*',
    'populate[tariffs]': '*',
    'populate[faqs]': '*',
    'populate[reviews]': '*',
    'populate[relatedCourses][populate]': '*',
    'populate[author][populate]': '*',
    'populate[image]': '*',
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
