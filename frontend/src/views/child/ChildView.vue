<template>
  <div class="child-dashboard container">
    <header class="hero" style="padding: 2rem 0 1rem;">
      <div class="stat-label">Твой космический профиль</div>
      <h1 class="hero__title">Привет, Иван! 🚀</h1>
      <p class="hero__subtitle">Твой текущий ранг: <strong>Профи</strong></p>
    </header>

    <section v-if="coachAnnouncement" class="coach-announcement" style="margin-bottom: 2.5rem;">
      <div class="modern-card" style="border-left: 4px solid #fbbf24; background: rgba(251, 191, 36, 0.03);">
        <div class="card-content">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.2rem;">📢</span>
            <strong style="color: #fbbf24; font-size: 1.1rem;">Важное объявление от тренера:</strong>
          </div>
          <p style="margin: 0; line-height: 1.5; color: var(--color-text-primary);">
            {{ coachAnnouncement }}
          </p>
        </div>
      </div>
    </section>

    <section class="achievements features__grid" style="margin-bottom: 3rem;">
      <div class="feature-card" style="border-color: #fbbf24;">
        <div class="feature-card__icon" style="font-size: 2.5rem;">⭐</div>
        <h3 class="feature-card__title">5 Звезд</h3>
        <p class="auth-footer" style="margin: 0;">За отличную работу</p>
      </div>

      <div class="feature-card" style="border-color: var(--color-field-500);">
        <div class="feature-card__icon" style="font-size: 2.5rem;">⚽</div>
        <h3 class="feature-card__title">12 Игр</h3>
        <p class="auth-footer" style="margin: 0;">Всего посещено</p>
      </div>

      <div class="feature-card" style="border-color: #60a5fa;">
        <div class="feature-card__icon" style="font-size: 2.5rem;">🔥</div>
        <h3 class="feature-card__title">Ранг: А</h3>
        <p class="auth-footer" style="margin: 0;">Текущий уровень</p>
      </div>
    </section>

    <section class="schedule" style="margin-bottom: 3rem;">
      <h2 class="sub-section-title">Твое расписание</h2>
      
      <div class="timeline-container" style="margin-bottom: 1.5rem;">
        <div class="timeline-scroll">
          <div 
            v-for="day in futureDays" 
            :key="day.date" 
            class="timeline-day"
            :class="{ 'is-active': day.isTraining }"
            @click="selectDay(day)"
            style="cursor: pointer;"
          >
            <span class="day-name">{{ day.weekday }}</span>
            <span class="day-number">{{ day.dayNumber }}</span>
            <div v-if="day.isTraining" class="day-dot"></div>
          </div>
        </div>
      </div>

      <div v-if="selectedDay && selectedDay.isTraining" class="modern-card">
        <div class="card-accent" :style="{ background: getStatusColor(selectedDay.userStatus) }"></div>
        <div class="card-content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem;">Тренировка {{ selectedDay.dayNumber }} числа</h4>
            <span class="auth-footer" style="margin: 0; text-align: left;">
              Статус: <strong>{{ getStatusText(selectedDay.userStatus) }}</strong>
            </span>
          </div>
          
          <div class="mode-switcher" style="margin: 0; gap: 5px;">
            <button 
              @click="setAttendanceStatus(selectedDay, 'will_attend')" 
              :class="['mode-btn', { active: selectedDay.userStatus === 'will_attend' }]"
              style="padding: 0.4rem 1rem; font-size: 0.85rem;"
            >
              👍 Буду
            </button>
            <button 
              @click="setAttendanceStatus(selectedDay, 'absent')" 
              :class="['mode-btn', { active: selectedDay.userStatus === 'absent' }]"
              style="padding: 0.4rem 1rem; font-size: 0.85rem; color: #ef4444;"
            >
              ❌ Не буду
            </button>
          </div>
        </div>
      </div>
    </section>

    <footer style="margin: 4rem 0; text-align: center;">
      <router-link to="/" class="btn btn--outline">← На главную</router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ВАРИАНТ 1: Текст объявления от тренера
const coachAnnouncement = ref('В это воскресенье тренировка пройдет на открытом поле «Космос-Арена». С собой обязательно иметь ветровки и бутылку воды!')

// Данные дней расписания
const futureDays = ref([
  { date: '2026-06-02', dayNumber: 2, weekday: 'ВТ', isTraining: true, userStatus: 'none' },
  { date: '2026-06-03', dayNumber: 3, weekday: 'СР', isTraining: false, userStatus: 'none' },
  { date: '2026-06-04', dayNumber: 4, weekday: 'ЧТ', isTraining: true, userStatus: 'will_attend' },
  { date: '2026-06-05', dayNumber: 5, weekday: 'ПТ', isTraining: false, userStatus: 'none' },
  { date: '2026-06-06', dayNumber: 6, weekday: 'СБ', isTraining: false, userStatus: 'none' },
  { date: '2026-06-07', dayNumber: 7, weekday: 'ВС', isTraining: true, userStatus: 'none' }
])

// Выбранный в календаре день (по умолчанию первая тренировка)
const selectedDay = ref(futureDays.value.find(d => d.isTraining))

function selectDay(day) {
  selectedDay.value = day
}

function setAttendanceStatus(day, status) {
  day.userStatus = status
  alert(`Ваш статус отправлен тренеру: ${getStatusText(status)}`)
}

function getStatusText(status) {
  if (status === 'will_attend') return 'Подтвердил участие 👍'
  if (status === 'absent') return 'Пропустит занятие ❌'
  return 'Не указан (Тренер ждет ответа)'
}

function getStatusColor(status) {
  if (status === 'will_attend') return 'var(--color-field-500)'
  if (status === 'absent') return '#ef4444'
  return '#60a5fa'
}
</script>