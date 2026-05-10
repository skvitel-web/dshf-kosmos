<template>
  <div class="admin-dashboard container">
    <header class="admin-header">
      <h1 class="section-title">👨‍💼 Админ-центр</h1>
      
      <div class="mode-switcher">
        <button @click="activeMode = 'clients'" :class="['mode-btn', { active: activeMode === 'clients' }]">👥 Дети</button>
        <button @click="activeMode = 'trainers'" :class="['mode-btn', { active: activeMode === 'trainers' }]">🏃 Тренеры</button>
        <button @click="activeMode = 'finance'" :class="['mode-btn', { active: activeMode === 'finance' }]">💳 Оплаты</button>
      </div>
    </header>

    <div v-if="activeMode === 'clients'" class="admin-content">
      <div class="admin-controls">
        <input v-model="searchQuery" type="text" placeholder="Поиск ученика..." class="form-input search-bar" />
      </div>

      <div class="students-grid">
        <div v-for="(child, index) in filteredChildren" :key="child.id" class="student-card modern-card">
          <div class="card-accent"></div>
          <div class="card-content">
            <div class="student-main-info">
              <span class="student-number">#{{ index + 1 }}</span>
              <h3 class="student-name">{{ child.lastName }} {{ child.firstName }}</h3>
              <div class="assignment-badge">
                Группа: <strong>{{ getGroupName(child.groupId) }}</strong>
              </div>
            </div>
            
            <button class="btn btn--outline btn--sm" style="width: 100%; margin-top: 10px;">
              🗓️ Назначить персоналку
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeMode === 'trainers'" class="admin-content">
      <div class="groups-management">
        <h2 class="sub-section-title">Управление группами</h2>
        <div class="groups-grid">
          <div v-for="group in groups" :key="group.id" class="group-card modern-card">
            <div class="card-content">
              <h3>{{ group.name }}</h3>
              <p class="current-trainer">
                Текущий тренер: <span>{{ group.trainerName || 'Не назначен' }}</span>
              </p>
              
              <div class="assign-box">
                <label>Назначить нового:</label>
                <select 
                  @change="assignTrainerToGroup(group.id, $event.target.value)" 
                  class="form-input"
                >
                  <option value="" disabled selected>Выберите тренера...</option>
                  <option v-for="t in trainersList" :key="t.id" :value="t.id">
                    {{ t.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeMode === 'finance'" class="admin-content">
      <div class="finance-table-container modern-card">
        <table class="finance-table">
          <thead>
            <tr>
              <th>Ученик</th>
              <th>Статус</th>
              <th>Остаток занятий</th>
              <th>До даты</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="child in children" :key="child.id">
              <td>
                <div class="student-info">
                  <span class="name">{{ child.lastName }} {{ child.firstName }}</span>
                  <span class="group-sub">{{ getGroupName(child.groupId) }}</span>
                </div>
              </td>
              <td>
                <span :class="['status-badge', getPaymentStatus(child).class]">
                  {{ getPaymentStatus(child).text }}
                </span>
              </td>
              <td>
                <div class="lessons-counter">
                  <span :class="{ 'warning': child.lessonsLeft <= 2 }">
                    {{ child.lessonsLeft || 0 }}
                  </span> 
                  / 8
                </div>
              </td>
              <td>{{ child.paymentValidUntil || '—' }}</td>
              <td>
                <button @click="editPayment(child)" class="btn btn--outline btn--sm">Редактировать</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="editingChild" class="modal-overlay">
      <div class="auth-form compact-form modal-content">
        <h3>Редактировать оплату: {{ editingChild.lastName }}</h3>
        <label>Остаток занятий</label>
        <input type="number" v-model="paymentForm.lessonsLeft" class="form-input">
        <label>Оплачено до</label>
        <input type="date" v-model="paymentForm.paymentValidUntil" class="form-input">
        <div class="modal-actions">
          <button @click="savePayment" class="btn btn--primary">Сохранить</button>
          <button @click="editingChild = null" class="btn btn--outline">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTrainerStore } from '@/stores/trainer'

const store = useTrainerStore()
const activeMode = ref('clients') // 'clients' или 'trainers'
const searchQuery = ref('')
const editingChild = ref(null)
const paymentForm = ref({ lessonsLeft: 0, paymentValidUntil: '' })

const children = computed(() => store.children)
const groups = computed(() => store.groups)

function getGroupName(id) {
  return groups.value.find(g => g.id === id)?.name || '—'
}

// Логика определения статуса оплаты
function getPaymentStatus(child) {
  const today = new Date()
  const validUntil = new Date(child.paymentValidUntil)
  
  if (!child.paymentValidUntil || child.lessonsLeft <= 0) {
    return { text: 'Долг / Нет занятий', class: 'status-danger' }
  }
  if (validUntil < today) {
    return { text: 'Просрочено', class: 'status-warning' }
  }
  return { text: 'Оплачено', class: 'status-success' }
}

function editPayment(child) {
  editingChild.value = child
  paymentForm.value = { 
    lessonsLeft: child.lessonsLeft || 0, 
    paymentValidUntil: child.paymentValidUntil || '' 
  }
}

function savePayment() {
  store.updateChildPayment(editingChild.value.id, paymentForm.value)
  editingChild.value = null
}

// Тестовый список тренеров (в будущем перенесем в стор)
const trainersList = ref([
  { id: 't1', name: 'Алексей Смирнов' },
  { id: 't2', name: 'Игорь Петров' },
  { id: 't3', name: 'Дмитрий Волков' }
])

const filteredChildren = computed(() => {
  if (!searchQuery.value) return children.value
  return children.value.filter(c => 
    `${c.lastName} ${c.firstName}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function assignTrainerToGroup(groupId, trainerId) {
  const trainer = trainersList.value.find(t => t.id === trainerId)
  alert(`Тренер ${trainer.name} назначен на группу ${groupId}`)
  // Здесь будет вызов store.updateGroupTrainer(groupId, trainerId)
}
</script>