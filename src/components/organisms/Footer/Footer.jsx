'use client'
import { FaTelegramPlane, FaVk, FaYoutube } from 'react-icons/fa'
import s from './Footer.module.sass'
import {
  useSiteSettings,
  useLegalDocuments,
  legalDocumentHref,
  legalDocumentLabel,
} from '@/components/SiteSettings/SiteSettings'

const MaxIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" transform="scale(0.0277)" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
  </svg>
)

function handleDirClick(e, dirName) {
  e.preventDefault()
  const el = document.getElementById('courses')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('filter-courses', { detail: { direction: dirName } }))
  } else {
    window.location.href = `/?direction=${encodeURIComponent(dirName)}#courses`
  }
}

const FALLBACK_DIRECTIONS = [
  { text: 'Рождение семьи', dir: 'Рождение семьи' },
  { text: 'Здоровое взросление', dir: 'Здоровое взросление' },
  { text: 'Развитие', dir: 'Развитие' },
  { text: 'Трансформация', dir: 'Трансформация' },
]

const FALLBACK_COURSES = [
  { text: 'Вовремя', href: '/courses/vovremya' },
  { text: 'Мама здесь', href: '/courses/mama-zdes' },
  { text: 'Свои люди', href: '/courses/svoi-lyudi' },
  { text: 'Анти-выгорание', href: '/courses/anti-vygoranie' },
]

const aboutLinks = [
  { text: 'О Люции', href: '/#about' },
  { text: 'Центр «Время первых»', href: 'https://vremyapervih.ru', external: true },
  { text: 'Отзывы', href: '/#reviews' },
  { text: 'Контакты', href: '/#faq' },
  { text: 'Учредительные документы', href: '/' },
]

export default function Footer({ directions, courses }) {
  const settings = useSiteSettings()
  const legalDocuments = useLegalDocuments()

  const footerLegalLinks = [...legalDocuments]
    .filter((doc) => doc.showInFooter !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((doc) => ({ text: legalDocumentLabel(doc), href: legalDocumentHref(doc.slug) }))

  const socialLinks = [
    { url: settings.telegramUrl, label: 'Telegram', Icon: FaTelegramPlane },
    { url: settings.maxUrl, label: 'Max', Icon: MaxIcon },
    { url: settings.vkUrl, label: 'VK', Icon: FaVk },
    { url: settings.youtubeUrl, label: 'YouTube', Icon: FaYoutube },
  ].filter((link) => link.url)

  const requisites = [
    settings.legalName,
    settings.inn && `ИНН: ${settings.inn}`,
    settings.ogrn && `ОГРНИП: ${settings.ogrn}`,
    settings.legalAddress && `Адрес: ${settings.legalAddress}`,
  ].filter(Boolean)
  const dirLinks = (directions && directions.length > 0)
    ? directions.map(d => ({
        text: d.name || d.title,
        dir: d.name || d.title,
        href: '/#courses',
      }))
    : FALLBACK_DIRECTIONS.map(d => ({ ...d, href: '/#courses' }))

  const courseLinks = (courses && courses.length > 0)
    ? [
        ...courses.slice(0, 4).map(c => ({
          text: c.title || c.name,
          href: `/courses/${c.slug}`,
        })),
        { text: 'Все курсы', href: '/#courses' },
      ]
    : [...FALLBACK_COURSES, { text: 'Все курсы', href: '/#courses' }]

  const footerCols = [
    { title: 'Направления', links: dirLinks },
    { title: 'Курсы', links: courseLinks },
    // «О студии» links are kept for later; enabled in «Настройки сайта»
    ...(settings.showFooterAboutLinks ? [{ title: 'О студии', links: aboutLinks }] : []),
  ]

  return (
    // When the contact form is hidden, the «Контакты» menu item scrolls here
    <footer className={s.footer} id={settings.showContactForm ? undefined : 'contact'}>
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.cols}>
            {footerCols.map(col => (
              <div key={col.title} className={s.col}>
                <h4 className={s.colTitle}>{col.title}</h4>
                {col.links.map(link => (
                  <a
                    key={link.text}
                    href={link.href}
                    className={s.colLink}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(link.dir ? { onClick: (e) => handleDirClick(e, link.dir) } : {})}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            ))}
            {!settings.showFooterAboutLinks && requisites.length > 0 && (
              <div className={`${s.col} ${s.requisites}`}>
                <h4 className={s.colTitle}>Реквизиты</h4>
                {requisites.map((line) => (
                  <p key={line} className={s.requisiteLine}>{line}</p>
                ))}
                {settings.legalEmail && (
                  <a href={`mailto:${settings.legalEmail}`} className={s.colLink}>
                    E-mail: {settings.legalEmail}
                  </a>
                )}
              </div>
            )}
            <div className={s.newsletter}>
              <h4 className={s.newsletterTitle}>Будьте в курсе новых программ</h4>
              <p className={s.newsletterDesc}>
                Получайте полезные материалы о воспитании и семейной психологии.
              </p>
              {settings.showFooterSubscribe && (
                <a href="#" className={s.signUpBtn}>Подписаться</a>
              )}
              <div className={s.socials}>
                {socialLinks.map(({ url, label, Icon }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label={label}><Icon size={20} /></a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <div className={s.logoWrap}>
            <span className={s.footerLogo} style={{ fontWeight: 700, fontSize: '1rem' }}>Студия Люции Ибрагимовой</span>
            <span className={s.copyright}>© 2026 Люция Ибрагимова. Все права защищены</span>
          </div>
          <div className={s.legal}>
            {footerLegalLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
