import s from './SkillCards.module.sass'

const cards = [
  {
    icon: '/images/ai-icon.svg',
    title: 'Рождение семьи',
    desc: 'Курсы для молодых семей и будущих мам. Подготовка к материнству, гармония в паре, лёгкость первых лет.',
    color: '#e80a89',
  },
  {
    icon: '/images/software-icon.svg',
    title: 'Здоровое взросление',
    desc: 'Работа с подростками, подготовка к ЕГЭ, адаптация к школе. Как сохранить контакт и доверие в сложный период.',
    color: '#00d4aa',
  },
  {
    icon: '/images/cloud-icon.svg',
    title: 'Развитие детей и взрослых',
    desc: 'Тренинги и программы для всей семьи. Уверенность, коммуникация, раскрытие потенциала.',
    color: '#6e5ff5',
  },
  {
    icon: '/images/security-icon.svg',
    title: 'Духовно-нравственная трансформация',
    desc: 'Антивыгорание, путь к себе, обретение внутренней опоры. Программы для глубинной работы над собой.',
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
              <a href="#" className={s.link}>Подробнее →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
