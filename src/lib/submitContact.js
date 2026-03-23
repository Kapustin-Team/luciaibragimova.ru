'use server'

import { randomUUID } from 'crypto'

// ─── Telegram ────────────────────────────────────────

async function sendTelegram(message) {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TG_BOT_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    )
    return res.status === 200
  } catch {
    return false
  }
}

function escapeMarkdown(text) {
  if (!text) return ''
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1')
}

// ─── AmoCRM ──────────────────────────────────────────

function preparePhone(phone) {
  const cleaned = phone.replace(/\D/g, '')
  const normalized = cleaned.startsWith('8') && cleaned.length === 11
    ? '7' + cleaned.slice(1)
    : cleaned
  return '+' + normalized
}

async function createAmoCRMLead({ name, phone, note }) {
  if (!process.env.AMOCRM_URL || !process.env.AMOCRM_KEY) return 0

  try {
    const uuid = randomUUID()
    const formattedPhone = preparePhone(phone)

    const res = await fetch(`${process.env.AMOCRM_URL}/leads/unsorted/forms`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AMOCRM_KEY}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify([
        {
          source_uid: uuid,
          source_name: 'Сайт luciaibragimova.ru',
          metadata: {
            form_id: 'contact-form',
            form_name: 'Форма заявки на сайте',
            form_page: 'https://luciaibragimova.ru/',
            ip: '127.0.0.1',
            form_sent_at: Math.floor(Date.now() / 1000),
          },
          _embedded: {
            leads: [{ name: `Заявка с сайта от ${name}` }],
            contacts: [
              {
                name,
                custom_fields_values: [
                  { field_code: 'PHONE', values: [{ value: formattedPhone }] },
                ],
              },
            ],
          },
        },
      ]),
    })

    const data = await res.json()
    const leadId = data._embedded?.unsorted?.[0]?._embedded?.leads?.[0]?.id

    if (leadId && note) {
      fetch(`${process.env.AMOCRM_URL}/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AMOCRM_KEY}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify([{ note_type: 'common', params: { text: note } }]),
      })
    }

    return leadId || 0
  } catch (err) {
    console.error('AmoCRM lead error:', err)
    return 0
  }
}

// ─── Main action ─────────────────────────────────────

export default async function submitContact({ name, phone, message, quizAnswers }) {
  if (process.env.NODE_ENV === 'development') {
    console.log('DEV: submitContact', { name, phone, message, quizAnswers })
    return true
  }

  const safeName = escapeMarkdown(name)
  const safeMessage = escapeMarkdown(message)

  let tgText = `*Заявка с сайта*\n\n*Имя:* ${safeName}\n*Телефон:* ${phone}`
  if (message) tgText += `\n*Комментарий:* ${safeMessage}`
  if (quizAnswers) tgText += `\n\n*Ответы на вопросы:*\n${escapeMarkdown(quizAnswers)}`

  const note = [message, quizAnswers].filter(Boolean).join('\n\n')

  // Fire & forget — не блокируем пользователя
  sendTelegram(tgText)
  createAmoCRMLead({ name, phone, note })

  return true
}
