// Shared by server and client components (no 'use client' here).

// Used until Strapi answers (and if it is unavailable).
// show* flags default to false: hidden elements stay hidden until enabled in Strapi.
export const DEFAULT_SITE_SETTINGS = {
  showHeroSecondaryButton: false,
  showNavConsultations: false,
  showNavReviews: false,
  showFeaturedCourse: false,
  showConsultationsButton: false,
  showContactForm: false,
  showPinkBanner: false,
  showStudioGallery: true,
  showCourseTariffs: false,
  showCourseFinalCta: false,
  showFooterAboutLinks: false,
  showFooterSubscribe: false,
  showChatPhone: false,
  showCookieBanner: true,
  telegramUrl: 'https://t.me/ibragimovapsy',
  maxUrl: 'https://max.me/ibragimovapsy',
  vkUrl: 'https://vk.ru/studia_lucii',
  youtubeUrl: '',
  phone: '',
  legalName: 'ИП Ибрагимова Люция Равилевна',
  inn: '166007578586',
  ogrn: '325169000050755',
  legalAddress: '420140, Россия, Татарстан респ., город Казань г.о., г. Казань, ул. Зарничная, д. 10',
  legalEmail: 'info@luciaibragimova.ru',
  cookieBannerText:
    'Мы используем cookie-файлы, чтобы сайт работал корректно. Оставаясь на сайте, вы соглашаетесь с их использованием.',
}

export const DEFAULT_LEGAL_DOCUMENTS = [
  { slug: 'terms', title: 'Публичная оферта', showInFooter: true, order: 1 },
  { slug: 'privacy', title: 'Политика конфиденциальности', showInFooter: true, order: 2 },
  { slug: 'consent', title: 'Согласие на обработку персональных данных', showInFooter: true, order: 3 },
  { slug: 'cookies', title: 'Политика использования cookie-файлов', showInFooter: true, order: 4 },
]

// Short footer labels for the standard documents.
const FOOTER_LABELS = {
  terms: 'Оферта',
  privacy: 'Политика конфиденциальности',
  consent: 'Согласие на обработку персональных данных',
  cookies: 'Политика использования cookie-файлов',
}

// Documents with their own short URL; any other slug lives under /documents/.
const SHORT_ROUTES = new Set(['terms', 'privacy', 'consent', 'cookies'])

export function legalDocumentHref(slug) {
  return SHORT_ROUTES.has(slug) ? `/${slug}` : `/documents/${slug}`
}

export function legalDocumentLabel(doc) {
  return FOOTER_LABELS[doc.slug] || doc.title
}

// Course with a GetCourse landing goes there; otherwise to its info page on the site.
export function courseHref(course) {
  const link = typeof course?.getcourseLink === 'string' ? course.getcourseLink.trim() : ''
  if (link) return { href: link, external: true }
  return { href: `/courses/${course?.slug || ''}`, external: false }
}

// Used when Strapi has no gallery yet (or is unavailable).
export const DEFAULT_STUDIO_GALLERY = {
  title: 'Внутри студии',
  subtitle: 'Пространство, где спокойно говорить о важном',
  items: [
    { src: '/studio/studio-reception.jpg', caption: 'Ресепшен' },
    { src: '/studio/studio-consultation-room.jpg', caption: 'Кабинет для индивидуальных консультаций' },
    { src: '/studio/studio-small-group-room.jpg', caption: 'Комната для малых групп' },
    { src: '/studio/studio-group-hall.jpg', caption: 'Зал на 10 человек' },
    { src: '/studio/studio-classroom.jpg', caption: 'Учебный класс' },
    { src: '/studio/studio-kitchen.jpg', caption: 'Кухня, зона отдыха' },
  ],
}
