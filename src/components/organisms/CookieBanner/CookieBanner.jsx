'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteSettings } from '@/components/SiteSettings/SiteSettings'
import s from './CookieBanner.module.sass'

const STORAGE_KEY = 'lucia_cookie_consent'

export default function CookieBanner() {
  const settings = useSiteSettings()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, date: new Date().toISOString() })
      )
    } catch {
      // storage unavailable — just hide for this visit
    }
    setVisible(false)
  }

  if (!settings.showCookieBanner) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={s.banner}
          role="dialog"
          aria-live="polite"
          aria-label="Использование cookie-файлов"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className={s.text}>
            {settings.cookieBannerText}{' '}
            <a href="/cookies" className={s.link}>Подробнее</a>
          </p>
          <button type="button" className={s.button} onClick={accept}>
            Принять
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
