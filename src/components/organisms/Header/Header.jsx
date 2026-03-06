'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import s from './Header.module.sass'

const navLinks = [
  { label: 'Направления', id: 'directions' },
  { label: 'Курсы', id: 'courses' },
  { label: 'О Люции', id: 'about' },
  { label: 'Отзывы', id: 'reviews' },
  { label: 'Вопросы', id: 'faq' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(e, id) {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMenuOpen(false)
  }

  function getHref(id) {
    return isHome ? `#${id}` : `/#${id}`
  }

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <a href="/" className={s.logo}>Школа Люции Ибрагимовой</a>

        <nav className={`${s.nav} ${menuOpen ? s.navOpen : ''}`}>
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={getHref(id)}
              className={s.navLink}
              onClick={(e) => handleNavClick(e, id)}
            >
              {label}
            </a>
          ))}
          <a
            href={getHref('courses')}
            className={s.mobileCta}
            onClick={(e) => handleNavClick(e, 'courses')}
          >
            Выбрать курс
          </a>
        </nav>

        <div className={s.right}>
          <a
            href={getHref('courses')}
            className={s.viewPlans}
            onClick={(e) => handleNavClick(e, 'courses')}
          >
            Выбрать курс
          </a>
          <button
            className={`${s.burger} ${menuOpen ? s.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
