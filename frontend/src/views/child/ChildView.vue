<template>
  <div class="child-dashboard container">
    <header class="hero" style="padding: 2rem 0;">
      <div class="stat-label">Твой космический профиль</div>
      <h1 class="hero__title">Привет, Иван! 🚀</h1>
      <p class="hero__subtitle">Твой текущий ранг: <strong>Профи</strong></p>
    </header>

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
        <h3 class="feature-card__title">98%</h3>
        <p class="auth-footer" style="margin: 0;">Активность</p>
      </div>
    </section>

    <section class="next-training" style="margin-bottom: 3rem;">
      <h2 class="sub-section-title">Следующая тренировка</h2>
      <div class="calendar-card is-today" style="width: 100%; border-radius: 12px;">
        <div class="calendar-date-box">
          <span class="day">14</span>
          <span class="month">Май</span>
        </div>
        <div class="calendar-info-box" style="padding: 1rem 1.5rem;">
          <span class="group-tag">Твоя группа: А</span>
          <h3 class="training-name">⚽ Игровая тренировка</h3>
          <span class="training-time">⏰ Начало в 18:00</span>
          <p class="auth-footer" style="text-align: left; margin: 5px 0 0;">Место: Главная арена</p>
        </div>
      </div>
    </section>

    <section class="full-schedule">
      <h2 class="sub-section-title">Твое расписание</h2>
      <div class="timeline-container">
        <div class="timeline-scroll">
          <div 
            v-for="day in futureDays" 
            :key="day.date" 
            class="timeline-day"
            :class="{ 'is-active': day.isTraining }"
          >
            <span class="day-name">{{ day.weekday }}</span>
            <span class="day-number">{{ day.dayNumber }}</span>
            <div v-if="day.isTraining" class="day-dot"></div>
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
import { ref, computed } from 'vue'

// В будущем здесь будет логика из Pinia
const futureDays = ref([
  { date: '2026-05-12', dayNumber: 12, weekday: 'ВТ', isTraining: true },
  { date: '2026-05-13', dayNumber: 13, weekday: 'СР', isTraining: false },
  { date: '2026-05-14', dayNumber: 14, weekday: 'ЧТ', isTraining: true },
  { date: '2026-05-15', dayNumber: 15, weekday: 'ПТ', isTraining: false },
  { date: '2026-05-16', dayNumber: 16, weekday: 'СБ', isTraining: true },
  { date: '2026-05-17', dayNumber: 17, weekday: 'ВС', isTraining: false },
])
</script>

<style scoped>
/* Дополнительных стилей не вводим, всё берем из sections.css */
.child-dashboard {
  padding-bottom: 5rem;
}
</style>