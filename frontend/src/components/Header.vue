<template>
  <header class="header">
    <div class="container">
      <div class="header__logo">
        <h1 class="headertext">Космос</h1>
      </div>
        <nav class="header__nav">
            <router-link to="/register" class="btn btn--primary">Создать аккаунт</router-link>
            <router-link to="/login" class="btn btn--outline">Войти в аккаунт</router-link>
        </nav>
    </div>
  </header>
</template>

<style scoped>
/* Оставим ТОЛЬКО специфичные стили для хэдера */
.header {
  background-color: var(--color-space-800);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-space-700);
}

.header__logo h1 {
  display: flex;
  justify-content: end;
  color: var(--color-field-500);
  font-size: 1.5rem;
  font-weight: 700;
}

.header__nav {
  display: flex;
  justify-content: end;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 0;
  }
  .header__nav {
    gap: 0.5rem;
  }
}
</style>