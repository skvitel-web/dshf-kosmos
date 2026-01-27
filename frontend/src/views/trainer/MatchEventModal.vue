<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Забил гол</h3>
      <select v-model="scorer" class="form-select">
        <option value="">Выберите игрока</option>
        <option v-for="p in teamPlayers" :key="p.id" :value="p.id">{{ p.name }}</option>
      </select>

      <h4>Голевая передача (опционально)</h4>
      <select v-model="assist" class="form-select">
        <option value="">Нет</option>
        <option v-for="p in teamPlayers" :key="p.id" :value="p.id">{{ p.name }}</option>
      </select>

      <div class="modal-actions">
        <button class="btn btn--primary" @click="confirm">Добавить</button>
        <button class="btn btn--outline" @click="$emit('close')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTrainerStore } from '../../stores/trainer'

const props = defineProps(['team'])
const emit = defineEmits(['close', 'confirm'])

const store = useTrainerStore()
const scorer = ref('')
const assist = ref('')

const teamPlayers = computed(() => {
  const groupId = props.team === 'A' 
    ? store.groups[0]?.id 
    : store.groups[1]?.id
  return store.children.filter(c => c.groupId === groupId)
})

function confirm() {
  if (!scorer.value) return
  emit('confirm', { scorer: scorer.value, assist: assist.value || null })
  emit('close')
}
</script>