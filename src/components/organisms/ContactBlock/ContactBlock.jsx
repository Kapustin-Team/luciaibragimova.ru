'use client'
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import styles from './ContactBlock.module.sass'

const contactMethods = [
  { icon: <FiPhone size={22} />, label: 'Телефон', value: '+7 (343) 000-00-00', href: 'tel:+73430000000' },
  { icon: <FiMail size={22} />, label: 'Email', value: 'hello@luciaibragimova.ru', href: 'mailto:hello@luciaibragimova.ru' },
  { icon: <FiMapPin size={22} />, label: 'Адрес', value: 'Екатеринбург', href: null },
]

const socials = [
  { icon: <FaTelegramPlane size={20} />, label: 'Telegram', href: 'https://t.me/ibragimovapsy' },
  { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', href: 'https://wa.me/ibragimovapsy' },
  { icon: <FaVk size={20} />, label: 'ВКонтакте', href: 'https://vk.com/ibragimova___lucia' },
]

export default function ContactBlock() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Связаться с нами</h2>
          <p className={styles.subtitle}>Остались вопросы? Мы всегда на связи</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.info}>
            <ul className={styles.contactList}>
              {contactMethods.map((item) => (
                <li key={item.label} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className={styles.contactValue}>{item.value}</a>
                    ) : (
                      <span className={styles.contactValue}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.socials}>
              <p className={styles.socialsLabel}>Мы в соцсетях</p>
              <div className={styles.socialsRow}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.formWrap}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="contact-name">Ваше имя</label>
                <input id="contact-name" type="text" placeholder="Люция" className={styles.input} autoComplete="name" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="contact-phone">Телефон</label>
                <input id="contact-phone" type="tel" placeholder="+7 (___) ___-__-__" className={styles.input} autoComplete="tel" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="contact-message">Сообщение</label>
                <textarea id="contact-message" rows={5} placeholder="Расскажите, чем мы можем помочь..." className={styles.textarea} />
              </div>
              <button type="submit" className={styles.submitBtn}>Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
