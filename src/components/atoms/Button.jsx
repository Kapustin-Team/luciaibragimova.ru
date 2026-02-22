import s from './Button.module.sass'

export default function Button({ children, variant = 'primary', href, onClick }) {
  const cls = `${s.btn} ${s[variant]}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}
