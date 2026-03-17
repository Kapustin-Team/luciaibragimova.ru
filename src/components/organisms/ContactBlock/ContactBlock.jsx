'use client'
import styles from './ContactBlock.module.sass'

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
)
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
)
const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
)

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.756l-1.683 7.927c-.126.564-.457.703-.926.437l-2.56-1.886-1.236 1.19c-.137.137-.252.252-.517.252l.184-2.61 4.752-4.293c.207-.184-.045-.286-.32-.102L7.9 14.493l-2.51-.784c-.546-.17-.558-.546.114-.809l9.804-3.78c.455-.165.854.102.622.636z"/></svg>
)
const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.478 2 2 6.477 2 12.003c0 1.77.463 3.508 1.343 5.029L2 22l5.09-1.332A9.955 9.955 0 0012.004 22C17.528 22 22 17.522 22 11.997 22 6.477 17.528 2 12.004 2z"/></svg>
)
const VKIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.112 2.712-2.688 4.473-.51.51-.742.672-1.02.672-.14 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.557.258-.557.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.406.836-.742 0-2.548-2.724-3.619-5.842-.21-.607-.42-.852-.981-.852H2.757c-.627 0-.752.295-.752.619 0 .58.742 3.45 3.455 7.25C7.339 16.533 9.886 18 12.208 18c1.389 0 1.56-.312 1.56-.85v-1.96c0-.626.132-.752.573-.752.325 0 .882.163 2.183 1.42C17.98 17.31 18.217 18 18.983 18h2.192c.626 0 .939-.312.759-.928-.197-.613-.905-1.504-1.845-2.56-.51-.602-1.275-1.25-1.507-1.575-.325-.417-.232-.603 0-.974 0 0 2.667-3.76 2.997-5.108z"/></svg>
)

const contactMethods = [
  { icon: <PhoneIcon />, label: 'Телефон', value: '+7 (343) 000-00-00', href: 'tel:+73430000000' },
  { icon: <MailIcon />, label: 'Email', value: 'hello@luciaibragimova.ru', href: 'mailto:hello@luciaibragimova.ru' },
  { icon: <MapPinIcon />, label: 'Адрес', value: 'Екатеринбург', href: null },
]

const socials = [
  { icon: <TelegramIcon />, label: 'Telegram', href: 'https://t.me/luciaibragimova' },
  { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/73430000000' },
  { icon: <VKIcon />, label: 'ВКонтакте', href: 'https://vk.com/luciaibragimova' },
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
