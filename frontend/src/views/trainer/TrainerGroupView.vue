<template>
  <div class="container trainer-group-page">
    <h1 class="section-title">Группа: {{ groupName }}</h1>

    <div class="fast-add-card">
      <h3>+ Новый ученик (быстро)</h3>
      <div class="form-grid">
        <input v-model="newName" placeholder="Имя Фамилия" class="form-input" />
        <input v-model="newContact" placeholder="Телефон родителя" class="form-input" />
      </div>
      <button @click="quickAdd" class="btn btn--primary" :disabled="!newName">
        Добавить в список
      </button>
    </div>

    <div class="attendance-list">
      <div v-for="child in groupChildren" :key="child.id" class="child-card">
        <div class="child-info">
          <span class="child-name">{{ child.name }}</span>
          <span class="child-status-label" v-if="getStatus(child.id)">
            {{ getStatusText(getStatus(child.id)) }}
          </span>
        </div>
        
        <div class="attendance-btns">
          <button 
            @click="mark(child.id, 'present')" 
            :class="['att-btn plus', getStatus(child.id) === 'present' ? 'active' : '']"
          >+</button>
          <button 
            @click="mark(child.id, 'absent')" 
            :class="['att-btn minus', getStatus(child.id) === 'absent' ? 'active' : '']"
          >−</button>
          <button 
            @click="mark(child.id, 'late')" 
            :class="['att-btn late', getStatus(child.id) === 'late' ? 'active' : '']"
          >Оп</button>
          <button 
            @click="toggleStar(child.id)" 
            :disabled="getStatus(child.id) === 'absent' || !getStatus(child.id)"
            :class="['att-btn star', getExcellent(child.id) ? 'active' : '']"
          >★ 5</button>
        </div>
      </div>
    </div>

    <router-link to="/trainer" class="btn btn--outline" style="margin-top: 2rem;">
      ← К списку групп
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref, computed } from 'vue'
import { useTrainerStore } from '@/stores/trainer'

const store = useTrainerStore()
const today = new Date().toISOString().split('T')[0]

const groupName = ref('Старшая группа') // В реальности берется из параметров
const newName = ref('')
const newContact = ref('')

const groupChildren = computed(() => store.children)

function mark(id, status) {
  const current = store.attendance?.[`${today}_${id}`] || {}
  store.setAttendance(id, today, status, current.excellent || false)
}

function toggleStar(id) {
  const current = store.attendance?.[`${today}_${id}`] || { status: 'present' }
  store.setAttendance(id, today, current.status, !current.excellent)
}

function getStatus(id) { return store.attendance?.[`${today}_${id}`]?.status }
function getExcellent(id) { return store.attendance?.[`${today}_${id}`]?.excellent }

function getStatusText(s) {
  const map = { present: 'Был', absent: 'Н/Б', late: 'Опоздал' }
  return map[s] || ''
}

function quickAdd() {
  if (newName.value) {
    store.addChildFast(newName.value, newContact.value)
    newName.value = ''; newContact.value = ''
  }
}
</script>

<style scoped>
.fast-add-card {
  background: var(--color-space-800);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px dashed var(--color-field-500);
  margin-bottom: 2rem;
}
.child-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-space-800);
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-space-700);
}
.attendance-btns { display: flex; gap: 8px; }
.att-btn {
  width: 44px; height: 44px;
  border-radius: 6px;
  border: 1px solid var(--color-space-600);
  background: var(--color-space-700);
  color: white;
  cursor: pointer;
  font-weight: bold;
}
.att-btn.plus.active { background: #059669; border-color: #10b981; }
.att-btn.minus.active { background: #dc2626; border-color: #ef4444; }
.att-btn.late.active { background: #d97706; border-color: #f59e0b; }
.att-btn.star.active { background: #ca8a04; color: white; }
.att-btn:disabled { opacity: 0.3; cursor: not-allowed; }
</style>