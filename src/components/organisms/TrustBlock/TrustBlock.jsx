'use client'
import styles from './TrustBlock.module.sass'

const HeartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
)
const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
)
const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
)
const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)

const ICON_MAP = { heart: HeartIcon, users: UsersIcon, book: BookIcon, shield: ShieldIcon }

const DEFAULT_STATS = [
  { icon: 'heart', number: '25+', label: 'лет опыта помощи семьям' },
  { icon: 'users', number: '3677+', label: 'семьям помогли восстановить детско-родительские отношения' },
  { icon: 'book', number: '14', label: 'авторских программ' },
  { icon: 'shield', number: '10+', label: 'лет работы с трудными подростками' },
]

export default function TrustBlock({ data } = {}) {
  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {stats.map(({ icon, number, label }) => {
            const Icon = ICON_MAP[icon] || HeartIcon
            return (
              <div key={label} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon />
                </div>
                <span className={styles.number}>{number}</span>
                <p className={styles.label}>{label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
