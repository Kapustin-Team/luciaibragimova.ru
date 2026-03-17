'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa'
import s from './Header.module.sass'

const navLinks = [
  { label: 'О нас', id: 'about' },
  { label: 'Курсы', id: 'courses' },
  { label: 'Консультации', id: 'consultations' },
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
              <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane size={20} /></a>
              <a href="https://wa.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
              <a href="https://vk.com/ibragimova___lucia" target="_blank" rel="noopener noreferrer" aria-label="VK"><FaVk size={20} /></a>
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
            <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane size={18} /></a>
            <a href="https://wa.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
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
