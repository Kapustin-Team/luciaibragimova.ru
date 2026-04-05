'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Team.module.sass'

export default function Team({ data, team: teamMembers } = {}) {
  const title = data?.title || 'Наша команда'
  const subtitle = data?.subtitle || 'Специалисты, которым доверяют'
  const [expandedId, setExpandedId] = useState(null)

  const members = (teamMembers || []).map(m => ({
    id: m.id || m.documentId,
    name: m.name,
    role: m.role,
    bio: m.bio,
    specialization: m.specialization,
    photo: m.photo?.url || m.photo?.formats?.medium?.url || m.photo?.formats?.small?.url || null,
  }))

  const handleToggleBio = (id) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  if (!members.length) return null

  return (
    <SectionReveal className={s.section} id="team">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.subtitle}>{subtitle}</p>
        </div>

        <div className={s.track}>
          {members.map((member, i) => (
            <motion.div
              className={s.card}
              key={member.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className={s.cardPhotoWrap}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={s.cardPhoto}
                    loading="lazy"
                  />
                ) : (
                  <div className={s.cardPhotoPlaceholder}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <div className={s.cardOverlay} />
              </div>

              <div className={s.cardBody}>
                <h3 className={s.cardName}>{member.name}</h3>
                <span className={s.cardRole}>{member.role}</span>
                {member.specialization && (
                  <span className={s.cardSpec}>{member.specialization}</span>
                )}

                {member.bio && (
                  <>
                    <button
                      className={s.bioToggle}
                      onClick={() => handleToggleBio(member.id || i)}
                    >
                      {expandedId === (member.id || i) ? 'Скрыть' : 'Подробнее'}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={expandedId === (member.id || i) ? s.bioArrowUp : ''}
                      >
                        <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedId === (member.id || i) && (
                        <motion.p
                          className={s.cardBio}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          {member.bio}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className={s.decor} aria-hidden="true" />
    </SectionReveal>
  )
}
