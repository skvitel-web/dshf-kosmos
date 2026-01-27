<template>
  <div class="feature-card">
    <div class="feature-card__icon">
      ⚽
    </div>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__desc">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<style scoped>
.feature-card {
  background: var(--color-space-800);
  border: 1px solid var(--color-space-700);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-field-500);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.feature-card__icon {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--color-field-500);
}

.feature-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.feature-card__desc {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}
</style>