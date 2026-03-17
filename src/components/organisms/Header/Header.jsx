'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import s from './Header.module.sass'

const navLinks = [
  { label: 'О нас', id: 'about' },
  { label: 'Курсы', id: 'courses' },
  { label: 'Консультации', id: 'faq' },
  { label: 'Специалисты', id: 'about' },
  { label: 'Контакты', id: 'contact' },
  { label: 'Отзывы', id: 'reviews' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavClick(e, id) {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  function getHref(id) {
    return isHome ? `#${id}` : `/#${id}`
  }

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className={s.inner}>
        <a href="/" className={s.logo}>
          <img src="/logo.webp" alt="Люция Ибрагимова" className={s.logoImg} />
          <span className={s.logoText}>Люция Ибрагимова</span>
        </a>

        <nav className={`${s.nav} ${menuOpen ? s.navOpen : ''}`}>
          {navLinks.map(({ label, id }) => (
            <a
              key={label}
              href={getHref(id)}
              className={s.navLink}
              onClick={(e) => handleNavClick(e, id)}
            >
              {label}
            </a>
          ))}
          <div className={s.mobileBottom}>
            <div className={s.mobileSocials}>
              <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 3L1 10l7.5 3M21 3l-5.5 18-7-8M21 3L8.5 13" strokeLinejoin="round" strokeLinecap="round"/></svg>
              </a>
              <a href="https://wa.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21l1.65-3.8a9 9 0 113.15 2.85L3 21z" strokeLinejoin="round"/><path d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm5 3a.5.5 0 000-1h-1a.5.5 0 000 1h1z"/></svg>
              </a>
              <a href="https://vk.com/ibragimova___lucia" target="_blank" rel="noopener noreferrer" aria-label="VK">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.547 7H2.453A.453.453 0 002 7.453v9.094c0 .25.203.453.453.453h19.094a.453.453 0 00.453-.453V7.453A.453.453 0 0021.547 7zM9.6 14.4H8.4v-4.8h1.2v4.8zm4.8 0h-1.1l-1.5-2.34V14.4H10.6V9.6h1.1l1.5 2.34V9.6h1.2v4.8z"/></svg>
              </a>
            </div>
            <a
              href={getHref('courses')}
              className={s.mobileCta}
              onClick={(e) => handleNavClick(e, 'courses')}
            >
              Выбрать курс
            </a>
          </div>
        </nav>

        <div className={s.right}>
          <div className={s.socials}>
            <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 3L1 10l7.5 3M21 3l-5.5 18-7-8M21 3L8.5 13" strokeLinejoin="round" strokeLinecap="round"/></svg>
            </a>
            <a href="https://wa.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21l1.65-3.8a9 9 0 113.15 2.85L3 21z" strokeLinejoin="round"/><path d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm5 3a.5.5 0 000-1h-1a.5.5 0 000 1h1z"/></svg>
            </a>
          </div>
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
