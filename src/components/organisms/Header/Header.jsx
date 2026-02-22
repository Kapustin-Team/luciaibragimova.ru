import s from './Header.module.sass'

const navLinks = ['Курсы', 'О нас', 'Направления', 'Контакты']

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <a href="#" className={s.logo}>Школа психологии</a>
          <nav className={s.nav}>
            {navLinks.map(link => (
              <a key={link} href={`#${link === 'Курсы' ? 'courses' : link === 'О нас' ? 'about' : link === 'Направления' ? 'directions' : 'faq'}`} className={s.navLink}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className={s.right}>
          <a href="#courses" className={s.viewPlans}>Выбрать курс</a>
        </div>
      </div>
    </header>
  )
}
