'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './EnrollModal.module.sass'

const EnrollContext = createContext(null)

export function useEnroll() {
  return useContext(EnrollContext)
}

export function EnrollProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(null)

  const openEnroll = useCallback((productInfo) => {
    setProduct(productInfo)
    setOpen(true)
  }, [])

  const closeEnroll = useCallback(() => {
    setOpen(false)
  }, [])

  // Listen for custom events from any component
  useEffect(() => {
    function handleOpen(e) {
      openEnroll(e.detail)
    }
    window.addEventListener('open-enroll', handleOpen)
    return () => window.removeEventListener('open-enroll', handleOpen)
  }, [openEnroll])

  return (
    <EnrollContext.Provider value={{ openEnroll, closeEnroll }}>
      {children}
      <EnrollModal open={open} product={product} onClose={closeEnroll} />
    </EnrollContext.Provider>
  )
}

function EnrollModal({ open, product, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setSent(false)
      setForm({ name: '', phone: '', message: '' })
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: send to API / email / CRM
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={s.modal}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={s.close} onClick={onClose} aria-label="Закрыть">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {sent ? (
              <div className={s.success}>
                <div className={s.successIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className={s.successTitle}>Заявка отправлена!</h3>
                <p className={s.successText}>Мы свяжемся с вами в ближайшее время.</p>
                <button className={s.successBtn} onClick={onClose}>Закрыть</button>
              </div>
            ) : (
              <>
                <h3 className={s.title}>Записаться</h3>
                {product && (
                  <div className={s.productTag}>
                    <span className={s.productLabel}>{product.type === 'consultation' ? 'Консультация' : 'Курс'}</span>
                    <span className={s.productName}>{product.name}</span>
                  </div>
                )}
                <form className={s.form} onSubmit={handleSubmit}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="enroll-name">Ваше имя</label>
                    <input
                      id="enroll-name"
                      type="text"
                      className={s.input}
                      placeholder="Люция"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="enroll-phone">Телефон</label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      className={s.input}
                      placeholder="+7 (___) ___-__-__"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="enroll-message">Комментарий</label>
                    <textarea
                      id="enroll-message"
                      className={s.textarea}
                      rows={3}
                      placeholder="Вопросы или пожелания..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className={s.submit}>Отправить заявку</button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
