<template>
  <div class="trainer-group">
    <h1 class="section-title">{{ group?.name }}</h1>

    <button @click="showAddForm = true" class="btn btn--primary add-child-btn">
      + Новый ребёнок
    </button>

    <!-- Модальное окно -->
    <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
      <div class="modal">
        <h3>Добавить нового ребёнка</h3>
        <form @submit.prevent="handleAddChild">
          <input v-model="newChild.name" placeholder="Имя ребёнка" required />
          <input v-model.number="newChild.age" type="number" min="5" max="18" placeholder="Возраст" required />
          <input v-model="newChild.parentContact" placeholder="Контакт родителя (телефон/email)" required />
          <div class="modal-actions">
            <button type="submit" class="btn btn--primary">Сохранить</button>
            <button type="button" class="btn btn--outline" @click="showAddForm = false">Отмена</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Список детей -->
    <div class="child-item" v-for="child in children" :key="child.id">
      <div class="child-info">
        <span class="child-name">{{ child.name }}</span>
        <span v-if="child.isDraft" class="draft-badge">Черновик</span>
      </div>
      <div class="mark-actions">
        <button
          class="mark-btn"
          :class="{ active: getMark(child.id).status === 'present' }"
          @click="setMark(child.id, 'present')"
        >
          +
        </button>
        <button
          class="mark-btn"
          :class="{ active: getMark(child.id).status === 'absent' }"
          @click="setMark(child.id, 'absent')"
        >
          –
        </button>
        <button
          class="mark-btn late"
          :class="{ active: getMark(child.id).status === 'late' }"
          @click="setMark(child.id, 'late')"
        >
          Оп
        </button>
          <button class="mark-btn excellent" :class="{active: getMark(child.id).excellent && getMark(child.id).status !== null}"@click="toggleExcellent(child.id)">
            ★
          </button>
      </div>
    </div>

    <router-link to="/trainer" class="btn btn--outline">← Назад к группам</router-link>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTrainerStore } from '@/stores/trainer'

const route = useRoute()
const store = useTrainerStore()
const groupId = route.params.id
const today = new Date().toISOString().split('T')[0]

const showAddForm = ref(false)
const newChild = reactive({
  name: '',
  age: null,
  parentContact: ''
})

const group = computed(() => store.groups.find(g => g.id === groupId))
const children = computed(() =>
  store.children.filter(c => c.groupId === groupId)
)

function getMark(childId) {
  const mark = store.getAttendance(childId, groupId, today)
  // Гарантируем, что excellent всегда boolean
  return {
    status: mark.status || null,
    excellent: Boolean(mark.excellent)
  }
}

function setMark(childId, status) {
  const current = getMark(childId)
  store.setAttendance({ childId, groupId, date: today, status, excellent: current.excellent })
}

function toggleExcellent(childId) {
  const current = getMark(childId)
  store.setAttendance({
    childId,
    groupId,
    date: today,
    status: current.status,
    excellent: !current.excellent
  })
}

function handleAddChild() {
  if (!newChild.name || !newChild.age || !newChild.parentContact) return
  store.addDraftChild({
    name: newChild.name,
    age: newChild.age,
    parentContact: newChild.parentContact,
    groupId
  })
  newChild.name = ''
  newChild.age = null
  newChild.parentContact = ''
  showAddForm.value = false
}
</script>