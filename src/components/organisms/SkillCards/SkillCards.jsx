import s from './SkillCards.module.sass'

const cards = [
  {
    icon: '/images/ai-icon.svg',
    title: 'AI + Data',
    desc: 'Work smarter (not harder) with artificial intelligence and keep up with Claude AI and more in this rapidly growing tech field.',
    color: '#e80a89',
  },
  {
    icon: '/images/software-icon.svg',
    title: 'Software dev',
    desc: 'Build fluency in languages like C#, Java, Angular, and JavaScript and keep evolving as they do to develop efficiently.',
    color: '#00d4aa',
  },
  {
    icon: '/images/cloud-icon.svg',
    title: 'Cloud + IT Ops',
    desc: 'From AWS to Google Cloud and everything in between, expand your cloud clout for expert-level professional returns.',
    color: '#6e5ff5',
  },
  {
    icon: '/images/security-icon.svg',
    title: 'Security',
    desc: 'Stop cyber attacks in their tracks and secure critical skills to position yourself as the expert at keeping data under lock and key.',
    color: '#ff6b35',
  },
]

export default function SkillCards() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.grid}>
          {cards.map((card) => (
            <div key={card.title} className={s.card}>
              <div className={s.iconWrap} style={{ background: card.color }}>
                <img src={card.icon} alt="" width={48} height={48} />
              </div>
              <h3 className={s.cardTitle}>{card.title}</h3>
              <p className={s.cardDesc}>{card.desc}</p>
              <a href="#" className={s.link}>Find out how →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
