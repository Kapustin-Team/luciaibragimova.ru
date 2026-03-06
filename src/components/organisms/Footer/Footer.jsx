'use client'
import s from './Footer.module.sass'

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
)
const VKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13.5c.2.2.6.6.8.8.4.4.7.7.4 1.1-.3.4-1 .4-1 .4h-1.8s-.4.1-.8-.1c-.5-.3-.9-.8-1.3-1.2-.2-.2-.4-.3-.5-.3-.2.1-.3.3-.3.8v1.1s0 .4-.2.5c-.2.1-.5.2-1 .2-1.1 0-2.4-.1-3.5-1.1-1.3-1.2-2.5-3.6-2.5-3.6s-.1-.3 0-.4c.1-.1.4-.1.4-.1l1.9-.1s.2 0 .3.1c.1.1.2.2.2.2s.2.4.4.8c.5 1 .9 1.4 1.1 1.4.1 0 .2-.1.2-.6V10s0-.9-.3-1c-.3-.1 0-.4.2-.4h2.8c.2 0 .3.1.3.3v2.4c0 .1.1.2.2.2.1 0 .2-.1.4-.2.8-.9 1.4-2.3 1.4-2.3s.1-.1.2-.2h.1l2 .1s.6.1.5.4c-.2.4-1 2.2-1.4 2.8"/></svg>
)
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/></svg>
)

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
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail: { direction: dirName } }))
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
                <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="Telegram"><TelegramIcon /></a>
                <a href="https://vk.com/ibragimova___lucia" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="VK"><VKIcon /></a>
                <a href="https://www.youtube.com/@lucia.ibr_psy" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="YouTube"><YouTubeIcon /></a>
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
