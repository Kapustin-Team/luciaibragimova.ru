import s from './TopBanner.module.sass'

export default function TopBanner() {
  return (
    <div className={s.banner}>
      <span className={s.text}>Запишитесь на курс «Вовремя» со скидкой — количество мест ограничено</span>
    </div>
  )
}
