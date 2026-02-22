'use client'
import s from './Footer.module.sass'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <h3 className={s.logo}>Люция Ибрагимова</h3>
            <p className={s.tagline}>Школа психологии</p>
          </div>
          <div className={s.links}>
            <div className={s.col}>
              <h4>Навигация</h4>
              <a href="#about">О Люции</a>
              <a href="#courses">Курсы</a>
              <a href="#">Блог</a>
              <a href="#">Контакты</a>
            </div>
            <div className={s.col}>
              <h4>Курсы</h4>
              <a href="#">Вовремя</a>
              <a href="#">Мама здесь</a>
              <a href="#">Свои люди</a>
              <a href="#">Все курсы</a>
            </div>
            <div className={s.col}>
              <h4>Контакты</h4>
              <a href="mailto:info@luciaibragimova.ru">info@luciaibragimova.ru</a>
              <a href="#">Telegram</a>
              <a href="#">WhatsApp</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} Люция Ибрагимова. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
