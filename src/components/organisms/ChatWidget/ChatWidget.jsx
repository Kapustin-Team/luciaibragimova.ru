'use client'

import { useState } from 'react'
import { FaTelegramPlane, FaVk, FaPhoneAlt } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import s from './ChatWidget.module.sass'

const MaxIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" transform="scale(0.0277)" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
  </svg>
)

const links = [
  { icon: <FaPhoneAlt size={18} />, label: 'Позвонить', href: 'tel:+73430000000', color: '#10b981' },
  { icon: <FaTelegramPlane size={18} />, label: 'Telegram', href: 'https://t.me/ibragimovapsy', color: '#2AABEE' },
  { icon: <MaxIcon size={18} />, label: 'Max', href: 'https://max.me/ibragimovapsy', color: '#30023c' },
  { icon: <FaVk size={18} />, label: 'ВКонтакте', href: 'https://vk.com/ibragimova___lucia', color: '#4C75A3' },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.wrapper}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.panel}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p className={s.panelTitle}>Свяжитесь с нами</p>
            <div className={s.links}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('tel:') ? undefined : '_blank'}
                  rel={link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className={s.link}
                >
                  <span className={s.linkIcon} style={{ background: link.color }}>
                    {link.icon}
                  </span>
                  <span className={s.linkLabel}>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`${s.fab} ${open ? s.fabOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Закрыть чат' : 'Открыть чат'}
      >
        <span className={s.fabIcon}>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}
