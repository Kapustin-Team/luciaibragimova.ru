import s from './Footer.module.sass'

const footerCols = [
  {
    title: 'Направления',
    links: ['Рождение семьи', 'Здоровое взросление', 'Развитие детей и взрослых', 'Духовно-нравственная трансформация'],
  },
  {
    title: 'Курсы',
    links: ['Вовремя', 'Мама здесь', 'Свои люди', 'Анти-выгорание', 'Все курсы'],
  },
  {
    title: 'О школе',
    links: ['О Люции', 'Центр «Время первых»', 'Отзывы', 'Контакты'],
  },
  {
    title: 'Специалистам',
    links: ['Для педагогов', 'Для психологов', 'Для школ', 'Сотрудничество'],
  },
]

const relatedPages = [
  'Курс «Вовремя» для родителей подростков',
  'Центр «Время первых»',
  'Программы для специалистов',
]

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.related}>
        <div className={s.relatedInner}>
          <span className={s.relatedTitle}>Популярное</span>
          <div className={s.relatedLinks}>
            {relatedPages.map(p => (
              <a key={p} href="#" className={s.relatedLink}>{p}</a>
            ))}
          </div>
        </div>
      </div>
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.cols}>
            {footerCols.map(col => (
              <div key={col.title} className={s.col}>
                <h4 className={s.colTitle}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" className={s.colLink}>{link}</a>
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
                {['tg', 'vk', 'yt'].map(icon => (
                  <a key={icon} href="#" className={s.socialIcon}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <div className={s.logoWrap}>
            <span className={s.footerLogo} style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>Школа психологии Люции Ибрагимовой</span>
            <span className={s.copyright}>© 2026 Люция Ибрагимова. Все права защищены</span>
          </div>
          <div className={s.legal}>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
