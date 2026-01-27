<template>
  <div class="trainer-group-view">
    <h2 class="section-title">{{ group?.name }}</h2>
    <div class="child-item" v-for="child in children" :key="child.id">
      <span class="child-name">{{ child.name }}</span>
      <div class="attendance-actions">
        <button class="btn btn--attendance" :class="{ active: isMarked(child.id, 'present') }" @click="mark(child.id, 'present')">+</button>
        <button class="btn btn--attendance" :class="{ active: isMarked(child.id, 'absent') }" @click="mark(child.id, 'absent')">–</button>
        <button class="btn btn--attendance" :class="{ active: isMarked(child.id, 'late') }" @click="mark(child.id, 'late')">Опоздал</button>
        <button class="btn btn--gold" :class="{ active: hasExcellent(child.id) }" @click="toggleExcellent(child.id)">5</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTrainerStore } from '@/stores/trainer'

const route = useRoute()
const store = useTrainerStore()
const groupId = route.params.id
const today = new Date().toISOString().split('T')[0]

const group = computed(() => store.groups.find(g => g.id === groupId))
const children = computed(() => store.children.filter(c => c.groupId === groupId))

function isMarked(childId, status) {
  return store.getAttendance(childId, groupId, today)?.status === status
}

function hasExcellent(childId) {
  return store.getAttendance(childId, groupId, today)?.excellent === true
}

function mark(childId, status) {
  const current = store.getAttendance(childId, groupId, today) || { excellent: false }
  store.setAttendance({ childId, groupId, date: today, status, excellent: current.excellent })
}

function toggleExcellent(childId) {
  const current = store.getAttendance(childId, groupId, today) || { status: null }
  store.setAttendance({ childId, groupId, date: today, status: current.status, excellent: !current.excellent })
}
</script>