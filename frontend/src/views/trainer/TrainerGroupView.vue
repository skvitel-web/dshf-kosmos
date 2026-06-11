<template>
  <div class="trainer-group container">
    <header class="group-header">
      <h1 class="section-title">Группа: {{ group?.name || 'Загрузка...' }}</h1>
    </header>

    <div class="auth-form compact-form" style="margin-bottom: 2.5rem;">
      <h3 style="margin-bottom: 0.5rem; font-size: 1rem;">Объявление для группы</h3>
      <div style="display: flex; gap: 0.5rem;">
        <input 
          v-model="announcementText" 
          placeholder="Текст сообщения..." 
          class="form-input" 
          style="margin-bottom: 0;"
        />
        <button @click="publishAnnouncement" class="btn btn--primary">
          Отправить
        </button>
      </div>
    </div>

    <div class="auth-form compact-form" style="margin-bottom: 2.5rem;">
      <h3 style="margin-bottom: 1rem; font-size: 1rem; color: var(--color-field-500);">+ Быстрое добавление</h3>
      <div class="form-grid">
        <input v-model="newStudent.lastName" placeholder="Фамилия *" class="form-input" />
        <input v-model="newStudent.firstName" placeholder="Имя *" class="form-input" />
        <input v-model="newStudent.contact" placeholder="Телефон" class="form-input" />
      </div>
      <button 
        @click="quickAdd" 
        class="btn btn--primary" 
        :disabled="!newStudent.lastName || !newStudent.firstName"
        style="margin-top: 1rem; width: 100%;"
      >
        Добавить в базу группы
      </button>
    </div>

    <div class="timeline-container" v-if="groupTrainingDays.length">
      <div class="timeline-scroll">
        <div 
          v-for="day in groupTrainingDays" 
          :key="day.date" 
          class="timeline-day"
          :class="{ 'is-active': day.date === selectedDate }"
          @click="selectedDate = day.date"
        >
          <span class="day-name">{{ day.weekday }}</span>
          <span class="day-number">{{ day.dayNumber }}</span>
          <div class="day-dot"></div>
        </div>
      </div>
    </div>

    <div class="attendance-section" v-if="selectedDate">
      <h3 class="date-display">{{ formatFullDate(selectedDate) }}</h3>
      
      <div class="attendance-list">
        <div 
          v-for="child in children" 
          :key="child.id" 
          class="modern-card attendance-card"
          :class="{ 
            'is-present': getStatus(child.id) === 'present',
            'has-excellent': hasExcellent(child.id)
          }"
        >
          <div class="card-accent"></div>
          
          <div class="card-content" @click="toggleMark(child.id)">
            <div class="student-info">
              <span class="student-name">
                {{ child.lastName }} {{ child.firstName }} 
                <small style="margin-left: 10px; font-weight: normal; opacity: 0.6;">
                  ({{ getPreStatusText(child.preStatus || 'none') }})
                </small>
              </span>
              <span class="status-label">
                {{ getStatus(child.id) === 'present' ? 'Присутствует' : 'Отсутствует' }}
              </span>
            </div>
          </div>
          
          <button 
            class="excellent-btn" 
            @click.stop="toggleStar(child.id)"
            :disabled="getStatus(child.id) !== 'present'"
          >
            ★
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="groupTrainingDays.length === 0" class="no-data">
      <p>В расписании пока нет тренировок для этой группы.</p>
      <router-link to="/trainer/schedule" class="btn btn--outline btn--sm" style="margin-top: 1rem;">
        Перейти в расписание
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTrainerStore } from '@/stores/trainer'

const route = useRoute()
const store = useTrainerStore()
const groupId = route.params.id

const announcementText = ref('')

const newStudent = ref({
  lastName: '',
  firstName: '',
  contact: ''
})

const group = computed(() => store.groups.find(g => g.id === groupId))
const children = computed(() => store.children.filter(c => c.groupId === groupId))

const groupTrainingDays = computed(() => {
  const dates = store.schedule
    .filter(item => item.groupId === groupId)
    .map(item => item.date)
  
  const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b))

  return uniqueDates.map(dateStr => {
    const d = new Date(dateStr)
    return {
      date: dateStr,
      dayNumber: d.getDate(),
      weekday: d.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase()
    }
  })
})

const selectedDate = ref('')

onMounted(() => {
  const today = new Date().toISOString().split('T')[0]
  if (groupTrainingDays.value.some(d => d.date === today)) {
    selectedDate.value = today
  } else if (groupTrainingDays.value.length > 0) {
    selectedDate.value = groupTrainingDays.value[0].date
  }
})

function getStatus(childId) {
  const att = store.getAttendance(childId, groupId, selectedDate.value)
  return att?.status || 'absent'
}

function hasExcellent(childId) {
  const att = store.getAttendance(childId, groupId, selectedDate.value)
  return att?.excellent === true
}

function toggleMark(childId) {
  const currentStatus = getStatus(childId)
  const newStatus = currentStatus === 'present' ? 'absent' : 'present'
  
  const currentAtt = store.getAttendance(childId, groupId, selectedDate.value)
  store.setAttendance({
    childId,
    date: selectedDate.value,
    status: newStatus,
    excellent: newStatus === 'absent' ? false : (currentAtt?.excellent || false)
  })
}

function toggleStar(childId) {
  const currentAtt = store.getAttendance(childId, groupId, selectedDate.value)
  if (currentAtt?.status !== 'present') return

  store.setAttendance({
    childId,
    date: selectedDate.value,
    status: 'present',
    excellent: !currentAtt.excellent
  })
}

function formatFullDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' })
}

function publishAnnouncement() {
  if (!announcementText.value.trim()) return
  alert(`Сохранено: ${announcementText.value}`)
  announcementText.value = ''
}

function getPreStatusText(status) {
  if (status === 'will_attend') return 'Будет'
  if (status === 'absent') return 'Не будет'
  return 'Нет ответа'
}

function quickAdd() {
  if (newStudent.value.lastName && newStudent.value.firstName) {
    const newEntry = {
      id: Date.now().toString(),
      lastName: newStudent.value.lastName,
      firstName: newStudent.value.firstName,
      groupId: groupId,
      contact: newStudent.value.contact,
      qualities: [],
      metrics: [],
      campScores: [],
      attendance: {},
      preStatus: 'none'
    }
    
    store.children.push(newEntry)
    if (typeof store.save === 'function') {
      store.save()
    }
    
    newStudent.value = { lastName: '', firstName: '', contact: '' }
  }
}
</script>

<style scoped>
.attendance-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>