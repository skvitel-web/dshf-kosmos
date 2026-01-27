<template>
  <div class="trainer-group">
    <h1 class="section-title">{{ group?.name }}</h1>
    
    <div class="child-item" v-for="child in children" :key="child.id">
      <span class="child-name">{{ child.name }}</span>
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
        <button
          class="mark-btn excellent"
          :class="{ active: getMark(child.id).excellent && getMark(child.id).status !== null }"
          @click="toggleExcellent(child.id)"
        >
          ★
        </button>
      </div>
    </div>

    <router-link to="/trainer" class="btn btn--outline">← Назад к группам</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTrainerStore } from '../../stores/trainer'

const route = useRoute()
const store = useTrainerStore()
const groupId = route.params.id
const today = new Date().toISOString().split('T')[0]

const group = computed(() => store.groups.find(g => g.id === groupId))
const children = computed(() => store.children.filter(c => c.groupId === groupId))

function getMark(childId) {
  return store.getAttendance(childId, groupId, today)
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
</script>