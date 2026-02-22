import s from './Header.module.sass'

const navLinks = ['Курсы', 'О нас', 'Направления', 'Контакты']

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <a href="#" className={s.logo} style={{ fontWeight: 700, fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Школа психологии</a>
          <nav className={s.nav}>
            {navLinks.map(link => (
              <a key={link} href="#" className={s.navLink}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className={s.right}>
          <a href="#" className={s.signIn}>Войти →</a>
          <a href="#" className={s.viewPlans}>Бесплатная консультация →</a>
        </div>
      </div>
    </header>
  )
}
