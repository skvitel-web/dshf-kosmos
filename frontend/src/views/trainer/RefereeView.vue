<template>
  <div class="referee-container container">
    <h1 class="section-title">Режим судьи</h1>

    <div v-if="!matchActive" class="setup-card">
      <h2>Новый матч</h2>
      <div class="match-grid">
        <div class="team-select">
          <label>Команда А</label>
          <select v-model="teamA" class="form-input">
            <option value="A">Младшая группа</option>
            <option value="B">Старшая группа</option>
          </select>
        </div>
        <div class="vs-label">VS</div>
        <div class="team-select">
          <label>Команда Б</label>
          <select v-model="teamB" class="form-input">
            <option value="C">Сборная (2012)</option>
            <option value="D">Гости</option>
          </select>
        </div>
      </div>
      <button @click="startMatch" class="btn btn--primary" :disabled="!teamA || !teamB">
        Свисток на начало
      </button>
    </div>

    <div v-else class="match-live">
      <div class="score-board">
        <div class="score-team">
          <span class="team-name">Команда А</span>
          <span class="score-digit">{{ score.A }}</span>
        </div>
        <div class="score-divider">:</div>
        <div class="score-team">
          <span class="score-digit">{{ score.B }}</span>
          <span class="team-name">Команда Б</span>
        </div>
      </div>

      <div class="match-actions">
        <button class="btn btn--primary" @click="openGoalModal('A')">+ Гол А</button>
        <button class="btn btn--primary" @click="openGoalModal('B')">+ Гол Б</button>
      </div>

      <div class="events-log">
        <h3>События матча</h3>
        <div v-for="(event, i) in events" :key="i" class="event-item">
          <span class="event-time">{{ event.time }}'</span>
          <span class="event-icon">⚽</span>
          <span class="event-desc">
            <strong>{{ event.scorer }}</strong>
            <small v-if="event.assist"> (пас: {{ event.assist }})</small>
          </span>
        </div>
        <div v-if="events.length === 0" class="empty-log">Пока нет забитых мячей</div>
      </div>

      <button @click="finishMatch" class="btn btn--outline-danger" style="width:100%; margin-top:2rem">
        Завершить матч
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const matchActive = ref(false)
const teamA = ref('')
const teamB = ref('')
const score = reactive({ A: 0, B: 0 })
const events = ref([])

function startMatch() {
  matchActive.value = true
}

function openGoalModal(team) {
  // В идеале тут открывается модалка MatchEventModal.vue
  // Для примера используем prompt
  const name = prompt("Кто забил?")
  if (name) {
    score[team]++
    events.value.unshift({
      time: Math.floor(Math.random() * 40) + 1, // имитация времени
      scorer: name,
      assist: prompt("Кто отдал пас? (если никто — оставьте пустым)"),
      team: team
    })
  }
}

function finishMatch() {
  if (confirm(`Матч окончен со счетом ${score.A}:${score.B}. Сохранить?`)) {
    matchActive.value = false
    score.A = 0; score.B = 0; events.value = []
  }
}
</script>

<style scoped>
.setup-card {
  background: var(--color-space-800);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}
.match-grid {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
}
.vs-label { font-weight: bold; color: var(--color-field-500); }

.score-board {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e293b;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  border: 2px solid var(--color-field-500);
}
.score-team { text-align: center; flex: 1; }
.score-digit { font-size: 4rem; font-weight: 800; display: block; color: white; }
.team-name { color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 1px; }
.score-divider { font-size: 3rem; margin: 0 1.5rem; color: var(--color-field-500); }

.match-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }

.events-log {
  background: var(--color-space-800);
  border-radius: 12px;
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
}
.event-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-space-700);
}
.event-time { color: var(--color-field-500); font-weight: bold; width: 35px; }
.btn--outline-danger {
  border: 1px solid #dc2626;
  color: #ef4444;
  background: transparent;
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 8px;
}
</style>