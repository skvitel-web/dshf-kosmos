<template>
  <div class="trainer-dashboard">
    <h1 class="section-title">Выберите группу</h1>
    <div class="group-list">
      <router-link
        v-for="group in groups"
        :key="group.id"
        :to="`/trainer/group/${group.id}`"
        class="group-card"
      >
        {{ group.name }}
      </router-link>
    </div>
    <router-link to="/" class="btn btn--outline">← Назад</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTrainerStore } from '@/stores/trainer'

const store = useTrainerStore()
const groups = computed(() => store.groups)
</script>