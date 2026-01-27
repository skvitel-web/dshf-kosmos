<template>
  <section class="hero">
    <div class="container">
      <h1 class="hero__title">Детская футбольная школа «Космос»</h1>
      <p class="hero__subtitle">
        Воспитываем чемпионов будущего — с уважением, заботой и любовью к футболу.
      </p>

      <div class="hero__roles">
        <button class="role-btn role-btn--trainer" @click="goTo('trainer')">
          <span class="role-btn__icon">👨‍🏫</span>
          <span class="role-btn__label">Тренер</span>
        </button>
        <button class="role-btn role-btn--admin" @click="goTo('admin')">
          <span class="role-btn__icon">👨‍💼</span>
          <span class="role-btn__label">Админ</span>
        </button>
        <button class="role-btn role-btn--parent" @click="goTo('parent')">
          <span class="role-btn__icon">👨‍👩‍👧</span>
          <span class="role-btn__label">Родитель</span>
        </button>
        <button class="role-btn role-btn--child" @click="goTo('child')">
          <span class="role-btn__icon">👦</span>
          <span class="role-btn__label">Ребёнок</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(role) {
  router.push(`/${role}`)
}
</script>