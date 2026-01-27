<template>
  <div class="trainer-dashboard">
    <h1 class="section-title">Тренерский блок</h1>

    <div class="trainer-actions">
      <router-link to="/trainer/groups" class="btn btn--primary">
        📝 Отметка присутствия
      </router-link>

      <router-link to="/trainer/referee" class="btn btn--outline">
        ⚖️ Режим судьи
      </router-link>
    </div>

    <router-link to="/" class="btn btn--outline">← Назад на главную</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTrainerStore } from '../../stores/trainer'

const store = useTrainerStore()
const groups = computed(() => store.groups)
</script>