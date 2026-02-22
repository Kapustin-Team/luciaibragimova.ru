import s from './TopBanner.module.sass'

export default function TopBanner() {
  return (
    <div className={s.banner}>
      <span className={s.text}>Get 50% off Pluralsight plans.</span>
    </div>
  )
}
