'use client'
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import styles from './ContactBlock.module.sass'

const DEFAULT_CONTACTS = {
  phone: '+7 (343) 000-00-00',
  email: 'hello@luciaibragimova.ru',
  address: 'Екатеринбург',
}

const socials = [
  { icon: <FaTelegramPlane size={20} />, label: 'Telegram', href: 'https://t.me/ibragimovapsy' },
  { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', href: 'https://wa.me/ibragimovapsy' },
  { icon: <FaVk size={20} />, label: 'ВКонтакте', href: 'https://vk.com/ibragimova___lucia' },
]

export default function ContactBlock({ data } = {}) {
  const title = data?.title || 'Связаться с нами'
  const subtitle = data?.subtitle || 'Остались вопросы? Мы всегда на связи'
  const phone = data?.phone || DEFAULT_CONTACTS.phone
  const email = data?.email || DEFAULT_CONTACTS.email
  const address = data?.address || DEFAULT_CONTACTS.address

  const contactMethods = [
    { icon: <FiPhone size={22} />, label: 'Телефон', value: phone, href: `tel:${phone.replace(/[\s()-]/g, '')}` },
    { icon: <FiMail size={22} />, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: <FiMapPin size={22} />, label: 'Адрес', value: address, href: null },
  ]

  return (
    <section className={styles.section} id="contact">
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
      <div className={styles.decorDots} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
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
