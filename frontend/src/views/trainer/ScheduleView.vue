<template>
  <div class="trainer-group container">
    <h1 class="section-title">📅 Расписание</h1>

    <div class="auth-form compact-form">
      <div class="form-grid">
        <select v-model="newEntry.groupId" class="form-input">
          <option value="" disabled>Группа</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>

        <input type="date" v-model="newEntry.date" class="form-input" />

        <input type="time" v-model="newEntry.time" class="form-input" />

        <input 
          type="text" 
          v-model="newEntry.location" 
          placeholder="Место (поле/зал)" 
          class="form-input" 
        />

        <select v-model="newEntry.type" class="form-input">
          <option value="game">⚽ Игра</option>
          <option value="physical">🏃 Физра</option>
        </select>
      </div>
      <button @click="saveEntry" class="btn btn--primary" :disabled="!isFormValid">
        Добавить занятие
      </button>
    </div>

    <div class="timeline-container">
      <div class="timeline-scroll">
        <div 
          v-for="day in calendarDays" 
          :key="day.date" 
          class="timeline-day"
          :class="{ 'is-active': day.date === selectedDate }"
          @click="selectedDate = day.date"
        >
          <span class="day-name">{{ day.weekday }}</span>
          <span class="day-number">{{ day.dayNumber }}</span>
          <div v-if="hasTraining(day.date)" class="day-dot"></div>
        </div>
      </div>
    </div>

    <div class="active-day-info">
      <h3 class="date-display">{{ formatFullDate(selectedDate) }}</h3>
      
      <div v-if="filteredSchedule.length === 0" class="no-data">
        На этот день ничего не запланировано
      </div>

      <div 
        v-for="item in filteredSchedule" 
        :key="item.id" 
        class="modern-card"
        :class="item.type"
      >
        <div class="card-accent"></div>
        <div class="card-content">
          <span class="group-name">{{ getGroupName(item.groupId) }}</span>
          <span class="training-title">
            {{ item.type === 'game' ? 'Футбольная тренировка (игра)' : 'Физическая подготовка' }}
          </span>
          
          <div class="card-footer">
            <span>🕒 {{ item.time || 'Время не указано' }}</span>
            <span>📍 {{ item.location || 'Место не указано' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTrainerStore } from '@/stores/trainer'

const store = useTrainerStore()
const groups = computed(() => store.groups)
const selectedDate = ref(new Date().toISOString().split('T')[0])

const newEntry = ref({ 
  groupId: '', 
  date: '', 
  type: 'game',
  time: '18:00', // Значение по умолчанию
  location: 'Главное поле' // Значение по умолчанию
})

// Обновляем валидацию: теперь нужно, чтобы и время с местом были заполнены
const isFormValid = computed(() => {
  return newEntry.value.groupId && 
         newEntry.value.date && 
         newEntry.value.time && 
         newEntry.value.location
})

// В функции saveEntry данные автоматически уйдут в стор
function saveEntry() {
  if (isFormValid.value) {
    store.addScheduleEntry({ ...newEntry.value })
    // Очищаем поля после добавления (кроме тех, что часто повторяются)
    newEntry.value.date = ''
  }
}

// Генерируем дни для слайдера (на 2 недели вперед)
const calendarDays = computed(() => {
  const days = []
  const start = new Date()
  start.setDate(start.getDate() - 3) // Начинаем чуть раньше текущего дня

  for (let i = 0; i < 14; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const iso = d.toISOString().split('T')[0]
    days.push({
      date: iso,
      dayNumber: d.getDate(),
      weekday: d.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase()
    })
  }
  return days
})

const filteredSchedule = computed(() => {
  return store.schedule.filter(item => item.date === selectedDate.value)
})

function hasTraining(date) {
  return store.schedule.some(item => item.date === date)
}

function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

function getGroupName(id) {
  return groups.value.find(g => g.id === id)?.name || 'Группа'
}
</script>