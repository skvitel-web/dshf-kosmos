<template>
  <div class="parent-dashboard">
    <h1 class="section-title">Личный кабинет родителя</h1>
    
    <div v-if="user" class="user-info">
      Здравствуйте, {{ user.fullName }}!
    </div>

    <div v-if="children.length === 0" class="no-children">
      У вас пока нет привязанных детей.
    </div>

    <div v-else class="children-list">
      <h2>Ваши дети</h2>
      <div v-for="child in children" :key="child.id" class="child-card">
        <h3>{{ child.surname }} {{ child.name }} {{ child.patronymic }}</h3>
        <p>Дата рождения: {{ formatDate(child.birthDate) }}</p>
        <p>Группа: {{ child.groupName }}</p>
        
        <div class="stats-row">
          <span>Посещаемость: {{ child.attendanceRate }}%</span>
          <span>Голов: {{ child.goals }}</span>
        </div>
      </div>
    </div>

    <router-link to="/" class="btn btn--outline">← На главную</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)
const children = ref([])

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU')
}

onMounted(async () => {
  // Получаем данные пользователя
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    // Пока эмулируем данные (позже заменим на API)
    user.value = {
      fullName: "Иванов Иван Иванович"
    }

    children.value = [
      {
        id: '1',
        surname: 'Иванов',
        name: 'Артём',
        patronymic: 'Иванович',
        birthDate: '2015-03-12',
        groupName: 'Младшая группа',
        attendanceRate: 92,
        goals: 5
      }
    ]
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
})
</script>

<style scoped>
.parent-dashboard {
  padding: 2rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.user-info {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.no-children {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 2rem;
}

.children-list h2 {
  margin: 1.5rem 0;
}

.child-card {
  background: var(--color-space-800);
  border: 1px solid var(--color-space-700);
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  font-size: 0.95rem;
}
</style>