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
      
      <div class="modern-card" style="margin-bottom: 2rem; padding: 1.5rem;">
        <h3 style="margin-bottom: 0.5rem; font-size: 1.2rem;">📊 Быстрый импорт базы учеников</h3>
        <p class="auth-footer" style="text-align: left; margin-bottom: 1.5rem; font-size: 0.85rem;">
          Загрузите файл Excel (.xlsx или .xls). Колонки в таблице должны идти в порядке: 
          <strong>Фамилия, Имя, Отчество, ID Группы, Остаток занятий</strong>.
        </p>
        
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleExcelImport" 
            accept=".xlsx, .xls" 
            style="display: none;" 
          />
          <button @click="$refs.fileInput.click()" class="btn btn--primary">
            📁 Выбрать и загрузить Excel
          </button>
        </div>
      </div>

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
      <div class="management-section" style="margin-bottom: 3rem;">
        <h2 class="sub-section-title">🔍 Назначить нового тренера</h2>
        <div class="admin-controls" style="margin-bottom: 1.5rem;">
          <input v-model="userSearchEmail" type="text" placeholder="Введите email для поиска (например, coach@...)" class="form-input search-bar" />
        </div>

        <div v-if="userSearchEmail">
          <div v-if="searchedUsers.length === 0" class="no-data" style="padding: 1rem;">Пользователь не найден</div>
          <div v-else class="trainers-requests-list">
            <div v-for="user in searchedUsers" :key="user.id" class="modern-card" style="margin-bottom: 1rem; border-left: 4px solid #60a5fa;">
              <div class="card-content" style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                <div>
                  <h3 class="student-name" style="margin: 0;">{{ user.lastName }} {{ user.firstName }}</h3>
                  <span class="auth-footer" style="margin: 0; text-align: left; display: block; font-size: 0.85rem;">📧 {{ user.email }}</span>
                </div>
                <button @click="promoteToTrainer(user)" class="btn btn--primary btn--sm" style="background: var(--color-field-500); border-color: var(--color-field-500);">➕ Сделать тренером</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="groups-management">
        <h2 class="sub-section-title">📋 Действующие тренеры и группы</h2>
        <div class="groups-grid">
          <div v-for="group in groups" :key="group.id" class="group-card modern-card">
            <div class="card-content">
              <h3>{{ group.name }}</h3>
              <p class="current-trainer">Текущий тренер: <span>{{ group.trainerName || 'Не назначен' }}</span></p>
              <div class="assign-box">
                <label>Назначить тренера на группу:</label>
                <select @change="assignTrainerToGroup(group.id, $event.target.value)" class="form-input">
                  <option value="" disabled selected>Выберите из списка...</option>
                  <option v-for="t in trainersList" :key="t.id" :value="t.id">{{ t.lastName }} {{ t.firstName }}</option>
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
                  <span :class="{ 'warning': child.lessonsLeft <= 2 }">{{ child.lessonsLeft || 0 }}</span>/ 8
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
        <div class="modal-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem;">
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
import * as XLSX from 'xlsx' // Импортируем установленную библиотеку

const store = useTrainerStore()
const activeMode = ref('clients')
const searchQuery = ref('')
const userSearchEmail = ref('')
const editingChild = ref(null)
const paymentForm = ref({ lessonsLeft: 0, paymentValidUntil: '' })
const fileInput = ref(null)

const children = computed(() => store.children)
const groups = computed(() => store.groups)

// Имитация глобальной таблицы зарегистрированных пользователей
const allRegisteredUsers = ref([
  { id: 'u_101', firstName: 'Александр', lastName: 'Космов', email: 'coach@kosmos.ru' },
  { id: 'u_102', firstName: 'Иван', lastName: 'Петров', email: 'ivan@mail.ru' }
])

// Действующие тренеры
const trainersList = ref([
  { id: 't1', firstName: 'Алексей', lastName: 'Смирнов' },
  { id: 't2', firstName: 'Игорь', lastName: 'Петров' }
])

const searchedUsers = computed(() => {
  if (!userSearchEmail.value.trim()) return []
  return allRegisteredUsers.value.filter(user => {
    const matchesEmail = user.email.toLowerCase().includes(userSearchEmail.value.toLowerCase())
    const isAlreadyTrainer = trainersList.value.some(t => t.id === user.id)
    return matchesEmail && !isAlreadyTrainer
  })
})

// Обработчик загрузки и чтения Excel
function handleExcelImport(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    
    // Берем первый лист из таблицы
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    
    // Превращаем строки листа в массив массивов (строка = массив ячеек)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    
    let importedCount = 0

    // Перебираем строки (пропуская первую, если там заголовки)
    jsonData.forEach((row, index) => {
      if (index === 0) return // Пропуск шапки таблицы
      
      const [lastName, firstName, middleName, groupId, lessonsLeft] = row
      
      // Проверяем наличие обязательных полей в строке Excel
      if (lastName && firstName) {
        // Добавляем запись в наш Pinia стор (через имеющуюся у тебя функцию quickAdd/добавления)
        store.children.push({
          id: 'imported_' + Date.now() + '_' + index,
          lastName: String(lastName).trim(),
          firstName: String(firstName).trim(),
          middleName: middleName ? String(middleName).trim() : '',
          groupId: groupId ? String(groupId).trim() : 'g1', // дефолтная группа, если пустая ячейка
          lessonsLeft: lessonsLeft ? Number(lessonsLeft) : 8,
          paymentValidUntil: ''
        })
        importedCount++
      }
    })

    alert(`Успешно импортировано учеников: ${importedCount}`)
    event.target.value = '' // Сбрасываем инпут
  }
  
  reader.readAsArrayBuffer(file)
}

function getGroupName(id) {
  return groups.value.find(g => g.id === id)?.name || '—'
}

function getPaymentStatus(child) {
  const today = new Date()
  const validUntil = new Date(child.paymentValidUntil)
  if (!child.paymentValidUntil || child.lessonsLeft <= 0) return { text: 'Долг / Нет занятий', class: 'status-danger' }
  if (validUntil < today) return { text: 'Просрочено', class: 'status-warning' }
  return { text: 'Оплачено', class: 'status-success' }
}

function editPayment(child) {
  editingChild.value = child
  paymentForm.value = { lessonsLeft: child.lessonsLeft || 0, paymentValidUntil: child.paymentValidUntil || '' }
}

function savePayment() {
  store.updateChildPayment(editingChild.value.id, paymentForm.value)
  editingChild.value = null
}

const filteredChildren = computed(() => {
  if (!searchQuery.value) return children.value
  return children.value.filter(c => `${c.lastName} ${c.firstName}`.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

function assignTrainerToGroup(groupId, trainerId) {
  const trainer = trainersList.value.find(t => t.id === trainerId)
  const targetGroup = groups.value.find(g => g.id === groupId)
  if (targetGroup && trainer) {
    targetGroup.trainerName = `${trainer.lastName} ${trainer.firstName}`
    alert(`Тренер ${trainer.lastName} назначен на группу "${targetGroup.name}"`)
  }
}

function promoteToTrainer(user) {
  trainersList.value.push({ id: user.id, firstName: user.firstName, lastName: user.lastName })
  alert(`Успешно! Пользователю ${user.lastName} ${user.firstName} присвоена роль тренера.`)
  userSearchEmail.value = ''
}
</script>