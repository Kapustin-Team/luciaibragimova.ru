'use client'
import { FaTelegramPlane, FaVk, FaYoutube } from 'react-icons/fa'
import s from './Footer.module.sass'

const COURSE_SLUGS = {
  'Вовремя': 'vovremya',
  'Мама здесь': 'mama-zdes',
  'Свои люди': 'svoi-lyudi',
  'Анти-выгорание': 'anti-vygoranie',
  'Все курсы': null,
}

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

const footerCols = [
  {
    title: 'Направления',
    links: [
      { text: 'Рождение семьи', href: '/#courses', dir: 'Рождение семьи' },
      { text: 'Здоровое взросление', href: '/#courses', dir: 'Здоровое взросление' },
      { text: 'Развитие', href: '/#courses', dir: 'Развитие' },
      { text: 'Трансформация', href: '/#courses', dir: 'Трансформация' },
    ],
  },
  {
    title: 'Курсы',
    links: [
      { text: 'Вовремя', href: '/courses/vovremya' },
      { text: 'Мама здесь', href: '/courses/mama-zdes' },
      { text: 'Свои люди', href: '/courses/svoi-lyudi' },
      { text: 'Анти-выгорание', href: '/courses/anti-vygoranie' },
      { text: 'Все курсы', href: '/#courses' },
    ],
  },
  {
    title: 'О школе',
    links: [
      { text: 'О Люции', href: '/#about' },
      { text: 'Центр «Время первых»', href: 'https://vremyapervyh.ru', external: true },
      { text: 'Отзывы', href: '/#reviews' },
      { text: 'Контакты', href: '/#faq' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={s.footer}>
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
            <div className={s.newsletter}>
              <h4 className={s.newsletterTitle}>Будьте в курсе новых программ</h4>
              <p className={s.newsletterDesc}>
                Получайте полезные материалы о воспитании и семейной психологии.
              </p>
              <a href="#" className={s.signUpBtn}>Подписаться</a>
              <div className={s.socials}>
                <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="Telegram"><FaTelegramPlane size={20} /></a>
                <a href="https://vk.com/ibragimova___lucia" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="VK"><FaVk size={20} /></a>
                <a href="https://www.youtube.com/@lucia.ibr_psy" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="YouTube"><FaYoutube size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <div className={s.logoWrap}>
            <span className={s.footerLogo} style={{ fontWeight: 700, fontSize: '1rem' }}>Школа Люции Ибрагимовой</span>
            <span className={s.copyright}>© 2026 Люция Ибрагимова. Все права защищены</span>
          </div>
          <div className={s.legal}>
            <a href="/privacy">Политика конфиденциальности</a>
            <a href="/terms">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
