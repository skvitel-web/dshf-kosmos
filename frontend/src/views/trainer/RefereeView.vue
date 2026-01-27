<template>
  <div class="referee-view">
    <h1>Режим судьи</h1>
    
    <div v-if="!matchStarted" class="setup">
      <select v-model="teamA">
        <option value="">Команда A</option>
        <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
      <select v-model="teamB">
        <option value="">Команда B</option>
        <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
      <button 
        class="btn btn--primary" 
        :disabled="!teamA || !teamB || teamA === teamB"
        @click="startMatch"
      >
        Начать матч
      </button>
    </div>

    <div v-else class="live-match">
      <div class="score">{{ scoreA }} : {{ scoreB }}</div>
      
      <button class="btn btn--primary" @click="addGoal('A')">+ Гол (A)</button>
      <button class="btn btn--primary" @click="addGoal('B')">+ Гол (B)</button>
      
      <div class="events">
        <div v-for="(e, i) in events" :key="i">
          {{ getPlayer(e.scorer).name }} ⚽
          <span v-if="e.assist">→ {{ getPlayer(e.assist).name }}</span>
        </div>
      </div>

      <button class="btn btn--outline" @click="finishMatch">Завершить матч</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainerStore } from '../../stores/trainer'

const store = useTrainerStore()
const router = useRouter()

const groups = computed(() => store.groups)
const teamA = ref('')
const teamB = ref('')
const matchStarted = ref(false)
const scoreA = ref(0)
const scoreB = ref(0)
const events = ref([])

const playersA = computed(() => store.children.filter(c => c.groupId === teamA.value))
const playersB = computed(() => store.children.filter(c => c.groupId === teamB.value))

function getPlayer(id) {
  return store.children.find(c => c.id === id) || { name: '???' }
}

function startMatch() {
  matchStarted.value = true
}

function addGoal(team) {
  const players = team === 'A' ? playersA.value : playersB.value
  if (players.length === 0) return

  // Временно — выбираем первого игрока (в будущем — модалка выбора)
  const scorer = players[0].id
  if (team === 'A') scoreA.value++
  else scoreB.value++

  events.value.push({ scorer, assist: null })
}

function finishMatch() {
  store.saveMatch({
    teamA: teamA.value,
    teamB: teamB.value,
    scoreA: scoreA.value,
    scoreB: scoreB.value,
    events: events.value,
    finishedAt: new Date().toISOString()
  })
  router.push('/trainer')
}
</script>

<style scoped>
.referee-view { padding: 2rem; }
.score { font-size: 2rem; margin: 1rem 0; }
.events { margin: 1.5rem 0; }
</style>