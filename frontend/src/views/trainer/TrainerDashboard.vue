<template>
  <div class="trainer-dashboard container">
    <header class="hero" style="padding: 2rem 0;">
      <h1 class="hero__title">Блок тренера</h1>
      <p class="hero__subtitle">Управление тренировками, расписанием и судейством</p>
    </header>

    <section class="features">
      <div class="features__grid">
        
        <router-link to="/trainer/schedule" class="feature-card">
          <div class="feature-card__icon">📅</div>
          <h3 class="feature-card__title">Расписание</h3>
          <p class="auth-footer" style="margin: 0; font-size: 0.8rem;">Планирование занятий</p>
        </router-link>

        <router-link to="/trainer/referee" class="feature-card">
          <div class="feature-card__icon">⚖️</div>
          <h3 class="feature-card__title">Режим судьи</h3>
          <p class="auth-footer" style="margin: 0; font-size: 0.8rem;">Проведение матчей</p>
        </router-link>

      </div>
    </section>

    <section class="groups-section" style="margin-top: 3rem;">
      <h2 class="sub-section-title" style="text-align: center;">Ваши группы</h2>
      
      <div class="features__grid">
        <router-link 
          v-for="group in groups" 
          :key="group.id" 
          :to="`/trainer/group/${group.id}`" 
          class="feature-card group-card"
        >
          <div class="student-main-info">
             <span class="student-group">Группа</span>
             <h3 class="student-name">{{ group.name }}</h3>
          </div>
          
          <div class="student-footer" style="width: 100%; border-top: 1px solid var(--color-space-700); padding-top: 1rem;">
            <div class="stats-mini">
              <span>📝 Журнал</span>
            </div>
            <span class="btn--sm btn--primary" style="border-radius: 6px;">Открыть</span>
          </div>
        </router-link>
      </div>
    </section>

    <footer style="margin-top: 4rem; text-align: center;">
      <router-link to="/" class="btn btn--outline">
        ← На главную
      </router-link>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTrainerStore } from '@/stores/trainer'

const store = useTrainerStore()
const groups = computed(() => store.groups)
</script>

<style scoped>
/* Дополнительных стилей не добавляем, используем толькоsections.css */
.group-card {
  align-items: flex-start;
  text-align: left;
}
</style>