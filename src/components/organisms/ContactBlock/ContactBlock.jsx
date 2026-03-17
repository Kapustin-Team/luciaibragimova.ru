'use client'
import { FaTelegramPlane, FaVk } from 'react-icons/fa'

const MaxIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" transform="scale(0.0277)" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
  </svg>
)
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import styles from './ContactBlock.module.sass'

const DEFAULT_CONTACTS = {
  phone: '+7 (343) 000-00-00',
  email: 'hello@luciaibragimova.ru',
  address: 'Екатеринбург',
}

const socials = [
  { icon: <FaTelegramPlane size={20} />, label: 'Telegram', href: 'https://t.me/ibragimovapsy' },
  { icon: <MaxIcon size={20} />, label: 'Max', href: 'https://max.me/ibragimovapsy' },
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
