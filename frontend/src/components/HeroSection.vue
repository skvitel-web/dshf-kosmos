<template>
  <section class="hero">
    <div class="container">
      <h1 class="hero__title">Детская футбольная школа «Космос»</h1>
      <p class="hero__subtitle">
        Воспитываем чемпионов будущего — с уважением, заботой и любовью к футболу.
      </p>

      <div class="hero__cta">
        <router-link to="/login" class="btn btn--primary hero__cta-btn">Войти в личный кабинет</router-link>
        <router-link to="/register" class="btn btn--outline hero__cta-btn">Создать аккаунт</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.hero__cta-btn {
  min-width: 200px;
  box-sizing: border-box;
  text-align: center;
  padding: 0.75rem 1.5rem;
}

@media (max-width: 480px) {
  .hero__cta {
    flex-direction: column;
    align-items: stretch;
    padding: 0 0.5rem;
  }

  .hero__cta-btn {
    width: 100%;
    min-width: unset;
  }
}
</style>
