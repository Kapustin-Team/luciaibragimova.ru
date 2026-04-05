'use client'
import { useState } from 'react'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './ContactBlock.module.sass'
import submitContact from '@/lib/submitContact'

const PLACEHOLDER_QUESTIONS = [
  { id: 'q1', label: 'Что вас привело к нам?', placeholder: 'Например: хочу наладить отношения с подростком' },
  { id: 'q2', label: 'Пробовали ли вы решить проблему раньше?', placeholder: 'Если да — расскажите кратко' },
  { id: 'q3', label: 'Что для вас будет лучшим результатом?', placeholder: 'Опишите идеальный итог' },
]

export default function ContactBlock() {
  const [form, setForm] = useState({ name: '', phone: '', message: '', q1: '', q2: '', q3: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    setSending(true)
    setError(null)

    try {
      const answers = PLACEHOLDER_QUESTIONS
        .map((q) => form[q.id] ? `${q.label}\n${form[q.id]}` : null)
        .filter(Boolean)
        .join('\n\n')

      await submitContact({
        name: form.name,
        phone: form.phone,
        message: form.message,
        quizAnswers: answers || undefined,
      })

      setSent(true)
    } catch {
      setError('Не удалось отправить. Попробуйте ещё раз.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <SectionReveal className={s.section} id="contact" variant="mask">
        <div className={s.successCard}>
          <div className={s.successIcon}>✓</div>
          <h2 className={s.successTitle}>Заявка отправлена!</h2>
          <p className={s.successText}>Мы свяжемся с вами в ближайшее время</p>
        </div>
      </SectionReveal>
    )
  }

  return (
    <SectionReveal className={s.section} id="contact" variant="mask">
      <form className={s.inner} onSubmit={handleSubmit}>
        {/* Left — quiz questions */}
        <div className={s.quizSide}>
          <h3 className={s.sideTitle}>Расскажите о себе</h3>
          <p className={s.sideHint}>Необязательно, но поможет нам подготовиться к разговору</p>
          <div className={s.questions}>
            {PLACEHOLDER_QUESTIONS.map((q) => (
              <div key={q.id} className={s.questionGroup}>
                <label className={s.questionLabel} htmlFor={q.id}>{q.label}</label>
                <textarea
                  id={q.id}
                  name={q.id}
                  rows={2}
                  placeholder={q.placeholder}
                  className={s.questionInput}
                  value={form[q.id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div className={s.formSide}>
          <h3 className={s.sideTitle}>Оставьте заявку</h3>
          <p className={s.sideHint}>Мы перезвоним в течение часа</p>
          <div className={s.fields}>
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              className={s.input}
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="+7 (___) ___-__-__"
              className={s.input}
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Комментарий (необязательно)"
              className={s.textarea}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          {error && <p className={s.error}>{error}</p>}
          <button type="submit" className={s.submitBtn} disabled={sending}>
            {sending ? 'Отправляем...' : 'Отправить заявку'}
          </button>
        </div>
      </form>
    </SectionReveal>
  )
}
