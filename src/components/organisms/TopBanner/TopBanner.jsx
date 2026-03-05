import s from './TopBanner.module.sass'

export default function TopBanner({ data } = {}) {
  const text = data?.text || 'Запишитесь на курс «Вовремя» со скидкой — количество мест ограничено'
  const link = data?.link
  const visible = data?.visible !== false

  if (!visible) return null

  return (
    <div className={s.banner}>
      {link ? (
        <a href={link} className={s.text}>{text}</a>
      ) : (
        <span className={s.text}>{text}</span>
      )}
    </div>
  )
}
