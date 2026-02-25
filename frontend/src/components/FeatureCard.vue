<template>
  <div class="feature-card">
    <div class="feature-card__icon">{{ icon }}</div>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__desc">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '🚀' },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<style scoped>
.feature-card {
  background: var(--color-space-800);
  border: 1px solid var(--color-space-700);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-field-500);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.feature-card__icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card__title {
  font-size: 1.25rem;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.feature-card__desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>