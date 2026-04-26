'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'

const MaxIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" transform="scale(0.0277)" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
  </svg>
)
import s from './Header.module.sass'

const navLinks = [
  { label: 'О нас', id: 'about' },
  { label: 'Курсы', id: 'courses' },
  { label: 'Консультации', id: 'consultations' },
  { label: 'Специалисты', id: 'about' },
  { label: 'Контакты', id: 'contact' },
  { label: 'Отзывы', id: 'reviews' },
]

export default function Header({ data, hasHero } = {}) {
  const brandName = data?.brandName || 'Люция Ибрагимова'
  const ctaLabel = data?.ctaLabel || 'Выбрать курс'
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const val = menuOpen ? 'hidden' : ''
    document.body.style.overflow = val
    document.documentElement.style.overflow = val
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  // On home: transparent by default, scrolled = white
  // On other pages: always white
  const handleScroll = useCallback(() => {
    if (!isHome && !hasHero) {
      setScrolled(true)
      return
    }
    setScrolled(window.scrollY > 80)
  }, [isHome, hasHero])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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

  // On home + not scrolled = transparent. Otherwise white.
  const isTransparent = (isHome || hasHero) && !scrolled && !menuOpen

  return (
    <header
      className={`${s.header} ${scrolled ? s.scrolled : ''} ${isTransparent ? s.transparent : ''} ${menuOpen ? s.menuOpen : ''}`}
      data-transparent={isTransparent ? 'true' : undefined}
    >
      <div className={s.inner}>
        <a href="/" className={s.logo}>
          <Image
            src={isTransparent || menuOpen ? '/logo-light.svg' : '/logo-dark.svg'}
            alt={brandName}
            className={s.logoImg}
            width={220}
            height={44}
            priority
          />
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
              <a href="https://max.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Max"><MaxIcon size={20} /></a>
              <a href="https://vk.com/ibragimova___lucia" target="_blank" rel="noopener noreferrer" aria-label="VK"><FaVk size={20} /></a>
            </div>
            <a
              href={getHref('courses')}
              className={s.mobileCta}
              onClick={(e) => handleNavClick(e, 'courses')}
            >
              {ctaLabel}
            </a>
          </div>
        </nav>

        <div className={s.right}>
          <div className={s.socials}>
            <a href="https://t.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane size={18} /></a>
            <a href="https://max.me/ibragimovapsy" target="_blank" rel="noopener noreferrer" aria-label="Max"><MaxIcon size={18} /></a>
          </div>
          <a
            href={getHref('courses')}
            className={s.viewPlans}
            onClick={(e) => handleNavClick(e, 'courses')}
          >
            {ctaLabel}
          </a>
        </div>
        <button
          className={`${s.burger} ${menuOpen ? s.burgerOpen : ''} ${isTransparent ? s.burgerTransparent : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
