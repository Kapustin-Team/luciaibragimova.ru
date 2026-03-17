# Hardcoded Content Audit Report

**Date:** 2026-03-17
**Scope:** All JSX components in `src/components/organisms/`, `src/app/` pages, `ClientHome.jsx`, `CoursePageClient.jsx`
**Goal:** Identify all hardcoded Russian text/content that should come from Strapi CMS

---

## Table of Contents

1. [Summary](#summary)
2. [BLOCK_MAP Reference](#block_map-reference)
3. [Component Audits](#component-audits)
   - [Header](#header) (HIGH priority)
   - [Footer](#footer) (HIGH priority)
   - [Hero](#hero) (HIGH priority)
   - [CoursePageClient](#coursepageclient) (HIGH priority)
   - [ContactBlock](#contactblock) (HIGH priority)
   - [About](#about)
   - [Consultations](#consultations)
   - [Courses](#courses)
   - [Cta](#cta)
   - [Directions](#directions)
   - [Faq](#faq)
   - [FeaturedCourse](#featuredcourse)
   - [PinkBanner](#pinkbanner)
   - [Reviews](#reviews)
   - [TopBanner](#topbanner)
   - [TrustBlock](#trustblock)
   - [Privacy Page](#privacy-page)
   - [Terms Page](#terms-page)
   - [Layout](#layout)
4. [Clean Files](#clean-files)

---

## Summary

| Priority | Count | Description |
|----------|-------|-------------|
| **HIGH** | 5 | Components with no Strapi integration or heavily hardcoded visible content |
| **MEDIUM** | 11 | Components with fallback defaults that should eventually be removed |
| **LOW** | 3 | Metadata, aria labels, legal pages |

**Total hardcoded Russian strings found: ~200+**

### Critical Findings

1. **Header.jsx** and **Footer.jsx** have **zero Strapi integration** - all content hardcoded
2. **CoursePageClient.jsx** has **31+ hardcoded strings** for section titles, labels, descriptions
3. **Hero.jsx** has **7 hardcoded strings** in info cards that bypass the Strapi data prop
4. **Privacy** and **Terms** pages are entirely hardcoded legal text (~50 strings)
5. All other organism components accept Strapi `data` props but contain extensive **fallback defaults**

---

## BLOCK_MAP Reference

**File:** `src/app/ClientHome.jsx` (lines 20-34)

| Strapi `__component` | React Component | Strapi Data Passed |
|-----------------------|-----------------|-------------------|
| `blocks.top-banner` | TopBanner | block data + shared context |
| `blocks.hero` | Hero | block data + shared context |
| `blocks.directions-grid` | Directions | block data + shared context (directions) |
| `blocks.pink-banner` | PinkBanner | block data + shared context |
| `blocks.about` | About | block data + shared context |
| `blocks.featured-course` | FeaturedCourse | block data + shared context |
| `blocks.courses-catalog` | Courses | block data + shared context (courses) |
| `blocks.reviews-section` | Reviews | block data + shared context (reviews) |
| `blocks.cta-section` | Cta | block data + shared context |
| `blocks.faq-section` | Faq | block data + shared context (faqs) |
| `blocks.trust-block` | TrustBlock | block data + shared context |
| `blocks.consultations-section` | Consultations | block data + shared context (consultationTypes) |
| `blocks.contact-section` | ContactBlock | block data + shared context |

---

## Component Audits

---

### Header

- **File:** `src/components/organisms/Header/Header.jsx`
- **Accepts Strapi data prop:** NO
- **Priority:** HIGH

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 9 | `'О нас'` | Navigation label |
| 10 | `'Курсы'` | Navigation label |
| 11 | `'Консультации'` | Navigation label |
| 12 | `'Специалисты'` | Navigation label |
| 13 | `'Контакты'` | Navigation label |
| 14 | `'Отзывы'` | Navigation label |
| 57 | `'Люция Ибрагимова'` | Logo alt text |
| 58 | `'Люция Ибрагимова'` | Logo text / brand name |
| 83 | `'Выбрать курс'` | Mobile CTA button |
| 98 | `'Выбрать курс'` | Desktop CTA button |
| 103 | `'Закрыть меню'` / `'Открыть меню'` | Aria labels |

**Notes:** Entire navigation structure is hardcoded in `navLinks` array. No Strapi content type exists for header/navigation. Should be refactored to accept a `data` prop from a Strapi "Header" single type.

---

### Footer

- **File:** `src/components/organisms/Footer/Footer.jsx`
- **Accepts Strapi data prop:** NO
- **Priority:** HIGH

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 26 | `'Направления'` | Column heading |
| 28 | `'Рождение семьи'` | Direction link |
| 29 | `'Здоровое взросление'` | Direction link |
| 30 | `'Развитие'` | Direction link |
| 31 | `'Трансформация'` | Direction link |
| 35 | `'Курсы'` | Column heading |
| 37 | `'Вовремя'` | Course link |
| 38 | `'Мама здесь'` | Course link |
| 39 | `'Свои люди'` | Course link |
| 40 | `'Анти-выгорание'` | Course link |
| 41 | `'Все курсы'` | Course link |
| 45 | `'О школе'` | Column heading |
| 47 | `'О Люции'` | Navigation link |
| 48 | `'Центр «Время первых»'` | Navigation link |
| 49 | `'Отзывы'` | Navigation link |
| 50 | `'Контакты'` | Navigation link |
| 78 | `'Будьте в курсе новых программ'` | Newsletter title |
| 80 | `'Получайте полезные материалы о воспитании и семейной психологии.'` | Newsletter description |
| 82 | `'Подписаться'` | Button label |
| 95 | `'Школа Люции Ибрагимовой'` | Brand name |
| 96 | `'© 2026 Люция Ибрагимова. Все права защищены'` | Copyright |
| 99 | `'Политика конфиденциальности'` | Legal link |
| 100 | `'Оферта'` | Legal link |

Also: `COURSE_SLUGS` mapping (lines 5-11) hardcodes course name-to-slug associations.

**Notes:** Zero Strapi integration. All navigation, course names, directions, newsletter text, and legal links are hardcoded. Footer should receive directions/courses from props (already available as shared context in ClientHome) and footer-specific content from a Strapi single type.

---

### Hero

- **File:** `src/components/organisms/Hero/Hero.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** HIGH

**Fallback defaults (use `||` pattern with Strapi):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 6 | `'Авторские программы семейного психолога с 25-летним опытом'` | DEFAULT_SUBTITLES[0] |
| 7 | `'Сотни семей уже прошли этот путь к доверию'` | DEFAULT_SUBTITLES[1] |
| 8 | `'Индивидуальный подход к каждой семье'` | DEFAULT_SUBTITLES[2] |
| 18 | `'Путь к благополучию\nсемьи'` | Fallback title |
| 21 | `'Выбрать курс'` | Fallback CTA primary |
| 23 | `'Не знаю, с чего начать'` | Fallback CTA secondary |

**Hardcoded (no Strapi fallback -- always rendered):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 70 | `'Екатеринбург · онлайн по всему миру'` | Location text |
| 93 | `'Онлайн-курсы'` | Info card title |
| 96 | `'Авторские программы по семейной психологии. Смотрите в удобном темпе.'` | Info card description |
| 107 | `'Консультации'` | Info card title |
| 110 | `'Индивидуальная работа с психологом. Онлайн или очно в Екатеринбурге.'` | Info card description |
| 122 | `'Живые тренинги'` | Info card title |
| 125 | `'Интенсивы и группы для глубокой трансформации. Для всей семьи.'` | Info card description |

**Notes:** The three info cards (Онлайн-курсы, Консультации, Живые тренинги) and the location text are fully hardcoded with no Strapi path. These should be added to the `blocks.hero` Strapi component as a repeatable "cards" field.

---

### CoursePageClient

- **File:** `src/app/courses/[slug]/CoursePageClient.jsx`
- **Accepts Strapi data prop:** YES (`course` object)
- **Priority:** HIGH

**Mapping/lookup constants (hardcoded Russian):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 8 | `'Онлайн'`, `'Офлайн'`, `'Гибрид'` | FORMAT_LABELS values |
| 28-42 | `'Рождение семьи'`, `'Здоровое взросление'`, `'Развитие'`, `'Трансформация'` | SLUG_TO_DIR mapping |
| 46-50 | Same direction names | DIRECTION_THEMES keys |
| 78 | `'Рождение семьи'` | Default theme fallback |

**Section titles and descriptions (fully hardcoded, no Strapi field):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 113 | `'Записаться на курс'` | Button label |
| 115 | `'Программа курса'` | Button label |
| 133 | `'Формат'` | Info label |
| 142 | `'Длительность'` | Info label |
| 151 | `'Занятий'` | Info label |
| 160 | `'Участники'` | Info label |
| 161 | `'человек'` | Count suffix |
| 173 | `'Для кого этот курс'` | Section title |
| 174 | `'Курс разработан с учётом потребностей разных людей в разных жизненных ситуациях.'` | Section subtitle |
| 194 | `'Знакомые ситуации?'` | Section title |
| 195 | `'Если хотя бы несколько пунктов откликаются — этот курс создан именно для вас.'` | Section description |
| 217 | `'Что вы получите'` | Section title |
| 218 | `'Конкретные результаты после прохождения программы'` | Section subtitle |
| 237 | `'Программа курса'` | Section title |
| 238 | `'Структурированная программа, которая ведёт вас шаг за шагом.'` | Section subtitle |
| 244 | `'Модуль'` (prefix) | Module label |
| 264 | `'Методики и подходы'` | Section title |
| 265 | `'Курс основан на проверенных психологических методиках и современных научных подходах.'` | Section subtitle |
| 284 | `'Выберите тариф'` | Section title |
| 285 | `'Выберите формат участия, который подходит именно вам.'` | Section subtitle |
| 298 | `'Популярный'` | Popular badge |
| 312 | `'Выбрать тариф'` | Button label |
| 327 | `'Отзывы участников'` | Section title |
| 328 | `'Реальные отзывы от тех, кто уже прошёл курс'` | Section subtitle |
| 335 | `'Отзыв'` (prefix) | Image alt text |
| 352 | `'Важно знать'` | Section title |
| 353 | `'Обратите внимание перед записью на курс.'` | Section description |
| 379 | `'Готовы начать свой путь?'` | CTA title |
| 380 | `'Запишитесь на курс «{title}» и сделайте первый шаг к изменениям'` | CTA description |
| 382 | `'Записаться на курс'` | CTA button |

**Notes:** This is the most heavily hardcoded component. All section titles, subtitles, labels, and button text are baked in. These should be either: (a) added to the course content type in Strapi as section-level fields, or (b) managed via a "course page template" single type in Strapi.

---

### ContactBlock

- **File:** `src/components/organisms/ContactBlock/ContactBlock.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** HIGH

**Fallback defaults (use `||`):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 7 | `'+7 (343) 000-00-00'` | Default phone |
| 8 | `'hello@luciaibragimova.ru'` | Default email |
| 9 | `'Екатеринбург'` | Default address |
| 19 | `'Связаться с нами'` | Default title |
| 20 | `'Остались вопросы? Мы всегда на связи'` | Default subtitle |

**Fully hardcoded (no Strapi field):**

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 13 | `'Telegram'` | Social label |
| 14 | `'WhatsApp'` | Social label |
| 15 | `'ВКонтакте'` | Social label |
| 26 | `'Телефон'` | Contact label |
| 27 | `'Email'` | Contact label |
| 28 | `'Адрес'` | Contact label |
| 59 | `'Мы в соцсетях'` | Section label |
| 72 | `'Ваше имя'` | Form field label |
| 73 | `'Люция'` | Form placeholder |
| 76 | `'Телефон'` | Form field label |
| 77 | `'+7 (___) ___-__-__'` | Form placeholder |
| 80 | `'Сообщение'` | Form field label |
| 81 | `'Расскажите, чем мы можем помочь...'` | Textarea placeholder |
| 83 | `'Отправить'` | Submit button |

**Notes:** Social links, form labels, and placeholders are hardcoded. Social links should come from a Strapi single type (e.g., "Global" or "Contact" content type). Form labels could arguably stay hardcoded (MEDIUM priority).

---

### About

- **File:** `src/components/organisms/About/About.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Семейный психолог с 25-летним стажем'` | DEFAULT_HIGHLIGHTS |
| 6 | `'Автор книг о взаимоотношениях с подростками'` | DEFAULT_HIGHLIGHTS |
| 7 | `'Руководитель центра «Время первых»'` | DEFAULT_HIGHLIGHTS |
| 8 | `'Работа с подростками на учёте КДН и ПДН'` | DEFAULT_HIGHLIGHTS |
| 9 | `'Более 3 677 семей восстановили отношения'` | DEFAULT_HIGHLIGHTS |
| 13 | `'О Люции'` | Fallback label |
| 14 | `'Помогаю семьям вернуть близость и доверие'` | Fallback title |
| 15 | `'Люция Ибрагимова — семейный психолог с 25-летним опытом...'` (long) | Fallback description |
| 23 | `'Люция Ибрагимова'` | Image alt text |

**Notes:** All main content has proper `||` fallback from Strapi `data` prop. Fallback defaults should be removed once Strapi data is reliably populated.

---

### Consultations

- **File:** `src/components/organisms/Consultations/Consultations.jsx`
- **Accepts Strapi data prop:** YES (`data`, `consultationTypes`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 15 | `'Индивидуальная консультация'` | FALLBACK title |
| 16 | `'Разбор вашей ситуации один на один с Люцией...'` | FALLBACK description |
| 17 | `'60 мин'` | FALLBACK duration |
| 18 | `'Онлайн / Zoom'` | FALLBACK format |
| 22 | `'Семейная консультация'` | FALLBACK title |
| 23 | `'Работа с парой или всей семьёй...'` | FALLBACK description |
| 24 | `'90 мин'` | FALLBACK duration |
| 25 | `'Онлайн / Zoom'` | FALLBACK format |
| 29 | `'Консультация по подросткам'` | FALLBACK title |
| 30 | `'Специализированная помощь родителям подростков...'` | FALLBACK description |
| 31 | `'60 мин'` | FALLBACK duration |
| 32 | `'Онлайн / Zoom'` | FALLBACK format |
| 36 | `'Поддерживающая сессия'` | FALLBACK title |
| 37 | `'Короткая сессия для тех, кто уже прошёл курс...'` | FALLBACK description |
| 38 | `'30 мин'` | FALLBACK duration |
| 39 | `'Онлайн / Zoom'` | FALLBACK format |
| 44 | `'Консультации'` | Fallback title |
| 45 | `'Индивидуальный подход к вашей ситуации'` | Fallback subtitle |
| 54 | `'Онлайн / Zoom'` | Inline fallback format |
| 73 | `'·'` | Separator |
| 80 | `'Записаться на консультацию'` | Button label (hardcoded, no fallback) |

**Notes:** FALLBACK_CONSULTATIONS array (4 items x 4 fields) used when `consultationTypes` is empty. Button label on line 80 is fully hardcoded.

---

### Courses

- **File:** `src/components/organisms/Courses/Courses.jsx`
- **Accepts Strapi data prop:** YES (`data`, `courses`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Онлайн'`, `'Офлайн'`, `'Гибрид'` | FORMAT_MAP values |
| 26-40 | `'Рождение семьи'`, `'Здоровое взросление'`, `'Развитие'`, `'Трансформация'` | SLUG_TO_DIR mapping |
| 42 | `'Все'`, `'Рождение семьи'`, `'Здоровое взросление'`, `'Развитие'`, `'Трансформация'` | DIRECTION_NAMES filter options |
| 43 | `'Все'`, `'Онлайн'`, `'Офлайн'`, `'Гибрид'` | FORMAT_NAMES filter options |
| 61 | `'Все курсы и тренинги'` | Fallback title |
| 62 | `'Выберите формат, который подходит именно вам'` | Fallback subtitle |
| 93 | `'Направление:'` | Filter label |
| 107 | `'Формат:'` | Filter label |
| 142 | `'·'` | Separator |
| 149 | `'Подробнее →'` | Card link text |
| 150 | `'Купить'` | Card button label |
| 155 | `'Нет курсов по выбранным фильтрам'` | Empty state message |

**Notes:** Filter options (DIRECTION_NAMES, FORMAT_NAMES) should be derived from Strapi directions/courses data. Labels and button text are hardcoded.

---

### Cta

- **File:** `src/components/organisms/Cta/Cta.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Начните путь\nк гармонии'` | Fallback title |
| 6 | `'Выберите программу — онлайн, офлайн или гибрид.'` | Fallback subtitle |
| 7 | `'Выбрать курс'` | Fallback CTA primary |
| 8 | `'#courses'` | Fallback CTA link |
| 10 | `'#contact'` | Fallback secondary link |

**Notes:** All fields have proper `||` fallback from Strapi. Clean implementation.

---

### Directions

- **File:** `src/components/organisms/Directions/Directions.jsx`
- **Accepts Strapi data prop:** YES (`data`, `directions`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Рождение семьи'` + description | FALLBACK_DIRS[0] |
| 6 | `'Здоровое взросление'` + description | FALLBACK_DIRS[1] |
| 7 | `'Развитие'` + description | FALLBACK_DIRS[2] |
| 8 | `'Трансформация'` + description | FALLBACK_DIRS[3] |
| 13-16 | `'рождение'`, `'семьи'`, `'взросление'`, etc. | LOCAL_IMAGES keywords |
| 43 | `'Направления обучения'` | Fallback title |
| 44 | `'Выберите то, что актуально для вашей семьи'` | Fallback subtitle |
| 68 | `'программы'` | Count suffix |
| 71 | `'Смотреть →'` | Card link text |

**Notes:** FALLBACK_DIRS with 4 directions. LOCAL_IMAGES keyword matching is a workaround for missing Strapi image uploads.

---

### Faq

- **File:** `src/components/organisms/Faq/Faq.jsx`
- **Accepts Strapi data prop:** YES (`data`, `faqs`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Как проходят онлайн-курсы?'` + answer | FALLBACK_FAQS[0] |
| 6 | `'Можно ли оплатить в рассрочку?'` + answer | FALLBACK_FAQS[1] |
| 7 | `'Подойдёт ли мне курс «Вовремя»?'` + answer | FALLBACK_FAQS[2] |
| 8 | `'Есть ли сертификат?'` + answer | FALLBACK_FAQS[3] |
| 9 | `'Как записаться на офлайн-тренинг?'` + answer | FALLBACK_FAQS[4] |
| 10 | `'Можно ли вернуть деньги?'` + answer | FALLBACK_FAQS[5] |
| 11 | `'Нужно ли психологическое образование?'` + answer | FALLBACK_FAQS[6] |
| 20 | `'Частые вопросы'` | Fallback title |

**Notes:** 7 Q&A pairs as fallback. All have proper Strapi integration via `faqs` prop.

---

### FeaturedCourse

- **File:** `src/components/organisms/FeaturedCourse/FeaturedCourse.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'модулей'`, `'20 видео-лекций'` | DEFAULT_FEATURES[0] |
| 6 | `'В своём темпе'`, `'Доступ навсегда'` | DEFAULT_FEATURES[1] |
| 7 | `'100% онлайн'`, `'Чат поддержки'` | DEFAULT_FEATURES[2] |
| 17 | `'Бестселлер'` | Fallback badge label |
| 18 | `'Вовремя'` | Fallback course title |
| 19 | `'Ваш подросток отдаляется, грубит, вредит себе?...'` (long) | Fallback description |
| 20 | `'Записаться на курс'` | Fallback CTA text |
| 23 | `'«Каждый родитель способен стать для подростка опорой...»'` | Fallback quote |
| 24 | `'— Люция Ибрагимова'` | Fallback quote author |
| 47 | `'Системный курс для родителей подростков'` | Fallback subtitle |

**Notes:** Extensive fallback data for a specific course ("Вовремя"). All fields have `||` pattern with Strapi data.

---

### PinkBanner

- **File:** `src/components/organisms/PinkBanner/PinkBanner.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Более <span>500 семей</span> уже прошли путь к гармонии вместе с Люцией'` | Fallback title (contains HTML) |
| 6 | `'25 лет практики. Автор книг. Руководитель центра «Время первых».'` | Fallback description |
| 7 | `'Узнать больше'` | Fallback CTA text |

**Notes:** Clean Strapi integration. Note: uses `dangerouslySetInnerHTML` for title rendering.

---

### Reviews

- **File:** `src/components/organisms/Reviews/Reviews.jsx`
- **Accepts Strapi data prop:** YES (`data`, `reviews`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Анна М.'` / `'Мама подростка'` / review text / `'Вовремя'` | FALLBACK_REVIEWS[0] |
| 6 | `'Елена К.'` / `'Будущая мама'` / review text / `'Мама здесь'` | FALLBACK_REVIEWS[1] |
| 7 | `'Марат И.'` / `'Предприниматель'` / review text / `'Путь'` | FALLBACK_REVIEWS[2] |
| 8 | `'Ольга Д.'` / `'Педагог'` / review text / `'Лёгкость адаптации'` | FALLBACK_REVIEWS[3] |
| 29 | `'Истории учеников'` | Fallback title |
| 30 | `'Реальные результаты реальных людей'` | Fallback subtitle |
| 48 | `'Отзыв'` | Tag label (fully hardcoded) |

**Notes:** 4 fallback reviews with full data. Tag label `'Отзыв'` on line 48 has no Strapi path.

---

### TopBanner

- **File:** `src/components/organisms/TopBanner/TopBanner.jsx`
- **Accepts Strapi data prop:** YES (`data`)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 4 | `'Запишитесь на курс «Вовремя» со скидкой — количество мест ограничено'` | Fallback banner text |

**Notes:** Clean implementation. Single fallback string.

---

### TrustBlock

- **File:** `src/components/organisms/TrustBlock/TrustBlock.jsx`
- **Accepts Strapi data prop:** YES (`data` with `stats` array)
- **Priority:** MEDIUM

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 20 | `'лет опыта помощи семьям'` | DEFAULT_STATS[0] label |
| 21 | `'семьям помогли восстановить отношения'` | DEFAULT_STATS[1] label |
| 22 | `'авторских программ'` | DEFAULT_STATS[2] label |
| 23 | `'лет работы с трудными подростками'` | DEFAULT_STATS[3] label |

**Notes:** Proper conditional: uses `data.stats` if available, else DEFAULT_STATS.

---

### Privacy Page

- **File:** `src/app/privacy/page.jsx`
- **Accepts Strapi data prop:** NO
- **Priority:** LOW

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Политика конфиденциальности — Школа Люции Ибрагимовой'` | Metadata title |
| 13 | `'Политика конфиденциальности'` | Page heading |
| 15-47 | 7 sections of legal text (general provisions, data collection, purposes, protection, third parties, cookies, contacts) | Legal content |
| 47 | `'info@luciaibragimova.ru'` | Contact email |

**Notes:** Entire page is hardcoded legal text. Should be a Strapi single type ("Privacy Policy") for easy updates. Lower priority since legal text changes infrequently.

---

### Terms Page

- **File:** `src/app/terms/page.jsx`
- **Accepts Strapi data prop:** NO
- **Priority:** LOW

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 5 | `'Договор оферты — Школа Люции Ибрагимовой'` | Metadata title |
| 13 | `'Договор публичной оферты'` | Page heading |
| 15-48 | 7 sections of legal text (general provisions, subject, payment, returns, rights, liability, details) | Legal content |
| 47-48 | `'ИП Ибрагимова Л.Р.'`, `'Email: info@luciaibragimova.ru'` | Business details |

**Notes:** Same pattern as Privacy page. Entirely hardcoded.

---

### Layout

- **File:** `src/app/layout.jsx`
- **Accepts Strapi data prop:** NO
- **Priority:** LOW

| Line | Hardcoded String | Type |
|------|-----------------|------|
| 4 | `'Школа Люции Ибрагимовой'` | Default metadata title |
| 5 | `'Авторские программы семейного психолога с 25-летним опытом...'` | Default metadata description |
| 10 | `lang="ru"` | HTML language |

**Notes:** Metadata could come from Strapi "Global" single type. `lang="ru"` is acceptable as hardcoded.

---

## Clean Files

These files contain **no hardcoded content strings**:

| File | Notes |
|------|-------|
| `src/app/page.jsx` | Pure server component, fetches Strapi data |
| `src/app/ClientHome.jsx` | Dynamic block renderer, passes data through |
| `src/app/courses/[slug]/page.jsx` | Server component (except metadata suffix `'Студия Люции Ибрагимовой'` on line 16 and `'Курс не найден'` on line 14) |
| `src/components/atoms/*` | Animation/utility components, no content |

---

## Recommendations

### Phase 1 - Critical (no Strapi integration at all)
1. **Header.jsx** - Create "Header" single type in Strapi with nav links, logo text, CTA label
2. **Footer.jsx** - Create "Footer" single type in Strapi; also wire up existing `directions`/`courses` props for nav links
3. **CoursePageClient.jsx** - Add UI labels/section titles to course content type or create a "Course Page Settings" single type

### Phase 2 - High (hardcoded content bypassing existing Strapi integration)
4. **Hero.jsx** - Add `cards` repeatable component and `location` field to `blocks.hero` in Strapi
5. **ContactBlock.jsx** - Add social links and form config to `blocks.contact-section` in Strapi

### Phase 3 - Medium (fallback defaults to clean up)
6. Remove all `FALLBACK_*` / `DEFAULT_*` arrays once Strapi content is reliably populated
7. Make filter labels, button text, and empty-state messages configurable

### Phase 4 - Low priority
8. **Privacy/Terms pages** - Create Strapi single types for legal pages
9. **Layout.jsx** - Fetch global metadata from Strapi "Global" single type
