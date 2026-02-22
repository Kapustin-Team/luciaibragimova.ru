import s from './Header.module.sass'

const navLinks = ['Individuals', 'Business', 'Public Sector', 'Courses', 'Resources']

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <img src="/images/pluralsight-logo.svg" alt="Pluralsight" className={s.logo} />
          <nav className={s.nav}>
            {navLinks.map(link => (
              <a key={link} href="#" className={s.navLink}>
                {link} <span className={s.chevron}>▾</span>
              </a>
            ))}
          </nav>
        </div>
        <div className={s.right}>
          <div className={s.search}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#555" strokeWidth="1.5"/><path d="M11 11l3.5 3.5" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>What do you want to learn?</span>
          </div>
          <a href="#" className={s.signIn}>Sign in →</a>
          <a href="#" className={s.contactSales}>Contact sales</a>
          <a href="#" className={s.viewPlans}>View plans →</a>
        </div>
      </div>
    </header>
  )
}
