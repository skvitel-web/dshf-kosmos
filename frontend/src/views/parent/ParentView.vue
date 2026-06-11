<template>
  <div class="client-dashboard container">
    <header class="hero" style="padding: 2rem 0 1rem;">
      <div class="stat-label">Личный кабинет родителя</div>
      <h1 class="hero__title">Управление обучением</h1>
      <p class="hero__subtitle">Отслеживание успехов, расписания и финансов ваших детей</p>
    </header>

    <section v-if="myChildren.length > 1" class="children-selector" style="margin-bottom: 2.5rem; text-align: center;">
      <span class="auth-footer" style="display: block; margin-bottom: 0.5rem;">Выбрать ребенка:</span>
      <div class="mode-switcher" style="justify-content: center; display: inline-flex;">
        <button 
          v-for="child in myChildren" 
          :key="child.id"
          @click="selectedChildId = child.id" 
          :class="['mode-btn', { active: selectedChildId === child.id }]"
        >
          🏃 {{ child.firstName }}
        </button>
      </div>
    </section>

    <div v-if="currentChild" class="child-data-block">
      
      <div style="text-align: center; margin-bottom: 2rem;">
        <p class="hero__subtitle" style="font-size: 1.1rem;">
          Текущий ученик: <strong>{{ currentChild.lastName }} {{ currentChild.firstName }}</strong> <br>
          Группа: {{ currentChild.groupName }} | Тренер: {{ currentChild.trainerName }}
        </p>
      </div>

      <section class="statistics-grid features__grid" style="margin-bottom: 3rem;">
        <div class="feature-card">
          <div class="stat-value" style="color: var(--color-field-500); font-size: 2.2rem; font-weight: 800;">
            {{ currentChild.stats.present }}
          </div>
          <div class="stat-label">Посещено</div>
        </div>

        <div class="feature-card">
          <div class="stat-value" style="color: #fbbf24; font-size: 2.2rem; font-weight: 800;">
            {{ currentChild.stats.excellent }}
          </div>
          <div class="stat-label">«Пятерки» ★</div>
        </div>

        <div class="feature-card">
          <div class="stat-value" style="color: #ef4444; font-size: 2.2rem; font-weight: 800;">
            {{ currentChild.stats.absent }}
          </div>
          <div class="stat-label">Пропуски</div>
        </div>

        <div class="feature-card">
          <div class="stat-value" style="color: #60a5fa; font-size: 2.2rem; font-weight: 800;">
            {{ currentChild.stats.late }}
          </div>
          <div class="stat-label">Опоздания</div>
        </div>
      </section>

      <section class="finance-section" style="margin-bottom: 3rem;">
        <h2 class="sub-section-title">Абонемент: {{ currentChild.firstName }}</h2>
        <div class="modern-card" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div class="card-accent" style="background: var(--color-field-500);"></div>
          <div>
            <div style="font-weight: 700; font-size: 1.2rem;">{{ currentChild.finance.tariff }}</div>
            <div class="auth-footer" style="margin: 0; text-align: left;">Оплачено до: {{ currentChild.finance.validUntil }}</div>
          </div>
          <div style="text-align: right;">
            <div class="stat-value">Осталось: {{ currentChild.finance.lessonsLeft }}</div>
            <span class="status-badge status-success">Активен</span>
          </div>
        </div>
      </section>

      <section class="attendance-history" style="margin-bottom: 3.5rem;">
        <h2 class="sub-section-title">Последние занятия</h2>
        <div class="history-list">
          <div 
            v-for="entry in currentChild.history" 
            :key="entry.date" 
            class="modern-card" 
            style="margin-bottom: 1rem;"
          >
            <div class="card-accent" :style="{ background: entry.status === 'present' ? 'var(--color-field-500)' : '#ef4444' }"></div>
            <div class="card-content" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600;">{{ entry.date }}</div>
                <div class="auth-footer" style="margin: 0; text-align: left;">{{ entry.type }}</div>
              </div>
              <div style="display: flex; gap: 10px; align-items: center;">
                <span v-if="entry.excellent" class="mark-btn excellent active" style="width: 30px; height: 30px; font-size: 0.7rem;">5★</span>
                <span :class="['status-badge', entry.status === 'present' ? 'status-success' : 'status-danger']">
                  {{ entry.status === 'present' ? 'Был' : 'Пропуск' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <section class="request-form-section" style="margin-bottom: 3.5rem;">
      <h2 class="sub-section-title">📝 Подать заявку на обучение еще одного ребенка</h2>
      
      <div class="auth-form compact-form" style="max-width: 100%;">
        <div class="form-grid">
          <input v-model="newRequest.lastName" placeholder="Фамилия ребенка *" class="form-input" required />
          <input v-model="newRequest.firstName" placeholder="Имя ребенка *" class="form-input" required />
          <input v-model="newRequest.birthDate" type="date" placeholder="Дата рождения *" class="form-input" required />
          
          <select v-model="newRequest.targetGroup" class="form-input" required>
            <option value="" disabled selected>Выберите желаемую группу *</option>
            <option value="Младшая (А)">Младшая группа (6-8 лет)</option>
            <option value="Средняя (Б)">Средняя группа (9-12 лет)</option>
            <option value="Старшая (В)">Старшая группа (13-16 лет)</option>
          </select>
        </div>

        <button 
          @click="submitRequest" 
          class="btn btn--primary" 
          :disabled="!newRequest.lastName || !newRequest.firstName || !newRequest.birthDate || !newRequest.targetGroup"
          style="margin-top: 1.5rem; width: 100%;"
        >
          Отправить заявку в академию
        </button>
      </div>
    </section>

    <footer style="margin: 4rem 0 2rem; text-align: center;">
      <router-link to="/" class="btn btn--outline">← На главную</router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Хранилище привязанных детей родителя (имитация структуры бэкенда)
const myChildren = ref([
  {
    id: 'child_1',
    firstName: 'Артём',
    lastName: 'Иванов',
    groupName: 'Младшая (А)',
    trainerName: 'Александр Космос',
    stats: { present: 12, excellent: 5, absent: 2, late: 0 },
    finance: { tariff: 'Стандарт: 12 занятий', validUntil: '15.06.2026', lessonsLeft: 4 },
    history: [
      { date: '12 Мая, Вторник', type: '⚽ Футбольная игра', status: 'present', excellent: true },
      { date: '10 Мая, Воскресенье', type: '🏃 Физ. подготовка', status: 'absent', excellent: false }
    ]
  },
  {
    id: 'child_2',
    firstName: 'Мария',
    lastName: 'Иванова',
    groupName: 'Средняя (Б)',
    trainerName: 'Дмитрий Волков',
    stats: { present: 18, excellent: 9, absent: 0, late: 1 },
    finance: { tariff: 'Продвинутый: 24 занятия', validUntil: '30.06.2026', lessonsLeft: 14 },
    history: [
      { date: '14 Мая, Четверг', type: '⚽ Тактическая тренировка', status: 'present', excellent: true },
      { date: '11 Мая, Понедельник', type: '🏃 Игровая сессия', status: 'present', excellent: false }
    ]
  }
])

// Переменная для хранения ID текущего выбранного ребенка
const selectedChildId = ref(myChildren.value[0]?.id || null)

// Вычисляемый объект текущего ребенка для отображения на странице
const currentChild = computed(() => {
  return myChildren.value.find(c => c.id === selectedChildId.value) || null
})

// Модель для формы новой заявки
const newRequest = ref({
  lastName: '',
  firstName: '',
  birthDate: '',
  targetGroup: ''
})

function submitRequest() {
  if (newRequest.value.lastName && newRequest.value.firstName && newRequest.value.birthDate && newRequest.value.targetGroup) {
    alert('Заявка успешно отправлена! Когда администратор одобрит её, ребенок появится в вашем переключателе сверху.')
    newRequest.value = { lastName: '', firstName: '', birthDate: '', targetGroup: '' }
  }
}
</script>